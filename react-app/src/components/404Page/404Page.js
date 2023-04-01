import cat from '../Images/oh-no.png'
import { Link } from 'react-router-dom';

export default function ErrorCat() {
	return (
		<div id='fullErrorDiv'>
			<div className='errorImgDiv'>
			<img
				src= {cat}
				alt='lost cat'
				/>
            <div>
            Meow-sorry! Can't find what you're looking for, hooman.
            <br />
            Maybe my fluffy paws accidentally pressed a wrong button.
            </div>
			</div>
			<Link to='/home'>Click here to return to Home</Link>
		</div>
	);
}
