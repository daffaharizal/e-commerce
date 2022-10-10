import React from 'react';
import { IStyledButton } from './types';

export default function StyledButton({
  type = 'button',
  onClick,
  children,
  ...rest
}: IStyledButton) {
  return (
    <button type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
