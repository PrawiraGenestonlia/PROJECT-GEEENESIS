import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MainScreens from '../router/mainScreens';
import { stack as Menu } from 'react-burger-menu';
import BurgerMenuSVG from '../assets/svg/burgerMenu.svg';
import HomeSVG from '../assets/svg/Home.svg';
import CloseSVG from '../assets/svg/Close-2.svg';
import LogoutSVG from '../assets/svg/logout.svg';
import { Button, Divider } from 'antd';
import {
  HOME_URL, CLUBS_URL, CHATS_URL, CALENDAR_URL, PROFILES_URL,
  // SINGLE_CHAT_URL, SINGLE_CLUB_URL, SINGLE_PROFILE_URL
} from '../router/constants.router';
import '../css/react-burger-menu.css';
import '../css/large-screen-nav.css';

const navigators = [
  { title: "Home", href: HOME_URL, svg: HomeSVG },
  { title: "Clubs", href: CLUBS_URL, svg: HomeSVG },
  { title: "Chats", href: CHATS_URL, svg: HomeSVG },
  { title: "Calendar", href: CALENDAR_URL, svg: HomeSVG },
  { title: "Profile", href: PROFILES_URL, svg: HomeSVG },
];

const navigatorReversed = [...navigators].reverse();

const SmallScreenNavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [headerText, setHeaderText] = useState('Home');
  const onClickLogOut = () => {
    localStorage.removeItem('auth-token');
    window.location.reload();
  }
  const onNavClick = (page) => {
    setIsNavOpen(false);
    setHeaderText(page);
  }
  const isMenuOpen = (s) => {
    setIsNavOpen(s.isOpen);
  }

  useEffect(() => {

  }, [isNavOpen])

  return (
    <>
      <Menu right customBurgerIcon={<img src={BurgerMenuSVG} alt="burger-menu" />}
        customCrossIcon={<img src={CloseSVG} alt="close-menu" />} isOpen={isNavOpen} onStateChange={isMenuOpen}>
        {
          navigators.map((n, i) => {
            return (
              <NavLink key={i} id={n.title.toLowerCase()} className="menu-item" to={n.href} onClick={() => { onNavClick(n.title) }} activeClassName="font-black">
                <div className="text-black mt-3 mb-3 ">
                  {n.svg ?
                    <> <img className="float-left" src={n.svg} alt={`${n.title}-icon`} width={20} /> &nbsp; {n.title} </>
                    :
                    <> {n.title} </>}
                </div>
              </NavLink>
            )
          })
        }
        <Divider type="horizontal" style={{ background: 'black' }} />
        <div className="flex text-black mt-3 mb-3">
          <Button type="default" shape="round" onClick={onClickLogOut}>
            <img className="float-left" src={LogoutSVG} alt="Log out" width={20} /> &nbsp; Log out
        </Button>
        </div>
      </Menu>
      <div className="flex absolute h-full w-full justify-center items-center z-20">
        <div>{headerText === 'Home' ? 'GEEENESIS LOGO' : headerText}</div>
      </div>
    </>
  )
}

const LargeScreenNavBar = () => {
  const onClickLogOut = () => {
    localStorage.removeItem('auth-token');
    window.location.reload();
  }
  return (
    <div className="large-nav">
      <ul>
        <li className="large-nav-logo"><Link className="" to="/">Geeenesis Logo</Link></li>
        <li><Link className="" to="" onClick={onClickLogOut}>Log out</Link></li>
        {navigatorReversed.map((n, i) => {
          return <li key={i}><NavLink className="" to={n.href}><img className="float-left" src={n.svg} alt={`${n.title}-icon`} width={20} /> &nbsp; {n.title}</NavLink></li>
        })}
      </ul>
    </div>
  )
}

export default () => {
  return (
    <div className="flex flex-col w-full mt-0">
      <div className='md:hidden'>
        <div id="navbar" className="h-12 shadow-xl z-50" style={{ backgroundColor: 'white' }}>
          <SmallScreenNavBar />
        </div>
      </div>
      <div className="hidden md:block" >
        <div id="navbarlg" className="shadow-xl z-50">
          <LargeScreenNavBar />
        </div>

      </div>
      <div className="w-full max-w-sm p-4 mt-12 relative">
        <MainScreens />
      </div>
    </div>
  )
}