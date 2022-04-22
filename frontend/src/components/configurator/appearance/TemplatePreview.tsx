import React, { FC, useState } from 'react';

type Props = {
  style: {
    bg_color: string;
    border: string;
    profile: { border: string };
    button: { bg_color: string };
    text: { bg_color: string };
  };
};

const TemplatePreview: FC<Props> = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div
      className={
        'p-0.5 border-4 rounded-xl ' +
        (isSelected ? 'border-blue-300' : 'border-white')
      }
      onClick={() => setIsSelected((prevIsSelected) => !prevIsSelected)}
    >
      <div
        className={[
          'w-[68px] h-28 rounded-lg flex flex-col items-center gap-2 p-2',
          props.style.bg_color,
          props.style.border,
        ].join(' ')}
      >
        <div
          className={
            'w-[14px] h-4 rounded-full bg-white ' + props.style.profile.border
          }
        ></div>
        <div
          className={'w-full h-3 rounded ' + props.style.button.bg_color}
        ></div>
        <div
          className={'w-full h-16 rounded ' + props.style.text.bg_color}
        ></div>
      </div>
    </div>
  );
};

export default TemplatePreview;
