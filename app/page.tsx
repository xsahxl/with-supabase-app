"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Loading from "@/components/ui/loading"

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        router.replace("/info")
      } else {
        router.replace("/auth/login")
      }
    })
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <Loading />
    </div>
  )
}

export default Page