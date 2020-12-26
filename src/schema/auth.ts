const typeDef = `
    type User {
        id: ID!
        username: String!
    }

    type Query {
        currentUser: User!
        getAllUsers: [User!]!
    }

    type LoginResponse {
        token: String
        id: String
    }

    type Mutation {
        register(username: String!, password: String!, confirmPassword: String!): User!
        login(username: String!, password: String!): LoginResponse!
    }    
`;
export default typeDef;
