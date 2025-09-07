# 📋 Instruções de Instalação e Uso

## 🚀 Instalação Rápida

### 1. Extrair o Projeto
```bash
# Extrair o arquivo ZIP
unzip painel-bi-nisia-floresta.zip
cd painel-bi-nisia-floresta
```

### 2. Instalar Dependências
```bash
# Usando npm
npm install

# OU usando pnpm (mais rápido)
pnpm install
```

### 3. Configurar ChatBot (Opcional)
```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar o arquivo .env
# VITE_OPENAI_API_KEY=sua_chave_openai_aqui
```

### 4. Executar o Projeto
```bash
# Modo desenvolvimento
npm run dev

# Acessar: http://localhost:5173
```

## 🔑 Configuração da Chave OpenAI

### Obter Chave
1. Acesse: https://platform.openai.com/api-keys
2. Faça login na sua conta OpenAI
3. Clique em "Create new secret key"
4. Copie a chave gerada

### Configurar no Projeto
```bash
# Edite o arquivo .env
VITE_OPENAI_API_KEY=sk-proj-SUA_CHAVE_AQUI
```

## 📊 Funcionalidades Principais

### 🏥 Seção Unidades de Saúde
- 27 estabelecimentos reais (dados CNES)
- Mapa interativo com localização
- Distribuição por tipo de unidade
- Lista completa com detalhes

### 👥 Seção Demografia  
- População atual e evolução
- Densidade demográfica
- Gráficos de crescimento

### 💰 Seção Socioeconômico
- PIB per capita
- IDHM
- Receitas e despesas municipais

### 🎓 Seção Educação
- IDEB das escolas
- Taxa de alfabetização
- Dados do censo escolar

### 🚔 Seção Segurança Pública
- Estrutura de segurança
- Indicadores de criminalidade
- Dados da 25ª Delegacia

### 🖥️ Sala Situacional
- 5 telas interativas
- Centro de comando profissional
- Mapas de ocorrências em tempo real
- Indicadores em tempo real

### 🤖 ChatBot Inteligente
- Contextualizado por seção
- Perguntas sugeridas
- Respostas baseadas em dados reais

## 🌐 Deploy em Produção

### Vercel (Recomendado)
```bash
# 1. Instalar CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Configurar variável no painel:
# VITE_OPENAI_API_KEY = sua_chave
```

### Netlify
```bash
# 1. Build
npm run build

# 2. Upload da pasta dist/
```

## ⚠️ Observações Importantes

### Dados Reais vs Estimativas
- **REAL**: Unidades CNES, Demografia IBGE, Educação INEP
- **ESTIMATIVA**: Atendimentos, Performance, Projeções

### Performance
- Projeto otimizado para desktop e mobile
- Mapas carregam sob demanda
- ChatBot funciona offline (sem chave)

### Troubleshooting
```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install

# Verificar porta
# Se 5173 estiver ocupada, Vite usará 5174, 5175, etc.
```

## 📱 Compatibilidade

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile (iOS/Android)

## 🎯 Próximos Passos

1. **Testar localmente** - `npm run dev`
2. **Configurar ChatBot** - Adicionar chave OpenAI
3. **Fazer deploy** - Vercel ou Netlify
4. **Personalizar** - Ajustar cores, dados, etc.

---

**Projeto pronto para uso!** 🚀

