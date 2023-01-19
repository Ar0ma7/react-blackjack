import React from 'react'
import Head from 'next/head'
import { Card } from '@/components/Card'
import { useAppSelector } from '@/modules'
import { BoardContainer } from '@/components/container/BoardContainer'

export default function Home() {
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
        <BoardContainer />
      </div>
    </div>
  )
}
