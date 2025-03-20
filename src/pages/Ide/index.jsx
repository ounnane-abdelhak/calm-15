import { useState , useRef,useEffect } from 'react';
import Toggle from 'react-styled-toggle';
import { Controlled as CodeMirror } from "react-codemirror2";
import UAParser from 'ua-parser-js';
import "./style.css"

///// import components //////
import { NavBar, HelpSection, SaveCodeButton } from "../../components"
////// import machine components //////
import MC from "../../Emulator/MC.js";
import Sequenceur from "../../Emulator/Sequencer.js";
import Queue from "../../Emulator/Queue.js";
import AddressingModes from "../../Emulator/Adressing.js";
import { generalPurposeRegister,Register } from "../../Emulator/Register.js";
import Alu, { TwosComplement } from "../../Emulator/ALU.js";
import Arch from '../Arch/index.jsx';
import { getSpeed, setSpeed } from '../../Emulator/Instruction.js';
///// import editor styles//////
import "../../codemirror/lib/codemirror.css"
import "../../codemirror/theme/material.css";
import "../../codemirror/mode/myLang/assembly.js"

/////import assembler modules//////////
import { Assembler } from "../../assembler/Assembler";
import {helpDescription} from "../../Constants/HelpDescription";
import {HexaToCode} from "../../HexaToCode/HexaToCode"
import { Errorcalm } from "../../assembler/Errorcalm";
import { useLocation } from 'react-router-dom';
import IOUnit from '../../Emulator/IO_Unit.js';
import txt from "../../Emulator/Instruction.js";


////////////////animations declarations////////////////////////////////
let animations=[];
////////////////context declarations///////////////////////////////////
let Contextarray=[];

////////////////machine declarations////////////////////////////////
let memory=new MC();
let sequenceur=new Sequenceur();
let queue = new Queue();
let ioUnit = new IOUnit();
let addressingModes=new AddressingModes();
let IP=new Register();
let R1= new generalPurposeRegister();
let R2=new generalPurposeRegister();
let R3=new generalPurposeRegister();
let R4=new Register();
let BR=new Register();
let IR=new Register();
let SR=new Register();
let Alu1=new Alu();
let Registers=[R1,R2,R3,R4,Alu1.Acc,BR,IR,SR];

const handleRefresh = () => {
  window.location.reload();
};

/////////////////////////////function needed in assembling
function convertStrings(arr) {
  const result = [] ;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j += 2) {
      result.push(arr[i][j] + arr[i][j+1]);
    }
  }
  return result;
}

