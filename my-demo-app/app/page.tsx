'use client'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to FURTHER</h1>
      <button
        onClick={() => {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            event: 'demoRequestClick',
            page: 'HomePage',
            label: 'Request Demo Button',
          })
          console.log('demoRequestClick pushed to dataLayer')
        }}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-4"
      >
        Click to Request Demo
      </button>
      <Link href="/about" className="text-blue-500 underline mt-4">
        Track a Page View
      </Link>
    </main>
  )
}
