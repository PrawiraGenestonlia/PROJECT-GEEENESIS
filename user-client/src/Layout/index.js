import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainScreens from '../router/mainScreens';
import { stack as Menu } from 'react-burger-menu';
import BurgerMenuSVG from '../assets/svg/burgerMenu.svg';
import HomeSVG from '../assets/svg/Home.svg';
import CloseSVG from '../assets/svg/Close-2.svg';
import LogoutSVG from '../assets/svg/logout.svg';
import { Button, Divider } from 'antd';
import {
  HOME_URL, CLUBS_URL, SINGLE_CLUB_URL, CHATS_URL,
  SINGLE_CHAT_URL, CALENDAR_URL, PROFILES_URL, SINGLE_PROFILE_URL
} from '../router/constants.router';
import '../css/react-burger-menu.css';


const navigators = [
  { title: "Home", href: HOME_URL, svg: HomeSVG },
  { title: "Clubs", href: CLUBS_URL, svg: HomeSVG },
  { title: "Chats", href: CHATS_URL, svg: HomeSVG },
  { title: "Calendar", href: CALENDAR_URL, svg: HomeSVG },
  { title: "Profile", href: PROFILES_URL, svg: HomeSVG },
]

const SmallScreenNavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const onClickLogOut = () => {
    localStorage.removeItem('auth-token');
    window.location.reload();
  }
  return (
    <Menu customBurgerIcon={<img src={BurgerMenuSVG} alt="burger-menu" />}
      customCrossIcon={<img src={CloseSVG} alt="close-menu" />} isOpen={isNavOpen}>
      {
        navigators.map((n) => {
          return (
            <Link id={n.title.toLowerCase()} className="menu-item" to={n.href} >
              <div className="text-black mt-3 mb-3 ">
                {n.svg ?
                  <> <img className="float-left" src={n.svg} alt={`${n.title}-icon`} width={20} /> &nbsp; {n.title} </>
                  :
                  <> {n.title} </>}
              </div>
            </Link>
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

  )
}

const LargeScreenNavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const onClickLogOut = () => {
    localStorage.removeItem('auth-token');
    window.location.reload();
  }
  return (
    <div className="h-5">
      <ul>
        {navigators.map((n) => {
          return <li><Link className="" to={n.href}>{n.title}</Link></li>
        })}

        <li><a href="#news">News</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </div>
  )
}

export default () => {
  return (
    <div className="w-full">
      <div className='md:hidden'>
        <SmallScreenNavBar />
      </div>
      <div className="hidden md:block">
        <LargeScreenNavBar />
      </div>


      <div className="w-full">
        <MainScreens />
      </div>
    </div>

  )
}