import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'

import '../../public/reset.css'

/**
 * Component for rendering page
 * @param {AppProps} props {Component: props of page requested from the client, pageProps: received from fetching method}
 * @returns {React.ReactElement} Next rendering page
 */
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="theme-color" content="#000000"/>
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default App