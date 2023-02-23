import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation(){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<div>
				Hi {sessionUser?.username} !
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
			<li>
				<NavLink exact to="/home">Home</NavLink>
			</li>
			{/* {isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)} */}
		</ul>
	);
}

export default Navigation;
