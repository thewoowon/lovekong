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
import * as gtag from 'lib/gtag'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session
}>) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])
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
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <Component {...pageProps} />
        <Toaster></Toaster>
        <Footer></Footer>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
