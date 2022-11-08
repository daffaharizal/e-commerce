import React from 'react';

export default function usePreviousValue<T>(value: T) {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
