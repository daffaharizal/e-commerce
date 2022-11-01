import React, { PropsWithChildren } from 'react';
import { IStyledButton } from './types';

const StyledButton: React.FC<PropsWithChildren & IStyledButton> = ({
  type = 'button',
  onClick,
  children,
  ...rest
}) => {
  return (
    <button type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default StyledButton;
