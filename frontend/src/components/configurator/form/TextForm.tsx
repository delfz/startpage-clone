import React, { FC, useEffect, useState } from 'react';
import { ImArrowLeft2 } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';
import { LayoutBlock, LayoutBlockTypes } from '../../../StartPageContext';

type Props = {
  handleBackClick: React.MouseEventHandler<HTMLDivElement>;
  handleDataSync: Function;
  blockData?: LayoutBlock;
};

const TextForm: FC<Props> = (props) => {
  const [uuid, setUuid] = useState(
    props.blockData ? props.blockData.id : uuidv4()
  );
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    if (props.blockData == null) {
      return;
    }
    const attrib = props.blockData.attributes;

    setTextContent(attrib.content);
  }, []);

  const shouldSyncData = (): boolean => {
    if (props.blockData != null) {
      const shouldSync = props.blockData.attributes['content'] != textContent;

      if (shouldSync) {
        // sync the passed blockData so we can track the changes
        props.blockData.attributes['content'] = textContent;
      }

      return shouldSync;
    }

    return !!textContent;
  };

  const assembleData = () => {
    if (!shouldSyncData()) return;

    props.handleDataSync({
      id: uuid,
      type: LayoutBlockTypes.TEXT,
      visible: true,
      attributes: {
        content: textContent,
      },
      meta: {},
    });
  };

  return (
    <div className="space-y-5">
      <div
        className="flex gap-1 items-center cursor-pointer font-semibold"
        onClick={props.handleBackClick}
      >
        <ImArrowLeft2 /> <p className="">Add Text</p>
      </div>

      <div className="border border-gray-400 rounded p-4 bg-white space-y-3">
        <p className="font-semibold">Text</p>

        <textarea
          value={textContent}
          onChange={(event) => setTextContent(event.target.value)}
          onBlur={assembleData}
          rows={5}
          className="w-full rounded-lg border border-gray-400 resize-none px-2 py-1.5"
        ></textarea>
      </div>
    </div>
  );
};

export default TextForm;
