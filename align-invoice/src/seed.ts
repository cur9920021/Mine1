import { useStore } from './store'
import { Invoice } from './types'

export function ensureSeed(){
  const { invoices, upsert, nextSeq } = useStore.getState()
  if(Object.keys(invoices).length>0) return
  const now = new Date().toISOString()
  const sample: Invoice = {
    id: 'seed-1',
    invoiceNumber: `INV-${String(nextSeq).padStart(4,'0')}`,
    invoiceDate: now,
    accountNo: 'A-001',
    client: { company: 'Sample Client Co.', client: 'John Smith', contactNumber: '0123456789' },
    items: [
      { id: 'i1', name: 'Curtain Fabric - Premium', type:'Fabric', color:'Beige', quantity: 2, unitPrice: 750 },
      { id: 'i2', name: 'Installation Service', type:'Service', quantity: 1, unitPrice: 300 }
    ],
    discountMode: 'percent',
    discountValue: 5,
    applyVat: true,
    applyDiscountTax: true,
    transport: 150,
    paymentTerms: '75% down payment, 25% upon delivery',
    notes: 'Delivery within 10 business days.',
    createdAt: now,
    updatedAt: now,
  }
  upsert(sample)
}

