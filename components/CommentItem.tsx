import styled from '@emotion/styled'
import { IconStar } from '@tabler/icons'
import { format } from 'date-fns'
import { convertFromRaw, EditorState } from 'draft-js'
import { ICommentItemType } from 'pages/products/[id]'
import { useState } from 'react'
import CustomEditor from './Editor'

export default function CommentItem({ item }: { item: ICommentItemType }) {
  const [editorState] = useState<EditorState | undefined>(() =>
    item.contents
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(item.contents)))
      : EditorState.createEmpty()
  )
  return (
    <Wrapper>
      <div>
        <div className="flex px-5">
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((value, iter) => {
              return (
                <IconStar
                  fill="#ffd700"
                  key={iter}
                  className={
                    value <= item.rate ? 'text-yellow-400' : 'text-gray-300'
                  }
                ></IconStar>
              )
            })}
          </div>
          <div className="flex flex-col ml-auto">
            <span className="text-sm">
              💁 개당 : {item.price.toLocaleString('ko-KR')}₩ 💁 수량 :{' '}
              {item.quantity.toLocaleString('ko-KR')}개 💁 합계 :{' '}
              {item.amount.toLocaleString('ko-KR')}₩
            </span>
          </div>
        </div>
        {editorState && (
          <CustomEditor
            minHeight={100}
            noPadding={false}
            editorState={editorState}
            readOnly={true}
          />
        )}
        <p className="px-5 text-end text-sm text-zinc-600">
          {format(new Date(item.createdAt), 'yyyy-MM-dd HH:mm:ss')}
        </p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`
