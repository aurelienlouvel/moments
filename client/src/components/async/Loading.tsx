import React from "react"

import {Paragraph, Page, Bar, Flex} from "../../App"

interface LoadingProps {
    text: string
}

function Component({text}: LoadingProps) {
    return (
        <Page>
            <Flex direction="column" alignItems="center" gap="2">
                <Paragraph fontSize="1">{text}</Paragraph>
                <Bar/>
            </Flex>
        </Page>
    )
}

export default Component