export interface SwagOrder {
  id: string
  productName: string
  recipient: string
  orderDate: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  trackingNumber: string
  estimatedDelivery: string
}

export interface SwagMetrics {
  totalOrders: number
  activeOrders: number
  deliveredOrders: number
  averageDeliveryTime: number
}
