import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className='nav-bar'>
            <i className="fa-duotone fa-wind-turbine navbine" onClick={() => history.push('/inventory')}></i>
            <p className='title-text' onClick={() => history.push('/inventory')}>windVentory</p>
            <ProfileButton user={sessionUser} />
        </nav>
    );
}

export default Navigation;