import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  console.log('tokennn galinha', cookies().get('token'))

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories = response.data

  if (memories.lenght === 0) {
    return <EmptyMemories />
  }

  return <div className="flex flex-col gap-10 p-8">hoi</div>
}
