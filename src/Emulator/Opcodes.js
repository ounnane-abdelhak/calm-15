
import {InstructionCMPS,InstructionCALL,InstructionRET,InstructionLODS, InstructionMOVS, InstructionCMP,InstructionREAD,InstructionWRITE,InstructionADD,InstructionMOV00,InstructionMOV01,InstructionMOV10,InstructionMOV11,InstructionSUB,InstructionMUL,InstructionDIV, InstructionPUSH, InstructionBR, InstructionNOR, InstructionNEG, InstructionROR, InstructionROL, InstructionSHL, InstructionSHR, InstructionBE, InstructionBS, InstructionBSE, InstructionBI, InstructionBIE, InstructionBNE, InstructionNOT, InstructionOR, InstructionAND, InstructionNAND, InstructionXOR,InstructionPUSHA,InstructionPOPA, InstructionPOP, InstructionREADS, InstructionWRITES } from "./Instruction.js";

function hash(key){
    if(key=="0000000"){
        return 0;
    }else if(key=="000110000"){
        return 1;
    }else if(key=="000110001"){
        return 2;
    }else if(key=="000110010"){
        return 3;
    }else if(key=="000110011"){
        return 4;
    }else if(key=="0000001"){
        return 5;
    }else if(key=="0000010"){
        return 6;
    }else if(key=="0000011"){
        return 7;
    }else if(key=="1010"){
        return 8;
    }else if(key=="0011000"){
        return 9;
    }else if(key=="0000111"){
        return 10;
    }else if(key=="0100"){
        return 11;
    }else if(key=="1100"){
        return 12;
    }else if(key=="1101"){//ROL
        return 13;
    }else if(key=="0110"){//SHL
        return 14;
    }else if(key=="0111"){//SHR
        return 15;
    }else if(key=="0101"){//NOT
        return 16;
    }else if(key=="0010010"){//BE
        return 17;
    }else if(key=="0010100"){//BS
        return 18;
    }else if(key=="0010111"){//BSE
        return 19;
    }else if(key=="0010101"){//BI
        return 20;
    }else if(key=="0010110"){//BIE
        return 21;
    }else if(key=="0010011"){//BNE
        return 22;
    }else if(key=="0000101"){//OR
        return 23;
    }else if(key=="0000100"){//AND
        return 24;
    }else if(key=="0001000"){//NAND
        return 25;
    }else if(key=="0000110"){//XOR
        return 26;
    }else if(key=="0010000"){//PUSHA
        return 27;
    }else if(key=="0010001"){//POPA
        return 28;
    }else if(key=="1000"){//READ
        return 29;
    }else if(key=="1001"){//WRITE
        return 30;
    }else if(key=="0001001"){//CMP
        return 31;
    }else if(key=="1011"){//POP
        return 32;
    }else if(key=="0011100"){//RDS
        return 33;
    }else if(key=="0011101"){//WRTS
        return 34;
    }else if(key=="0011110"){//RET
        return 35;
    }else if(key=="0011001"){ //CALL
        return 36
    }else if(key=="1110"){//MOVS
        return 37;
    }else if(key=="0011010"){//LODS
        return 38;
    }else if(key=="0011011"){//CMPS
        return 39;
    }


}
let CALLinst= new InstructionCALL();
let RETinst= new InstructionRET();
let POPinst=new InstructionPOP();
let CMPinst=new InstructionCMP();
let ADDinst=new InstructionADD();
let MOV00inst=new InstructionMOV00();
let MOV01inst=new InstructionMOV01();
let MOV10inst=new InstructionMOV10();
let MOV11inst=new InstructionMOV11();
let SUBinst=new InstructionSUB();
let MULinst=new InstructionMUL();
let DIVinst=new InstructionDIV();
let pushInst=new InstructionPUSH();
let BRInst= new InstructionBR();
let NORinst = new InstructionNOR();
let NEGinst= new InstructionNEG();
let RORinst = new InstructionROR();
let ROLinst = new InstructionROL();
let SHLinst = new InstructionSHL();
let SHRinst = new InstructionSHR();
let NOTinst = new InstructionNOT();
let BEinst = new InstructionBE();
let BSinst = new InstructionBS();
let BSEinst = new InstructionBSE();
let BIinst = new InstructionBI();
let BIEinst = new InstructionBIE();
let BNEinst = new InstructionBNE();
let ORinst = new InstructionOR();
let ANDinst = new InstructionAND();
let NANDinst = new InstructionNAND();
let XORinst = new InstructionXOR();
let pushaInst=new InstructionPUSHA();
let popaInst=new InstructionPOPA();
let READinst=new InstructionREAD();
let WRITEinst=new InstructionWRITE();
let READSinst=new InstructionREADS();
let WRITESinst=new InstructionWRITES();
let MOVSinst=new InstructionMOVS();
let LODSinst=new InstructionLODS();
let CMPSinst=new InstructionCMPS();
let hashmap=[
{
    key:"00",
    instrObject:ADDinst,
},
{
    key:"030",
    instrObject:MOV00inst,
},
{
    key:"031",
    instrObject:MOV01inst,
},
{
    key:"032",
    instrObject:MOV10inst,
},
{
    key:"033",
    instrObject:MOV11inst,
},
{
    key:"01",
    instrObject:SUBinst,
},
{
    key:"02",
    instrObject:MULinst,
},
{
    key:"03",
    instrObject:DIVinst,
},
{
    key:"a",
    instrObject:pushInst,
},
{
    key:"25",
    instrObject:BRInst,
},
{
    key:"07",
    instrObject:NORinst,
},
{
    key:"4",
    instrObject:NEGinst,
},
{
    key:"c",
    instrObject:RORinst,
},
{
    key:"d",
    instrObject:ROLinst,
},
{
    key:"6",
    instrObject:SHLinst,
},
{
    key:"7",
    instrObject:SHRinst,
},
{
    key:"5",
    instrObject:NOTinst,
},
{
    key:"24",
    instrObject:BEinst,
},
{
    key:"28",
    instrObject:BSinst,
},
{
    key:"2e",
    instrObject:BSEinst,
},
{
    key:"2a",
    instrObject:BIinst,
},
{
    key:"2c",
    instrObject:BIEinst,
},
{
    key:"26",
    instrObject:BNEinst,
},
{
    key:"0a",
    instrObject:ORinst,
},
{
    key:"08",
    instrObject:ANDinst,
},
{
    key:"10",
    instrObject:NANDinst,
},
{
    key:"0c",
    instrObject:XORinst,
},
{
    key:"21",
    instrObject:pushaInst,
},
{
    key:"23",
    instrObject:popaInst,
},
{
    key:"8",
    instrObject:READinst,
},
{
    key:"9",
    instrObject:WRITEinst,
},
{
    key:"12",
    instrObject:CMPinst,
},
{
    key:"b",
    instrObject:POPinst,
},
{
    key:"39",
    instrObject:READSinst
},
{
    key:"3b",
    instrObject:WRITESinst
},
{
    key:"3d",
    instrObject:RETinst   
},
{
    key:"33",
    instrObject:CALLinst   
},
{
    key:"e",
    instrObject:MOVSinst
},
{
    key:"35",
    instrObject:LODSinst
},
{
    key:"37",
    instrObject:CMPSinst
}

];
export {hash,hashmap};
