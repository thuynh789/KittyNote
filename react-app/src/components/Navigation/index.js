import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import DemoUser from '../auth/DemoUser';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<div >
              <DemoUser />
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
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
