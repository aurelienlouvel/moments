import {BrowserRouter, Link} from "react-router-dom"
import Root from "./routes/Root"
import styled from "styled-components"

function App() {
    return (
        <BrowserRouter>
            <Root/>
        </BrowserRouter>
    )
}

export default App


//STYLES

//Color palette

export const COLORS = {
    white: "#FFFFFF",
    black: "#000000",
    gray: "#F2F2F2",
    darkGray: "#15171a",
    lightGray: "rgba(217,227,244,0.4)"
}

//Headings

export const H1 = styled.h1`
  font-size: 3.5rem;
  font-weight: ${props => props.fontWeight || "400"};
  color: ${COLORS.black};
`


//Paragraph
export const Paragraph = styled.p`
  text-transform: ${props => props.textTransform || "none"};
  font-size: ${props => props.fontSize + "rem" || "1rem"};
  font-weight: ${props => props.fontWeight || "400"};
  color: ${props => props.color || COLORS.black};
`

//Layouts

export const Page = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.alignItems || "center"};
  justify-content: ${props => props.justifyContent || "space-around"};
  gap: ${props => props.gap + "rem" || "0"};
  width: 100%;
  height: ${props => props.height + "vh" || "unset"};
  min-height: 100vh;
  padding: 6vh 12vw;
  overflow: hidden;
  ${props => props.paddingVertical && `padding-top: ${props.paddingVertical}vh; padding-bottom: ${props.paddingVertical}vh;`}
`

export const Section = styled.section`
  display: flex;
  flex-direction: ${props => props.direction || "row"};
  align-items: ${props => props.alignItems || "flex-start"};
  justify-content: ${props => props.justifyContent || "flex-start"};
  gap: ${props => props.gap + "rem" || "0"};
  width: 100%;
`


//Flexbox

export const Flex = styled.div`
  z-index: ${props => props.zIndex || "0"};
  display: ${props => props.display || "flex"};
  flex-direction: ${props => props.direction || "row"};
  align-items: ${props => props.alignItems || "center"};
  justify-content: ${props => props.justifyContent || "center"};
  gap: ${props => props.gap + "rem" || "0"};
  padding-left: ${props => props.paddingLeft + "px" || "0"};
  position: ${props => props.position || "unset"};
  top: ${props => props.top + "rem" || "unset"};
  right: ${props => props.right + "%" || "unset"};
  bottom: ${props => props.bottom + "rem" || "unset"};
  left: ${props => props.left + "%" || "unset"};
  flex-wrap: ${props => props.wrap || "nowrap"};
  transition: 0.3s ease-in-out;
`

//Loading Bar

export const Bar = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${COLORS.black};
  animation: loading 3s linear infinite;

  @keyframes loading {
    0% {
      width: 0%;
    }
    33% {
      width: 50%;
    }
    66% {
      width: 80%;
    }
    100% {
      width: 100%;
    }
  }
`


//Buttons

export const ActionButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem 1.75rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${COLORS.lightGray};
  }
`

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: 0 4px 0 4px;
  background-color: ${COLORS.darkGray};
  color: ${COLORS.white};
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${COLORS.black};
  }
`


export const NavLink = styled(Link)`
  z-index: ${props => props.zindex || "0"};
  position: ${props => props.position || "unset"};
  top: ${props => props.top + "rem" || "unset"};
  right: ${props => props.right + "%" || "unset"};
  bottom: ${props => props.bottom + "rem" || "unset"};
  left: ${props => props.left + "%" || "unset"};
  text-decoration: none;
  color: ${COLORS.black};
  font-size: 1rem;
  font-weight: 400;
`


//Images

export const Image = styled.img`
  position: relative;
  width: ${props => props.width + "px" || "auto"};
  height: ${props => props.height + "px" || "auto"};
  object-fit: ${props => props.objectFit || "cover"};
  cursor: ${props => props.cursor || "unset"};
  margin-top: ${props => props.marginTop + "px" || "0"};
  margin-left: ${props => props.marginLeft + "px" || "0"};
`


//Canvas

export const Canvas = styled.canvas`
  position: ${props => props.position || "unset"};
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "100%"};
`