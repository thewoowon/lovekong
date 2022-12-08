import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled from '@emotion/styled'
import { EditorState } from 'draft-js'
import { Dispatch, SetStateAction, useState } from 'react'
import { Button } from '@mantine/core'

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  }
)

export default function CustomEditor({
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
      <Editor
        editorStyle={{
          padding: '5px',
          minHeight: `${minHeight != 100 ? minHeight : 400}px`,
        }}
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        wrapperClassName="wrapper-class"
        toolbarClassName="editorToolbar-hidden"
        editorClassName="editor-class"
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
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
      {!readOnly && <Button onClick={onSave}>Save</Button>}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ readOnly: boolean; noPadding: boolean }>`
  ${(props) =>
    props.readOnly
      ? 'border:0.5px solid rgba(200,200,200,1); margin-top:20px; margin-bottom:20px; border-radius:5px;'
      : 'border: 0.5px solid rgba(200,200,200,1) ;border-radius:5px;'}
`

// ${(props) => (props.noPadding ? '' : 'padding: 16px;')}
