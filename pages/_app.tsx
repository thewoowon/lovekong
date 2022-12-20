import '../styles/globals.css'
//import '../styles/util.scss'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import Header from '@components/Header'
import Footer from '@components/Footer'
import 'public/static/fonts/style.css'
import Head from 'next/head'
import Script from 'next/script'
import { Toaster } from 'react-hot-toast'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session
}>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      },
    },
  })

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Header></Header>
        <Script src="https://nsp.pay.naver.com/sdk/js/naverpay.min.js"></Script>
        <Component {...pageProps} />
        <Toaster></Toaster>
        <Footer></Footer>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
