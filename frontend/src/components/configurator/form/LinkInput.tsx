import React, { FC, useState } from 'react';
import { ImNewTab } from 'react-icons/im';
import { isValidHttpUrl } from '../../Helpers';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>
};

const LinkInput: FC<Props> = (props) => {
  return (
    <div className="relative">
      <input
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        type="text"
        className="w-full rounded border border-gray-400 px-2 py-1.5 pr-8"
      />

      <a
        href={isValidHttpUrl(props.value) ? props.value : '#'}
        target={isValidHttpUrl(props.value) ? '_blank' : ''}
        className="absolute right-2 top-2 text-lg"
      >
        <ImNewTab />
      </a>
    </div>
  );
};

export default LinkInput;
