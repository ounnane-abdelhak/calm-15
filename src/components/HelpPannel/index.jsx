import React from 'react';
import {motion} from "framer-motion";
import './style.css'
import closeButton from "../../assets/images/decorations/close.png"
import HelpDoc from "../HelpDoc";

const HelpPannel = ({modesDescription, close}) => {
    const {title} = modesDescription;
    const helpPannelVariants = {
        open: {
            opacity: 1,
            transition: {staggerChildren: 0.5, delayChildren: 0.2, duration: 0.3},
            x: "0vh"
        },
        closed: {opacity: 0, x: "10vh"}
    };
    const headerVariant = {
        open: {opacity: 1, x: "0vh"},
        closed: {opacity: 0, x: "10vh"}
    };
    const descriptionVariant = {
        open: {opacity: 1, y: "0vh"},
        closed: {opacity: 0, y: "-10vh"}
    };
    return (
        <motion.div variants={helpPannelVariants}
                    layout className="helpPannel"
                    onClick={(e) => e.stopPropagation()}
                    initial={{x: 900}}
                    animate={{x: 0}}

        >
            <motion.button className="closeWrapper" onClick={close} whileHover={{scale: 1.2}}>
                <img src={closeButton} alt="closeIcon" className="closeIcon"/>
            </motion.button>
            <motion.h1 className="title-helpPannel" variants={headerVariant}>{title}
                calM Assembly Documentation
            </motion.h1>
            <motion.div className="desciptionContainer" variants={descriptionVariant}>
                <HelpDoc/>
            </motion.div>
        </motion.div>
    );
}
export default HelpPannel;