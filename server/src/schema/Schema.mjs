import {GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql"
import MomentType from "./MomentType.mjs"
import AudioType from "./AudioType.mjs"
import ImageType from "./ImageType.mjs"
import {readdir} from "node:fs/promises"
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs"
import storeUpload from "../store/storeUpload.mjs"
import shortId from "shortid"
import UPLOAD_DIRECTORY_URL from "../config/UPLOAD_DIRECTORY_URL.mjs"
import {fileURLToPath} from "node:url"

function getMoments() {

}

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            moments: {
                type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MomentType))),
                resolve: async () => {
                    const audioFiles = await readdir(fileURLToPath(UPLOAD_DIRECTORY_URL) + "/audio")
                    const imageFiles = await readdir(fileURLToPath(UPLOAD_DIRECTORY_URL) + "/image")
                    const moments = []
                    for (const audioFile of
                        audioFiles) {
                        const moment = {
                            audio: audioFile
                        }
                        const imageFile = imageFiles.find(imageFile => imageFile.split(".")[0] === audioFile.split(".")[0])
                        if (imageFile) {
                            moment.image = imageFile
                        } else {
                            moment.image = null
                        }
                        moments.push(moment)
                    }
                    return moments
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            audioFile: {
                type: new GraphQLNonNull(AudioType),
                args: {
                    file: {
                        type: new GraphQLNonNull(GraphQLUpload)
                    }
                },
                resolve: (parent,
                          {file}) =>
                    storeUpload(file,
                        {
                            name: shortId.generate(),
                            fileType: "mp3",
                            location: "audio"
                        })
            },
            imageFile: {
                type: new GraphQLNonNull(ImageType),
                args: {
                    file: {
                        type: new GraphQLNonNull(GraphQLUpload)
                    },
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (parent,
                          {file, name}) =>
                    storeUpload(file,
                        {
                            name: name,
                            fileType: "jpg",
                            location: "image"
                        })
            }
        }
    })
})
