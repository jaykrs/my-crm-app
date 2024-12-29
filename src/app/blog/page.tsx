'use client'
import Banner from '../components/Banner/Banner';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <main>
      <Banner />
     
    </main>
  )
}
