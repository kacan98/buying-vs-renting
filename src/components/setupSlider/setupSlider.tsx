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

  const slides: {
    title?: string;
    description?: string;
    key: string | number;
    element: JSX.Element;
  }[] = [
    { element: <IntroBlock />, key: "IntroBlock" },
    {
      element: <BuyingInputs />,
      key: 3,
      title: t("Buying"),
      description: t("Please fill in the details of a property to buy", {
        buyOrRent: "Buy",
      }),
    },
    {
      element: <RentingInputs />,
      key: 2,
      title: t("Renting"),
      description: t("Please fill in the details of a property to rent", {
        buyOrRent: "Rent",
      }),
    },
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
            <SlideWrapper
              title={s.title}
              key={s.key}
              description={s.description}
            >
              {s.element}
            </SlideWrapper>
          ))}
        </Slider>
      </DialogContent>
      <DialogActions>
        {!firstSlideActive && (
          <Button color={"info"} onClick={navigateBackward}>
            Previous
          </Button>
        )}
        {!lastSlideActive && (
          <Button
            color={"info"}
            variant="outlined"
            autoFocus
            onClick={navigateForward}
          >
            Next
          </Button>
        )}
        {lastSlideActive && (
          <Button color={"info"} variant="outlined" onClick={finishSetup}>
            See result
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
