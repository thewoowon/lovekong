import AutoSizeImage from '../../components/AutonSizeImage'
import ButtonBig from '../../components/ButtonBig'
import CustomEditor from '../../components/Editor'
import { Rating, Slider } from '@mantine/core'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import React from 'react'

export default function Edit() {
  const router = useRouter()

  const [rate, setRate] = useState(5)
  const { orderItemId } = router.query
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string | undefined>(undefined)

  const handleUpload = () => {
    if (inputRef.current && inputRef.current.files) {
      const file = inputRef.current.files[0]
      const form = new FormData()
      form.append('image', file, file.name)

      fetch('/api/upload', {
        method: 'POST',
        body: form,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url)
        })
    }
  }

  useEffect(() => {
    if (orderItemId != null) {
      fetch(`/api/get-comment?orderItemId=${orderItemId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items?.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.contents))
              )
            )
            setRate(data.items.rate)
          } else {
            setEditorState(EditorState.createEmpty())
          }
        })
    }
  }, [orderItemId])

  const handleSave = () => {
    if (editorState && orderItemId !== null) {
      fetch(`/api/update-comment`, {
        method: 'POST',
        body: JSON.stringify({
          rate: rate,
          orderItemId: orderItemId,
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
          Image: [],
        }),
      })
        .then((res) => res.json())
        .then(() => {
          alert('Success Update!')
        })
    }
  }

  return (
    <div>
      {editorState != null && (
        <CustomEditor
          readOnly={false}
          onSave={handleSave}
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      )}
      <div className="p-6 flex justify-end items-center">
        <div className="flex items-center">
          <div className="flex justify-center items-center">평점 : </div>
          <Rating
            value={rate}
            onChange={setRate}
            defaultValue={2}
            size={'lg'}
          />
        </div>
      </div>
      <div>
        <h1>Upload</h1>
        <input ref={useRef} type="file" accept="image/*"></input>
        <ButtonBig onClick={handleUpload}></ButtonBig>
        {image && <AutoSizeImage image={image}></AutoSizeImage>}
      </div>
    </div>
  )
}
