const typeDef = `
    type Reaction{
        userId: ID
        rating: Int
        comment: String
    }

    type Movie{
        id: ID!
        userId: String!
        name: String!
        releaseDate: Int!
        duration: Int!
        actors: [String!]!
        averageRating: Int!
        imageURL: String!
        reactions: [Reaction]
    }

    type MovieInfo {
        success: Boolean!
        id: String
        name: String
    }

    extend type Query{
        getMovies(sortBy: String): [Movie!]!
        getSelectedMovie(id: String): Movie!
    }

    input ReactionInput{
        userId: ID
        rating: Int
        comment: String
    }

    extend type Mutation {
        addMovie(
            userId: String!
            name: String!
            releaseDate: Int!
            duration: Int!
            imageURL: String!
            actors: [String!]!
        ): MovieInfo!

        updateMovie(
            id: ID!
            name: String
            releaseDate: Int
            duration: Int
            actors: [String!]
            averageRating: Int
            reactions: [ReactionInput]
        ): MovieInfo!

        deleteMovie(id: String!): Boolean!
    }
`

export default typeDef;