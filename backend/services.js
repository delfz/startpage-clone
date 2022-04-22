const { StartPagesList } = require('./data/StaticData');
const _ = require('lodash');

const StaticDataQuerier = {
  startpage: (parent, args) => {
    return _.find(StartPagesList, { id: args.id });
  },
};

const StaticDataMutator = {
  syncLayoutBlock: (parent, args) => {
    const startPage = _.find(StartPagesList, {
      id: args.input.startPageId,
    });

    const blockToSync = _.find(startPage.layout, {
      id: args.input.layoutBlockData.id,
    });

    if (blockToSync) {
      _.merge(blockToSync, args.input.layoutBlockData);
      return blockToSync;
    }

    const newBlock = _.cloneDeep(args.input.layoutBlockData);
    // add __type for resolver and meta for completion
    _.merge(newBlock, { attributes: { __type: newBlock.type }, meta: {} });

    startPage.layout.push(newBlock);
    return newBlock;
  },

  moveLayoutBlock: (parent, args) => {
    const startPage = _.find(StartPagesList, {
      id: args.input.startPageId,
    });

    const idx = _.findIndex(startPage.layout, {
      id: args.input.layoutBlockId,
    });
    const blockToMove = startPage.layout[idx];

    // newIdx can't exceed current capacity
    const newIdx = Math.min(args.input.newIdx, startPage.layout.length - 1);

    // remove the block first on its initial position
    startPage.layout.splice(idx, 1);
    // assign to the new position
    startPage.layout.splice(newIdx, 0, blockToMove);

    return true;
  },
};

// TODO: implement database version
// const MySQLQuerier = {};
// const MySQLMutator = {};

module.exports = { StaticDataQuerier, StaticDataMutator };
