import React from 'react';
import { iStyledButton } from './types';

export default function StyledButton({
  type = 'button',
  children,
  ...rest
}: iStyledButton) {
  return (
    <button type={type} {...rest}>
      {children}
    </button>
  );
}
