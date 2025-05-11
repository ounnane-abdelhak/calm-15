import { useState , useRef,useEffect, useContext } from 'react';
import Toggle from 'react-styled-toggle';
import { Controlled as CodeMirror } from "react-codemirror2";
import UAParser from 'ua-parser-js';
import "./style.css"


///// import components //////
import { NavBar, HelpSection, SaveCodeButton } from "../../components"
////// import machine components //////
import Alu from "../../Emulator/ALU.js";
import MC from "../../Emulator/MC.js";
import Sequenceur from "../../Emulator/Sequencer.js";
import Queue from "../../Emulator/Queue.js";
import AddressingModes from "../../Emulator/Adressing.js";
import { generalPurposeRegister,Register } from "../../Emulator/Register.js";
import { TwosComplement } from "../../Emulator/ALU.js";
import Arch from '../Arch/index.jsx';
import { adrs, getadrs, getcode, getSpeed, pushadrs, setcode, setSpeed } from '../../Emulator/speed.js';
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
import specont from '../../speedcontext.js';
import { gettext } from '../../Emulator/setgettxt.js';


////////////////animations declarations////////////////////////////////
let animations=[];
////////////////context declarations///////////////////////////////////
let Contextarray=[];
let mess=[]; 
////////////////machine declarations////////////////////////////////

const handleRefresh = () => {
  window.location.reload();
};

