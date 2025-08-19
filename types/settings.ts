export interface CompanyInfo {
  name: string
  logo: string
  website: string
  address: string
  taxId: string
  phone: string
  email: string
}

export interface Subscription {
  plan: "free" | "starter" | "professional" | "enterprise"
  status: "active" | "canceled" | "past_due"
  nextBilling: string
  amount: number
  currency: string
}

export interface Invoice {
  id: string
  date: string
  amount: number
  status: "paid" | "pending" | "failed"
  downloadUrl: string
}

export interface Role {
  id: string
  name: string
  permissions: Permission[]
}

export interface Permission {
  id: string
  name: string
  description: string
  module: string
}

export interface ActivityLog {
  id: string
  user: string
  action: string
  details: string
  timestamp: string
}
