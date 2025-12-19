import type { NextPage } from 'next'
import Head from 'next/head'
import ChatPanel from '../components/ChatPanel'

const Chat: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chat - Gestão de Mensagens</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <ChatPanel />
    </>
  )
}

export default Chat
