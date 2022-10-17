import React from 'react';
import { Rating } from 'react-simple-star-rating';

import { IUserRatingProps } from './types';

import {
  MdOutlineSentimentDissatisfied,
  MdOutlineSentimentNeutral,
  MdOutlineSentimentSatisfied,
  MdOutlineSentimentVeryDissatisfied,
  MdOutlineSentimentVerySatisfied
} from 'react-icons/md';

const customIcons = [
  { icon: <MdOutlineSentimentDissatisfied size={25} /> },
  { icon: <MdOutlineSentimentNeutral size={25} /> },
  { icon: <MdOutlineSentimentSatisfied size={25} /> },
  { icon: <MdOutlineSentimentVeryDissatisfied size={25} /> },
  { icon: <MdOutlineSentimentVerySatisfied size={25} /> }
];

const fillColorArray = ['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045'];

export default function UserRating({
  rate = 0,
  emoji = false,
  readonly = true,
  setRating
}: IUserRatingProps) {
  const handleRating = (value: number) => {
    setRating && setRating(value);
  };

  return (
    <div className="rate">
      <Rating
        customIcons={emoji ? customIcons : []}
        initialValue={rate}
        onClick={handleRating}
        fillColorArray={fillColorArray}
        size={20}
        readonly={readonly}
      />
    </div>
  );
}
