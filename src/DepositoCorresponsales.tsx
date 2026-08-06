// DepositoCorresponsales.tsx — Bold App Prototype
// Mismo sistema de diseño que AdelantoNomina.jsx (Figma: Cuenta-Bold)
import { useState, useEffect, useMemo } from 'react'
import type { PuntoResuelto } from './mockData'
import { resolverPuntos, codigoInternoDe, fmt, mockUser, mockCuenta } from './mockData'

// ── DESIGN TOKENS ──────────────────────────────────────────────────────────────
const dt = {
  bg:     '#F7F8FB',
  navy:   '#121E6C',
  navyBdr:'#D2D4E1',
  navyLt: '#F1F2F6',
  navyMd: '#BABDD3',
  navy60: '#3E4983',
  coral:  '#ff2947',
  white:  '#FFFFFF',
  t1:     '#1E1E1E',
  t2:     '#606060',
  t3:     '#969696',
  tagBg:  '#F3F3F3',
  green:  '#6CDCAB',
  red:    '#C0142F',
  shadow: '0px 4px 6px rgba(18,30,108,0.08)',
  dashSh: '0px 4px 8px rgba(108,117,159,0.08), 0px 0px 4px rgba(18,30,108,0.04)',
}

const F = 'Montserrat'

function randomDigits(n: number) {
  let s = ''
  for (let i = 0; i < n; i++) s += Math.floor(Math.random() * 10)
  return s
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
const ChevL = ({ c = dt.navy, s = 24 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <path d="M15 18l-6-6 6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ChevR = ({ c = dt.navy, s = 20 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <path d="M9 18l6-6-6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const XIcon = ({ c = dt.navy }: { c?: string }) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke={c} strokeWidth="2" strokeLinecap="round" />
  </svg>
)
const EyeOff = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <path d="M17.94 17.94A10 10 0 0112 20C5 20 1 12 1 12a18 18 0 015.06-5.94M9.9 4.24A9 9 0 0112 4c7 0 11 8 11 8a18 18 0 01-2.16 3.19M1 1l22 22" stroke={dt.navy} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const CopyIco = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <rect x="9" y="9" width="13" height="13" rx="2" stroke={dt.navy} strokeWidth="1.5" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke={dt.navy} strokeWidth="1.5" />
  </svg>
)
const BellIco = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={dt.navy} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13.73 21a2 2 0 01-3.46 0" stroke={dt.navy} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const HelpIco = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={dt.navy} strokeWidth="1.5" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke={dt.navy} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="17" r=".8" fill={dt.navy} />
  </svg>
)
const TransferIco = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <path d="M22 4L11.5 14.5" stroke={dt.coral} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M22 4L15 22 11.5 14.5 4 11 22 4Z" stroke={dt.coral} strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
)
const BagIco = ({ c = dt.coral }: { c?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" />
    <line x1="3" y1="6" x2="21" y2="6" stroke={c} strokeWidth="1.8" />
    <path d="M16 10a4 4 0 01-8 0" stroke={c} strokeWidth="1.8" />
  </svg>
)
const DepositIco = ({ c = dt.coral }: { c?: string }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <rect x="4" y="12" width="18" height="10" rx="2" stroke={c} strokeWidth="1.8" />
    <path d="M13 3v11M13 14l-4.5-4.5M13 14l4.5-4.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const CheckCircle = ({ s = 48 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="24" fill={dt.green} />
    <path d="M14 24l7 7 13-14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const CancelIco = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <path d="M6 17a11 11 0 0111-11 11 11 0 018.9 4.6" stroke={dt.navyMd} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M28 17a11 11 0 01-11 11 11 11 0 01-8.9-4.6" stroke={dt.navyMd} strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="17" cy="17" r="6" fill={dt.navyLt} stroke={dt.navyMd} strokeWidth="1.5" />
    <circle cx="25" cy="9" r="6" fill={dt.red} />
    <path d="M23 7l4 4M27 7l-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const LocationSearchIco = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <circle cx="24" cy="24" r="15" stroke={dt.navyMd} strokeWidth="3" />
    <circle cx="24" cy="24" r="6" fill={dt.navyLt} />
    <line x1="35" y1="35" x2="49" y2="49" stroke={dt.navyMd} strokeWidth="4" strokeLinecap="round" />
  </svg>
)
const PinDeniedIco = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <path d="M26 4c-8.3 0-15 6.7-15 15 0 11 15 29 15 29s15-18 15-29c0-8.3-6.7-15-15-15z" fill={dt.navyLt} stroke={dt.navyMd} strokeWidth="1.5" />
    <circle cx="26" cy="19" r="6" fill={dt.white} />
    <circle cx="42" cy="12" r="8" fill={dt.red} />
    <path d="M39 9l6 6M45 9l-6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)
const SearchIco = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke={dt.t2} strokeWidth="1.8" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" stroke={dt.t2} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)
const BarcodeMini = () => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
    {[0, 2, 4, 5, 7, 9, 11, 13, 14, 16, 18].map((x, i) => (
      <rect key={x} x={x} y="0" width={i % 3 === 0 ? 1.6 : 0.9} height="16" fill={dt.navy} />
    ))}
  </svg>
)
const ManualMini = () => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
    <rect x="0" y="3" width="20" height="10" rx="2" stroke={dt.navy} strokeWidth="1.4" />
    <path d="M4 8h12" stroke={dt.navy} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)
