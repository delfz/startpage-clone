import React, { FC } from 'react';
import { LayoutBlock } from '../../StartPageContext';

type Props = {
  blockData: LayoutBlock;
};

const ProfileRender: FC<Props> = (props) => {
  return (
    <div
      className="w-full h-[34rem] text-center flex flex-col gap-6 justify-center items-center text-white px-6 bg-no-repeat bg-cover bg-blend-multiply bg-black bg-opacity-40"
      style={{
        backgroundImage: `url(${props.blockData.attributes.bannerImage})`,
      }}
    >
      <img
        src={props.blockData.attributes.logoImage}
        alt={props.blockData.attributes.logoAltText}
        className="rounded-full w-24 h-24 object-cover"
      />
      <p className="text-5xl font-extrabold">
        {props.blockData.attributes.headerName}
      </p>
      <p className="text-2xl font-bold">
        {props.blockData.attributes.headerDescription}
      </p>
    </div>
  );
};

export default ProfileRender;
