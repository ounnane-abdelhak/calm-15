import { NavBar } from "../../components";
import { useState, useEffect } from "react";
import axios from "axios";
import Bot from "../../components/ChatBot";
import "./style.css";
import ModalDemo from "./ModelDemo";

const AdressingModes = () => {
  const [addressingModesInfos, setaddressingModesInfos] = useState([
    {
      id: 1,
      modeName: "Immediate",
      code: "000",
      description:"Getting the information immediately from the instruction code after decoding it, so the operand  would be in the second part of the instruction (depending if where in the general format or the reduced format) to be used in the execution with no memory access and that's why it's called immediate.",
      examples: [
        "MOV R1, 5",
        "ADD R2, 10",
        "SUB R3, 15"
      ]
    },
    {
      id: 2,
      modeName: "Direct",
      code: "001",
      description: "Getting the information directly from it's memory address that is provided by the instruction, so here we'll have to do one memory access to retrieve the information.",
      examples: [
        "MOV R4, 15*",
        "ADD BR, 24*"
      ]
    },
    {
      id: 3,
      modeName: "Indirect",
      code: "010",
      description: "Getting the information indirectly from the address that is stored in the address provided by the instruction, at first it may sound a bit confusing but you'll see how much is this mode important when you'll deal with pointers, no more spoils because you'll learn them in data structures, but I'll only want you to remember that it's a memory address \"pointing\" the memory address that contains the information that we want and so we'll have to do 2 memory accesses to get to it, the first one is to get the physical address of the information and the second one is to retrieve the data.",
      examples: [
        "MOV R4, 15**",
        "ADD BR, 24**"
      ]
    },
    {
      id: 4,
      modeName: "Based",
      code: "011",
      description:"Getting the information based on the address stored in the base register, so we'll have to do some calculation by adding the value that we have in the instruction to the address found in the base register to get the physical address of the data, it is used mostly to retrieve data from arrays based on the first element of the array and it requires 1 memory access.",
      examples: [
        "MOV R4, BR*+1"
      ]
    },
    {
      id: 5,
      modeName: "Indexed",
      code: "100",
      description: "Getting the information based on the address stored in the base register, so we'll have to do some calculation by adding the value that we have in the instruction to the address found in the index register to get the physical address of the data, it is used mostly to retrieve data from arrays based on the first element of the array and it requires 1 memory access.",
      examples: [
        "MOV R3, IDR*+10"
      ]
    },
    {
      id: 6,
      modeName: "Based Indexed",
      code: "101",
      description: "Getting the information by combining the addresses stored in both the Base Register and the Index Register, along with an optional displacement provided in the instruction. This mode is particularly useful for accessing elements in multidimensional arrays or complex data structures, where the base register points to the start of the structure (e.g., a row in a matrix), and the index register provides an offset (e.g., a column within that row). Only 1 memory access is required after address calculation.",
      examples: [
        "MOV R4, BR*+IDR+1"
      ]
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);

  const handleRowClick = (mode) => {
    setSelectedMode(mode);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMode(null);
  };

  return (
    <>
      <NavBar />
      <div className="addressing-table-container">
        <h2 className="addressing-title">Addressing Modes</h2>
        <table className="addressing-table">
          <thead>
            <tr>
              <th>Mode</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {addressingModesInfos.map((mode, idx) => (
              <tr key={idx} onClick={() => handleRowClick(mode)}>
                <td>{mode.modeName}</td>
                <td>{mode.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ModalDemo
          onClose={closeModal}
          content={
            <div className="modal-content">
              <h3 className="modal-title">{selectedMode?.modeName}</h3>
              <p className="modal-description">{selectedMode?.description}</p>
              <p className="modal-code">
                <strong>Code:</strong> {selectedMode?.code}
              </p>
              <div className="modal-examples">
                <strong>Examples:</strong>
                <ul className="examples-list">
                  {selectedMode?.examples.map((example, index) => (
                    <li key={index} className="example-item">{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          }
        />
      )}

      <Bot />
    </>
  );
};

export default AdressingModes;
