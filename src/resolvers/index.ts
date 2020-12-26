import userResolvers from "./auth";
import movieResolvers from "./movie";

const resolverMap = {
  Query: {
    ...userResolvers.Query,
    ...movieResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutations,
    ...movieResolvers.Mutations
  },
};

export default resolverMap;
