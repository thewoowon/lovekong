import { FormError } from '@components/FormError'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import ClassView from '@components/ClassView'
import { useDaumPostcodePopup } from 'react-daum-postcode'
import { useMutation } from '@tanstack/react-query'
import { User } from '@prisma/client'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useState } from 'react'

export type ICreateAccountForm = {
  email: string
  password: string
  passwordAgain: string
  name: string
  phoneNumber: string
  address: string
  addressDetail: string
  agreeCheckbox: string
}

export default function NewUser() {
  const router = useRouter()
  const [emailVerification, setEmailVerification] = useState(false)

  const { mutate: addUser } = useMutation<
    unknown,
    unknown,
    Omit<User, 'id' | 'emailVerified' | 'createdAt'>,
    any
  >(
    (item) =>
      fetch(`/api/add-user`, {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onError: (err, variables, context) => {
        toast.error('회원가입에 실패했습니다.')
      },
      onSuccess: () => {
        toast.success('회원가입이 완료되었습니다.', {
          icon: '👏',
          position: 'top-right',
        })
        router.push('/auth/signin')
      },
    }
  )

  const {
    register,
    getValues,
    formState: { isValid, errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
  })
  const onSubmit = async () => {
    const {
      email,
      password,
      passwordAgain,
      name,
      phoneNumber,
      address,
      addressDetail,
      agreeCheckbox,
    } = getValues()

    if (!emailVerification) {
      alert('이메일 인증을 완료해주세요.')
      return
    }

    if (password !== passwordAgain) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    if (!agreeCheckbox) {
      alert('약관에 동의해주세요.')
      return
    }

    //const hashPassword = await bcrypt.hashSync(password, 10);
    addUser({
      name: name,
      email: email,
      password: password,
      image: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
      address: address + ', ' + addressDetail,
      phone: phoneNumber,
    })
  }
  const open = useDaumPostcodePopup()

  const handleComplete = (data: {
    address: any
    addressType: string
    bname: string
    buildingName: string
  }) => {
    let fullAddress = data.address
    let extraAddress = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }
    setValue('address', fullAddress)
  }

  const handleClick = () => {
    open({ onComplete: handleComplete })
  }

  const handleEmailVerification = async () => {
    const { email } = getValues()
    const res = await fetch(`/api/get-user`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => data.items)

    if (res) {
      alert('이미 가입된 이메일입니다.')
      return
    } else {
      setEmailVerification(true)
      toast.success('이메일 인증이 완료되었습니다.', {
        icon: '👏',
        position: 'top-right',
      })
    }
  }

  return (
    <div className="max-w-5xl flex flex-wrap justify-center my-20 mx-auto">
      <div
        className="flex flex-col font-sans-kr px-2 py-4"
        style={{ width: '400px' }}
      >
        <form className="grid gap-2 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="py-1 font-bold">📒 이름</div>
          <input
            {...register('name', {
              required: '이름을 입력해주세요',
              pattern: /^[가-힣|]+$/,
            })}
            name="name"
            type="text"
            placeholder="Name"
            required
            className="w-full h-12 border border-zinc-700 px-4 ouline-none focus:outline-none rounded-md"
            autoComplete="true"
          />
          {errors.name?.type === 'pattern' && (
            <FormError errorMessage="한글만 입력하세요." />
          )}
          {errors.name?.message && (
            <FormError errorMessage={errors.name?.message} />
          )}
          <div className="py-1 font-bold">📨 이메일</div>
          <div className="flex justify-between items-center">
            <input
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-8/12 h-12 border border-zinc-700 px-4 ouline-none focus:outline-none rounded-md"
              autoComplete="true"
            />
            <button
              onClick={() => {
                handleEmailVerification()
              }}
              type="button"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out text-white rounded-lg"
            >
              중복 확인
            </button>
          </div>
          {(errors.email?.type === 'pattern' && (
            <FormError errorMessage="올바른 이메일 형식을 입력해주세요" />
          )) ||
            (errors.email?.message && (
              <FormError errorMessage={errors.email?.message} />
            ))}
          <div className="py-1 font-bold">⚙️ 비밀번호</div>
          <input
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              pattern:
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,
            })}
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full h-12 border border-zinc-700 px-4 ouline-none focus:outline-none rounded-md"
            autoComplete="true"
          />
          {errors.password?.type === 'pattern' && (
            <FormError errorMessage="대소문자, 숫자, 특수문자(@$!%*?&) 8-14자리를 입력해주세요" />
          )}
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          <div className="py-1 font-bold">⚙️ 비밀번호 재입력</div>
          <input
            {...register('passwordAgain', {
              required: '비밀번호를 재입력해주세요',
              pattern:
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,
            })}
            name="passwordAgain"
            type="password"
            placeholder="Password Again"
            required
            className="w-full h-12 border border-zinc-700 px-4 ouline-none focus:outline-none rounded-md"
            autoComplete="true"
          />
          {(watch('passwordAgain') &&
            watch('passwordAgain') !== watch('password') && (
              <FormError errorMessage="비밀번호가 일치하지 않습니다" />
            )) ||
            (errors.passwordAgain?.message && (
              <FormError errorMessage={errors.passwordAgain?.message} />
            ))}
          <div className="py-1 font-bold">📞 전화번호</div>
          <input
            {...register('phoneNumber', {
              required: '전화번호를 입력해주세요',
            })}
            name="phoneNumber"
            type="text"
            required
            placeholder="- 없이 입력하세요"
            className="w-full h-12 border border-zinc-700 px-4 ouline-none focus:outline-none rounded-md"
            autoComplete="true"
          />
          <div className="py-1 font-bold">📇 주소</div>
          <input
            {...register('address', {
              required: '주소를 입력해주세요',
            })}
            name="address"
            type="text  "
            required
            placeholder="Address"
            className="w-full h-12 border border-zinc-700 px-4 ouline-none focus:outline-none rounded-md"
            autoComplete="true"
            onClick={() => {
              handleClick()
            }}
          />
          <div className="py-1 font-bold">📇 상세주소</div>
          <input
            {...register('addressDetail', {
              required: '상세주소를 입력해주세요',
            })}
            name="addressDetail"
            type="text  "
            required
            placeholder="Address Detail"
            className="w-full h-12 border border-zinc-700 px-4 ouline-none focus:outline-none rounded-md"
            autoComplete="true"
          />
          <label className="ml-2 mt-4 text-sm text-darkGray flex items-center">
            <input
              {...register('agreeCheckbox')}
              name="agreeCheckbox"
              type="checkbox"
              className="mr-2 mt-0.5"
            />
            LoveKong Stained Glass 이용을 위한 개인정보 제공 및 수집에
            동의합니다.
          </label>
          <button
            type="submit"
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out text-white rounded-lg"
          >
            계정 생성
          </button>
        </form>
      </div>
      <div
        className="h-full flex flex-col font-sans-kr py-4"
        style={{ maxWidth: '560px', minWidth: '360px' }}
      >
        <div className="px-10 flex flex-col gap-2">
          <div className="py-4 font-bold"></div>
          <ClassView></ClassView>
        </div>
      </div>
    </div>
  )
}
