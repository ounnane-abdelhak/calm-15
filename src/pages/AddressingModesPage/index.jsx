//import components
import { NavBar, AddressingModeCard } from "../../components";
import { useState, useEffect } from "react";
import axios from "axios";
import Bot from "../../components/ChatBot";
import "./style.css";
// import {properties} from "../../Constants/modesDescription";

const AdressingModes = () => {
  // TODO: fix the description props passing

  const [addressingModesInfos, setaddressingModesInfos] = useState([]);

  useEffect(() => {
    const URL =
      process.env.REACT_APP_API_URL + "/documentation/addressing-modes/all";

    axios
      .get(URL)
      .then((res) => {
        console.log(res.data.data);
        setaddressingModesInfos(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavBar />
      <div class="addressing-table-container">
        <h2 class="addressing-title">Addressing Modes</h2>
        <table class="addressing-table">
          <thead>
            <tr>
              <th>Mode</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Immediate</td>
              <td>000</td>
            </tr>
            <tr>
              <td>Direct</td>
              <td>001</td>
            </tr>
            <tr>
              <td>Indirect</td>
              <td>010</td>
            </tr>
            <tr>
              <td>Based</td>
              <td>011</td>
            </tr>
            <tr>
              <td>Indexed</td>
              <td>100</td>
            </tr>
            <tr>
              <td>Based indexed</td>
              <td>101</td>
            </tr>
            <tr>
              <td>Shift on 8 bits</td>
              <td>110</td>
            </tr>
            <tr>
              <td>Shift on 16 bits</td>
              <td>111</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Bot />
    </>
  );
};

export default AdressingModes;
