import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  X, 
  Cpu, 
  Layers, 
  Zap, 
  Video, 
  Users, 
  Lock,
  MessageCircle,
  TrendingUp,
  MapPin,
  ChevronDown,
  AlertTriangle, 
  Gift,
  MousePointerClick,
  ExternalLink,
  XCircle,
  Star,
  Laptop,
  Box,
  UserCheck,
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
  Plus,
  Clock,
  UserPlus
} from 'lucide-react';

// Declarar AOS para o TypeScript
declare var AOS: any;

const Hero = ({ onOpenForm, onOpenGHLModal }: { onOpenForm: () => void, onOpenGHLModal: () => void }) => (
  <section className="relative pt-32 pb-32 px-6 overflow-hidden min-h-screen flex flex-col justify-center text-center">
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full -z-10 pointer-events-none"></div>

    <div className="max-w-5xl mx-auto relative z-10" data-aos="fade-up">
      
      {/* Logos HTC + GHL - Clean Minimalist Version */}
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center gap-6 md:gap-10 animate-in zoom-in duration-1000">
           {/* Logo HTC - Rounded & Simple Border */}
           <div className="w-20 h-20 md:w-28 md:h-28 bg-slate-900/40 border border-white/10 rounded-[2rem] p-4 flex items-center justify-center shadow-2xl">
              <img 
                src="https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/656fbd6c2c8a6d673ff886d2.png" 
                alt="Logo HTC" 
                className="w-full h-full object-contain rounded-xl"
              />
           </div>

           {/* Elegant Minimalist Divider */}
           <div className="h-12 w-[1px] bg-white/10 rotate-[20deg]"></div>

           {/* Logo GHL - Rounded & Simple Border */}
           <div className="w-20 h-20 md:w-28 md:h-28 bg-slate-900/40 border border-white/10 rounded-[2rem] p-4 flex items-center justify-center shadow-2xl">
              <img 
                src="https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/6653bac54215bc47d820199b.jpeg" 
                alt="Logo GHL" 
                className="w-full h-full object-contain rounded-xl"
              />
           </div>
        </div>

        {/* Official Badge - Minimalist Style */}
        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] animate-float">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          Parceria Oficial GoHighLevel Brasil
        </div>
      </div>
      
      <h1 className="text-4xl sm:text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter mb-8 md:mb-10 text-white">
        Não Assine o GoHighLevel <br className="hidden md:block" />
        Sozinho. <span className="text-red-500 italic drop-shadow-[0_0_15px_rgba(239,68,68,0.4)] block md:inline mt-2 md:mt-0">Você Vai Falhar.</span>
      </h1>
      
      <p className="text-base sm:text-lg md:text-2xl text-slate-400 mb-10 md:mb-14 max-w-4xl mx-auto font-light leading-relaxed px-4 md:px-0">
        Comece com <span className="text-white font-black underline decoration-purple-500 decoration-4 underline-offset-4 md:underline-offset-8">30 DIAS GRÁTIS</span> (Exclusivo HTC) e receba +R$ 12.485 em Snapshots, IA e Mentoria... <span className="text-white font-bold italic">Gratuitamente.</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center relative z-50">
        <button 
          onClick={onOpenForm}
          className="w-full sm:w-auto group relative px-8 md:px-12 py-5 md:py-7 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl font-black text-lg md:text-xl shadow-[0_0_50px_rgba(139,92,246,0.3)] md:hover:scale-105 active:opacity-80 transition-all flex items-center justify-center gap-4 animate-pulse"
        >
          GARANTIR 30 DIAS GRÁTIS + BÔNUS
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 md:group-hover:translate-x-2 transition-transform" />
        </button>

        <button 
          onClick={onOpenGHLModal}
          className="w-full sm:w-auto group px-8 md:px-10 py-5 md:py-7 bg-white/5 border border-white/10 md:hover:bg-white/10 active:bg-white/10 rounded-3xl font-black text-base md:text-lg transition-all flex items-center justify-center gap-3 text-slate-300"
        >
          JÁ TENHO O GHL
        </button>
      </div>
    </div>
  </section>
);

const AssetBentoGrid = () => (
  <section id="assets" className="py-32 px-6 bg-slate-900/20">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16 md:mb-24" data-aos="fade-up">
        <h2 className="text-3xl sm:text-4xl md:text-7xl font-black mb-6 md:mb-8 tracking-tighter leading-tight">
          Junte-se a 200+ donos de agência <br className="hidden md:block" />
          <span className="text-purple-500 italic">no High Ticket Clube.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Treinamento */}
        <div className="bg-[#0f172a] rounded-[2rem] p-8 flex flex-col relative overflow-hidden border border-white/5 shadow-2xl group" data-aos="fade-up">
            <span className="absolute top-6 left-6 bg-purple-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">TREINAMENTO</span>
            <h3 className="text-white text-2xl font-black mt-12 mb-4 flex items-center gap-3 tracking-tight">
                <Laptop className="w-6 h-6 text-purple-400" /> Curso - Trilha de Implementação GHL
            </h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Aprenda passo a passo desde a configuração inicial até a entrega de resultados para clientes. Tudo com foco em agências que querem crescer com um modelo escalável.
            </p>
            <div className="mt-auto group-hover:scale-105 transition-transform duration-700">
                <img src="https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a66d4b700a2a5f0748590.png" alt="Laptop mostrando o curso" className="rounded-2xl w-full object-cover border border-white/5 shadow-xl" />
            </div>
        </div>

        {/* Snapshots */}
        <div className="bg-[#0f172a] rounded-[2rem] p-8 flex flex-col relative overflow-hidden border border-white/5 shadow-2xl group" data-aos="fade-up" data-aos-delay="100">
            <span className="absolute top-6 left-6 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">SNAPSHOTS</span>
            <h3 className="text-white text-2xl font-black mt-12 mb-4 flex items-center gap-3 tracking-tight">
                <Box className="w-6 h-6 text-blue-400" /> Templates Prontos (Plug & Play)
            </h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Importe funis, automações e IAs que uso para mim e para meus clientes, assim você economiza semanas de implementação e entrega valor imediato.
            </p>
            <div className="mt-auto group-hover:scale-105 transition-transform duration-700">
                <img src="https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a64a201e8bbb6e4e38087.png" alt="Templates e Funis" className="rounded-2xl w-full object-cover border border-white/5 shadow-xl" />
            </div>
        </div>

        {/* Office Hours */}
        <div className="bg-[#0f172a] rounded-[2rem] p-8 flex flex-col relative overflow-hidden border border-white/5 shadow-2xl group" data-aos="fade-up">
            <span className="absolute top-6 left-6 bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">SUPORTE AO VIVO</span>
            <h3 className="text-white text-2xl font-black mt-12 mb-4 flex items-center gap-3 tracking-tight">
                <Video className="w-6 h-6 text-indigo-400" /> Office Hours
            </h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Calls de Seg-Qui para tirar dúvidas. Levante a mão e resolva qualquer bug no seu GHL com suporte especializado em tempo real.
            </p>
            <div className="mt-auto group-hover:scale-105 transition-transform duration-700">
                <img src="https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/6983c8c113fe2b52a1aad8dc.png" alt="Office Hours Zoom Call" className="rounded-2xl w-full object-cover border border-white/5 shadow-xl" />
            </div>
        </div>

        {/* Mentoria */}
        <div className="bg-[#0f172a] rounded-[2rem] p-8 flex flex-col relative overflow-hidden border border-white/5 shadow-2xl group" data-aos="fade-up" data-aos-delay="100">
            <span className="absolute top-6 left-6 bg-pink-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">MENTORIA</span>
            <h3 className="text-white text-2xl font-black mt-12 mb-4 flex items-center gap-3 tracking-tight">
                <Brain className="w-6 h-6 text-pink-400" /> Mentoria ao Vivo Semanal
            </h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Toda semana, você participa de chamadas ao vivo comigo e com convidados, faturando +8 dígitos por ano, para tirar dúvidas e receber ajuda.
            </p>
            <div className="mt-auto group-hover:scale-105 transition-transform duration-700">
                <img src="https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a6e1f1fd82703fd6ea8ee.png" alt="Mentoria" className="rounded-2xl w-full object-cover border border-white/5 shadow-xl" />
            </div>
        </div>
      </div>
    </div>
  </section>
);

