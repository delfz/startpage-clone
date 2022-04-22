import React, { FC, useState } from 'react';
import TemplatePreview from './TemplatePreview';

const Appearance: FC = () => {
  const styles = [
    {
      bg_color: 'bg-white',
      border: 'border border-gray-200',
      profile: {
        border: 'border border-gray-200',
      },
      button: { bg_color: 'bg-yellow-500' },
      text: {
        bg_color: 'bg-gray-100',
      },
    },
    {
      bg_color: 'bg-pink-200',
      border: 'border-0',
      profile: {
        border: 'border-0',
      },
      button: { bg_color: 'bg-black' },
      text: {
        bg_color: 'bg-white',
      },
    },
    {
      bg_color: 'bg-green-200',
      border: 'border-0',
      profile: {
        border: 'border-0',
      },
      button: { bg_color: 'bg-green-700' },
      text: {
        bg_color: 'bg-white',
      },
    },
    {
      bg_color: 'bg-orange-200',
      border: 'border-0',
      profile: {
        border: 'border-0',
      },
      button: { bg_color: 'bg-orange-600' },
      text: {
        bg_color: 'bg-white',
      },
    },
    {
      bg_color: 'bg-black',
      border: 'border-0',
      profile: {
        border: 'border-0',
      },
      button: { bg_color: 'bg-purple-600' },
      text: {
        bg_color: 'bg-white',
      },
    },
    {
      bg_color: 'bg-yellow-300',
      border: 'border-0',
      profile: {
        border: 'border-0',
      },
      button: { bg_color: 'bg-red-600' },
      text: {
        bg_color: 'bg-white',
      },
    },
    {
      bg_color: 'bg-black',
      border: 'border-0',
      profile: {
        border: 'border-0',
      },
      button: { bg_color: 'bg-red-500' },
      text: {
        bg_color: 'bg-gray-700',
      },
    },
    {
      bg_color: 'bg-gradient-to-b from-blue-300 to-green-100',
      border: 'border-0',
      profile: {
        border: 'border-0',
      },
      button: { bg_color: 'bg-blue-500' },
      text: {
        bg_color: 'bg-white',
      },
    },
    {
      bg_color: 'bg-gradient-to-b from-emerald-100 to-pink-100',
      border: 'border-0',
      profile: {
        border: 'border-0',
      },
      button: { bg_color: 'bg-cyan-400' },
      text: {
        bg_color: 'bg-white',
      },
    },
    {
      bg_color: 'bg-gray-200',
      border: 'border-0',
      profile: {
        border: 'border-0',
      },
      button: { bg_color: 'bg-black' },
      text: {
        bg_color: 'bg-white',
      },
    },
    {
      bg_color: 'bg-gradient-to-b from-pink-300 to-orange-300',
      border: 'border-0',
      profile: {
        border: 'border-0',
      },
      button: { bg_color: 'bg-white' },
      text: {
        bg_color: 'bg-white',
      },
    },
    {
      bg_color: 'bg-purple-700',
      border: 'border-0',
      profile: {
        border: 'border-0',
      },
      button: { bg_color: 'bg-yellow-500' },
      text: {
        bg_color: 'bg-white',
      },
    },
    {
      bg_color: 'bg-blue-100',
      border: 'border-0',
      profile: {
        border: 'border-0',
      },
      button: { bg_color: 'bg-blue-500' },
      text: {
        bg_color: 'bg-white',
      },
    },
    {
      bg_color: 'bg-yellow-300',
      border: 'border-0',
      profile: {
        border: 'border-0',
      },
      button: { bg_color: 'bg-red-500' },
      text: {
        bg_color: 'bg-white',
      },
    },
    {
      bg_color: 'bg-black',
      border: 'border-0',
      profile: {
        border: 'border-0',
      },
      button: { bg_color: 'bg-orange-500' },
      text: {
        bg_color: 'bg-white',
      },
    },
    {
      bg_color: 'bg-white',
      border: 'border border-gray-200',
      profile: {
        border: 'border border-gray-200',
      },
      button: { bg_color: 'bg-green-500' },
      text: {
        bg_color: 'bg-gray-100',
      },
    },
  ];

  const [noOfStylesToShow, setNoOfStylesToShow] = useState(8);

  return (
    <div className="space-y-5">
      <p className="font-extrabold text-base">Themes</p>

      <div className="space-y-4">
        <div className="space-y-2 p-2 rounded-lg bg-white border border-gray-300">
          <div className="flex gap-1 justify-between flex-wrap">
            {styles.slice(0, noOfStylesToShow).map((style, idx) => (
              <TemplatePreview style={style} key={idx} />
            ))}
          </div>

          <button
            onClick={() => setNoOfStylesToShow(noOfStylesToShow > 8 ? 8 : 16)}
            className="py-2 px-4 border border-gray-400 rounded w-full"
          >
            {noOfStylesToShow > 8 ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className="space-y-2 px-3 py-4 rounded-lg border bg-white">
          <p className="font-semibold text-gray-700 pb-2">Button Color</p>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
