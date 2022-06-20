import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as sessionActions from '../../../store/session';
import ReactTooltip from "react-tooltip";
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

    const logout = async () => {
        const done = await dispatch(sessionActions.logout());
        history.push('/')
    };

    const adminPanel = () => {
        history.push('/admin/jobsites')
    }

    return (
        <>
            <div className="profile-div" onClick={openMenu}>
                <img src={user.image} className='profile-button' data-tip={'User profile'} />
                <ReactTooltip
                    className="tool-tip-cls"
                    place="right"
                    type="dark"
                    effect="solid"
                />
                {showMenu && (
                    <ul className="profile-dropdown">
                        <li>Hello, {user.firstName}</li>
                        {(role === 'Admin') && <li>
                            <p>Admin Menu</p>
                            <i class="fa-duotone fa-folder-gear" onClick={adminPanel}></i>
                        </li>}
                        <li>
                            <div className="logout-div">
                                <p>Logout</p>
                                <i className="fa-duotone fa-right-from-bracket" onClick={logout}></i>
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
}

export default ProfileButton;