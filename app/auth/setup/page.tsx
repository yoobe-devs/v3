"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SetupPage() {
  const [step, setStep] = useState(1)
  const [storeName, setStoreName] = useState("")
  const [subdomain, setSubdomain] = useState("")
  const [website, setWebsite] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleNextStep = () => {
    setError("")
    if (step === 1) {
      if (!storeName || !subdomain) {
        setError("Por favor, preencha os campos obrigatórios.")
        return
      }
      // Implement subdomain uniqueness check here
    }
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Setup complete, redirect to dashboard
      router.push("/dashboard")
    }
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!["image/jpeg", "image/png", "image/svg+xml"].includes(file.type)) {
        setError("Formato de arquivo não suportado.")
        return
      }
      setLogo(file)
      setError("")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Configuração Inicial</CardTitle>
          <CardDescription>Configure sua loja em poucos passos</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={`step${step}`} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="step1">Loja</TabsTrigger>
              <TabsTrigger value="step2">Branding</TabsTrigger>
              <TabsTrigger value="step3">Concluir</TabsTrigger>
            </TabsList>
            <TabsContent value="step1">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Nome da loja*</Label>
                  <Input
                    id="storeName"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subdomain">Subdomínio*</Label>
                  <Input
                    id="subdomain"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Site da empresa</Label>
                  <Input
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="step2">
              <div className="space-y-4">
                <Label htmlFor="logo">Logo da empresa</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/jpeg,image/png,image/svg+xml"
                  onChange={handleLogoUpload}
                />
                {logo && (
                  <div className="mt-4">
                    <Image
                      src={URL.createObjectURL(logo)}
                      alt="Logo preview"
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="step3">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Configuração Concluída!</h3>
                <p>Sua loja está pronta para começar. O que deseja fazer agora?</p>
              </div>
            </TabsContent>
          </Tabs>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Voltar
            </Button>
          )}
          <Button onClick={handleNextStep}>
            {step < 3 ? "Próximo" : "Ir para o Dashboard"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
