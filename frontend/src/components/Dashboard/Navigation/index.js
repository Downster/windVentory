import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className='nav-bar'>
            <i className="fa-solid fa-house"></i>
            <ProfileButton user={sessionUser} />
        </nav>
    );
}

export default Navigation;