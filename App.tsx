import React, { useState, useEffect } from 'react';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring
} from 'motion/react';
import {
  CheckCircle2,
  X,
  Cpu,
  Layers,
  Zap,
  Video,
  Users,
  MessageCircle,
  TrendingUp,
  ChevronDown,
  AlertTriangle,
  Gift,
  ExternalLink,
  XCircle,
  Laptop,
  Box,
  Brain,
  Target,
  Rocket,
  Wand2,
  FileCode2,
  PhoneCall,
  Smartphone,
  Timer,
  Mail,
  ShieldCheck,
  Youtube,
  Instagram,
  Plus
} from 'lucide-react';
import { Button } from './components/Button';
import { CrmDemo } from './components/CrmDemo';
import { Reveal } from './components/Reveal';
import { Rings } from './components/Rings';
import { Beams } from './fx/Beams';
import { BlurText } from './fx/BlurText';
import { ScrollProgress } from './fx/ScrollProgress';
import { SpotlightCard } from './fx/SpotlightCard';

const ease = [0.2, 0.7, 0.2, 1] as const;

const GHL_LOGO = 'https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/6653bac54215bc47d820199b.jpeg';

// Link de afiliado do GHL: destino de todos os botões de cadastro.
const SIGNUP_URL = 'https://gohighlevel.com/high-ticket-clube-offer-br?fp_ref=high-ticket-clube54&fp_sid=homehtc';

type TitlePart = { text: string; hl?: boolean };

const Brand = ({ size = 34 }: { size?: number }) => (
  <div className="flex items-center gap-3">
    <img src="/logo.png" alt="Logo HTC" width={size} height={size} className="logo" style={{ width: size, height: size }} />
    <span className="wordmark hidden sm:block md:hidden lg:block">High Ticket Clube</span>
  </div>
);

