import React, { useEffect } from 'react';
import { ImCopy } from 'react-icons/im';
import { LayoutBlock, useStartPage } from '../../StartPageContext';
import ButtonLinkRender from './ButtonLinkRender';
import ImageLinkRender from './ImageLinkRender';
import ProfileRender from './ProfileRender';
import SubHeadingRender from './SubHeadingRender';
import TextRender from './TextRender';

type Props = {};

const RenderArea = (props: Props) => {
  const [startPagelayout, StartPageService] = useStartPage();
  // console.log({ startPagelayout, StartPageService });
  // console.log(StartPageService.test());

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="bg-white w-full flex justify-between py-2.5 px-2">
        <div className="flex gap-2 items-center pl-4">
          {/* there is a slight instance where startPagelayout is empty */}
          {startPagelayout.length > 0 ? (
            <img
              src={startPagelayout[0].attributes.logoImage}
              alt={startPagelayout[0].attributes.logoAltText}
              className="rounded-full w-8 h-8 object-cover"
            />
          ) : (
            <></>
          )}

          <p className="font-bold text-gray-600">skeezix.start.page</p>
        </div>

        <div className="flex gap-2 items-center">
          <button className="flex gap-1.5 items-center py-2 px-4 border border-gray-400 rounded">
            <ImCopy /> Copy Link
          </button>
          <button className="py-2 px-4 border border-gray-400 rounded bg-blue-700 text-white">
            Publish Changes
          </button>
        </div>
      </div>

      <div className="h-full overflow-auto w-[26rem] mx-24 my-8 p-3.5 rounded-lg bg-black space-y-4">
        {startPagelayout
          .filter((block: LayoutBlock) => block.visible)
          .map((block: LayoutBlock, idx: number) => {
            return {
              header: <></>,
              social_links: <></>,
              profile: <ProfileRender key={idx} blockData={block} />,
              sub_heading: <SubHeadingRender key={idx} blockData={block} />,
              text: <TextRender key={idx} blockData={block} />,
              image_link: <ImageLinkRender key={idx} blockData={block} />,
              button_link: <ButtonLinkRender key={idx} blockData={block} />,
              youtube: <></>,
              spotify: <></>,
            }[block.type];
          })}
      </div>
    </div>
  );
};

export default RenderArea;
