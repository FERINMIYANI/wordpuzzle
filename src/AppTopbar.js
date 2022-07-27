import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './App.scss';

export const AppTopbar = (props) => {

    

    return (
        <div className="layout-topbar">
            {/* <Link to="/" className="layout-topbar-logo">
                <img className='logo' src= 'assets/layout/images/creative-logo-white.svg' alt="logo"/>
                <span>Super Admin</span>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button> */}

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { 'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <Link to='/'><i className="pi pi-calendar" /></Link>
                        <span>Events</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i style={{color: '#64B5F6'}} className="pi pi-sign-out" />
                        <span>Log Out</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}
