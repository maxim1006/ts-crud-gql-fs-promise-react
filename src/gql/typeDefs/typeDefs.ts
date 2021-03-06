import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Error {
        message: String
        field: String
    }

    type Family {
        id: String!
        members: [FamilyMember]
        errors: [Error]
    }

    type FamilyMember {
        name: String!
        age: Float!
        id: String!
    }

    input FamilyMemberInput {
        name: String!
        age: Float!
        id: String!
    }

    type Query {
        family: Family
    }

    type Mutation {
        createFamilyMember(name: String!, age: Int!): Family
        updateFamilyMember(input: FamilyMemberInput): Family
        deleteFamilyMember(id: String!): Family
    }
`;
