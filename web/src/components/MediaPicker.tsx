'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker({ coverUrl }: { coverUrl: string }) {
  const [preview, setPreview] = useState<string>(coverUrl)
  const [verificador, setVerificador] = useState('false')

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    setVerificador('true')
    const { files } = event.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        name="coverUrl"
        type="file"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
      />
      <input type="hidden" name="verificador" value={verificador} />

      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
