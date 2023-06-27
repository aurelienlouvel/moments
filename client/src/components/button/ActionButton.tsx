import React from "react"
import {ActionButton, Image, Paragraph} from "../../App"

interface ActionButtonProps {
    name: string;
    onClick?: () => void;
}

function Component({name, onClick}: ActionButtonProps) {
    return (
        <ActionButton onClick={onClick}>
            <Image width="32" height="36" src={`/icons/${name}.svg`} alt={`${name} icon`}/>
            <Paragraph textTransform="capitalize">{`${name}`}</Paragraph>
        </ActionButton>
    )
}

export default Component