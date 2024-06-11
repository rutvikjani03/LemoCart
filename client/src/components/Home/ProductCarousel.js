import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductCarousel.css"

const photos = [

    "https://m.economictimes.com/thumb/msid-98897778,width-1200,height-1200,resizemode-4,imgsize-35708/6-latest-mobile-phones-with-12gb-ram-in-india.jpg",

    "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3BmLXM1MC1wYWktMDAwMjUuanBn.jpg",

    "https://rukminim2.flixcart.com/image/850/1000/l0e6kcw0/t-shirt/h/g/d/m-half-triangel-black-one-nb-nicky-boy-original-imagc747apzffz5q.jpeg?q=90&crop=false",

    "https://img.freepik.com/free-photo/shiny-black-headphones-reflect-golden-nightclub-lights-generated-by-ai_188544-10148.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1714262400&semt=sph",

    "https://assets.storzapp.com/09d1fec6-a327-49d7-8f7b-6f592c276cbe/productImage/63fcb723b37b6cc97ef8cd19/086ad95f-33f3-438d-99d8-8695a4e421d0-201806301546542906.jpg",
]; 

const ProductCarousel = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow:1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  
    return (
      <div className="carousel-container">
        <h3>Featured Products</h3>
        <div className="slider-container">
          <Slider {...settings}>
            {photos.map((photo, index) => (
              <div key={index}>
                <img src={photo} alt={`Product ${index + 1}`}  width={"400px"} height={"400px"}/>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  };
  
  export default ProductCarousel;