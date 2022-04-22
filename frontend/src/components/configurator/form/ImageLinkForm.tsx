import React, { FC, useEffect, useState } from 'react';
import { ImArrowLeft2 } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';
import { LayoutBlock, LayoutBlockTypes } from '../../../StartPageContext';
import { isValidHttpUrl } from '../../Helpers';
import { SmallSquircleIcon } from '../SquircleIcon';
import FileUploadButton from './FileUploadButton';
import LinkInput from './LinkInput';

type Props = {
  handleBackClick: React.MouseEventHandler<HTMLDivElement>;
  handleDataSync: Function;
  blockData?: LayoutBlock;
};

const ImageLinkForm: FC<Props> = (props) => {
  const [uuid, setUuid] = useState(
    props.blockData ? props.blockData.id : uuidv4()
  );

  const [base64Img, setBase64Img] = useState('');
  const [imgCaption, setImgCaption] = useState('');
  const [imgAltText, setImgAltText] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (props.blockData == null) return;

    const attrib = props.blockData.attributes;

    setBase64Img(attrib.image);
    setImgCaption(attrib.imageCaption);
    setImgAltText(attrib.altText);
    setLink(attrib.uri);
  }, []);

  const shouldSyncData = (): boolean => {
    if (props.blockData != null) {
      const attrib = props.blockData.attributes;

      const shouldSync =
        (isValidHttpUrl(link) && attrib['uri'] != link) ||
        attrib['image'] != base64Img ||
        attrib['imageCaption'] != imgCaption ||
        attrib['altText'] != imgAltText;

      if (shouldSync) {
        // sync the passed blockData so we can track the changes
        attrib['uri'] = link;
        attrib['image'] = base64Img;
        attrib['imageCaption'] = imgCaption;
        attrib['altText'] = imgAltText;
      }

      return shouldSync;
    }

    return base64Img.length > 0 && isValidHttpUrl(link);
  };

  const assembleData = () => {
    if (!shouldSyncData()) return;

    props.handleDataSync({
      id: uuid,
      type: LayoutBlockTypes.IMAGE_LINK,
      visible: true,
      attributes: {
        image: base64Img,
        imageCaption: imgCaption,
        altText: imgAltText,
        uri: link,
      },
      meta: {},
    });
  };

  const onFileUpload = (file: File) => {
    // https://stackoverflow.com/a/53129416
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      if (!evt.target) return;

      setBase64Img(evt.target.result + '');
    };

    reader.onerror = (error) => {
      // TODO: add toast for error notif
      console.log('Error: ', error);
    };
  };

  return (
    <div className="space-y-5">
      <div
        className="flex gap-1 items-center cursor-pointer font-semibold"
        onClick={props.handleBackClick}
      >
        <ImArrowLeft2 /> <p className="">Add Image</p>
      </div>
      {/* image upload */}
      <div className="flex gap-2">
        {base64Img.length == 0 ? (
          <SmallSquircleIcon type="camera" />
        ) : (
          <img src={base64Img} className="object-cover w-12 h-10 rounded-lg" />
        )}

        <FileUploadButton handleFileUpload={onFileUpload} />
      </div>
      {/* endof image upload */}

      {/* tip */}
      <div className="flex gap-2 items-center justify-center text-xs">
        <span className="bg-yellow-300 px-1 py-0.5 font-semibold">Tip</span>
        Use GIFs to make your page pop ✨
      </div>
      {/* endof tip */}

      {/* image text set */}
      <div className="border border-gray-400 rounded p-4 bg-white space-y-4">
        <div className="space-y-3">
          <p className="font-semibold">Image Caption</p>
          <textarea
            value={imgCaption}
            onChange={(event) => setImgCaption(event.target.value)}
            onBlur={assembleData}
            rows={3}
            className="w-full rounded-lg border border-gray-400 resize-none px-2 py-1.5"
          ></textarea>
        </div>

        <div className="space-y-3">
          <p className="font-semibold">Link</p>
          <LinkInput
            value={link}
            onChange={(event) => setLink(event.target.value)}
            onBlur={assembleData}
          />
        </div>

        <div className="space-y-3">
          <p className="font-semibold">Alt Text</p>
          <input
            type="text"
            value={imgAltText}
            onChange={(event) => setImgAltText(event.target.value)}
            onBlur={assembleData}
            className="w-full rounded border border-gray-400 px-2 py-1.5"
          />
        </div>
      </div>
      {/* endof image text set */}
    </div>
  );
};

export default ImageLinkForm;
