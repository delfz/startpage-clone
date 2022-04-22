import React, { FC } from 'react';
import { LayoutBlock } from '../../StartPageContext';

type Props = {
  blockData: LayoutBlock;
};

const ImageLinkRender: FC<Props> = (props) => {
  return (
    <a
      href={props.blockData.attributes.uri}
      className="w-full block rounded text-center bg-white text-black"
    >
      <img
        src={props.blockData.attributes.image}
        alt={props.blockData.attributes.altText}
        className="object-cover w-full"
      />
      {props.blockData.attributes.imageCaption ? (
        <p className="px-5 py-3">{props.blockData.attributes.imageCaption}</p>
      ) : (
        <></>
      )}
    </a>
  );
};

export default ImageLinkRender;
