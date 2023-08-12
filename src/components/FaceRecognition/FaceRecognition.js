import React from 'react';
import './FaceRecognition.css';




const FaceRecognition = ({ imageUrl, box }) => {
   
    return (
       <div className='center relative parent' >
        <img alt="" id='inputimage' src={imageUrl} width='500px' height='auto'></img> 
        { box }
        </div>

    )

}

export default FaceRecognition;     





        
