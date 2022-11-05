import React, { PropsWithChildren } from 'react';

import { SearchPropsType } from './types';

const SearchContext = React.createContext<SearchPropsType | undefined>(
  undefined
);

const SearchProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [search, setSearch] = React.useState('');

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

const SearchConsumer = () => React.useContext(SearchContext) as SearchPropsType;

export { SearchProvider, SearchConsumer };
