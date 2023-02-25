import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './logout';
import './Navigation.css';
import logo from "../Images/KITTYNOTE.png"

function Navigation(){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-wrapper'>
		<ul className='navbar'>
			<div className='logo'>
				<NavLink exact to="/home">
					<img src={logo} alt='logo' />
				</NavLink>
			</div>
			<div>
				Hi {sessionUser?.username} !
			</div>
			<div>
				<NavLink exact to="/home">Home</NavLink>
			</div>
			<div>
          		<NavLink className="navlink" to="/notebooks">
              	Notebooks
          		</NavLink>
       		</div>
			<div>
          		<NavLink className="navlink" to="/notes">
              	Notes
          		</NavLink>
       		</div>
			<div>
				<LogoutButton/>
			</div>
		</ul>
		</div>
	);
}

export default Navigation;
