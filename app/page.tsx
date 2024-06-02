'use client'

import useAbsence from '@/lib/hooks/useAbsence'

export default function Home() {
  const { data, isLoading, error } = useAbsence()
  console.log({ isLoading, error, data })
  return <div className="text-3xl font-bold underline">Hello world</div>
}
