import React from 'react'
import './FaceRecognition.css';

const BoundingBox = ({box}) => {
    return (                       //Render only used for class.extends components
        <div>
          <div className="bounding-box br3 shadow-2"    // returning an array of objects: [{ 0 : box }, { 1: box}
    style={{top: box.topRow , right: box.rightCol, bottom: box.bottomRow , left: box.leftCol}}></div>

        </div>


    )   

}

export default BoundingBox;