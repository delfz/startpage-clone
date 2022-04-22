import React, { FC } from 'react';
import { IconType } from 'react-icons';

type Props = {
  label: string;
  icon: IconType;
  isSelected: boolean;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
};

const ToobarTab: FC<Props> = (props) => {
  return (
    <button
      onClick={props.handleClick}
      className={
        'px-0.5 py-5 w-full flex flex-col items-center gap-1.5 text-xs ' +
        (props.isSelected ? 'bg-gray-100' : 'hover:bg-gray-100')
      }
    >
      {React.createElement(props.icon, { className: 'text-md' })}
      {props.label}
    </button>
  );
};

export default ToobarTab;
