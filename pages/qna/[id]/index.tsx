import CustomEditor from '@components/Editor'
import { Input, Pagination } from '@mantine/core'
import { QnAs } from '@prisma/client'
import { IconDashboard } from '@tabler/icons'
import { useQuery } from '@tanstack/react-query'
import { convertFromRaw, EditorState } from 'draft-js'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function QNADetail() {
  const router = useRouter()
  const { id: qnaId } = router.query
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  )
  const [title, setTitle] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (qnaId != null) {
      fetch(`/api/get-question?id=${qnaId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items && data.items?.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.contents))
              )
            )
          } else {
            setEditorState(EditorState.createEmpty())
          }
          if (data.items && data.items?.title) {
            setTitle(data.items.title)
          }
          return data.items
        })
    }
  }, [qnaId])

  return (
    <div>
      <Head>
        <title>LoveKong | QnA</title>
        <meta name="description" content="LoveKong Stained Glass" />

        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/qna`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="러브콩(LoveKong) Goods" />
        <meta
          property="og:description"
          content="러브콩의 스테인드 글라스 제품들을 만나보세요."
        />
        <meta property="og:image" content="" />
      </Head>
      <main className="flex flex-col justify-center items-center my-20 lg:px-36 md:px-30 sm:px-24 xs:px-18 xss:px-12">
        <div className="flex flex-col justify-center items-center z-10">
          <div
            style={{ fontFamily: 'Kashie-Mercy' }}
            className="relative font-sans-kr-light md:text-3xl sm:text-2xl text-xl"
          >
            LoveKong Stained Glass
          </div>
          <div className="text-green-800 relative font-sans-kr-light text-md">
            러브콩 스테인드 글라스
          </div>
        </div>
        <div
          className="w-full py-10"
          style={{ maxWidth: '560px', minWidth: '360px' }}
        >
          <Input
            icon={<IconDashboard />}
            placeholder="QnA Title"
            onChange={() => {}}
            value={title ?? ''}
            color="dark"
          />
        </div>
        <div
          className="w-full"
          style={{ maxWidth: '560px', minWidth: '360px' }}
        >
          <CustomEditor
            editorState={editorState ?? EditorState.createEmpty()}
            readOnly={true}
          />
        </div>
      </main>
    </div>
  )
}
