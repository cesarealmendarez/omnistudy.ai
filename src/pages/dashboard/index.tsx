import { useEffect } from "react"
import { useRouter } from "next/router"

import { cn } from "@/lib/utils"
import { supabase } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

export default function Dashboard() {
    const { push } = useRouter()

    async function handleLogout() {
        const logoutResponse = await supabase.auth.signOut()

        if (logoutResponse.error) {
            console.log(logoutResponse.error)
            return
        }

        push("/login")
    }
    const checkSession = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) { push("/login") }
    }

    useEffect(() => { checkSession() }, [])

    return (
        <div>
            <h1>Dashboard</h1>

            <button
                type="button"
                className={cn(buttonVariants({ variant: "outline" }))}
                onClick={handleLogout}
            >
                <Icons.gitHub className="mr-2 h-4 w-4" />
                {" "}
                Logout
            </button>
        </div>
    )
}