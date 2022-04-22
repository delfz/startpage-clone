import React, { FC, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ImMenu2 } from 'react-icons/im';
import { LayoutBlockTypes, useStartPage } from '../../../StartPageContext';
import { SmallSquircleIcon } from '../SquircleIcon';

type Props = {
  id: string;
  idx: number;
  type: string;
  label: string;
  handleClick: Function;
};

type SiteLayoutBlockDragItem = {
  id: string;
  idx: number;
};

const SiteLayoutBlock: FC<Props> = (props) => {
  const [, StartPageService] = useStartPage();
  // there are stuff (dragging) that are removed for Profile Block
  const isNotProfileBlock = props.type !== LayoutBlockTypes.PROFILE;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'SiteLayoutBlock',
    item: { id: props.id, idx: props.idx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: 'SiteLayoutBlock',
    hover: (item: SiteLayoutBlockDragItem, monitor) => {
      // we move the block as it moves
      if (item.idx !== props.idx) {
        // console.log(`move from ${item.idx} to ${props.idx}`);
        // move item being dragged to this drop
        StartPageService.moveBlock(item.id, props.idx);
      }
    },
    drop: (item, monitor) => {
      StartPageService.finalizeMoveBlock(item.id, props.idx);
    },
  });

  const renderLabel = () => {
    switch (props.type) {
      case LayoutBlockTypes.PROFILE:
        return <span className="font-semibold">Profile Image / Logo</span>;
      case LayoutBlockTypes.IMAGE_LINK:
      case LayoutBlockTypes.SOCIAL_LINKS:
      case LayoutBlockTypes.YOUTUBE:
      case LayoutBlockTypes.SPOTIFY:
        return (
          <span className="font-semibold capitalize">
            {props.type.replace('_', ' ')}
          </span>
        );
      case LayoutBlockTypes.BUTTON_LINK:
        return (
          <div className="flex-grow flex items-center whitespace-nowrap overflow-hidden">
            <span className="font-semibold capitalize">
              {props.type.replace('_', ' ')}
            </span>

            <span className="font-light text-gray-500 overflow-hidden overflow-ellipsis">
              : {props.label}
            </span>
          </div>
        );
      case LayoutBlockTypes.SUB_HEADING:
      case LayoutBlockTypes.TEXT:
        return (
          <div className="flex-grow flex items-center whitespace-nowrap overflow-hidden">
            <span className="font-semibold capitalize">
              {props.type.replace('_', ' ')}
            </span>

            <span className="font-light text-gray-500 overflow-hidden overflow-ellipsis">
              : {props.label}
            </span>
          </div>
        );
    }
  };

  return (
    <div
      ref={(node) => (isNotProfileBlock ? drag(drop(node)) : '')}
      className={
        'flex gap-3 items-center bg-white rounded-md px-5 py-3 shadow-xs border-2 text-sm w-full ' +
        (isNotProfileBlock
          ? isDragging
            ? 'cursor-grabbing'
            : 'cursor-grab'
          : '')
      }
      onClick={() => {
        props.handleClick(props.type, props.idx);
      }}
    >
      <div className="">
        <ImMenu2 className="text-xl text-gray-500" />
      </div>

      <SmallSquircleIcon type={props.type} />

      {renderLabel()}
    </div>
  );
};

export default SiteLayoutBlock;
