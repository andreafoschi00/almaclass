import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineDashboard } from 'react-icons/md'; 
import { SiGoogleclassroom } from 'react-icons/si';
import { GiTeacher, GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineRead } from 'react-icons/ai';

import './sidebar.scss';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <MdOutlineDashboard />,
        to: '/dashboard',
        section: 'dashboard'
    },
    {
        display: 'Aule e Laboratori',
        icon: <SiGoogleclassroom />,
        to: '/classroom',
        section: 'classroom'
    },
    {
        display: 'Insegnamenti',
        icon: <GiTeacher />,
        to: '/teaching',
        section: 'teaching'
    },
    {
        display: 'Corsi',
        icon: <AiOutlineRead />,
        to: '/course',
        section: 'course'
    }
]

const Sidebar = props => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    const sidebarOpen = props.isOpen ? "sidebar open" : "sidebar close";

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className={sidebarOpen}>
          <div className="sidebar__logo">
              <button className='sidebar__toggle' onClick={props.toggleSidebar}><GiHamburgerMenu /></button>
          </div>
          <div ref={sidebarRef} className="sidebar__menu">
              <div
                  ref={indicatorRef}
                  className="sidebar__menu__indicator"
                  style={{
                      transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                  }}
              ></div>
              {
                  sidebarNavItems.map((item, index) => (
                      <Link to={item.to} key={index}>
                          <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                              <div className="sidebar__menu__item__icon">
                                  {item.icon}
                              </div>
                              <div className="sidebar__menu__item__text">
                                  {item.display}
                              </div>
                          </div>
                      </Link>
                  ))
              }
          </div>
      </div>
};

export default Sidebar;