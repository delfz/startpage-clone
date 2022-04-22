import React, { FC, useState } from 'react';
import {
  ImEmbed2,
  ImPaintFormat,
  ImInsertTemplate,
  ImPlus,
  ImStatsBars,
  ImCog,
} from 'react-icons/im';
import ToobarTab from './toolbar/ToobarTab';
import AddBlock from './block/AddBlock';
import SiteLayout from './layout/SiteLayout';
import Appearance from './appearance/Appearance';

const Configurator: FC = () => {
  const [isShown, setIsShown] = useState(true);
  const [tab, setTab] = useState('layout');

  return (
    <div className="h-full flex shadow-xl">
      {/* open/close btn */}
      <div className="flex flex-col justify-center bg-opacity-0 relative">
        <button
          onClick={() => {
            setIsShown((prevIsShown) => !prevIsShown);
          }}
          className="text-4xl absolute right-0 p-1 bg-white bg-opacity-20 border border-gray-400 border-r-0 rounded"
        >
          <ImEmbed2 />
        </button>
      </div>
      {/* endof open/close btn */}

      {/* workable area */}
      <div className={isShown ? 'bg-gray-100 w-96 p-4 text-sm' : 'hidden'}>
        <div>
          <div className="space-y-4">
            {
              {
                appearance: <Appearance />,
                layout: <SiteLayout />,
                add_block: <AddBlock />,
              }[tab]
            }
          </div>
        </div>
      </div>
      {/* endof workable area */}

      {/* toolbar */}
      <div className="h-full flex flex-col justify-between bg-white w-20">
        <ul>
          <li>
            <ToobarTab
              label="Appearance"
              icon={ImPaintFormat}
              isSelected={'appearance' == tab}
              handleClick={(e) => setTab('appearance')}
            />
          </li>
          <li>
            <ToobarTab
              label="Layout"
              icon={ImInsertTemplate}
              isSelected={'layout' == tab}
              handleClick={(e) => setTab('layout')}
            />
          </li>
          <li>
            <ToobarTab
              label="Add Block"
              icon={ImPlus}
              isSelected={'add_block' == tab}
              handleClick={() => setTab('add_block')}
            />
          </li>
        </ul>

        <ul>
          {/* <li>
            <ToobarTab
              label="Clear"
              icon={ImLoop2}
              isSelected={false}
              handleClick={() => setTab('clear')}
            />
          </li> */}
          <li>
            <ToobarTab
              label="Statistics"
              icon={ImStatsBars}
              isSelected={'statistics' == tab}
              handleClick={() => setTab('statistics')}
            />
          </li>
          <li>
            <ToobarTab
              label="Settings"
              icon={ImCog}
              isSelected={'settings' == tab}
              handleClick={() => setTab('settings')}
            />
          </li>
        </ul>
      </div>
      {/* endof toolbar */}
    </div>
  );
};
// https://stage.easybot.com/api/bot/counters?installed_campaign_id=241399083822220_38_62526fa369b4c&bot_id=241399083822220
export default Configurator;
