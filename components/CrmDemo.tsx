import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import {
  ArrowLeft,
  ArrowUp,
  Award,
  BadgePercent,
  Bell,
  Bot,
  Braces,
  Calendar as CalendarIcon,
  Check,
  Code,
  Contact,
  Facebook,
  Filter,
  Folder,
  GitBranch,
  Globe,
  HelpCircle,
  Image as ImageIcon,
  Instagram,
  Kanban,
  LayoutGrid,
  LayoutTemplate,
  Linkedin,
  Mail,
  Megaphone,
  MessageCircle,
  Monitor,
  Pencil,
  Phone,
  Play,
  Plus,
  Receipt,
  Search,
  Send,
  Sparkles,
  Star,
  Tag,
  Timer,
  TrendingUp,
  Upload,
  UserCheck,
  UserPlus,
  Wand2,
  Workflow,
  Youtube,
  Zap
} from 'lucide-react'
import { NumberTicker } from '../fx/NumberTicker'

// Demo clicável do CRM, no visual do app de verdade (tema claro). Cada item do menu é uma cena
// animada. Sozinha, a demo roda em loop (cursor falso + barra de progresso); ao clicar, o
// visitante assume o controle. Todos os dados são fictícios.

const ease = [0.2, 0.7, 0.2, 1] as const
const DURATION = 6000
const RESUME_AFTER = 15000

// cenas interativas chamam isto para pausar o modo vídeo enquanto o visitante mexe
const HoldContext = createContext<() => void>(() => {})

// avança um passo por vez (mensagens do chat, etapas do fluxo, digitação...)
const useStep = (max: number, ms: number, start = 500, enabled = true) => {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!enabled || step >= max) return
    const t = setTimeout(() => setStep((v) => v + 1), step === 0 ? start : ms)
    return () => clearTimeout(t)
  }, [step, max, ms, start, enabled])
  return step
}

const Pop = ({ delay = 0, className = '', style, children }: { delay?: number; className?: string; style?: CSSProperties; children?: ReactNode; key?: string | number }) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease }}
  >
    {children}
  </motion.div>
)

const tints = ['#d1fadf', '#d1e9ff', '#fce7f6', '#fef0c7', '#e0eaff', '#ccfbef']

const Avatar = ({ name, i = 0 }: { name: string; i?: number }) => (
  <span
    className="flex-none w-6 h-6 rounded-full flex items-center justify-center font-semibold text-[0.55rem] text-[#344054]"
    style={{ background: tints[i % tints.length] }}
  >
    {name
      .split(' ')
      .map((p) => p.charAt(0))
      .slice(0, 2)
      .join('')}
  </span>
)

// tabela simples no padrão do CRM (cabeçalho cinza, linhas entrando em cascata)
const Table = ({ cols, template, rows, delay = 0.15 }: { cols: string[]; template: string; rows: ReactNode[][]; delay?: number }) => (
  <div className="crm-panel flex-1 min-h-0 overflow-hidden">
    <div className="min-w-[540px]">
      <div className="crm-th grid items-center gap-3 px-3 py-2" style={{ gridTemplateColumns: template }}>
        {cols.map((c) => (
          <span key={c} className="truncate">
            {c}
          </span>
        ))}
      </div>
      {rows.map((row, i) => (
        <Pop
          key={i}
          delay={delay + i * 0.05}
          className="grid items-center gap-3 px-3 py-[7px] border-b border-line last:border-0 text-[0.68rem]"
          style={{ gridTemplateColumns: template }}
        >
          {row.map((cell, j) => (
            <div key={j} className="min-w-0 truncate">
              {cell}
            </div>
          ))}
        </Pop>
      ))}
    </div>
  </div>
)

const Toolbar = ({ children }: { children: ReactNode }) => <div className="flex-none flex items-center gap-2 overflow-hidden">{children}</div>

/* ---------- Pergunte à IA ---------- */

const question = 'Quais leads estão sem resposta há mais de 2 dias?'
const thinking = ['Lendo as conversas dos últimos 7 dias', 'Cruzando com o pipeline de vendas']
const answer = 'Encontrei 14 leads sem resposta, a maioria vinda do Instagram. Quer que eu crie um follow-up automático para eles?'.split(' ')

const AskAi = () => {
  const typed = useStep(question.length, 22, 500)
  const sent = typed >= question.length
  // a IA "pensa" (etapas), depois escreve a resposta palavra por palavra
  const thought = useStep(thinking.length + 1, 480, 350, sent)
  const writing = thought > thinking.length
  const words = useStep(answer.length, 55, 150, writing)
  const done = words >= answer.length
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 px-2">
      <Pop className="flex items-center gap-2 text-accent">
        <Sparkles className="w-5 h-5" />
      </Pop>
      <Pop delay={0.1}>
        <p className="text-lg md:text-2xl font-medium text-center">No que você está pensando?</p>
      </Pop>
      <Pop delay={0.2} className="crm-panel w-full max-w-xl flex items-center gap-3 !rounded-full px-4 py-3">
        <Plus className="w-4 h-4 flex-none text-dim" />
        <p className="flex-1 text-xs md:text-sm min-h-[1.25rem]">
          {typed === 0 ? <span className="text-dim">Pergunte qualquer coisa...</span> : question.slice(0, typed)}
          {!sent && typed > 0 && <i className="crm-caret" />}
        </p>
        <span className="flex-none w-7 h-7 rounded-full bg-[#101828] text-white flex items-center justify-center">
          <ArrowUp className="w-3.5 h-3.5" />
        </span>
      </Pop>
      <div className="w-full max-w-xl min-h-[176px]">
        {sent && thought >= 1 && (
          <Pop className="crm-panel p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className={`flex-none w-6 h-6 rounded-full bg-accent-soft text-accent flex items-center justify-center ${done ? '' : 'crm-pulse'}`}>
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className={`text-[0.7rem] font-semibold ${done ? 'text-muted' : 'crm-shine'}`}>{done ? 'Resposta gerada' : writing ? 'Gerando resposta...' : 'Pensando...'}</span>
            </div>
            <div className="space-y-1.5 mb-3">
              {thinking.map(
                (t, i) =>
                  thought > i && (
                    <Pop key={t} className="flex items-center gap-2 text-[0.66rem] text-muted">
                      {thought > i + 1 ? <Check className="w-3 h-3 flex-none text-[#17b26a]" strokeWidth={3} /> : <span className="crm-spin flex-none" />}
                      {t}
                    </Pop>
                  )
              )}
            </div>
            {writing && (
              <p className="text-xs leading-relaxed">
                {answer.slice(0, words).map((w, i) => (
                  <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className={i === 1 || i === 2 ? 'font-semibold' : undefined}>
                    {w}{' '}
                  </motion.span>
                ))}
                {!done && <i className="crm-caret" />}
              </p>
            )}
            {done && (
              <Pop delay={0.15} className="flex gap-2 mt-3">
                <span className="crm-btn">Criar automação</span>
                <span className="crm-btn crm-btn--ghost">Ver lista</span>
              </Pop>
            )}
          </Pop>
        )}
      </div>
    </div>
  )
}

/* ---------- Painel de controle ---------- */

const kpis = [
  { label: 'Leads no mês', value: 1284, delta: '↑ 18%' },
  { label: 'Oportunidades', value: 312, delta: '↑ 42' },
  { label: 'Valor em pipeline', value: 486900, prefix: 'R$ ', delta: '↑ R$ 61 mil' },
  { label: 'Conversão', value: 27, suffix: '%', delta: '↑ 3 pts' }
]
const funnel = [
  { label: 'Novo lead', w: 100, color: '#53b1fd' },
  { label: 'Qualificado', w: 64, color: '#22ccee' },
  { label: 'Reunião marcada', w: 38, color: '#8098f9' },
  { label: 'Fechado', w: 21, color: '#155eef' }
]
const stages = [
  { label: 'Anúncio Meta', v: '38%' },
  { label: 'Instagram', v: '27%' },
  { label: 'Indicação', v: '19%' },
  { label: 'Google Ads', v: '16%' }
]

const Dashboard = () => (
  <div className="h-full flex flex-col gap-3 min-h-0">
    <Toolbar>
      <span className="crm-btn crm-btn--ghost">Dashboard</span>
      <span className="crm-btn crm-btn--ghost !text-accent">
        <Plus className="w-3 h-3" /> Novo
      </span>
      <span className="crm-btn crm-btn--ghost ml-auto hidden sm:inline-flex">
        <CalendarIcon className="w-3 h-3" /> Este mês
      </span>
      <span className="crm-btn">Editar painel</span>
    </Toolbar>
    <div className="flex-none grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((k, i) => (
        <Pop key={k.label} delay={i * 0.08} className="crm-panel p-3">
          <p className="text-[0.68rem] font-semibold">{k.label}</p>
          <p className="text-xl md:text-[1.7rem] font-light mt-1.5 leading-none tracking-tight">
            {k.prefix}
            <NumberTicker value={k.value} delay={0.2} />
            {k.suffix}
          </p>
          <span className="crm-chip crm-chip--ok mt-2">{k.delta}</span>
        </Pop>
      ))}
    </div>
    <div className="flex-1 min-h-0 grid md:grid-cols-[1.5fr_1fr] gap-3">
      <Pop delay={0.3} className="crm-panel p-3.5 min-h-0 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold">Funil</p>
          <span className="crm-chip">Pipeline de vendas</span>
        </div>
        <div className="space-y-2">
          {funnel.map((f, i) => (
            <div key={f.label} className="h-9 md:h-10 rounded-[6px] bg-surface-2 overflow-hidden">
              <motion.div
                className="h-full flex items-center px-3 text-[0.64rem] font-medium text-white whitespace-nowrap rounded-[6px]"
                style={{ width: `${f.w}%`, background: f.color, transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.12, ease }}
              >
                {f.label}
              </motion.div>
            </div>
          ))}
        </div>
      </Pop>
      <Pop delay={0.4} className="crm-panel p-3.5 hidden md:block">
        <p className="text-xs font-semibold mb-3">Origem dos leads</p>
        <div className="space-y-3">
          {stages.map((s, i) => (
            <div key={s.label}>
              <div className="flex justify-between text-[0.66rem] text-muted mb-1">
                <span>{s.label}</span>
                <span>{s.v}</span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
                <motion.i
                  className="block h-full rounded-full bg-accent"
                  style={{ width: s.v, transformOrigin: 'left' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.7 + i * 0.1, ease }}
                />
              </div>
            </div>
          ))}
        </div>
      </Pop>
    </div>
  </div>
)

