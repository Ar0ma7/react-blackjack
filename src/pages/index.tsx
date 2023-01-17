import React from 'react'
import Head from 'next/head'
import { Card } from '@/components/Card'
import { useAppSelector } from '@/modules'

export default function Home() {
  const { deck, player, dealer } = useAppSelector((state) => state.default)
  return (
    <div>
      <Head>
        <title>React Blackjack</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
        <meta name='robots' content='noindex' />
      </Head>
      <div>
        <Card card={deck[0]} />
      </div>
    </div>
  )
}
