import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useRef, useState } from "react";
import Slider from "react-slick";
import { Dialog } from "@mui/material";
import IntroBlock from "../inputs/blocks/introBlock.tsx";
import SlideWrapper from "./slideWrapper.tsx";
import RentingInputs from "../inputs/blocks/rentingInputs.tsx";
import BuyingInputs from "../inputs/blocks/buyingInputs.tsx";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

type SimpleSliderProps = {
  open: boolean;
  finishSetup: () => void;
};

export default function SetupSlider({ open, finishSetup }: SimpleSliderProps) {
  const { t } = useTranslation();
  const sliderRef = useRef<Slider>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slides = [
    { element: <IntroBlock />, key: "IntroBlock" },
    { element: <RentingInputs />, key: 2, title: t("Renting") },
    { element: <BuyingInputs />, key: 3, title: t("Buying") },
  ];
  const lastSlideActive = activeSlideIndex === slides.length - 1;
  const firstSlideActive = activeSlideIndex === 0;

  const settings: Slider["props"] = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    swipe: false,
    draggable: false,
    arrows: false,
    adaptiveHeight: true,
  };

  const navigateForward = () => {
    setActiveSlideIndex((c) => c + 1);
    sliderRef.current?.slickNext();
  };

  const navigateBackward = () => {
    setActiveSlideIndex((c) => c - 1);
    sliderRef.current?.slickPrev();
  };

  return (
    <Dialog open={open}>
      <DialogContent dividers>
        <Slider ref={sliderRef} {...settings}>
          {slides.map((s) => (
            <SlideWrapper title={s.title} key={s.key}>
              {s.element}
            </SlideWrapper>
          ))}
        </Slider>
      </DialogContent>
      <DialogActions>
        {!firstSlideActive && (
          <Button onClick={navigateBackward}>Previous</Button>
        )}
        {!lastSlideActive && (
          <Button autoFocus onClick={navigateForward}>
            Next
          </Button>
        )}
        {lastSlideActive && <Button onClick={finishSetup}>See result</Button>}
      </DialogActions>
    </Dialog>
  );
}
