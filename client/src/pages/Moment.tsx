import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"

import {useMutation} from "@apollo/client"
import {UPLOAD_IMAGE_MUTATION} from "../graphql/requests"

import {Button, Canvas, Flex, Page} from "../App"
import Loading from "../components/async/Loading"
import Link from "../components/navigation/Link"

function Moment() {
    let {id} = useParams()
    id = id!.split(":")[1]

    const [uploadFile] = useMutation(UPLOAD_IMAGE_MUTATION)

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 3000)
    }, [])

    const [access, setAccess] = useState<boolean>(false)
    const [playing, setPlaying] = useState<boolean>(false)

    useEffect(() => {
        let animationFrame: number

        if (access) {

            let canvas = document.getElementById("canvas") as HTMLCanvasElement
            let ctx = canvas.getContext("2d")!

            let cw = window.innerWidth
            let ch = window.innerHeight

            canvas.width = cw
            canvas.height = ch

            ctx.fillStyle = "rgba(255,255,255,1)"
            ctx.fillRect(0, 0, cw, ch)

            let audioContext = new AudioContext()

            let audioElement = new Audio()
            audioElement.src = `http://localhost:4000/audio/${id}.mp3`
            audioElement.crossOrigin = "anonymous"

            let audioSource = audioContext.createMediaElementSource(audioElement)

            let convolver = audioContext.createConvolver()
            let reverbBuffer = audioContext.createBuffer(
                2,
                audioContext.sampleRate,
                audioContext.sampleRate
            )
            let left = reverbBuffer.getChannelData(0)
            let right = reverbBuffer.getChannelData(1)
            for (let i = 0; i < reverbBuffer.length; i++) {
                left[i] = (Math.random() * 2 - 1) * 0.5
                right[i] = (Math.random() * 2 - 1) * 0.5
            }
            convolver.buffer = reverbBuffer

            audioSource.connect(convolver)
            convolver.connect(audioContext.destination)

            audioElement.play()

            audioElement.addEventListener("ended", () => {
                cancelAnimationFrame(animationFrame)
                setPlaying(false)

                canvas.toBlob((blob) => {
                    uploadFile({variables: {file: blob!, name: id}}).then((response) => {
                        let name = response.data.imageFile.name
                    })
                })

            })

            const restartButton = document.getElementById("restart") as HTMLButtonElement
            restartButton.addEventListener("click", () => {
                audioElement.currentTime = 0
                audioElement.play()
                setPlaying(true)
            })

            const saveButton = document.getElementById("save") as HTMLButtonElement
            saveButton.addEventListener("click", () => {
                let dataURL = canvas.toDataURL("image/jpeg", 1.0)
                let link = document.createElement("a")
                link.download = `moment-${id}.jpeg`
                link.href = dataURL
                link.click()
            })
        }

        return () => {
            cancelAnimationFrame(animationFrame)
        }
    }, [access])


    const navigate = useNavigate()

    function Navigate() {
        navigate("/")
    }

    if (loading) {
        return <Loading text="Creating the simulation..."/>
    }

    return (
        <Page height="100">
            {!access ? <Button onClick={() => setAccess(true)}>Start the simulation</Button> : (
                <React.Fragment>
                    <Link zindex="2" position="fixed" top="4" left="8" destination="/" text="Go home"
                          direction="left"/>
                    <Canvas id="canvas" position="absolute"/>
                    <Flex zIndex="2" gap="1" position="absolute" bottom={!playing ? "4" : "-4"}>
                        <Button id="restart">Restart</Button>
                        <Button id="save">Save Moment</Button>
                    </Flex>
                </React.Fragment>
            )}
        </Page>

    )

}

export default Moment