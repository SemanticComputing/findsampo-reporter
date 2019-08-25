import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { isDesktopScreen } from '../../helpers/functions/functions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const DESKTOP_SCREEN_PERSENTAGE = 30;
const MOBILE_SCREEN_PERSENTAGE = 95;

/**
 * Show images in a slider
 * 
 * Props:
 * slideItems: The array of image data to be shown
 */
class Slider extends Component {
  render() {
    const centerPercentage = isDesktopScreen(window) ? DESKTOP_SCREEN_PERSENTAGE : MOBILE_SCREEN_PERSENTAGE;
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