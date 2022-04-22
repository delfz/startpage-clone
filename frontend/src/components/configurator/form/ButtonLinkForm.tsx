import React, { FC, useEffect, useState } from 'react';
import { ImArrowLeft2 } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';
import { LayoutBlock, LayoutBlockTypes } from '../../../StartPageContext';
import { isValidHttpUrl } from '../../Helpers';
import LinkInput from './LinkInput';

type Props = {
  handleBackClick: React.MouseEventHandler<HTMLDivElement>;
  handleDataSync: Function;
  blockData?: LayoutBlock;
};

const ButtonLinkForm: FC<Props> = (props) => {
  const [uuid, setUuid] = useState(
    props.blockData ? props.blockData.id : uuidv4()
  );
  const [label, setLabel] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (props.blockData == null) {
      return;
    }
    const attrib = props.blockData.attributes;

    setLabel(attrib.label);
    setLink(attrib.uri);
  }, []);

  const shouldSyncData = (): boolean => {
    if (props.blockData != null) {
      const shouldSync =
        (isValidHttpUrl(link) && props.blockData.attributes['uri'] != link) ||
        props.blockData.attributes['label'] != label;

      if (shouldSync) {
        // sync the passed blockData so we can track the changes
        props.blockData.attributes['label'] = label;
        props.blockData.attributes['uri'] = link;
      }

      return shouldSync;
    }

    return (link.length > 0 && isValidHttpUrl(link)) || label.length > 0;
  };

  const assembleData = () => {
    if (!shouldSyncData()) return;

    props.handleDataSync({
      id: uuid,
      type: LayoutBlockTypes.BUTTON_LINK,
      visible: true,
      attributes: {
        label: label,
        uri: link,
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
        <ImArrowLeft2 /> <p className="">Add Link</p>
      </div>

      <div className="border border-gray-400 rounded p-4 bg-white space-y-4">
        <div className="space-y-3">
          <p className="font-semibold">Label</p>
          <input
            type="text"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            onBlur={assembleData}
            className="w-full rounded border border-gray-400 px-2 py-1.5"
          />
        </div>

        <div className="space-y-3">
          <p className="font-semibold">Link</p>

          <LinkInput
            value={link}
            onChange={(event) => setLink(event.target.value)}
            onBlur={assembleData}
          />
        </div>
      </div>
    </div>
  );
};

export default ButtonLinkForm;
