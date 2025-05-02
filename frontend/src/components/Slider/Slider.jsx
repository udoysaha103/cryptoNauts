import "./Slider.css";

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const images = [
  {name: "WizardNaut"},
  {name: "KnightNaut"},
  {name: "BonkNaut"},
  {name: "GhibliNaut"},
  {name: "RickNaut"},
  {name: "MonkeyNaut"},
  {name: "PopeNaut"},
  {name: "SmudgeNaut"},
  {name: "KarenNaut"},
  {name: "ApeNaut"},
  {name: "DegenNaut"},
  {name: "PweaseNaut"},
  {name: "SusNaut"},
  {name: "ShibaNaut"},
  {name: "ZombieNaut"},
  {name: "FwogNaut"},
  {name: "BearNaut"},
  {name: "BullNaut"},
  {name: "NinjaNaut"},
  {name: "ClownNaut"},
  {name: "NuggetNaut"},
  {name: "StonksNaut"},
  {name: "FartNaut"},
  {name: "RetardNaut"},
  {name: "PepeNaut"},
  {name: "AlienNaut"},
  {name: "TrumpNaut"},
  {name: "ElonNaut"},
  {name: "SatoshiNaut"},
  {name: "GokuNaut"},
  {name: "WojakNaut"},
  {name: "PengiNaut"},
  {name: "InvisibleNaut"},
  {name: "NeilArmNaut"},
  {name: "ChadNaut"},
  {name: "PandaNaut"},
  {name: "DogeNaut"},
  {name: "MatrixNaut"},
  {name: "SpoderNaut"},
  {name: "DarkNaut"},
]

function Slider() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      origin: 'center',
      perView: 7,
      spacing: 10,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    loop: true,
    centered: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 5000); // Change slide every 5 seconds
  
    return () => clearInterval(interval);
  });

  const handleImageClick = (index) => {
    if (index === currentSlide) {
      navigate(`/profile/${images[index].name}`);
    } else {
      instanceRef.current?.moveToIdx(index, true, 500);
    }
  };

  return (
    <div className="roller-slider">
      <div className="slider-background">
        <div className="slider-background-inside">
          <img src="/hc2s.png" alt=""/>
          <img src="/hc2f.png" alt="" className="slider-background-inside-fill"/>
        </div>
      </div>

      <div ref={sliderRef} className="keen-slider slider-content">
        {images.map((img, idx) => {
          const distanceFromCenter = Math.abs(currentSlide - idx);
          const scale = distanceFromCenter === 0 ? 0.9 : (distanceFromCenter === 1 || distanceFromCenter === 39) ? 0.75 : (distanceFromCenter === 2 || distanceFromCenter === 38) ? 0.6 : 0.5;

          return (
            <div
              key={idx}
              className="keen-slider__slide slider-item"
              onClick={() => handleImageClick(idx)}
              style={{overflow: "visible", zIndex: `${scale * 100}`}}
            >
              <div className="slider-item-inside" style={{
                height :`${scale * 100}%`,
              }}>
                <img
                  src={`/slider/${img.name}.png`}
                  alt={img.name}
                  className="slider-image"
                />
                {/* <img src="/hc2imageBorder.png" alt="" style={{height: "100%", width: "auto", position: "absolute"}}/> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Slider