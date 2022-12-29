import { FormError } from '@components/FormError'
import { useForm } from 'react-hook-form'

export type ICreateAccountForm = {
  email: string
  password: string
  passwordAgain: string
  name: string
  agreeCheckbox: string
  file: FileList
}

export default function NewUser() {
  const {
    register,
    getValues,
    formState: { isValid, errors },
    handleSubmit,
    watch,
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
  })
  const onSubmit = () => {
    const { email, password, name } = getValues()
  }

  return (
    <form
      className="grid gap-2 mt-8 mb-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register('name', {
          required: '이름을 입력해주세요',
          pattern: /^[가-힣|]+$/,
        })}
        name="name"
        type="text"
        placeholder="Name *"
        required
        className="login-input transition-colors"
        autoComplete="true"
      />
      {errors.name?.type === 'pattern' && (
        <FormError errorMessage="한글만 입력하세요." />
      )}
      {errors.name?.message && (
        <FormError errorMessage={errors.name?.message} />
      )}
      <label htmlFor="email" className="flex justify-between items-center">
        <input
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          name="email"
          type="email"
          placeholder="Email *"
          required
          className="login-input transition-colors w-3/4"
          autoComplete="true"
        />
        <button>이메일확인</button>
      </label>
      {(errors.email?.type === 'pattern' && (
        <FormError errorMessage="올바른 이메일 형식을 입력해주세요" />
      )) ||
        (errors.email?.message && (
          <FormError errorMessage={errors.email?.message} />
        ))}
      <input
        {...register('password', {
          required: '비밀번호를 입력해주세요',
          pattern:
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,
        })}
        name="password"
        type="password"
        required
        placeholder="Password *"
        className="login-input"
        autoComplete="true"
      />
      {errors.password?.type === 'pattern' && (
        <FormError errorMessage="대소문자, 숫자, 특수문자(@$!%*?&) 8-14자리를 입력해주세요" />
      )}
      {errors.password?.message && (
        <FormError errorMessage={errors.password?.message} />
      )}
      <input
        {...register('passwordAgain', {
          required: '비밀번호를 재입력해주세요',
          pattern:
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,
        })}
        name="passwordAgain"
        type="password"
        placeholder="password again *"
        required
        className="login-input transition-colors"
        autoComplete="true"
      />
      {(watch('passwordAgain') &&
        watch('passwordAgain') !== watch('password') && (
          <FormError errorMessage="비밀번호가 일치하지 않습니다" />
        )) ||
        (errors.passwordAgain?.message && (
          <FormError errorMessage={errors.passwordAgain?.message} />
        ))}
      <label className="ml-2 mt-4 text-sm text-darkGray flex items-center">
        <input
          {...register('agreeCheckbox')}
          name="agreeCheckbox"
          type="checkbox"
          className="mr-2 mt-0.5"
        />
        LoveKong Stained Glass 이용을 위한 개인정보 제공 및 수집에 동의합니다.
      </label>
      <button>계정 생성</button>
    </form>
  )
}
