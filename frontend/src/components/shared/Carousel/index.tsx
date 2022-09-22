import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  DotGroup
} from 'pure-react-carousel';

import { iPureCarousel } from './types';

import NoImage from 'assets/images/noproductimage.png';

export default function PureCarousel({ images }: iPureCarousel) {
  const serverURL: string = process.env.REACT_APP_API_ENDPOINT || '';

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={85}
      totalSlides={images.length > 0 ? images.length : 1}>
      <Slider>
        {images.map(({ name, url }, index) => (
          <Slide index={index} key={index}>
            <Image
              hasMasterSpinner
              src={`http://${serverURL}${url}`}
              alt={name}
            />
          </Slide>
        ))}
        {images.length === 0 && (
          <Slide index={0}>
            <Image hasMasterSpinner src={NoImage} alt="noimages" />
          </Slide>
        )}
      </Slider>
      <DotGroup className="text-center" dotNumbers={true} />
    </CarouselProvider>
  );
}
