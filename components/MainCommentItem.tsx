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
    <Wrapper className="shadow-lg rounded-lg">
      <div className="p-5">
        <div className="flex">
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((value, iter) => {
              return (
                <IconStar
                  fill="#ffd700"
                  key={iter}
                  className={
                    value <= comment.rate ? 'text-yellow-400' : 'text-gray-300'
                  }
                ></IconStar>
              )
            })}{' '}
            / {comment.rate}
          </div>
        </div>
        <p className="py-1 text-start text-sm text-zinc-400">
          {comment.userId} - {comment.createdAt}
        </p>
        <p className="py-1 text-start text-sm text-zinc-600">
          size : {comment.size} / {comment.color}
        </p>
        <p className="py-4 text-start text-md text-zinc-600">
          {comment.comment}
        </p>
        <Image
          src={comment.user_img}
          alt="Comment Image"
          width={300}
          height={200}
        ></Image>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px;
  width: 500px;
`
