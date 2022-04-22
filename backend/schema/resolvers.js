const { StaticDataQuerier, StaticDataMutator } = require('../services');

const resolvers = {
  Query: StaticDataQuerier,

  LayoutBlockAttrib: {
    __resolveType: (object) => {
      switch (object.__type) {
        case 'profile':
          return 'LayoutBlockAttribProfile';
        case 'button_link':
          return 'LayoutBlockAttribButtonLink';
        case 'image_link':
          return 'LayoutBlockAttribImageLink';
        case 'sub_heading':
          return 'LayoutBlockAttribSubHeading';
        case 'text':
          return 'LayoutBlockAttribText';
        case 'youtube':
          return 'LayoutBlockAttribYoutube';
        case 'spotify':
          return 'LayoutBlockAttribSpotify';

        default:
          break;
      }
    },
  },

  Mutation: StaticDataMutator,
};

module.exports = { resolvers };
