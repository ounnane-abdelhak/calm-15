import React from "react";
import {motion} from "framer-motion";
import "./style.css"
const ComponentsListing = ({ name, imagepath, imageHeight, open }) => {


    return (
        <>
            <motion.div whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        transition={{type: "spring", stiffness: 400, damping: 17}}
                        layout
                        onClick={open} className="ComponentsListing">
                <img src={`${imagepath}`} alt="componentPicture" style={{height: imageHeight + '%'}} />
                <motion.p>{name}</motion.p>
            </motion.div>
        </>
    );
}
export default ComponentsListing;