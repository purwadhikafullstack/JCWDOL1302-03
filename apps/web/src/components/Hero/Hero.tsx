'use client';
import React from 'react';
import Slider from 'react-slick';
import Container from '../Container';
import Slide from './Slide';

const Hero = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesTosShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
  };

  const slideData = [
    { id: 0, img: '/slider1.jpg' },
    { id: 1, img: '/slider2.jpg' },
    { id: 2, img: '/slider3.jpg' },
  ];

  return (
    <Container>
      <div className="pt-8">
        <div className="pt-6 lg:pt-0">
          <Slider {...settings}>
            {slideData.map((item) => (
              <Slide key={item.id} img={item.img} />
            ))}
          </Slider>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
