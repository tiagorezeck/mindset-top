/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Brain, Sparkles, RefreshCw, MessageSquare, 
  ChevronRight, ChevronLeft, CheckCircle2, AlertTriangle, Lightbulb, 
  BookOpen, Send, X, ArrowRight, ShieldCheck, Users, Target, Zap, 
  Compass, Sun, Moon
} from 'lucide-react';
import { INTEGRATED_QUESTIONS } from './data/questionnaires';
import { calculateAssessmentResults, AssessmentResult, DimensionScore, CANONICAL_10_DIMENSIONS } from './utils/scoring';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('comet_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [view, setView] = useState<'landing' | 'assessment' | 'report'>('landing');
  const [userName, setUserName] = useState('Dra. Ana Carolina Souza');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // AI Coach state
  const [isCoachOpen, setIsCoachOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'model'; text: string }>>([
    { role: 'model', text: 'Olá! Sou o seu Coach de IA do COMET. Analisei seus resultados nas 10 dimensões do diagnóstico e o dossiê de liderança. Como posso apoiar o seu plano de desenvolvimento ou a orientação da sua equipe hoje?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isCoachLoading, setIsCoachLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('comet_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  const handleStartAssessment = () => {
    setView('assessment');
    setCurrentQuestionIndex(0);
  };

  const handleSelectAnswer = (questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < INTEGRATED_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const calculated = calculateAssessmentResults(answers);
      setResult(calculated);
      setView('report');
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleQuickDemoFill = (preset: 'high' | 'mixed') => {
    if (preset === 'mixed') {
      // Exact 10 dimensions matching screenshot
      const mixedDimensions: DimensionScore[] = [
        { dimensionKey: 'crenca_pessoal', dimensionName: 'Crença na Capacidade Pessoal', shortName: 'Crença Pessoal', average: 3.00, percentage: 50, questionCount: 4 },
        { dimensionKey: 'resposta_fracasso', dimensionName: 'Resposta ao Fracasso', shortName: 'Fracasso', average: 4.50, percentage: 88, questionCount: 4 },
        { dimensionKey: 'resposta_desafios', dimensionName: 'Resposta aos Desafios', shortName: 'Desafios', average: 4.50, percentage: 88, questionCount: 4 },
        { dimensionKey: 'atitude_esforco', dimensionName: 'Atitude em Relação ao Esforço', shortName: 'Esforço', average: 4.50, percentage: 88, questionCount: 4 },
        { dimensionKey: 'abertura_feedback', dimensionName: 'Abertura a Feedback e Críticas', shortName: 'Feedback', average: 4.50, percentage: 88, questionCount: 4 },
        { dimensionKey: 'sucesso_colegas', dimensionName: 'Reação ao Sucesso de Colegas', shortName: 'Sucesso Colegas', average: 4.50, percentage: 88, questionCount: 4 },
        { dimensionKey: 'abertura_mudanca', dimensionName: 'Abertura à Mudança e Inovação', shortName: 'Mudança', average: 4.50, percentage: 88, questionCount: 4 },
        { dimensionKey: 'potencial_alunos', dimensionName: 'Visão sobre o Potencial das Pessoas', shortName: 'Potencial Pessoas', average: 4.50, percentage: 88, questionCount: 4 },
        { dimensionKey: 'adocao_ferramentas', dimensionName: 'Adoção de Novas Ferramentas', shortName: 'Ferramentas', average: 4.50, percentage: 88, questionCount: 4 },
        { dimensionKey: 'aprendizado_continuo', dimensionName: 'Busca por Aprendizado Contínuo', shortName: 'Aprendizado', average: 4.50, percentage: 88, questionCount: 4 },
      ];

      const baseCalc = calculateAssessmentResults({});
      setResult({
        ...baseCalc,
        overallAverage: 4.35,
        growthIndex: 84,
        plantStage: 5,
        classification: 'Mindset de Crescimento Altamente Consistente',
        classificationSubtitle: 'Você consistentemente enxerga suas capacidades como maleáveis e em expansão. Desafios, falhas e feedbacks são absorvidos como degraus para o aprendizado, e não como ameaças.',
        dimensions: mixedDimensions,
        strongestDimension: mixedDimensions[1], // Resposta ao Fracasso
        developmentArea: mixedDimensions[0], // Crença na Capacidade Pessoal
      });
    } else {
      // High growth mindset across all 10
      const highDimensions: DimensionScore[] = [
        { dimensionKey: 'crenca_pessoal', dimensionName: 'Crença na Capacidade Pessoal', shortName: 'Crença Pessoal', average: 4.80, percentage: 95, questionCount: 4 },
        { dimensionKey: 'resposta_fracasso', dimensionName: 'Resposta ao Fracasso', shortName: 'Fracasso', average: 4.90, percentage: 98, questionCount: 4 },
        { dimensionKey: 'resposta_desafios', dimensionName: 'Resposta aos Desafios', shortName: 'Desafios', average: 4.70, percentage: 92, questionCount: 4 },
        { dimensionKey: 'atitude_esforco', dimensionName: 'Atitude em Relação ao Esforço', shortName: 'Esforço', average: 4.85, percentage: 96, questionCount: 4 },
        { dimensionKey: 'abertura_feedback', dimensionName: 'Abertura a Feedback e Críticas', shortName: 'Feedback', average: 4.60, percentage: 90, questionCount: 4 },
        { dimensionKey: 'sucesso_colegas', dimensionName: 'Reação ao Sucesso de Colegas', shortName: 'Sucesso Colegas', average: 4.75, percentage: 94, questionCount: 4 },
        { dimensionKey: 'abertura_mudanca', dimensionName: 'Abertura à Mudança e Inovação', shortName: 'Mudança', average: 4.80, percentage: 95, questionCount: 4 },
        { dimensionKey: 'potencial_alunos', dimensionName: 'Visão sobre o Potencial das Pessoas', shortName: 'Potencial Pessoas', average: 4.90, percentage: 98, questionCount: 4 },
        { dimensionKey: 'adocao_ferramentas', dimensionName: 'Adoção de Novas Ferramentas', shortName: 'Ferramentas', average: 4.70, percentage: 92, questionCount: 4 },
        { dimensionKey: 'aprendizado_continuo', dimensionName: 'Busca por Aprendizado Contínuo', shortName: 'Aprendizado', average: 4.95, percentage: 99, questionCount: 4 },
      ];

      const baseCalc = calculateAssessmentResults({});
      setResult({
        ...baseCalc,
        overallAverage: 4.78,
        growthIndex: 95,
        plantStage: 5,
        classification: 'Growth Mindset Muito Forte (Excepcional)',
        classificationSubtitle: 'Liderança inspiradora com mentalidade de crescimento extraordinária. Alta capacidade de desbloquear potenciais e navegar por cenários de incerteza extrema.',
        dimensions: highDimensions,
        strongestDimension: highDimensions[9],
        developmentArea: highDimensions[4],
      });
    }

    setView('report');
    try {
      confetti({ particleCount: 90, spread: 70 });
    } catch (e) {}
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isCoachLoading) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setIsCoachLoading(true);

    try {
      const history = chatMessages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await fetch('/api/gemini/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          scores: result ? {
            overallAverage: result.overallAverage,
            classification: result.classification,
            dimensions: result.dimensions,
            strongestDimension: result.strongestDimension.dimensionName,
            developmentArea: result.developmentArea.dimensionName,
          } : {},
          history
        })
      });

      const data = await res.json();
      setChatMessages((prev) => [...prev, { role: 'model', text: data.reply || 'Entendido. Vamos continuar evoluindo!' }]);
    } catch (err) {
      setChatMessages((prev) => [...prev, { role: 'model', text: 'Desculpe, ocorreu um erro de conexão com o Coach. Tente novamente em instantes.' }]);
    } finally {
      setIsCoachLoading(false);
    }
  };

  // SVG Radar Decagonal (10 Eixos Matemáticos) adaptativo para modo claro e escuro
  const renderRadarChart = (dimensions: DimensionScore[]) => {
    const width = 380;
    const height = 340;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = 110;
    const total = 10; // Exactly 10 Vertices (Decagon)

    const orderedDims = CANONICAL_10_DIMENSIONS.map((c) => {
      const found = dimensions.find((d) => d.dimensionKey === c.key);
      return found || {
        dimensionKey: c.key,
        dimensionName: c.name,
        shortName: c.shortName,
        average: 4.0,
        percentage: 75,
        questionCount: 4,
      };
    });

    // Calculate score points on the decagon
    const scorePoints = orderedDims.map((dim, i) => {
      const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
      const ratio = Math.max(0.2, dim.average / 5);
      const r = maxRadius * ratio;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      return { x, y, dim };
    });

    const polygonPointsString = scorePoints.map((p) => `${p.x},${p.y}`).join(' ');

    return (
      <div className="flex flex-col items-center justify-center w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[380px] h-auto overflow-visible">
          {/* Concentric decagons for levels 1, 2, 3, 4, 5 */}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, idx) => {
            const levelPoints = Array.from({ length: total }).map((_, i) => {
              const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
              const r = maxRadius * level;
              const x = centerX + r * Math.cos(angle);
              const y = centerY + r * Math.sin(angle);
              return `${x},${y}`;
            }).join(' ');

            return (
              <polygon
                key={idx}
                points={levelPoints}
                fill="none"
                stroke={isDark ? "#173e2d" : "#e2e8f0"}
                strokeWidth={isDark ? "1" : "1.2"}
                opacity={isDark ? 0.8 : 1}
              />
            );
          })}

          {/* 10 Radial Axis Lines */}
          {Array.from({ length: total }).map((_, i) => {
            const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
            const x = centerX + maxRadius * Math.cos(angle);
            const y = centerY + maxRadius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke={isDark ? "#173e2d" : "#cbd5e1"}
                strokeWidth="1"
                opacity={isDark ? 0.9 : 0.8}
              />
            );
          })}

          {/* User Score Filled Polygon */}
          <polygon
            points={polygonPointsString}
            fill={isDark ? "rgba(16, 185, 129, 0.22)" : "rgba(16, 185, 129, 0.18)"}
            stroke={isDark ? "#10b981" : "#059669"}
            strokeWidth="2.4"
          />

          {/* Vertex Dots */}
          {scorePoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4"
              fill={isDark ? "#34d399" : "#059669"}
              stroke={isDark ? "#091712" : "#ffffff"}
              strokeWidth="1.5"
            />
          ))}

          {/* 10 Dimension Labels with Scores */}
          {orderedDims.map((dim, i) => {
            const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
            const labelDistance = maxRadius + 20;
            const x = centerX + labelDistance * Math.cos(angle);
            const y = centerY + labelDistance * Math.sin(angle);

            let textAnchor: 'start' | 'middle' | 'end' = 'middle';
            if (Math.cos(angle) > 0.25) textAnchor = 'start';
            else if (Math.cos(angle) < -0.25) textAnchor = 'end';

            let baseline: 'hanging' | 'middle' | 'auto' = 'middle';
            if (Math.sin(angle) > 0.45) baseline = 'hanging';
            else if (Math.sin(angle) < -0.45) baseline = 'auto';

            return (
              <text
                key={i}
                x={x}
                y={y}
                fill={isDark ? "#86efac" : "#065f46"}
                fontSize="10.5"
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontWeight="600"
                textAnchor={textAnchor}
                dominantBaseline={baseline}
                className="opacity-95"
              >
                {dim.shortName} ({dim.average.toFixed(1)})
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className={`min-h-full transition-colors duration-200 flex flex-col ${
      isDark 
        ? 'bg-[#091712] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200' 
        : 'bg-[#f8faf9] text-slate-800 selection:bg-emerald-500/20 selection:text-emerald-800'
    }`}>
      {/* Top Bar Contract (Strict 3 zones) */}
      <header className={`flex items-center justify-between gap-6 lg:gap-8 px-6 lg:px-12 py-4 border-b sticky top-0 z-40 backdrop-blur-md transition-colors ${
        isDark 
          ? 'border-emerald-950/60 bg-[#0d221a]/85' 
          : 'border-slate-200/90 bg-white/90 shadow-xs'
      }`}>
        {/* Zone 1: Brand & Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className={`text-xl font-bold tracking-tight whitespace-nowrap shrink-0 font-serif-title ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            COMET <span className={`font-sans text-xs uppercase tracking-widest px-2 py-0.5 rounded border ml-1.5 ${
              isDark 
                ? 'text-emerald-400 bg-emerald-950/80 border-emerald-800/40' 
                : 'text-emerald-800 bg-emerald-50 border-emerald-200'
            }`}>
              10 Dimensões
            </span>
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className={`hidden md:flex items-center gap-6 text-sm font-medium ${
          isDark ? 'text-emerald-200/80' : 'text-slate-600'
        }`}>
          <button 
            onClick={() => setView('landing')} 
            className={`transition-colors whitespace-nowrap shrink-0 ${isDark ? 'hover:text-white' : 'hover:text-emerald-800 font-semibold'}`}
          >
            Início
          </button>
          <button 
            onClick={() => { if (result) setView('report'); else handleStartAssessment(); }} 
            className={`transition-colors whitespace-nowrap shrink-0 ${isDark ? 'hover:text-white' : 'hover:text-emerald-800 font-semibold'}`}
          >
            Relatório Completo
          </button>
          <span className={`font-mono text-xs px-2.5 py-1 rounded-full border ${
            isDark 
              ? 'text-emerald-400 border-emerald-900 bg-emerald-950/40' 
              : 'text-emerald-800 border-emerald-200 bg-emerald-50/70'
          }`}>
            40 Itens Canônicos
          </span>
        </nav>

        {/* Zone 3: Actions (Theme Toggle, Reset, Coach) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
            title={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
              isDark
                ? 'bg-[#112c22] border-emerald-800/50 text-amber-300 hover:bg-[#16382b]'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline text-amber-200">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-emerald-700" />
                <span className="hidden sm:inline text-slate-700">Escuro</span>
              </>
            )}
          </button>

          {view !== 'landing' && (
            <button 
              onClick={() => setView('landing')} 
              className={`px-3 py-2 text-xs font-semibold border rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                isDark 
                  ? 'text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border-emerald-800/50' 
                  : 'text-slate-700 bg-white hover:bg-slate-50 border-slate-300 shadow-xs'
              }`}
            >
              Reiniciar
            </button>
          )}

          {result && (
            <button 
              onClick={() => setIsCoachOpen(true)} 
              className={`px-4 py-2 text-xs font-bold rounded-xl shadow-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isDark 
                  ? 'text-slate-950 bg-emerald-400 hover:bg-emerald-300' 
                  : 'text-white bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Coach IA
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {view === 'landing' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 max-w-6xl mx-auto w-full text-center">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium mb-6 ${
              isDark 
                ? 'bg-emerald-950/80 border-emerald-800/50 text-emerald-300' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-xs'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              Sistema Integral de Avaliação — 10 Dimensões Canônicas & 40 Questões Mistas
            </div>

            <h1 className={`text-4xl lg:text-6xl font-bold tracking-tight mb-6 font-serif-title max-w-4xl leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Avaliação de Mindset COMET: O Raio-X Definitivo do Desenvolvimento
            </h1>

            <p className={`text-lg max-w-2xl mb-10 leading-relaxed font-sans ${
              isDark ? 'text-emerald-100/70' : 'text-slate-600'
            }`}>
              O COMET avalia com profundidade científica <strong className={isDark ? 'text-emerald-400' : 'text-emerald-700'}>todas as 10 dimensões originais</strong> através de radar decagonal, diagnóstico executivo, dossiê para liderança e trilha prática de autoconhecimento.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
              <button 
                onClick={handleStartAssessment}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-base"
              >
                <span>Iniciar Avaliação Completa (40 Questões)</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleQuickDemoFill('mixed')} 
                  className={`px-4 py-3 border text-xs font-semibold rounded-xl transition-colors ${
                    isDark 
                      ? 'bg-[#112c22] hover:bg-[#16382b] border-emerald-800/40 text-emerald-200' 
                      : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-xs'
                  }`}
                >
                  ⚡ Demo: 10 Dimensões (Imagem Original)
                </button>
                <button 
                  onClick={() => handleQuickDemoFill('high')} 
                  className={`px-4 py-3 border text-xs font-semibold rounded-xl transition-colors ${
                    isDark 
                      ? 'bg-[#112c22] hover:bg-[#16382b] border-emerald-800/40 text-emerald-200' 
                      : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-xs'
                  }`}
                >
                  ⚡ Demo: Growth Mindset Excepcional
                </button>
              </div>
            </div>

            {/* 4 Reference Repositories Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <div className={`p-6 rounded-2xl border shadow-sm ${
                isDark ? 'bg-[#0d221a]/60 border-emerald-900/60' : 'bg-white border-slate-200'
              }`}>
                <div className="text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-2">REPOSITÓRIO 01</div>
                <h3 className={`font-bold text-base mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Veri Husaeni Mindset</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-emerald-100/60' : 'text-slate-600'}`}>Formato misto (Likert + Escolha Forçada) e metáfora visual de crescimento pessoal por estágios.</p>
              </div>

              <div className={`p-6 rounded-2xl border shadow-sm ${
                isDark ? 'bg-[#0d221a]/60 border-emerald-900/60' : 'bg-white border-slate-200'
              }`}>
                <div className="text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-2">REPOSITÓRIO 02</div>
                <h3 className={`font-bold text-base mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Emad Hanna Assessment</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-emerald-100/60' : 'text-slate-600'}`}>Avaliação multidimensional de desenvolvimento profissional e mapeamento de competências organizacionais.</p>
              </div>

              <div className={`p-6 rounded-2xl border shadow-sm ${
                isDark ? 'bg-[#0d221a]/60 border-emerald-900/60' : 'bg-white border-slate-200'
              }`}>
                <div className="text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-2">REPOSITÓRIO 03</div>
                <h3 className={`font-bold text-base mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Ashwanth Naroju Growth</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-emerald-100/60' : 'text-slate-600'}`}>Cálculo de índice percentual de crescimento (0–100%), planos de ação e perguntas reflexivas.</p>
              </div>

              <div className={`p-6 rounded-2xl border shadow-sm ${
                isDark ? 'bg-[#0d221a]/60 border-emerald-900/60' : 'bg-white border-slate-200'
              }`}>
                <div className="text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-2">REPOSITÓRIO 04</div>
                <h3 className={`font-bold text-base mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Tiago Rezeck Mindset Fraco</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-emerald-100/60' : 'text-slate-600'}`}>Categorias de mentalidade mista sob pressão e reestruturação de pensamentos automáticos.</p>
              </div>
            </div>
          </div>
        )}

        {view === 'assessment' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-3xl mx-auto w-full">
            {/* Progress Header */}
            <div className="w-full flex items-center justify-between mb-4">
              <span className={`text-xs font-mono uppercase tracking-wider font-bold ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}>
                Questão {currentQuestionIndex + 1} de {INTEGRATED_QUESTIONS.length}
              </span>
              <span className={`text-xs font-mono ${isDark ? 'text-emerald-100/60' : 'text-slate-500'}`}>
                {Math.round(((currentQuestionIndex + 1) / INTEGRATED_QUESTIONS.length) * 100)}% Concluído
              </span>
            </div>

            <div className={`w-full h-1.5 rounded-full mb-8 overflow-hidden ${isDark ? 'bg-emerald-950' : 'bg-slate-200'}`}>
              <div 
                className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / INTEGRATED_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            {(() => {
              const q = INTEGRATED_QUESTIONS[currentQuestionIndex];
              const selectedScore = answers[q.id];

              return (
                <div className={`w-full border rounded-2xl p-8 shadow-xl mb-8 transition-colors ${
                  isDark 
                    ? 'bg-[#0d221a] border-emerald-900/80' 
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full border text-xs font-medium ${
                      isDark 
                        ? 'bg-emerald-950 border-emerald-800/40 text-emerald-300' 
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}>
                      Dimensão: {q.dimension}
                    </span>
                    <span className={`text-[11px] font-mono uppercase ${isDark ? 'text-emerald-100/50' : 'text-slate-400'}`}>
                      Fonte: Ref. {q.source} {q.type === 'forced_choice' ? '(Escolha Forçada)' : '(Likert)'}
                    </span>
                  </div>

                  <h2 className={`text-xl lg:text-2xl font-bold mb-8 leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {q.text}
                  </h2>

                  <div className="space-y-3">
                    {q.options.map((opt, idx) => {
                      const isSelected = selectedScore === opt.growthScore;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectAnswer(q.id, opt.growthScore)}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                            isSelected 
                              ? isDark
                                ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-md shadow-emerald-950'
                                : 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-semibold shadow-xs'
                              : isDark
                                ? 'bg-[#122e23]/60 border-emerald-900/50 text-slate-300 hover:border-emerald-700 hover:bg-[#16382b]'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50/50 hover:border-emerald-300'
                          }`}
                        >
                          <span className="text-sm font-medium pr-4">{opt.label}</span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected 
                              ? isDark
                                ? 'border-emerald-400 bg-emerald-400 text-slate-950' 
                                : 'border-emerald-600 bg-emerald-600 text-white'
                              : isDark ? 'border-emerald-700' : 'border-slate-300'
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Navigation Buttons */}
            <div className="w-full flex items-center justify-between">
              <button 
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-3 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-all ${
                  currentQuestionIndex === 0 
                    ? 'opacity-40 cursor-not-allowed border-transparent text-slate-400' 
                    : isDark
                      ? 'border-emerald-800/50 bg-[#0d221a] text-emerald-200 hover:bg-emerald-900/40'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 shadow-xs'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>

              <button 
                onClick={handleNext}
                disabled={answers[INTEGRATED_QUESTIONS[currentQuestionIndex].id] === undefined}
                className={`px-8 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                  answers[INTEGRATED_QUESTIONS[currentQuestionIndex].id] === undefined
                    ? isDark
                      ? 'opacity-50 cursor-not-allowed bg-emerald-900/40 text-emerald-400/50 border border-emerald-800/20'
                      : 'opacity-50 cursor-not-allowed bg-slate-200 text-slate-400 border border-slate-300'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                }`}
              >
                <span>{currentQuestionIndex === INTEGRATED_QUESTIONS.length - 1 ? 'Finalizar Avaliação (40q)' : 'Próxima'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {view === 'report' && result && (
          <div className="flex-1 flex flex-col px-6 lg:px-16 py-12 max-w-7xl mx-auto w-full space-y-10">
            
            {/* Top Container with 3 Cards & Description matching screenshot Captura_de_tela_2026-10-29_180326_a8f24b59.png */}
            <div className={`w-full border rounded-3xl p-8 lg:p-10 shadow-xl relative overflow-hidden transition-colors ${
              isDark 
                ? 'bg-[#0d221a] border-emerald-900/80' 
                : 'bg-white border-slate-200'
            }`}>
              {/* 3 Metric Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Card 1: Média Geral */}
                <div className={`p-6 rounded-2xl border flex flex-col justify-center items-center text-center transition-colors ${
                  isDark ? 'bg-[#091712] border-emerald-900/60' : 'bg-emerald-50/60 border-emerald-100 shadow-xs'
                }`}>
                  <div className={`text-[11px] font-mono font-bold uppercase tracking-wider mb-2 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-800'
                  }`}>
                    MÉDIA GERAL DE GROWTH MINDSET
                  </div>
                  <div className={`text-3xl lg:text-4xl font-extrabold font-mono tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {result.overallAverage.toFixed(2)} <span className={`text-lg font-normal ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>/ 5.00</span>
                  </div>
                  <div className={`text-xs font-semibold mt-2 ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                    {result.classification}
                  </div>
                </div>

                {/* Card 2: Índice de Crescimento */}
                <div className={`p-6 rounded-2xl border flex flex-col justify-center items-center text-center transition-colors ${
                  isDark ? 'bg-[#091712] border-emerald-900/60' : 'bg-emerald-50/60 border-emerald-100 shadow-xs'
                }`}>
                  <div className={`text-[11px] font-mono font-bold uppercase tracking-wider mb-2 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-800'
                  }`}>
                    ÍNDICE DE CRESCIMENTO
                  </div>
                  <div className={`text-3xl lg:text-4xl font-extrabold font-mono tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {result.growthIndex}%
                  </div>
                  <div className={`text-xs mt-2 ${isDark ? 'text-emerald-300' : 'text-slate-600'}`}>
                    Escala de Totalmente Fixo a Maleável
                  </div>
                </div>

                {/* Card 3: Estágio da Planta */}
                <div className={`p-6 rounded-2xl border flex flex-col justify-center items-center text-center transition-colors ${
                  isDark ? 'bg-[#091712] border-emerald-900/60' : 'bg-emerald-50/60 border-emerald-100 shadow-xs'
                }`}>
                  <div className={`text-[11px] font-mono font-bold uppercase tracking-wider mb-2 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-800'
                  }`}>
                    ESTÁGIO DA PLANTA
                  </div>
                  <div className={`text-3xl lg:text-4xl font-extrabold font-mono tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Estágio {result.plantStage} / 5
                  </div>
                  <div className={`text-xs mt-2 ${isDark ? 'text-emerald-300' : 'text-slate-600'}`}>
                    Metáfora de Crescimento Pessoal
                  </div>
                </div>
              </div>

              {/* Explanatory subtitle text */}
              <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-emerald-100/80' : 'text-slate-600'}`}>
                Este relatório analisa suas respostas através de <strong className={isDark ? 'text-white' : 'text-slate-900'}>10 dimensões fundamentais</strong> avaliadas em 40 questões integrais. Use estes insights para aprimorar sua liderança, resiliência e abertura a novas estratégias.
              </p>
            </div>

            {/* Radar Decagonal (10 Eixos) & 10 Aspect Breakdown Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Radar Decagonal Column */}
              <div className={`lg:col-span-5 border rounded-3xl p-8 shadow-xl flex flex-col justify-between transition-colors ${
                isDark ? 'bg-[#0d221a] border-emerald-900/80' : 'bg-white border-slate-200'
              }`}>
                <div className="w-full flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    isDark ? 'text-emerald-400' : 'text-emerald-800'
                  }`}>
                    SEU PERFIL (10 DIMENSÕES)
                  </span>
                  <span className={`text-xs font-mono ${isDark ? 'text-emerald-100/50' : 'text-slate-400'}`}>
                    Escala 1 a 5 · Decágono
                  </span>
                </div>
                <div className="py-2 flex-1 flex items-center justify-center">
                  {renderRadarChart(result.dimensions)}
                </div>
              </div>

              {/* Detailed Breakdown by 10 Aspects */}
              <div className={`lg:col-span-7 border rounded-3xl p-8 shadow-xl flex flex-col justify-between transition-colors ${
                isDark ? 'bg-[#0d221a] border-emerald-900/80' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-2xl font-bold font-serif-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Detalhamento por Aspectos Analisados
                  </h3>
                  <span className={`text-xs font-mono font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    10 Dimensões Canônicas
                  </span>
                </div>

                <div className="space-y-3.5 flex-1 max-h-[380px] overflow-y-auto pr-2">
                  {result.dimensions.map((dim) => (
                    <div key={dim.dimensionKey} className="space-y-1">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{dim.dimensionName}</span>
                        <span className={`font-mono font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                          {dim.average.toFixed(2)} / 5.00
                        </span>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden p-0.5 border ${
                        isDark ? 'bg-[#091712] border-emerald-900/50' : 'bg-slate-100 border-slate-200'
                      }`}>
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${(dim.average / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strengths and Areas of Attention Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pontos Fortes Identificados */}
              <div className={`border rounded-3xl p-8 shadow-xl transition-colors ${
                isDark ? 'bg-[#0d221a] border-emerald-900/80' : 'bg-white border-slate-200'
              }`}>
                <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  <CheckCircle2 className="w-4 h-4" />
                  SEU PONTO MAIS FORTE: {result.strongestDimension.dimensionName.toUpperCase()}
                </div>
                <p className={`text-xs mb-4 leading-relaxed font-mono ${isDark ? 'text-emerald-200/80' : 'text-slate-500'}`}>
                  Pontuação: {result.strongestDimension.average.toFixed(2)} / 5.00 ({result.strongestDimension.percentage}%)
                </p>
                <ul className={`space-y-3 text-sm ${isDark ? 'text-emerald-100/90' : 'text-slate-700'}`}>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Alta resiliência diante de obstáculos e reveses.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Visão do esforço contínuo como caminho para a maestria.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Inspiração genuína com o sucesso e conquistas alheias.</span>
                  </li>
                </ul>
              </div>

              {/* Áreas de Atenção */}
              <div className={`border rounded-3xl p-8 shadow-xl transition-colors ${
                isDark ? 'bg-[#0d221a] border-emerald-900/80' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  OPORTUNIDADE DE DESENVOLVIMENTO: {result.developmentArea.dimensionName.toUpperCase()}
                </div>
                <p className={`text-xs mb-4 leading-relaxed font-mono ${isDark ? 'text-amber-200/80' : 'text-slate-500'}`}>
                  Pontuação: {result.developmentArea.average.toFixed(2)} / 5.00 ({result.developmentArea.percentage}%)
                </p>
                <ul className={`space-y-3 text-sm ${isDark ? 'text-emerald-100/90' : 'text-slate-700'}`}>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>Manter a consistência do mindset em momentos de estresse extremo.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>Evitar autojulgamento severo ao receber críticas inesperadas.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* MÓDULO: GUIA DE ORIENTAÇÃO PARA LIDERANÇA & GESTÃO */}
            <div className={`w-full border rounded-3xl p-8 lg:p-10 shadow-xl relative transition-colors ${
              isDark ? 'bg-[#0d221a] border-emerald-800/80' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <h3 className={`text-2xl font-bold font-serif-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Guia de Orientação para Liderança & Gestão
                </h3>
              </div>
              <p className={`text-xs md:text-sm mb-8 max-w-3xl ${isDark ? 'text-emerald-200/70' : 'text-slate-600'}`}>
                Diretrizes customizadas baseadas na neurociência e no diagnóstico de Mindset para gestores, diretores e mentores deste profissional.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className={`p-6 rounded-2xl border ${
                  isDark ? 'bg-[#091712] border-emerald-900/60' : 'bg-slate-50/80 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-2 uppercase">
                    <Compass className="w-4 h-4" />
                    Como Funciona no Dia a Dia
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-emerald-100/90' : 'text-slate-700'}`}>
                    {result.leaderGuide.dailyOperation}
                  </p>
                </div>

                <div className={`p-6 rounded-2xl border ${
                  isDark ? 'bg-[#091712] border-emerald-900/60' : 'bg-slate-50/80 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-2 uppercase">
                    <Zap className="w-4 h-4" />
                    Como Motivar e Engajar
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-emerald-100/90' : 'text-slate-700'}`}>
                    {result.leaderGuide.motivationStrategy}
                  </p>
                </div>

                <div className={`p-6 rounded-2xl border ${
                  isDark ? 'bg-[#091712] border-emerald-900/60' : 'bg-slate-50/80 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-2 uppercase">
                    <Target className="w-4 h-4" />
                    Aproveitamento Máximo dos Pontos Fortes
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-emerald-100/90' : 'text-slate-700'}`}>
                    {result.leaderGuide.leverageStrengths}
                  </p>
                </div>

                <div className={`p-6 rounded-2xl border ${
                  isDark ? 'bg-[#091712] border-emerald-900/60' : 'bg-slate-50/80 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold mb-2 uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    Como Treinar e Desenvolver os Pontos Fracos
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-emerald-100/90' : 'text-slate-700'}`}>
                    {result.leaderGuide.trainWeaknesses}
                  </p>
                </div>
              </div>

              <div className={`p-4 rounded-xl border text-xs flex items-center gap-3 ${
                isDark 
                  ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span><strong>Dica de Ouro de Segurança Psicológica:</strong> {result.leaderGuide.psychologicalSafetyTip}</span>
              </div>
            </div>

            {/* MÓDULO: TRILHA DE AUTOCONHECIMENTO & PDI */}
            <div className={`w-full border rounded-3xl p-8 lg:p-10 shadow-xl transition-colors ${
              isDark ? 'bg-[#0d221a] border-emerald-800/80' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <h3 className={`text-2xl font-bold font-serif-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Trilha de Autoconhecimento & PDI Prático
                </h3>
              </div>

              {/* Gatilhos da Mentalidade Fixa */}
              <div className="mb-8">
                <div className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  1. Mapeamento de Gatilhos da Mentalidade Fixa (Triggers)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.selfKnowledge.fixedMindsetTriggers.map((trig, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border flex items-start gap-3 ${
                      isDark ? 'bg-[#091712] border-emerald-900/50' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-2" />
                      <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-emerald-100/80' : 'text-slate-700'}`}>{trig}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matriz de Reenquadramento Cognitivo (Reframing) */}
              <div className="mb-8">
                <div className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  2. Matriz de Reenquadramento Mental (Pensamento Limitante → Reframe de Crescimento)
                </div>
                <div className="space-y-3">
                  {result.selfKnowledge.cognitiveReframing.map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                      isDark ? 'bg-[#091712] border-emerald-900/50' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className={`text-xs sm:text-sm flex-1 line-through decoration-rose-500/80 ${
                        isDark ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {item.limitingThought}
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 hidden md:block shrink-0" />
                      <div className={`text-xs sm:text-sm font-semibold flex-1 ${
                        isDark ? 'text-emerald-300' : 'text-emerald-800'
                      }`}>
                        {item.growthReframe}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Micro-hábitos Semanais de Neuroplasticidade */}
              <div>
                <div className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  3. Micro-hábitos Semanais de Neuroplasticidade
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.selfKnowledge.weeklyMicroHabits.map((hab, idx) => (
                    <div key={idx} className={`p-5 rounded-2xl border flex flex-col justify-between ${
                      isDark ? 'bg-[#091712] border-emerald-900/50' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{hab.habit}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            isDark 
                              ? 'text-emerald-400 bg-emerald-950 border-emerald-800' 
                              : 'text-emerald-800 bg-emerald-100/70 border-emerald-200 font-bold'
                          }`}>
                            {hab.timeInvestment}
                          </span>
                        </div>
                        <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-emerald-100/70' : 'text-slate-600'}`}>{hab.rationale}</p>
                      </div>
                      <div className={`text-[11px] font-mono ${isDark ? 'text-emerald-400/80' : 'text-emerald-700 font-semibold'}`}>
                        Hábito {idx + 1} de 3
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Plan & Reflection Question */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Plano de Ação Recomendado */}
              <div className={`border rounded-3xl p-8 shadow-xl flex flex-col justify-between transition-colors ${
                isDark ? 'bg-[#0d221a] border-emerald-900/80' : 'bg-white border-slate-200'
              }`}>
                <div>
                  <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-6 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-700'
                  }`}>
                    <Lightbulb className="w-4 h-4" />
                    PLANO DE AÇÃO RECOMENDADO
                  </div>
                  <div className="space-y-4">
                    {result.actionPlan.map((action, idx) => (
                      <div key={idx} className={`flex items-start gap-4 p-4 rounded-2xl border ${
                        isDark ? 'bg-[#091712] border-emerald-900/50' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className={`w-6 h-6 rounded-full border font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                          isDark 
                            ? 'bg-emerald-950 border-emerald-800 text-emerald-300' 
                            : 'bg-emerald-100 border-emerald-300 text-emerald-800'
                        }`}>
                          {idx + 1}
                        </div>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-emerald-100/90' : 'text-slate-700'}`}>{action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`mt-8 pt-6 border-t ${isDark ? 'border-emerald-900/60' : 'border-slate-200'}`}>
                  <button 
                    onClick={() => setIsCoachOpen(true)}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Conversar com Coach de IA sobre o Plano
                  </button>
                </div>
              </div>

              {/* Pergunta para Reflexão Pessoal */}
              <div className={`border rounded-3xl p-8 shadow-xl flex flex-col justify-between transition-colors ${
                isDark ? 'bg-[#0d221a] border-emerald-900/80' : 'bg-white border-slate-200'
              }`}>
                <div>
                  <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-6 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-700'
                  }`}>
                    <BookOpen className="w-4 h-4" />
                    PERGUNTA PARA REFLEXÃO PESSOAL
                  </div>
                  <blockquote className={`text-lg lg:text-xl font-serif-title italic mb-6 leading-relaxed p-6 rounded-2xl border ${
                    isDark 
                      ? 'text-emerald-200/95 bg-[#091712] border-emerald-900/50' 
                      : 'text-slate-800 bg-emerald-50/60 border-emerald-200/80'
                  }`}>
                    {result.reflectionQuestion}
                  </blockquote>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-emerald-100/60' : 'text-slate-500'}`}>
                    Nota reflexiva: Cada pontuação reflete como você processa os desafios naquele aspecto específico através das 40 questões nas 10 dimensões. O desenvolvimento pessoal é uma jornada contínua.
                  </p>
                </div>

                <div className={`mt-8 pt-6 border-t ${isDark ? 'border-emerald-900/60' : 'border-slate-200'}`}>
                  <button 
                    onClick={() => { setAnswers({}); setView('assessment'); setCurrentQuestionIndex(0); }}
                    className={`w-full py-4 border font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 ${
                      isDark 
                        ? 'bg-[#112c22] hover:bg-[#16382b] border-emerald-800/40 text-emerald-200' 
                        : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-xs'
                    }`}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refazer Teste Completo (40 Questões)
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>

      {/* AI Coach Drawer / Modal */}
      {isCoachOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end">
          <div className={`w-full max-w-lg h-full flex flex-col shadow-2xl transition-colors ${
            isDark 
              ? 'bg-[#0d221a] border-l border-emerald-900' 
              : 'bg-white border-l border-slate-200'
          }`}>
            {/* Header */}
            <div className={`p-6 border-b flex items-center justify-between ${
              isDark ? 'bg-[#091712] border-emerald-900/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>COMET AI Coach</h3>
                  <p className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-700 font-medium'}`}>Especialista em Mindset, Liderança e Neuroplasticidade</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCoachOpen(false)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  isDark 
                    ? 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white font-medium rounded-br-none shadow-xs' 
                      : isDark
                        ? 'bg-[#122e23] border border-emerald-900/60 text-emerald-100 rounded-bl-none shadow-md'
                        : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isCoachLoading && (
                <div className="flex justify-start">
                  <div className={`p-4 rounded-2xl text-xs animate-pulse ${
                    isDark 
                      ? 'bg-[#122e23] border border-emerald-900/60 text-emerald-400' 
                      : 'bg-slate-100 border border-slate-200 text-emerald-700'
                  }`}>
                    Coach está analisando seus resultados e formulando orientações...
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className={`p-4 border-t flex items-center gap-2 ${
              isDark ? 'bg-[#091712] border-emerald-900/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Pergunte ao seu coach sobre liderança ou desenvolvimento..."
                className={`flex-1 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${
                  isDark 
                    ? 'bg-[#0d221a] border border-emerald-800/50 text-white placeholder-emerald-400/40 focus:border-emerald-400' 
                    : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 shadow-xs'
                }`}
              />
              <button 
                type="submit"
                disabled={isCoachLoading || !chatInput.trim()}
                className="p-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl transition-colors shadow-md"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`py-6 border-t text-center text-xs transition-colors ${
        isDark 
          ? 'bg-[#091712] border-emerald-950/60 text-emerald-100/40' 
          : 'bg-slate-100 border-slate-200 text-slate-500'
      }`}>
        COMET — Sistema Integrado de Avaliação de Mindset (40 Questões · 10 Dimensões Canônicas).
      </footer>
    </div>
  );
}
