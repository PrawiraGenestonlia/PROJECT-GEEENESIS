import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MainScreens from '../router/mainScreens';
import { push as Menu } from 'react-burger-menu';
import BurgerMenuSVG from '../assets/svg/burgerMenu.svg';
import HomeSVG from '../assets/svg/Home.svg';
import CommunitySVG from '../assets/svg/community.svg';
import ChatSVG from '../assets/svg/Chat.svg';
import Calendar from '../assets/svg/calendar.svg';
import CloseSVG from '../assets/svg/Close-2.svg';
import PersonSVG from '../assets/svg/person.svg';
import {
  HOME_URL, CHATS_URL, CALENDAR_URL, ME_URL, MYCIRCLE_URL,
  // MYEVENTS_URL, SEARCH_URL, ABOUT_URL, CLUBS_URL
  // SINGLE_CHAT_URL, SINGLE_CLUB_URL, SINGLE_PROFILE_URL
} from '../router/constants.router';
import { TYPE_OF_LAYOUT, GLOBAL_COLOR, TYPE_OF_THEME } from '../enum';
import '../css/react-burger-menu.css';
import '../css/large-screen-nav.css';
import '../css/menu-table.css';

const navigators = [
  { title: "Home", href: HOME_URL, svg: HomeSVG },
  { title: "Circle", href: MYCIRCLE_URL, svg: CommunitySVG },
  { title: "Calendar", href: CALENDAR_URL, svg: Calendar },
  { title: "Chats", href: CHATS_URL, svg: ChatSVG },
  { title: "Me", href: ME_URL, svg: PersonSVG },
];

const navigatorReversed = [...navigators].reverse();

const MenuItem = ({ svg = HomeSVG, title = "N/A" }) => (
  <div className="m-4">
    <div className="flex flex-col w-32 h-24 justify-center items-center">
      {/* filter generator: 
      https://codepen.io/sosuke/pen/Pjoqqp?__cf_chl_jschl_tk__=a3daf962d32c9077f30de11d9081ba85e525be17-1584092724-0-AQQYPMLlxSVWr9GUmkUjYk2Qm9aTBb8Lkk5timAm2V0j8B5ME81ufiUF3JBiBvF7Vw2WSu4dyzns1h0WZGzRqwg6qp-oBlD9qBZDhoRHZc5RRXQqJT9thMkcC7dqsr4jCvCo0JibIAgwjTCHvDhba9G7qXwWC5XipGWiPhzQH9QkHzd1IZHY3BpVkv_QnjHjt2j-pb4mG52B-Zd1Vxw9Nb3utQf3ca_DOqfthsoLrUQUa6t0HnztTcLn_9zgOy8UozJZPGB_RAJ4ebvwGRwBulMiWBFK1ohlyVshR67SioNr0I2mGvSkvtqq2pkVqkSP-lvHWMfL99Fgm3tFg9F14LO_L6yCY1EtZofssWIDSxjg 
      */}
      <img className="w-16 h-16 menu-svg" alt={title + "-img"} src={svg} style={{ filter: "invert(50%) sepia(78%) saturate(6773%) hue-rotate(199deg) brightness(110%) contrast(101%)" }} />
      <font className="text-black">{title}</font>
    </div>
  </div>
);

