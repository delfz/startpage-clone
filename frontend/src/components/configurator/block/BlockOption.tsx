import React, { FC } from 'react';
import { LayoutBlockTypes } from '../../../StartPageContext';
import { LargeSquircleIcon } from '../SquircleIcon';

type Props = {
  type: string;
  handleClick: Function;
};

const BlockOption: FC<Props> = (props) => {
  let labelText = '';

  switch (props.type) {
    case LayoutBlockTypes.BUTTON_LINK:
      labelText = 'Links for everything';
      break;
    case LayoutBlockTypes.SOCIAL_LINKS:
      labelText = 'Ideal for multiple social channels';
      break;
    case LayoutBlockTypes.IMAGE_LINK:
      labelText = 'Links for everything';
      break;
    case LayoutBlockTypes.SUB_HEADING:
      labelText = 'Break up your page and add structure';
      break;
    case LayoutBlockTypes.TEXT:
      labelText = 'A line or two to spill the beans';
      break;
    case LayoutBlockTypes.YOUTUBE:
      labelText = 'Say it with motion';
      break;
    case LayoutBlockTypes.SPOTIFY:
      labelText = 'Embed your favorite music';
      break;
  }

  return (
    <div
      className="flex bg-white gap-2 cursor-pointer"
      onClick={() => props.handleClick(props.type)}
    >
      <LargeSquircleIcon type={props.type} />

      <div className="p-2 text-sm">
        <p className="font-semibold capitalize">
          {props.type.replace('_', ' ')}
        </p>

        <p className="font-light text-gray-500 overflow-hidden overflow-ellipsis">
          {labelText}
        </p>
      </div>
    </div>
  );
};

export default BlockOption;
