import Head from 'next/head'

export function NoIndexHead () {
  return (
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
  )
}

