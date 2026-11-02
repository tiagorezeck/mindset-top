/**
 * COMET — Banco de Questões Completo e Rigoroso (40 Questões)
 * Distribuído equilibradamente entre as 10 Dimensões Integrais
 * (4 questões por dimensão combinando Likert e Escolha Forçada)
 */

export interface Question {
  id: string;
  source: 'verihusaeni' | 'emad' | 'ashwanth' | 'tiagorezeck';
  dimension: string;
  dimensionKey: string;
  text: string;
  type: 'likert' | 'forced_choice';
  options: {
    label: string;
    growthScore: number; // 1 to 5 (1 = Fixo, 5 = Crescimento)
  }[];
}

export const INTEGRATED_QUESTIONS: Question[] = [
  // ==========================================
  // DIMENSÃO 1: Crença na Capacidade Pessoal
  // ==========================================
  {
    id: 'q1',
    source: 'verihusaeni',
    dimension: 'Crença na Capacidade Pessoal',
    dimensionKey: 'crenca_pessoal',
    text: 'Sua inteligência e capacidade cognitiva são características inatas que você não tem como mudar significativamente.',
    type: 'likert',
    options: [
      { label: 'Discordo Totalmente (Capacidade 100% expansível)', growthScore: 5 },
      { label: 'Discordo Parcialmente', growthScore: 4 },
      { label: 'Neutro / Indeciso', growthScore: 3 },
      { label: 'Concordo Parcialmente', growthScore: 2 },
      { label: 'Concordo Totalmente (Traço imutável)', growthScore: 1 },
    ],
  },
  {
    id: 'q2',
    source: 'ashwanth',
    dimension: 'Crença na Capacidade Pessoal',
    dimensionKey: 'crenca_pessoal',
    text: 'Você pode aprender técnicas novas, mas seu talento básico sempre permanecerá o mesmo.',
    type: 'likert',
    options: [
      { label: 'Discordo Fortemente', growthScore: 5 },
      { label: 'Discordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Concordo', growthScore: 2 },
      { label: 'Concordo Fortemente', growthScore: 1 },
    ],
  },
  {
    id: 'q3',
    source: 'emad',
    dimension: 'Crença na Capacidade Pessoal',
    dimensionKey: 'crenca_pessoal',
    text: 'Com treino deliberado e foco, qualquer pessoa pode remodelar suas redes neurais e dominar áreas difíceis.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo Parcialmente', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo Parcialmente', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q4',
    source: 'tiagorezeck',
    dimension: 'Crença na Capacidade Pessoal',
    dimensionKey: 'crenca_pessoal',
    text: 'Quando você se depara com um tema no qual nunca foi bom, qual é o seu pensamento automático?',
    type: 'forced_choice',
    options: [
      { label: '"Não domino isto AINDA, mas vou estudar até entender."', growthScore: 5 },
      { label: '"Vai exigir trabalho duro, mas consigo aprender."', growthScore: 4 },
      { label: '"Vou tentar o básico para ver se me adapto."', growthScore: 3 },
      { label: '"Não tenho jeito nem vocação para esta área."', growthScore: 2 },
      { label: '"Melhor nem perder tempo tentando o que não nasci para fazer."', growthScore: 1 },
    ],
  },

  // ==========================================
  // DIMENSÃO 2: Resposta ao Fracasso
  // ==========================================
  {
    id: 'q5',
    source: 'tiagorezeck',
    dimension: 'Resposta ao Fracasso',
    dimensionKey: 'resposta_fracasso',
    text: 'Quando uma entrega ou projeto importante falha sob sua responsabilidade, qual é a sua reação imediata?',
    type: 'forced_choice',
    options: [
      { label: 'Uso a falha como dado diagnóstico e oportunidade imediata de aprendizado.', growthScore: 5 },
      { label: 'Fico chateado(a), mas rapidamente analiso onde errei e recalibro a rota.', growthScore: 4 },
      { label: 'Sinto desânimo e preciso de alguns dias para digerir o resultado.', growthScore: 3 },
      { label: 'Questiono severamente minha competência profissional.', growthScore: 2 },
      { label: 'Tento justificar o erro culpando fatores externos ou me fecho.', growthScore: 1 },
    ],
  },
  {
    id: 'q6',
    source: 'verihusaeni',
    dimension: 'Resposta ao Fracasso',
    dimensionKey: 'resposta_fracasso',
    text: 'Erros e tropeços são evidências claras de que você ultrapassou seu limite de capacidade.',
    type: 'likert',
    options: [
      { label: 'Discordo Totalmente', growthScore: 5 },
      { label: 'Discordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Concordo', growthScore: 2 },
      { label: 'Concordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q7',
    source: 'ashwanth',
    dimension: 'Resposta ao Fracasso',
    dimensionKey: 'resposta_fracasso',
    text: 'Eu vejo o fracasso não como um atestado de identidade, mas sim como um feedback do processo.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q8',
    source: 'emad',
    dimension: 'Resposta ao Fracasso',
    dimensionKey: 'resposta_fracasso',
    text: 'Tenho medo de cometer erros em público porque temo parecer incompetente aos olhos dos outros.',
    type: 'likert',
    options: [
      { label: 'Discordo Totalmente', growthScore: 5 },
      { label: 'Discordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Concordo', growthScore: 2 },
      { label: 'Concordo Totalmente', growthScore: 1 },
    ],
  },

  // ==========================================
  // DIMENSÃO 3: Resposta aos Desafios
  // ==========================================
  {
    id: 'q9',
    source: 'emad',
    dimension: 'Resposta aos Desafios',
    dimensionKey: 'resposta_desafios',
    text: 'Diante de uma tarefa desafiadora de alta incerteza, qual é sua postura predominante?',
    type: 'forced_choice',
    options: [
      { label: 'Sinto excitação com a complexidade e me lanço a testar soluções.', growthScore: 5 },
      { label: 'Aceito o desafio com cautela e busco referências estruturadas.', growthScore: 4 },
      { label: 'Prefiro tarefas nas quais já tenho domínio consolidado.', growthScore: 3 },
      { label: 'Sinto apreensão e tento negociar a simplificação do escopo.', growthScore: 2 },
      { label: 'Evito ao máximo para proteger minha reputação de eficácia.', growthScore: 1 },
    ],
  },
  {
    id: 'q10',
    source: 'ashwanth',
    dimension: 'Resposta aos Desafios',
    dimensionKey: 'resposta_desafios',
    text: 'Desafios difíceis me deixam energizado(a) em vez de intimidado(a).',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q11',
    source: 'verihusaeni',
    dimension: 'Resposta aos Desafios',
    dimensionKey: 'resposta_desafios',
    text: 'É mais inteligente escolher metas fáceis para garantir entregas 100% impecáveis.',
    type: 'likert',
    options: [
      { label: 'Discordo Totalmente', growthScore: 5 },
      { label: 'Discordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Concordo', growthScore: 2 },
      { label: 'Concordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q12',
    source: 'tiagorezeck',
    dimension: 'Resposta aos Desafios',
    dimensionKey: 'resposta_desafios',
    text: 'Gosto de estar na fronteira onde não tenho todas as respostas de antemão.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },

  // ==========================================
  // DIMENSÃO 4: Atitude em Relação ao Esforço
  // ==========================================
  {
    id: 'q13',
    source: 'ashwanth',
    dimension: 'Atitude em Relação ao Esforço',
    dimensionKey: 'atitude_esforco',
    text: 'Se alguém precisa despender esforço hercúleo para executar um trabalho, significa que não tem vocação natural.',
    type: 'likert',
    options: [
      { label: 'Discordo Totalmente (Esforço é o que constrói a maestria)', growthScore: 5 },
      { label: 'Discordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Concordo', growthScore: 2 },
      { label: 'Concordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q14',
    source: 'emad',
    dimension: 'Atitude em Relação ao Esforço',
    dimensionKey: 'atitude_esforco',
    text: 'A prática deliberada e a perseverança superam o talento nato no longo prazo.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q15',
    source: 'verihusaeni',
    dimension: 'Atitude em Relação ao Esforço',
    dimensionKey: 'atitude_esforco',
    text: 'Como você enxerga o suor, a dedicação diária e as horas de esforço contínuo?',
    type: 'forced_choice',
    options: [
      { label: 'Como a única ponte real para a genialidade e autoridade técnica.', growthScore: 5 },
      { label: 'Como um requisito indispensável para quem quer ser excelente.', growthScore: 4 },
      { label: 'Como algo necessário, embora cansativo e desgastante.', growthScore: 3 },
      { label: 'Como um sacrifício que pessoas talentosas conseguem evitar.', growthScore: 2 },
      { label: 'Como sinal de incompetência ou ineficiência pessoal.', growthScore: 1 },
    ],
  },
  {
    id: 'q16',
    source: 'tiagorezeck',
    dimension: 'Atitude em Relação ao Esforço',
    dimensionKey: 'atitude_esforco',
    text: 'Sinto orgulho do processo de dedicação árdua, mesmo quando o resultado demora a aparecer.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },

  // ==========================================
  // DIMENSÃO 5: Abertura a Feedback e Críticas
  // ==========================================
  {
    id: 'q17',
    source: 'tiagorezeck',
    dimension: 'Abertura a Feedback e Críticas',
    dimensionKey: 'abertura_feedback',
    text: 'Ao receber um feedback corretivo duro de uma liderança ou cliente, como você processa a informação?',
    type: 'forced_choice',
    options: [
      { label: 'Separo meu valor pessoal do conteúdo e extraio as ações de melhoria.', growthScore: 5 },
      { label: 'Fico reflexivo(a) e converso para entender os pontos práticos de avanço.', growthScore: 4 },
      { label: 'Fico na defensiva no momento, mas depois de esfriar a cabeça busco ajustar.', growthScore: 3 },
      { label: 'Sinto ressentimento e interpreto como perseguição ou implicância.', growthScore: 2 },
      { label: 'Desqualifico a opinião do avaliador e ignoro as recomendações.', growthScore: 1 },
    ],
  },
  {
    id: 'q18',
    source: 'verihusaeni',
    dimension: 'Abertura a Feedback e Críticas',
    dimensionKey: 'abertura_feedback',
    text: 'Críticas no ambiente de trabalho são quase sempre um ataque à honra ou competência de quem as recebe.',
    type: 'likert',
    options: [
      { label: 'Discordo Totalmente', growthScore: 5 },
      { label: 'Discordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Concordo', growthScore: 2 },
      { label: 'Concordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q19',
    source: 'ashwanth',
    dimension: 'Abertura a Feedback e Críticas',
    dimensionKey: 'abertura_feedback',
    text: 'Procuro ativamente pessoas experientes para apontarem os pontos cegos das minhas entregas.',
    type: 'likert',
    options: [
      { label: 'Sempre procuro', growthScore: 5 },
      { label: 'Frequentemente procuro', growthScore: 4 },
      { label: 'Às vezes', growthScore: 3 },
      { label: 'Raramente', growthScore: 2 },
      { label: 'Nunca procuro críticas', growthScore: 1 },
    ],
  },
  {
    id: 'q20',
    source: 'emad',
    dimension: 'Abertura a Feedback e Críticas',
    dimensionKey: 'abertura_feedback',
    text: 'Valorizo mais o retorno franco e construtivo do que elogios superficiais vazios.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },

  // ==========================================
  // DIMENSÃO 6: Reação ao Sucesso de Colegas
  // ==========================================
  {
    id: 'q21',
    source: 'ashwanth',
    dimension: 'Reação ao Sucesso de Colegas',
    dimensionKey: 'sucesso_colegas',
    text: 'Quando um colega próximo de nível igual é promovido ou ganha grande destaque público, como você se sente internamente?',
    type: 'forced_choice',
    options: [
      { label: 'Sinto genuína alegria e procuro aprender com as estratégias que ele usou.', growthScore: 5 },
      { label: 'Comemoro a vitória dele e me sinto motivado(a) a acelerar meu ritmo.', growthScore: 4 },
      { label: 'Fico neutro(a), mas prefiro me afastar temporariamente da celebração.', growthScore: 3 },
      { label: 'Sinto inveja silenciosa e acho que ele teve sorte ou privilégio.', growthScore: 2 },
      { label: 'Sinto-me ameaçado(a) e desvalorizado(a) na minha própria posição.', growthScore: 1 },
    ],
  },
  {
    id: 'q22',
    source: 'verihusaeni',
    dimension: 'Reação ao Sucesso de Colegas',
    dimensionKey: 'sucesso_colegas',
    text: 'O brilho e o sucesso dos outros ao meu redor diminuem o valor das minhas realizações.',
    type: 'likert',
    options: [
      { label: 'Discordo Totalmente', growthScore: 5 },
      { label: 'Discordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Concordo', growthScore: 2 },
      { label: 'Concordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q23',
    source: 'tiagorezeck',
    dimension: 'Reação ao Sucesso de Colegas',
    dimensionKey: 'sucesso_colegas',
    text: 'Trato grandes sucessos na minha equipe como provas de que metas audaciosas são possíveis.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q24',
    source: 'emad',
    dimension: 'Reação ao Sucesso de Colegas',
    dimensionKey: 'sucesso_colegas',
    text: 'Compartilhar conhecimentos com pares gera concorrência prejudicial contra mim mesmo(a).',
    type: 'likert',
    options: [
      { label: 'Discordo Totalmente', growthScore: 5 },
      { label: 'Discordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Concordo', growthScore: 2 },
      { label: 'Concordo Totalmente', growthScore: 1 },
    ],
  },

  // ==========================================
  // DIMENSÃO 7: Abertura à Mudança e Inovação
  // ==========================================
  {
    id: 'q25',
    source: 'emad',
    dimension: 'Abertura à Mudança e Inovação',
    dimensionKey: 'abertura_mudanca',
    text: 'Quando uma diretriz ou processo com anos de histórico é subitamente reformulado na empresa:',
    type: 'forced_choice',
    options: [
      { label: 'Lidero a transição e me entusiasmo com as oportunidades do novo modelo.', growthScore: 5 },
      { label: 'Adapto-me rapidamente após compreender a justificativa.', growthScore: 4 },
      { label: 'Espero os outros testarem antes de aderir com confiança.', growthScore: 3 },
      { label: 'Sinto estresse intenso e reclamo da instabilidade do ambiente.', growthScore: 2 },
      { label: 'Boicoto veladamente e continuo fazendo da forma tradicional.', growthScore: 1 },
    ],
  },
  {
    id: 'q26',
    source: 'verihusaeni',
    dimension: 'Abertura à Mudança e Inovação',
    dimensionKey: 'abertura_mudanca',
    text: 'Mudanças organizacionais frequentes são apenas modismos que atrapalham o trabalho sério.',
    type: 'likert',
    options: [
      { label: 'Discordo Totalmente', growthScore: 5 },
      { label: 'Discordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Concordo', growthScore: 2 },
      { label: 'Concordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q27',
    source: 'tiagorezeck',
    dimension: 'Abertura à Mudança e Inovação',
    dimensionKey: 'abertura_mudanca',
    text: 'Gosto de reinventar minha própria rotina para eliminar zonas de conforto estagnadas.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q28',
    source: 'ashwanth',
    dimension: 'Abertura à Mudança e Inovação',
    dimensionKey: 'abertura_mudanca',
    text: 'A ambiguidade e o dinamismo do mercado exigem flexibilidade contínua de estratégias.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },

  // ==========================================
  // DIMENSÃO 8: Visão sobre o Potencial das Pessoas / Alunos
  // ==========================================
  {
    id: 'q29',
    source: 'verihusaeni',
    dimension: 'Visão sobre o Potencial das Pessoas',
    dimensionKey: 'potencial_alunos',
    text: 'Qual sua crença fundamental sobre liderados, alunos ou colaboradores com baixo rendimento inicial?',
    type: 'forced_choice',
    options: [
      { label: 'Qualquer indivíduo pode florescer de forma extraordinária com o método e mentoria certos.', growthScore: 5 },
      { label: 'A maioria das pessoas evolui significativamente quando recebe suporte adequado.', growthScore: 4 },
      { label: 'Apenas os que já têm boa base prévia conseguem realmente decolar.', growthScore: 3 },
      { label: 'Quem não tem talento nato dificilmente passará de um patamar medíocre.', growthScore: 2 },
      { label: 'Não vale a pena investir tempo em pessoas que não demonstram brilho natural.', growthScore: 1 },
    ],
  },
  {
    id: 'q30',
    source: 'emad',
    dimension: 'Visão sobre o Potencial das Pessoas',
    dimensionKey: 'potencial_alunos',
    text: 'Como líder ou educador, acredito que minha principal missão é desbloquear o potencial latente de cada um.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q31',
    source: 'ashwanth',
    dimension: 'Visão sobre o Potencial das Pessoas',
    dimensionKey: 'potencial_alunos',
    text: 'Rotular colaboradores precocemente em categorias fixas (ex: "brilhantes" vs "incapazes") é um erro grave de gestão.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q32',
    source: 'tiagorezeck',
    dimension: 'Visão sobre o Potencial das Pessoas',
    dimensionKey: 'potencial_alunos',
    text: 'Acredito que o ambiente e a cultura de segurança psicológica moldam o desempenho muito mais do que o DNA.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },

  // ==========================================
  // DIMENSÃO 9: Adoção de Novas Ferramentas
  // ==========================================
  {
    id: 'q33',
    source: 'emad',
    dimension: 'Adoção de Novas Ferramentas',
    dimensionKey: 'adocao_ferramentas',
    text: 'Diante do surgimento de ferramentas de inteligência artificial ou novos softwares em sua área:',
    type: 'forced_choice',
    options: [
      { label: 'Testo imediatamente, incorporo aos meus fluxos e busco vantagens competitivas.', growthScore: 5 },
      { label: 'Faço cursos rápidos e começo a utilizar nas rotinas operacionais.', growthScore: 4 },
      { label: 'Uso apenas se a empresa obrigar formalmente.', growthScore: 3 },
      { label: 'Sinto resistência técnica e receio de perder o controle do trabalho.', growthScore: 2 },
      { label: 'Rejeito o uso de softwares inovadores e mantenho papel/métodos arcaicos.', growthScore: 1 },
    ],
  },
  {
    id: 'q34',
    source: 'verihusaeni',
    dimension: 'Adoção de Novas Ferramentas',
    dimensionKey: 'adocao_ferramentas',
    text: 'Investir tempo para aprender ferramentas digitais novas sempre compensa o esforço inicial de curva de aprendizado.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q35',
    source: 'tiagorezeck',
    dimension: 'Adoção de Novas Ferramentas',
    dimensionKey: 'adocao_ferramentas',
    text: 'Tenho paciência para passar pelo período de inaptidão inicial ao aprender um novo aplicativo ou sistema.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q36',
    source: 'ashwanth',
    dimension: 'Adoção de Novas Ferramentas',
    dimensionKey: 'adocao_ferramentas',
    text: 'Prefiro esperar anos até que uma ferramenta seja 100% perfeita do que experimentar protótipos.',
    type: 'likert',
    options: [
      { label: 'Discordo Totalmente', growthScore: 5 },
      { label: 'Discordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Concordo', growthScore: 2 },
      { label: 'Concordo Totalmente', growthScore: 1 },
    ],
  },

  // ==========================================
  // DIMENSÃO 10: Busca por Aprendizado Contínuo
  // ==========================================
  {
    id: 'q37',
    source: 'emad',
    dimension: 'Busca por Aprendizado Contínuo',
    dimensionKey: 'aprendizado_continuo',
    text: 'Quanto tempo você dedica por iniciativa própria (fora das obrigações) para estudar e expandir sua bagagem intelectual?',
    type: 'forced_choice',
    options: [
      { label: 'Mais de 5 horas semanais consistentes (leitura, cursos, experimentos).', growthScore: 5 },
      { label: 'Entre 2 e 4 horas semanais de desenvolvimento intencional.', growthScore: 4 },
      { label: 'Apenas esporadicamente, quando surge uma necessidade pontual.', growthScore: 3 },
      { label: 'Raramente dedico tempo além do expediente.', growthScore: 2 },
      { label: 'Acredito que já sei o suficiente para minha função.', growthScore: 1 },
    ],
  },
  {
    id: 'q38',
    source: 'ashwanth',
    dimension: 'Busca por Aprendizado Contínuo',
    dimensionKey: 'aprendizado_continuo',
    text: 'Mantenho viva a curiosidade por temas fora da minha área de especialidade técnica.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q39',
    source: 'verihusaeni',
    dimension: 'Busca por Aprendizado Contínuo',
    dimensionKey: 'aprendizado_continuo',
    text: 'Após a graduação ou consolidação profissional, o aprendizado formal torna-se dispensável.',
    type: 'likert',
    options: [
      { label: 'Discordo Totalmente', growthScore: 5 },
      { label: 'Discordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Concordo', growthScore: 2 },
      { label: 'Concordo Totalmente', growthScore: 1 },
    ],
  },
  {
    id: 'q40',
    source: 'tiagorezeck',
    dimension: 'Busca por Aprendizado Contínuo',
    dimensionKey: 'aprendizado_continuo',
    text: 'Encaro cada dia de trabalho como uma aula prática onde sou sempre um aprendiz ávido.',
    type: 'likert',
    options: [
      { label: 'Concordo Totalmente', growthScore: 5 },
      { label: 'Concordo', growthScore: 4 },
      { label: 'Neutro', growthScore: 3 },
      { label: 'Discordo', growthScore: 2 },
      { label: 'Discordo Totalmente', growthScore: 1 },
    ],
  },
];
