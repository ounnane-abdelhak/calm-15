import React from "react";
import { motion } from "framer-motion";
import "./style.css"
import SaveIcon from "../../assets/images/decorations/save.png"
import axios from "axios";

axios.defaults.withCredentials = true; // Ensure cookies are sent with all Axios requests

const SaveCodeButton = ({ code, currentUser, editMode }) => {

    const saveCode = async (e) => {
        try {
            console.log('Calling isLoggedIn endpoint...');
            console.log('Sending request to isLoggedIn endpoint with credentials...');
            const isLoggedInResponse = await axios.get('https://calm-back-1.onrender.com/api/v1/users/isLoggedIn', { withCredentials: true }); // Ensure cookies are sent
            console.log('isLoggedIn response:', isLoggedInResponse.data);

            if (!isLoggedInResponse.data.isLoggedIn) {
                console.error('User is not logged in.');
                alert("You have to login to be able to save the program to your account");
                return;
            }

            console.log('User is logged in. Proceeding to save the program.');
            console.log('Current user:', currentUser);
            if (!currentUser || !currentUser.id) {
                console.error("Current user does not have an ID. Ensure the user is logged in and the ID is available.");
                alert("An error occurred. Please log in again.");
                return;
            }

            const URL = `https://calm-back-1.onrender.com/api/v1/users/${currentUser.id}/code` +
                (editMode.isEditMode === true ? "/edit" : "/add");

            if (editMode.isEditMode === true) {
                await axios.put(URL, { 
                    programId: editMode.programId, 
                    code 
                });
                alert(`Program "${editMode.programName}" updated successfully`);
            } else {
                const programName = prompt("Give a name to your program:");
                if (programName === null) {
                    alert("Can't save a program without a name!");
                    throw new Error("Can't save a program without a name!");
                }

                await axios.post(URL, { code, name: programName });
                alert("Your code has been saved successfully!");
            }
        } catch (err) {
            console.error("Error during save operation:", err);
            alert("An error occurred while saving the program. Please try again.");
        }
    };

    return (
        <>
            <motion.div whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                layout
                className="save-code-button"
                onClick={saveCode}
            >

                <img src={SaveIcon} alt="modePicture" />

            </motion.div>
        </>
    );
}
export default SaveCodeButton