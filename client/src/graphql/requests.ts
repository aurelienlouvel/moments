import {gql} from "@apollo/client"

//Queries
export const GET_MOMENTS = gql`
    query getMoments {
        moments {
            audio {
                name
            }
            image {
                name
            }
        }
    }
`
export const UPLOAD_AUDIO_MUTATION = gql`
    mutation upload_audio($file: Upload!) {
        audioFile(file: $file) {
            name
        }
    }
`
export const UPLOAD_IMAGE_MUTATION = gql`
    mutation upload_image($file: Upload! $name: String!) {
        imageFile(file: $file name: $name) {
            name
        }
    }
`