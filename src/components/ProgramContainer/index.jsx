import axios from 'axios'
import React from 'react'
import deleteImage from '../../assets/images/decorations/bin.png'
import editImage from '../../assets/images/decorations/edit.png'
import './style.css'
import { useNavigate } from 'react-router-dom'

const ProgramContainer = ({userId, program, removeProgram}) => {

    const navigate = useNavigate();
    
    const handleDeleteProgram = (e) => {
        // const program = programs.filter(program => program.name === e.target)
        
        const URL = process.env.REACT_APP_API_URL + `/user/${userId}/code/delete?id=${program.id}`
        
        axios.delete(URL)
        .then(response => {
         
            removeProgram(program);
        })
        .catch(err => {
        
            alert("Failed to delete program!")
        })
    }

    const handleEditProgram = (e) => {
        navigate('/ide', {state: {editMode: {isEditMode: true, programName: program.name, programId: program.id}, code: program.content}})
    }
    
    return (
        <div key={program.name} className="program-card">
            <h3 style={{width:"15rem", textAlign:"left"}}>{program.name}</h3>
            <div style={{display:"flex", justifyContent: "space-between", gap: "1rem"}}>
                <img src={editImage} alt="edit button" onClick={handleEditProgram} className="delete-image" />
                <img src={deleteImage} alt="delete button" onClick={handleDeleteProgram} className="delete-image" />
            </div>
        </div>
    )
}

export default ProgramContainer