const TwoStepProcess = ({ onOpenForm }: { onOpenForm: () => void }) => (
  <section id="passos" className="py-32 px-6 relative overflow-x-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
        <h2 className="text-3xl sm:text-4xl md:text-7xl font-black mb-6 md:mb-8 tracking-tighter leading-tight">Desbloqueie o Ecossistema HTC <br className="hidden md:block" /><span className="text-blue-500">em 2 Etapas Simples:</span></h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        {/* Passo 1 */}
        <div className="flex flex-col glass p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 relative group" data-aos="fade-right">
          <div className="absolute -top-4 md:-top-5 left-8 md:left-10 bg-blue-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs tracking-widest shadow-xl">PASSO 01</div>
          <div className="mb-8">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:rotate-6 transition-transform">
              <Rocket className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 tracking-tight">Ative Sua Licença Estendida (30 Dias)</h3>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              Clique no botão abaixo para iniciar seu trial exclusivo de 30 dias (o dobro do padrão).
            </p>
            <div className="bg-red-500/10 border border-red-500/20 p-5 md:p-6 rounded-2xl flex gap-3 md:gap-4 items-start">
              <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-500 flex-none mt-0.5 md:mt-1" />
              <p className="text-xs md:text-sm text-red-200/80 font-medium">
                <strong className="text-red-500">Regra do Sistema:</strong> Utilize um e-mail novo (que nunca tenha sido cadastrado no GoHighLevel antes) para garantir o rastreamento da sua afiliação e bônus.
              </p>
            </div>
          </div>
          <div className="mt-auto relative z-50">
            <button 
              onClick={onOpenForm}
              className="w-full py-5 md:py-6 bg-white text-black font-black rounded-2xl text-base md:text-lg md:hover:scale-[1.02] active:opacity-80 transition-all shadow-2xl flex items-center justify-center gap-3"
            >
              ATIVAR TRIAL 30 DIAS <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Passo 2 */}
        <div className="flex flex-col glass p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 relative group" data-aos="fade-left">
          <div className="absolute -top-4 md:-top-5 left-8 md:left-10 bg-green-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs tracking-widest shadow-xl">PASSO 02</div>
          <div className="mb-8">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-green-600/20 rounded-2xl flex items-center justify-center text-green-400 mb-6 group-hover:-rotate-6 transition-transform">
              <Timer className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 tracking-tight">Onboarding Automático Imediato</h3>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
              Nosso sistema detecta sua inscrição em tempo real. Em menos de <span className="text-white font-bold italic">60 segundos</span>, você receberá o acesso total.
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-2xl flex flex-col items-center text-center">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-green-500 mb-2 md:mb-3" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-300">WhatsApp</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-2xl flex flex-col items-center text-center">
                <Mail className="w-6 h-6 md:w-8 md:h-8 text-blue-500 mb-2 md:mb-3" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-300">E-mail</span>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <div className="p-5 md:p-6 border border-white/5 bg-white/5 rounded-2xl flex items-center gap-4">
              <ShieldCheck className="w-7 h-7 md:w-8 md:h-8 text-green-500 flex-none" />
              <div>
                <p className="text-sm font-bold text-white">Acesso Instantâneo</p>
                <p className="text-xs text-slate-500">Snapshots, Trilhas e Comunidade liberados.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ArsenalSection = () => (
  <section id="arsenal" className="py-32 px-6">
     <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
           <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 tracking-tighter">O Arsenal da Elite</h2>
           <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto font-light px-4 md:px-0">Não é apenas uma ferramenta. É o caminho completo para criar uma agência inabalável.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {[
             { title: "Office Hours", desc: "Calls de Seg-Qui para tirar dúvidas. Levante a mão e resolva qualquer bug no seu GHL.", icon: <Video /> },
             { title: "Coaching Calls", desc: "2x ao mês com convidados sobre IA, Vendas e Escala. Aprenda com quem já fatura +8 dígitos.", icon: <Users /> },
             { title: "Trilhas GHL", desc: "Do básico ao avançado + FAQ com cortes das aulas respondendo as dúvidas mais frequentes.", icon: <Layers /> },
             { title: "IA HTC", desc: "Cursos sobre IA no GHL e n8n + templates de fluxos prontos para você copiar e colar.", icon: <Cpu /> },
             { title: "Desafio 14 Dias", desc: "O plano de ação exato para você conquistar seu próximo (ou primeiro) cliente em 2 semanas.", icon: <Rocket /> },
             { title: "PPL Blueprint", desc: "Plano para agências Pague Por Lead: ofertas, calls de vendas e entrega completa.", icon: <Target /> },
             { title: "WhatsApp Elite", desc: "Conecte-se com mais de 200 donos de empresas que usam GHL diariamente.", icon: <MessageCircle /> },
             { title: "IA Assistente", desc: "IA treinada no GHL dentro da comunidade. Pergunte qualquer coisa e tenha a resposta na hora.", icon: <Wand2 /> },
             { title: "Bônus Snapshots", desc: "Copie nossa entrega para Clínicas, Imobiliárias, Infoprodutos, PetShops e mais.", icon: <FileCode2 /> }
           ].map((item, i) => (
             <div key={i} className="glass p-8 rounded-[2rem] border border-white/5 hover:bg-white/5 transition-all group" data-aos="fade-up" data-aos-delay={i*50}>
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                   {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
                </div>
                <h4 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
     </div>
  </section>
);

const OfferStack = ({ onOpenForm }: { onOpenForm: () => void }) => (
  <section id="oferta" className="py-32 px-6 overflow-x-hidden relative">
    <div className="max-w-6xl mx-auto">
       <div className="text-center mb-16 md:mb-24 relative z-20">
          <div className="inline-block relative">
             <img 
               src="https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/6978f249eb0d1a8301bd4098.png" 
               alt="Easter Egg Gabriel Oliveira"
               className="absolute -top-24 md:-top-48 -right-4 md:-right-24 w-24 md:w-56 pointer-events-none -z-10"
               data-aos="zoom-in-up"
               data-aos-anchor-placement="center-bottom"
               data-aos-delay="600"
               style={{ 
                 transformOrigin: 'bottom center',
                 maskImage: 'linear-gradient(to top, transparent 0%, black 35%)',
                 WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 35%)'
               }}
             />
             <h2 className="text-4xl sm:text-5xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter" data-aos="fade-up">A Oferta Irresistível.</h2>
          </div>
          <p className="text-slate-500 text-lg md:text-xl font-light px-4 md:px-0" data-aos="fade-up" data-aos-delay="200">Por que pagar o mesmo valor e receber 100x menos resultado?</p>
       </div>

       <div className="grid md:grid-cols-2 gap-8 md:gap-10 relative z-10">
          <div className="glass opacity-40 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border border-white/5 relative overflow-hidden" data-aos="fade-right">
             <div className="absolute top-0 right-0 p-6 md:p-10 opacity-10"><XCircle className="w-16 h-16 md:w-24 md:h-24 text-slate-500" /></div>
             <h3 className="text-xl md:text-2xl font-bold mb-8 md:mb-12 text-slate-500 uppercase tracking-widest text-left">Assinar Direto no GHL</h3>
             <ul className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <li className="flex items-center gap-3 md:gap-4 text-slate-600 line-through italic font-medium text-sm md:text-base">
                  <XCircle className="w-4 h-4 md:w-5 md:h-5 flex-none" /> 14 Dias de Teste (Padrão)
                </li>
                <li className="flex items-center gap-3 md:gap-4 text-slate-600 line-through italic font-medium text-sm md:text-base">
                  <XCircle className="w-4 h-4 md:w-5 md:h-5 flex-none" /> Ferramenta Vazia
                </li>
                <li className="flex items-center gap-3 md:gap-4 text-slate-600 line-through italic font-medium text-sm md:text-base">
                  <XCircle className="w-4 h-4 md:w-5 md:h-5 flex-none" /> Suporte em Inglês
                </li>
                <li className="flex items-center gap-3 md:gap-4 text-slate-600 line-through italic font-medium text-sm md:text-base">
                  <XCircle className="w-4 h-4 md:w-5 md:h-5 flex-none" /> Zero Templates ou Snapshots
                </li>
             </ul>
             <div className="text-left">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Preço Oficial GHL</p>
                <p className="text-3xl md:text-4xl font-black text-slate-600">$97 a $497/mês</p>
             </div>
          </div>

          <div className="relative group" data-aos="fade-left">
             <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-[30px] md:blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"></div>
             <div className="relative glass rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border-2 border-purple-500/40 bg-slate-900/40 shadow-2xl">
                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-purple-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs tracking-[0.2em] animate-float shadow-xl uppercase">O Caminho da Elite</div>
                <h3 className="text-2xl md:text-3xl font-black mb-8 md:mb-12 tracking-tight text-left">Parceiro HTC</h3>
                <ul className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                   <li className="flex items-center justify-between text-white font-bold text-base md:text-lg">
                      <div className="flex items-center gap-3 md:gap-4 text-left"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-none" /> 30 DIAS DE TESTE</div>
                      <span className="text-slate-500 text-[10px] md:text-xs font-normal">DOBRO DO TEMPO</span>
                   </li>
                   <li className="flex items-center justify-between text-white font-bold text-base md:text-lg">
                      <div className="flex items-center gap-3 md:gap-4 text-left"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-none" /> Curso Implementação Turbo</div>
                      <span className="text-green-500 text-[10px] md:text-xs font-black uppercase">Grátis</span>
                   </li>
                   <li className="flex items-center justify-between text-white font-bold text-base md:text-lg">
                      <div className="flex items-center gap-3 md:gap-4 text-left"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-none" /> Pack +45 Snapshots</div>
                      <span className="text-green-500 text-[10px] md:text-xs font-black uppercase">Grátis</span>
                   </li>
                   <li className="flex items-center justify-between text-white font-bold text-base md:text-lg">
                      <div className="flex items-center gap-3 md:gap-4 text-left"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-none" /> Onboarding & Mentoria</div>
                      <span className="text-green-500 text-[10px] md:text-xs font-black uppercase">Inestimável</span>
                   </li>
                </ul>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 pt-8 md:pt-10 border-t border-white/10">
                   <div className="text-left w-full md:w-auto">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Mesmo Valor do GHL</p>
                      <p className="text-3xl md:text-5xl font-black text-white">A partir de $97/mês</p>
                      <p className="text-[10px] text-slate-400 mt-2 font-medium italic">(Planos de $97 a $497 — exatamente o mesmo preço que você vai pagar pro GHL...)</p>
                   </div>
                   <button 
                    onClick={onOpenForm}
                    className="w-full md:w-auto px-8 md:px-10 py-5 md:py-6 bg-white text-black font-black rounded-2xl md:rounded-[1.5rem] md:hover:scale-105 active:opacity-80 transition-transform shadow-2xl flex items-center justify-center gap-3 relative z-50"
                   >
                     GARANTIR 30 DIAS AGORA <MousePointerClick className="w-5 h-5" />
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const questions = [
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
          <a href="https://wa.me/5511950650720" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline font-bold hover:text-purple-300 transition-colors">
            wa.me/5511950650720
          </a>
        </span>
      )
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

  return (
    <section className="py-32 px-6 bg-slate-950/30">
       <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-12 md:mb-16 text-center tracking-tighter" data-aos="fade-up">Perguntas Frequentes</h2>
          <div className="space-y-4 md:space-y-5">
             {questions.map((item, i) => (
               <div key={i} className="glass rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/5" data-aos="fade-up" data-aos-delay={i*100}>
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full p-6 md:p-8 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                  >
                    <span className="font-bold text-lg md:text-xl tracking-tight pr-4">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 flex-none transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-purple-500' : 'text-slate-500'}`} />
                  </button>
                  {openIndex === i && (
                    <div className="p-6 md:p-8 pt-0 text-slate-400 text-base md:text-lg leading-relaxed bg-white/5 animate-in slide-in-from-top-4 duration-500">
                       {item.a}
                    </div>
                  )}
               </div>
             ))}
          </div>
       </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-24 px-6 border-t border-white/5 bg-slate-950">
     <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 items-start">
        <div>
           <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-xl flex items-center justify-center font-black italic shadow-2xl shadow-white/10">HTC</div>
              <span className="font-bold text-2xl md:text-3xl tracking-tighter">High Ticket Clube</span>
           </div>
           <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed mb-8">
             A maior comunidade de GoHighLevel do Brasil. Não vendemos ferramentas, entregamos liberdade.
           </p>
        </div>

        <div className="flex flex-col gap-6">
           <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-2">Gabriel Oliveira</h4>
           <div className="flex flex-col gap-4">
              <a href="https://www.youtube.com/@almanaquedegabriel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-red-500 transition-colors group">
                 <Youtube className="w-5 h-5" />
                 <span className="text-sm font-bold">YouTube Gabriel</span>
              </a>
              <a href="https://www.instagram.com/gabrieloliveira.htc/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-pink-500 transition-colors group">
                 <Instagram className="w-5 h-5" />
                 <span className="text-sm font-bold">@gabrieloliveira.htc</span>
              </a>
           </div>
        </div>

        <div className="flex flex-col gap-6">
           <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-2">João Alves</h4>
           <div className="flex flex-col gap-4">
              <a href="https://www.youtube.com/channel/UCgDiz3CSsxNIu92IYipC8Uw" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-red-500 transition-colors group">
                 <Youtube className="w-5 h-5" />
                 <span className="text-sm font-bold">YouTube João</span>
              </a>
              <a href="https://www.instagram.com/joaoalves.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-pink-500 transition-colors group">
                 <Instagram className="w-5 h-5" />
                 <span className="text-sm font-bold">@joaoalves.ai</span>
              </a>
           </div>
        </div>
     </div>
     
     <div className="max-w-7xl mx-auto mt-16 md:mt-20 pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] leading-relaxed">
           © 2026 HIGH TICKET CLUBE. TODOS OS DIREITOS RESERVADOS.
        </div>
        <div className="flex gap-6 md:gap-10 text-[10px] text-slate-700 font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
           <a href="#" className="hover:text-slate-500">Termos de Uso</a>
           <a href="#" className="hover:text-slate-500">Privacidade</a>
        </div>
     </div>
  </footer>
);

const GHLAlreadyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl transition-all duration-500 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[600px] bg-slate-950 rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.2)] flex flex-col scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-10 pb-6 flex justify-between items-start">
           <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="text-purple-400 w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tight mb-1">Já tem o GHL?</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest text-left">Escolha como deseja entrar no HTC</p>
              </div>
           </div>
           <button 
            onClick={onClose}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10"
           >
             <X className="w-6 h-6 text-slate-400" />
           </button>
        </div>
        
        <div className="p-10 pt-4 space-y-6">
           {/* Opção 1: Upgrade */}
           <div className="group relative bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all">
              <div className="flex flex-col gap-4">
                 <div className="flex items-center justify-between">
                    <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest">Opção 01</span>
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                 </div>
                 <h4 className="text-2xl font-black text-left">Fazer Upgrade de Plano</h4>
                 <p className="text-slate-400 text-sm leading-relaxed text-left">
                    Se você já tem uma conta, pode fazer o upgrade através do nosso link de afiliado para ganhar acesso imediato à nossa comunidade e bônus.
                 </p>
                 <a 
                    href="https://app.gohighlevel.com/offers/affiliate-upgrade?fp_ref=high-ticket-clube54" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 w-full py-5 bg-blue-600 text-white font-black rounded-2xl text-center md:hover:scale-[1.02] active:opacity-80 transition-transform flex items-center justify-center gap-3"
                 >
                    FAZER UPGRADE AGORA <ExternalLink className="w-5 h-5" />
                 </a>
              </div>
           </div>

           {/* Opção 2: Anuidade */}
           <div className="group relative bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all">
              <div className="flex flex-col gap-4">
                 <div className="flex items-center justify-between">
                    <span className="px-4 py-1.5 bg-purple-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest">Opção 02</span>
                    <Gift className="w-6 h-6 text-purple-400" />
                 </div>
                 <h4 className="text-2xl font-black text-left">HTC Anuidade</h4>
                 <p className="text-slate-400 text-sm leading-relaxed text-left">
                    Prefere não mudar sua afiliação? Você pode pagar pela anuidade e ter acesso a todo o nosso ecossistema, snapshots e mentorias.
                 </p>
                 <a 
                    href="https://lp.htclube.com/oferta-vitalicia" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 w-full py-5 bg-white text-black font-black rounded-2xl text-center md:hover:scale-[1.02] active:opacity-80 transition-transform flex items-center justify-center gap-3"
                 >
                    Agendar Reunião de Demonstração da Comunidade <PhoneCall className="w-5 h-5" />
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [muralOpen, setMuralOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [ghlModalOpen, setGhlModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out-expo'
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 selection:bg-purple-600 selection:text-white overflow-x-hidden w-full">
      <Hero onOpenForm={() => setFormOpen(true)} onOpenGHLModal={() => setGhlModalOpen(true)} />
      <AssetBentoGrid />
      <TwoStepProcess onOpenForm={() => setFormOpen(true)} />
      <ArsenalSection />
      
      {/* Reusing SocialProof component but passing mural trigger */}
      <div id="prova" className="py-32 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-20 text-center" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black mb-6 md:mb-8 tracking-tighter leading-tight">Quem anda sozinho é presa. <br className="hidden md:block" /><span className="text-purple-500 italic">Quem anda em grupo caça.</span></h2>
        </div>

        <div className="flex gap-6 animate-marquee mb-24 opacity-60 hover:opacity-100 transition-opacity hover:[animation-play-state:paused]">
          {[
            { name: "Frederik Ebener", img: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a7bc3e1783ca81f2e2c7a.png" },
            { name: "Your Fav Agency", img: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a7bc3266d7332f405173e.png" },
            { name: "Theo Cavaliere", img: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a7bc31927c816a4518328.png" },
            { name: "Lais Araújo", img: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a7bc3e1783cce122e2c79.png" },
            { name: "Cleberson Leite", img: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a7bc3b700a2747e78a692.png" }
          ].concat([
            { name: "Frederik Ebener", img: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a7bc3e1783ca81f2e2c7a.png" },
            { name: "Your Fav Agency", img: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a7bc3266d7332f405173e.png" },
            { name: "Theo Cavaliere", img: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a7bc31927c816a4518328.png" },
            { name: "Lais Araújo", img: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a7bc3e1783cce122e2c79.png" },
            { name: "Cleberson Leite", img: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a7bc3b700a2747e78a692.png" }
          ]).map((item, i) => (
            <div 
              key={i} 
              className="w-80 flex-none glass p-5 rounded-[2rem] border border-white/5 cursor-pointer group hover:border-purple-500/50 transition-all hover:-translate-y-2"
              onClick={() => setSelectedImage(item.img)}
            >
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-black text-[10px] uppercase">{item.name.charAt(0)}</div>
                 <div>
                    <p className="text-xs font-bold text-white">{item.name}</p>
                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Resultado Real</p>
                 </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-white/5 shadow-lg">
                <img src={item.img} alt={`Prova Social ${item.name}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-purple-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="bg-white text-black px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xl">
                    <Plus className="w-4 h-4" /> Ampliar
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Thiago Mattos", subtitle: "Estratégia HTC", url: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/697a8036f215dab5e858e0db.mp4" },
              { title: "Ana Carolina", subtitle: "Mercado Imobiliário", url: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/68793614e8df547974938398.mp4" },
              { title: "Pietro", subtitle: "Agência para Clínicas", url: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/687937136ccf56fee2a8f3ee.mp4" },
              { title: "Lucas Alves", subtitle: "Agência para Advocacias", url: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/687937a202da4799be447450.mp4" },
              { title: "Jones Medrado", subtitle: "Resultado Elite", url: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/6879359502da47bdbe447226.mp4" },
              { title: "Luan Alves", subtitle: "Membro HTC", url: "https://storage.googleapis.com/msgsndr/CNK54gfLcK1jQllAu8Xm/media/68792a702035ba567e93b456.mp4" }
            ].map((item, i) => (
              <div key={i} className="group relative rounded-[2.5rem] overflow-hidden border border-white/10 glass bg-black" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"></div>
                <div className="w-full aspect-video overflow-hidden">
                  <video src={item.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" controls playsInline></video>
                </div>
                <div className="p-8 relative z-20 pointer-events-none">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-1">{item.subtitle}</p>
                  <h4 className="text-xl font-black text-white">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center px-4 md:px-0" data-aos="fade-up">
           <button 
            onClick={() => setMuralOpen(true)}
            className="w-full md:w-auto group relative px-6 md:px-16 py-6 md:py-8 glass border-2 border-white/10 md:hover:border-purple-500/50 active:opacity-80 rounded-3xl md:rounded-[2.5rem] font-black text-base sm:text-lg md:text-xl transition-all flex items-center justify-center gap-3 md:gap-5 shadow-2xl bg-white/5"
           >
             <span className="hidden sm:inline">[ VEJA +50 DEPOIMENTOS NO MURAL ]</span>
             <span className="sm:hidden">VER +50 DEPOIMENTOS</span>
             <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-purple-500 md:group-hover:rotate-12 transition-transform" />
           </button>
        </div>
      </div>

      <OfferStack onOpenForm={() => setFormOpen(true)} />
      
      <section id="plugplay" className="py-32 px-6 bg-slate-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter text-slate-400">Máquina <span className="text-white">Plug & Play</span></h2>
            <p className="text-slate-600 text-base md:text-lg">A tecnologia por trás do nosso ecossistema.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 opacity-60">
             <div className="glass p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center border border-white/5">
                <Zap className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-3 md:mb-4 text-yellow-500" />
                <h5 className="font-bold text-xs md:text-sm">Automações no GHL</h5>
             </div>
             <div className="glass p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center border border-white/5">
                <Cpu className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-3 md:mb-4 text-blue-500" />
                <h5 className="font-bold text-xs md:text-sm">Inteligência Artificial</h5>
             </div>
             <div className="glass p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center border border-white/5">
                <Layers className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-3 md:mb-4 text-purple-500" />
                <h5 className="font-bold text-xs md:text-sm">Snapshots</h5>
             </div>
             <div className="glass p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center border border-white/5">
                <Smartphone className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-3 md:mb-4 text-green-500" />
                <h5 className="font-bold text-xs md:text-sm">Comunidade</h5>
             </div>
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />

      {/* Sign-up Form Modal (Preloaded) */}
      <div 
        className={`fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-[40px] transition-all duration-500 ${formOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setFormOpen(false)}
      >
        <div 
          className={`relative w-full max-w-[550px] bg-slate-950 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_0_150px_rgba(139,92,246,0.15)] flex flex-col transition-all duration-500 ${formOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
          onClick={(e) => e.stopPropagation()}
        >
            <div className="p-8 pb-4 flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
                    <UserPlus className="text-blue-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight leading-none mb-1">Cadastrar Agora</h3>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Inicie sua jornada</p>
                  </div>
               </div>
               <button 
                onClick={() => setFormOpen(false)}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10"
               >
                 <X className="w-5 h-5 text-slate-400" />
               </button>
            </div>
            
            <div className="p-2 h-[520px] w-full">
               <iframe
                  src="https://api.leadconnectorhq.com/widget/form/FOQT85cKvqq0gmdtBlsn"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none', 
                    borderRadius: '3px',
                    pointerEvents: formOpen ? 'auto' : 'none',
                    visibility: formOpen ? 'visible' : 'hidden'
                  }}
                  id="inline-FOQT85cKvqq0gmdtBlsn" 
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Form Cadastro"
                  data-height="462"
                  data-layout-iframe-id="inline-FOQT85cKvqq0gmdtBlsn"
                  data-form-id="FOQT85cKvqq0gmdtBlsn"
                  title="Form Cadastro"
               ></iframe>
            </div>
          </div>
        </div>

      {/* Already have GHL Modal */}
      <GHLAlreadyModal isOpen={ghlModalOpen} onClose={() => setGhlModalOpen(false)} />

      {/* Mural Modal */}
      {muralOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl transition-all duration-500 animate-in fade-in"
          onClick={() => setMuralOpen(false)}
        >
          <div 
            className="relative w-full max-w-7xl h-full max-h-[90vh] bg-slate-950/80 rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/40 backdrop-blur-xl">
               <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center">
                    <MessageCircle className="text-purple-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight leading-none mb-1">Mural de Resultados</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">O caminho da elite HTC</p>
                  </div>
               </div>
               <button 
                onClick={() => setMuralOpen(false)}
                className="group p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 flex items-center gap-3"
               >
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fechar</span>
                 <X className="w-6 h-6" />
               </button>
            </div>
            <div className="flex-1 bg-black">
               <iframe 
                src="https://lp.htclube.com/mural-depoimentos-htc" 
                className="w-full h-full border-0"
                title="Mural de Depoimentos"
               ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl transition-all duration-500 animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full max-h-[90vh] flex items-center justify-center flex-col" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 md:-right-16 md:top-0 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10 text-white z-50"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="Comprovante ampliado" 
              className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_100px_rgba(139,92,246,0.15)] border border-white/10 scale-up"
            />
          </div>
        </div>
      )}

      {/* Floating Mobile Sticky CTA */}
      <div className="fixed bottom-8 left-4 right-4 md:hidden z-[99]">
        <button 
          onClick={() => setFormOpen(true)}
          className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[1.5rem] font-black text-base shadow-[0_10px_40px_rgba(139,92,246,0.6)] flex items-center justify-center gap-3 active:opacity-80 transition-transform border border-white/20"
        >
           GARANTIR 30 DIAS + BÔNUS <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