///////////////////////////////////the component/////////////////////////
const Ide = ({currentUser})=>{
  ////////////////////hooks///////////////////////////////:
  let [result,setresult]=useState("");
  let [txtColor,setTxtColor]=useState("green");
  let [done,setdone]=useState(false);
  let [simul,setsimul]=useState(false)
  let [memo,setmemo]=useState(false);
  let [reg,setreg]=useState(false);
  let [stk,setstk]=useState(false);//for showing stack
  let [isHexa,setIsHexa]=useState(false);
  let [iscode,setIsCode]=useState(true);
  let [iserr,seterr]=useState(false);
  let [Speed,setspeed]=useState(getSpeed());
  let [rescode,setrescode]=useState("")
useEffect(()=>{setSpeed(Speed)},[Speed])

  ///////////////////////////////executions function////////////////////////////////////////

  const traitement= (codeArray)=>{
    for(let i=0;i<50;i++){//initializing first 50 bytes in memory to 0 (data memory)
      memory.setRam(TwosComplement(i,8));
      memory.setRim("00000000");
      memory.write();
    }

    memory.setcode(codeArray);
    queue.instructionset([]);

    let numtmp=0;
    
    queue.fetchInstruction(animations,0,1,Contextarray,0);
    queue.fetchInstruction(animations,numtmp,0,Contextarray,0);
    queue.fetchInstruction(animations,1,1,Contextarray,0);
    queue.fetchInstruction(animations,numtmp,0,Contextarray,0);
    queue.fetchInstruction(animations,2,1,Contextarray,0);
    queue.fetchInstruction(animations,numtmp,0,Contextarray,0);



    console.log(queue.getinstwithoutshift())
    
    let instrobject={};
    while(instrobject.name!=="stop"){
      sequenceur.getinstrbyte(animations,true,Contextarray);
      instrobject={...sequenceur.decode(animations,Contextarray)};
      if(instrobject.name!=="stop"){
       
        sequenceur.execute(instrobject,1,animations);
      }
    }

  }

  let [checktest,setChecktest]=useState(false);

  /////////////////////returning the component//////////////////
  let tablec=[];
  memory.getData().forEach( (element,index) => {
    tablec.push(
      <tr>
        <td>
            {index}
        </td>
        <td>
            {element}
        </td>
      </tr>
    )
  });

  let tablestk=[];
  memory.getstack().forEach((element,index) => {
    tablestk.push(
      <tr>
        <td>
            {index}
        </td>
        <td>
            {element}
        </td>
      </tr>
    )
  });

  /////////////////////returning the component//////////////////
  const [code, setCode] = useState("");
  const [editMode, setEditMode] = useState({isEditMode: false, programName: null, programId: -1});

  const {state} = useLocation()
  useEffect(()=>{
    if(state){
      setEditMode(state.editMode);
      setCode(state.code);
    }
  
  },[state])


  const codeMirrorRef = useRef(null); 
  
  
  
    // For other instructions, default to a base length of 2 bytes.
    function getInstLeng(instruction) {
      // Tokenizer: expects format: mnemonic operand1, operand2 (if any)
      let tokens = instruction.split(/[\s,]+/).filter(t => t.length > 0);
      if (tokens.length === 0) return 0;
      
      // Use uppercase for consistency.
      let inst = tokens[0].toUpperCase();
    
      // Helper: Check if a token is an immediate constant (decimal or hex).
      function isImmediate(token) {
        return /^(\d+|0x[0-9a-fA-F]+)$/.test(token);
      }
    

      const branchInst = ['BNE', 'BE', 'BS', 'BI', 'BIE', 'BSE', 'BRI'];
      if (branchInst.includes(inst)) {

        return 3;
      }
      
      if (inst === 'MOV') {
        if (tokens.length < 3) return 0;
        return isImmediate(tokens[2]) ? 4 : 2;
      }
 
      const twoOpInst = ['ADD', 'SUB', 'MUL', 'DIV', 'AND', 'OR', 'XOR', 'NOR', 'NAND', 'CMP'];
      if (twoOpInst.includes(inst)) {
        if (tokens.length < 3) return 0;

        return isImmediate(tokens[2]) ? 4 : 2;
      }

      if (inst === 'CALL') {
        return 3;
      }

      const noOpInst = ['RET', 'PUSHA', 'POPA'];
      if (noOpInst.includes(inst)) {
        return 1;
      }
 
      const reducedInst = ['NOT', 'NEG', 'SHL', 'SHR', 'READ', 'WRITE', 'PUSH', 'POP', 'ROR', 'ROL'];
      if (reducedInst.includes(inst)) {

        if (tokens.length < 2) {
          return 1;
        }
        let operand = tokens[1];
 
        if (isImmediate(operand) || (operand.startsWith('[') && operand.endsWith(']'))) {
          return 2;
        } else {
          return 1;
        }
      }
      return 0;
    }
    

  
  const handleStoreCode = (nb) => {
    const editor = codeMirrorRef.current.editor;
    const code = editor.getValue();
  
    const commentArray = [];
    let lines = code.split('\n').filter(line => line.trim() !== '');
  
    lines.forEach((line, lineIndex) => {
      const singleLineComment = line.match(/(\/\/.*$|;.*$)/);
      if (singleLineComment) {
        commentArray.push(singleLineComment[0].trim());
      }
      lines[lineIndex] = line.replace(/(\/\/.*$|;.*$)/, '').trim().toUpperCase();
    });
  
    // Join lines into a string
    lines = lines.join('\n');
  
    const macrosBlockRegex = /^(?:\s*(?:(?:(?:\/\/|;)[^\n]*\n)|MACRO\s*(?:\s+[A-Za-z_]\w*(?:\s+(?:[A-Za-z_]\w*(?:\s*,\s*[A-Za-z_]\w*)*))?)?\s*\r?\n[\s\S]*?\r?\nENDM\s*))*\s*/i;
    const macroBlockMatch = code.match(macrosBlockRegex);
    const macroRegex = /(^MACRO\s*(?:\s+([A-Za-z_]\w*)(?:[ \t]+((?:[A-Za-z_]\w*(?:\s*,\s*[A-Za-z_]\w*)*)))?)?[ \t]*\r?\n([\s\S]*?)\r?\nENDM\s*$)/img;
  
    const macros = [];
    let match;
    while ((match = macroRegex.exec(lines)) !== null) {
      const start = match.index;
      let name = match[2];
      if (name) {
        name = name.toUpperCase();
      }
      const params = match[3] ? match[3].split(/\s*,\s*/) : [];
      const body = (match[4] || '').split('\n');
  
      if (body) {
        body.forEach((line, index) => {
          if (!line.trim().startsWith('//') && !line.trim().startsWith(';')) {
            body[index] = line.toUpperCase();
          }
        });
      }
      const numparam = params.length;
      macros.push({ name, params, numparam, body: body });
    }
  
    const exist = [];
    for (let i = 0; i < macros.length / 2; i++) {
      for (let j = 0; j < macros.length; j++) {
        if (macros[i].name === macros[j].name && i !== j) {
          if (exist.every(item => item.line !== j)) {
            exist.push({ error: "MACRO name already used", line: j });
          }
        }
      }
    }
  
    if (nb === 2) {
      return exist;
    }
  
    // Remove macros from the code.
    let codeWithoutMacros = lines.replace(macroRegex, '');
    codeWithoutMacros = codeWithoutMacros.split('\n').filter(line => line.trim() !== '');
  
    // Use codeWithoutMacros.length here instead of lines.length
    for (let lineIndex = 0; lineIndex < codeWithoutMacros.length; lineIndex++) {
      let line = codeWithoutMacros[lineIndex];
      for (const macro of macros) {
        let escapedName = macro.name;
        if (escapedName) {
          escapedName = escapedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        const regex = new RegExp(`^${escapedName}(?:\\s+([A-Za-z0-9_\\s,]+))?$`, 'i');
        const match = regex.exec(line);
    
        if (match) {
          const params = match[1] ? match[1].split(/\s*,\s*/).filter(p => p) : [];
          
       
          if (params.length !== macro.numparam) {
            continue;
          }
    
          let substitutedBody = [];
          for (let j = 0; j < macro.body.length; j++) {
            let newLine = macro.body[j];
            for (let i = 0; i < macro.numparam; i++) {
              const paramRegex = new RegExp(`\\b${macro.params[i]}\\b`, 'g');
              newLine = newLine.replace(paramRegex, params[i]);
            }
            substitutedBody.push(newLine);
          }
    
          codeWithoutMacros.splice(lineIndex, 1, ...substitutedBody);
          lineIndex--;
          break;
        }
      }
    }
    
  
    const labelTable = [];
    const codeArray = [];
  
    codeWithoutMacros.forEach((line, lineIndex) => {
      // Extract label at the beginning of the line.
      const labelMatch = line.match(/^\s*([^:]+):/);
      if (labelMatch) {
        labelTable.push({
          name: labelMatch[1].trim().replace(/\s/g, '').toUpperCase(),
          line: lineIndex,
        });
      }
  
      // Remove the label portion and add the remaining code.
      const newline = line.replace(/^\s*[^:]+:\s*/, '');
      if (newline !== '') {
        codeArray.push(newline.toUpperCase());
      }
    });
  
    if (labelTable) {
      labelTable.forEach((label) => {
        let pos = 0;
        for (let i = 0; i < label.line; i++) {
          pos += getInstLeng(codeArray[i].toUpperCase());
        }
        label.line = pos;
      });
    }

    if (nb === 0) {
      console.log("codeArray",codeArray);
      return codeArray;
    }
    if (nb === 1) {
      return labelTable;
    }
  };
  
  

  
  const handleStoreCode2 = () => {
    const editor = codeMirrorRef.current.editor;
    const code = editor.getValue(); // Get the current content of the editor
    
    // Split the code into lines
     const lines = code.split('\n');
  
    // Create an array to store the full code with comments
    const codeArray = [];
  
    // Loop through each line
    lines.forEach(line => {
      // Add the line to the codeArray
      codeArray.push(line);
    });
  
    return codeArray;
  };
  
 
  
  const Hexagen= (codeArray,hexaArray) => {
    // Join array elements with newline character
    let code=[];
    for (let index = 0; index < codeArray.length; index++) {
      if(codeArray[index].slice(0,codeArray[index].indexOf(" "))!=="LABEL"){code[index]=hexaArray[index]+"//"+codeArray[index]   }
    }    
  
    code = code.join('\n');
    return code;
  };

  let [isRefreshed,setIsRefreshed]=useState(true);

  useEffect(()=>{
      let storedArray = JSON.parse(localStorage.getItem('arr'));  
      console.log(storedArray)         
      if(storedArray!=null){
        console.log("stored_array",storedArray);
        storedArray=storedArray.join('\n');
        localStorage.removeItem('arr');
        setCode(storedArray);
        setIsRefreshed(false);

      }
  },[isRefreshed])

  return (
    <> 
      {!simul && 
        <>
          <NavBar/>
          <div style={{display:"flex"}} className="ide_container">
        
            <div className='codeContainer' id="cont">
              <div style={{display:"flex",gap:"10rem",padding:"0.5rem 0",}}>
                {iscode && 
                  <button onClick={()=>{
                    const editor = codeMirrorRef.current.editor;
                    editor.setValue('');
                    editor.setValue(Hexagen(handleStoreCode(0),Assembler.assemblecode(handleStoreCode(0),handleStoreCode(1),handleStoreCode(2))));
                    setChecktest(!checktest);
                    setIsCode(false);
                    setIsHexa(true);
                  }} 
                  className="convert-btn">
                    To Hexa 
                  </button>
                }
        
                {isHexa && 
                  <button onClick={()=>{
                    const editor = codeMirrorRef.current.editor;
                    editor.setValue('');
                    let code="";
                   
                    for (let m = 0; m <  handleStoreCode(0).length; m++) {
                      code+=HexaToCode(handleStoreCode(0)[m])+"\n";
               
                    } 
                          console.log("hereeeee",handleStoreCode(0));
                          console.log(code);
                    editor.setValue(code);
                    setChecktest(!checktest);
                    setIsCode(true);
                    setIsHexa(false);
                  }}
                  className="convert-btn">
                    To code 
                  </button>
                }
        
                <div className="togglebutton" style={{position: "relative",top:"0.3rem"}}>
                  <Toggle 
                    labelRight="hexa" 
                    labelLeft="code" 
                    backgroundColorChecked="#263238"
                    backgroundColorUnchecked="#263238" 
                    checked={checktest} 
                    onChange={()=>{
                        if(iscode){
                          const editor = codeMirrorRef.current.editor;
                          editor.setValue('');
                          editor.setValue(Hexagen(handleStoreCode(0),Assembler.assemblecode(handleStoreCode(0),handleStoreCode(1),handleStoreCode(2))));
                          setIsCode(false);
                          setIsHexa(true);
                          setChecktest(!checktest);
                        }else{
                          const editor = codeMirrorRef.current.editor;
                          editor.setValue('');
                          let code="";
                          for (let m = 0; m <  handleStoreCode(0).length; m++) {
                            code+=HexaToCode(handleStoreCode(0)[m])+"\n";
                    
                          }
                          editor.setValue(code);
                          setIsCode(true);
                          setIsHexa(false);
                          setChecktest(!checktest);
                        }
                      }} 
                  />
                </div>
              </div>
              <CodeMirror
                value={code}
                ref={codeMirrorRef}
                options={{ 
                  mode: "8086",
                  theme: "material",
                  lineNumbers:true,
                  readOnly: false,
                }}
                onBeforeChange={(editor, data, value) => {
                  setCode(value);
                }}
              />


            </div>
            {!done && 
              <div className="codeContainer console">
                <button 
                className='ide-exec-button' 
                onClick={()=>{
                  setdone(true);
                  let inputouter=[];

                  if(iscode){
                    inputouter=Assembler.assemblecode(handleStoreCode(0),handleStoreCode(1),handleStoreCode(2));
                  }else{
                    inputouter=handleStoreCode(0);
                  }
                  console.log("inputouter: ", inputouter);
                  let input=convertStrings(inputouter);
                  input.push("ff");
                  console.log("input: ", input);
                  try {
                    Errorcalm.errorr = Errorcalm.LexicalError.length + Errorcalm.SemanticError.length;
                    if (Errorcalm.errorr === 0) {
                      traitement(input);
                      let res = "";
                      txt.map((item) => {
                        res += item;
                      });
                      setresult(res);
                      setTxtColor("green");
                    }else{
                      setresult(Errorcalm.printError());
                      seterr(true);
                      setTxtColor("red");
                    }
                       
                    
                  } catch (error){
console.log("the error",error)
                    seterr(true);
                    setresult(Errorcalm.printError());
                  }
                  
                }}>
                  execute
                </button>

              </div>
            }
            
            



            {done && 
              <div className="codeContainer console">
                <div style={{width:"35%",position:"fixed",backgroundColor:"black", borderRadius: "0.6rem"}}>
                  <button className='ide-exec-button' onClick={()=>{
                  

                    let arr=[];
                    // const editor = codeMirrorRef.current.editor;
                    // const code = editor.getValue(); // Get the current content of the editor
                    arr=handleStoreCode2();
                    console.log(arr);
                    console.log("old arr=",arr);
                    localStorage.setItem('arr', JSON.stringify(arr));
                    console.log("current local storage : ",localStorage.getItem('arr'))
                    window.location.reload();
                  }}>re-write</button>

                  {!iserr &&< button 
                    className='ide-exec-button' 
                    onClick={()=>{
                      const parser = new UAParser();
                      const result = parser.getResult();
                      result.device.type==='mobile'? alert('Simulation not availble for this type of devices') : setsimul(true) ;
                    }}>
                    animate
                  </button>
                  }
                  {!iserr &&<button 
                    className='ide-exec-button' 
                    onClick={()=>{
                      setreg(true)
                      setmemo(false)
                      setstk(false)
                    }}
                  >
                    registers
                  </button>
                  }
                  {!iserr &&<button 
                  className='ide-exec-button' 
                  onClick={()=>{
                    setmemo(true)
                    setstk(false)
                    setreg(false)
                  }}
                  >
                    memory
                  </button>
                  } 
                  {!iserr &&<button 
                  className='ide-exec-button' 
                  onClick={()=>{
                    setstk(true)
                    setreg(false)
                    setmemo(false)
                  }}>
                    stack
                  </button>
                  }
                </div>
                {reg && 
                  <div className="IdeReg">
                    <div className="aregister">
                        <p className="aregide">R1  :</p>
                        <div className="aregC"><p style={{margin:"6px"}}>{Registers[0].getvalue()}</p></div>
                    </div>
                    <div className="aregister">
                        <p className="aregide">R1  :</p>
                        <div className="aregC"><p style={{margin:"6px"}}>{Registers[0].getvalue()}</p></div>
                    </div>
                    <div className="aregister">
                        <p className="aregide">R2  :</p>
                        <div className="aregC"><p style={{margin:"6px"}}>{Registers[1].getvalue()}</p></div>
                    </div>
                    <div className="aregister">
                        <p className="aregide">R3  :</p>
                        <div className="aregC"><p style={{margin:"6px"}}>{Registers[2].getvalue()}</p></div>
                    </div>
                    <div className="aregister">
                        <p className="aregide">R4  :</p>
                        <div className="aregC"><p style={{margin:"6px"}}>{Registers[3].getvalue()}</p></div>
                    </div>
                    <div className="aregister">
                        <p className="aregide">RI  :</p>
                        <div className="aregC"><p style={{margin:"6px"}}>{Registers[6].getvalue()}</p></div>
                    </div>
                    <div className="aregister">
                        <p className="aregide">RB  :</p>
                        <div className="aregC"><p style={{margin:"6px"}}>{Registers[5].getvalue()}</p></div>
                    </div>
                    <div className="aregister">
                        <p className="aregide">RS  :</p>
                        <div className="aregC"><p style={{margin:"6px"}}>{Registers[7].getvalue()}</p></div>
                    </div>
                    <div className="aregister">
                        <p className="aregide">Acc :</p>
                        <div className="aregC"><p style={{margin:"6px"}}>{Registers[4].getvalue()}</p></div>
                    </div>
                  </div> 
                }
                {memo && 
                  <table className="contentTableMCIde" style={{fontFamily: "JetBrains Mono"}}>
                    <tbody>
                    <tr>
                        <td style={{color:"#1BE985"}}>
                            adresse
                        </td>
                        <td style={{color:"#1BE985"}}>
                            content
                        </td>
                    </tr>
                        {tablec}
                    </tbody>
                  </table>
                }
                {stk && 
                  <table className="contentTableMCIde">
                    <tbody>
                    <tr>
                        <td style={{color:"#1BE985"}}>
                            adresse
                        </td>
                        <td style={{color:"#1BE985"}}>
                            content
                        </td>
                    </tr>
                        {tablestk}
                    </tbody>
                  </table>
                }
                {console.log(result)}
                <pre style={{color:txtColor}}>{`
${result}`}</pre>
              </div>
            }
          </div>
          <HelpSection helpDescription={helpDescription}/>
          <SaveCodeButton code={code} currentUser={currentUser} editMode={editMode}/>
        </>
      }
      {simul && 
        <Arch anim={animations} mem={memory} Spe={Speed} setspe={setspeed} flags={Alu1.getAllFlags()} reg={Registers} theCTX={Contextarray}/>
      }
    </>
  )
}

export default Ide;
export {BR,IR,memory,Registers,queue,addressingModes,Alu1,IP,ioUnit};
