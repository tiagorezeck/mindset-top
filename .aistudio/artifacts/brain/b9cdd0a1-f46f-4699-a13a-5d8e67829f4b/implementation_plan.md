# Sistema Integrado de Avaliação de Mindset — COMET
## Plano de Evolução: Relatório de 10 Dimensões Integrais & Dossiê Executivo de Liderança e Autoconhecimento

Este plano estabelece a expansão metodológica do sistema COMET para contemplar 100% das 10 dimensões originais, incorporar o Guia de Gestão e Liderança, e aprofundar as ferramentas de autoconhecimento aplicadas.

---

## 1. Resgate e Estruturação das 10 Dimensões Integrais

Na primeira versão visual (imagem `Captura_de_tela_2026-10-29_105734_f6668aa2.png`), o instrumento avaliava **10 aspectos fundamentais**. Na transição para o modelo de radar octogonal (8 eixos) da segunda referência, duas dimensões foram consolidadas.

### As 10 Dimensões Canônicas que serão totalmente implementadas:
1. **Crença na Capacidade Pessoal** *(Maleabilidade dos talentos vs. crença em traços fixos)*
2. **Resposta ao Fracasso** *(Uso do erro como dado de aprendizado vs. paralisia)*
3. **Resposta aos Desafios** *(Apetite por complexidade vs. preferência pelo previsível)*
4. **Atitude em Relação ao Esforço** *(Esforço como construtor de maestria vs. sinal de falta de dom)*
5. **Abertura a Feedback e Críticas** *(Feedback como presente de calibração vs. ataque pessoal)*
6. **Reação ao Sucesso de Colegas** *(Inspiração e benchmark com conquistas alheias vs. ameaça de status)*
7. **Abertura à Mudança e Inovação** *(Flexibilidade de paradigmas vs. apego a processos ultrapassados)*
8. **Visão sobre o Potencial das Pessoas / Alunos** *(Crença de liderança de que qualquer pessoa pode se desenvolver)*
9. **Adoção de Novas Ferramentas e Tecnologias** *(Curiosidade instrumental vs. aversão técnica)*
10. **Busca por Aprendizado Contínuo** *(Curiosidade permanente e capacitação intencional)*

### Adaptação Visual:
- **Radar Decagonal (10 Eixos)**: Gráfico de teia com 10 vértices proporcionais, permitindo visualizar o perfil multidimensional sem qualquer perda ou compressão de dados.
- **Detalhamento dos 10 Aspectos**: Lista completa das 10 barras de progresso com pontuações nominais (1.00 a 5.00) e percentuais relativos.

---

## 2. Novos Módulos Metodológicos para o Relatório

### Módulo A — Guia do Líder: Como Gerenciar Esta Mentalidade
Conteúdo direcionado a gestores, diretores, mentores e RH com diretrizes customizadas conforme o perfil diagnosticado:
- **Como Funciona na Prática**: Os mecanismos psicológicos que governam as tomadas de decisão e reações sob estresse da pessoa com este perfil.
- **Como Motivar e Engajar**: Tipos de desafios, projetos e reconhecimento que ativam a máxima dedicação sem gerar paralisia ou cinismo.
- **Aproveitamento Máximo dos Pontos Fortes**: Onde alocar esse profissional para gerar impacto multiplicador na equipe.
- **Plano de Treinamento dos Pontos Fracos**: Como intervir em dimensões que apresentaram pontuações mais baixas (ex: feedback formativo, metas de aprendizado em vez de metas de desempenho puro).

### Módulo B — Dossiê de Autoconhecimento & PDI (Plano de Desenvolvimento Individual)
- **Mapeamento de Gatilhos da Mentalidade Fixa**: Identificação de situações clássicas (ex: ser contrariado em reuniões, receber feedback inesperado, prazos apertados) onde a mentalidade fixa tende a assumir o controle.
- **Reenquadramento Cognitivo (Reframing Script)**: Matriz prática de conversão de pensamentos automáticos limitantes em perguntas de crescimento.
- **Micro-Hábitos Semanais**: 3 práticas diárias/semanais de 5 a 15 minutos para exercitar a neuroplasticidade na rotina de trabalho.

---

## 3. Arquitetura da Interface do Relatório Expandido

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CABECALHO & CARTOES TOPO                        │
│  [ Média Geral 1-5 ]       [ Índice Crescimento % ]   [ Estágio Planta ]│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
          ┌─────────────────────────┴────────────────────────┐
          ▼                                                  ▼
┌───────────────────────────────┐  ┌───────────────────────────────────────┐
│     RADAR DECAGONAL (10 EIXOS)│  │    DETALHAMENTO DOS 10 ASPECTOS      │
│  • 10 vértices matemáticos     │  │  • 10 barras com pontuação 1-5 e %   │
│  • Visualização holística     │  │  • Destaque visual por gradientes    │
└───────────────────────────────┘  └───────────────────────────────────────┘
                                    │
          ┌─────────────────────────┴────────────────────────┐
          ▼                                                  ▼
┌───────────────────────────────┐  ┌───────────────────────────────────────┐
│   AUTOCONHECIMENTO & PDI      │  │     GUIA DE ORIENTACAO DO LIDER       │
│  • Gatilhos mentais & alertas │  │  • Como funciona no dia a dia        │
│  • Matriz de Reframing mental │  │  • Como motivar e engajar            │
│  • Micro-hábitos de rotina    │  │  • Como treinar e dar feedback       │
└───────────────────────────────┘  └───────────────────────────────────────┘
```

---

## 4. Próximos Passos (Aguardando Autorização)
1. Atualizar `src/utils/scoring.ts` e `src/data/questionnaires.ts` com a matriz definitiva das 10 dimensões canônicas.
2. Desenvolver o algoritmo do **Radar SVG Decagonal (10 pontas)** com geometria de decágono concêntrico.
3. Implementar a aba ou seção estruturada **"Guia de Orientação para Liderança"** e **"Trilha de Autoconhecimento e PDI"** com dados adaptados para cada nível de pontuação.
4. Conectar o **Coach de IA (Gemini)** ao novo modelo de liderança e PDI para respostas ainda mais contextuais.
