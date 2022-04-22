import React, { FC } from 'react';
import { LayoutBlock } from '../../StartPageContext';

type Props = {
  blockData: LayoutBlock;
};

const ButtonLinkRender: FC<Props> = (props) => {
  return (
    <a
      href={props.blockData.attributes.uri}
      className="w-full block px-5 py-6 rounded bg-orange-500 text-center text-white"
    >
      {props.blockData.attributes.label}
    </a>
  );
};

export default ButtonLinkRender;
