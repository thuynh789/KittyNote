import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './logout';
import './Navigation.css';

function Navigation(){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='navbar'>
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
              	Note
          		</NavLink>
       		</div>
			<div>
				<LogoutButton/>
			</div>
		</ul>
	);
}

export default Navigation;
