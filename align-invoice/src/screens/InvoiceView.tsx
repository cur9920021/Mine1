import { Link, useParams } from 'react-router-dom'
import { useStore } from '@/store'
import { computeTotals } from '@/lib/calc'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export function InvoiceView(){
  const { id } = useParams()
  const { invoices } = useStore()
  const inv = invoices[id as string]
  if(!inv) return <div className="container"><div className="card" style={{padding:16}}>Invoice not found. <Link to="/invoices" className="btn secondary" style={{marginLeft:8}}>Back</Link></div></div>
  const totals = computeTotals({
    items: inv.items,
    discountMode: inv.discountMode,
    discountValue: inv.discountValue,
    applyVat: inv.applyVat,
    applyDiscountTax: inv.applyDiscountTax,
    transport: inv.transport,
  })

  async function downloadPdf(){
    const node = document.getElementById('printable') as HTMLElement
    const canvas = await html2canvas(node, { scale: 2, backgroundColor: '#ffffff' })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ unit:'mm', format:'a4', orientation:'portrait' })
    const pageW = 210, pageH = 297
    pdf.addImage(imgData, 'PNG', 0, 0, pageW, pageH)
    const file = `${inv.invoiceNumber}_${(inv.client.company||inv.client.client||'Client').replace(/\s+/g,'_')}.pdf`
    pdf.save(file)
  }

  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <Link to="/invoices" className="btn secondary">Back</Link>
        <div>
          <Link to={`/invoices/${inv.id}/edit`} className="btn secondary" style={{marginRight:8}}>Edit</Link>
          <button className="btn" onClick={downloadPdf}>Download PDF</button>
        </div>
      </div>
      <div className="a4 card">
        <div className="a4-inner" id="printable">
          <header className="header-band">
            <div className="logo">
              <div style={{width:48,height:48,background:'#fff0',borderRadius:8,border:'2px solid #fff'}}></div>
              <div>
                <div style={{fontWeight:800,fontSize:18}}>ALIGN FABRICS & CURTAINS</div>
                <div style={{opacity:.8,fontSize:12}}>Tax No: 652597947 · 40 Mohamed Farid ST, Nozhz, Heliopolis, Cairo</div>
                <div style={{opacity:.8,fontSize:12}}>Eng.Mohamed Kamel : 01008617790 · Eng.Mohamed Sobhy : 01100100751</div>
              </div>
              <div style={{marginLeft:'auto',fontSize:26,fontWeight:800}}>INVOICE</div>
            </div>
          </header>

          <section style={{display:'flex',gap:24,marginTop:12}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,marginBottom:6}}>To:</div>
              <div style={{lineHeight:1.6}}>
                <div>{inv.client.company||inv.client.client}</div>
                {inv.client.client && <div>{inv.client.client}</div>}
                {inv.client.contactNumber && <div>Phone: {inv.client.contactNumber}</div>}
              </div>
            </div>
            <div style={{width:360}}>
              <div className="grid two">
                <div>Invoice No</div><div style={{fontWeight:700}}>{inv.invoiceNumber}</div>
                <div>Date</div><div style={{fontWeight:700}}>{new Date(inv.invoiceDate).toLocaleDateString()}</div>
                {inv.accountNo ? (<><div>Account No</div><div style={{fontWeight:700}}>{inv.accountNo}</div></>) : null}
              </div>
            </div>
          </section>

          <table className="table" style={{marginTop:12}}>
            <thead><tr><th style={{background:'#f5c84f'}}>ITEM DESCRIPTION</th><th>PRICE</th><th>QTY</th><th>TOTAL</th></tr></thead>
            <tbody>
              {inv.items.map((it,idx)=> (
                <tr key={it.id}>
                  <td>
                    <div style={{fontWeight:600}}>{it.name}</div>
                    <div style={{color:'#666',fontSize:12}}>{[it.code, it.type, it.color].filter(Boolean).join(' · ')}</div>
                  </td>
                  <td>{it.unitPrice.toFixed(2)}</td>
                  <td>{it.quantity}</td>
                  <td>{(it.quantity*it.unitPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <section style={{display:'flex',gap:24,marginTop:12}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,marginBottom:6}}>PAYMENT INFO</div>
              <div>Terms: {inv.paymentTerms}</div>
              {inv.notes && <div style={{marginTop:6}}>Notes: {inv.notes}</div>}
            </div>
            <div style={{width:320}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr auto',rowGap:6}}>
                <div>Sub Total</div><div>{totals.subtotal.toFixed(2)}</div>
                <div>Discount ({inv.discountMode==='percent'? inv.discountValue+ '%' : 'EGP'})</div><div>-{totals.discountAmount.toFixed(2)}</div>
                <div>After Discount</div><div>{totals.afterDiscount.toFixed(2)}</div>
                <div>Tax Vat 14%</div><div>{totals.vatAmount.toFixed(2)}</div>
                <div>Discount Tax 1%</div><div>-{totals.discountTaxAmount.toFixed(2)}</div>
                <div>Transport</div><div>{totals.transport.toFixed(2)}</div>
              </div>
              <div style={{textAlign:'right',marginTop:8}}>
                <span className="badge-total">GRAND TOTAL {totals.netOrder.toFixed(2)}</span>
              </div>
            </div>
          </section>

          <footer style={{display:'flex',justifyContent:'space-between',marginTop:24,alignItems:'center'}}>
            <div>
              <div style={{fontSize:12,color:'#666'}}>Thank you for your business!</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{height:60}}>{inv.signatureDataUrl? (<img src={inv.signatureDataUrl} alt="signature" style={{height:60}}/>) : <div style={{opacity:.6}}>Signature</div>}</div>
              <div style={{fontSize:12,color:'#666'}}>Accounting Manager</div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  )
}

