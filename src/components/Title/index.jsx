import title from "../../assets/images/logos/calmtitle.svg"
// import brackets from "./assets/brackets.svg"

const Title= () => {
    return <>
    <img src={title} alt="" style={{
        width:"32em",
        gridColumn: "1 / span 4",
        gridRow: "1 / span 2",
        position: "relative",
        left: "5%",
    }}/>
    
    </>
} 
export default Title