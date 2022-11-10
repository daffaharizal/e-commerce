export interface IUserRatingProps {
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
}
