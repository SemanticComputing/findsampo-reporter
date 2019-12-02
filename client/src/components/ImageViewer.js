import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ImageViewer = (props) => {
  const [isOpen, setLighboxStatus] = useState(false);

  return (
    <div style={{ display: props.display || 'inline', margin: '2px' }}>
      <img
        src={props.image}
        width={props.width || '64px'}
        height={props.height || '64px'}
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