/* ---------- Conversas ---------- */

const inbox = [
  { name: 'Marina Duarte', text: 'Vocês atendem sábado?', n: 2, on: true },
  { name: 'Otávio Reis', text: 'Quero saber o valor', n: 1 },
  { name: 'Clínica Vita', text: 'Proposta recebida, obrigado', n: 7 },
  { name: 'Bruna Leal', text: 'Confirmado para amanhã', n: 3 },
  { name: 'Studio Aurora', text: 'Pode me ligar às 15h?', n: 1 }
]

const Bubble = ({ me = false, children }: { me?: boolean; children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    className={`max-w-[82%] rounded-[10px] px-3 py-2 text-[0.7rem] leading-relaxed ${me ? 'self-end bg-accent-soft text-[#101828]' : 'self-start bg-surface-2'}`}
  >
    {children}
  </motion.div>
)

const Conversations = () => {
  const step = useStep(5, 880, 500)
  return (
    <div className="h-full grid md:grid-cols-[200px_1fr] xl:grid-cols-[200px_1fr_170px] gap-3">
      <div className="crm-panel p-2 hidden md:block overflow-hidden">
        <p className="text-[0.7rem] font-semibold px-1.5 pt-1 pb-2">Caixa de entrada da equipe</p>
        {inbox.map((c, i) => (
          <Pop key={c.name} delay={i * 0.07} className={`flex items-center gap-2 p-2 rounded-[8px] border ${c.on ? 'border-accent' : 'border-transparent'}`}>
            <Avatar name={c.name} i={i} />
            <div className="min-w-0 flex-1">
              <p className="text-[0.68rem] font-semibold truncate">{c.name}</p>
              <p className="text-[0.62rem] text-muted truncate">{c.text}</p>
            </div>
            <span className="flex-none min-w-4 h-4 px-1 rounded-[4px] bg-accent text-white text-[0.52rem] font-semibold flex items-center justify-center">{c.n}</span>
          </Pop>
        ))}
      </div>
      <div className="crm-panel flex flex-col min-h-0">
        <div className="flex-none flex items-center justify-between gap-3 px-3 py-2.5 border-b border-line">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar name="Marina Duarte" />
            <p className="text-xs font-semibold truncate">Marina Duarte</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="crm-chip crm-chip--on hidden sm:inline-flex">
              <Bot className="w-3 h-3" /> IA ativa
            </span>
            <span className="crm-btn !bg-[#17b26a]">
              <Phone className="w-3 h-3" /> Ligar
            </span>
          </div>
        </div>
        <div className="flex-1 min-h-0 flex flex-col justify-end gap-2 p-3 overflow-hidden">
          {step >= 1 && <Bubble>Oi! Vi o anúncio de vocês. Atendem aos sábados?</Bubble>}
          {step === 2 && (
            <Bubble me>
              <span className="crm-typing">
                <i />
                <i />
                <i />
              </span>
            </Bubble>
          )}
          {step >= 3 && <Bubble me>Atendemos sim, Marina! Tenho 9h ou 11h neste sábado. Qual prefere?</Bubble>}
          {step >= 4 && <Bubble>11h, perfeito.</Bubble>}
          {step >= 5 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="self-center crm-chip crm-chip--ok">
              <Check className="w-3 h-3" /> Agendamento criado · Sáb 11:00
            </motion.div>
          )}
        </div>
        <div className="flex-none flex items-center gap-2 m-2.5 mt-0 px-3 py-2 rounded-[8px] border border-line-strong text-[0.68rem] text-dim">
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="flex-1">Digite uma mensagem</span>
          <span className="w-6 h-6 rounded-[6px] bg-accent text-white flex items-center justify-center">
            <Send className="w-3 h-3" />
          </span>
        </div>
      </div>
      <Pop delay={0.3} className="crm-panel p-3 hidden xl:block">
        <p className="text-[0.7rem] font-semibold mb-3">Detalhes do contato</p>
        <p className="crm-label mb-1">E-mail</p>
        <p className="text-[0.66rem] mb-3 truncate">marina@exemplo.com</p>
        <p className="crm-label mb-1">Origem</p>
        <p className="text-[0.66rem] mb-3">Anúncio Meta</p>
        <p className="crm-label mb-1.5">Tags</p>
        <div className="flex flex-wrap gap-1.5">
          <span className="crm-chip">lead quente</span>
          <span className="crm-chip">avaliação</span>
        </div>
      </Pop>
    </div>
  )
}

/* ---------- Calendários ---------- */

const days = ['seg., 12', 'ter., 13', 'qua., 14', 'qui., 15', 'sex., 16']
const events = [
  { d: 0, top: 5, h: 23, title: 'Diagnóstico', who: 'Rafael Prado', time: '09:00 – 09:45', place: 'Google Meet', owner: 'Ana' },
  { d: 0, top: 55, h: 23, title: 'Follow-up', who: 'Clínica Vita', time: '14:00 – 14:30', place: 'Ligação', owner: 'Léo' },
  { d: 1, top: 28, h: 27, title: 'Demonstração', who: 'Otávio Reis', time: '11:00 – 12:00', place: 'Zoom', owner: 'Ana' },
  { d: 2, top: 8, h: 23, title: 'Onboarding', who: 'Studio Aurora', time: '09:30 – 10:30', place: 'Google Meet', owner: 'Bia' },
  { d: 2, top: 57, h: 27, title: 'Avaliação', who: 'Marina Duarte', time: '14:00 – 15:00', place: 'Presencial', owner: 'Léo', on: true },
  { d: 3, top: 26, h: 23, title: 'Reunião de equipe', who: 'Time comercial', time: '11:00 – 11:45', place: 'Sala 2', owner: 'Todos' },
  { d: 4, top: 44, h: 28, title: 'Fechamento', who: 'Imob. Horizonte', time: '13:30 – 14:30', place: 'Google Meet', owner: 'Ana' }
]

