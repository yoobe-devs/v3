"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail } from 'lucide-react'
import { FcGoogle } from "react-icons/fc"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [language, setLanguage] = useState("pt")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (isLogin) {
      // Login logic
      if (!email || !password) {
        setError("Por favor, preencha todos os campos.")
        return
      }
      // Implement login API call here
      console.log("Login with", email, password)
      router.push("/dashboard")
    } else {
      // Register logic
      if (!email || !confirmEmail || !password) {
        setError("Todos os campos são obrigatórios.")
        return
      }
      if (email !== confirmEmail) {
        setError("Os e-mails digitados não conferem.")
        return
      }
      if (password.length < 6) {
        setError("A senha deve conter pelo menos 6 caracteres.")
        return
      }
      // Implement register API call here
      console.log("Register with", email, password)
      router.push("/auth/setup")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Visual design */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo à Yoobe</h1>
          <p className="text-xl">Gerencie sua loja de brindes com facilidade</p>
        </div>
      </div>

      {/* Right side - Login/Register form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{isLogin ? "Login" : "Cadastro"}</CardTitle>
            <CardDescription>
              {isLogin
                ? "Acesse sua conta para gerenciar sua loja de brindes"
                : "Crie sua conta para começar a usar a plataforma"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemplo@dominio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmEmail">Confirmar E-mail</Label>
                    <Input
                      id="confirmEmail"
                      type="email"
                      placeholder="exemplo@dominio.com"
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full">
                  {isLogin ? "Entrar" : "Cadastrar"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button variant="outline" className="w-full">
              <FcGoogle className="mr-2 h-4 w-4" />
              {isLogin ? "Login com Google" : "Cadastro com Google"}
            </Button>
            {isLogin && (
              <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                Esqueceu sua senha?
              </Link>
            )}
            <p className="text-sm text-center">
              {isLogin ? "Não tem uma conta?" : "Já possui uma conta?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-blue-600 hover:underline"
              >
                {isLogin ? "Quero me cadastrar" : "Faça o login"}
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Language selector */}
      <div className="absolute top-4 right-4">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Idioma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pt">Português</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
