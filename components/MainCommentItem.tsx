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
  return (
    <div
      style={{
        border: '1px solid rgba(200,200,200,0.6)',
        maxWidth: '360px',
        minWidth: '300px',
      }}
      className="max-w-lg min-w-sm overflow-hidden hover:rotate-1 rounded-md shadow-lg transition duration-300 ease-in-out font-sans-kr"
    >
      <div className="rounded-lg relative bg-white">
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
        <p className="px-4 py-1 text-start text-sm text-zinc-400">
          {comment.userId} - {comment.createdAt}
        </p>
        <p className="px-4 py-1 text-start text-xs text-zinc-600">
          size : {comment.size} / {comment.color}
        </p>
        <p className="px-4 py-2 h-24 mb-10 text-start text-sm text-zinc-600">
          {comment.comment}
        </p>
        <Image
          src={comment.user_img}
          alt="Comment Image"
          width={400}
          height={500}
          className="w-full h-96 px-4 pb-4"
        ></Image>
      </div>
    </div>
  )
}
