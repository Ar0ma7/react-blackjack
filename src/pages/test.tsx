import React from 'react'
import Head from 'next/head'
import { AppDispatch, gameSlice, useAppDispatch, useAppSelector } from '@/modules'

export default function Test() {
  const dispatch: AppDispatch = useAppDispatch()
  const { draw, clearHand } = gameSlice.actions
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
        <div>
          <button
            onClick={() => {
              dispatch(draw('player'))
            }}
          >
            player draw test
          </button>
          <button
            onClick={() => {
              dispatch(draw('dealer'))
            }}
          >
            dealer draw test
          </button>
          <button
            onClick={() => {
              dispatch(clearHand())
            }}
          >
            clear hand
          </button>
          <table>
            <thead>
              <tr>
                <th>deck</th>
                <th>player hand {player.sum}</th>
                <th>dealer hand {dealer.sum}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {deck.map((card, index) => (
                    <p suppressHydrationWarning={true} key={index}>
                      {JSON.stringify(card)}
                    </p>
                  ))}
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  {player.hand!.map((card, index) => (
                    <p suppressHydrationWarning={true} key={index}>
                      {JSON.stringify(card)}
                    </p>
                  ))}
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  {dealer.hand!.map((card, index) => (
                    <p suppressHydrationWarning={true} key={index}>
                      {JSON.stringify(card)}
                    </p>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
