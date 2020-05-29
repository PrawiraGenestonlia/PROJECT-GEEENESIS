import React from 'react';
import TopNavBar from '../components/topNavBar';
import { TYPE_OF_LAYOUT, TYPE_OF_THEME } from '../enum';
import { Select, Button } from 'antd';
import NavigationSVG from '../assets/svg/navigation.svg';
import ThemeSVG from '../assets/svg/color-palette.svg';
import BottomDiv from '../components/bottomDiv';

const { Option } = Select;

const CustomDivider = () => (
  <div className="my-5 px-4 bg-gray-600" style={{ height: '0.07rem' }} />
)
export default () => {

  const onChangeTypeOfLayout = (e) => {
    localStorage.setItem('TYPE_OF_LAYOUT', e);
    window.location.reload();
  }

  const onChangeTypeOfTheme = (e) => {
    localStorage.setItem('TYPE_OF_THEME', e);
    window.location.reload();
  }

  const onChangePasswordClick = () => {

  }

  return (
    <div>
      <div className="bg-white rounded-md p-2">
        <TopNavBar title="Settings" back="Me" />
        <div className="flex flex-col w-full">
          <CustomDivider />
          <div className="flex flex-row items-center">
            <img className="w-6 h-6" src={NavigationSVG} alt="navigation-icon" />
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
            <img className="w-6 h-6" src={ThemeSVG} alt="theme-icon" />
            <div className="ml-2">Themes</div>
            <div className="absolute" style={{ right: '0.3rem' }}>
              <Select defaultValue={localStorage.getItem('TYPE_OF_THEME') || TYPE_OF_THEME.LIGHT_MODE} onChange={onChangeTypeOfTheme}>
                <Option value={TYPE_OF_THEME.LIGHT_MODE}>Light mode</Option>
                <Option value={TYPE_OF_THEME.DARK_MODE}>Dark mode</Option>
              </Select>
            </div>
          </div>
          <CustomDivider />
          <Button block onClick={onChangePasswordClick}>Change Password</Button>
        </div>
      </div>
      <BottomDiv />
    </div>

  )
}