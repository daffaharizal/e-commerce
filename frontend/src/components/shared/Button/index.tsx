import React from 'react';
import { IStyledButton } from './types';

export default function StyledButton({
  type = 'button',
  children,
  ...rest
}: IStyledButton) {
  return (
    <button type={type} {...rest}>
      {children}
    </button>
  );
}