const SmallScreenNavBar = (props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [headerText, setHeaderText] = useState('Home');
  const [typeOfLayout,] = useState(props.typeOfLayout);

  const onNavClick = (page) => {
    setIsNavOpen(false);
    setHeaderText(page);
  }
  const isMenuOpen = (s) => {
    setIsNavOpen(s.isOpen);
  }

  useEffect(() => {

  }, [isNavOpen])

  const createTable = () => {
    let table = []
    for (let i = 0; i < navigators.length; i += 2) {
      let j = i + 1;
      let children = [];
      children.push(
        <td key={i}>
          <NavLink key={i} id={navigators[i].title.toLowerCase()} className="menu-item" to={navigators[i].href} onClick={() => { onNavClick(navigators[i].title) }} activeClassName="font-black">
            <MenuItem title={navigators[i].title} svg={navigators[i].svg} />
          </NavLink>
        </td>
      );
      if (navigators[j]) {
        children.push(
          <td key={j}>
            <NavLink key={j} id={navigators[j].title.toLowerCase()} className="menu-item" to={navigators[j].href} onClick={() => { onNavClick(navigators[j].title) }} activeClassName="font-black">
              <MenuItem title={navigators[j].title} svg={navigators[j].svg} />
            </NavLink>
          </td>
        )
      }
      table.push(<tr key={i * 10}>{children}</tr>)
    }
    return table
  }

  return (
    <>
      {
        typeOfLayout === TYPE_OF_LAYOUT.SIDE_BURGER &&
        <React.Fragment>
          <Menu left width={'100%'} customBurgerIcon={<img src={BurgerMenuSVG} alt="burger-menu" />}
            customCrossIcon={<img src={CloseSVG} alt="close-menu" />} isOpen={isNavOpen} onStateChange={isMenuOpen}>
            <div className="flex flex-col items-center" style={{ outline: 0, display: 'flex !important', marginTop: '1%' }}>
              <div>
                <div className="menu-table">
                  <table>
                    <tbody>
                      {createTable()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Menu>
          <div className="flex absolute h-full w-full justify-center items-center z-20" style={{ backgroundColor: '#0084ff ' }}>
            <div className="text-xl text-white">{headerText === 'Home' ?
              <>
                Geeenesis
              </> :
              <>{headerText}</>
            }
            </div>
          </div>
        </React.Fragment>
      }
      {
        typeOfLayout === TYPE_OF_LAYOUT.BOTTOM_TAB &&
        <React.Fragment>

        </React.Fragment>
      }

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
          return (
            <li key={i}>
              <NavLink className="" to={n.href}>
                <img className="float-left" src={n.svg} alt={`${n.title}-icon`}
                  style={{ width: "1.75rem", filter: 'invert(100%) sepia(0%) saturate(1819%) hue-rotate(77deg) brightness(114%) contrast(106%)' }} />
              &nbsp; {n.title}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const SmallScreenTabBar = () => {

  return (
    <div className="tab-bar inline">
      {navigators.map((n, i) => {
        return (
          <div className="float-left" key={i} style={{ width: `${100 / navigators.length}%` }}>
            <NavLink className="" to={n.href}>
              <div className="flex flex-col items-center justify-center h-16">
                <div>
                  <img className="icon" src={n.svg} alt={`${n.title}-icon`} style={{ width: "1.75rem" }} />
                </div>
                <div>
                  <span>{n.title}</span>
                </div>
              </div>
            </NavLink>
          </div>
        )
      })}
    </div>
  )
}

export default () => {
  const [typeOfLayout,] = useState(localStorage.getItem('TYPE_OF_LAYOUT') || TYPE_OF_LAYOUT.BOTTOM_TAB);
  const [typeOfTheme,] = useState(localStorage.getItem('TYPE_OF_THEME') || TYPE_OF_THEME.LIGHT_MODE);

  useEffect(() => {
    let element = document.getElementById('root-background');
    element.style.backgroundColor = GLOBAL_COLOR[typeOfTheme]['BACKGROUND_C'];
  }, [typeOfTheme]);

  return (
    <div className="flex flex-col w-full mt-0">
      {
        typeOfLayout === TYPE_OF_LAYOUT.SIDE_BURGER &&
        <React.Fragment>
          <div className='md:hidden'>
            <div id="navbar" className="h-16 shadow-xl z-50" style={{ backgroundColor: 'white' }}>
              <SmallScreenNavBar typeOfLayout={typeOfLayout} />
            </div>
          </div>
          <div className="hidden md:block w-full" >
            <div id="navbarlg" className="shadow-xl z-50">
              <LargeScreenNavBar />
            </div>
          </div>
          <div className="w-full max-w-sm p-4 mt-16 relative">
            <MainScreens />
          </div>
        </React.Fragment>
      }
      {
        typeOfLayout === TYPE_OF_LAYOUT.BOTTOM_TAB &&
        <React.Fragment>
          <div className="hidden md:block w-full" >
            <div id="navbarlg" className="shadow-xl z-50">
              <LargeScreenNavBar />
            </div>
          </div>
          <div id="main-screen-react" className=" w-full max-w-sm p-4 static">
            <div className="hidden md:block mt-16 "></div>
            <MainScreens />
          </div>
          <div className='md:hidden'>
            <div id="tabbar" className="absolute z-50 bg-white" style={{ height: '3.7rem', boxShadow: '0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
              <SmallScreenTabBar />
            </div>
          </div>
        </React.Fragment>
      }
    </div>
  )
}