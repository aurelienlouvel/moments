import React from "react"

import {useNavigate} from "react-router-dom"

import {useMutation} from "@apollo/client"
import {UPLOAD_AUDIO_MUTATION} from "../../graphql/requests"

import ActionButton from "./ActionButton"

function Component() {
    const navigate = useNavigate()

    const [uploadFile] = useMutation(UPLOAD_AUDIO_MUTATION)

    function handleFileChange(e: any) {
        const file = e.target.files[0]
        uploadFile({variables: {file}}).then((response) => {
            let name = response.data.audioFile.name
            name = name.split("/")[1]
            navigate(`/moment:${name}`)
        })
    }

    return (
        <div>
            <input type="file" accept="audio/mpeg" id="file" style={{display: "none"}} onChange={handleFileChange}/>
            <label htmlFor="file">
                <ActionButton name="import"/>
            </label>
        </div>
    )
}

export default Component