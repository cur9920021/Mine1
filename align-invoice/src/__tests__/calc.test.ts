import { describe, it, expect } from 'vitest'
import { computeTotals } from '@/lib/calc'

describe('calculation logic', ()=>{
  it('percent discount, vat and discount tax and transport', ()=>{
    const t = computeTotals({
      items: [
        { id:'1', name:'A', quantity:2, unitPrice:100 },
        { id:'2', name:'B', quantity:1, unitPrice:50 },
      ],
      discountMode: 'percent', discountValue: 10,
      applyVat: true, applyDiscountTax: true, transport: 25
    })
    expect(t.subtotal).toBe(250)
    expect(t.discountAmount).toBe(25)
    expect(t.afterDiscount).toBe(225)
    expect(t.vatAmount).toBeCloseTo(31.5, 2)
    expect(t.discountTaxAmount).toBeCloseTo(2.25, 2)
    expect(t.transport).toBe(25)
    expect(t.netOrder).toBeCloseTo(279.25, 2)
  })

  it('amount discount cannot exceed subtotal', ()=>{
    const t = computeTotals({
      items: [{ id:'1', name:'A', quantity:1, unitPrice:100 }],
      discountMode: 'amount', discountValue: 120,
      applyVat: false, applyDiscountTax: false, transport: 0
    })
    expect(t.discountAmount).toBe(100)
    expect(t.afterDiscount).toBe(0)
    expect(t.netOrder).toBe(0)
  })
})

