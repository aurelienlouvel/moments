import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

export default new GraphQLObjectType({
    name: "Image",
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (storedFileName) => storedFileName.split(".")[0],
        },
    }),
});