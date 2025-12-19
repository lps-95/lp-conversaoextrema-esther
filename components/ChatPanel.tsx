import { useEffect, useRef, useState } from 'react'

interface Message {
  id: string
  from: string
  to?: string
  name?: string
  text?: string
  body?: string
  message?: string
  timestamp: string
  event?: string
}

interface Conversation {
  phone: string
  name: string
  lastMessage: string
  timestamp: string
  unread?: boolean
}

export default function ChatPanel() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Scroll para a última mensagem
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  // Carregar conversas
  const loadConversations = async () => {
    try {
      const res = await fetch('/api/messages')
      const data = await res.json()
      if (data.conversations) {
        setConversations(data.conversations)
      }
    } catch (error) {
      console.error('Erro ao carregar conversas:', error)
    }
  }

  // Carregar mensagens de uma conversa
  const loadMessages = async (phone: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/messages?phone=${phone}&order=asc`)
      const data = await res.json()
      if (data.items) {
        setMessages(data.items)
        setTimeout(scrollToBottom, 100)
      }
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error)
    } finally {
      setLoading(false)
    }
  }

  // Enviar mensagem
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedPhone || sending) return

    setSending(true)
    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedPhone,
          body: newMessage,
        }),
      })

      const data = await res.json()

      if (data.success && data.sentMessage) {
        setMessages((prev) => [...prev, data.sentMessage])
        setNewMessage('')
        setTimeout(scrollToBottom, 100)
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    } finally {
      setSending(false)
    }
  }

  // Carregar conversas ao montar
  useEffect(() => {
    loadConversations()
    const interval = setInterval(loadConversations, 10000) // Atualizar a cada 10s
    return () => clearInterval(interval)
  }, [])

  // Atualizar mensagens quando selecionar conversa
  useEffect(() => {
    if (selectedPhone) {
      loadMessages(selectedPhone)
      const interval = setInterval(() => loadMessages(selectedPhone), 5000) // Atualizar a cada 5s
      return () => clearInterval(interval)
    }
  }, [selectedPhone])

  const getMessageText = (msg: Message) => {
    return msg.text || msg.body || msg.message || '[Sem conteúdo]'
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  const formatPhone = (phone: string) => {
    const clean = phone.replace(/\D/g, '')
    if (clean.length === 13 && clean.startsWith('55')) {
      return `+${clean.slice(0, 2)} (${clean.slice(2, 4)}) ${clean.slice(4, 9)}-${clean.slice(9)}`
    }
    return phone
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar - Lista de Conversas */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">💬 Conversas</h2>
          <p className="text-sm text-gray-400 mt-1">
            {conversations.length} conversa{conversations.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>Nenhuma conversa ainda</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.phone}
                onClick={() => setSelectedPhone(conv.phone)}
                className={`w-full p-4 text-left border-b border-gray-700 transition-colors ${selectedPhone === conv.phone
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-700'
                  }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold truncate">{conv.name}</span>
                      {conv.unread && (
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatPhone(conv.phone)}
                    </p>
                    <p className="text-sm text-gray-300 mt-1 truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    {formatTime(conv.timestamp)}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Área de Chat */}
      <div className="flex-1 flex flex-col">
        {!selectedPhone ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-xl">Selecione uma conversa</p>
              <p className="text-sm mt-2">Escolha uma conversa à esquerda para começar</p>
            </div>
          </div>
        ) : (
          <>
            {/* Header da Conversa */}
            <div className="p-4 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">
                    {conversations.find((c) => c.phone === selectedPhone)?.name || 'Cliente'}
                  </h3>
                  <p className="text-xs text-gray-400">{formatPhone(selectedPhone)}</p>
                </div>
                <button
                  onClick={() => loadMessages(selectedPhone)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  title="Atualizar mensagens"
                >
                  🔄
                </button>
              </div>
            </div>

            {/* Mensagens */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900"
            >
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Nenhuma mensagem ainda</p>
                </div>
              ) : (
                messages.map((msg, idx) => {
                  const isMe = msg.from === 'me' || msg.event === 'sent'
                  const text = getMessageText(msg)

                  return (
                    <div
                      key={msg.id || idx}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${isMe
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-white'
                          }`}
                      >
                        {!isMe && msg.name && (
                          <p className="text-xs font-semibold mb-1 text-gray-300">
                            {msg.name}
                          </p>
                        )}
                        <p className="whitespace-pre-wrap break-words">{text}</p>
                        <p
                          className={`text-xs mt-1 ${isMe ? 'text-blue-200' : 'text-gray-400'
                            }`}
                        >
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de Mensagem */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-400"
                  disabled={sending}
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || sending}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {sending ? '⏳' : '📤'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