const ClockIco = ({ c = dt.navy }: { c?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8" />
    <path d="M12 7v5l3.5 2" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────
function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? dt.white : dt.t1
  return (
    <div style={{ height: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 12px', flexShrink: 0 }}>
      <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, fontWeight: 600, color: c }}>1:11 PM</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <rect x="0" y="6" width="3" height="5" rx=".5" fill={c} />
          <rect x="4.5" y="3.5" width="3" height="7.5" rx=".5" fill={c} />
          <rect x="9" y="1" width="3" height="10" rx=".5" fill={c} />
          <rect x="13.5" y="0" width="2.5" height="11" rx=".5" fill={c} opacity=".4" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x=".5" y=".5" width="21" height="11" rx="2.5" stroke={c} strokeWidth="1" />
          <rect x="22" y="4" width="2.5" height="4" rx="1" fill={c} />
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill={c} />
        </svg>
      </div>
    </div>
  )
}

function AppHeader({ title, onBack, onClose, light = false }: { title: string; onBack?: () => void; onClose?: () => void; light?: boolean }) {
  const c = light ? dt.white : dt.navy
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '6px 12px 8px', minHeight: 44, flexShrink: 0 }}>
      <button onClick={onBack} style={{ width: 24, height: 24, background: 'none', border: 'none', cursor: onBack ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: onBack ? 1 : 0 }}>
        <ChevL c={c} />
      </button>
      <span style={{ flex: 1, fontFamily: F, fontWeight: 700, fontSize: 16, color: c, textAlign: 'center' }}>{title}</span>
      {onClose
        ? <button onClick={onClose} style={{ width: 24, height: 24, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><XIcon c={c} /></button>
        : <div style={{ width: 24, flexShrink: 0 }} />}
    </div>
  )
}

const btnTypo = { fontFamily: F, fontWeight: 700, fontSize: 14, lineHeight: '20px', letterSpacing: 0 }

function PrimaryBtn({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button onClick={disabled ? undefined : onClick} style={{ width: '100%', height: 48, borderRadius: 100, background: disabled ? dt.navyBdr : dt.coral, border: 'none', cursor: disabled ? 'default' : 'pointer', ...btnTypo, color: dt.white, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}>
      {children}
    </button>
  )
}

function SecondaryBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ width: '100%', height: 48, borderRadius: 100, background: dt.white, border: `1.5px solid ${dt.coral}`, cursor: 'pointer', ...btnTypo, color: dt.coral, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </button>
  )
}

function InfoRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 16, gap: 12 }}>
      <span style={{ fontFamily: F, fontSize: 12, fontWeight: 400, color: dt.t1, flexShrink: 0 }}>{label}</span>
      <span style={{ fontFamily: F, fontSize: 12, fontWeight: bold ? 700 : 500, color: bold ? dt.navy : dt.t1, textAlign: 'right' }}>{value}</span>
    </div>
  )
}

function Toast({ msg }: { msg: string }) {
  return (
    <div className="toast" style={{ position: 'absolute', bottom: 96, left: '50%', transform: 'translateX(-50%)', background: dt.navy, color: dt.white, padding: '10px 20px', borderRadius: 100, fontFamily: F, fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', zIndex: 100, boxShadow: '0 4px 16px rgba(18,30,108,0.3)', maxWidth: '85%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {msg}
    </div>
  )
}

function StickyBottom({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ flexShrink: 0, padding: '12px 16px 28px', background: `linear-gradient(to top, ${dt.bg} 65%, transparent)`, zIndex: 10 }}>
      {children}
    </div>
  )
}

function ActionRow({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ width: '100%', background: dt.white, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, border: 'none', cursor: 'pointer', boxShadow: dt.shadow }}>
      <div style={{ width: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <span style={{ flex: 1, fontFamily: F, fontWeight: 700, fontSize: 14, color: dt.navy, textAlign: 'left' }}>{label}</span>
      <ChevR />
    </button>
  )
}

