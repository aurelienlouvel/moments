import React from "react"
import {NavLink} from "../../App"

interface LinkProps {
    zindex?: string;
    position?: string
    top?: string
    left?: string
    right?: string
    bottom?: string
    destination: string
    text: string
    direction: string
}

function Component({zindex, position, top, left, right, bottom, destination, text, direction}: LinkProps) {

    function switchDirection(direction: string, text: string) {
        switch (direction) {
            case "left":
                return "← " + text
            case "right":
                return text + " →"
            default:
                return text
        }
    }

    return (
        <NavLink zindex={zindex} position={position} top={top} left={left} right={right} bottom={bottom}
                 to={destination}>{switchDirection(direction, text)}</NavLink>
    )
}

export default Component