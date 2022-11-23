import {
  CarouselProvider,
  DotGroup,
  Image,
  Slide,
  Slider
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import NoImage from 'assets/images/noproductimage.png';

import { IPureCarousel } from './types';

export default function PureCarousel({ images }: IPureCarousel) {
  const serverUrl: string = process.env.REACT_APP_API_ENDPOINT || '';

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={85}
      totalSlides={images.length > 0 ? images.length : 1}>
      <Slider>
        {images.map(({ name, url, isPublicUrl }, index) => (
          <Slide index={index} key={index}>
            <Image
              hasMasterSpinner
              src={isPublicUrl ? url : `${serverUrl}${url}`}
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