function Barcode({ big = true }: { big?: boolean }) {
  const bars = useMemo(() => Array.from({ length: 42 }, () => (Math.random() > 0.6 ? 3 : Math.random() > 0.3 ? 2 : 1)), [])
  const h = big ? 64 : 34
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 2, height: h, justifyContent: 'center' }}>
      {bars.map((w, i) => <div key={i} style={{ width: w, background: dt.t1, borderRadius: 1 }} />)}
    </div>
  )
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,30,108,.5)', display: 'flex', alignItems: 'flex-end', zIndex: 50 }} onClick={onClose}>
      <div style={{ background: dt.white, borderRadius: '24px 24px 0 0', padding: '24px 16px 28px', width: '100%', maxHeight: '80%', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

// ── SCREEN 1 — DASHBOARD ──────────────────────────────────────────────────────
function DashboardScreen({ onNavigate, onToast }: { onNavigate: (s: Screen) => void; onToast: (m: string) => void }) {
  const [balVis, setBalVis] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const iconBg = `linear-gradient(135deg, rgba(238,66,78,.08), rgba(18,30,108,.08)), ${dt.white}`

  const QuickBtn = ({ ico, label, onClick }: { ico: React.ReactNode; label: string; onClick?: () => void }) => (
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ico}</div>
      <span style={{ fontFamily: F, fontSize: 11, fontWeight: 500, color: dt.t1, textAlign: 'center' }}>{label}</span>
    </div>
  )

  return (
    <div style={{ background: dt.bg, height: '100%', fontFamily: F, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <StatusBar />
      <div className="scroll-inner" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ padding: '0 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: dt.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F, fontWeight: 600, fontSize: 15, color: dt.white }}>{mockUser.initials}</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><HelpIco /></div>
            <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><BellIco /></div>
          </div>
        </div>

        <div style={{ margin: '0 16px 12px', background: dt.white, borderRadius: 100, display: 'flex', padding: 4, gap: 4 }}>
          <div style={{ flex: 1, textAlign: 'center', padding: '8px 12px', borderRadius: 100 }}>
            <span style={{ fontFamily: F, fontWeight: 500, fontSize: 13, color: dt.navy }}>Pagos</span>
          </div>
          <div style={{ flex: 1, textAlign: 'center', padding: '8px 12px', borderRadius: 100, background: dt.navy }}>
            <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: dt.white }}>Cuenta Digital</span>
          </div>
        </div>

        <div style={{ padding: '0 16px 100px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: dt.white, borderRadius: 16, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: dt.shadow }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(108,220,171,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke={dt.green} strokeWidth="2" /><path d="M10 10L10 4" stroke={dt.green} strokeWidth="2" strokeLinecap="round" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: F, fontWeight: 400, fontSize: 11, color: dt.t2 }}>Clave dinámica</div>
              <div style={{ fontFamily: F, fontWeight: 700, fontSize: 20, color: dt.navy }}>589437</div>
            </div>
            <div style={{ cursor: 'pointer' }}><CopyIco /></div>
          </div>

          <div style={{ background: dt.white, borderRadius: 16, padding: 16, boxShadow: dt.dashSh, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: dt.navy }}>No. {mockCuenta.numero}</div>
                <span style={{ background: dt.tagBg, borderRadius: 100, padding: '2px 8px', fontSize: 11, color: dt.t2 }}>Depósito ordinario</span>
              </div>
              <ChevR />
            </div>
            <div>
              <div style={{ fontFamily: F, fontWeight: 400, fontSize: 11, color: dt.t2, marginBottom: 2 }}>Saldo disponible</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: F, fontWeight: 700, fontSize: 22, color: dt.t1 }}>{balVis ? '$465.033,00' : '● ● ● ●'}</span>
                <button onClick={() => setBalVis(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><EyeOff /></button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <QuickBtn ico={<TransferIco />} label="Transferir" onClick={() => onToast('Próximamente 🚀')} />
              <QuickBtn ico={<span style={{ fontFamily: F, fontWeight: 800, fontSize: 12, color: dt.coral }}>Bre-B</span>} label="Bre-B" onClick={() => onToast('Próximamente 🚀')} />
              <QuickBtn ico={<BagIco />} label="Pagar facturas" onClick={() => onToast('Próximamente 🚀')} />
              <QuickBtn ico={<DepositIco />} label="Depositar" onClick={() => onNavigate('metodo')} />
            </div>
            <div style={{ background: dt.navyLt, borderRadius: 12, padding: '10px 16px', textAlign: 'center', cursor: 'pointer' }}>
              <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: dt.navy }}>Ver movimientos</span>
            </div>
          </div>

          <div style={{ background: dt.white, borderRadius: 16, padding: '12px 8px 12px 12px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: dt.shadow, cursor: 'pointer' }} onClick={() => onToast('Próximamente 🚀')}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: dt.navyLt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="13" rx="2.5" stroke={dt.navy} strokeWidth="1.5" /><rect x="2" y="10" width="20" height="3.5" fill={dt.navyBdr} /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: dt.navy }}>Tarjetas débito</div>
            </div>
            <ChevR />
          </div>

          <div style={{ background: dt.white, borderRadius: 16, padding: '12px 8px 12px 12px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: dt.shadow, cursor: 'pointer' }} onClick={() => onToast('Próximamente 🚀')}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: dt.navyLt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="13" rx="3" stroke={dt.navy} strokeWidth="1.5" /><circle cx="15" cy="13.5" r="2.4" fill={dt.navyBdr} /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: dt.navy }}>Bolsillos remunerados</div>
              <div style={{ fontFamily: F, fontWeight: 500, fontSize: 12, color: dt.t1 }}>Saldo total <strong>$500.000,00</strong></div>
            </div>
            <ChevR />
          </div>

          <div style={{ textAlign: 'center', padding: '4px 0' }}>
            <div style={{ fontFamily: F, fontSize: 9, color: dt.navy60, lineHeight: '14px' }}>Ofrecido por Bold CF Compañía de Financiamiento usando la corresponsalía digital de Bold.Co S.A.S.</div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button onClick={() => setShowMenu(true)} style={{ position: 'absolute', right: 20, bottom: 28, width: 56, height: 56, borderRadius: '50%', background: dt.coral, border: 'none', cursor: 'pointer', boxShadow: '0 8px 20px rgba(238,66,78,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
        <span style={{ fontFamily: F, fontWeight: 800, fontSize: 24, color: dt.white, lineHeight: 1 }}>$</span>
      </button>

      {showMenu && (
        <Modal onClose={() => setShowMenu(false)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <span style={{ fontFamily: F, fontWeight: 700, fontSize: 18, color: dt.navy }}>Elige cómo usar tu dinero</span>
            <button onClick={() => setShowMenu(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><XIcon /></button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            {[
              { ico: <TransferIco />, label: 'Transferir', fn: () => { setShowMenu(false); onToast('Próximamente 🚀') } },
              { ico: <span style={{ fontFamily: F, fontWeight: 800, fontSize: 13, color: dt.coral }}>Bre-B</span>, label: 'Bre-B', fn: () => { setShowMenu(false); onToast('Próximamente 🚀') } },
              { ico: <BagIco />, label: 'Pagar facturas', fn: () => { setShowMenu(false); onToast('Próximamente 🚀') } },
              { ico: <DepositIco />, label: 'Depositar', fn: () => { setShowMenu(false); onNavigate('metodo') } },
            ].map(item => (
              <div key={item.label} onClick={item.fn} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.ico}</div>
                <span style={{ fontFamily: F, fontSize: 11, fontWeight: 500, color: dt.t1, textAlign: 'center' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── SCREEN 2 — MÉTODO DE DEPÓSITO ────────────────────────────────────────────
function MetodoScreen({ onNavigate, onToast }: { onNavigate: (s: Screen) => void; onToast: (m: string) => void }) {
  const MethodCard = ({ label, sub, enabled, onClick }: { label: string; sub: string; enabled: boolean; onClick: () => void }) => (
    <button onClick={enabled ? onClick : () => onToast('Próximamente disponible')} style={{ flex: 1, background: dt.white, border: `1.5px solid ${enabled ? dt.navyBdr : 'transparent'}`, borderRadius: 16, padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'pointer', boxShadow: dt.shadow, opacity: enabled ? 1 : 0.5 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: dt.navyLt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="13" rx="2.5" stroke={dt.navy} strokeWidth="1.5" /><circle cx="12" cy="12.5" r="3" stroke={dt.navy} strokeWidth="1.5" /></svg>
      </div>
      <span style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: dt.navy }}>{label}</span>
      <span style={{ fontFamily: F, fontWeight: 400, fontSize: 11, color: dt.t2, textAlign: 'center' }}>{sub}</span>
    </button>
  )

  return (
    <div style={{ background: dt.bg, height: '100%', fontFamily: F, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <AppHeader title="¿Cómo quieres depositar?" onBack={() => onNavigate('dashboard')} onClose={() => onNavigate('dashboard')} />
      <div className="scroll-inner" style={{ flex: 1, overflowY: 'auto', padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontFamily: F, fontWeight: 400, fontSize: 13, color: dt.t1, margin: 0 }}>Elige el método que prefieras para depositar dinero en tu Cuenta Bold.</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <MethodCard label="Efectivo" sub="Puntos corresponsales" enabled onClick={() => onNavigate('permiso')} />
          <MethodCard label="PSE" sub="Otros bancos" enabled={false} onClick={() => {}} />
        </div>
        <MethodCard label="Otros bancos" sub="Transferencia desde otra entidad" enabled={false} onClick={() => {}} />
      </div>
    </div>
  )
}

// ── SCREEN 3 — PERMISO DE UBICACIÓN ──────────────────────────────────────────
function PermisoScreen({ onNavigate, onToast }: { onNavigate: (s: Screen) => void; onToast: (m: string) => void }) {
  const [variant, setVariant] = useState<'ask' | 'denied'>('ask')

  return (
    <div style={{ background: dt.bg, height: '100%', fontFamily: F, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <AppHeader title="Puntos para depositar" onBack={() => onNavigate('metodo')} />
      <div className="scroll-inner" style={{ flex: 1, overflowY: 'auto', padding: '40px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20 }}>
        {variant === 'ask' ? (
          <>
            <LocationSearchIco />
            <p style={{ fontFamily: F, fontWeight: 500, fontSize: 16, color: dt.t1, lineHeight: '22px', margin: 0 }}>
              Necesitamos acceder a tu ubicación para encontrar los puntos más cercanos a ti.
            </p>
          </>
        ) : (
          <>
            <PinDeniedIco />
            <p style={{ fontFamily: F, fontWeight: 500, fontSize: 16, color: dt.t1, lineHeight: '22px', margin: 0 }}>
              No es posible acceder a los puntos en este momento. Puedes consultarlos a través de este link:
            </p>
            <button onClick={() => onToast('Función no disponible en este prototipo')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <span style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: dt.navy, textDecoration: 'underline' }}>Consultar puntos</span>
            </button>
          </>
        )}
      </div>
      <StickyBottom>
        {variant === 'ask' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <PrimaryBtn onClick={() => onNavigate('puntos')}>Permitir acceso a mi ubicación</PrimaryBtn>
            <button onClick={() => setVariant('denied')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <span style={{ fontFamily: F, fontWeight: 500, fontSize: 12, color: dt.t2, textDecoration: 'underline' }}>Ver caso: sin acceso a ubicación</span>
            </button>
          </div>
        ) : (
          <PrimaryBtn onClick={() => setVariant('ask')}>Volver</PrimaryBtn>
        )}
      </StickyBottom>
    </div>
  )
}

// ── SCREEN 4 — LISTA DE PUNTOS CERCANOS ──────────────────────────────────────
function PuntosScreen({ onNavigate, onToast, onSelectPunto }: { onNavigate: (s: Screen) => void; onToast: (m: string) => void; onSelectPunto: (p: PuntoResuelto) => void }) {
  const puntos = useMemo(() => resolverPuntos(), [])
  const [query, setQuery] = useState('')
  const filtered = puntos.filter(p =>
    p.nombre_comercial.toLowerCase().includes(query.toLowerCase()) ||
    p.direccion.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div style={{ background: dt.bg, height: '100%', fontFamily: F, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <AppHeader title="Puntos para depositar" onBack={() => onNavigate('permiso')} />
      <div style={{ padding: '4px 16px 10px' }}>
        <div style={{ background: dt.white, borderRadius: 100, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: dt.shadow }}>
          <SearchIco />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar" style={{ border: 'none', outline: 'none', flex: 1, fontFamily: F, fontSize: 13, color: dt.t1, background: 'transparent' }} />
        </div>
      </div>
      <div className="scroll-inner" style={{ flex: 1, overflowY: 'auto', padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontFamily: F, fontSize: 12, color: dt.t2 }}>Puntos cerca a tu ubicación</span>
        {filtered.map(p => {
          const disabled = !p.abierto
          return (
            <div
              key={p.nombre_comercial}
              onClick={() => disabled ? onToast('Este punto está cerrado en este momento.') : (onSelectPunto(p), onNavigate('monto'))}
              style={{ background: disabled ? dt.navyLt : dt.white, borderRadius: 16, padding: '14px 16px', boxShadow: disabled ? 'none' : dt.shadow, cursor: disabled ? 'default' : 'pointer', display: 'flex', flexDirection: 'column', gap: 6, opacity: disabled ? 0.6 : 1 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: dt.navy }}>{p.nombre_comercial}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: p.abierto ? dt.green : dt.t3, display: 'inline-block' }} />
                  <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: p.abierto ? '#0D5C3A' : dt.t2 }}>{p.abierto ? 'Abierto' : 'Cerrado'}</span>
                </div>
              </div>
              <span style={{ fontFamily: F, fontSize: 12, color: dt.t1 }}>{p.direccion}</span>
              <span style={{ fontFamily: F, fontSize: 11, color: dt.t2 }}>{p.horario} · {p.distancia_km.toFixed(1)} km</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <span style={{ background: dt.tagBg, borderRadius: 100, padding: '3px 10px', fontFamily: F, fontSize: 11, fontWeight: 600, color: dt.navy }}>Hasta {fmt(p.limite_maximo)}</span>
                {p.metodo === 'manual' ? <ManualMini /> : <BarcodeMini />}
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 0', fontFamily: F, fontSize: 13, color: dt.t2 }}>No encontramos puntos con ese nombre.</div>
        )}
      </div>
    </div>
  )
}

// ── SCREEN 5 — INGRESO DE MONTO ──────────────────────────────────────────────
function MontoScreen({ onNavigate, punto, monto, setMonto }: { onNavigate: (s: Screen) => void; punto: PuntoResuelto; monto: number; setMonto: (n: number) => void }) {
  const [raw, setRaw] = useState(monto > 0 ? String(monto) : '')
  const value = raw === '' ? 0 : parseInt(raw, 10)

  let error = ''
  if (value > 0 && value < 10000) error = 'El monto mínimo para depositar es $10.000.'
  else if (value > punto.limite_maximo) error = `Este punto acepta hasta ${fmt(punto.limite_maximo)}. Elige otro monto o busca un punto con mayor límite.`

  const canContinue = value > 0 && !error

  const handleChange = (v: string) => {
    const digits = v.replace(/\D/g, '')
    setRaw(digits === '' ? '' : String(parseInt(digits, 10)))
  }

  const quickAmounts = [20000, 50000, 100000]

  return (
    <div style={{ background: dt.bg, height: '100%', fontFamily: F, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <AppHeader title="Ingresa el monto" onBack={() => onNavigate('puntos')} onClose={() => onNavigate('dashboard')} />
      <div className="scroll-inner" style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '20px 0 4px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontFamily: 'ui-monospace, Consolas, monospace', fontWeight: 700, fontSize: 32, color: dt.navy }}>$</span>
            <input
              value={raw === '' ? '' : parseInt(raw, 10).toLocaleString('es-CO')}
              onChange={e => handleChange(e.target.value)}
              inputMode="numeric"
              placeholder="0"
              style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'ui-monospace, Consolas, monospace', fontWeight: 700, fontSize: 42, color: dt.navy, width: 220, textAlign: 'center' }}
            />
          </div>
          <span style={{ fontFamily: F, fontSize: 12, color: dt.t2, textAlign: 'center' }}>Puedes depositar hasta {fmt(punto.limite_maximo)} en este punto.</span>
          {error && <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: dt.red, textAlign: 'center', marginTop: 4 }}>{error}</span>}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          {quickAmounts.map(a => {
            const disabled = a > punto.limite_maximo
            return (
              <button key={a} disabled={disabled} onClick={() => setRaw(String(a))} style={{ flex: 1, padding: '12px 8px', borderRadius: 100, border: `1.5px solid ${disabled ? dt.navyBdr : dt.navy}`, background: disabled ? dt.navyLt : dt.white, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
                <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: disabled ? dt.t3 : dt.navy }}>{fmt(a)}</span>
              </button>
            )
          })}
        </div>

        <div style={{ background: dt.white, borderRadius: 16, padding: '14px 16px', boxShadow: dt.shadow, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <InfoRow label="Punto seleccionado" value={punto.nombre_comercial} bold />
          <InfoRow label="Dirección" value={punto.direccion} />
        </div>
      </div>
      <StickyBottom>
        <PrimaryBtn disabled={!canContinue} onClick={() => { setMonto(value); onNavigate('codigo') }}>Continuar</PrimaryBtn>
      </StickyBottom>
    </div>
  )
}

// ── SCREEN 6 — CÓDIGO DE DEPÓSITO ────────────────────────────────────────────
function CodigoScreen({ onNavigate, punto, monto }: { onNavigate: (s: Screen) => void; punto: PuntoResuelto; monto: number }) {
  const [secondsLeft, setSecondsLeft] = useState(1800)
  const [expired, setExpired] = useState(false)
  const [codigoDeposito, setCodigoDeposito] = useState(() => randomDigits(6))
  const [tab, setTab] = useState<'barras' | 'numero'>('barras')
  const [showAyuda, setShowAyuda] = useState(false)
  const [showComo, setShowComo] = useState(false)
  const [showCancel, setShowCancel] = useState(false)

  useEffect(() => {
    if (expired) return
    if (secondsLeft <= 0) { setExpired(true); return }
    const t = setTimeout(() => setSecondsLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secondsLeft, expired])

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')
  const codigoInterno = codigoInternoDe(punto.superficie)
  const tieneBarras = punto.metodo !== 'manual'

  const handleNuevoCodigo = () => {
    setCodigoDeposito(randomDigits(6))
    setSecondsLeft(1800)
    setExpired(false)
  }

  return (
    <div style={{ background: dt.bg, height: '100%', fontFamily: F, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <StatusBar />
      <AppHeader title="Depósito en efectivo" onClose={() => setShowCancel(true)} />
      <div className="scroll-inner" style={{ flex: 1, overflowY: 'auto', padding: '4px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 18, color: dt.t1, margin: '0 0 2px' }}>Dirígete al punto más cercano</h2>
          <p style={{ fontFamily: F, fontSize: 12, color: dt.t2, margin: 0 }}>Muéstrale al cajero la información para tu depósito.</p>
        </div>

        <div style={{ background: dt.white, borderRadius: 16, padding: '20px 16px', boxShadow: dt.shadow, borderTop: `4px solid ${dt.navy}`, opacity: expired ? 0.45 : 1, position: 'relative' }}>
          {tieneBarras && (
            <div style={{ display: 'flex', background: dt.navyLt, borderRadius: 100, padding: 3, marginBottom: 16 }}>
              <button onClick={() => setTab('barras')} style={{ flex: 1, padding: '6px 8px', borderRadius: 100, border: 'none', cursor: 'pointer', background: tab === 'barras' ? dt.navy : 'transparent' }}>
                <span style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: tab === 'barras' ? dt.white : dt.t1 }}>Código de barras</span>
              </button>
              <button onClick={() => setTab('numero')} style={{ flex: 1, padding: '6px 8px', borderRadius: 100, border: 'none', cursor: 'pointer', background: tab === 'numero' ? dt.navy : 'transparent' }}>
                <span style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: tab === 'numero' ? dt.white : dt.t1 }}>Número</span>
              </button>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            {(!tieneBarras || tab === 'barras') && (
              <>
                {tieneBarras && <Barcode big />}
                <span style={{ fontFamily: 'ui-monospace, Consolas, monospace', fontWeight: 700, fontSize: tieneBarras ? 20 : 34, color: dt.navy, letterSpacing: 2 }}>{codigoDeposito}</span>
              </>
            )}
            {tieneBarras && tab === 'numero' && (
              <>
                <span style={{ fontFamily: 'ui-monospace, Consolas, monospace', fontWeight: 700, fontSize: 34, color: dt.navy, letterSpacing: 2 }}>{codigoDeposito}</span>
                <Barcode big={false} />
              </>
            )}
            <span style={{ fontFamily: F, fontSize: 11, color: dt.t2 }}>Tu código de depósito</span>
          </div>

          <div style={{ height: 1, background: dt.navyBdr, margin: '16px 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <InfoRow label="Monto a depositar" value={fmt(monto)} bold />
            <InfoRow label="Número de convenio" value={codigoInterno} bold />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: F, fontSize: 12, color: dt.t1 }}>Tu código vencerá en</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <ClockIco c={expired ? dt.red : dt.navy} />
                <span style={{ fontFamily: 'ui-monospace, Consolas, monospace', fontWeight: 700, fontSize: 13, color: expired ? dt.red : dt.navy }}>{mm}:{ss}</span>
              </div>
            </div>
          </div>

          {expired && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(247,248,251,.85)', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16 }}>
              <span style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: dt.red }}>Tu código expiró</span>
              <span style={{ fontFamily: F, fontSize: 12, color: dt.t1, textAlign: 'center' }}>Genera uno nuevo para continuar con tu depósito.</span>
            </div>
          )}
        </div>

        <button onClick={() => setShowAyuda(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
          <span style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: dt.navy, textDecoration: 'underline' }}>Ayuda para el cajero</span>
        </button>
        {showAyuda && (
          <div style={{ background: dt.navyLt, borderRadius: 12, padding: '12px 14px' }}>
            <span style={{ fontFamily: F, fontSize: 12, color: dt.t1, lineHeight: '18px' }}>
              Dile al cajero que quieres hacer un pago por convenio con el número <strong>{codigoInterno}</strong>.
            </span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ActionRow icon={<HelpIco />} label="¿Cómo depositar?" onClick={() => setShowComo(true)} />
          <ActionRow icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C7 2 3 6 3 11c0 6.5 9 11 9 11s9-4.5 9-11c0-5-4-9-9-9z" stroke={dt.navy} strokeWidth="1.6" /><circle cx="12" cy="11" r="3" stroke={dt.navy} strokeWidth="1.6" /></svg>} label="¿Dónde puedo depositar?" onClick={() => onNavigate('puntos')} />
          <ActionRow icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0v13a1 1 0 001 1h8a1 1 0 001-1V7" stroke={dt.navy} strokeWidth="1.6" strokeLinecap="round" /></svg>} label="Cancelar depósito" onClick={() => setShowCancel(true)} />
        </div>
      </div>

      <StickyBottom>
        {expired
          ? <PrimaryBtn onClick={handleNuevoCodigo}>Generar nuevo código</PrimaryBtn>
          : <PrimaryBtn onClick={() => onNavigate('espera')}>Finalizar</PrimaryBtn>}
      </StickyBottom>

      {showComo && (
        <Modal onClose={() => setShowComo(false)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontFamily: F, fontWeight: 700, fontSize: 17, color: dt.navy }}>¿Cómo depositar?</span>
            <button onClick={() => setShowComo(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><XIcon /></button>
          </div>
          <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li style={{ fontFamily: F, fontSize: 13, color: dt.t1, lineHeight: '19px' }}>Indica que quieres hacer un depósito con el número de convenio <strong>{codigoInterno}</strong>.</li>
            <li style={{ fontFamily: F, fontSize: 13, color: dt.t1, lineHeight: '19px' }}>Muestra tu código de depósito (código de barras o número) al cajero.</li>
            <li style={{ fontFamily: F, fontSize: 13, color: dt.t1, lineHeight: '19px' }}>Entrega el efectivo. El dinero ingresará a tu Cuenta Bold en segundos.</li>
          </ol>
          <div style={{ marginTop: 20 }}>
            <PrimaryBtn onClick={() => setShowComo(false)}>Entendido</PrimaryBtn>
          </div>
        </Modal>
      )}

      {showCancel && (
        <Modal onClose={() => setShowCancel(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
            <CancelIco />
            <span style={{ fontFamily: F, fontWeight: 700, fontSize: 17, color: dt.navy }}>¿Estás seguro que quieres cancelar esta transacción?</span>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
              <PrimaryBtn onClick={() => onNavigate('dashboard')}>Sí, cancelar</PrimaryBtn>
              <SecondaryBtn onClick={() => setShowCancel(false)}>No, continuar</SecondaryBtn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── SCREEN 7 — ESPERA ─────────────────────────────────────────────────────────
const esperaMensajes = [
  'Estableciendo comunicación con el comercio...',
  'Asegurando tu depósito en la red bancaria...',
  'Finalizando validación de fondos...',
]

function EsperaScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step >= esperaMensajes.length - 1) {
      const t = setTimeout(() => onNavigate('exito'), 2000)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStep(s => s + 1), 2000)
    return () => clearTimeout(t)
  }, [step])

  return (
    <div style={{ background: dt.bg, height: '100%', fontFamily: F, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 32px' }}>
      <div className="animate-soft-pulse">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" stroke={dt.navyBdr} strokeWidth="4" />
          <path d="M32 4a28 28 0 0128 28" stroke={dt.coral} strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      <span key={step} className="animate-fade-in" style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: dt.t1, textAlign: 'center', lineHeight: '22px' }}>
        {esperaMensajes[step]}
      </span>
    </div>
  )
}

// ── SCREEN 8 — ÉXITO ──────────────────────────────────────────────────────────
function ExitoScreen({ onNavigate, monto }: { onNavigate: (s: Screen) => void; monto: number }) {
  useEffect(() => {
    const t = setTimeout(() => onNavigate('comprobante'), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ background: dt.green, height: '100%', fontFamily: F, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <div className="animate-success"><CheckCircle s={88} /></div>
      <span style={{ fontFamily: F, fontWeight: 700, fontSize: 22, color: dt.t1 }}>¡Depósito exitoso!</span>
      <span style={{ fontFamily: F, fontWeight: 700, fontSize: 30, color: dt.navy }}>{fmt(monto)}</span>
    </div>
  )
}

// ── SCREEN 9 — COMPROBANTE ────────────────────────────────────────────────────
function ComprobanteScreen({ onNavigate, onToast, punto, monto }: { onNavigate: (s: Screen) => void; onToast: (m: string) => void; punto: PuntoResuelto; monto: number }) {
  const [txId] = useState(() => `DEP-${new Date().getFullYear()}-${randomDigits(6)}`)
  const [fechaHora] = useState(() => new Date().toLocaleString('es-CO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }))
  const metodoLabel = punto.metodo === 'manual' ? 'Código manual' : 'Código de barras'

  return (
    <div style={{ background: dt.bg, height: '100%', fontFamily: F, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: 190, flexShrink: 0, position: 'relative', overflow: 'hidden', background: dt.navy }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,41,71,.65) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,41,71,.5) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2 }}><StatusBar light /></div>
        <div style={{ position: 'absolute', top: 56, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
          <img src="/assets/bold-logo-white.svg" width={92} height={34} alt="Bold" style={{ objectFit: 'contain' }} />
        </div>
      </div>

      <div className="scroll-inner" style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ margin: '-40px 16px 0', position: 'relative', zIndex: 5 }}>
          <div style={{ background: dt.navy, height: 6, borderRadius: '6px 6px 0 0', margin: '0 20px' }} />
          <div style={{ background: dt.white, borderRadius: '0 0 16px 16px', padding: '22px 16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div className="animate-success"><CheckCircle s={48} /></div>
              <div style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: dt.t1 }}>Depósito exitoso</div>
              <div style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: dt.navy }}>{fmt(monto)}</div>
            </div>
            <div style={{ height: 1, background: dt.navyBdr }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <InfoRow label="Fecha y hora" value={fechaHora} />
              <InfoRow label="ID de transacción" value={txId} />
              <InfoRow label="Entidad" value="Bold CF" />
              <InfoRow label="Número de cuenta" value={`******${mockCuenta.ultimos4}`} />
              <InfoRow label="Punto de depósito" value={punto.nombre_comercial} />
              <InfoRow label="Método usado" value={metodoLabel} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={() => onToast('Comprobante guardado ✓')} style={{ flex: 1, background: dt.white, borderRadius: 100, padding: '12px', border: `1.5px solid ${dt.navyBdr}`, cursor: 'pointer' }}>
              <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: dt.navy }}>Descargar PDF</span>
            </button>
            <button onClick={() => onToast('Función no disponible en este prototipo')} style={{ flex: 1, background: dt.white, borderRadius: 100, padding: '12px', border: `1.5px solid ${dt.navyBdr}`, cursor: 'pointer' }}>
              <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: dt.navy }}>Compartir</span>
            </button>
          </div>
        </div>
      </div>

      <StickyBottom>
        <PrimaryBtn onClick={() => onNavigate('dashboard')}>Finalizar</PrimaryBtn>
      </StickyBottom>
    </div>
  )
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
type Screen = 'dashboard' | 'metodo' | 'permiso' | 'puntos' | 'monto' | 'codigo' | 'espera' | 'exito' | 'comprobante'

export default function DepositoCorresponsales() {
  const [screen, setScreen] = useState<Screen>('dashboard')
  const [punto, setPunto] = useState<PuntoResuelto | null>(null)
  const [monto, setMonto] = useState(0)
  const [toast, setToast] = useState<string | null>(null)

  const nav = (s: Screen) => {
    if (s === 'dashboard') { setPunto(null); setMonto(0) }
    setScreen(s)
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const screen$ = (() => {
    switch (screen) {
      case 'dashboard':    return <DashboardScreen onNavigate={nav} onToast={showToast} />
      case 'metodo':       return <MetodoScreen onNavigate={nav} onToast={showToast} />
      case 'permiso':      return <PermisoScreen onNavigate={nav} onToast={showToast} />
      case 'puntos':       return <PuntosScreen onNavigate={nav} onToast={showToast} onSelectPunto={setPunto} />
      case 'monto':        return punto && <MontoScreen onNavigate={nav} punto={punto} monto={monto} setMonto={setMonto} />
      case 'codigo':       return punto && <CodigoScreen onNavigate={nav} punto={punto} monto={monto} />
      case 'espera':       return <EsperaScreen onNavigate={nav} />
      case 'exito':        return <ExitoScreen onNavigate={nav} monto={monto} />
      case 'comprobante':  return punto && <ComprobanteScreen onNavigate={nav} onToast={showToast} punto={punto} monto={monto} />
      default:             return <DashboardScreen onNavigate={nav} onToast={showToast} />
    }
  })()

  return (
    <div className="phone-frame" style={{ position: 'relative' }}>
      <div key={screen} className="screen screen-enter">
        {screen$}
      </div>
      {toast && <Toast msg={toast} />}
    </div>
  )
}
