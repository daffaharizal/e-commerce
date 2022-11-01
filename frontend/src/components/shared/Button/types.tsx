export interface IStyledButton {
  type?: 'button' | 'submit' | 'reset';
  className: string;
  onClick?: () => void;
}
