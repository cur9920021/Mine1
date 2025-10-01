import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Invoice } from './types'

type State = {
  invoices: Record<string, Invoice>
  nextSeq: number
}

type Actions = {
  upsert: (invoice: Invoice) => void
  remove: (id: string) => void
  clone: (id: string) => string | null
}

export const useStore = create<State & Actions>()(persist((set, get) => ({
  invoices: {},
  nextSeq: 1,
  upsert: (invoice) => set((s) => ({
    invoices: { ...s.invoices, [invoice.id]: invoice },
    nextSeq: Math.max(s.nextSeq, safeParseSeq(invoice.invoiceNumber) + 1)
  })),
  remove: (id) => set((s) => { const copy = { ...s.invoices }; delete copy[id]; return { invoices: copy } }),
  clone: (id) => {
    const s = get()
    const src = s.invoices[id]
    if (!src) return null
    const newId = cryptoRandomId()
    const seq = s.nextSeq
    const invoiceNumber = `INV-${String(seq).padStart(4, '0')}`
    const now = new Date().toISOString()
    const copy: Invoice = { ...src, id: newId, invoiceNumber, createdAt: now, updatedAt: now }
    set({ invoices: { ...s.invoices, [newId]: copy }, nextSeq: seq + 1 })
    return newId
  }
}), { name: 'align-invoices' }))

export function ensureUniqueNumber(num: string, excludeId?: string): boolean {
  const invs = Object.values(useStore.getState().invoices)
  return !invs.some(i => i.invoiceNumber.trim() === num.trim() && i.id !== excludeId)
}

export function cryptoRandomId(): string { return Math.random().toString(36).slice(2) + Date.now().toString(36) }

function safeParseSeq(invoiceNumber: string): number {
  const match = /([0-9]{1,})$/.exec(invoiceNumber || '')
  return match ? Number(match[1]) || 0 : 0
}

