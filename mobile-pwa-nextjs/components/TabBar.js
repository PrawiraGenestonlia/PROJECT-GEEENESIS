import { Button, TabBar } from 'antd-mobile';
import { useRouter } from 'next/router'

function TabBarComponent(props) {
  const router = useRouter();
  return (
    <TabBar
      // hidden={this.state.hidden}
      unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white" noRenderContent={true} >

      {/* **********     TAB 1     ********** */}

      <TabBar.Item
        title="Home"
        key="/"
        icon={<div style={{
          width: '22px',
          height: '22px',
          background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
        }}
        />}
        selectedIcon={<div style={{
          width: '22px',
          height: '22px',
          background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
        }}
        />}
        selected={router.pathname == `${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/`}
        badge={0}
        onPress={() => {
          router.push(`${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/`);
        }}
        data-seed="logId" />

      {/* **********     TAB 2     ********** */}

      <TabBar.Item
        title="Clubs"
        key="/clubs"
        icon={<div style={{
          width: '22px',
          height: '22px',
          background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
        }}
        />}
        selectedIcon={<div style={{
          width: '22px',
          height: '22px',
          background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
        }}
        />}
        selected={router.pathname == `${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/clubs`}
        badge={0}
        onPress={() => {
          router.push(`${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/clubs`);
        }}
        data-seed="logId" />

      {/* **********     TAB 3     ********** */}

      <TabBar.Item
        title="Chats"
        key="/chats"
        icon={<div style={{
          width: '22px',
          height: '22px',
          background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
        }}
        />}
        selectedIcon={<div style={{
          width: '22px',
          height: '22px',
          background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
        }}
        />}
        selected={router.pathname == `${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/chats`}
        badge={0}
        onPress={() => {
          router.push(`${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/chats`);
        }}
        data-seed="logId" />

      {/* **********     TAB 4     ********** */}

      <TabBar.Item
        title="Calendar"
        key="/calendar"
        icon={<div style={{
          width: '22px',
          height: '22px',
          background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
        }}
        />}
        selectedIcon={<div style={{
          width: '22px',
          height: '22px',
          background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
        }}
        />}
        selected={router.pathname == `${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/calendar`}
        badge={0}
        onPress={() => {
          router.push(`${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/calendar`);
        }}
        data-seed="logId" />

      {/* **********     TAB 5     ********** */}

      <TabBar.Item
        title="Settings"
        key="/settings"
        icon={<div style={{
          width: '22px',
          height: '22px',
          background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
        }}
        />}
        selectedIcon={<div style={{
          width: '22px',
          height: '22px',
          background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
        }}
        />}
        selected={router.pathname == `${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/settings`}
        badge={0}
        onPress={() => {
          router.push(`${process.env.BASE_PATH ? process.env.BASE_PATH : ''}/settings`);
        }}
        data-seed="logId" />


    </TabBar>
  )
}

export default TabBarComponent;