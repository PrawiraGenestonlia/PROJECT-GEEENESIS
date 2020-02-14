import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainScreens from '../router/mainScreens';
import { stack as Menu } from 'react-burger-menu';
import BurgerMenuSVG from '../assets/svg/burgerMenu.svg';
import HomeSVG from '../assets/svg/Home.svg';
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
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <Menu customBurgerIcon={<img src={BurgerMenuSVG} alt="burger-menu" />} isOpen={isNavOpen}>
      {
        navigators.map((n) => {
          return (
            <Link id={n.title.toLowerCase()} className="menu-item" to={n.href} >
              {n.svg ? <div><img className="float-left" src={n.svg} alt={`${n.title}-icon`} width={20} /> &nbsp; {n.title}</div>
                : <div>{n.title}</div>}
            </Link>
          )
        })
      }
    </Menu>

  )
}

export default () => {
  return (
    <div className="w-full">
      <div className='md:hidden'>
        <SmallScreenNavBar />
      </div>


      <div className="w-full">
        <MainScreens />
      </div>
    </div>

  )
}