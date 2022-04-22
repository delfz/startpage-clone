import React, { FC } from 'react';
import {
  ImBold,
  ImCamera,
  ImImage,
  ImSphere,
  ImSpotify,
  ImTextColor,
  ImUser,
  ImYoutube,
} from 'react-icons/im';
import { MdOutlineSmartButton } from 'react-icons/md';
import { LayoutBlockTypes } from '../../StartPageContext';

type Props = {
  type: string;
  paddingX: string;
  paddingY: string;
  image?: string;
};

const SquircleIcon: FC<Props> = (props) => {
  const bgClass = `${props.paddingX} ${props.paddingY} rounded-lg bg-opacity-55 flex items-center justify-center `;

  switch (props.type) {
    case 'camera':
      return (
        <div className={bgClass + 'bg-gray-200'}>
          <ImCamera className="text-black" />
        </div>
      );
    case LayoutBlockTypes.PROFILE:
      return (
        <div className={bgClass + 'bg-gray-200'}>
          <ImUser className="text-black" />
        </div>
      );
    case LayoutBlockTypes.IMAGE_LINK:
      return (
        <div className={bgClass + 'bg-orange-200'}>
          <ImImage className="text-black" />
        </div>
      );

    case LayoutBlockTypes.BUTTON_LINK:
      return (
        <div className={bgClass + 'bg-orange-200'}>
          <MdOutlineSmartButton className="text-orange-600" />
        </div>
      );
    case LayoutBlockTypes.SOCIAL_LINKS:
      // "type": "social_link_instagram",
      return (
        <div className={bgClass + 'bg-blue-200'}>
          <ImSphere className="text-blue-800" />
        </div>
      );
    case LayoutBlockTypes.SUB_HEADING:
      return (
        <div className={bgClass + 'bg-green-200'}>
          <ImBold className="text-green-800" />
        </div>
      );
    case LayoutBlockTypes.TEXT:
      return (
        <div className={bgClass + 'bg-purple-200'}>
          <ImTextColor className="text-purple-800" />
        </div>
      );
    case LayoutBlockTypes.YOUTUBE:
      return (
        <div className={bgClass + 'bg-red-200'}>
          <ImYoutube className="text-red-700" />
        </div>
      );
    case LayoutBlockTypes.SPOTIFY:
      return (
        <div className={bgClass + 'bg-green-200'}>
          <ImSpotify className="text-green-800" />
        </div>
      );
    default:
      return <div></div>;
  }
};

export const SmallSquircleIcon = ({ type }: { type: string }) => {
  return <SquircleIcon type={type} paddingX="px-3" paddingY="py-3" />;
};

export const LargeSquircleIcon = ({ type }: { type: string }) => {
  return <SquircleIcon type={type} paddingX="px-5" paddingY="py-5" />;
};
