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
			<div className='nav1'>
				Hi {sessionUser?.username} !
			</div>
			<div className='nav2'>
				<NavLink exact to="/home">Home</NavLink>
			</div>
			<div className='nav3'>
          		<NavLink className="navlink" to="/notebooks">
              	Notebooks
          		</NavLink>
       		</div>
			<div className='nav4'>
          		<NavLink className="navlink" to="/notes">
              	Notes
          		</NavLink>
       		</div>
			<div className='nav'>
				<LogoutButton/>
			</div>
		</ul>
		</div>
	);
}

export default Navigation;
