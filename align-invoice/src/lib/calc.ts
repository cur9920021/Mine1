import { DiscountMode, Totals, InvoiceItem } from '@/types'

export function computeSubtotal(items: InvoiceItem[]): number {
  return round2(items.reduce((s, it) => s + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0), 0))
}

export function computeDiscount(mode: DiscountMode, value: number, subtotal: number): number {
  if (subtotal <= 0) return 0
  if (mode === 'percent') {
    const pct = Math.min(Math.max(value, 0), 100)
    return round2((pct / 100) * subtotal)
  }
  return round2(Math.min(Math.max(value, 0), subtotal))
}

export function computeTotals(params: {
  items: InvoiceItem[]
  discountMode: DiscountMode
  discountValue: number
  applyVat: boolean
  applyDiscountTax: boolean
  transport: number
}): Totals {
  const subtotal = computeSubtotal(params.items)
  const discountAmount = computeDiscount(params.discountMode, params.discountValue, subtotal)
  const afterDiscount = round2(subtotal - discountAmount)
  const vatAmount = params.applyVat ? round2(afterDiscount * 0.14) : 0
  const discountTaxAmount = params.applyDiscountTax ? round2(afterDiscount * 0.01) : 0
  const transport = round2(Math.max(Number(params.transport) || 0, 0))
  const netOrder = round2(afterDiscount + vatAmount - discountTaxAmount + transport)
  return { subtotal, discountAmount, afterDiscount, vatAmount, discountTaxAmount, transport, netOrder }
}

export function round2(n: number): number { return Math.round((n + Number.EPSILON) * 100) / 100 }

