import React from 'react';

import {
  MdOutlineSentimentDissatisfied,
  MdOutlineSentimentNeutral,
  MdOutlineSentimentSatisfied,
  MdOutlineSentimentVeryDissatisfied,
  MdOutlineSentimentVerySatisfied
} from 'react-icons/md';
import { Rating } from 'react-simple-star-rating';

const customIcons = [
  { icon: <MdOutlineSentimentDissatisfied size={25} /> },
  { icon: <MdOutlineSentimentNeutral size={25} /> },
  { icon: <MdOutlineSentimentSatisfied size={25} /> },
  { icon: <MdOutlineSentimentVeryDissatisfied size={25} /> },
  { icon: <MdOutlineSentimentVerySatisfied size={25} /> }
];

const fillColorArray = ['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045'];

type PropsType = {
  rate: number;
  emoji: boolean;
  readonly: boolean;
  handleClick:
    | ((
        value: number,
        index: number,
        event?: React.MouseEvent<HTMLSpanElement, MouseEvent> | undefined
      ) => void)
    | undefined;
};

export default function UserRating({
  rate = 0,
  emoji = false,
  readonly = true,
  handleClick
}: Partial<PropsType>) {
  return (
    <div className="rate">
      <Rating
        customIcons={emoji ? customIcons : []}
        initialValue={rate}
        onClick={handleClick}
        fillColorArray={fillColorArray}
        size={20}
        readonly={readonly}
      />
    </div>
  );
}
