import { useEffect } from 'react'
import { ensureSeed } from './seed'

export function AppBootstrap(){
  useEffect(()=>{ ensureSeed() }, [])
  return null
}

