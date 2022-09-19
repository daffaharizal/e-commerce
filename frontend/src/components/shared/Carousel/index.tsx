import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  DotGroup
} from 'pure-react-carousel';

import { iPureCarousel } from './types';

export default function PureCarousel({ element }: iPureCarousel) {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={85}
      totalSlides={2}>
      <Slider>
        <Slide index={0}>
          <Image hasMasterSpinner src={element.image} />
        </Slide>
        <Slide index={1}>
          <Image hasMasterSpinner src={element.image} />
        </Slide>
      </Slider>
      <DotGroup className="text-center" dotNumbers={true} />
    </CarouselProvider>
  );
}
