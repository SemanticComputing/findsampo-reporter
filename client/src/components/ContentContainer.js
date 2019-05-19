import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions } from '@material-ui/core';

const ContentContainer = (props) => {
  const {
    stylingClass,
    header,
    headerStyle,
    description,
    descriptionStyle,
    bgColor,
    bgImage,
    cardData,
    component: Component
  } = props;

  const bgStyle = bgImage ?
    `radial-gradient(ellipse at center, rgba(194,194,194,0.1) 15%, rgb(191, 191, 191) 100%), url(${bgImage}) center/cover no-repeat border-box` :
    bgColor;

  return (
    <div
      className={`content-container ${stylingClass}`}
      style={{ background: bgStyle }}
    >
      <p style={headerStyle}>{header}</p>
      <p style={descriptionStyle}>{description}</p>
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
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentContainer;