import React from 'react';

import { BsSearch } from 'react-icons/bs';

type PropsType = {
  defaultValue: string;
  onSubmit(value: string): void;
};

export default function SearchInput({ defaultValue, onSubmit }: PropsType) {
  const ref = React.useRef<HTMLInputElement>(null);
  const [search, setSearch] = React.useState(defaultValue);

  const handleSubmit = () => {
    if (!search.trim()) {
      ref.current?.focus();
      return;
    }
    onSubmit(search.trim());
  };

  return (
    <div className="input-group">
      <input
        ref={ref}
        autoFocus
        className="form-control rounded-pill"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <span className="input-group-append ps-2">
        <button
          type="button"
          className="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-n3"
          onClick={handleSubmit}>
          <BsSearch size={24} />
        </button>
      </span>
    </div>
  );
}
