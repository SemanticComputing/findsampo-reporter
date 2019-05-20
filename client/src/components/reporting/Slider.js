import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { isDesktopScreen } from '../../helpers/functions/functions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class Slider extends Component {
  render() {
    const centerPercentage = isDesktopScreen(window) ? 30 : 95;
    console.log(centerPercentage);
    return (
      <div className="slider">
        <Carousel
          centerMode
          emulateTouch
          autoPlay
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          showArrows={true}
          centerSlidePercentage={centerPercentage}
        >
          {
            this.props.slideItems.map((slider, index) => (
              <div key={index} className="slider__container">
                <img src={slider.imgSrc} className="slider__container__img" />
                <p className="slider__container__legend legend">{slider.des}</p>
              </div>
            ))
          }
        </Carousel>
      </div>
    );
  }
}

export default Slider;