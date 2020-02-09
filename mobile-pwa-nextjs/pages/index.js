import Layout from '../components/Layout'
import { Button } from 'antd-mobile'
import Link from 'next/link'

export default () => (
  <Layout title="Home">
    <Link href="/about">
      <Button>Go to About</Button>
    </Link>
  </Layout>
)
