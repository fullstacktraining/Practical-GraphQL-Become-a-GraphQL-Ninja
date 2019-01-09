const { gql } = require('apollo-server-express');
module.exports = gql`
  extend type Query {
    users: [User]
    user(id: Int!): User
    me: User
  }

  extend type Mutation {
    makeUser(id: Int!, name: String!): User!
    removeUser(id: Int!): Boolean
  }

  type User {
    id: ID!
    name: String!
    car: [Car]
  }
`;