import AudioType from "./AudioType.mjs"
import ImageType from "./ImageType.mjs"
import {GraphQLNonNull, GraphQLObjectType} from "graphql"

export default new GraphQLObjectType({
    name: "Moment",
    fields: {
        audio: {
            type: new GraphQLNonNull(AudioType)
        },
        image: {
            type: ImageType
        }
    }
})