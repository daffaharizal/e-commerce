import React from 'react';

import CreatableSelect from 'react-select/creatable';

import { IReactSelectOption } from 'types';

type Props = {
  options: IReactSelectOption[];
  handleCreate: (label: string) => void;
  handleChange: (value: IReactSelectOption | null) => void;
};

export default function SelectInput({
  options,
  handleCreate,
  handleChange
}: Props) {
  return (
    <>
      <CreatableSelect
        isClearable={false}
        isDisabled={false}
        isLoading={false}
        onChange={(newValue) => {
          handleChange(newValue);
        }}
        onCreateOption={handleCreate}
        options={options}
        value={null}
      />
    </>
  );
}
