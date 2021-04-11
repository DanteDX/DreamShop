import Head from 'next/head'
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dream Shop!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href = "/books">
        <a>
          Click to go to books
        </a>
      </Link>
    </div>
  )
}
