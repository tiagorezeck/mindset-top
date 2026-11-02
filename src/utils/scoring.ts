/**
 * COMET — Motor de Cálculo e Análise Multidimensional Integral (10 Dimensões)
 * Inclui:
 * 1. Cálculo de 10 Dimensões Canônicas com radar decagonal
 * 2. Dossiê de Orientação para Líderes (como funciona, como motivar, aproveitar forças e treinar fragilidades)
 * 3. Trilha de Autoconhecimento & PDI (gatilhos mentais, reframing e micro-hábitos)
 */

import { INTEGRATED_QUESTIONS } from '../data/questionnaires';

export interface DimensionScore {
  dimensionKey: string;
  dimensionName: string;
  shortName: string;
  average: number; // 1.00 to 5.00
  percentage: number; // 0 to 100%
  questionCount: number;
}

export interface LeaderGuidance {
  dailyOperation: string;
  motivationStrategy: string;
  leverageStrengths: string;
  trainWeaknesses: string;
  psychologicalSafetyTip: string;
}

export interface SelfKnowledgePDI {
  fixedMindsetTriggers: string[];
  cognitiveReframing: Array<{ limitingThought: string; growthReframe: string }>;
  weeklyMicroHabits: Array<{ habit: string; timeInvestment: string; rationale: string }>;
}

export interface AssessmentResult {
  overallAverage: number; // 1.00 to 5.00
  growthIndex: number; // 0 to 100%
  plantStage: number; // 1 to 5
  classification: string;
  classificationSubtitle: string;
  dimensions: DimensionScore[];
  strongestDimension: DimensionScore;
  developmentArea: DimensionScore;
  actionPlan: string[];
  reflectionQuestion: string;
  leaderGuide: LeaderGuidance;
  selfKnowledge: SelfKnowledgePDI;
}

export const CANONICAL_10_DIMENSIONS: Array<{ key: string; name: string; shortName: string }> = [
  { key: 'crenca_pessoal', name: 'Crença na Capacidade Pessoal', shortName: 'Crença Pessoal' },
  { key: 'resposta_fracasso', name: 'Resposta ao Fracasso', shortName: 'Fracasso' },
  { key: 'resposta_desafios', name: 'Resposta aos Desafios', shortName: 'Desafios' },
  { key: 'atitude_esforco', name: 'Atitude em Relação ao Esforço', shortName: 'Esforço' },
  { key: 'abertura_feedback', name: 'Abertura a Feedback e Críticas', shortName: 'Feedback' },
  { key: 'sucesso_colegas', name: 'Reação ao Sucesso de Colegas', shortName: 'Sucesso Colegas' },
  { key: 'abertura_mudanca', name: 'Abertura à Mudança e Inovação', shortName: 'Mudança' },
  { key: 'potencial_alunos', name: 'Visão sobre o Potencial das Pessoas', shortName: 'Potencial Pessoas' },
  { key: 'adocao_ferramentas', name: 'Adoção de Novas Ferramentas', shortName: 'Novas Ferramentas' },
  { key: 'aprendizado_continuo', name: 'Busca por Aprendizado Contínuo', shortName: 'Aprendizado' },
];

