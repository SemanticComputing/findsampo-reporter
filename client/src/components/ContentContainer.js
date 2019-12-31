import React from 'react';
import intl from 'react-intl-universal';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions
} from '@material-ui/core';

/**
 * ContentContainer is a component which can show all kind of layers with different styles on the homepage
 * It accepts the following attributes:
 * 
 * stylingClass: Styles for content container
 * header: Header text
 * headerStyle: Header styles
 * description: Description (Sub header)
 * descriptionStyle: Styles for description
 * bgColor: Background color
 * bgImage: Background image
 * cardData: Data that used to show material ui cards
 *           it contains image and description
 * component: Component to show
 */

const ContentContainer = (props) => {
  const {
    stylingClass,
    header,
    headerClass,
    headerStyle,
    description,
    descriptionClass,
    descriptionStyle,
    bgColor,
    bgImage,
    cardData,
    component: Component
  } = props;
  console.log(headerStyle);

  const bgStyle = bgImage ?
    `radial-gradient(ellipse at center, rgba(194,194,194,0.1) 15%, rgb(191, 191, 191) 100%), url(${bgImage}) center/cover no-repeat border-box` :
    bgColor;

  return (
    <div
      className={`content-container ${stylingClass}`}
      style={{ background: bgStyle }}
    >
      <p className={headerClass} style={headerStyle}>{header}</p>
      {
        description && <p className={descriptionClass} style={descriptionStyle}>{description}</p>
      }
      {Component && <Component />}
      <div className="content-container__card-container">
        {cardData && cardData.map((data, index) => (
          <Card key={index} className='content-container__card-container__card'>
            <CardActionArea>
              <CardMedia
                className='content-container__card-container__card__media'
                image={data.image}
                title={data.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.title}
                </Typography>
                <Typography component="p">
                  {data.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                {intl.get('appHomePage.contentContainer.learnMore')}
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentContainer;