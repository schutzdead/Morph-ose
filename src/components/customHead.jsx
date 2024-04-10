import Head from 'next/head'

export function CustomHead ({pageName, metaResume, othersMeta=''}) {
  const message = `${pageName} | Morph'ose`;
  return (
    <Head>
      <title>{message}</title>
      <meta name="description" content={metaResume} />
      {...othersMeta}      
    </Head>
  )
}

