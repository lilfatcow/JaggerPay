import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Layout, Menu } from 'antd';
import { authOptions } from '../api/auth/[...nextauth]/route';

const { Header, Sider, Content } = Layout;

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0, background: '#fff' }}>
        <div className="flex justify-between items-center px-6">
          <h1 className="text-xl font-bold">WonderPay</h1>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                key: '1',
                label: 'Dashboard',
                path: '/dashboard',
              },
              {
                key: '2',
                label: 'Invoices',
                path: '/invoices',
              },
              {
                key: '3',
                label: 'Vendors',
                path: '/vendors',
              },
            ]}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content style={{ padding: 24, margin: 0, background: '#fff' }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
