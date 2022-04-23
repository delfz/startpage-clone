import React, { FC, useCallback, useState } from 'react';
import { LayoutBlock, useStartPage } from '../../../StartPageContext';
import ButtonLinkForm from '../form/ButtonLinkForm';
import ImageLinkForm from '../form/ImageLinkForm';
import SpotifyForm from '../form/SpotifyForm';
import SubHeadingForm from '../form/SubHeadingForm';
import TextForm from '../form/TextForm';
import YoutubeForm from '../form/YoutubeForm';
import BlockOption from './BlockOption';

const AddBlock: FC = () => {
  const [isInCreateMode, setIsInCreateMode] = useState(false);
  const [blockTypeToAdd, setBlockTypeToAdd] = useState('');

  const blocks = [
    'button_link',
    'social_links',
    'image_link',
    'sub_heading',
    'text',
  ];

  const handleAddBlockClick = useCallback((blockType: string) => {
    setIsInCreateMode(true);
    setBlockTypeToAdd(blockType);
  }, []);

  const formBackClick = useCallback(() => {
    setIsInCreateMode(false);
    setBlockTypeToAdd('');
  }, []);

  const [startPagelayout, StartPageService] = useStartPage();

  const handleBlock = (data: LayoutBlock) => {
    StartPageService.syncBlock(data);
  };

  return isInCreateMode ? (
    <div>
      {
        {
          // social_links: (
          //   <TextForm
          //     handleBackClick={formBackClick}
          //     handleDataSync={handleBlock}
          //   />
          // ),
          sub_heading: (
            <SubHeadingForm
              handleBackClick={formBackClick}
              handleDataSync={handleBlock}
            />
          ),
          text: (
            <TextForm
              handleBackClick={formBackClick}
              handleDataSync={handleBlock}
            />
          ),
          image_link: (
            <ImageLinkForm
              handleBackClick={formBackClick}
              handleDataSync={handleBlock}
            />
          ),
          button_link: (
            <ButtonLinkForm
              handleBackClick={formBackClick}
              handleDataSync={handleBlock}
            />
          ),
          youtube: (
            <YoutubeForm
              handleBackClick={formBackClick}
              handleDataSync={handleBlock}
            />
          ),
          spotify: (
            <SpotifyForm
              handleBackClick={formBackClick}
              handleDataSync={handleBlock}
            />
          ),
        }[blockTypeToAdd]
      }
    </div>
  ) : (
    <div className="space-y-5">
      <p className="font-extrabold text-base">
        What would you like to add to your site?
      </p>

      <div className="space-y-4">
        <div className="space-y-2 px-3 py-4 rounded-lg bg-white border border-gray-300">
          <p className="font-semibold text-gray-700 pb-2">Essentials</p>

          {blocks.map((blockType, index, array) => (
            <div key={index} className="space-y-2">
              <BlockOption type={blockType} handleClick={handleAddBlockClick} />
              {index !== array.length - 1 ? <hr /> : ''}
            </div>
          ))}
        </div>

        <div className="space-y-2 px-3 py-4 rounded-lg bg-white border border-gray-300">
          <p className="font-semibold text-gray-700 pb-2">Media Embed</p>
          <BlockOption type="youtube" handleClick={handleAddBlockClick} />
          <hr />
          <BlockOption type="spotify" handleClick={handleAddBlockClick} />
        </div>
      </div>
    </div>
  );
};

export default AddBlock;
