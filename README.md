# Painel de BI - Nísia Floresta/RN

Painel de Business Intelligence completo para o município de Nísia Floresta, Rio Grande do Norte, com dados de saúde, educação, demografia, socioeconômico e segurança pública.

## 📊 Funcionalidades

### 🏥 Unidades de Saúde
- **27 estabelecimentos** cadastrados no CNES
- **12 UBS** (Unidades Básicas de Saúde)
- **6 Postos de Saúde** 
- **1 CAPS** (Centro de Atenção Psicossocial)
- **7 Unidades Especializadas**
- **1 Secretaria Municipal de Saúde**
- Mapa interativo com localização real das unidades

### 👥 Demografia
- População atual: 34.000 habitantes (estimativa 2025)
- Evolução populacional 2010-2025
- Densidade demográfica: 103,80 hab/km²
- Crescimento de 34,3% (2010-2022)

### 💰 Indicadores Socioeconômicos
- PIB per capita: R$ 16.795 (2021)
- IDHM: 0.676 (Médio)
- Receitas municipais: R$ 125.450.000 (2024)
- Economia baseada em turismo litorâneo e agricultura

### 🎓 Educação
- Escolas municipais principais com IDEB
- Taxa de alfabetização: 85,91%
- Dados do censo escolar

### 🚔 Segurança Pública
- 25ª Delegacia de Polícia
- Estrutura PM/PC/CPRE/Polícia Penal
- Módulo de Segurança Especial (em construção)

### 🖥️ Sala Situacional
- **5 telas interativas** para centro de comando
- Visão geral com KPIs principais
- Comparação mensal 2025
- Mapa geográfico das unidades
- Performance por unidade
- Centro de comando de segurança pública

### 🤖 ChatBot Inteligente
- Assistente IA contextualizado por seção
- Perguntas sugeridas
- Respostas baseadas em dados reais
- Interface conversacional moderna

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou pnpm

### Instalação
```bash
# Instalar dependências
npm install
# ou
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env e adicione sua chave da OpenAI
```

### Executar em Desenvolvimento
```bash
npm run dev
# ou
pnpm dev
```

### Build para Produção
```bash
npm run build
# ou
pnpm build
```

## 🔧 Configuração

### Chave da API OpenAI
1. Obtenha uma chave em: https://platform.openai.com/api-keys
2. Edite o arquivo `.env`:
```
VITE_OPENAI_API_KEY=sk-proj-sua_chave_aqui
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ChatBot.jsx           # Assistente IA
│   ├── SalaSituacional.jsx   # 5 telas da sala situacional
│   ├── RealMapComponent.jsx  # Mapas interativos
│   └── TransparencyIndicator.jsx # Indicadores de transparência
├── data/
│   └── unidadesCompletas.js  # Dados das unidades e escolas
└── App.jsx                   # Componente principal
```

## 🎯 Tecnologias

- **React 19** - Framework principal
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **Recharts** - Gráficos e visualizações
- **OpenAI API** - ChatBot inteligente
- **Google Maps** - Mapas reais

## 📊 Fontes de Dados

### Dados Reais (REAL)
- **CNES**: Unidades de saúde
- **IBGE**: Demografia e socioeconômico
- **INEP**: Educação
- **Governo do RN**: Segurança pública

### Dados Estimados (ESTIMATIVA)
- Atendimentos mensais
- Performance das unidades
- Projeções 2025
- Indicadores de segurança detalhados

## 🌐 Deploy

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variável de ambiente no painel do Vercel:
# VITE_OPENAI_API_KEY = sua_chave_openai
```

### Netlify
```bash
# Build
npm run build

# Upload da pasta dist/
```

## 📞 Contato

Painel desenvolvido para demonstração das capacidades de BI municipal.

---

**Nísia Floresta/RN** - Painel de Business Intelligence  
Dados atualizados em agosto de 2025

