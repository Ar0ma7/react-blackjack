import React from 'react'
import Head from 'next/head'
import { AppDispatch, slice, useAppDispatch, useAppSelector } from '@/modules'

export default function Home() {
  const dispatch: AppDispatch = useAppDispatch()
  const deck = useAppSelector((state) => state.default.deck)
  console.log(deck)
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
      <div>a</div>
    </div>
  )
}