export function calculateAssessmentResults(answers: Record<string, number>): AssessmentResult {
  const dimensionMap: Record<string, { totalScore: number; count: number }> = {};
  CANONICAL_10_DIMENSIONS.forEach((dim) => {
    dimensionMap[dim.key] = { totalScore: 0, count: 0 };
  });

  let totalScoreSum = 0;
  let answeredCount = 0;

  INTEGRATED_QUESTIONS.forEach((q) => {
    const score = answers[q.id] !== undefined ? answers[q.id] : 3;
    if (dimensionMap[q.dimensionKey]) {
      dimensionMap[q.dimensionKey].totalScore += score;
      dimensionMap[q.dimensionKey].count += 1;
    } else {
      dimensionMap['crenca_pessoal'].totalScore += score;
      dimensionMap['crenca_pessoal'].count += 1;
    }
    totalScoreSum += score;
    answeredCount += 1;
  });

  const overallAverage = Number((totalScoreSum / answeredCount).toFixed(2));
  const growthIndex = Math.round(((overallAverage - 1) / 4) * 100);
  const plantStage = Math.min(5, Math.max(1, Math.ceil(overallAverage)));

  const dimensions: DimensionScore[] = CANONICAL_10_DIMENSIONS.map((dim) => {
    const d = dimensionMap[dim.key];
    const avg = d.count > 0 ? d.totalScore / d.count : 3.5;
    return {
      dimensionKey: dim.key,
      dimensionName: dim.name,
      shortName: dim.shortName,
      average: Number(avg.toFixed(2)),
      percentage: Math.round(((avg - 1) / 4) * 100),
      questionCount: d.count,
    };
  });

  const sortedByAvg = [...dimensions].sort((a, b) => b.average - a.average);
  const strongestDimension = sortedByAvg[0] || dimensions[0];
  const developmentArea = sortedByAvg[sortedByAvg.length - 1] || dimensions[dimensions.length - 1];

  let classification = 'Mentalidade Mista em Desenvolvimento';
  let classificationSubtitle = 'Você possui traços marcantes de crescimento em várias áreas, mas ainda mantém crenças fixas em momentos de forte pressão ou crítica.';

  if (overallAverage >= 4.3) {
    classification = 'Mindset de Crescimento Altamente Consistente';
    classificationSubtitle = 'Você consistentemente enxerga suas capacidades como maleáveis e em expansão. Desafios, falhas e feedbacks são absorvidos como degraus para o aprendizado, e não como ameaças.';
  } else if (overallAverage >= 3.7) {
    classification = 'Forte Mentalidade de Crescimento';
    classificationSubtitle = 'Demonstra excelente predisposição para encarar desafios como oportunidades, valorizar o esforço contínuo e aprender com o feedback.';
  } else if (overallAverage >= 2.8) {
    classification = 'Mentalidade Mista em Transição';
    classificationSubtitle = 'Equilíbrio entre abertura ao aprendizado em novas áreas e cautela defensiva diante de falhas complexas ou julgamento alheio.';
  } else {
    classification = 'Crenças Fortemente Fixas';
    classificationSubtitle = 'Tendência atual a considerar talentos e capacidades como traços imutáveis. Este é o ponto ideal para iniciar pequenas evoluções conscientes.';
  }

  // Plano de Ação Recomendado
  const actionPlan = [
    `Compartilhe sua jornada: ajude outras pessoas a adotarem o poder do "ainda" mentorando colegas na dimensão de ${strongestDimension.dimensionName}.`,
    `Mantenha um diário de aprendizado focado em ${developmentArea.dimensionName}: registre semanalmente novos erros superados e lições extraídas.`,
    'Pratique a reestruturação cognitiva: transforme automaticamente pensamentos de julgamento ("eu não sei fazer") em perguntas de maestria ("o que preciso aprender para dominar isto?").',
  ];

  const reflectionQuestion = `"Como você pode usar sua mentalidade atual (${classification}) para liderar, inspirar e apoiar equipes em ambientes altamente desafiadores?"`;

  // Guia do Líder (Baseado nas pesquisas de Dweck e liderança neurocompatível)
  const isHighGrowth = overallAverage >= 4.0;
  const isMixed = overallAverage >= 2.8 && overallAverage < 4.0;

  const leaderGuide: LeaderGuidance = {
    dailyOperation: isHighGrowth
      ? 'Opera com alto senso de agência, proatividade e tolerância ao erro. Procura naturalmente soluções não lineares e prefere autonomia para explorar abordagens inovadoras.'
      : isMixed
      ? 'Apresenta boa produtividade em cenários estruturados, mas pode adotar comportamento protetor ou defensivo quando exposto(a) a avaliações surpresa ou metas desproporcionais.'
      : 'Funciona melhor com diretrizes explícitas, validações frequentes e papéis onde o risco de erro público seja minimizado, necessitando de previsibilidade de processos.',
    
    motivationStrategy: isHighGrowth
      ? 'Desafie com problemas complexos sem script prévio. Conceda projetos estratégicos de inovação e valorize a experimentação e as lições do processo, e não apenas números finais.'
      : isMixed
      ? 'Alinhe expectativas definindo "metas de aprendizado" em vez de meras "metas de performance". Elogie especificamente o esforço, as estratégias e o processo de adaptação.'
      : 'Ofereça reforço positivo imediato e construa pequenos passos graduais de sucesso. Evite comparações diretas com outros membros da equipe para desarmar a paralisia.',

    leverageStrengths: `Alavanque a força destacada em "${strongestDimension.dimensionName}". Posicione este profissional como referência técnica ou mentor de pares nesse aspecto, permitindo que ele lidere workshops ou projetos piloto.`,

    trainWeaknesses: `Para desenvolver a área de atenção em "${developmentArea.dimensionName}", crie um ambiente seguro de testes. Realize sessões de feedback com foco puramente formativo (o que ajustar na próxima iteração) antes de avaliações formais de desempenho.`,

    psychologicalSafetyTip: 'Garanta segurança psicológica: celebre publicamente as tentativas ousadas que falharam, demonstrando que o erro é matéria-prima de aprendizado organizacional.',
  };

  // Trilha de Autoconhecimento & PDI
  const selfKnowledge: SelfKnowledgePDI = {
    fixedMindsetTriggers: [
      'Gatilho da Crítica Inesperada: Sensação de que o feedback sobre o trabalho é um veredito sobre sua inteligência pessoal.',
      'Gatilho da Comparação Social: Ver colegas brilhando e acionar internamente um sentimento de inferioridade ou ameaça de status.',
      'Gatilho da Curva Difícil: Defrontar-se com uma nova tecnologia ou tarefa complexa e concluir rapidamente "eu não tenho dom para isso".',
      'Gatilho do Erro em Público: Vontade de esconder falhas ou terceirizar culpas para preservar uma imagem de competência absoluta.',
    ],
    cognitiveReframing: [
      {
        limitingThought: '"Eu não sou bom nisso e nunca vou conseguir."',
        growthReframe: '"Eu ainda não domino essa habilidade, mas com método, repetição e mentoria eu posso progredir."',
      },
      {
        limitingThought: '"Essa crítica do meu líder prova que meu trabalho é ruim."',
        growthReframe: '"Esse feedback me deu um mapa gratuito dos pontos cegos que eu não estava enxergando."',
      },
      {
        limitingThought: '"Se eu tiver que me esforçar demais, é porque me falta talento."',
        growthReframe: '"O esforço intenso é exatamente o processo físico pelo qual o cérebro cria novas conexões sinápticas."',
      },
    ],
    weeklyMicroHabits: [
      {
        habit: 'O Diário do "Ainda"',
        timeInvestment: '5 min nas sextas-feiras',
        rationale: 'Anote 1 coisa que você falhou ou não conseguiu resolver nesta semana e acrescente a palavra "AINDA", listando 1 próximo passo.',
      },
      {
        habit: 'Busca Ativa por 1 Ponto Cego',
        timeInvestment: '10 min a cada 15 dias',
        rationale: 'Peça a um par ou líder: "Qual é 1 ajuste simples que tornaria minha última entrega 10% melhor?". Escute sem justificar.',
      },
      {
        habit: 'Micro-laboratório de Nova Ferramenta',
        timeInvestment: '20 min semanais',
        rationale: 'Abra um software, IA ou método novo e permita-se brincar e errar sem a obrigação de produzir um resultado comercial perfeito.',
      },
    ],
  };

  return {
    overallAverage,
    growthIndex,
    plantStage,
    classification,
    classificationSubtitle,
    dimensions,
    strongestDimension,
    developmentArea,
    actionPlan,
    reflectionQuestion,
    leaderGuide,
    selfKnowledge,
  };
}
