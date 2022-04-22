import React, { FC } from 'react';
import { LayoutBlock } from '../../StartPageContext';

type Props = {
  blockData: LayoutBlock;
};

const TextRender: FC<Props> = (props) => {
  return (
    <a
      href={props.blockData.attributes.uri}
      className="w-full block px-5 py-6 rounded bg-white text-center text-black"
    >
      {props.blockData.attributes.content}
    </a>
  );
};

export default TextRender;