/////////////////////////////function needed in assembling
function convertStrings(arr) {
  const result = [] ;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      for (let j = 0; j < arr[i].length; j += 2) {
        result.push(arr[i][j] + arr[i][j+1]);
      }
    }
  }
  return result;
}
function isValidString(str) {
  // Check if the string contains any special characters
  if (/[^a-zA-Z0-9_]/.test(str)) {
    return false;
  }else{
  
  // Check if the string begins with a number
  if (/^\d/.test(str)) {
    return false;
  }else{
  // Check if the string is in the excluded list
  if (Assembler.excludedStrings.includes(str)) {
    return false;
  }else{    
  // If none of the above conditions are met, the string is valid ;
  //console.log("valid string")
  return true;
  }
}}
}   

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
export {memory,BR,IR,Registers,queue,addressingModes,Alu1,IP,ioUnit,sequenceur};
///////////////////////////////////the component/////////////////////////
const Ide = ({currentUser})=>{
  ////////////////////hooks///////////////////////////////:
  let [result,setresult]=useState("");
  let [done,setdone]=useState(false);
  let [simul,setsimul]=useState(false)
  let [memo,setmemo]=useState(false);
  let [reg,setreg]=useState(false);
  let [stk,setstk]=useState(false);//for showing stack
  let [cache,setCache]=useState(false);//for showing cache
  let [isHexa,setIsHexa]=useState(false);
  let [iscode,setIsCode]=useState(true);
  let [iserr,seterr]=useState(false);
  const {speed, setsp} = useContext(specont);
  let [spmess,setspmess]=useState("normal speed")
  let offset=0;
  let offset2=0;

  let [displayedtext ,setDtxt] =useState("") ; 
  useEffect(() => {

    setDtxt(gettext());
  },[gettext()])

useEffect(()=>{setSpeed(speed)
  console.log("External speed updated to:", getSpeed());
switch (speed) {
  case 1:
    setspmess("slow speed");
    break;
    case 2:
      setspmess("normal speed");
      break;
      case 3:
        setspmess("fast speed");
        break;
        case 4:
          setspmess("very fast speed");
          break;
  default:
    break;
}

},[speed])
  ///////////////////////////////executions function////////////////////////////////////////

  const traitement= (codeArray)=>{
    for(let i=0;i<50;i++){//initializing first 50 bytes in memory to 0 (data memory)
      memory.setRam(TwosComplement(i,8));
      memory.setRim("00000000");
      memory.initialize();
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
       for (let i = 0;i < mess.length;i++) {
            for (let j = 0;j < mess[i].length;j++){ 
              memory.setRim(mess[i][j].charCodeAt(0).toString(16));
              memory.setRam( TwosComplement(offset2,16));
              memory.write();
              offset2++;
              memory.setRim("00");
              memory.setRam( TwosComplement(offset2,16));
              memory.write();
              offset2++;
              }
          }
    while(instrobject.name!=="stop"){
      sequenceur.getinstrbyte(animations,true,Contextarray);
      instrobject={...sequenceur.decode(animations,0,Contextarray)};
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

  let tablecache=[];
      Array.from(memory.cache.getCache()).forEach( (element,index) => {
    tablecache.push(
      <tr>
        <td>
            {element[0]}
        </td>
        <td>
            {element[1]}
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
  
  
  function invalidlist(procName) {
    // Predefined lists of reserved keywords
    const instructions = [
      "ADD", "SUB", "MUL", "DIV", "AND", "OR", "XOR", "NOR", "NAND",
      "CMP", "CMPS", "MOV", "MOVS", "CALL", "RET", "PUSHA", "POPA",
      "BE", "BNE", "BS", "BI", "BIE", "BSE", "BR",
      "NEG", "NOT", "SHL", "SHR",
      "RD", "RDS", "WRT", "WRTS",
      "PUSH", "POP", "ROR", "ROL",
      "LODS"
    ]
    const registers = [
      "R1", "R2", "R3", "R4", "ACC", "BR", "IR", "SR",
      "R1H", "R2H", "R3H", "R1L", "R2L", "R3L", "ACCR", "ACCL"
    ];
  
    const directives = ["MACRO", "ENDM", "ENDP", "LABEL", "STR"];
  
    // Combine all reserved words into a single Set
    const reservedWords = new Set([
      ...instructions,
      ...registers,
      ...directives
    ]);
  
    return reservedWords.has(procName.toUpperCase());
  }
  function detproc(lines) {
    const procRegex = /(^([A-Za-z_]\w*)\s+PROC[ \t]*\r?\n([\s\S]*?)\r?\n\2\s+ENDP\s*$)/gim;
  
    const procs = [];
    let m;
    while ((m = procRegex.exec(lines)) !== null) {
      const [, , nameRaw, bodyText] = m;
      const name = nameRaw.toUpperCase();

      const body = bodyText.split('\n').map(l => 
        /^\s*;/.test(l) ? l : l.toUpperCase()
      );
  
      procs.push({ 
        name, 
        body, 
        line: getLineNumber(lines, m.index) 
      });
  
      if (invalidlist(name)) {
        Errorcalm.SemanticError.push(
          new Errorcalm(`Procedure name "${name}" is forbidden`, null, getLineNumber(lines, m.index))
        );
      }
    }

    for (let i = 0; i < procs.length; i++) {
      for (let j = i + 1; j < procs.length; j++) {
        if (procs[i].name === procs[j].name) {
          Errorcalm.SemanticError.push(
            new Errorcalm(`PROC name "${procs[j].name}" already used`, null, procs[j].line)
          );
        }
      }
    }

    const allLines = lines.split('\n');
    for (const p of procs) {
      if (p.line > 0) {
        const lineBefore = allLines[p.line - 1].trim();
        const isValidContext = 
          /^([A-Za-z_]\w*):$/.test(lineBefore) || 
          /^\/\//.test(lineBefore) || 
          /^#/.test(lineBefore) ||  
          /^\s*$/.test(lineBefore);
  
        if (!isValidContext) {
          Errorcalm.SemanticError.push(
            new Errorcalm(`Invalid code before procedure "${p.name}"`, null, p.line)
          );
        }
      }
    }

    let codeLines = lines.split(":").join(":\n")
      .replace(procRegex, '') 
      .split('\n')
      .filter(l => l.trim()); 
    return { 
      procedures: procs, 
      codeWithoutProcedures: codeLines,
      errors: Errorcalm.SemanticError 
    };
}


function getLineNumber(text, charIndex) {
    const lines = text.split('\n');
    let count = 0;
    for (let i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (count > charIndex) return i;
    }
    return -1;
}
  function getInstLeng(instruction) {
    if(!instruction) return 0;
    const tokens = instruction.trim().split(/[\s,]+/).filter(token => token.length > 0);
    if (tokens.length === 0) return 0;
    const inst = tokens[0].toUpperCase();
    const registers = new Set(["R1", "R2", "R3", "R4", "ACC", "BR", "IDR", "IR", "SR", "MAR", "MDR", "IP"]);
    function isImmediate(token) {
      if (/^(\d+|0x[0-9a-fA-F]+)$/.test(token)) return true;
      if (token.startsWith('[') && token.endsWith(']')) return false;
      return !registers.has(token.toUpperCase());
    }
    const branchInst = new Set(['BNE', 'BE', 'BS', 'BI', 'BIE', 'BSE', 'BRI']);
    if (branchInst.has(inst)) return 3;
    if (inst === 'MOV') {
      if (tokens.length < 3) return 0;
      return isImmediate(tokens[2]) ? 4 : 2;
    }
    if (inst === 'RDS' || inst === 'WRTS') {
      if (tokens.length < 2) return 0;
      return 3;
    }
    const twoOpInst = new Set(['ADD', 'SUB', 'MUL', 'DIV', 'AND', 'OR', 'XOR', 'NOR', 'NAND', 'CMP']);
    if (twoOpInst.has(inst)) {
      if (tokens.length < 3) return 0;
      return isImmediate(tokens[2]) ? 4 : 2;
    }
    if (inst === 'CALL') return 3;
    const noOpInst = new Set(['RET', 'PUSHA', 'POPA',"STOP"]);
    if (noOpInst.has(inst)) return 1;
    const reducedInst = new Set(["CMPS",'LODS','MOVS','NOT', 'NEG', 'SHL', 'SHR', 'RD', 'WRT', 'PUSH', 'POP', 'ROR', 'ROL']);
    if (reducedInst.has(inst)) {
      if (inst === 'RD' || inst === 'WRT' || inst === 'LODS'|| inst === 'CMPS' || inst === 'MOVS') return 1;
      if (tokens.length < 2) return 1;
      const operand = tokens[1];
      return (isImmediate(operand) || (operand.startsWith('[') && operand.endsWith(']'))) ? 2 : 1;
    }
    return 0;
  }

  const handleStoreCode = (nb) => {

    const editor = codeMirrorRef.current.editor;
    const code = editor.getValue();
    const commentArray = [];

    let lines = code.split('\n').filter(line => line.trim() !== '');
    let lines2=lines;
    lines.forEach((line, lineIndex) => {
      const singleLineComment = line.match(/(\/\/.*$|;.*$)/);
      if (singleLineComment) {
        commentArray.push(singleLineComment[0].trim());
      }
      lines[lineIndex] = line.replace(/(\/\/.*$|;.*$)/, '').trim().toUpperCase();
      lines2[lineIndex] = line.replace(/(\/\/.*$|;.*$)/, '').trim();
    });
  

    lines = lines.join('\n');
    lines2=lines2.join('\n').split(':').join(':\n').split('\n');
    const macroRegex = /(^MACRO\s*(?:\s+([A-Za-z_]\w*)(?:[ \t]+((?:[A-Za-z_]\w*(?:\s*,\s*[A-Za-z_]\w*)*)))?)?[ \t]*\r?\n(([\s\S]*?)\r?)?\nENDM\s*$)/img;
  
    const macros = [];
    let match;
    while ((match = macroRegex.exec(lines)) !== null) {
      const start = match.index;
      let name = match[2];
      if (name) {
        name = name.toUpperCase();
      }
      const params = match[3] ? match[3].toUpperCase().split(/\s*,\s*/) : [];
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
    for (let i = 0; i < macros.length ; i++) {
      for (let j = i+1; j < macros.length; j++) {
        if (macros[i].name == macros[j].name ) {
         
            exist.push({ error: "MACRO name already used", line: j });
          
        }
      }
    }
let i=0;
if(exist && i==0){i++;
  let ss=exist.pop()
  while(ss?.error){
      Errorcalm.SemanticError.push(new Errorcalm(ss.error, null, ss.line));
    ss=exist.pop();
  }
}

    let codeWithoutMacros = lines.replace(macroRegex, '');
    codeWithoutMacros = codeWithoutMacros.split('\n').filter(line => line.trim() !== '');

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
              newLine = newLine.replace(paramRegex,params[i]);
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
    const codeArray = [...codeWithoutMacros];

 let code2 = [];
 lines2.forEach(line => {
  let inQuotes = false;
  let cleanLine = "";
  for (let i = 0; i < line.length; i++) {
    let char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      cleanLine += char;
      continue;
    }
    if (!inQuotes) {
      if (char === '#' || char === ';') break;
      if (char === '/' && i + 1 < line.length && line[i + 1] === '/') break;
    }
    cleanLine += char;
  }

  const tokens = cleanLine.match(/"[^"]*"|\S+/g);
  if (tokens) {
    const processedTokens = tokens.map(token => {
      if (token.startsWith('"') && token.endsWith('"')) {
        return token;
      }
      return token.toUpperCase();
    });
    code2.push(processedTokens);
  }
});

 for (let i = 0; i < code2.length; i++) {
   const line = code2[i];
   let reg2 = /[a-zA-Z]*[a-z0-9A-Z_]+/;
   let reg3 = /^"[^"]+"$/;
   if (line[0] === "STR") {
     if (line.length === 3) {
       if (reg3.test(line[2])) {
         if (reg2.test(line[1])) {
           let valid = true;
           for (let j = 0; j < i; j++) {
             if (!["STR", "LABEL"].includes(code2[j][0])) {
               valid = false;
               break;
             }
           }
           if (valid) {
             if (isValidString(line[1])) {
               let found = false;
               let strname = line[1];
               Assembler.STRlist.forEach(element => {
                 if (element.name === strname) {
                   found = true;
                 }
               });
               if (!found) {
                 let word = line[2];
                 if (typeof word !== "string") {
                   word = String(word);
                 }
                 let match = word.match(/"([^"]*)"/);
                 if (match) {
                   mess.push(match[1]);
                 } else {
                   Errorcalm.SemanticError.push(new Errorcalm("Could not extract string", null, i));
                 }
                 Assembler.STRlist.push({ name: line[1], begin: offset*2});
                 offset += line[2].length-2;
               }
             } else {
               Errorcalm.SemanticError.push(new Errorcalm("STR name is not valid", null, i));
             }
           } else {
             Errorcalm.SemanticError.push(new Errorcalm("STR must be defined before code", null, i));
           }
         } else {
           Errorcalm.SemanticError.push(new Errorcalm("STR name not defined", null, i));
         }
       } else {
         Errorcalm.SemanticError.push(new Errorcalm("STR must be a text", null, i));
       }
     } else {
       if (isValidString(line[2])) {
         Errorcalm.SemanticError.push(new Errorcalm("STR must have only two operands", null, i));
       } else {
         Errorcalm.SemanticError.push(new Errorcalm("STR name is not valid", null, i));
       }
     }
  
   } 
 }
let codearray2=[]

codeArray.forEach((line)=>{
 codearray2.push(line.toUpperCase())
})

codeArray.length=0;
codearray2.forEach((line)=>{
  const reg=/^\s*STR\s+/
  if(!reg.test(line)){codeArray.push(line)}
})

  let num=0;

let cd=codeArray.join('\n').split(':').join(':\n')
let procs=detproc(cd);
let ss=0,ss1=0;
let tab=[];
for (let i = 0; i < procs.codeWithoutProcedures.length; i++) {
  ss+=getInstLeng(procs.codeWithoutProcedures[i])  ;
}
ss+=getInstLeng("STOP")
ss1=ss;
for (let j = 0; j < procs.procedures.length; j++) {
  tab=[...tab,... procs.procedures[j].body]
}
let recode=[...procs.codeWithoutProcedures,`STOP`,...tab];

for (let i = 0; i < procs.procedures.length; i++) {
  Assembler.PROClist.push({name : procs.procedures[i].name ,adr : ss1})
  for (let j = 0; j < procs.procedures[i].body.length; j++) {
    ss1+=getInstLeng(procs.procedures[i].body[j])  ;
  }

}


let line;
let code3=[];

 codeArray.length=0;
let codeLineIndex = 0;
recode.forEach((line) => {
  const labelMatch = line.match(/^\s*([^:]+):/);
  if (labelMatch) {
    labelTable.push({
      name: labelMatch[1].trim().replace(/\s/g, '').toUpperCase(),
      line: codeLineIndex,
    });
  }
  const newline = line.replace(/^\s*[^:]+:\s*/, '');
  if (newline !== '') {
    codeArray.push(newline.toUpperCase());
    codeLineIndex++;
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
code3.length=0;
codeArray.forEach(line => {
  let inQuotes = false;
  let cleanLine = "";
  for (let i = 0; i < line.length; i++) {
    let char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      cleanLine += char;
      continue;
    }
    if (!inQuotes) {
      if (char === '#' || char === ';') break;
      if (char === '/' && i + 1 < line.length && line[i + 1] === '/') break;
    }
    cleanLine += char;
  }

  const tokens = cleanLine.match(/"[^"]*"|\S+/g);
  if (tokens) {
    const processedTokens = tokens.map(token => {
      if (token.startsWith('"') && token.endsWith('"')) {
        return token;
      }
      return token.toUpperCase();
    });
    code3.push(processedTokens);
  }
});
let found=false;
let l = 0;
while(!found && l<codeArray.length && !["STOP","BNE","BE","BRI","BS","BI","BSE","BIE","RET"].includes(code3[l])){
num=0;
line=code3[l];
if(line[0]=="CALL"){found=true;

for (let index = 0; index <=l; index++) {
num+=getInstLeng(codeArray[index]?.toUpperCase());
}
}
l++;  
}
if(found && !adrs.includes(num)){
  pushadrs(num)
}
setcode(codeArray);
if (nb === 0) {
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
code[index]=hexaArray[index]+"//"+codeArray[index]   
    }    
    code = code.join('\n');
    return code;
  };

  let [isRefreshed,setIsRefreshed]=useState(true);

  useEffect(()=>{
    let storedArray = JSON.parse(localStorage.getItem('arr'));          
    if(storedArray!=null){
      storedArray=storedArray.join('\n');
      localStorage.removeItem('arr');
      setCode(storedArray);
      setIsRefreshed(false);
    }
    let restoredCode = JSON.parse(localStorage.getItem('restoreCode'));          
    if(restoredCode){
      restoredCode = restoredCode.replace(/\n{2,}/g, "\n");
      localStorage.removeItem('restoreCode');
      setCode(restoredCode);
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
                    const array = handleStoreCode(0);
                    for (let m = 0; m <  array.length; m++) {
                      if (array[m] !== "STOP" && array[m] !== "FF") {
                        code+=HexaToCode(array[m])+"\n";
                      }
                    }
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
                          const array = handleStoreCode(0);
                          for (let m = 0; m <  array.length; m++) {
                            if (array[m] !== "STOP" && array[m] !== "FF") {
                              code+=HexaToCode(array[m])+"\n";
                            }
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
                  let input=convertStrings(inputouter);
                  input.push("ff");
                  try {
                    Errorcalm.errorr = Errorcalm.LexicalError.length + Errorcalm.SemanticError.length;
                    if (Errorcalm.errorr === 0) {
                      traitement(input);
                    
                    }else{
                      setresult(Errorcalm.printError());
                      seterr(true);

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
                    localStorage.setItem('arr', JSON.stringify(arr));
                    console.log("current local storage : ",localStorage.getItem('arr'))
                    window.location.reload();
                  }}>re-write</button>

                  {!iserr &&< button 
                    className='ide-exec-button' 
                    onClick={()=>{
                      const editor = codeMirrorRef.current.editor;
                      let restoreCode = "";
                      editor.display.maxLine.parent.lines.forEach(element => {
                        restoreCode += element.text + "\n";
                      });
                      localStorage.setItem("restoreCode", JSON.stringify(restoreCode));
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
                      if (!reg) {
                        setreg(true)
                        setmemo(false)
                        setstk(false)
                        setCache(false)
                        if (!localStorage.getItem('result')) {
                          localStorage.setItem('result', JSON.stringify(result));
                          setresult("")
                        }
                      } else {
                        setreg(false)
                        setresult(JSON.parse(localStorage.getItem('result')));
                        localStorage.removeItem('result');
                      }
                    }}
                  >
                    registers
                  </button>
                  }
                  {!iserr &&<button 
                  className='ide-exec-button' 
                  onClick={()=>{
                    if (!memo) {
                      setmemo(true)
                      setstk(false)
                      setreg(false)
                      setCache(false)
                      if (!localStorage.getItem('result')) {
                        localStorage.setItem('result', JSON.stringify(result));
                        setresult("")
                      }
                    } else {
                      setmemo(false)
                      setresult(JSON.parse(localStorage.getItem('result')));
                      localStorage.removeItem('result');
                    }
                  }}
                  >
                    memory
                  </button>
                  } 
                  {!iserr &&<button 
                  className='ide-exec-button' 
                  onClick={()=>{
                    if (!stk) {
                      setstk(true)
                      setreg(false)
                      setmemo(false)
                      setCache(false)
                      if (!localStorage.getItem('result')) {
                        localStorage.setItem('result', JSON.stringify(result));
                        setresult("")
                      }
                    } else {
                      setstk(false)
                      setresult(JSON.parse(localStorage.getItem('result')));
                      localStorage.removeItem('result');
                    }
                    
                  }}>
                    stack
                  </button>
                  }
                  {!iserr &&<button 
                  className='ide-exec-button' 
                  onClick={()=>{
                    if (!cache) {
                      setstk(false)
                      setreg(false)
                      setmemo(false)
                      setCache(true)
                      if (!localStorage.getItem('result')) {
                        localStorage.setItem('result', JSON.stringify(result));
                        setresult("")
                      }
                    } else {
                      setCache(false)
                      setresult(JSON.parse(localStorage.getItem('result')));
                      localStorage.removeItem('result');
                    }
                  }}>
                    cache
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
                {cache && 
                  <table className="contentTableMCIde" style={{fontFamily: "JetBrains Mono"}}>
                    <tbody>
                    <tr>
                        <td style={{color:"#1BE985"}}>
                            key
                        </td>
                        <td style={{color:"#1BE985"}}>
                            value
                        </td>
                    </tr>
                        {tablecache}
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
               <pre style={{color:"green"}}>{`
${displayedtext}`}</pre>
                <pre style={{color:"red"}}>{`
${result}`}</pre>
  

              </div>
            }
          </div>
          <HelpSection helpDescription={helpDescription}/>
          <SaveCodeButton code={code} currentUser={currentUser} editMode={editMode}/>
        </>
      }
      {simul && 
        <Arch anim={animations} mem={memory}  flags={Alu1.getAllFlags()} reg={Registers} theCTX={Contextarray}/>
      }
      <div className='speed'> 
        <label htmlFor="speed">{spmess}</label>
        <input type="range" min="1" max="4" id="speed" value={speed}  onChange={(e) => {setsp(Number(e.target.value))}} />
        </div>

    </>
  )
}

export default Ide;

