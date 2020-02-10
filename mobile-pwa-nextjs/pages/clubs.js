import Layout from '../components/Layout';
import { Button } from 'antd-mobile';
import Link from 'next/link';
import { CLUB_URL } from '../api';

const clubLink = CLUB_URL;

export default () => (
  <Layout title="Clubs">
    <div>
      <iframe className='border-none' src={clubLink} style={{ height: '85vh', width: '100%' }} />
    </div>

  </Layout>
)
