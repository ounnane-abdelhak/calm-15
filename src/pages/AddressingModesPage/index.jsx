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
      description:
        "Getting the information " +
        "immediately from the instruction code after decoding it, so the operand  would be in the second part of " +
        "the instruction (depending if where in the general format or the reduced format) to be used in the " +
        "execution with no memory access and that's why it's called immediate.",
    },
    {
      id: 2,
      modeName: "Direct",
      description:
        "Getting the information directly from it's memory address that is " +
        "provided by the instruction, so here we'll have to do one memory access to " +
        "retrieve the information.",
    },
    {
      id: 3,
      modeName: "Indirect",
      description:
        "Getting the information indirectly from the address that is stored in the address provided by the " +
        "instruction, at first it may sound a bit confusing but you'll see how much is this mode important when " +
        "you'll deal with pointers, no more spoils because you'll learn them in data structures, but I'll only want " +
        "you to remember that it's an memory address “pointing” the memory address that contains the information " +
        "that we want and so we'll have to do 2 memory accesses to get to it, the first one is to get the physical " +
        "address of the information and the second one is to retrieve the data.",
    },
    {
      id: 4,
      modeName: "Based",
      description:
        "Getting the " +
        "information based on the address stored in the base register, so we'll have to do some " +
        "calculation by adding the value that we have in the instruction to the address found in the " +
        "base register to get the physical address of the data, it is used mostly to retrieve data from " +
        "arrays based on the first element of the array and it requires 1 memory access.",
    },
    {
      id: 5,
      modeName: "Indexed",

      description:
        "Getting the " +
        "information based on the address stored in the base register, so we'll have to do some " +
        "calculation by adding the value that we have in the instruction to the address found in the " +
        "index register to get the physical address of the data, it is used mostly to retrieve data from " +
        "arrays based on the first element of the array and it requires 1 memory access.",
    },
    {
      id: 6,
      modeName: "Based Indexed",
      description: "hello",
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
                <td>{mode.modeName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ModalDemo
          onClose={closeModal}
          content={
            <div>
              <h3>{selectedMode?.modeName}</h3>
              <p>{selectedMode?.description}</p>
              <p>
                <strong>Code:</strong> {selectedMode?.modeName}
              </p>
            </div>
          }
        />
      )}

      <Bot />
    </>
  );
};

export default AdressingModes;
