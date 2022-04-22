import React, { FC, useEffect, useState } from 'react';
import { ImArrowLeft2 } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';
import { LayoutBlock, LayoutBlockTypes } from '../../../StartPageContext';
import { SmallSquircleIcon } from '../SquircleIcon';
import FileUploadButton from './FileUploadButton';

type Props = {
  handleBackClick: React.MouseEventHandler<HTMLDivElement>;
  handleDataSync: Function;
  blockData: LayoutBlock;
};

const ProfileForm: FC<Props> = (props) => {
  const [uuid, setUuid] = useState(
    props.blockData ? props.blockData.id : uuidv4()
  );

  const [base64ProfileImg, setBase64ProfileImg] = useState(
    props.blockData ? props.blockData.attributes.logoImage : ''
  );
  const [profileImgAltText, setProfileImgAltText] = useState(
    props.blockData ? props.blockData.attributes.logoAltText : ''
  );

  const [headerName, setHeaderName] = useState(
    props.blockData ? props.blockData.attributes.headerName : ''
  );
  const [headerDescription, setHeaderDescription] = useState(
    props.blockData ? props.blockData.attributes.headerDescription : ''
  );

  const [base64BannerImg, setBase64BannerImg] = useState(
    props.blockData ? props.blockData.attributes.bannerImage : ''
  );

  useEffect(() => {
    // need to call this since the file upload has no onBlur
    assembleData();
  }, [base64ProfileImg, base64BannerImg]);

  const shouldSyncData = (): boolean => {
    if (props.blockData == null) return false;

    const attrib = props.blockData.attributes;

    const shouldSync =
      attrib['logoImage'] != base64ProfileImg ||
      attrib['logoAltText'] != profileImgAltText ||
      attrib['bannerImage'] != base64BannerImg ||
      attrib['headerName'] != headerName ||
      attrib['headerDescription'] != headerDescription;

    if (shouldSync) {
      // sync the passed blockData so we can track the changes
      attrib['logoImage'] = base64ProfileImg;
      attrib['logoAltText'] = profileImgAltText;
      attrib['bannerImage'] = base64BannerImg;
      attrib['headerName'] = headerName;
      attrib['headerDescription'] = headerDescription;
    }

    return shouldSync;
  };

  const assembleData = () => {
    if (!shouldSyncData()) return;
    console.log('asdasadasdasds');

    props.handleDataSync({
      id: uuid,
      type: LayoutBlockTypes.PROFILE,
      visible: true,
      attributes: {
        logoImage: base64ProfileImg,
        logoAltText: profileImgAltText,
        bannerImage: base64BannerImg,
        headerName: headerName,
        headerDescription: headerDescription,
        format: 'BANNER_CENTERED',
      },
      meta: {},
    });
  };

  const onFileUpload = (
    file: File,
    onLoadHandler: (base64Img: string) => void
  ) => {
    // https://stackoverflow.com/a/53129416
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      if (!evt.target) return;

      onLoadHandler(evt.target.result + '');
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
        <ImArrowLeft2 /> <p className="">Edit Header</p>
      </div>

      {/* profile image upload */}
      <div className="space-y-2">
        <p>Logo or personal photo</p>

        <div className="border border-gray-400 rounded p-4 bg-white space-y-4">
          <div className="flex gap-2">
            {base64ProfileImg.length == 0 ? (
              <SmallSquircleIcon type="camera" />
            ) : (
              <img
                src={base64ProfileImg}
                className="object-cover w-12 h-10 rounded-lg"
              />
            )}
            <FileUploadButton
              handleFileUpload={(file) => {
                onFileUpload(file, (base64Img: string) => {
                  setBase64ProfileImg(base64Img);
                });
              }}
            />
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Alt Text</p>

            <input
              type="text"
              value={profileImgAltText}
              onChange={(event) => setProfileImgAltText(event.target.value)}
              onBlur={assembleData}
              className="w-full rounded border border-gray-400 px-2 py-1.5"
            />
          </div>
        </div>
      </div>
      {/* endof profile image upload */}

      {/* header name */}
      <div className="border border-gray-400 rounded p-4 bg-white space-y-4">
        <div className="space-y-2">
          <p className="font-semibold">Your business or personal name</p>
          <textarea
            value={headerName}
            onChange={(event) => setHeaderName(event.target.value)}
            onBlur={assembleData}
            rows={3}
            className="w-full rounded-lg border border-gray-400 resize-none px-2 py-1.5"
          ></textarea>
        </div>
      </div>
      {/* endof header name */}

      {/* header desc */}
      <div className="border border-gray-400 rounded p-4 bg-white space-y-2">
        <p className="font-semibold">A few words about you or your business</p>
        <textarea
          value={headerDescription}
          onChange={(event) => setHeaderDescription(event.target.value)}
          onBlur={assembleData}
          rows={3}
          className="w-full rounded-lg border border-gray-400 resize-none px-2 py-1.5"
        ></textarea>
      </div>
      {/* endof header desc */}

      {/* banner image upload */}
      <div className="space-y-2">
        <p>Header Format</p>

        <div className="border border-gray-400 rounded p-4 bg-white space-y-2">
          <p className="font-semibold">Background image</p>
          <div className="flex gap-2">
            {base64BannerImg.length == 0 ? (
              <SmallSquircleIcon type="camera" />
            ) : (
              <>
                <img
                  src={base64BannerImg}
                  className="object-cover w-12 h-10 rounded-lg"
                />
              </>
            )}

            <FileUploadButton
              handleFileUpload={(file) => {
                onFileUpload(file, (base64Img: string) => {
                  setBase64BannerImg(base64Img);
                });
              }}
            />
          </div>
        </div>
      </div>
      {/* endof banner image upload */}
    </div>
  );
};

export default ProfileForm;
