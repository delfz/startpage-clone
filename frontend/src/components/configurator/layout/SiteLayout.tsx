import React, { FC, useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LayoutBlock, useStartPage } from '../../../StartPageContext';
import ButtonLinkForm from '../form/ButtonLinkForm';
import ImageLinkForm from '../form/ImageLinkForm';
import ProfileForm from '../form/ProfileForm';
import SpotifyForm from '../form/SpotifyForm';
import SubHeadingForm from '../form/SubHeadingForm';
import TextForm from '../form/TextForm';
import YoutubeForm from '../form/YoutubeForm';
import SiteLayoutBlock from './SiteLayoutBlock';

const SiteLayout: FC = () => {
  const [startPagelayout, StartPageService] = useStartPage();

  const [isInEditMode, setIsInEditMode] = useState(false);
  const [blockTypeToEdit, setBlockTypeToEdit] = useState('');
  const [idxToEdit, setIdxToEdit] = useState(-1);

  const formBackClick = useCallback(() => {
    setIsInEditMode(false);
    setBlockTypeToEdit('');
    setIdxToEdit(-1);
  }, []);

  const handleBlockSync = useCallback((data: LayoutBlock) => {
    StartPageService.syncBlock(data);
  }, []);

  return isInEditMode ? (
    <div>
      {
        {
          profile: (
            <ProfileForm
              handleBackClick={formBackClick}
              handleDataSync={handleBlockSync}
              blockData={startPagelayout[idxToEdit]}
            />
          ),
          // social_links: (
          //   <TextForm
          //     handleBackClick={formBackClick}
          //     handleDataSync={handleBlockSync}
          //   />
          // ),
          sub_heading: (
            <SubHeadingForm
              handleBackClick={formBackClick}
              handleDataSync={handleBlockSync}
              blockData={startPagelayout[idxToEdit]}
            />
          ),
          text: (
            <TextForm
              handleBackClick={formBackClick}
              handleDataSync={handleBlockSync}
              blockData={startPagelayout[idxToEdit]}
            />
          ),
          image_link: (
            <ImageLinkForm
              handleBackClick={formBackClick}
              handleDataSync={handleBlockSync}
              blockData={startPagelayout[idxToEdit]}
            />
          ),
          button_link: (
            <ButtonLinkForm
              handleBackClick={formBackClick}
              handleDataSync={handleBlockSync}
              blockData={startPagelayout[idxToEdit]}
            />
          ),
          youtube: (
            <YoutubeForm
              handleBackClick={formBackClick}
              handleDataSync={handleBlockSync}
              blockData={startPagelayout[idxToEdit]}
            />
          ),
          spotify: (
            <SpotifyForm
              handleBackClick={formBackClick}
              handleDataSync={handleBlockSync}
              blockData={startPagelayout[idxToEdit]}
            />
          ),
        }[blockTypeToEdit]
      }
    </div>
  ) : (
    <div className="space-y-5">
      <p className="font-extrabold text-base">Your Site Layout</p>

      <DndProvider backend={HTML5Backend}>
        <div className="space-y-3 overflow-y-auto">
          {startPagelayout.map((layout, index) => (
            <SiteLayoutBlock
              key={index}
              id={layout.id}
              idx={index}
              type={layout.type}
              label={layout.attributes.content || layout.attributes.label}
              handleClick={(blockType: string, idx: number) => {
                setBlockTypeToEdit(blockType);
                setIdxToEdit(idx);
                setIsInEditMode(true);
              }}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default SiteLayout;
