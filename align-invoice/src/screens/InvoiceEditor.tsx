import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore, ensureUniqueNumber, cryptoRandomId } from '@/store'
import { Invoice, InvoiceItem } from '@/types'
import { computeTotals } from '@/lib/calc'

export function InvoiceEditor({ mode }: { mode: 'create'|'edit' }){
  const params = useParams()
  const navigate = useNavigate()
  const { invoices, upsert, nextSeq } = useStore()
  const existing = mode==='edit' ? invoices[params.id as string] : undefined

  const [model,setModel] = useState<Invoice>(()=> existing ?? emptyInvoice(nextSeq))
  useEffect(()=>{ if(existing) setModel(existing) }, [existing])

  const totals = useMemo(()=> computeTotals({
    items: model.items,
    discountMode: model.discountMode,
    discountValue: model.discountValue,
    applyVat: model.applyVat,
    applyDiscountTax: model.applyDiscountTax,
    transport: model.transport,
  }), [model])

  function update<K extends keyof Invoice>(key: K, value: Invoice[K]){ setModel(m=> ({...m, [key]: value, updatedAt: new Date().toISOString()})) }
  function updateClient<K extends keyof Invoice['client']>(key: K, value: Invoice['client'][K]){ setModel(m=> ({...m, client: { ...m.client, [key]: value }, updatedAt: new Date().toISOString()})) }

  function addItem(){ setModel(m=> ({...m, items: [...m.items, newItem()], updatedAt: new Date().toISOString()})) }
  function removeItem(id: string){ setModel(m=> ({...m, items: m.items.filter(x=>x.id!==id), updatedAt: new Date().toISOString()})) }

  function save(){
    if(!model.invoiceNumber.trim()) return alert('Invoice Number is required')
    if(!ensureUniqueNumber(model.invoiceNumber, model.id)) return alert('Invoice Number must be unique')
    if(!model.invoiceDate) return alert('Invoice Date is required')
    if(!(model.client.company || model.client.client)) return alert('Client is required')
    if(model.items.length===0) return alert('At least one item')
    for(const it of model.items){ if(it.quantity<=0 || it.unitPrice<0) return alert('Invalid item quantities/prices') }
    const now = new Date().toISOString()
    upsert({ ...model, updatedAt: now })
    navigate(`/invoices/${model.id}`)
  }

  return (
    <div className="container">
      <div className="card" style={{padding:16}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h2>{mode==='create'?'New Invoice':'Edit Invoice'}</h2>
          <div>
            <button className="btn" onClick={save}>Save</button>
            <Link to={mode==='create'?'/invoices':'/invoices/'+model.id} className="btn secondary" style={{marginLeft:8}}>Cancel</Link>
          </div>
        </div>

        <div className="grid three" style={{marginTop:12}}>
          <div>
            <label>Invoice Number</label>
            <input className="input" value={model.invoiceNumber} onChange={e=>update('invoiceNumber', e.target.value)} />
          </div>
          <div>
            <label>Date</label>
            <input className="input" type="date" value={model.invoiceDate.slice(0,10)} onChange={e=>update('invoiceDate', new Date(e.target.value).toISOString())} />
          </div>
          <div>
            <label>Account No</label>
            <input className="input" value={model.accountNo||''} onChange={e=>update('accountNo', e.target.value)} />
          </div>
        </div>

        <h3 style={{marginTop:16}}>Client</h3>
        <div className="grid three">
          <div><label>Company</label><input className="input" value={model.client.company||''} onChange={e=>updateClient('company', e.target.value)} /></div>
          <div><label>Client</label><input className="input" value={model.client.client||''} onChange={e=>updateClient('client', e.target.value)} /></div>
          <div><label>Project</label><input className="input" value={model.client.project||''} onChange={e=>updateClient('project', e.target.value)} /></div>
          <div><label>Location</label><input className="input" value={model.client.location||''} onChange={e=>updateClient('location', e.target.value)} /></div>
          <div><label>Area</label><input className="input" value={model.client.area||''} onChange={e=>updateClient('area', e.target.value)} /></div>
          <div><label>Designer</label><input className="input" value={model.client.designer||''} onChange={e=>updateClient('designer', e.target.value)} /></div>
          <div><label>Contact person</label><input className="input" value={model.client.contactPerson||''} onChange={e=>updateClient('contactPerson', e.target.value)} /></div>
          <div><label>Contact number</label><input className="input" value={model.client.contactNumber||''} onChange={e=>updateClient('contactNumber', e.target.value)} /></div>
        </div>

        <h3 style={{marginTop:16}}>Items</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Code</th><th>Type</th><th>Description</th><th>Color</th><th>Qty</th><th>Unit Price</th><th>Total</th><th></th>
            </tr>
          </thead>
          <tbody>
            {model.items.map(it => (
              <tr key={it.id}>
                <td><input className="input" value={it.code||''} onChange={e=>editItem(it.id,{code:e.target.value})} /></td>
                <td><input className="input" value={it.type||''} onChange={e=>editItem(it.id,{type:e.target.value})} /></td>
                <td><input className="input" value={it.name} onChange={e=>editItem(it.id,{name:e.target.value})} /></td>
                <td><input className="input" value={it.color||''} onChange={e=>editItem(it.id,{color:e.target.value})} /></td>
                <td><input className="input" type="number" min={0} step={0.01} value={it.quantity} onChange={e=>editItem(it.id,{quantity:Number(e.target.value)})} /></td>
                <td><input className="input" type="number" min={0} step={0.01} value={it.unitPrice} onChange={e=>editItem(it.id,{unitPrice:Number(e.target.value)})} /></td>
                <td>{(it.quantity*it.unitPrice).toFixed(2)}</td>
                <td><button className="btn danger" onClick={()=>removeItem(it.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn" style={{marginTop:8}} onClick={addItem}>Add Item</button>

        <h3 style={{marginTop:16}}>Totals</h3>
        <div className="grid two">
          <div className="card" style={{padding:12}}>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <label><input type="radio" checked={model.discountMode==='percent'} onChange={()=>update('discountMode','percent')} /> Percent</label>
              <label><input type="radio" checked={model.discountMode==='amount'} onChange={()=>update('discountMode','amount')} /> Amount</label>
              <input className="input" type="number" min={0} step={0.01} value={model.discountValue} onChange={e=>update('discountValue', Number(e.target.value))} />
            </div>
            <div style={{marginTop:8}}>
              <label><input type="checkbox" checked={model.applyVat} onChange={e=>update('applyVat', e.target.checked)} /> Apply VAT 14%</label>
            </div>
            <div>
              <label><input type="checkbox" checked={model.applyDiscountTax} onChange={e=>update('applyDiscountTax', e.target.checked)} /> Apply Discount Tax 1%</label>
            </div>
            <div>
              <label>Transport</label>
              <input className="input" type="number" min={0} step={0.01} value={model.transport} onChange={e=>update('transport', Number(e.target.value))} />
            </div>
          </div>
          <div className="card" style={{padding:12}}>
            <div>Subtotal: {totals.subtotal.toFixed(2)}</div>
            <div>Discount: {totals.discountAmount.toFixed(2)}</div>
            <div>After Discount: {totals.afterDiscount.toFixed(2)}</div>
            <div>VAT 14%: {totals.vatAmount.toFixed(2)}</div>
            <div>Discount Tax 1%: {totals.discountTaxAmount.toFixed(2)}</div>
            <div>Transport: {totals.transport.toFixed(2)}</div>
            <div className="badge-total" style={{marginTop:8}}>Net Order: {totals.netOrder.toFixed(2)}</div>
          </div>
        </div>

        <h3 style={{marginTop:16}}>Payments & Notes</h3>
        <div className="grid two">
          <div>
            <label>Payment Terms</label>
            <input className="input" value={model.paymentTerms} onChange={e=>update('paymentTerms', e.target.value)} />
          </div>
          <div>
            <label>Notes / Terms</label>
            <textarea className="input" rows={4} value={model.notes||''} onChange={e=>update('notes', e.target.value)} />
          </div>
        </div>

      </div>
    </div>
  )

  function editItem(id: string, patch: Partial<InvoiceItem>){
    setModel(m=> ({...m, items: m.items.map(x=> x.id===id ? { ...x, ...patch } : x), updatedAt: new Date().toISOString()}))
  }
}

function emptyInvoice(seq: number): Invoice{
  const id = cryptoRandomId()
  return {
    id,
    invoiceNumber: `INV-${String(seq).padStart(4,'0')}`,
    invoiceDate: new Date().toISOString(),
    accountNo: '',
    client: {},
    items: [newItem()],
    discountMode: 'percent',
    discountValue: 0,
    applyVat: true,
    applyDiscountTax: false,
    transport: 0,
    paymentTerms: '75% down payment, 25% upon delivery',
    notes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

function newItem(): InvoiceItem { return { id: cryptoRandomId(), name: '', quantity: 1, unitPrice: 0 } }

