import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { getThumbId } from '../utils/functions/functions';

import 'react-image-lightbox/style.css';


const ImageViewer = (props) => {
  const [isOpen, setLighboxStatus] = useState(false);

  return (
    <div style={{ display: props.display || 'inline', margin: '2px', cursor: 'pointer' }}>
      <img
        src={getThumbId(props.image)}
        width={props.width ? `${props.width}px` : '64px'}
        height={props.height ? `${props.height}px` : '64px'}
        onClick={() => setLighboxStatus(true)}
      />
      {isOpen && <Lightbox
        mainSrc={props.image}
        onCloseRequest={() => setLighboxStatus(false)}
        imageTitle={props.imageTitle}
        imageCaption={props.imageCaption}
      />}
    </div>
  );
};


export default ImageViewer;