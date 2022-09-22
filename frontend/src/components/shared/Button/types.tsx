export interface IStyledButton {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactElement | string;
  className: string;
}
