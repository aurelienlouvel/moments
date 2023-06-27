import React, {useEffect, useState} from "react"
import ActionButton from "./ActionButton"

interface CaptureButtonProps {
    status: string
    startRecording: () => void
    stopRecording: () => void
}

function Component({status, startRecording, stopRecording}: CaptureButtonProps) {

    const [name, setName] = useState("record")

    useEffect(() => {
        if (status === "recording") {
            setName("stop")
        } else {
            setName("capture")
        }
    }, [status])

    function handleClick() {
        if (status === "recording") {
            stopRecording()
        } else {
            startRecording()
        }
    }

    return (
        <ActionButton name={name} onClick={handleClick}/>
    )
}

export default Component