const SectionHead = ({ eyebrow, parts, lead, center = false }: { eyebrow: string; parts: TitlePart[]; lead?: string; center?: boolean }) => (
  <div className={`mb-12 md:mb-16 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
    <Reveal>
      <span className="eyebrow">{eyebrow}</span>
    </Reveal>
    <BlurText parts={parts} className="display h2" />
    {lead && (
      <Reveal delay={120}>
        <p className={`lead mt-5 ${center ? 'mx-auto' : ''}`}>{lead}</p>
      </Reveal>
    )}
  </div>
);

const navLinks = [
  { href: '#assets', label: 'Recursos' },
  { href: '#arsenal', label: 'Arsenal' },
  { href: '#crm', label: 'O CRM' },
  { href: '#oferta', label: 'Oferta' },
  { href: '#prova', label: 'Resultados' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__pill">
        <Brand />

        <div className="hidden md:flex items-center" onMouseLeave={() => setHovered(null)}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav__link" onMouseEnter={() => setHovered(link.href)}>
              {hovered === link.href && (
                <motion.i layoutId="nav-destaque" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              {link.label}
            </a>
          ))}
        </div>

        <Button href={SIGNUP_URL} className="flex-none">Começar Grátis</Button>
      </div>
    </nav>
  );
};

const Hero = ({ onOpenGHLModal }: { onOpenGHLModal: () => void }) => {
  const mx = useMotionValue(720);
  const my = useMotionValue(260);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${sx}px ${sy}px, rgba(248,195,19,0.16), transparent 65%)`;

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center text-center pt-32 pb-28 md:pb-32" onMouseMove={onMove}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="dot-grid hero-grid" />
        <Beams />
        <Rings className="left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 !w-[min(760px,130vw)]" />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      </div>

      <div className="wrap relative !max-w-6xl">
        {/* Logos HTC + GHL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease }}
          className="flex flex-col items-center mb-9 md:mb-10"
        >
          <div className="flex items-center gap-6 md:gap-9">
            <img src="/logo.png" alt="Logo HTC" width={112} height={112} className="logo hero-logo" />
            <div className="h-12 w-px bg-line-strong rotate-[20deg]" />
            <img src={GHL_LOGO} alt="Logo GHL" width={112} height={112} className="logo hero-logo" />
          </div>

          <div className="float mt-8 inline-flex items-center gap-3 rounded-full border border-line-strong bg-white/[0.03] px-4 py-2">
            <span className="dot-ping flex-none" />
            <span className="shine-text whitespace-nowrap text-[0.56rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.3em]">
              Parceria Oficial GoHighLevel Brasil
            </span>
          </div>
        </motion.div>

        <BlurText
          as="h1"
          immediate
          delay={0.2}
          className="display hero-title"
          parts={[{ text: 'Não Assine o GoHighLevel Sozinho.' }, { text: 'Você Vai Falhar.', hl: true }]}
        />

        <motion.p
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.75, ease }}
          className="mx-auto mt-8 md:mt-10 max-w-4xl text-base sm:text-lg md:text-2xl font-light leading-relaxed text-muted"
        >
          Comece com{' '}
          <strong className="font-semibold text-white underline decoration-accent decoration-4 underline-offset-4 md:underline-offset-8">30 DIAS GRÁTIS</strong>{' '}
          (Exclusivo HTC) e receba +R$ 12.485 em Snapshots, IA e Mentoria...{' '}
          <strong className="font-semibold italic text-white">Gratuitamente.</strong>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease }}
          className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
        >
          <Button size="lg" href={SIGNUP_URL} className="btn--xl w-full sm:w-auto">
            Garantir 30 dias grátis + bônus
          </Button>
          <Button size="lg" variant="ghost" onClick={onOpenGHLModal} className="btn--xl w-full sm:w-auto">
            Já tenho o GHL
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const CrmSection = () => (
  <section id="crm" className="section">
    <div className="wrap">
      <SectionHead
        center
        eyebrow="O que o CRM faz"
        parts={[{ text: 'Tudo o que o GoHighLevel faz,' }, { text: 'em uma tela só.', hl: true }]}
        lead="Clique nas abas e veja o CRM por dentro. Ou só assista: a demo roda sozinha."
      />
      <Reveal>
        <CrmDemo />
      </Reveal>
    </div>
  </section>
);

const assets = [
  {
    tag: 'Treinamento',
    icon: Laptop,
    title: 'Curso - Trilha de Implementação GHL',
    desc: 'Aprenda passo a passo desde a configuração inicial até a entrega de resultados para clientes. Tudo com foco em agências que querem crescer com um modelo escalável.',
    img: 'https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a66d4b700a2a5f0748590.png',
    alt: 'Laptop mostrando o curso'
  },
  {
    tag: 'Snapshots',
    icon: Box,
    title: 'Templates Prontos (Plug & Play)',
    desc: 'Importe funis, automações e IAs que uso para mim e para meus clientes, assim você economiza semanas de implementação e entrega valor imediato.',
    img: 'https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a64a201e8bbb6e4e38087.png',
    alt: 'Templates e Funis'
  },
  {
    tag: 'Suporte ao vivo',
    icon: Video,
    title: 'Office Hours',
    desc: 'Calls de Seg-Qui para tirar dúvidas. Levante a mão e resolva qualquer bug no seu GHL com suporte especializado em tempo real.',
    img: 'https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/6983c8c113fe2b52a1aad8dc.png',
    alt: 'Office Hours Zoom Call'
  },
  {
    tag: 'Mentoria',
    icon: Brain,
    title: 'Mentoria ao Vivo Semanal',
    desc: 'Toda semana, você participa de chamadas ao vivo comigo e com convidados, faturando +8 dígitos por ano, para tirar dúvidas e receber ajuda.',
    img: 'https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a6e1f1fd82703fd6ea8ee.png',
    alt: 'Mentoria'
  }
];

const AssetBentoGrid = () => (
  <section id="assets" className="section">
    <div className="wrap">
      <SectionHead
        eyebrow="Recursos"
        parts={[{ text: 'Junte-se a 500+ donos de agência' }, { text: 'no High Ticket Clube.', hl: true }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assets.map((item, i) => (
          <Reveal key={item.title} delay={(i % 2) * 100} className="h-full">
            <SpotlightCard className="group h-full p-7 md:p-8 flex flex-col">
              <div className="flex items-center justify-between gap-4 mb-7">
                <span className="tag tag--pill">{item.tag}</span>
                <span className="icon-chip">
                  <item.icon className="w-5 h-5" />
                </span>
              </div>
              <h3 className="h3 mb-3">{item.title}</h3>
              <p className="text-muted text-sm font-light leading-relaxed mb-8">{item.desc}</p>
              <div className="mt-auto overflow-hidden rounded-[14px] border border-line">
                <img
                  src={item.img}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]"
                />
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const TwoStepProcess = () => (
  <section id="passos" className="section">
    <div className="wrap">
      <SectionHead
        eyebrow="Passo a passo"
        parts={[{ text: 'Desbloqueie o Ecossistema HTC' }, { text: 'em 2 Etapas Simples:', hl: true }]}
      />

      <Reveal className="mb-10 md:mb-12">
        <div className="beam-line">
          <i />
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* Passo 1 */}
        <Reveal className="h-full">
          <div className="card group relative h-full p-7 md:p-10 flex flex-col">
            <span className="border-beam" />
            <div className="flex items-center justify-between gap-4 mb-8">
              <span className="tag tag--solid">Passo 01</span>
              <span className="icon-chip">
                <Rocket className="w-5 h-5" />
              </span>
            </div>
            <h3 className="h3 mb-4">Ative Sua Licença Estendida (30 Dias)</h3>
            <p className="text-muted font-light leading-relaxed mb-7">
              Clique no botão abaixo para iniciar seu trial exclusivo de 30 dias (o dobro do padrão).
            </p>
            <div className="notice mb-8">
              <AlertTriangle className="w-5 h-5 flex-none text-accent mt-0.5" />
              <p>
                <strong>Regra do Sistema:</strong> Utilize um e-mail novo (que nunca tenha sido cadastrado no GoHighLevel antes) para garantir o rastreamento da sua afiliação e bônus.
              </p>
            </div>
            <div className="mt-auto">
              <Button size="lg" block href={SIGNUP_URL}>
                Ativar trial 30 dias
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Passo 2 */}
        <Reveal delay={120} className="h-full">
          <div className="card group h-full p-7 md:p-10 flex flex-col">
            <div className="flex items-center justify-between gap-4 mb-8">
              <span className="tag tag--pill">Passo 02</span>
              <span className="icon-chip">
                <Timer className="w-5 h-5" />
              </span>
            </div>
            <h3 className="h3 mb-4">Onboarding Automático Imediato</h3>
            <p className="text-muted font-light leading-relaxed mb-7">
              Nosso sistema detecta sua inscrição em tempo real. Em menos de <strong className="font-semibold text-accent">60 segundos</strong>, você receberá o acesso total.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: MessageCircle, label: 'WhatsApp' },
                { icon: Mail, label: 'E-mail' }
              ].map((channel, i) => (
                <div
                  key={channel.label}
                  className="seq flex flex-col items-center gap-3 rounded-[14px] border border-line-strong bg-surface-2 p-5 text-center"
                  style={{ '--i': i, '--n': 2 } as CSSProperties}
                >
                  <channel.icon className="w-6 h-6" />
                  <span className="text-[0.66rem] font-semibold uppercase tracking-[0.2em]">{channel.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-4 rounded-[14px] border border-line bg-white/[0.02] p-5">
              <ShieldCheck className="w-7 h-7 flex-none text-accent" />
              <div>
                <p className="text-sm font-semibold">Acesso Instantâneo</p>
                <p className="text-xs text-dim">Snapshots, Trilhas e Comunidade liberados.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const arsenal = [
  { title: 'Office Hours', desc: 'Calls de Seg-Qui para tirar dúvidas. Levante a mão e resolva qualquer bug no seu GHL.', icon: Video },
  { title: 'Coaching Calls', desc: '2x ao mês com convidados sobre IA, Vendas e Escala. Aprenda com quem já fatura +8 dígitos.', icon: Users },
  { title: 'Trilhas GHL', desc: 'Do básico ao avançado + FAQ com cortes das aulas respondendo as dúvidas mais frequentes.', icon: Layers },
  { title: 'IA HTC', desc: 'Cursos sobre IA no GHL e n8n + templates de fluxos prontos para você copiar e colar.', icon: Cpu },
  { title: 'Desafio 14 Dias', desc: 'O plano de ação exato para você conquistar seu próximo (ou primeiro) cliente em 2 semanas.', icon: Rocket },
  { title: 'PPL Blueprint', desc: 'Plano para agências Pague Por Lead: ofertas, calls de vendas e entrega completa.', icon: Target },
  { title: 'WhatsApp Elite', desc: 'Conecte-se com mais de 200 donos de empresas que usam GHL diariamente.', icon: MessageCircle },
  { title: 'IA Assistente', desc: 'IA treinada no GHL dentro da comunidade. Pergunte qualquer coisa e tenha a resposta na hora.', icon: Wand2 },
  { title: 'Bônus Snapshots', desc: 'Copie nossa entrega para Clínicas, Imobiliárias, Infoprodutos, PetShops e mais.', icon: FileCode2 }
];

const ArsenalSection = () => (
  <section id="arsenal" className="section">
    <div className="wrap">
      <SectionHead
        eyebrow="Arsenal"
        parts={[{ text: 'O Arsenal' }, { text: 'da Elite', hl: true }]}
        lead="Não é apenas uma ferramenta. É o caminho completo para criar uma agência inabalável."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {arsenal.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 80} className="h-full">
            <SpotlightCard className="group h-full p-7">
              <span className="icon-chip mb-6">
                <item.icon className="w-5 h-5" />
              </span>
              <h4 className="font-display font-extrabold text-lg tracking-tight mb-2">{item.title}</h4>
              <p className="text-muted text-sm font-light leading-relaxed">{item.desc}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const OfferStack = () => (
  <section id="oferta" className="section" style={{ overflowX: 'clip' }}>
    <div className="wrap">
      <div className="text-center mb-14 md:mb-20 relative z-20">
        <Reveal>
          <span className="eyebrow">Oferta</span>
        </Reveal>
        <div>
          <div className="inline-block relative">
            <motion.img
              src="https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/6978f249eb0d1a8301bd4098.png"
              alt="Easter Egg Gabriel Oliveira"
              className="absolute bottom-[82%] -right-4 md:-right-28 w-24 md:w-44 pointer-events-none z-20"
              initial={{ opacity: 0, y: 60, scale: 0.6 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -120px 0px' }}
              transition={{ type: 'spring', stiffness: 170, damping: 18, delay: 0.45 }}
              style={{
                transformOrigin: 'bottom center',
                maskImage: 'linear-gradient(to top, transparent 0%, black 12%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 12%)'
              }}
            />
            <BlurText parts={[{ text: 'A Oferta' }, { text: 'Irresistível.', hl: true }]} className="display h2 md:!text-[4.4rem]" />
          </div>
        </div>
        <Reveal delay={150}>
          <p className="lead mx-auto mt-5">Por que pagar o mesmo valor e receber 100x menos resultado?</p>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch relative z-10">
        <Reveal className="h-full">
          <div className="card relative h-full overflow-hidden p-7 md:p-10 opacity-60">
            <XCircle className="absolute top-6 right-6 w-16 h-16 md:w-20 md:h-20 text-line-strong" aria-hidden="true" />
            <h3 className="tag !text-dim !text-xs mb-10">Assinar Direto no GHL</h3>
            <ul className="space-y-5 md:space-y-6 mb-12">
              {['14 Dias de Teste (Padrão)', 'Ferramenta Vazia', 'Suporte em Inglês', 'Zero Templates ou Snapshots'].map((text) => (
                <li key={text} className="flex items-center gap-3 text-dim line-through text-sm md:text-base">
                  <XCircle className="w-4 h-4 md:w-5 md:h-5 flex-none" /> {text}
                </li>
              ))}
            </ul>
            <div>
              <p className="tag !text-dim mb-1">Preço Oficial GHL</p>
              <p className="display text-3xl md:text-4xl text-dim">$97 a $497/mês</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="h-full">
          <div className="glow-behind h-full">
            <div className="card relative h-full p-7 md:p-10">
              <span className="border-beam" />
              <div className="float absolute -top-4 right-5 md:right-8 z-10">
                <span className="tag tag--solid">O Caminho da Elite</span>
              </div>
              <h3 className="h3 !text-2xl md:!text-3xl mb-10">Parceiro HTC</h3>
              <ul className="space-y-5 md:space-y-6 mb-12">
                {[
                  { text: '30 DIAS DE TESTE', value: 'DOBRO DO TEMPO', muted: true },
                  { text: 'Curso Implementação Turbo', value: 'Grátis' },
                  { text: 'Pack +15 Snapshots', value: 'Grátis' },
                  { text: 'Onboarding & Mentoria', value: 'Inestimável' }
                ].map((item) => (
                  <li key={item.text} className="flex items-center justify-between gap-4 font-semibold text-base md:text-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-accent flex-none" /> {item.text}
                    </div>
                    <span className={`tag text-right ${item.muted ? '!text-dim' : ''}`}>{item.value}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pt-8 border-t border-line">
                <div>
                  <p className="tag !text-dim mb-1">Mesmo Valor do GHL</p>
                  <p className="display text-3xl md:text-4xl">
                    A partir de <span className="hl">$97/mês</span>
                  </p>
                  <p className="text-[0.7rem] text-muted mt-2 font-light">
                    (Planos de $97 a $497, exatamente o mesmo preço que você vai pagar pro GHL...)
                  </p>
                </div>
                <Button size="lg" href={SIGNUP_URL} className="w-full xl:w-auto flex-none">
                  Garantir 30 dias agora
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const questions: { q: string; a: ReactNode; plainA?: string }[] = [
    {
      q: "O que é o GHL?",
      a: "HighLevel é uma ferramenta de marketing digital tudo-em-um. Milhares de agências e gestores de tráfego utilizam o GHL para ajudar proprietários de pequenas empresas a centralizar todas as suas necessidades de marketing em um só lugar. Entre os recursos populares do HighLevel estão mensagens de texto/wpp automatizadas, campanhas de email, construtor de sites, funis de venda completos, pipelines, CRM e muito mais!"
    },
    {
      q: "Posso integrar WhatsApp com GHL?",
      a: "Sim, você pode integrar o WhatsApp com o GHL tanto com ambas as APIs oficiais quanto não oficiais."
    },
    {
      q: "Quais Plataformas o GHL substitui?",
      a: "RDstation, Pipedrive, Calendly, ActiveCampaign, WordPress, Make, ManyChat, Hostinger, Area de Membros para Cursos, etc.."
    },
    {
      q: "Já tenho o GHL, posso acessar a comunidade de vocês?",
      a: (
        <span>
          Se você já tem o GHL, envie uma mensagem para nós pelo WhatsApp no seguinte número:{' '}
          <a href="https://wa.me/5511936239514" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 font-semibold hover:text-white transition-colors">
            wa.me/5511936239514
          </a>
        </span>
      ),
      plainA: "Se você já tem o GHL, envie uma mensagem para nós pelo WhatsApp no seguinte número: wa.me/5511936239514"
    },
    {
      q: "Realmente é tudo de graça?",
      a: "Sim. Como parceiros oficiais da ferramenta, reinvestimos nossa comissão entregando a melhor comunidade e ativos do Brasil sem custo adicional para você."
    },
    {
      q: "Quais Snapshots (modelos de entrega) estão inclusos no High Ticket Clube?",
      a: "Nós entregamos 11 Snapshots completos (esses ficam disponíveis depois que você sai do período de teste!) e validados para você importar e começar a operar imediatamente. Atendemos os principais nichos do mercado para que você ganhe velocidade na entrega: Clínicas, Odontologia, Infoprodutores, Advocacia, Imobiliárias, Petshops, Seguros, Concessionárias, Eventos, Contabilidade e Prestadores de Serviços. Com esses modelos de entrega prontos, você elimina o trabalho braçal e foca no que importa: vender e escalar sua agência."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.plainA ?? item.a
      }
    }))
  };

  return (
    <section id="faq" className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="wrap grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-32">
          <Reveal>
            <span className="eyebrow">FAQ</span>
          </Reveal>
          <BlurText parts={[{ text: 'Perguntas' }, { text: 'Frequentes', hl: true }]} className="display h2" />
        </div>

        <div className="space-y-3">
          {questions.map((item, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={i} delay={Math.min(i, 4) * 70}>
                <div className={`card overflow-hidden transition-colors duration-300 ${open ? '!border-[rgba(248,195,19,0.35)]' : ''}`}>
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="w-full p-6 md:p-7 text-left flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span className="font-semibold text-base md:text-lg tracking-tight">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 flex-none transition-transform duration-500 ${open ? 'rotate-180 text-accent' : 'text-dim'}`} />
                  </button>
                  {/* a resposta fica sempre no HTML (SEO); só a altura anima */}
                  <motion.div
                    initial={false}
                    animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.45, ease }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-6 md:px-7 pb-6 md:pb-7 text-muted font-light leading-relaxed">{item.a}</div>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: typeof Youtube; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-accent transition-colors">
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{label}</span>
  </a>
);

const Footer = () => (
  <footer className="relative border-t border-line bg-raised pt-20 pb-28 md:pb-12">
    <div className="wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-12 md:gap-16 items-start">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <img src="/logo.png" alt="Logo HTC" width={48} height={48} className="logo w-12 h-12" />
          <span className="wordmark !text-[0.8rem]">High Ticket Clube</span>
        </div>
        <p className="lead">
          A maior comunidade de GoHighLevel do Brasil. Não vendemos ferramentas, entregamos liberdade.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <h4 className="tag !text-dim">Gabriel Oliveira</h4>
        <SocialLink href="https://www.youtube.com/@almanaquedegabriel" icon={Youtube} label="YouTube Gabriel" />
        <SocialLink href="https://www.instagram.com/gabrieloliveira.htc/" icon={Instagram} label="@gabrieloliveira.htc" />
      </div>

      <div className="flex flex-col gap-5">
        <h4 className="tag !text-dim">João Alves</h4>
        <SocialLink href="https://www.youtube.com/channel/UCgDiz3CSsxNIu92IYipC8Uw" icon={Youtube} label="YouTube João" />
        <SocialLink href="https://www.instagram.com/joaoalves.ai/" icon={Instagram} label="@joaoalves.ai" />
      </div>
    </div>

    <div className="wrap mt-16 pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center gap-5 text-center md:text-left">
      <div className="text-[0.62rem] text-dim font-semibold uppercase tracking-[0.3em] leading-relaxed">
        © 2026 HIGH TICKET CLUBE. TODOS OS DIREITOS RESERVADOS.
      </div>
      <div className="flex gap-8 text-[0.62rem] text-dim font-semibold uppercase tracking-[0.2em]">
        <a href="#" className="hover:text-accent transition-colors">Termos de Uso</a>
        <a href="#" className="hover:text-accent transition-colors">Privacidade</a>
      </div>
    </div>
  </footer>
);

// Pop-up padrão HTC: fundo desfocado, painel entra em spring com borda e sombra amarelas.
const Modal = ({
  open,
  onClose,
  children,
  className = '',
  z = 'z-[100]',
  bare = false
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  z?: string;
  bare?: boolean;
}) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className={`modal-backdrop ${z}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className={`${bare ? '' : 'modal-panel'} ${className}`}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ModalHeader = ({ icon: Icon, title, subtitle, onClose, closeLabel }: { icon: typeof X; title: string; subtitle: string; onClose: () => void; closeLabel?: string }) => (
  <div className="flex-none p-5 md:p-7 flex justify-between items-start gap-4 border-b border-line">
    <div className="flex items-center gap-4">
      <span className="icon-chip">
        <Icon className="w-5 h-5" />
      </span>
      <div>
        <h3 className="h3 mb-1">{title}</h3>
        <p className="tag !text-dim">{subtitle}</p>
      </div>
    </div>
    <button onClick={onClose} className="modal-close" aria-label="Fechar">
      {closeLabel && <span className="hidden sm:inline text-[0.66rem] font-semibold uppercase tracking-[0.2em]">{closeLabel}</span>}
      <X className="w-5 h-5" />
    </button>
  </div>
);

const GHLAlreadyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Modal open={isOpen} onClose={onClose} z="z-[120]" className="max-w-[600px]">
    <ModalHeader icon={ShieldCheck} title="Já tem o GHL?" subtitle="Escolha como deseja entrar no HTC" onClose={onClose} />

    <div className="p-5 md:p-7 space-y-5 overflow-y-auto">
      {/* Opção 1: Upgrade */}
      <div className="rounded-[18px] border border-line-strong bg-surface p-6 md:p-7 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="tag tag--pill">Opção 01</span>
          <TrendingUp className="w-6 h-6 text-accent" />
        </div>
        <h4 className="h3">Fazer Upgrade de Plano</h4>
        <p className="text-muted text-sm font-light leading-relaxed">
          Se você já tem uma conta, pode fazer o upgrade através do nosso link de afiliado para ganhar acesso imediato à nossa comunidade e bônus.
        </p>
        <a
          href="https://lp.htclube.com/upgrade-htc-page"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary btn--lg btn--block mt-2"
        >
          <span>Fazer upgrade agora</span> <ExternalLink className="w-4 h-4 flex-none" />
        </a>
      </div>

      {/* Opção 2: Anuidade */}
      <div className="rounded-[18px] border border-line-strong bg-surface p-6 md:p-7 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="tag tag--pill">Opção 02</span>
          <Gift className="w-6 h-6 text-accent" />
        </div>
        <h4 className="h3">HTC Anuidade</h4>
        <p className="text-muted text-sm font-light leading-relaxed">
          Prefere não mudar sua afiliação? Você pode pagar pela anuidade e ter acesso a todo o nosso ecossistema, snapshots e mentorias.
        </p>
        <a
          href="https://api.leadconnectorhq.com/widget/bookings/htc-oferta-anual"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost btn--lg btn--block mt-2 !whitespace-normal text-center"
        >
          <span>Agendar Reunião de Demonstração da Comunidade</span> <PhoneCall className="w-4 h-4 flex-none" />
        </a>
      </div>
    </div>
  </Modal>
);

const proofImages = [
  { name: "Frederik Ebener", img: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a7bc3e1783ca81f2e2c7a.png" },
  { name: "Your Fav Agency", img: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a7bc3266d7332f405173e.png" },
  { name: "Lais Araújo", img: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a7bc3e1783cce122e2c79.png" },
  { name: "Cleberson Leite", img: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a7bc3b700a2747e78a692.png" }
];

const proofVideos = [
  { title: "Thiago Mattos", subtitle: "Estratégia HTC", url: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a8036f215dab5e858e0db.mp4" },
  { title: "Ana Carolina", subtitle: "Mercado Imobiliário", url: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/68793614e8df547974938398.mp4" },
  { title: "Pietro", subtitle: "Agência para Clínicas", url: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/687937136ccf56fee2a8f3ee.mp4" },
  { title: "Lucas Alves", subtitle: "Agência para Advocacias", url: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/687937a202da4799be447450.mp4" },
  { title: "Jones Medrado", subtitle: "Resultado Elite", url: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/6879359502da47bdbe447226.mp4" },
  { title: "Luan Alves", subtitle: "Membro HTC", url: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/68792a702035ba567e93b456.mp4" }
];

const SocialProof = ({ onOpenMural, onSelectImage }: { onOpenMural: () => void; onSelectImage: (img: string) => void }) => (
  <section id="prova" className="section overflow-hidden bg-raised border-y border-line">
    <div className="wrap">
      <SectionHead
        eyebrow="Resultados"
        parts={[{ text: 'Quem anda sozinho é presa.' }, { text: 'Quem anda em grupo caça.', hl: true }]}
      />
    </div>

    <Reveal className="mb-16 md:mb-20">
      <div className="marquee">
        <div className="marquee__track">
          {[...proofImages, ...proofImages, ...proofImages].map((item, i) => (
            <button
              key={i}
              type="button"
              className="card group w-72 sm:w-80 flex-none p-5 text-left cursor-pointer transition-[border-color,transform] duration-300 hover:-translate-y-1.5 hover:border-[rgba(248,195,19,0.5)]"
              onClick={() => onSelectImage(item.img)}
              aria-hidden={i >= proofImages.length ? true : undefined}
              tabIndex={i >= proofImages.length ? -1 : undefined}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-surface-2 border border-line-strong flex items-center justify-center font-display font-extrabold text-xs uppercase">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold">{item.name}</p>
                  <p className="tag !text-[0.6rem]">Resultado Real</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[14px] border border-line">
                <img
                  src={item.img}
                  alt={`Prova Social ${item.name}`}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-accent text-on-accent px-4 py-2 rounded-full font-semibold text-xs flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Ampliar
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Reveal>

    <div className="wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14 md:mb-16">
        {proofVideos.map((item, i) => (
          <Reveal key={item.url} delay={(i % 3) * 90}>
            <div className="card group overflow-hidden transition-colors duration-300 hover:border-line-strong">
              <div className="w-full aspect-video overflow-hidden bg-black">
                <video
                  src={item.url}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                  controls
                  playsInline
                  preload="metadata"
                ></video>
              </div>
              <div className="p-6">
                <p className="tag mb-1">{item.subtitle}</p>
                <h4 className="font-display font-extrabold text-lg tracking-tight">{item.title}</h4>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="flex justify-center">
        <button type="button" onClick={onOpenMural} className="btn btn--ghost btn--lg w-full md:w-auto group">
          <span className="hidden sm:inline">Veja +50 depoimentos no mural</span>
          <span className="sm:hidden">Ver +50 depoimentos</span>
          <TrendingUp className="w-5 h-5 flex-none text-accent transition-transform duration-300 group-hover:rotate-12" />
        </button>
      </Reveal>
    </div>
  </section>
);

const plugPlay = [
  { icon: Zap, label: 'Automações no GHL' },
  { icon: Cpu, label: 'Inteligência Artificial' },
  { icon: Layers, label: 'Snapshots' },
  { icon: Smartphone, label: 'Comunidade' }
];

const PlugPlay = () => (
  <section id="plugplay" className="section">
    <div className="wrap">
      <SectionHead
        eyebrow="Tecnologia"
        parts={[{ text: 'Máquina' }, { text: 'Plug & Play', hl: true }]}
        lead="A tecnologia por trás do nosso ecossistema."
      />
      <Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {plugPlay.map((item, i) => (
            <div
              key={item.label}
              className="seq card p-6 md:p-8 flex flex-col items-center gap-4 text-center"
              style={{ '--i': i, '--n': plugPlay.length } as CSSProperties}
            >
              <item.icon className="w-7 h-7 md:w-8 md:h-8" />
              <h5 className="font-semibold text-xs md:text-sm">{item.label}</h5>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default function App() {
  const [muralOpen, setMuralOpen] = useState(false);
  const [ghlModalOpen, setGhlModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMuralOpen(false);
      setGhlModalOpen(false);
      setSelectedImage(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "High Ticket Clube",
    "alternateName": "HTC",
    "url": "https://htclube.com/",
    "logo": "https://htclube.com/logo.png",
    "description": "O High Ticket Clube dá acesso gratuito de 30 dias ao GoHighLevel (GHL), com comunidade, suporte e snapshots prontos para agências e donos de negócio de alto ticket.",
    "areaServed": "BR"
  };

  return (
    <MotionConfig reducedMotion="never">
      <div className="relative min-h-screen w-full bg-bg text-white" style={{ overflowX: 'clip' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <ScrollProgress />
        <div className="grain" aria-hidden="true" />

        <Navbar />
        <Hero onOpenGHLModal={() => setGhlModalOpen(true)} />
        <AssetBentoGrid />
        <TwoStepProcess />
        <ArsenalSection />
        <SocialProof onOpenMural={() => setMuralOpen(true)} onSelectImage={setSelectedImage} />
        <CrmSection />
        <OfferStack />
        <PlugPlay />
        <FAQ />
        <Footer />

        {/* Already have GHL Modal */}
        <GHLAlreadyModal isOpen={ghlModalOpen} onClose={() => setGhlModalOpen(false)} />

        {/* Mural Modal */}
        <Modal open={muralOpen} onClose={() => setMuralOpen(false)} className="max-w-7xl h-full">
          <ModalHeader
            icon={MessageCircle}
            title="Mural de Resultados"
            subtitle="O caminho da elite HTC"
            onClose={() => setMuralOpen(false)}
            closeLabel="Fechar"
          />
          <div className="flex-1 bg-black">
            <iframe
              src="https://lp.htclube.com/mural-depoimentos-htc"
              className="w-full h-full border-0"
              title="Mural de Depoimentos"
            ></iframe>
          </div>
        </Modal>

        {/* Image Lightbox Modal */}
        <Modal
          open={selectedImage !== null}
          onClose={() => setSelectedImage(null)}
          z="z-[130]"
          bare
          className="relative max-w-5xl w-full h-full max-h-[90vh] flex items-center justify-center"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="modal-close absolute top-2 right-2 md:-right-14 md:top-0 z-50 !bg-raised"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Comprovante ampliado"
              className="max-w-full max-h-full object-contain rounded-[22px] border border-[rgba(248,195,19,0.28)] shadow-[0_30px_120px_-24px_rgba(248,195,19,0.28)]"
            />
          )}
        </Modal>

        {/* Floating Mobile Sticky CTA */}
        <div className="fixed bottom-5 left-4 right-4 md:hidden z-[45]">
          <Button size="lg" block href={SIGNUP_URL}>
            Garantir 30 dias + bônus
          </Button>
        </div>
      </div>
    </MotionConfig>
  );
}