const Calendar = () => (
  <div className="h-full flex flex-col gap-3 min-h-0">
    <Toolbar>
      <span className="crm-btn crm-btn--ghost">Hoje</span>
      <span className="crm-btn crm-btn--ghost">12 a 16 de out.</span>
      <span className="crm-btn crm-btn--ghost ml-auto hidden sm:inline-flex">
        <Filter className="w-3 h-3" /> Gerenciar visualização
      </span>
      <span className="crm-btn">
        <Plus className="w-3 h-3" /> Novo
      </span>
    </Toolbar>
    <div className="crm-panel flex-1 min-h-0 grid grid-cols-5 divide-x divide-line overflow-hidden">
      {days.map((day, d) => (
        <div key={day} className="flex flex-col min-h-0 min-w-0">
          <p className={`flex-none text-center text-[0.62rem] md:text-[0.7rem] py-2 border-b border-line ${d === 2 ? 'text-accent font-semibold' : 'text-muted'}`}>{day}</p>
          <div className="relative flex-1">
            {events
              .filter((e) => e.d === d)
              .map((e, i) => (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 20, delay: e.on ? 1.6 : 0.3 + (d + i) * 0.12 }}
                  className={`absolute inset-x-1 rounded-[5px] p-1.5 md:p-2 overflow-hidden border-l-[3px] border-accent flex flex-col ${e.on ? 'bg-accent text-white' : 'bg-[#e4e7ec]'}`}
                  style={{ top: `${e.top}%`, height: `${e.h}%` }}
                >
                  <p className="text-[0.56rem] md:text-[0.66rem] font-semibold leading-tight truncate">{e.title}</p>
                  <p className="text-[0.54rem] md:text-[0.64rem] leading-tight truncate">{e.who}</p>
                  <p className={`text-[0.5rem] md:text-[0.6rem] mt-0.5 truncate ${e.on ? 'opacity-90' : 'text-muted'}`}>{e.time}</p>
                  <div className={`hidden md:flex items-center justify-between gap-1.5 mt-auto pt-1 text-[0.56rem] ${e.on ? 'opacity-90' : 'text-muted'}`}>
                    <span className="truncate">{e.place}</span>
                    <span className={`flex-none px-1.5 py-px rounded-full font-medium ${e.on ? 'bg-white/20' : 'bg-white'}`}>{e.owner}</span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)

/* ---------- Contatos ---------- */

const contacts = [
  { name: 'Marina Duarte', phone: '(11) 90000-0101', mail: 'marina@exemplo.com', last: 'há 30 minutos', tag: 'lead quente' },
  { name: 'Otávio Reis', phone: '(21) 90000-0102', mail: 'otavio@exemplo.com', last: 'há 2 horas', tag: 'novo lead' },
  { name: 'Bruna Leal', phone: '(31) 90000-0103', mail: 'bruna@exemplo.com', last: 'há 3 horas', tag: 'cliente' },
  { name: 'Rafael Prado', phone: '(41) 90000-0104', mail: 'rafael@exemplo.com', last: 'há 5 horas', tag: 'follow-up' },
  { name: 'Lívia Moura', phone: '(51) 90000-0105', mail: 'livia@exemplo.com', last: 'há 8 horas', tag: 'teste grátis' },
  { name: 'Caio Nunes', phone: '(61) 90000-0106', mail: 'caio@exemplo.com', last: '1 dia atrás', tag: 'novo lead' },
  { name: 'Helena Sá', phone: '(71) 90000-0107', mail: 'helena@exemplo.com', last: '1 dia atrás', tag: 'cliente' },
  { name: 'Tiago Barros', phone: '(81) 90000-0108', mail: 'tiago@exemplo.com', last: '1 dia atrás', tag: 'lead quente' },
  { name: 'Yasmin Farias', phone: '(85) 90000-0109', mail: 'yasmin@exemplo.com', last: '2 dias atrás', tag: 'agendado' },
  { name: 'Diego Antunes', phone: '(62) 90000-0110', mail: 'diego@exemplo.com', last: '2 dias atrás', tag: 'follow-up' },
  { name: 'Paula Rezende', phone: '(27) 90000-0111', mail: 'paula@exemplo.com', last: '2 dias atrás', tag: 'cliente' },
  { name: 'Vítor Campos', phone: '(48) 90000-0112', mail: 'vitor@exemplo.com', last: '3 dias atrás', tag: 'novo lead' },
  { name: 'Nina Lacerda', phone: '(19) 90000-0113', mail: 'nina@exemplo.com', last: '3 dias atrás', tag: 'teste grátis' },
  { name: 'Gustavo Pires', phone: '(92) 90000-0114', mail: 'gustavo@exemplo.com', last: '4 dias atrás', tag: 'sem resposta' }
]

const Contacts = () => (
  <div className="h-full flex flex-col gap-3 min-h-0">
    <Toolbar>
      <span className="crm-btn crm-btn--ghost">
        <Filter className="w-3 h-3" /> Filtros
      </span>
      <span className="crm-chip crm-chip--on">4.812 Contatos</span>
      <span className="crm-btn crm-btn--ghost !text-dim ml-auto hidden sm:inline-flex">
        <Search className="w-3 h-3" /> Pesquisar contatos
      </span>
      <span className="crm-btn">
        <Upload className="w-3 h-3" /> Importar
      </span>
    </Toolbar>
    <Table
      cols={['Nome do contato', 'Telefone', 'E-mail', 'Última atividade', 'Tags']}
      template="1.3fr 1fr 1.3fr 1fr 0.8fr"
      rows={contacts.map((c, i) => [
        <span className="flex items-center gap-2 font-medium">
          <Avatar name={c.name} i={i} /> <span className="truncate">{c.name}</span>
        </span>,
        <span className="text-muted">{c.phone}</span>,
        <span className="text-muted">{c.mail}</span>,
        <span className="text-muted">{c.last}</span>,
        <span className="crm-chip">{c.tag}</span>
      ])}
    />
  </div>
)

/* ---------- Leads (pipeline) ---------- */

const columns = [
  { name: 'Novo lead', count: 551, color: '#b9e0dd' },
  { name: 'Follow up', count: 28, color: '#f8e0b8' },
  { name: 'Reunião marcada', count: 18, color: '#dcd3f7' },
  { name: 'Fechado', count: 152, color: '#c5efe9' }
]

const MARINA = 'marina'
const initialDeals = [
  { id: MARINA, n: 'Marina Duarte', f: 'Meta Ads', v: 'R$ 4.800', col: 0 },
  { id: 'rafael', n: 'Rafael Prado', f: 'Meta Ads', v: 'R$ 2.400', col: 0 },
  { id: 'vita', n: 'Clínica Vita', f: 'Site', v: 'R$ 7.900', col: 0 },
  { id: 'tiago', n: 'Tiago Barros', f: 'Google Ads', v: 'R$ 1.900', col: 0 },
  { id: 'yasmin', n: 'Yasmin Farias', f: 'TikTok', v: 'R$ 3.200', col: 0 },
  { id: 'bruna', n: 'Bruna Leal', f: 'Instagram', v: 'R$ 3.600', col: 1 },
  { id: 'diego', n: 'Diego Antunes', f: 'WhatsApp', v: 'R$ 2.750', col: 1 },
  { id: 'paula', n: 'Paula Rezende', f: 'Indicação', v: 'R$ 5.400', col: 1 },
  { id: 'aurora', n: 'Studio Aurora', f: 'Indicação', v: 'R$ 5.200', col: 2 },
  { id: 'vitor', n: 'Vítor Campos', f: 'YouTube', v: 'R$ 6.300', col: 2 },
  { id: 'nina', n: 'Nina Lacerda', f: 'Instagram', v: 'R$ 2.100', col: 2 },
  { id: 'horizonte', n: 'Imob. Horizonte', f: 'Google Ads', v: 'R$ 9.500', col: 3 },
  { id: 'gustavo', n: 'Gustavo Pires', f: 'Meta Ads', v: 'R$ 4.100', col: 3 }
]

const Pipeline = () => {
  const hold = useContext(HoldContext)
  const colRefs = useRef<(HTMLDivElement | null)[]>([])
  const [deals, setDeals] = useState(initialDeals)
  const [touched, setTouched] = useState(false)
  const [over, setOver] = useState<number | null>(null)
  const [canDrag, setCanDrag] = useState(false)
  const step = useStep(3, 1250, 900, !touched)

  // arrastar só com mouse/trackpad: no toque, o gesto precisa continuar rolando a página
  useEffect(() => setCanDrag(window.matchMedia('(pointer: fine)').matches), [])

  // sozinha, a demo leva o card em destaque de etapa em etapa, até alguém arrastar um card
  useEffect(() => {
    if (touched) return
    setDeals((list) => list.map((d) => (d.id === MARINA ? { ...d, col: step } : d)))
  }, [step, touched])

  const colAt = (point: { x: number; y: number }) => {
    const x = point.x - window.scrollX
    const i = colRefs.current.findIndex((el) => {
      if (!el) return false
      const r = el.getBoundingClientRect()
      return x >= r.left && x <= r.right
    })
    return i === -1 ? null : i
  }

  return (
    <div className="h-full flex flex-col gap-3 min-h-0">
      <Toolbar>
        <span className="crm-btn crm-btn--ghost">Pipeline de vendas</span>
        <span className="crm-chip crm-chip--on">3.654 leads</span>
        {canDrag && <span className="crm-chip hidden lg:inline-flex">Arraste os cards entre as etapas</span>}
        <span className="crm-btn ml-auto">
          <Plus className="w-3 h-3" /> Adicionar oportunidade
        </span>
      </Toolbar>
      <div className="flex-1 min-h-0 grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {columns.map((col, i) => (
          <div
            key={col.name}
            ref={(el) => {
              colRefs.current[i] = el
            }}
            className={`flex flex-col gap-2 min-h-0 rounded-[8px] p-1 -m-1 transition-colors duration-200 ${over === i ? 'bg-accent-soft' : ''}`}
          >
            <Pop delay={i * 0.08} className="rounded-[6px] px-2.5 py-1.5" style={{ background: col.color }}>
              <p className="text-[0.68rem] font-semibold truncate text-[#101828]">{col.name}</p>
              <p className="text-[0.56rem] text-[#344054]">{col.count} oportunidades</p>
            </Pop>
            {deals
              .filter((d) => d.col === i)
              .map((d, j) => {
                const on = d.id === MARINA
                return (
                  <motion.div
                    key={d.id}
                    layoutId={`crm-deal-${d.id}`}
                    drag={canDrag}
                    dragSnapToOrigin
                    dragMomentum={false}
                    dragElastic={1}
                    whileDrag={{ scale: 1.04, zIndex: 30, boxShadow: '0 18px 30px -12px rgba(16,24,40,0.4)' }}
                    onDragStart={() => {
                      hold()
                      setTouched(true)
                    }}
                    onDrag={(_, info) => setOver(colAt(info.point))}
                    onDragEnd={(_, info) => {
                      const target = colAt(info.point)
                      setOver(null)
                      if (target !== null) setDeals((list) => list.map((x) => (x.id === d.id ? { ...x, col: target } : x)))
                    }}
                    transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                    className={`relative rounded-[7px] bg-white border p-2 select-none ${canDrag ? 'cursor-grab active:cursor-grabbing' : ''} ${j >= 2 ? 'hidden md:block' : ''} ${on ? 'border-accent shadow-[0_8px_18px_-8px_rgba(21,94,239,0.5)]' : 'border-line shadow-[0_1px_2px_rgba(16,24,40,0.06)]'}`}
                  >
                    <p className="text-[0.68rem] font-semibold truncate mb-1">{d.n}</p>
                    <p className="text-[0.58rem] text-muted truncate">Fonte: {d.f}</p>
                    <p className="text-[0.58rem] text-muted">Valor: {d.v}</p>
                  </motion.div>
                )
              })}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Pagamentos ---------- */

const invoiceKpis = [
  { label: 'Fatura(s) em rascunho', n: 3, value: 2400 },
  { label: 'Fatura(s) em aberto', n: 12, value: 18900 },
  { label: 'Fatura(s) recebida(s)', n: 41, value: 64300 },
  { label: 'Fatura(s) atrasada(s)', n: 1, value: 1200 }
]
const invoices = [
  { name: 'Gestão de tráfego · outubro', client: 'Clínica Vita', value: 'R$ 3.500,00', status: 'Paga', ok: true },
  { name: 'Implantação do CRM', client: 'Studio Aurora', value: 'R$ 4.800,00', status: 'Paga', ok: true },
  { name: 'Mensalidade · plano Pro', client: 'Imob. Horizonte', value: 'R$ 1.970,00', status: 'Enviada' },
  { name: 'Landing page', client: 'Bruna Leal', value: 'R$ 2.400,00', status: 'Paga', ok: true },
  { name: 'Automação de WhatsApp', client: 'Rafael Prado', value: 'R$ 1.200,00', status: 'Enviada' }
]

const Payments = () => (
  <div className="h-full flex flex-col gap-3 min-h-0">
    <Toolbar>
      <p className="text-sm font-semibold">Faturas</p>
      <span className="crm-btn ml-auto">
        <Plus className="w-3 h-3" /> Novo
      </span>
    </Toolbar>
    <div className="flex-none grid grid-cols-2 lg:grid-cols-4 gap-3">
      {invoiceKpis.map((k, i) => (
        <Pop key={k.label} delay={i * 0.08} className="crm-panel p-3">
          <p className="text-[0.62rem] text-muted truncate">
            {k.n} {k.label}
          </p>
          <p className="text-base md:text-xl font-semibold mt-1 tracking-tight">
            R$ <NumberTicker value={k.value} delay={0.2} />
          </p>
        </Pop>
      ))}
    </div>
    <Table
      delay={0.4}
      cols={['Nome da fatura', 'Cliente', 'Valor', 'Status']}
      template="1.6fr 1.1fr 0.9fr 0.6fr"
      rows={invoices.map((inv) => [
        <span className="font-medium">{inv.name}</span>,
        <span className="text-muted">{inv.client}</span>,
        <span>{inv.value}</span>,
        <span className={`crm-chip ${inv.ok ? 'crm-chip--ok' : 'crm-chip--on'}`}>{inv.status}</span>
      ])}
    />
  </div>
)

/* ---------- AI Studio (criador com IA) ---------- */

const prompt = 'Crie uma landing page para uma clínica odontológica, com agendamento online.'
const buildSteps = ['Criando a estrutura da página', 'Escrevendo os textos e a oferta', 'Conectando o formulário ao CRM']
const headline = 'Seu sorriso novo começa aqui.'.split(' ')
const reply = 'Pronto! Criei a landing page e conectei o formulário ao seu CRM. Todo lead que agendar entra direto no pipeline.'.split(' ')

const PageSection = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: 'spring', stiffness: 220, damping: 22 }}
    className={`rounded-[10px] border border-line-strong bg-surface-2 p-3 ${className}`}
  >
    {children}
  </motion.div>
)

const PromptBox = ({ text, caret }: { text: string; caret: boolean }) => (
  <div className="flex-none rounded-[12px] bg-[#17171a] border border-line-strong p-2.5">
    <p className="text-[0.68rem] leading-snug min-h-[2.2rem]">
      {text || <span className="text-dim">Pergunte à IA...</span>}
      {caret && <i className="crm-caret" />}
    </p>
    <div className="flex items-center gap-2 mt-1.5">
      <Plus className="w-3.5 h-3.5 text-dim" />
      <span className="crm-chip crm-chip--on">
        <Wand2 className="w-3 h-3" /> Edições visuais
      </span>
      <span className="ml-auto w-6 h-6 rounded-full bg-accent text-on-accent flex items-center justify-center">
        <ArrowUp className="w-3 h-3" />
      </span>
    </div>
  </div>
)

const AiStudio = () => {
  // 1) o prompt é digitado  2) enviado  3) a IA trabalha em etapas enquanto o site aparece ao vivo
  const typed = useStep(prompt.length, 20, 500)
  const phase = useStep(6, 720, 350, typed >= prompt.length)
  const sent = phase >= 1
  const built = phase >= 5
  const head = useStep(headline.length, 110, 100, phase >= 3)
  const said = useStep(reply.length, 40, 100, built)
  const input = <PromptBox text={sent ? '' : prompt.slice(0, typed)} caret={!sent && typed > 0} />

  return (
    <div className="crm-dark h-full rounded-[12px] p-2.5 grid md:grid-cols-[minmax(0,250px)_1fr] gap-2.5 overflow-hidden">
      {/* conversa com a IA */}
      <div className="hidden md:flex flex-col gap-2.5 min-h-0">
        <div className="flex-none flex items-center gap-2 px-1 pt-1 text-[0.7rem] font-semibold">
          <ArrowLeft className="w-3.5 h-3.5 text-muted" />
          <span className="w-4 h-4 rounded-full bg-accent text-on-accent flex items-center justify-center text-[0.45rem] font-bold">SA</span>
          Clínica Sorria
        </div>
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col gap-2.5">
          {sent && <Pop className="self-end max-w-[92%] rounded-[10px] bg-[#1c1c20] px-3 py-2 text-[0.66rem] leading-snug">{prompt}</Pop>}
          {sent && <p className={`flex-none text-[0.62rem] px-1 ${phase < 2 ? 'crm-shine' : 'text-dim'}`}>{phase < 2 ? 'Refletindo...' : 'Reflexão por 4 s'}</p>}
          {phase >= 2 && (
            <Pop className={`flex-none rounded-[10px] border p-2.5 transition-colors duration-500 ${built ? 'border-line-strong' : 'border-accent'}`}>
              <p className="text-[0.68rem] font-semibold mb-1.5">{built ? 'Landing page criada' : buildSteps[Math.min(phase - 2, 2)]}</p>
              <p className="flex items-center gap-2 text-[0.62rem] text-muted">
                {built ? <Check className="w-3 h-3 flex-none text-[#32d583]" strokeWidth={3} /> : <span className="crm-spin flex-none" />}
                {built ? '3 ferramentas usadas' : `Etapa ${Math.min(phase - 1, 3)} de 3`}
              </p>
              {built && (
                <div className="grid grid-cols-2 gap-2 mt-2.5">
                  <span className="crm-btn crm-btn--ghost justify-center">Detalhes</span>
                  <span className="crm-btn justify-center">Pré-visualizar</span>
                </div>
              )}
            </Pop>
          )}
          {built && (
            <p className="flex-none text-[0.66rem] leading-relaxed px-1">
              {reply.slice(0, said).map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                  {w}{' '}
                </motion.span>
              ))}
              {said < reply.length && <i className="crm-caret" />}
            </p>
          )}
          {phase >= 6 && (
            <Pop className="flex-none rounded-[10px] border border-line-strong p-2.5">
              <p className="text-[0.68rem] font-semibold mb-1.5">Site publicado</p>
              <p className="flex items-center gap-2 text-[0.62rem] text-muted truncate">
                <Check className="w-3 h-3 flex-none text-[#32d583]" strokeWidth={3} /> clinica-sorria.suaagencia.com.br
              </p>
            </Pop>
          )}
        </div>
        {input}
      </div>

      {/* prévia do site, gerada ao vivo */}
      <div className="flex flex-col gap-2.5 min-h-0">
        <div className="flex-none flex items-center gap-2">
          <span className="crm-chip crm-chip--on">
            <Globe className="w-3 h-3" /> Pré-visualizar
          </span>
          <span className="crm-chip hidden sm:inline-flex">
            <Code className="w-3 h-3" />
          </span>
          <span className="flex-1 max-w-[220px] mx-auto flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-[0.6rem] text-dim">
            <Monitor className="w-3 h-3" /> /
          </span>
          <span className={`crm-btn transition-colors duration-500 ${phase >= 6 ? '!bg-[#12b76a] !text-white' : ''}`}>{phase >= 6 ? 'Publicado' : 'Publicar'}</span>
        </div>
        <div className="relative flex-1 min-h-0 overflow-hidden rounded-[10px] border border-line-strong bg-[#08080a]">
          {sent && phase < 5 && <i className="crm-scan" />}
          {!sent && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-dim">
              <Sparkles className="w-5 h-5" />
              <p className="text-[0.7rem]">Descreva o que deseja construir</p>
            </div>
          )}
          {sent && phase < 2 && (
            <div className="p-4 space-y-3">
              <i className="crm-skel crm-shimmer !h-7 !rounded-[8px]" />
              <i className="crm-skel crm-shimmer !h-28 !rounded-[10px]" />
              <i className="crm-skel crm-shimmer !h-16 !rounded-[10px]" />
            </div>
          )}
          {phase >= 2 && (
            <div className="h-full flex flex-col">
              <Pop className="flex-none flex items-center gap-5 px-4 md:px-6 py-3 border-b border-line">
                <span className="font-display font-extrabold text-[0.72rem] md:text-sm">Clínica Sorria</span>
                <span className="hidden sm:flex gap-4 text-[0.62rem] text-muted">
                  <span>Tratamentos</span>
                  <span>Equipe</span>
                  <span>Depoimentos</span>
                </span>
                <span className="ml-auto rounded-full bg-white text-[#050505] text-[0.6rem] font-semibold px-3 py-1">Agendar</span>
              </Pop>
              {phase >= 3 && (
                <div className="flex-none px-4 pt-6 md:pt-9 pb-5 text-center">
                  <Pop className="inline-flex rounded-full border border-line-strong px-3 py-1 text-[0.58rem] text-muted mb-3">Avaliação gratuita · Vagas esta semana</Pop>
                  <p className="font-display font-extrabold text-2xl md:text-[2.5rem] leading-[1.05] tracking-tight min-h-[2.1em]">
                    {headline.slice(0, head).map((w, i) => (
                      <motion.span key={i} initial={{ opacity: 0, filter: 'blur(8px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.4 }} className={i >= 3 ? 'hl' : undefined}>
                        {w}{' '}
                      </motion.span>
                    ))}
                    {head < headline.length && <i className="crm-caret" />}
                  </p>
                  {head >= headline.length && (
                    <Pop>
                      <p className="text-[0.66rem] md:text-xs text-muted mt-2">Implantes, clareamento e aparelhos. Agende em menos de 1 minuto.</p>
                      <div className="flex justify-center gap-2 mt-4">
                        <span className="rounded-full bg-accent text-on-accent text-[0.62rem] font-semibold px-4 py-1.5">Quero minha avaliação</span>
                        <span className="rounded-full border border-line-strong text-[0.62rem] font-medium px-4 py-1.5 hidden sm:inline">Ver tratamentos</span>
                      </div>
                    </Pop>
                  )}
                </div>
              )}
              {phase >= 4 && (
                <div className="flex-none grid grid-cols-3 gap-2.5 px-4 md:px-6">
                  {['Implantes', 'Clareamento', 'Aparelhos'].map((t, i) => (
                    <Pop key={t} delay={i * 0.12} className="rounded-[10px] border border-line-strong bg-surface p-2.5">
                      <i className="block w-5 h-5 rounded-[6px] bg-accent-soft mb-2" />
                      <p className="text-[0.64rem] font-semibold">{t}</p>
                      <i className="crm-skel w-full mt-2 !h-1.5" />
                      <i className="crm-skel w-2/3 mt-1.5 !h-1.5" />
                    </Pop>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="md:hidden">{input}</div>
      </div>
    </div>
  )
}

/* ---------- Agentes de AI ---------- */

const agents = [
  { name: 'Qualificação de leads', type: 'Baseado em prompt', channel: 'WhatsApp · Instagram', on: true },
  { name: 'Recepção e agendamento', type: 'Baseado em prompt', channel: 'WhatsApp', on: true },
  { name: 'Reagendamento', type: 'Baseado em fluxo', channel: 'SMS · E-mail' },
  { name: 'Agente de voz', type: 'Baseado em prompt', channel: 'Telefone', on: true },
  { name: 'Pós-venda e avaliações', type: 'Baseado em fluxo', channel: 'WhatsApp' }
]

const Agents = () => {
  const step = useStep(2, 1400, 1800)
  return (
    <div className="h-full flex flex-col gap-3 min-h-0">
      <Toolbar>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">Agentes de Conversation AI</p>
          <p className="text-[0.64rem] text-muted truncate">Crie e gerencie vários agentes para sua empresa</p>
        </div>
        <span className="crm-btn crm-btn--ghost ml-auto hidden sm:inline-flex">Base de conhecimento</span>
        <span className="crm-btn">
          <Plus className="w-3 h-3" /> Criar agente
        </span>
      </Toolbar>
      <Table
        cols={['Nome do agente', 'Status', 'Tipo', 'Canais atribuídos']}
        template="1.4fr 1fr 1fr 1.2fr"
        rows={agents.map((a, i) => {
          const on = a.on || (i === 2 && step >= 1) || (i === 4 && step >= 2)
          return [
            <span className="font-medium">{a.name}</span>,
            <span className={`crm-chip transition-colors duration-500 ${on ? 'crm-chip--ok' : ''}`}>{on ? 'Piloto automático' : 'Des.'}</span>,
            <span className="text-muted">{a.type}</span>,
            <span className="text-muted">{a.channel}</span>
          ]
        })}
      />
    </div>
  )
}

/* ---------- Marketing (planejador social) ---------- */

const TikTok = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.1v12.4a2.59 2.59 0 1 1-2.59-2.6c.27 0 .53.04.78.12V9.76a5.7 5.7 0 0 0-.78-.05 5.69 5.69 0 1 0 5.69 5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.25-1.48z" />
  </svg>
)

const networks = {
  instagram: { name: 'Instagram', icon: Instagram, bg: 'linear-gradient(45deg,#f58529,#dd2a7b 55%,#8134af)' },
  facebook: { name: 'Facebook', icon: Facebook, bg: '#1877f2' },
  youtube: { name: 'YouTube', icon: Youtube, bg: '#ff0000' },
  tiktok: { name: 'TikTok', icon: TikTok, bg: '#000000' },
  linkedin: { name: 'LinkedIn', icon: Linkedin, bg: '#0a66c2' }
}
type Net = keyof typeof networks

const NetIcon = ({ net }: { net: Net; key?: string }) => {
  const n = networks[net]
  return (
    <span title={n.name} className="flex-none w-[22px] h-[22px] rounded-full flex items-center justify-center text-white ring-2 ring-white" style={{ background: n.bg }}>
      <n.icon className="w-3 h-3" />
    </span>
  )
}

const posts: { text: string; date: string; nets: Net[]; video?: boolean; done?: boolean }[] = [
  { text: '3 automações que toda clínica deveria ter', date: '16 out · 12:00', nets: ['instagram', 'facebook'], video: true },
  { text: 'Antes e depois: funil de agendamento', date: '16 out · 19:00', nets: ['tiktok', 'instagram'], video: true },
  { text: 'Como responder leads em menos de 1 minuto', date: '17 out · 12:00', nets: ['youtube'], video: true },
  { text: 'Bastidores do onboarding de um cliente', date: '17 out · 19:00', nets: ['facebook', 'linkedin'] },
  { text: 'Checklist: sua agência está pronta para escalar?', date: '18 out · 12:00', nets: ['linkedin'] },
  { text: 'IA atendendo no WhatsApp às 2h da manhã', date: '18 out · 19:00', nets: ['tiktok', 'youtube', 'instagram'], video: true },
  { text: 'Quanto custa um lead na sua região?', date: '19 out · 12:00', nets: ['instagram'] },
  { text: 'Tour pelo painel de controle em 60 segundos', date: '19 out · 19:00', nets: ['youtube', 'tiktok'], video: true },
  { text: 'Depoimento: clínica dobrou os agendamentos', date: '20 out · 12:00', nets: ['facebook', 'instagram'], video: true },
  { text: '5 mensagens de follow-up que funcionam', date: '20 out · 19:00', nets: ['linkedin', 'instagram'] },
  { text: 'O erro que trava o seu follow-up', date: '15 out · 19:00', nets: ['instagram', 'tiktok'], video: true, done: true },
  { text: 'Por que planilha não é CRM', date: '15 out · 12:00', nets: ['linkedin', 'facebook'], done: true },
  { text: 'Ao vivo: montando um funil do zero', date: '14 out · 19:00', nets: ['youtube'], video: true, done: true }
]

const Marketing = () => (
  <div className="h-full flex flex-col gap-3 min-h-0">
    <Toolbar>
      <p className="text-sm font-semibold">Planejador social</p>
      <div className="hidden sm:flex items-center -space-x-1.5 ml-2">
        {(Object.keys(networks) as Net[]).map((n) => (
          <NetIcon key={n} net={n} />
        ))}
      </div>
      <span className="crm-chip crm-chip--on hidden lg:inline-flex">108 publicações</span>
      <span className="crm-btn crm-btn--ghost ml-auto hidden sm:inline-flex">
        <Plus className="w-3 h-3" /> Redes sociais
      </span>
      <span className="crm-btn">
        <Plus className="w-3 h-3" /> Nova publicação
      </span>
    </Toolbar>
    <Table
      cols={['Legenda', 'Mídia', 'Status', 'Data', 'Mídia social']}
      template="2fr 0.4fr 0.8fr 0.9fr 0.8fr"
      rows={posts.map((p) => [
        <span className="font-medium">{p.text}</span>,
        <span className="w-6 h-6 rounded-[5px] bg-[#667085] text-white flex items-center justify-center">{p.video ? <Play className="w-2.5 h-2.5 fill-current" /> : <ImageIcon className="w-3 h-3" />}</span>,
        <span className={`crm-chip ${p.done ? 'crm-chip--ok' : 'crm-chip--on'}`}>{p.done ? 'Publicado' : 'Programado'}</span>,
        <span className="text-muted">{p.date}</span>,
        <span className="flex items-center -space-x-1.5 py-px pl-0.5">
          {p.nets.map((n) => (
            <NetIcon key={n} net={n} />
          ))}
        </span>
      ])}
    />
  </div>
)

/* ---------- Automações (construtor de fluxo) ---------- */

// O fluxo é desenhado num palco de tamanho fixo (FW x FH) e escalado para caber no painel.
const FW = 990
const FH = 440
const MID = 220
const RUN = 3300 // um lead a cada 3,3 s
const TRAVEL = 2.7 // segundos que o lead leva para cruzar o fluxo
const hue = { blue: '#155eef', green: '#079455', purple: '#6938ef' }

const startNodes = [
  { x: 40, icon: Zap, label: 'Formulário enviado', color: hue.blue },
  { x: 150, icon: UserCheck, label: 'Atribuir ao usuário', color: hue.blue },
  { x: 260, icon: Braces, label: 'De onde veio?', color: hue.purple }
]
const actionX = [575, 665, 755, 845, 935]
const flowRows = [
  {
    y: 58,
    tag: 'AND',
    cond: 'Se "Origem" é "anúncio"',
    label: 'Anúncios Meta',
    lead: 'Marina Duarte',
    nodes: [
      { icon: Facebook, label: 'API de conversão', color: hue.blue },
      { icon: UserPlus, label: 'Liberar acesso', color: hue.blue },
      { icon: Mail, label: 'E-mail de boas-vindas', color: hue.green },
      { icon: Timer, label: 'Esperar 2 min', color: hue.purple },
      { icon: MessageCircle, label: 'Mensagem no WhatsApp', color: hue.green }
    ]
  },
  {
    y: 166,
    tag: 'AND',
    cond: 'Se "Tags" inclui "webinar"',
    label: 'Webinar',
    lead: 'Otávio Reis',
    nodes: [
      { icon: Workflow, label: 'Adicionar ao fluxo', color: hue.purple },
      { icon: UserPlus, label: 'Liberar acesso', color: hue.blue },
      { icon: Tag, label: 'Adicionar tag', color: hue.blue },
      { icon: Mail, label: 'E-mail de boas-vindas', color: hue.green },
      { icon: Timer, label: 'Esperar 2 min', color: hue.purple }
    ]
  },
  {
    y: 274,
    tag: 'AND',
    cond: 'Se "Origem" é "instagram"',
    label: 'Instagram',
    lead: 'Bruna Leal',
    nodes: [
      { icon: UserPlus, label: 'Liberar acesso', color: hue.blue },
      { icon: BadgePercent, label: 'Oferta teste grátis', color: hue.blue },
      { icon: Mail, label: 'E-mail de boas-vindas', color: hue.green },
      { icon: Timer, label: 'Esperar 2 min', color: hue.purple },
      { icon: MessageCircle, label: 'Mensagem no WhatsApp', color: hue.green }
    ]
  },
  {
    y: 382,
    tag: 'NENHUM',
    cond: 'Quando nenhuma das condições é atendida',
    label: 'YouTube / Blog',
    lead: 'Caio Nunes',
    nodes: [
      { icon: Facebook, label: 'API de conversão', color: hue.blue },
      { icon: Kanban, label: 'Criar oportunidade', color: hue.blue },
      { icon: Mail, label: 'E-mail de boas-vindas', color: hue.green },
      { icon: Timer, label: 'Esperar 2 min', color: hue.purple },
      { icon: Bot, label: 'IA assume a conversa', color: hue.purple }
    ]
  }
]

// caminho que o lead percorre numa ramificação, e a que fração dele fica cada ponto
const branchCurve = (y: number) => `M282 ${MID} C 325 ${MID} 318 ${y} 360 ${y}`
const leadPath = (y: number) => `M40 ${MID} L282 ${MID} C 325 ${MID} 318 ${y} 360 ${y} L935 ${y}`
const curveLen = (y: number) => Math.hypot(78, y - MID) * 1.06
const fracAt = (x: number, y: number) => (x <= 282 ? x - 40 : 242 + curveLen(y) + (x - 360)) / (242 + curveLen(y) + 575)

const FlowNode = ({ x, y, icon: Icon, label, color, at }: { x: number; y: number; icon: typeof Zap; label: string; color: string; at: number | null; key?: string | number }) => (
  <>
    <span
      className={`crm-fnode ${at !== null ? 'crm-fnode--run' : ''}`}
      style={{ left: x, top: y, color, animationDelay: at !== null ? `${at * TRAVEL}s` : undefined }}
    >
      <Icon className="w-5 h-5" />
    </span>
    <span className="crm-flabel" style={{ left: x, top: y + 28 }}>
      {label}
    </span>
  </>
)

const Automations = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [run, setRun] = useState(0)

  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const fit = () => {
      const byHeight = Math.min(box.clientHeight / FH, 1.15)
      // em telas largas o fluxo inteiro cabe; nas estreitas prioriza a altura e corta à direita
      setScale(box.clientWidth >= 640 ? Math.min(box.clientWidth / FW, byHeight) : byHeight * 0.85)
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(box)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const t = setInterval(() => setRun((r) => r + 1), RUN)
    return () => clearInterval(t)
  }, [])

  const active = run % flowRows.length
  const row = flowRows[active]
  const path = leadPath(row.y)

  return (
    <div className="h-full flex flex-col gap-3 min-h-0">
      <Toolbar>
        <span className="hidden sm:flex items-center gap-1.5 text-[0.7rem] text-muted">
          <ArrowLeft className="w-3.5 h-3.5" /> Lista de fluxos de trabalho
        </span>
        <p className="text-sm font-medium truncate sm:mx-auto flex items-center gap-2">
          Boas-vindas · Teste grátis <Pencil className="w-3 h-3 text-dim" />
        </p>
        <span className="crm-btn ml-auto sm:ml-0">Salvar</span>
      </Toolbar>
      <div className="crm-panel flex-1 min-h-0 flex flex-col overflow-hidden">
        <div className="flex-none flex items-center gap-4 px-3 h-9 border-b border-line overflow-hidden">
          <span className="crm__tab crm__tab--on">Construtor</span>
          <span className="crm__tab">Configurações</span>
          <span className="crm__tab hidden sm:inline">Histórico de inscrições</span>
          <span className="crm__tab hidden lg:inline">Registros de execução</span>
          <span className="crm-chip crm-chip--on ml-auto hidden md:inline-flex">Testar fluxo de trabalho</span>
          <span className="flex-none flex items-center gap-1.5 text-[0.62rem] text-muted ml-auto md:ml-0">
            Rascunho
            <i className="relative w-6 h-3.5 rounded-full bg-accent">
              <i className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-white" />
            </i>
            <span className="text-[#101828] font-medium">Publicar</span>
          </span>
        </div>
        <div ref={boxRef} className="crm-canvas relative flex-1 min-h-0 overflow-hidden flex items-center justify-start sm:justify-center">
          <div className="relative flex-none" style={{ width: FW * scale, height: FH * scale }}>
            <div className="absolute top-0 left-0 origin-top-left" style={{ width: FW, height: FH, transform: `scale(${scale})` }}>
              <svg width={FW} height={FH} className="absolute inset-0" fill="none">
                <g stroke="#b9c0cc" strokeWidth="1.5">
                  <path d={`M40 ${MID} L260 ${MID}`} />
                  {flowRows.map((r) => (
                    <path key={r.y} d={`${branchCurve(r.y)} L935 ${r.y}`} />
                  ))}
                </g>
                {/* rastro do lead que está passando agora */}
                <motion.path
                  key={run}
                  d={path}
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: [1, 1, 0.25] }}
                  transition={{ pathLength: { duration: TRAVEL, ease: 'linear' }, opacity: { duration: RUN / 1000, times: [0, 0.85, 1] } }}
                />
              </svg>

              {startNodes.map((n) => (
                <FlowNode key={`${n.x}-${run}`} x={n.x} y={MID} icon={n.icon} label={n.label} color={n.color} at={fracAt(n.x, row.y)} />
              ))}

              {flowRows.map((r, i) => {
                const on = i === active
                return (
                  <div key={r.y}>
                    <span
                      key={on ? run : 'idle'}
                      className={`crm-fcond ${on ? 'crm-fnode--run' : ''}`}
                      style={{ left: 430, top: r.y, animationDelay: on ? `${fracAt(360, r.y) * TRAVEL}s` : undefined }}
                    >
                      <b>{`{ } ${r.tag}`}</b>
                      {r.cond}
                    </span>
                    <span className="crm-flabel" style={{ left: 430, top: r.y + 28 }}>
                      {r.label}
                    </span>
                    {r.nodes.map((n, j) => (
                      <FlowNode key={on ? `${j}-${run}` : j} x={actionX[j]} y={r.y} icon={n.icon} label={n.label} color={n.color} at={on ? fracAt(actionX[j], r.y) : null} />
                    ))}
                  </div>
                )
              })}

              {/* o lead percorrendo o caminho */}
              <motion.div
                key={run}
                className="crm-lead"
                style={{ offsetPath: `path("${path}")`, offsetRotate: '0deg' } as CSSProperties}
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
                transition={{ offsetDistance: { duration: TRAVEL, ease: 'linear' }, opacity: { duration: TRAVEL, times: [0, 0.06, 0.93, 1] } }}
              >
                <i />
                <span>{row.lead}</span>
              </motion.div>
            </div>
          </div>

          <span className="crm-chip absolute left-3 bottom-3 !bg-white">
            <span className="crm-spin" /> Lead no fluxo agora: <strong className="font-semibold text-[#101828]">{row.lead}</strong>
          </span>
          <span className="crm-btn crm-btn--ghost absolute right-3 top-3 hidden sm:inline-flex">
            <Plus className="w-3 h-3" /> Adicionar
          </span>
        </div>
      </div>
    </div>
  )
}

/* ---------- Sites (funis) ---------- */

const funnels = [
  { name: 'Captura · Clínicas', steps: '3 etapas', folder: true },
  { name: 'Webinar · Agências', steps: '4 etapas', folder: true },
  { name: 'LP Imobiliária', steps: '2 etapas' },
  { name: 'Funil gerado com IA', steps: '1 etapa' }
]

const Sites = () => {
  const step = useStep(4, 800, 600)
  return (
    <div className="h-full flex flex-col gap-3 min-h-0">
      <Toolbar>
        <div className="min-w-0">
          <p className="text-sm font-semibold">Funis</p>
          <p className="text-[0.64rem] text-muted truncate">Gere leads, compromissos e receba pagamentos.</p>
        </div>
        <span className="crm-btn crm-btn--ghost !text-accent ml-auto hidden sm:inline-flex">
          <Sparkles className="w-3 h-3" /> Desenvolver com AI
        </span>
        <span className="crm-btn">
          <Plus className="w-3 h-3" /> Novo funil
        </span>
      </Toolbar>
      <div className="flex-1 min-h-0 grid md:grid-cols-[230px_1fr] gap-3">
        <div className="crm-panel hidden md:block overflow-hidden">
          <p className="crm-th px-3 py-2">Nome</p>
          {funnels.map((f, i) => (
            <Pop key={f.name} delay={i * 0.07} className={`flex items-center gap-2 px-3 py-2.5 border-b border-line text-[0.68rem] ${i === 0 ? 'bg-accent-soft' : ''}`}>
              {f.folder ? <Folder className="w-3.5 h-3.5 flex-none text-muted" /> : <LayoutTemplate className="w-3.5 h-3.5 flex-none text-muted" />}
              <span className="font-medium truncate flex-1">{f.name}</span>
              <span className="text-[0.58rem] text-dim">{f.steps}</span>
            </Pop>
          ))}
        </div>
        <div className="crm-panel flex flex-col min-h-0 overflow-hidden">
          <div className="flex-none flex items-center gap-2 p-2.5 border-b border-line overflow-hidden">
            <span className="crm-chip crm-chip--on">1. Captura</span>
            <span className="crm-chip">2. Obrigado</span>
            <span className="crm-chip">3. Agendamento</span>
            <span className="crm-chip crm-chip--ok ml-auto hidden sm:inline-flex">Publicado</span>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden p-3 space-y-2.5 bg-bg">
            {step >= 1 && (
              <PageSection className="flex items-center justify-between !bg-white">
                <i className="crm-skel w-16" />
                <div className="flex gap-2">
                  <i className="crm-skel w-8" />
                  <i className="crm-skel w-8" />
                  <i className="crm-skel w-8" />
                </div>
              </PageSection>
            )}
            {step >= 2 && (
              <PageSection className="py-5 flex flex-col items-center gap-2.5 !bg-white">
                <i className="crm-skel !h-3 w-2/3 !bg-[#344054]" />
                <i className="crm-skel w-1/2" />
                <span className="crm-btn mt-1 !rounded-full">Quero agendar</span>
              </PageSection>
            )}
            {step >= 3 && (
              <PageSection className="grid grid-cols-3 gap-2.5 !bg-white">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-[8px] border border-line p-2.5 space-y-2">
                    <i className="block w-5 h-5 rounded-[6px] bg-accent-soft" />
                    <i className="crm-skel w-full" />
                    <i className="crm-skel w-2/3" />
                  </div>
                ))}
              </PageSection>
            )}
            {step >= 4 && (
              <PageSection className="flex items-center gap-2.5 !bg-white">
                <i className="crm-skel !h-7 flex-1 !rounded-[7px] !bg-surface-2" />
                <i className="crm-skel !h-7 flex-1 !rounded-[7px] !bg-surface-2 hidden sm:block" />
                <span className="crm-btn">Enviar</span>
              </PageSection>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Assinaturas (cursos e comunidades) ---------- */

const courses = [
  { title: 'Onboarding do cliente', lessons: '12 aulas', p: 80 },
  { title: 'Tráfego para clínicas', lessons: '24 aulas', p: 45 },
  { title: 'Vendas pelo WhatsApp', lessons: '9 aulas', p: 100 }
]

const Memberships = () => (
  <div className="h-full flex flex-col gap-3 min-h-0">
    <Pop className="flex-none rounded-[10px] px-4 py-4 md:py-5 flex items-center justify-between gap-4 text-white bg-[linear-gradient(100deg,#155eef,#7a5af8_55%,#53b1fd)]">
      <div>
        <p className="text-base md:text-xl font-bold leading-tight">Sua marca. Seu app.</p>
        <p className="text-[0.66rem] md:text-xs opacity-90">Lance seu app sem marca com cursos e comunidades</p>
      </div>
      <div className="text-right flex-none">
        <p className="text-[0.58rem] uppercase tracking-wider opacity-80">Usuários</p>
        <p className="text-xl font-semibold leading-none">
          <NumberTicker value={1240} />
        </p>
      </div>
    </Pop>
    <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-3 gap-3 content-start">
      {courses.map((c, i) => (
        <Pop key={c.title} delay={0.15 + i * 0.1} className={`crm-panel p-2.5 flex sm:flex-col gap-3 ${i === 2 ? 'hidden sm:flex' : ''}`}>
          <div className="flex-none w-24 sm:w-full h-20 sm:h-24 rounded-[8px] bg-[linear-gradient(135deg,#1d2939,#475467)] flex items-center justify-center">
            <span className="w-8 h-8 rounded-full bg-white/90 text-[#101828] flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-current" />
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">{c.title}</p>
            <p className="text-[0.62rem] text-muted mb-2.5">{c.lessons}</p>
            <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
              <motion.i
                className="block h-full rounded-full bg-accent"
                style={{ transformOrigin: 'left', width: `${c.p}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.6 + i * 0.15, ease }}
              />
            </div>
            <p className="text-[0.58rem] text-dim mt-1.5">{c.p === 100 ? 'Concluído' : `${c.p}% concluído`}</p>
          </div>
        </Pop>
      ))}
    </div>
  </div>
)

/* ---------- Mídia Drive ---------- */

const media = [
  { name: 'depoimento-cliente.mp4', video: true, bg: 'linear-gradient(135deg,#1d2939,#475467)' },
  { name: 'capa-reels-01.png', bg: 'linear-gradient(135deg,#155eef,#53b1fd)' },
  { name: 'aula-03-automacoes.mp4', video: true, bg: 'linear-gradient(135deg,#344054,#667085)' },
  { name: 'criativo-oferta.png', bg: 'linear-gradient(135deg,#f8c313,#fdb022)' },
  { name: 'bastidores-evento.mp4', video: true, bg: 'linear-gradient(135deg,#101828,#344054)' },
  { name: 'logo-cliente.png', bg: 'linear-gradient(135deg,#7a5af8,#bdb4fe)' },
  { name: 'tutorial-funil.mp4', video: true, bg: 'linear-gradient(135deg,#475467,#98a2b3)' },
  { name: 'banner-webinar.png', bg: 'linear-gradient(135deg,#0e9384,#5fe9d0)' }
]

const Media = () => (
  <div className="h-full flex flex-col gap-3 min-h-0">
    <Toolbar>
      <p className="text-sm font-semibold truncate">Armazenamento de mídia</p>
      <span className="crm-btn crm-btn--ghost !text-dim ml-auto hidden sm:inline-flex">
        <Search className="w-3 h-3" /> Pesquisar na biblioteca
      </span>
      <span className="crm-btn">
        <Upload className="w-3 h-3" /> Carregar
      </span>
    </Toolbar>
    <div className="flex-1 min-h-0 overflow-hidden grid grid-cols-2 sm:grid-cols-4 gap-2.5 content-start">
      {media.map((m, i) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.1 + i * 0.08 }}
          className="relative aspect-[4/3] rounded-[8px] overflow-hidden flex items-center justify-center"
          style={{ background: m.bg }}
        >
          {m.video && (
            <span className="w-7 h-7 rounded-full bg-white/85 text-[#101828] flex items-center justify-center">
              <Play className="w-3 h-3 fill-current" />
            </span>
          )}
          <span className="absolute inset-x-0 bottom-0 px-2 py-1 text-[0.56rem] font-medium text-white truncate bg-[linear-gradient(transparent,rgba(0,0,0,0.6))]">{m.name}</span>
        </motion.div>
      ))}
    </div>
  </div>
)

/* ---------- Reputação ---------- */

const ratings = [86, 10, 3, 1, 0]
const reviews = [
  { name: 'Lívia Moura', text: 'Atendimento rápido e muito atencioso. Recomendo!' },
  { name: 'Caio Nunes', text: 'Agendei pelo WhatsApp em dois minutos.' },
  { name: 'Bruna Leal', text: 'Equipe excelente do começo ao fim.', ai: true }
]

const Stars = () => (
  <span className="flex gap-0.5 text-[#f8c313]">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className="w-3 h-3 fill-current" />
    ))}
  </span>
)

const Reputation = () => (
  <div className="h-full flex flex-col gap-3 min-h-0">
    <Toolbar>
      <p className="text-sm font-semibold">Visão geral</p>
      <span className="crm-btn ml-auto">Enviar solicitação de avaliação</span>
    </Toolbar>
    <div className="flex-1 min-h-0 grid md:grid-cols-[1fr_1.4fr] gap-3">
      <Pop className="crm-panel p-3.5">
        <p className="text-[0.68rem] text-muted">Classificações médias</p>
        <div className="flex items-end gap-3 mt-1 mb-4">
          <p className="text-4xl md:text-5xl font-light leading-none">4,9</p>
          <div>
            <Stars />
            <p className="text-[0.62rem] text-muted mt-1">326 avaliações</p>
          </div>
        </div>
        <div className="space-y-2 hidden md:block">
          {ratings.map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-[0.6rem] text-dim">
              <span className="w-2">{5 - i}</span>
              <div className="flex-1 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                <motion.i
                  className="block h-full rounded-full bg-[#f8c313]"
                  style={{ transformOrigin: 'left', width: `${r}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease }}
                />
              </div>
            </div>
          ))}
        </div>
      </Pop>
      <div className="space-y-2.5 min-h-0 overflow-hidden">
        {reviews.map((r, i) => (
          <Pop key={r.name} delay={0.4 + i * 0.55} className="crm-panel p-3">
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <div className="flex items-center gap-2">
                <Avatar name={r.name} i={i} />
                <p className="text-xs font-semibold">{r.name}</p>
              </div>
              <Stars />
            </div>
            <p className="text-[0.68rem] text-muted">{r.text}</p>
            {r.ai && (
              <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4 }} className="crm-chip crm-chip--on mt-2">
                <Bot className="w-3 h-3" /> Respondida pela IA
              </motion.span>
            )}
          </Pop>
        ))}
      </div>
    </div>
  </div>
)

/* ---------- Relatórios ---------- */

const charts = [
  { label: 'Impressões', value: 184300, d: 'M0 50 C 25 46, 40 40, 60 38 S 95 30, 115 22 S 160 14, 200 6' },
  { label: 'Cliques', value: 9240, d: 'M0 52 C 30 50, 45 34, 70 36 S 105 24, 130 26 S 170 10, 200 8' },
  { label: 'Conversões', value: 612, d: 'M0 54 C 20 52, 50 46, 75 40 S 110 36, 135 24 S 175 16, 200 4' }
]
const adStats = [
  { label: 'Investimento', v: 'R$ 12.480' },
  { label: 'CPC médio', v: 'R$ 1,35' },
  { label: 'Custo por lead', v: 'R$ 20,39' },
  { label: 'ROI', v: '412%' }
]

const Reports = () => (
  <div className="h-full flex flex-col gap-3 min-h-0">
    <Toolbar>
      <p className="text-sm font-semibold truncate">Relatório de anúncios Meta</p>
      <span className="crm-btn crm-btn--ghost ml-auto">
        <CalendarIcon className="w-3 h-3" /> Últimos 30 dias
      </span>
    </Toolbar>
    <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-3 gap-3">
      {charts.map((c, i) => (
        <Pop key={c.label} delay={i * 0.1} className={`crm-panel p-3 flex flex-col min-h-0 ${i === 2 ? 'hidden sm:flex' : ''}`}>
          <p className="text-[0.68rem] text-muted">{c.label}</p>
          <p className="text-xl md:text-2xl font-light tracking-tight">
            <NumberTicker value={c.value} delay={0.2} />
          </p>
          <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="flex-1 w-full min-h-[50px] mt-2">
            <motion.path
              d={c.d}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.4 + i * 0.15, ease }}
            />
          </svg>
        </Pop>
      ))}
    </div>
    <div className="flex-none grid grid-cols-2 lg:grid-cols-4 gap-3">
      {adStats.map((s, i) => (
        <Pop key={s.label} delay={0.5 + i * 0.08} className="crm-panel p-3">
          <p className="text-[0.62rem] text-muted">{s.label}</p>
          <p className="text-base md:text-lg font-medium">{s.v}</p>
        </Pop>
      ))}
    </div>
  </div>
)

/* ---------- janela ---------- */

type Scene = { id: string; label: string; icon: typeof Zap; desc: string; view: () => ReactNode; tabs?: string[]; tab?: number; gap?: boolean; beta?: boolean; duration?: number }

const scenes: Scene[] = [
  { id: 'ask-ai', label: 'Pergunte à IA', icon: Sparkles, desc: 'Pergunte sobre seus leads e a IA responde com os dados do CRM.', view: AskAi, tabs: ['Novo chat', 'Pesquisar', 'Templates'] },
  { id: 'dashboard', label: 'Painel de controle', icon: LayoutGrid, desc: 'Leads, pipeline e conversão em tempo real.', view: Dashboard },
  { id: 'conversas', label: 'Conversas', icon: MessageCircle, desc: 'WhatsApp, Instagram, e-mail e SMS em uma caixa só.', view: Conversations, tabs: ['Conversas', 'Ações manuais', 'Trechos', 'Links de acionamento', 'Estatísticas'] },
  { id: 'calendarios', label: 'Calendários', icon: CalendarIcon, desc: 'Agendamento online com confirmação automática.', view: Calendar, tabs: ['Visualização de calendário', 'Lista de compromissos', 'Configurações'] },
  { id: 'contatos', label: 'Contatos', icon: Contact, desc: 'Listas inteligentes, tags e o histórico de cada lead.', view: Contacts, tabs: ['Listas inteligentes', 'Ações em massa', 'Campos personalizados', 'Tarefas', 'Empresas'] },
  { id: 'leads', label: 'Leads', icon: Kanban, desc: 'Pipeline visual. O lead avança de etapa sozinho.', view: Pipeline, tabs: ['Leads', 'Previsão', 'Pipelines', 'Ações em massa'] },
  { id: 'pagamentos', label: 'Pagamentos', icon: Receipt, desc: 'Faturas, assinaturas e links de pagamento.', view: Payments, tabs: ['Faturas e estimativas', 'Pedidos', 'Assinaturas', 'Links de pagamento', 'Produtos', 'Coupons'] },
  { id: 'ai-studio', label: 'AI Studio', icon: Wand2, desc: 'Descreva o site. A IA monta e publica em segundos.', view: AiStudio, gap: true, beta: true, duration: 9500 },
  { id: 'agentes', label: 'Agentes de AI', icon: Bot, desc: 'Agentes de texto e voz atendendo 24 horas.', view: Agents, tabs: ['Agent Studio', 'AI de voz', 'Conversation AI', 'Base de Conhecimento', 'Agent Logs'], tab: 2 },
  { id: 'marketing', label: 'Marketing', icon: Send, desc: 'Posts agendados, e-mails e anúncios em um só lugar.', view: Marketing, tabs: ['Planejador Social', 'E-mails', 'Trechos', 'Links de acionamento', 'Affiliate Manager'] },
  { id: 'automacoes', label: 'Automações', icon: Workflow, desc: 'Cada lead percorre o fluxo sozinho: resposta, qualificação e follow-up.', view: Automations, tabs: ['Fluxos de trabalho', 'Visão geral', 'Campaign'], duration: 10500 },
  { id: 'sites', label: 'Sites', icon: LayoutTemplate, desc: 'Funis, sites, lojas, blogs e formulários.', view: Sites, tabs: ['Funis', 'Sites', 'Lojas', 'Webinars', 'Blogs', 'Formulários', 'Pesquisas'] },
  { id: 'assinaturas', label: 'Assinaturas', icon: Award, desc: 'Área de membros para cursos e comunidades.', view: Memberships, tabs: ['Portal do cliente', 'Cursos', 'Comunidades', 'Certificado'], tab: 1 },
  { id: 'midia', label: 'Mídia Drive', icon: ImageIcon, desc: 'Todos os vídeos e imagens da operação.', view: Media },
  { id: 'reputacao', label: 'Reputação', icon: Star, desc: 'Peça e responda avaliações no automático.', view: Reputation, tabs: ['Visão geral', 'Solicitações', 'Avaliações', 'Widgets', 'Listagens'] },
  { id: 'relatorios', label: 'Relatórios', icon: TrendingUp, desc: 'Anúncios, atribuição e ligações em relatórios prontos.', view: Reports, tabs: ['Personalizados', 'Google Ads', 'Anúncios Meta', 'Atribuição', 'Ligações'], tab: 2 }
]

export function CrmDemo() {
  const frameRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const resumeRef = useRef<number | undefined>(undefined)
  const inView = useInView(frameRef, { amount: 0.3 })

  const [scene, setScene] = useState(0)
  const [auto, setAuto] = useState(true)
  const [cursor, setCursor] = useState({ x: 560, y: 400 })
  const [clicks, setClicks] = useState(0)

  // modo vídeo: o cursor vai até o próximo item do menu, "clica" e a cena troca
  useEffect(() => {
    if (!auto || !inView) return
    const frame = frameRef.current
    const next = (scene + 1) % scenes.length
    const duration = scenes[scene].duration ?? DURATION
    const rest = setTimeout(() => {
      if (frame) setCursor({ x: frame.clientWidth * 0.64, y: frame.clientHeight * 0.6 })
    }, 1300)
    const aim = setTimeout(() => {
      const el = itemRefs.current[next]
      if (!el || !frame) return
      const a = el.getBoundingClientRect()
      const b = frame.getBoundingClientRect()
      setCursor({ x: a.left - b.left + a.width * 0.6, y: a.top - b.top + a.height * 0.6 })
    }, duration - 1000)
    const go = setTimeout(() => {
      setClicks((c) => c + 1)
      setScene(next)
    }, duration)
    return () => {
      clearTimeout(rest)
      clearTimeout(aim)
      clearTimeout(go)
    }
  }, [scene, auto, inView])

  // no celular o menu vira uma faixa horizontal: mantém o item ativo visível
  useEffect(() => {
    const tabs = tabsRef.current
    const el = itemRefs.current[scene]
    if (!tabs || !el || tabs.scrollWidth <= tabs.clientWidth) return
    tabs.scrollTo({ left: el.offsetLeft - tabs.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' })
  }, [scene])

  useEffect(() => () => window.clearTimeout(resumeRef.current), [])

  const hold = () => {
    setAuto(false)
    window.clearTimeout(resumeRef.current)
    resumeRef.current = window.setTimeout(() => setAuto(true), RESUME_AFTER)
  }

  const select = (i: number) => {
    setScene(i)
    hold()
  }

  const current = scenes[scene]
  const View = current.view

  return (
    <div className="glow-behind">
      <div ref={frameRef} className="crm">
        <div className="crm__bar">
          <span className="crm__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="crm__url">app.suaagencia.com.br/{current.id}</span>
          <span className="crm__live hidden sm:inline-flex">
            <span className="dot-ping" /> {auto ? 'Demo ao vivo' : 'Você no controle'}
          </span>
        </div>

        <div className="crm__app">
          <aside className="crm__side">
            <div className="hidden md:block px-3 pt-3 pb-2">
              <div className="flex items-center gap-2 rounded-[8px] border border-line-strong bg-surface-2 px-2.5 py-1.5">
                <span className="flex-none w-6 h-6 rounded-full bg-[#101828] text-white flex items-center justify-center font-bold text-[0.5rem]">SA</span>
                <div className="min-w-0">
                  <p className="text-[0.68rem] font-semibold leading-tight truncate">Sua Agência</p>
                  <p className="text-[0.56rem] text-dim uppercase truncate">São Paulo, SP</p>
                </div>
              </div>
            </div>
            <div ref={tabsRef} className="relative flex md:flex-col gap-0.5 p-2 md:px-2 md:py-1 overflow-x-auto md:overflow-y-auto no-scrollbar md:flex-1 md:min-h-0">
              {scenes.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  onClick={() => select(i)}
                  aria-pressed={scene === i}
                  className={`crm__item ${scene === i ? 'crm__item--on' : ''} ${s.gap ? 'md:mt-2.5' : ''}`}
                >
                  {scene === i && <motion.i layoutId="crm-ativo" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <s.icon className="w-[15px] h-[15px] flex-none" />
                  {s.label}
                  {s.beta && <span className="crm__beta hidden md:inline">Beta</span>}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1 min-w-0 min-h-0 flex flex-col">
            <div className="flex-none flex items-center gap-4 md:gap-5 px-3 md:px-4 h-11 bg-surface border-b border-line">
              <p className="flex-none text-sm text-muted">{current.label}</p>
              <div className="flex-1 min-w-0 flex items-center gap-4 overflow-hidden">
                {current.tabs?.map((t, i) => (
                  <span key={t} className={`crm__tab ${i === (current.tab ?? 0) ? 'crm__tab--on' : ''}`}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex-none hidden lg:flex items-center gap-1.5">
                <span className="crm-btn !bg-[#6172f3] !py-1">Call Center</span>
                <span className="crm__ico bg-[#17b26a]">
                  <Phone className="w-3 h-3" />
                </span>
                <span className="crm__ico bg-[#2e90fa]">
                  <Megaphone className="w-3 h-3" />
                </span>
                <span className="crm__ico bg-[#f79009]">
                  <Bell className="w-3 h-3" />
                </span>
                <span className="crm__ico bg-[#155eef]">
                  <HelpCircle className="w-3 h-3" />
                </span>
              </div>
            </div>

            <div className="relative flex-1 min-h-0 overflow-hidden p-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  className="h-full"
                  initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                  transition={{ duration: 0.3, ease }}
                >
                  <HoldContext.Provider value={hold}>
                    <View />
                  </HoldContext.Provider>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="crm__caption">
          {auto && inView && <i key={scene} className="crm__progress" style={{ animationDuration: `${current.duration ?? DURATION}ms` }} />}
          <span className="tag flex-none">
            {String(scene + 1).padStart(2, '0')} / {scenes.length}
          </span>
          <p className="min-w-0 text-xs md:text-sm truncate">
            <strong className="font-semibold">{current.label}.</strong> <span className="text-muted font-light">{current.desc}</span>
          </p>
        </div>

        <motion.div
          className="crm__cursor hidden md:block"
          aria-hidden="true"
          initial={false}
          animate={{ x: cursor.x, y: cursor.y, opacity: auto ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 110, damping: 20 }}
        >
          <motion.span key={clicks} initial={{ scale: 0.2, opacity: 0.9 }} animate={{ scale: 2.2, opacity: 0 }} transition={{ duration: 0.6 }} />
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
            <path d="M2 2l15 8.5-6.6 1.6L7.2 19 2 2z" fill="#101828" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
