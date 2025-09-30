import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export function Welcome(){
  const navigate = useNavigate()
  const timeoutRef = useRef<number | null>(null)

  useEffect(()=>{
    timeoutRef.current = window.setTimeout(()=>navigate('/invoices'), 3600)
    return ()=>{ if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [navigate])

  return (
    <div className="welcome">
      <canvas className="fireworks" id="fw" />
      <h1>WELCOME TO ALIGN</h1>
      <button className="btn" onClick={()=>navigate('/invoices')}>Skip</button>
    </div>
  )
}

