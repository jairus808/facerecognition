import React from 'react';
import Tilt from 'react-parallax-tilt';
import logostyle from './logostyle.css';
import brain from './icons8-brain-100.png';

const Logo = () => {
   
    return (
    <div className="tilt-card">
    <Tilt className='tilt ma4 mt0 shadow-3 ba' >
      <div >
        <img src={brain} alt="brainlogo" className="brain"/>
      </div>
    </Tilt>
    </div>
    )

}

export default Logo;