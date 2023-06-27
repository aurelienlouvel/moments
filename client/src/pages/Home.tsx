import React from "react"
import {Flex, H1, Page, Section} from "../App"
import ImportButton from "../components/button/ImportButton"
import Link from "../components/navigation/Link"
import CaptureButton from "../components/button/CaptureButton"
import {useNavigate} from "react-router-dom"
import {useMutation, useQuery} from "@apollo/client"
import {GET_MOMENTS, UPLOAD_AUDIO_MUTATION} from "../graphql/requests"
import {useReactMediaRecorder} from "react-media-recorder"
import CaptureVisualizer from "../components/visualizer/CaptureVisualizer"
import MomentCard from "../components/card/MomentCard"
import Loading from "../components/async/Loading"
import Error from "../components/async/Error"

function Home() {
    const navigate = useNavigate()
    const {data, loading, error} = useQuery(GET_MOMENTS)
    const [uploadFile] = useMutation(UPLOAD_AUDIO_MUTATION)

    const {status, startRecording, stopRecording, previewAudioStream} = useReactMediaRecorder({
        audio: true,
        onStop: (blobUrl: string, blob: Blob) => {
            uploadFile({variables: {file: blob}}).then((response) => {
                let name = response.data.audioFile.name.split(".")[0]
                name = name.split("/")[1]
                navigate(`/moment:${name}`)
            })
        }
    })

    if (loading) return <Loading text="Hi, welcome back"/>
    if (error) return <Error/>

    return (
        <Page>
            <Section gap="8" justifyContent="space-between">
                <Flex direction="column" alignItems={"flex-start"}>
                    <H1 fontWeight="200">Relive</H1>
                    <H1 fontWeight="400">your best moments</H1>
                </Flex>
                {data.moments.length > 0 && (
                    <Flex direction="column" gap="1" alignItems={"flex-start"}>
                        <Flex direction="row-reverse" alignItems="normal" justifyContent="normal" paddingLeft="216">
                            {data.moments.slice(0, 4).reverse().map((moment: any, index: number) => {
                                return <MomentCard key={moment.audio.name} moment={moment} marginTop={index * 24}
                                                   marginLeft="-220"/>
                            })}
                        </Flex>
                        <Link destination={"/moments"} text="See all" direction="right"/>
                    </Flex>
                )}
            </Section>
            <Section gap="2" alignItems="center" justifyContent="space-between">
                <Flex gap="2">
                    <ImportButton/>
                    <CaptureButton status={status} startRecording={startRecording} stopRecording={stopRecording}/>
                </Flex>
                <CaptureVisualizer status={status} stream={previewAudioStream}/>
            </Section>
        </Page>
    )
}

export default Home