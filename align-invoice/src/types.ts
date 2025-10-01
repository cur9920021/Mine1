export type DiscountMode = 'percent' | 'amount'

export interface InvoiceItem {
  id: string
  code?: string
  type?: string
  name: string
  color?: string
  quantity: number
  unitPrice: number
}

export interface ClientInfo {
  company?: string
  client?: string
  project?: string
  location?: string
  area?: string
  designer?: string
  contactPerson?: string
  contactNumber?: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  invoiceDate: string
  accountNo?: string
  client: ClientInfo
  items: InvoiceItem[]
  discountMode: DiscountMode
  discountValue: number
  applyVat: boolean
  applyDiscountTax: boolean
  transport: number
  paymentTerms: string
  notes?: string
  logoDataUrl?: string
  signatureDataUrl?: string
  stampDataUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Totals {
  subtotal: number
  discountAmount: number
  afterDiscount: number
  vatAmount: number
  discountTaxAmount: number
  transport: number
  netOrder: number
}

