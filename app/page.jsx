import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center flex-col gap-4'>
      <h2 className='font-semibold text-5xl'>Home Page</h2>
      <Link href='/dashboard' className='mt-4 bg-black text-white px-4 py-2 rounded'>Go to Dashboard</Link>
    </div>
  )
}

export default page
