import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const ChatBot = ({ currentSection, sectionData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mensagem inicial baseada na seção atual
  const getInitialMessage = () => {
    const sectionMessages = {
      'unidades': 'Olá! Sou seu assistente para dados de saúde. Posso te ajudar a entender informações sobre as 27 unidades de saúde de Nísia Floresta. O que gostaria de saber?',
      'demografia': 'Olá! Estou aqui para te ajudar com dados demográficos de Nísia Floresta. Posso explicar sobre população, densidade, evolução demográfica e muito mais!',
      'saude': 'Olá! Sou especialista nos indicadores de saúde do município. Posso te ajudar com dados sobre mortalidade, cobertura ESF, internações e infraestrutura sanitária.',
      'socioeconomico': 'Olá! Posso te ajudar a entender os indicadores socioeconômicos de Nísia Floresta, como PIB per capita, IDHM, receitas e despesas municipais.',
      'educacao': 'Olá! Estou aqui para falar sobre educação em Nísia Floresta. Posso explicar sobre IDEB, matrículas, docentes e as escolas municipais.',
      'seguranca': 'Olá! Sou seu assistente para dados de segurança pública. Posso te ajudar com informações sobre estrutura de segurança, indicadores e estatísticas do município.'
    };
    return sectionMessages[currentSection] || 'Olá! Sou seu assistente inteligente. Como posso te ajudar com os dados do painel?';
  };

  // Perguntas sugeridas por seção
  const getSuggestedQuestions = () => {
    const suggestions = {
      'unidades': [
        'Quantas UBS existem no município?',
        'Qual é o Hospital principal?',
        'Como estão distribuídas as unidades?'
      ],
      'demografia': [
        'Qual a população atual?',
        'Como evoluiu a população?',
        'Qual a densidade demográfica?'
      ],
      'saude': [
        'Como está a mortalidade infantil?',
        'Qual a cobertura da ESF?',
        'Quantas internações por mês?'
      ],
      'socioeconomico': [
        'Qual o PIB per capita?',
        'Como está o IDHM?',
        'Quais as principais receitas?'
      ],
      'educacao': [
        'Como está o IDEB?',
        'Quantas escolas existem?',
        'Quantos alunos matriculados?'
      ],
      'seguranca': [
        'Qual a estrutura de segurança?',
        'Como está a taxa de criminalidade?',
        'Quantas viaturas ativas?'
      ]
    };
    return suggestions[currentSection] || [];
  };

  // Contexto específico para cada seção
  const getSectionContext = () => {
    const contexts = {
      'unidades': `Dados das Unidades de Saúde de Nísia Floresta:
- Total: 27 unidades (REAL - CNES)
- 12 UBS (Unidades Básicas de Saúde)
- 6 Postos de Saúde
- 1 CAPS (Centro de Atenção Psicossocial)
- 7 Unidades Especializadas (Centro de Saúde, Laboratórios, Fisioterapia, etc.)
- 1 Secretaria Municipal de Saúde
- Atendimentos mensais: 15.000+ (ESTIMATIVA)
- Coordenadas geográficas reais implementadas`,

      'demografia': `Dados Demográficos de Nísia Floresta:
- População 2025: 34.000 habitantes (ESTIMATIVA IBGE)
- População 2022: 31.942 habitantes (REAL - IBGE)
- Área: 307,719 km²
- Densidade: 103,80 hab/km²
- Evolução populacional: crescimento de 34,3% (2010-2022)
- Localização: Região Metropolitana de Natal/RN
- Características: Município litorâneo com potencial turístico`,

      'saude': `Indicadores de Saúde de Nísia Floresta:
- Mortalidade infantil: dados IBGE disponíveis
- Cobertura ESF: baseada nas 12 UBS (REAL)
- Internações: estimativas baseadas em padrões regionais
- Infraestrutura sanitária: dados oficiais
- CAPS: atendimento em saúde mental
- Sistema de saúde municipal estruturado`,

      'socioeconomico': `Indicadores Socioeconômicos de Nísia Floresta:
- PIB per capita: R$ 16.795 (IBGE 2021)
- PIB Total: R$ 474.721,76 mil (2021)
- IDHM: 0.676 (Médio)
- Receitas municipais: R$ 125.450.000 (2024)
- Despesas: R$ 118.230.000 (2024)
- Economia: turismo litorâneo, agricultura e serviços
- Localização estratégica: próximo a Natal`,

      'educacao': `Dados de Educação de Nísia Floresta:
- IDEB: indicadores oficiais INEP
- Escolas municipais principais: EM Alberto de Carvalho Araújo (IDEB 5,21), EM Leonor Maria Bezerra (IDEB 3,69), EM Professora Aurora Costa de Carvalho (IDEB 4,93)
- Taxa de alfabetização: 85,91% (REAL - IBGE)
- Matrículas: dados oficiais por nível
- Docentes: números reais do censo escolar
- Rede municipal estruturada`,

      'seguranca': `Dados de Segurança Pública de Nísia Floresta:
- 25ª Delegacia de Polícia (R. Nossa Senhora do Ó, 117)
- Telefone: (84) 98657-7594
- Estrutura: Polícia Militar, Polícia Civil, CPRE, Polícia Penal
- Módulo de Segurança Especial (em construção)
- Ações preventivas: palestras sobre violência
- Delegacia Móvel disponível para eventos
- Estrutura: 4 órgãos de segurança ativos
- Emergências: 190 (PM), 197 (PC), 193 (Bombeiros)`
    };
    return contexts[currentSection] || '';
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Adiciona mensagem do usuário
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      // Verifica se a chave da API está disponível
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('Chave da API OpenAI não configurada');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Você é um assistente especializado em dados municipais de Nísia Floresta, Rio Grande do Norte. 
              
Contexto atual da seção "${currentSection}":
${getSectionContext()}

IMPORTANTE:
- Sempre mencione se os dados são REAIS (oficiais) ou ESTIMATIVAS
- Seja preciso com os números fornecidos
- Explique de forma clara e didática
- Foque apenas nos dados desta seção
- Se perguntarem sobre outras seções, oriente a navegar para a seção correspondente
- Mantenha respostas concisas mas informativas
- Use linguagem acessível para gestores públicos`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Erro da API OpenAI:', response.status, errorData);
        throw new Error(`Erro da API: ${response.status} - ${errorData.error?.message || 'Erro desconhecido'}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: data.choices[0].message.content 
        }]);
      } else {
        console.error('Resposta inválida da API:', data);
        throw new Error('Resposta inválida da API');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      let errorMessage = 'Desculpe, ocorreu um erro. Tente novamente em alguns instantes.';
      
      // Mensagens de erro mais específicas para debug
      if (error.message.includes('Chave da API')) {
        errorMessage = 'Erro de configuração: Chave da API não encontrada.';
      } else if (error.message.includes('401')) {
        errorMessage = 'Erro de autenticação: Chave da API inválida.';
      } else if (error.message.includes('429')) {
        errorMessage = 'Limite de requisições atingido. Tente novamente em alguns minutos.';
      } else if (error.message.includes('500')) {
        errorMessage = 'Erro interno do servidor OpenAI. Tente novamente.';
      }
      
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([{ type: 'bot', content: getInitialMessage() }]);
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
          title="Assistente IA - Pergunte sobre os dados"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Janela do chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <div>
                <h3 className="font-semibold">Assistente IA</h3>
                <p className="text-xs opacity-90">Seção: {currentSection}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded"
            >
              <X size={18} />
            </button>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'bot' && <Bot size={16} className="mt-1 flex-shrink-0" />}
                    {message.type === 'user' && <User size={16} className="mt-1 flex-shrink-0" />}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot size={16} />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Perguntas sugeridas */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Perguntas sugeridas:</p>
              <div className="space-y-1">
                {getSuggestedQuestions().map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded block w-full text-left transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua pergunta..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
