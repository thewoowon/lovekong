import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled from '@emotion/styled'
import { EditorState } from 'draft-js'
import { Dispatch, SetStateAction, useState } from 'react'
import { Button, Input } from '@mantine/core'
import {
  IconDownload,
  IconNewSection,
  IconPlus,
  IconTicket,
} from '@tabler/icons'

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  }
)

export default function CustomReadOnlyEditor({
  editorState,
  readOnly = false,
  onSave,
  noPadding = false,
  onEditorStateChange,
  minHeight = 100,
}: {
  editorState: EditorState
  readOnly?: boolean
  onSave?: () => void
  noPadding?: boolean
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>
  minHeight?: number
}) {
  return (
    <Wrapper readOnly={readOnly} noPadding={noPadding}>
      <div className="border border-zinc-100">
        <Editor
          editorStyle={{
            paddingLeft: '20px',
            paddingRight: '20px',
            minHeight: `${minHeight != 100 ? minHeight : 300}px`,
            width: '100%',
          }}
          readOnly={readOnly}
          editorState={editorState}
          wrapperClassName="wrapper-class"
          toolbarClassName="editorToolbar-hidden"
          editorClassName="editor-class"
          toolbar={{
            options: [
              'inline',
              'list',
              'textAlign',
              'colorPicker',
              'link',
              'emoji',
              'image',
              'history',
            ],
          }}
          localization={{
            locale: 'ko',
          }}
          onEditorStateChange={onEditorStateChange}
        ></Editor>
      </div>
      <div className="w-full flex justify-end items-center pt-5">
        {!readOnly && (
          <Button
            className="px-4 py-2 bg-rose-400 text-white rounded-md hover:bg-rose-500 transition duration-200 ease-in-out mx-1"
            leftIcon={<IconPlus></IconPlus>}
            onClick={onSave}
          >
            글 저장
          </Button>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ readOnly: boolean; noPadding: boolean }>`
  ${(props) =>
    props.readOnly
      ? 'display:flex; flex-direction:column; justify-content:center; align-items:center;'
      : 'display:flex; flex-direction:column; justify-content:center; align-items:center;'}
`

// ${(props) => (props.noPadding ? '' : 'padding: 16px;')}
