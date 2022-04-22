const { gql } = require('apollo-server');

const typeDefs = gql`
  type LayoutBlockAttribProfile {
    logoImage: String!
    logoAltText: String
    bannerImage: String
    headerName: String!
    headerDescription: String
    format: String!
  }
  type LayoutBlockAttribButtonLink {
    label: String!
    uri: String
  }
  type LayoutBlockAttribImageLink {
    image: String!
    imageCaption: String
    altText: String
    uri: String
  }
  type LayoutBlockAttribText {
    content: String!
  }
  type LayoutBlockAttribSubHeading {
    content: String!
  }
  type LayoutBlockAttribYoutube {
    uri: String
  }
  type LayoutBlockAttribSpotify {
    uri: String
  }

  union LayoutBlockAttrib =
      LayoutBlockAttribProfile
    | LayoutBlockAttribButtonLink
    | LayoutBlockAttribImageLink
    | LayoutBlockAttribText
    | LayoutBlockAttribSubHeading
    | LayoutBlockAttribYoutube
    | LayoutBlockAttribSpotify

  type LayoutBlock {
    id: ID!
    type: String!
    visible: Boolean!
    attributes: LayoutBlockAttrib
  }

  type StartPage {
    id: ID!
    name: String!
    layout: [LayoutBlock]
  }

  type Query {
    startpage(id: ID!): StartPage
  }

  input LayoutBlockAttribInput {
    logoImage: String
    logoAltText: String
    bannerImage: String
    headerName: String
    headerDescription: String
    format: String
    label: String
    uri: String
    image: String
    imageCaption: String
    altText: String
    content: String
  }

  input LayouBlockInput {
    id: ID!
    type: String!
    visible: Boolean!
    attributes: LayoutBlockAttribInput!
  }

  input SyncLayoutBlockInput {
    startPageId: ID!
    layoutBlockData: LayouBlockInput!
  }

  input MoveLayoutBlockInput {
    startPageId: ID!
    layoutBlockId: ID!
    newIdx: Int!
  }

  type Mutation {
    syncLayoutBlock(input: SyncLayoutBlockInput!): LayoutBlock
    moveLayoutBlock(input: MoveLayoutBlockInput!): Boolean!
  }
`;

module.exports = { typeDefs };
