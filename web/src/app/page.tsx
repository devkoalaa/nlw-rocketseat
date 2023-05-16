'use client'
import { useState } from 'react'

export default function Home() {
  const [result, setResult] = useState<any>()

  async function getApi() {
    fetch('http://localhost:3333/users').then((response) => {
      response.json().then((data) => {
        setResult(data)
      })
    })
  }

  return (
    <div className="h-screen bg-zinc-900 p-6 text-zinc-50">
      <h1 className="text-4xl font-bold">Sua cápsula do tempo</h1>
      <button className="m-2 rounded bg-gray-700 p-2" onClick={getApi}>
        Get API
      </button>
      {result &&
        result.map((item: any) => {
          return (
            <p className="m-2 bg-zinc-700 text-2xl" key={item.id}>
              {item.name}
            </p>
          )
        })}
    </div>
  )
}
