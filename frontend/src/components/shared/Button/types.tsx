export interface iStyledButton {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactElement | string;
  className: string;
}
