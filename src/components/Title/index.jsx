import title from "../../assets/images/logos/calmtitle.svg"
// import brackets from "./assets/brackets.svg"

const Title= () => {
    return <>
    <img src={title} alt="" style={{
        width:"35em",
        gridColumn: "1 / span 4",
        gridRow: "1 / span 2",
        position: "relative",
        left: "8%",
    }}/>
    
    </>
} 
export default Title