import styled from '@emotion/styled'
import { IconStar } from '@tabler/icons'
import { MainCommentItemType } from 'constants/goods'
import { format } from 'date-fns'
import { convertFromRaw, EditorState } from 'draft-js'
import { ICommentItemType } from 'pages/products/[id]'
import { useState } from 'react'
import CustomEditor from './Editor'
import Image from 'next/image'

export default function MainCommentItem({
  comment,
}: {
  comment: MainCommentItemType
}) {
  const [contents, setContents] = useState<string[]>(comment.comment.split('|'))

  return (
    <div
      style={{
        border: '1px solid rgba(200,200,200,0.6)',
        maxWidth: '720px',
        minWidth: '300px',
      }}
      className="flex overflow-hidden rounded-md shadow-lg transition duration-300 ease-in-out font-sans-kr"
    >
      <div className="rounded-lg relative bg-white overflow-scroll">
        <div className="px-3 pt-6 flex justify-between items-center">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((value, iter) => {
              return (
                <IconStar
                  fill="#ffd700"
                  key={iter}
                  className={
                    value <= comment.rate ? 'text-yellow-400' : 'text-gray-300'
                  }
                  size={'1.4rem'}
                ></IconStar>
              )
            })}{' '}
            / {comment.rate}
          </div>
        </div>
        <div className="px-4 py-1 text-start text-sm text-zinc-400">
          {comment.userId} - {comment.createdAt}
        </div>
        <div className="px-4 py-1 text-start text-xs text-zinc-600">
          size : {comment.size} / {comment.color}
        </div>
        <div className="px-4 py-2 mb-10 h-36 w-64 text-start text-sm text-zinc-600">
          {contents.map((contents, iter) => {
            return <div key={iter}>{contents}</div>
          })}
        </div>
      </div>
      <span className="mx-auto"></span>
      <div className="w-72 p-3">
        <Image
          src={comment.user_img}
          alt="Comment Image"
          width={500}
          height={500}
          className="object-cover rounded-lg"
        ></Image>
      </div>
    </div>
  )
}
