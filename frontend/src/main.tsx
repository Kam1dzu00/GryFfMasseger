import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Polyfill global for simple-peer
import { Buffer } from 'buffer';
// @ts-ignore
window.global = window;
// @ts-ignore
window.process = { env: { DEBUG: undefined }, nextTick: (cb) => setTimeout(cb, 0) };
// @ts-ignore
window.Buffer = Buffer;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
