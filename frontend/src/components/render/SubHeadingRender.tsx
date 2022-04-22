import React, { FC } from 'react';
import { LayoutBlock } from '../../StartPageContext';

type Props = {
  blockData: LayoutBlock;
};

const SubHeadingRender: FC<Props> = (props) => {
  return (
    <a
      href={props.blockData.attributes.uri}
      className="w-full block px-5 py-12 rounded bg-white text-center text-4xl font-bold text-black"
    >
      {props.blockData.attributes.content}
    </a>
  );
};

export default SubHeadingRender;
