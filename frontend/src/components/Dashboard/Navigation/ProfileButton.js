import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as sessionActions from '../../../store/session';

function ProfileButton({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const role = user.role[0]
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const adminPanel = () => {
        history.push('/admin/jobsites')
    }

    return (
        <>
            <div className="profile-div" onClick={openMenu}>
                <img src={user.image} className='profile-button' />
                {showMenu && (
                    <ul className="profile-dropdown">
                        <li>{user.firstName}</li>
                        <li>{user.email}</li>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                        {(role === 'Admin') && <li>
                            <button onClick={adminPanel}>Admin Panel</button>
                        </li>}
                    </ul>
                )}
            </div>
        </>
    );
}

export default ProfileButton;