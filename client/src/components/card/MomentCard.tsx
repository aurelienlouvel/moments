import React from "react"

import {useNavigate} from "react-router-dom"
import {Image} from "../../App"

interface MomentCardProps {
    moment: {
        audio: {
            name: string
        }
        image?: {
            name: string
        }
    }
    marginTop?: number
    marginLeft?: number
}

function Component({moment, marginTop, marginLeft}: MomentCardProps) {

    const navigate = useNavigate()

    function Navigate() {
        navigate("/moment:" + moment.audio.name)
    }

    if (moment.image) {
        return (
            <Image width="300" height="200" marginTop={marginTop} marginLeft={marginLeft}
                   src={`http://localhost:4000/image/${moment.image.name}.jpg`}
                   onClick={Navigate} cursor="pointer"/>
        )
    } else {
        return (
            <Image width="300" height="200" marginTop={marginTop} marginLeft={marginLeft}
                   src={`http://localhost:4000/image/default.jpg`} onClick={Navigate}
                   cursor="pointer"/>
        )
    }
}

export default Component