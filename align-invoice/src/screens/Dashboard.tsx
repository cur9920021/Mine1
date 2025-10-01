import { Link, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useStore } from '@/store'

export function Dashboard(){
  const { invoices, clone, remove } = useStore()
  const list = Object.values(invoices)
  const [q,setQ] = useState('')
  const navigate = useNavigate()
  const filtered = useMemo(()=> list.filter(i =>
    (i.invoiceNumber + ' ' + (i.client.company||'') + ' ' + (i.client.client||'')).toLowerCase().includes(q.toLowerCase())
  ).sort((a,b)=> (b.updatedAt.localeCompare(a.updatedAt))), [list,q])
  return (
    <div className="container">
      <div className="card" style={{padding:16}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <h2>Invoices</h2>
          <Link to="/invoices/new" className="btn">New Invoice</Link>
        </div>
        <input className="input" placeholder="Search invoices..." value={q} onChange={e=>setQ(e.target.value)} />
        <table className="table" style={{marginTop:12}}>
          <thead>
            <tr><th>Invoice #</th><th>Client</th><th>Date</th><th>Total</th><th style={{width:240}}>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(i=> (
              <tr key={i.id}>
                <td>{i.invoiceNumber}</td>
                <td>{i.client.company || i.client.client}</td>
                <td>{new Date(i.invoiceDate).toLocaleDateString()}</td>
                <td>{Intl.NumberFormat(undefined,{style:'currency',currency:'EGP'}).format(i.items.reduce((s,it)=> s + it.quantity*it.unitPrice,0))}</td>
                <td>
                  <Link to={`/invoices/${i.id}`} className="btn secondary" style={{marginRight:6}}>View</Link>
                  <Link to={`/invoices/${i.id}/edit`} className="btn secondary" style={{marginRight:6}}>Edit</Link>
                  <button className="btn secondary" style={{marginRight:6}} onClick={()=>{ const id = clone(i.id); if(id) navigate(`/invoices/${id}/edit`) }}>Clone</button>
                  <button className="btn danger" onClick={()=>{ if(confirm('Delete invoice?')) remove(i.id) }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

