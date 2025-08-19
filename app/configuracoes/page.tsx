"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, CreditCard, Download, Globe, Mail, Phone, Plus, Shield } from "lucide-react"
import type { CompanyInfo, Subscription, Invoice, Role, ActivityLog } from "@/types/settings"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const companyInfo: CompanyInfo = {
  name: "Yoobe Inc",
  logo: "/placeholder.svg?height=100&width=100",
  website: "https://yoobe.co",
  address: "123 Business St, São Paulo, SP",
  taxId: "12.345.678/0001-90",
  phone: "(11) 98765-4321",
  email: "contato@yoobe.co",
}

const subscription: Subscription = {
  plan: "professional",
  status: "active",
  nextBilling: "2024-03-06",
  amount: 299.0,
  currency: "BRL",
}

const invoices: Invoice[] = [
  {
    id: "INV-001",
    date: "2024-02-06",
    amount: 299.0,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "INV-002",
    date: "2024-01-06",
    amount: 299.0,
    status: "paid",
    downloadUrl: "#",
  },
]

const roles: Role[] = [
  {
    id: "admin",
    name: "Administrador",
    permissions: [
      { id: "1", name: "create_campaign", description: "Criar campanhas", module: "campaigns" },
      { id: "2", name: "manage_users", description: "Gerenciar usuários", module: "users" },
    ],
  },
  {
    id: "manager",
    name: "Gerente",
    permissions: [{ id: "1", name: "create_campaign", description: "Criar campanhas", module: "campaigns" }],
  },
]

const activityLogs: ActivityLog[] = [
  {
    id: "1",
    user: "João Silva",
    action: "Atualização de plano",
    details: "Alterou plano de Starter para Professional",
    timestamp: "2024-02-06T14:30:00",
  },
  {
    id: "2",
    user: "Maria Santos",
    action: "Nova função criada",
    details: "Criou função: Gerente de Campanhas",
    timestamp: "2024-02-05T16:45:00",
  },
]

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Nome da empresa deve ter pelo menos 2 caracteres",
  }),
  website: z.string().url({
    message: "Website deve ser uma URL válida",
  }),
  address: z.string(),
  taxId: z.string(),
  phone: z.string(),
  email: z.string().email({
    message: "Email deve ser válido",
  }),
})

export default function ConfiguracoesPage() {
  const [currentPlan, setCurrentPlan] = useState(subscription.plan)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: companyInfo.name,
      website: companyInfo.website,
      address: companyInfo.address,
      taxId: companyInfo.taxId,
      phone: companyInfo.phone,
      email: companyInfo.email,
    },
  })

  const handleUpgrade = () => {
    router.push("/upgrade")
  }

  const handleCancel = () => {
    // Implement cancellation logic here
    console.log("Canceling subscription")
  }

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Implement logo upload logic here
      console.log("Uploading new logo:", file.name)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList>
          <TabsTrigger value="company">Empresa</TabsTrigger>
          <TabsTrigger value="subscription">Assinatura</TabsTrigger>
          <TabsTrigger value="roles">Funções</TabsTrigger>
          <TabsTrigger value="activity">Atividade</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>Gerencie as informações básicas da sua empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo da Empresa</Label>
                <div className="flex items-center gap-4">
                  <img
                    src={companyInfo.logo || "/placeholder.svg"}
                    alt="Company logo"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <Input type="file" id="logo-upload" className="hidden" onChange={handleLogoChange} accept="image/*" />
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>Alterar Logo</span>
                    </Button>
                  </Label>
                </div>
              </div>

              <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-6">
                <Form {...form}>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da Empresa</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <Building2 className="w-4 h-4 text-muted-foreground mt-2" />
                              <Input {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <Globe className="w-4 h-4 text-muted-foreground mt-2" />
                              <Input {...field} type="url" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="taxId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNPJ</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground mt-2" />
                              <Input {...field} type="tel" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground mt-2" />
                            <Input {...field} type="email" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Salvar Alterações</Button>
                </Form>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Plano Atual</CardTitle>
                <CardDescription>Gerencie sua assinatura e faturamento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold capitalize">{subscription.plan}</h3>
                    <p className="text-sm text-muted-foreground">
                      Próxima cobrança em {format(new Date(subscription.nextBilling), "dd 'de' MMMM", { locale: ptBR })}
                    </p>
                  </div>
                  <Badge variant={subscription.status === "active" ? "default" : "destructive"}>
                    {subscription.status === "active" ? "Ativo" : "Cancelado"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-sm font-medium">Valor mensal</p>
                    <p className="text-2xl font-bold">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: subscription.currency,
                      }).format(subscription.amount)}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button onClick={handleUpgrade}>Alterar Plano</Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Método de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-8 h-8" />
                    <div>
                      <p className="font-medium">Cartão de Crédito</p>
                      <p className="text-sm text-muted-foreground">Mastercard terminando em 4321</p>
                    </div>
                  </div>
                  <Button variant="outline">Alterar</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Faturas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Número</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Download</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{format(new Date(invoice.date), "dd/MM/yyyy")}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(invoice.amount)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={invoice.status === "paid" ? "default" : "destructive"}>
                            {invoice.status === "paid" ? "Pago" : "Pendente"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roles">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Funções e Permissões</CardTitle>
                    <CardDescription>Gerencie as funções e permissões dos usuários</CardDescription>
                  </div>
                  <Dialog key={roles[0].id}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Função
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Criar Nova Função</DialogTitle>
                        <DialogDescription>Defina um nome e as permissões para a nova função</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="role-name">Nome da Função</Label>
                          <Input id="role-name" />
                        </div>
                        <div className="space-y-4">
                          <Label>Permissões</Label>
                          {roles[0].permissions.map((permission) => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <Checkbox id={`permission-${permission.id}`} />
                              <Label htmlFor={`permission-${permission.id}`}>{permission.description}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Criar Função</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {roles.map((role) => (
                    <Card key={role.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            <CardTitle>{role.name}</CardTitle>
                          </div>
                          <Button variant="outline">Editar</Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium">Permissões:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {role.permissions.map((permission) => (
                              <div key={permission.id} className="flex items-center gap-2">
                                <Badge variant="secondary">{permission.description}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Log de Atividades</CardTitle>
              <CardDescription>Histórico de alterações e ações na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Detalhes</TableHead>
                    <TableHead>Data/Hora</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell>{format(new Date(log.timestamp), "dd/MM/yyyy HH:mm")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
