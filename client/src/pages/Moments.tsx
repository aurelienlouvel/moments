import React from "react"

import {useQuery} from "@apollo/client"
import {GET_MOMENTS} from "../graphql/requests"

import Link from "../components/navigation/Link"
import Loading from "../components/async/Loading"
import Error from "../components/async/Error"

import {Flex, H1, Page, Section} from "../App"
import MomentCard from "../components/card/MomentCard"

function Moments() {

    const {data, loading, error} = useQuery(GET_MOMENTS)

    if (loading) return <Loading text="Life is full of highlights"/>
    if (error) return <Error/>

    return (
        <Page paddingVertical="16" justifyContent="normal" gap="4">
            <Section>
                <H1 fontWeight="400">My Moments</H1>
            </Section>
            <Link position="fixed" top="4" left="8" destination="/" text="Go home" direction="left"/>
            <Section>
                <Flex alignItems="normal" justifyContent="normal" gap="1" wrap="wrap">
                    {data.moments.map((moment: any) => {
                        return <MomentCard key={moment.audio.name} moment={moment}/>
                    })}
                </Flex>
            </Section>
        </Page>
    )
}

export default Moments