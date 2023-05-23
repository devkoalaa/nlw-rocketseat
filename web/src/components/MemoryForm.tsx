'use client'

import { Camera } from 'lucide-react'
import { MediaPicker } from './MediaPicker'
import { FormEvent, useState } from 'react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export function MemoryForm({
  id,
  coverUrl,
  contentProp,
  isPublicProp = false,
}: {
  id: string
  coverUrl: string
  contentProp?: string
  isPublicProp: boolean
}) {
  const router = useRouter()
  const [content, setContent] = useState(contentProp)
  const [isPublic, setIsPublic] = useState<boolean>(isPublicProp)

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const fileToUpload = formData.get('coverUrl')
    const verificador = formData.get('verificador')
    // console.log(Array.from(formData.entries()))

    if (verificador === 'true' && fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)
      const uploadResponse = await api.post('/upload', uploadFormData)
      coverUrl = uploadResponse.data.fileUrl
    }

    const token = Cookie.get('token')

    if (id) {
      // editando
      await api.put(
        `/memories/${id}`,
        {
          coverUrl,
          content,
          isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    } else {
      // criando
      await api.post(
        '/memories',
        {
          coverUrl,
          content,
          isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    }

    router.push('/')
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 focus:ring-0"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker coverUrl={coverUrl} />

      <textarea
        onChange={(e) => setContent(e.target.value)}
        value={content}
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:pl-1 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        className="inline-block self-end  rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        SALVAR
      </button>
    </form>
  )
}
