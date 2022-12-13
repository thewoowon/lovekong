import CustomEditor from '@components/Editor'
import Editor from '@components/Editor'
import { Pagination } from '@mantine/core'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

export default function QNAWrite() {
  const handleSave = () => {
    if (editorState) {
      fetch(`/api/update-comment`, {
        method: 'POST',
        body: JSON.stringify({
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
        }),
      })
        .then((res) => res.json())
        .then(() => {
          alert('Success Update!')
        })
    }
  }

  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  )
  return (
    <div className="flex flex-col justify-center  items-center">
      <CustomEditor
        onSave={handleSave}
        editorState={editorState ?? EditorState.createEmpty()}
        onEditorStateChange={setEditorState}
      />
    </div>
  )
}
