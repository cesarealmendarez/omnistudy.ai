import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { cn } from "@/lib/utils"
import { supabase } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/ui/icons"

export default function Login() {
    const { push } = useRouter()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()

        setLoading(true)
        setError(null)

        const loginResponse = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (loginResponse.error) {
            setLoading(false)
            setError(loginResponse.error.message)
            console.log(loginResponse.error)
            return
        }

        push("/dashboard")
    }

    const checkSession = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        if (user) { push("/dashboard") }
    }

    useEffect(() => { checkSession() }, [])

    return (
        <>
            <Head>
                <title>Login | Omnistudy</title>
            </Head>

            <div className="container flex h-screen w-screen flex-col items-center justify-center">
                <Link
                    href="/"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute left-4 top-4 md:left-8 md:top-8"
                    )}
                >
                    <>
                        <Icons.chevronLeft className="mr-2 h-4 w-4" />
                        Back
                    </>
                </Link>

                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <Icons.logo className="mx-auto h-6 w-6" />
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Welcome back!
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Log back into your account with your email
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <form onSubmit={handleLogin}>
                            <div className="grid gap-2">
                                <div className="grid gap-1">
                                    <Label className="sr-only" htmlFor="email">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={loading}
                                        value={email}
                                        onChange={(value) => { setEmail(value.target.value) }}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <Label className="sr-only" htmlFor="password">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        placeholder="Password"
                                        type="password"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={loading}
                                        value={password}
                                        onChange={(value) => { setPassword(value.target.value) }}
                                    />
                                    {error && (
                                        <p className="px-1 text-xs text-red-600">
                                            {error}
                                        </p>
                                    )}
                                </div>
                                <button className={cn(buttonVariants())} disabled={loading}>
                                    {loading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            className={cn(buttonVariants({ variant: "outline" }))}
                            onClick={() => { }}
                        >
                            <Icons.gitHub className="mr-2 h-4 w-4" />
                            {" "}
                            Github
                        </button>
                    </div>

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        <Link
                            href="/register"
                            className="hover:text-brand underline underline-offset-4"
                        >
                            Don't have an account? Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}