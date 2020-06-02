import React, { useEffect, useState } from 'react';
import TopNavBar from '../components/topNavBar';
import { TYPE_OF_LAYOUT, TYPE_OF_THEME, THEME_COLOR } from '../enum';
import { Select, Button, Modal, Input, message } from 'antd';
import NavigationSVG from '../assets/svg/navigation.svg';
import ThemeSVG from '../assets/svg/color-palette.svg';
import BottomDiv from '../components/bottomDiv';
import { useLocation } from 'react-router-dom';
import { changePassword } from '../api';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Option } = Select;

const CustomDivider = () => (
  <div className="my-3 px-4 bg-gray-600" style={{ height: '0.07rem' }} />
)
export default () => {
  const { pathname } = useLocation();
  const [changePasswordData, setChangePasswordData] = useState({ currentPassword: '', newPassword: '', newPasswordValidation: '' });
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const onChangeTypeOfLayout = (e) => {
    localStorage.setItem('TYPE_OF_LAYOUT', e);
    window.location.reload();
  }

  const onChangeTypeOfTheme = (e) => {
    localStorage.setItem('TYPE_OF_THEME', e);
    window.location.reload();
  }

  const onChangePasswordClick = () => {
    setShowModal(true);
  }

  const handleChangePassword = () => {
    if (changePasswordData.newPassword.length < 6) {
      setChangePasswordData({ ...changePasswordData, newPassword: '', newPasswordValidation: '' });
      message.error("New password must be at least have 6 characters!", 5);
      return null;
    }
    if (changePasswordData.newPassword !== changePasswordData.newPasswordValidation) {
      setChangePasswordData({ ...changePasswordData, newPasswordValidation: '' });
      message.error("New password and repeat new password is not matched!", 5);
      return null;
    }
    changePassword(changePasswordData).then((msg) => {
      let messages = msg ? (msg.data ? msg.data : JSON.stringify(msg)) : JSON.stringify(msg);
      localStorage.setItem('auth-token', messages);
      message.success("Your password has been successfully updated!", 5);
      setChangePasswordData({ currentPassword: '', newPassword: '', newPasswordValidation: '' });
      setShowLoading(false);
      setShowModal(false);
    }).catch(async (err) => {
      let messages = err ? (err.data ? err.data : JSON.stringify(err)) : JSON.stringify(err);
      message.error(messages, 5);
    });
  }

  const handleCancel = () => {
    setShowModal(false);
  }

  return (
    <div>
      <TopNavBar title="Settings" back="Me" />
      <div className="rounded-md p-2 relative" style={{ backgroundColor: THEME_COLOR['BACKGROUND_SECONDARY'] }}>
        <div className="flex flex-col w-full">
          <CustomDivider />
          <div className="flex flex-row items-center">
            <img className="w-6 h-6" src={NavigationSVG} alt="navigation-icon" style={{ filter: THEME_COLOR['ICON_FILTER'] }} />
            <div className="ml-2">Mobile Navigation</div>
            <div className="absolute" style={{ right: '0.3rem' }}>
              <Select defaultValue={localStorage.getItem('TYPE_OF_LAYOUT') || TYPE_OF_LAYOUT.BOTTOM_TAB} onChange={onChangeTypeOfLayout}>
                <Option value={TYPE_OF_LAYOUT.BOTTOM_TAB}>Tab Bar</Option>
                <Option value={TYPE_OF_LAYOUT.SIDE_BURGER}>Burger Menu</Option>
              </Select>
            </div>
          </div>
          <CustomDivider />
          <div className="flex flex-row items-center">
            <img className="w-6 h-6" src={ThemeSVG} alt="theme-icon" style={{ filter: THEME_COLOR['ICON_FILTER'] }} />
            <div className="ml-2">Themes</div>
            <div className="absolute" style={{ right: '0.3rem' }}>
              <Select defaultValue={localStorage.getItem('TYPE_OF_THEME') || TYPE_OF_THEME.DEFAULT} onChange={onChangeTypeOfTheme}>
                <Option value={TYPE_OF_THEME.LIGHT_MODE}>Light mode</Option>
                <Option value={TYPE_OF_THEME.DARK_MODE}>Dark mode</Option>
              </Select>
            </div>
          </div>
          <CustomDivider />
          <Button block onClick={onChangePasswordClick}>Change Password</Button>
        </div>
      </div>
      <Modal
        title="Change Password"
        wrapClassName="text-center"
        visible={showModal}
        onOk={handleChangePassword}
        confirmLoading={showLoading}
        onCancel={handleCancel} >
        <div className="flex flex-col">
          <div className="flex flex-row">
            {/* <div>Current password :</div> */}
            <Input.Password
              value={changePasswordData.currentPassword}
              onChange={(e) => { setChangePasswordData({ ...changePasswordData, currentPassword: e.target.value }) }}
              placeholder="Current password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            // prefix={<UserOutlined className="site-form-item-icon" />} 
            />
          </div>
          <div className="flex flex-row my-2">
            {/* <div>New password :</div> */}
            <Input.Password
              value={changePasswordData.newPassword}
              onChange={(e) => { setChangePasswordData({ ...changePasswordData, newPassword: e.target.value }) }}
              placeholder="New password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            // prefix={<UserOutlined className="site-form-item-icon" />} 
            />
          </div>
          <div className="flex flex-row">
            {/* <div>Repeat new password :</div> */}
            <Input.Password
              value={changePasswordData.newPasswordValidation}
              onChange={(e) => { setChangePasswordData({ ...changePasswordData, newPasswordValidation: e.target.value }) }}
              placeholder="Repeat new password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            // prefix={<UserOutlined className="site-form-item-icon" />} 
            />
          </div>

        </div>

      </Modal>
      <BottomDiv />
    </div>

  )
}