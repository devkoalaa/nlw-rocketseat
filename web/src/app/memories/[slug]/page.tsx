import { MemoryForm } from '@/components/MemoryForm'
import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function EditMemory(context: {
  params: { slug: string }
}) {
  const token = cookies().get('token')?.value

  const response = await api.get(`/memories/${context.params.slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  // console.log(response.data)

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <MemoryForm
        id={response.data.id}
        coverUrl={response.data.coverUrl}
        contentProp={response.data.content}
        isPublicProp={response.data.isPublic}
      />
    </div>
  )
}
