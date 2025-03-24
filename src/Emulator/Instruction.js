import  {BR,IR,memory,mess,Registers,queue,addressingModes,Alu1,IP,ioUnit,sequenceur} from "../pages/Ide";

import { TwosComplement } from "./ALU.js";
import { gsap } from "gsap";
// import { Register } from "./Register.js";
////////////////////////////////////////////////
function Dec2bin(dec){
    return ("00000000" + (parseInt(dec, 10)).toString(2)).substr(-8);
}
function hex2bin(hex){
    return ("0".repeat(16-(parseInt(hex, 16)).toString(2).length) + (parseInt(hex, 16)).toString(2));
}
function hex2binlow(hex){
    return ("0".repeat(8-(parseInt(hex, 16)).toString(2).length) + (parseInt(hex, 16)).toString(2));
}
function binaryToHexlow(binaryString) {
    const decimalValue = parseInt(binaryString, 2);
    let hexString = decimalValue.toString(16).toUpperCase();
  if(hexString.length%2==1){hexString="0"+hexString;}
    return hexString;
}
const Bin16ToHexaLow = (bin) => {
    const c = bin.substring(8,12);
    const d = bin.substring(12,16);
    let hexStr = "";
    switch (c) {
      case '0000':
        hexStr += "0"
        break;
      case '0001':
        hexStr += "1"
        break;
      case '0010':
        hexStr += "2"
        break;
      case '0011':
        hexStr += "3"
        break;
      case '0100':
        hexStr += "4"
        break;
      case '0101':
        hexStr += "5"
        break;
      case '0110':
        hexStr += "6"
        break;
      case '0111':
        hexStr += "7"
        break;
      case '1000':
        hexStr += "8"
        break;
      case '1001':
        hexStr += "9"
        break;
      case '1010':
        hexStr += "a"
        break;
      case '1011':
        hexStr += "b"
        break;
      case '1100':
        hexStr += "c"
        break;
      case '1101':
        hexStr += "d"
        break;
      case '1110':
        hexStr += "e"
        break;
      case '1111':
        hexStr += "f"
        break;
      default:
        break;
    }
    switch (d) {
      case '0000':
        hexStr += "0"
        break;
      case '0001':
        hexStr += "1"
        break;
      case '0010':
        hexStr += "2"
        break;
      case '0011':
        hexStr += "3"
        break;
      case '0100':
        hexStr += "4"
        break;
      case '0101':
        hexStr += "5"
        break;
      case '0110':
        hexStr += "6"
        break;
      case '0111':
        hexStr += "7"
        break;
      case '1000':
        hexStr += "8"
        break;
      case '1001':
        hexStr += "9"
        break;
      case '1010':
        hexStr += "a"
        break;
      case '1011':
        hexStr += "b"
        break;
      case '1100':
        hexStr += "c"
        break;
      case '1101':
        hexStr += "d"
        break;
      case '1110':
        hexStr += "e"
        break;
      case '1111':
        hexStr += "f"
        break;
      default:
        break;
    }
    return hexStr;
}
const Bin16ToHexaHigh = (bin) => {
    const a = bin.substring(0,4);
    const b = bin.substring(4,8);
    let hexStr = "";
    switch (a) {
      case '0000':
        hexStr += "0"
        break;
      case '0001':
        hexStr += "1"
        break;
      case '0010':
        hexStr += "2"
        break;
      case '0011':
        hexStr += "3"
        break;
      case '0100':
        hexStr += "4"
        break;
      case '0101':
        hexStr += "5"
        break;
      case '0110':
        hexStr += "6"
        break;
      case '0111':
        hexStr += "7"
        break;
      case '1000':
        hexStr += "8"
        break;
      case '1001':
        hexStr += "9"
        break;
      case '1010':
        hexStr += "a"
        break;
      case '1011':
        hexStr += "b"
        break;
      case '1100':
        hexStr += "c"
        break;
      case '1101':
        hexStr += "d"
        break;
      case '1110':
        hexStr += "e"
        break;
      case '1111':
        hexStr += "f"
        break;
      default:
        break;
    }
    switch (b) {
      case '0000':
        hexStr += "0"
        break;
      case '0001':
        hexStr += "1"
        break;
      case '0010':
        hexStr += "2"
        break;
      case '0011':
        hexStr += "3"
        break;
      case '0100':
        hexStr += "4"
        break;
      case '0101':
        hexStr += "5"
        break;
      case '0110':
        hexStr += "6"
        break;
      case '0111':
        hexStr += "7"
        break;
      case '1000':
        hexStr += "8"
        break;
      case '1001':
        hexStr += "9"
        break;
      case '1010':
        hexStr += "a"
        break;
      case '1011':
        hexStr += "b"
        break;
      case '1100':
        hexStr += "c"
        break;
      case '1101':
        hexStr += "d"
        break;
      case '1110':
        hexStr += "e"
        break;
      case '1111':
        hexStr += "f"
        break;
      default:
        break;
    }
    return hexStr;
}
/////////////////animations to test////////////////////
let speed=3;
export const setSpeed=(val)=>{speed=val;}
export const getSpeed=()=>{return speed;}

function binaryToHex(binaryString) {
    const decimalValue = parseInt(binaryString, 2);
    let hexString = decimalValue.toString(16).toUpperCase();
  if(hexString.length%2==1){hexString="0"+hexString;}
  if(hexString.length==2){hexString="00"+hexString;}
    return hexString;
  }


// Speed control (put this at the top)


const IounitToBus={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball", {height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.221,y:h*0.39,opacity:"0"}, {opacity:"1",duration:1});
    gsap.fromTo(".ball", {x:w*0.221,y:h*0.39}, {y:h*0.46 ,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
    },
}

const BusToRual1={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 54% , 24,45% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.143,y:h*0.56,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.143,y:h*0.56},{y:h*0.625 ,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
},}

const Rual1ToBus={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 54% , 24,45% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.143,y:h*0.625,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.143,y:h*0.625},{ y:h*0.56,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
  },}
  
  const BusToRual2={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 54% , 35,2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.299,y:h*0.56,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.299,y:h*0.56},{y:h*0.625 ,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
  },}
  
  const BusToRegisters={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 53.7% , 47.8% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.481,y:h*0.555,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.481,y:h*0.555},{y:h*0.58 ,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
  },}

  const RegistersToBus={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 53.7% , 47.8% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.481,y:h*0.58,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.481,y:h*0.58},{y:h*0.555 ,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
  },}

  const IrToDecoder={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 59% , 78.2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.644,y:h*0.708,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.644,y:h*0.708},{y:h*0.725 ,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
  },}
  
  const DecoderToSequencer={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 59% , 78.2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.644,y:h*0.813,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.644,y:h*0.813},{y:h*0.827 ,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
  },}
  
  const QueueToIr={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 64.9% , 64.2% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.726,y:h*0.6638,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.726,y:h*0.6638},{x:w*0.711 ,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
  },}

  const queueExitToBus={
    value:"",
    target:".ball",
    time:4000,
    anim:(val,h,w)=>{
        gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.726,y:h*0.6638,opacity:"0"},{opacity:"1" ,duration:1});
        gsap.fromTo(".ball",{x:w*0.726,y:h*0.6638},{x:w*0.715 ,duration:1,delay:1});
        gsap.to(".ball",{y:h*0.555 ,duration:1,delay:2});
        gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
    }
  }
  
  const queueExitToBus2={
    value:"",
    target:".ball",
    time:500,
    anim:(val,h,w)=>{
        gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.726,y:h*0.6638,opacity:"0"},{opacity:"1" ,duration:1});
        gsap.fromTo(".ball",{x:w*0.726,y:h*0.6638},{x:w*0.715 ,duration:1,delay:1});
    }
  }
  
  const BusToQueue={
    value:"",
    target:".ball",
    time:4000,
    anim:(val,h,w)=>{
    ///depart: ( 79.1% , 53.6% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.931,y:h*0.56,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.931,y:h*0.56},{y:h*0.6638 ,duration:1,delay:1});
    gsap.to(".ball",{x:w*0.921 ,duration:1,delay:2});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  
  const BusToAcc={
    value:"",
    target:".ball",
    time:4000,
    anim:(val,h,w)=>{
    ///depart: ( 39.7% , 54% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.361,y:h*0.56,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.361,y:h*0.56},{y:h*0.923 ,duration:1,delay:1});
    gsap.to(".ball",{x:w*0.282 ,duration:1,delay:2});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const AccToBus={
    value:"",
    target:".ball",
    time:4000,
    anim:(val,h,w)=>{
    ///depart: ( 39.7% , 54% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.282,y:h*0.923,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.282,y:h*0.923},{x:w*0.361 ,duration:1,delay:1});
    gsap.to(".ball",{y:h*0.56 ,duration:1,delay:2});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  
  const AluToAcc={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 30.3% , 83.5% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.226,y:h*0.863,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.226,y:h*0.863},{y:h*0.877 ,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
  },}
  
  const MdrToBus={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 51.8% , 43.2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.539,y:h*0.445,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.539,y:h*0.445},{y:h*0.465 ,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
  },}

  const BusToMdr={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 51.8% , 43.2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.539,y:h*0.465,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.539,y:h*0.465},{y:h*0.445 ,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
  },}
  
  const AdrToBus={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 66.3% , 25.4% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.784,y:h*0.137,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.784,y:h*0.137},{y:h*0.18 ,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
  },}
  
  const IpToAdr={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 69% , 13.7% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.746,y:h*0.26,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.746,y:h*0.26},{y:h*0.46 ,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
  },}
  
  /////////////data bus animations/////////////////:
  
  const MdrTOQue={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1})
    gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.874,duration:1,delay:1})
    gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}
  
  const MdrToReg={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.44,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}

  const RegToMdr={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.497,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}
  let queueExitToReg={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
        gsap.fromTo(".box-data",{x:w*0.68,opacity:"0"},{opacity:"1",duration:1})
        gsap.fromTo(".box-data",{x:w*0.68},{x:w*0.44,duration:1,delay:1})
        gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
    }
}
  const MdrToIO={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.182,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}
  const IOToMdr={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.182,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.182},{x:w*0.497,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}
  const IOToUnderIP={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.182,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.182},{x:w*0.708,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}
  const UnderIPToMar={
    value:"",
    target:".box-ADR",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-ADR",{x:w*0.712,opacity:"0"},{opacity:"1",duration:1})
    gsap.fromTo(".box-ADR",{x:w*0.712},{x:w*0.648,duration:1,delay:1})
    gsap.to(".box-ADR",{opacity:"0" ,duration:1,delay:2});
  },}
  const UnderIpToAddBus={
    value:"",
    target:".ball",
    time:3000,
    anim:(val,h,w)=>{
    ///depart: ( 51.8% , 43.2% )
    gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.745,y:h*0.465,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.745,y:h*0.465},{y:h*0.26 ,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
  },}
  const MdrToRual1={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.262,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}

  const RegToRual1={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1})
    gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.262,duration:1,delay:1})
    gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
    },}

const MdrToRual2={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1})
    gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.106,duration:1,delay:1})
    gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
    },}

  const RegToRual2={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.106,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}

  const AccToMDR={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.321},{x:w*0.497,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}
  const MDRToAcc={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.321,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}

  const AccToReg={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.321},{x:w*0.44,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}

  const RegToAcc={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.321,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}
  
  const MdrToADR={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.497,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.497},{x:w*0.705,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}

  const AccToADR={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.321,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.321},{x:w*0.705,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}


  const Rual1ToADR={
    value:"",
    target:".box-data",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-data",{x:w*0.44,opacity:"0"},{opacity:"1",duration:1})
  gsap.fromTo(".box-data",{x:w*0.44},{x:w*0.705,duration:1,delay:1})
  gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
  },}

  const BusToIr={
    value:"",
    target:".ball",
    time:4000,
    anim:(val,h,w)=>{
    ///depart: ( 79.1% , 53.6% )  W:1.4% ,H:2.812
    gsap.fromTo(".ball",{x:w*0.931,y:h*0.56,opacity:"0"},{opacity:"1" ,duration:1});
    gsap.fromTo(".ball",{x:w*0.931,y:h*0.56},{y:h*0.6638 ,duration:1,delay:1});
    gsap.to(".ball",{x:w*0.711 ,duration:1,delay:2});
    gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}

  //////////////// Adresse bus animations ///////////////////////////////
const IPToMAR={
    value:"",
    target:".box-ADR",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-ADR",{x:w*0.753,opacity:"0"},{opacity:"1",duration:1})
    gsap.fromTo(".box-ADR",{x:w*0.753},{x:w*0.648,duration:1,delay:1})
    gsap.to(".box-ADR",{opacity:"0" ,duration:1,delay:2});
  },}

const ADRToMAR={
    value:"",
    target:".box-ADR",
    time:3000,
    anim:(val,h,w)=>{
    gsap.fromTo(".box-ADR",{x:w*0.712,opacity:"0"},{opacity:"1",duration:1})
    gsap.fromTo(".box-ADR",{x:w*0.712},{x:w*0.648,duration:1,delay:1})
    gsap.to(".box-ADR",{opacity:"0" ,duration:1,delay:2});
  },}
  
  ////////////////////////fitting animations//////////////////////
  const fitToRual1={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"20px",width:w*0.067,height:h*0.05,x:w*0.12,y:h*0.658,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"20px",width:w*0.067,height:h*0.05,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToRual1={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.12,y:h*0.658,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.12,y:h*0.658,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1});
    },}
  const fitToRual2={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"20px",width:w*0.067,height:h*0.05,x:w*0.275,y:h*0.658,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"20px",width:w*0.067,height:h*0.05,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const fitToR2={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.666,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToR2={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.666,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.666,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1});
    },}

  const fitToR1={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
      gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.6105,opacity:"0"},{opacity:"1" ,duration:1});
    //   gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
    //   gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
    },}
    const infitToR1={
        value:"",
        target:".ball",
        time:1000,
        anim:(val,h,w)=>{
            // gsap.fromTo(".ball",{x:w*0.442,y:h*0.6105,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
            // gsap.fromTo(".ball",{x:w*0.442,y:h*0.6105,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
            // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
            gsap.to(".ball",{opacity:"0" ,duration:1});
        },}

  const fitToR3={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.7205,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}

  const infitToR3={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.7205,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.7205,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1});
    },}

  const fitToR4={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.7735,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}

  const infitToR4={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.7735,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.7735,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1});
    },}

  const fitToIdr={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.8277,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToIdr={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.8277,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.8277,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1});
    },}
  const fitToBr={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.8815,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToBr={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.8815,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.8815,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1});
    },}
  const fitToSr={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,x:w*0.442,y:h*0.9347,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToSR={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.9347,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.442,y:h*0.9347,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1});
    },}
  const fitToIr={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.055,x:w*0.6,y:h*0.6495,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.055,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const fitToDecode={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.055,x:w*0.6,y:h*0.753,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.055,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const fitToSequencer={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.055,x:w*0.6,y:h*0.858,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.055,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const fitToAcc={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.07,height:h*0.055,x:w*0.1995,y:h*0.91,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.07,height:h*0.055,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToAcc={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.1995,y:h*0.91,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.1995,y:h*0.91,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1});
    },}
  const fitToMdr={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.11,height:h*0.06,x:w*0.49,y:h*0.38,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.11,height:h*0.06,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToMdr={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
        // gsap.fromTo(".ball",{x:w*0.49,y:h*0.38,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
        // gsap.fromTo(".ball",{x:w*0.49,y:h*0.38,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
        // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
        gsap.to(".ball",{opacity:"0" ,duration:1});
    },}
  const fitToMar={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.032,height:h*0.14,x:w*0.623,y:h*0.165,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.032,height:h*0.14,duration:1,delay:1});
    // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
  },}
  const infitToMar={
    value:"",
    target:".ball",
    time:1000,
    anim:(val,h,w)=>{
    // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.032,height:h*0.14,x:w*0.623,y:h*0.165,opacity:"0"},{opacity:"1" ,duration:1});
    // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.032,height:h*0.14,duration:1,delay:1});
    gsap.to(".ball",{opacity:"0" ,duration:1});
  },}

  const addanim={
    value:"",
    target:".ALU",
    time:2000,
    anim:(val,h,w)=>{
        gsap.fromTo(".ALU",{opacity:"0"},{opacity:"1" ,duration:1});
        gsap.fromTo(".ALU",{opacity:"1"},{opacity:"0" ,duration:1,delay:1});
    },}

    const MCanim={
        value:"",
        target:".MC",
        time:2000,
        anim:(val,h,w)=>{
            gsap.fromTo(".MC",{opacity:"0"},{opacity:"1" ,duration:1});
            gsap.fromTo(".MC",{opacity:"1"},{opacity:"0" ,duration:1,delay:1});
        },}

        const IOToBus={
            value:"",
            target:".box-data",
            time:3000,
            anim:(val,h,w)=>{
            ///depart: ( 51.8% , 43.2% )
            gsap.fromTo(".box-data",{x:w*0.182,opacity:"0"},{opacity:"1",duration:1})
          gsap.fromTo(".box-data",{x:w*0.182},{x:w*0.442,duration:1,delay:1})
          gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
          },}
          const BusToIO={
            value:"",
            target:".box-data",
            time:3000,
            anim:(val,h,w)=>{
            ///depart: ( 51.8% , 43.2% )
            gsap.fromTo(".box-data",{x:w*0.442,opacity:"0"},{opacity:"1",duration:1})
          gsap.fromTo(".box-data",{x:w*0.442},{x:w*0.182,duration:1,delay:1})
          gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
          },}
          const QueueToIO={
            value:"",
            target:".box-data",
            time:3000,
            anim:(val,h,w)=>{
            ///depart: ( 51.8% , 43.2% )
            gsap.fromTo(".box-data",{x:w*0.68,opacity:"0"},{opacity:"1",duration:1})
          gsap.fromTo(".box-data",{x:w*0.68},{x:w*0.182,duration:1,delay:1})
          gsap.to(".box-data",{opacity:"0" ,duration:1,delay:2});
          },}
        
          const BufferToBus={
            value:"",
            target:".ball",
            time:3000,
            anim:(val,h,w)=>{
            ///depart: ( 51.8% , 43.2% )
            gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.221,y:h*0.39,opacity:"0"},{opacity:"1" ,duration:1});
            gsap.fromTo(".ball",{x:w*0.221,y:h*0.39},{y:h*0.465 ,duration:1,delay:1});
            gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
          },}
        
        
          const BusToBuffer={
            value:"",
            target:".ball",
            time:3000,
            anim:(val,h,w)=>{
            ///depart: ( 51.8% , 43.2% )
            gsap.fromTo(".ball",{height:"2.812%",width:"1.4%",borderRadius:"50%",x:w*0.221,y:h*0.465,opacity:"0"},{opacity:"1" ,duration:1});
            gsap.fromTo(".ball",{x:w*0.221,y:h*0.465},{y:h*0.39 ,duration:1,delay:1});
            gsap.to(".ball",{opacity:"0" ,duration:1,delay:2});
          },}

          const fitToIO={
            value:"",
            target:".ball",
            time:1000,
            anim:(val,h,w)=>{
            gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.07,height:h*0.05,x:w*0.197,y:h*0.315,opacity:"0"},{opacity:"1" ,duration:1});
            // gsap.fromTo(".ball",{height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
            // gsap.to(".ball",{opacity:"0" ,duration:1,delay:3});
          },}

          const infitToIO={
            value:"",
            target:".ball",
            time:1000,
            anim:(val,h,w)=>{
                // gsap.fromTo(".ball",{x:w*0.442,y:h*0.7735,opacity:"0",height:"2.812%",width:"1.4%"},{borderRadius:"10px",width:w*0.1,height:h*0.045,duration:1,delay:1});
                // gsap.fromTo(".ball",{x:w*0.442,y:h*0.7735,opacity:"0"},{opacity:"1" ,duration:1,delay:1});
                // gsap.fromTo(".ball",{borderRadius:"10px",width:w*0.1,height:h*0.045,},{height:"2.812%",width:"1.4%",borderRadius:"50%",duration:1,delay:1});
                gsap.to(".ball",{opacity:"0" ,duration:1});
            },}
////////////////////////////////////////////////


class InstructionCMP{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.res=0;
        this.name="CMP";
        this.steps=[()=>{
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.compareBinary(8);
                
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.compareBinary(16);
            }
        }
        ];
        this.buildanim=function(){
            return[{
                value:"CMP",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionADD{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.res=0;
        this.name="ADD";
        this.steps=[()=>{
            // this.res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.addBinary(8);
                
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.addBinary(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"ADD",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}
class InstructionMOV00{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="MOV-RR";
        this.steps=[()=>{
            Registers[this.register1].setvalue(TwosComplement(this.value2,16));
        }
        ];
        this.buildanim=function(){
            if(this.register1=="000"){
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                        time:AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                        time:AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }
            }else if (this.register1=="001") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        target:fitToR2.target,
                        time:fitToR2.time,
                        value:"value2",
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                        time:AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                        time:AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }
            }else if (this.register1=="2") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                        time:AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                        time:AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }
            }else if (this.register1=="3") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                        time:AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                        time:AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }
            }else if (this.register1=="4") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                        time:RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                        time:RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                        time:RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                        time:RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                        time:RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                        time:RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:RegToAcc.target,
                        time:RegToAcc.time,
                        anim:RegToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }
            }else if (this.register1=="5") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                        time:AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                        time:AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }
            }else if (this.register1=="6") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                        time:AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                        time:AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }
            }else if (this.register1=="7") {
                if(this.register2=="000"){
                    return[{
                        value:"value2",
                        target:infitToR1.target,
                        time:infitToR1.time,
                        anim:infitToR1.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="001") {
                    return[{
                        value:"value2",
                        target:infitToR2.target,
                        time:infitToR2.time,
                        anim:infitToR2.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                    
                }else if (this.register2=="2") {
                    return[{
                        value:"value2",
                        target:infitToR3.target,
                        time:infitToR3.time,
                        anim:infitToR3.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="3") {
                    return[{
                        value:"value2",
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="4") {
                    return[{
                        value:"value2",
                        target:infitToAcc.target,
                        time:infitToAcc.time,
                        anim:infitToAcc.anim,
                    },
                    {
                        value:"",
                        target:AccToBus.target,
                        time:AccToBus.time,
                        anim:AccToBus.anim,
                    },
                    {
                        value:"value2",
                        target:AccToReg.target,
                        time:AccToReg.time,
                        anim:AccToReg.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="5") {
                    return[{
                        value:"value2",
                        target:infitToBr.target,
                        time:infitToBr.time,
                        anim:infitToBr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="6") {
                    return[{
                        value:"value2",
                        target:infitToIdr.target,
                        time:infitToIdr.time,
                        anim:infitToIdr.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else if (this.register2=="7") {
                    return[{
                        value:"value2",
                        target:infitToSR.target,
                        time:infitToSR.time,
                        anim:infitToSR.anim,
                    },
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }
            }
            
        }
    }
    
}
class InstructionMOV01{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.isimmed=0;
        this.name="MOV-RM";
        this.steps=[()=>{
            Registers[this.register1].setvalue(TwosComplement(this.value2,16));
        }
        ];
        this.buildanim=function(){
            if(this.register1=="0"){
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToR1.target,
                        time:fitToR1.time,
                        anim:fitToR1.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:"value2",
                    target:fitToR1.target,
                    time:fitToR1.time,
                    anim:fitToR1.anim,
                },
            ];}
            }else if (this.register1=="1") {
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToR2.target,
                        time:fitToR2.time,
                        anim:fitToR2.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:"value2",
                    target:fitToR2.target,
                    time:fitToR2.time,
                    anim:fitToR2.anim,
                },
            ];
        }
            }else if (this.register1==2) {
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToR3.target,
                        time:fitToR3.time,
                        anim:fitToR3.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:"value2",
                    target:fitToR3.target,
                    time:fitToR3.time,
                    anim:fitToR3.anim,
                },
            ];}
            }else if (this.register1=="3") {
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToR4.target,
                        time:fitToR4.time,
                        anim:fitToR4.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:"value2",
                    target:fitToR4.target,
                    time:fitToR4.time,
                    anim:fitToR4.anim,
                },
            ];}
            }else if (this.register1=="4") {
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:BusToAcc.target,
                        time:BusToAcc.time,
                        anim:BusToAcc.anim,
                    },
                    {
                        value:"value2",
                        target:fitToAcc.target,
                        time:fitToAcc.time,
                        anim:fitToAcc.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MDRToAcc.target,
                    time:MDRToAcc.time,
                    anim:MDRToAcc.anim,
                },
                {
                    value:"value2",
                    target:BusToAcc.target,
                    time:BusToAcc.time,
                    anim:BusToAcc.anim,
                },
                {
                    value:"value2",
                    target:fitToAcc.target,
                    time:fitToAcc.time,
                    anim:fitToAcc.anim,
                },
            ];}
            }else if (this.register1=="5") {
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToBr.target,
                        time:fitToBr.time,
                        anim:fitToBr.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:"value2",
                    target:fitToBr.target,
                    time:fitToBr.time,
                    anim:fitToBr.anim,
                },
            ];}
            }else if (this.register1=="6") {
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToIdr.target,
                        time:fitToIdr.time,
                        anim:fitToIdr.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:"value2",
                    target:fitToIdr.target,
                    time:fitToIdr.time,
                    anim:fitToIdr.anim,
                },
            ];}
            }else if (this.register1=="7") {
                if(this.isimmed===1){
                    return[
                    {
                        value:"value2",
                        target:fitToSr.target,
                        time:fitToSr.time,
                        anim:fitToSr.anim,
                    },
                ];
                }else{
                return[{
                    value:"value2",
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"",
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"value2",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:"value2",
                    target:fitToSr.target,
                    time:fitToSr.time,
                    anim:fitToSr.anim,
                },
            ];
            }}
        }
    }
}
class InstructionMOV10{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="MOV-MR";
        this.steps=[()=>{
            if(this.taille==1){
                let hexval=this.value2.toString(16);
                while(hexval.length<4){
                    hexval='0'+hexval;
                }
                memory.setRim(hexval.substring(0,2));
                memory.setRam( TwosComplement(this.addresse1+1,16));
                memory.write();
                memory.setRim(hexval.substring(2,4));
                memory.setRam( TwosComplement(this.addresse1,16));
                memory.write();
            }else{
            memory.setRim(this.value2.toString(16));
            memory.setRam(TwosComplement(this.addresse1,16));
            memory.write();
            }
        }
        ];
        this.buildanim=function(){
            if(this.register1=="000"){
                return[{
                    value:"value2",
                    target:infitToR1.target,
                    time:infitToR1.time,
                    anim:infitToR1.anim,
                },
                {
                    value:"",
                    target:RegistersToBus.target,
                    time:RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
                
            ];
            }else if (this.register1=="001") {
                return[{
                    value:"value2",
                    target:infitToR2.target,
                    time:infitToR2.time,
                    anim:infitToR2.anim,
                },
                {
                    value:"",
                    target:RegistersToBus.target,
                    time:RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }            
            ];
                
            }else if (this.register1=="2") {
                return[{
                    value:"value2",
                    target:infitToR3.target,
                    time:infitToR3.time,
                    anim:infitToR3.anim,
                },
                {
                    value:"",
                    target:RegistersToBus.target,
                    time:RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
                
            ];
            }else if (this.register1=="3") {
                return[{
                    value:"value2",
                    target:infitToR4.target,
                    time:infitToR4.time,
                    anim:infitToR4.anim,
                },
                {
                    value:"",
                    target:RegistersToBus.target,
                    time:RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
                
            ];
            }else if (this.register1=="4") {
                return[{
                    value:"value2",
                    target:infitToAcc.target,
                    time:infitToAcc.time,
                    anim:infitToAcc.anim,//we have to change animations here___________________________________
                },
                {
                    value:"",
                    target:AccToBus.target,
                    time:AccToBus.time,
                    anim:AccToBus.anim,
                },
                {
                    value:"value2",
                    target:AccToMDR.target,
                    time:AccToMDR.time,
                    anim:AccToMDR.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
                
            ];
            }else if (this.register1=="5") {
                return[{
                    value:"value2",
                    target:infitToBr.target,
                    time:infitToBr.time,
                    anim:infitToBr.anim,
                },
                {
                    value:"",
                    target:RegistersToBus.target,
                    time:RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if (this.register1=="6") {
                return[{
                    value:"value2",
                    target:infitToIdr.target,
                    time:infitToIdr.time,
                    anim:infitToIdr.anim,
                },
                {
                    value:"",
                    target:RegistersToBus.target,
                    time:RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if (this.register1=="7") {
                return[{
                    value:"value2",
                    target:infitToSR.target,
                    time:infitToSR.time,
                    anim:infitToSR.anim,
                },
                {
                    value:"",
                    target:RegistersToBus.target,
                    time:RegistersToBus.time,
                    anim:RegistersToBus.anim,
                },
                {
                    value:"value2",
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:"value2",
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }
            
        }
    }
    
}
class InstructionMOV11{////the difference between them will be in the animation part
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.isimmed=true;
        this.name="MOV-MM";
        this.steps=[()=>{
            if(this.taille==1){
                let hexval=this.value2.toString(16);
                while(hexval.length<4){
                    hexval='0'+hexval;
                }
                memory.setRim(hexval.substring(0,2));
                memory.setRam(TwosComplement(this.addresse1+1,16));
                memory.write();
                memory.setRim(hexval.substring(2,4));
                memory.setRam(TwosComplement(this.addresse1,16));
                memory.write();
            }else{
            memory.setRim(this.value2.toString(16));
            memory.setRam(TwosComplement(this.addresse1,16));
            memory.write();
            }
        }
        ];
        this.buildanim=function(){
            if(this.isimmed==false){
                return[{
                    value:"addresse1",
                    target:infitToAcc.target,
                    time:infitToAcc.time,
                    anim:infitToAcc.anim,
                },
                {
                    value:"",
                    target:AccToBus.target,
                    time:AccToBus.time,
                    anim:AccToBus.anim,
                },
                {
                    value:"addresse1",
                    target:AccToADR.target,
                    time:AccToADR.time,
                    anim:AccToADR.anim,
                },
                {
                    value:"addresse1",
                    target:ADRToMAR.target,
                    time:ADRToMAR.time,
                    anim:ADRToMAR.anim,
                },
                {
                    value:"addresse1",
                    target:fitToMar.target,
                    time:fitToMar.time,
                    anim:fitToMar.anim,
                },
                {
                    value:"WRITE",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];}else{
                return[
                    {
                        value:"value2",
                        target:infitToMdr.target,
                        time:infitToMdr.time,
                        anim:infitToMdr.anim,
                    },
                    {
                        value:"WRITE",
                        target:MCanim.target,
                        time:MCanim.time,
                        anim:MCanim.anim,
                    }
                ];///animation of writing in MC/___________________________
            }
        }
    }
    
}


class InstructionSUB{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="SUB";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.subBinary(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.subBinary(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"SUB",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionMUL{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="MUL";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.binaryMultiply(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                let R4MUL=Alu1.binaryMultiply(16);
                if(Alu1.Acc.getvalue().length>16){
                    Registers[3].setvalue(R4MUL);
                }
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"MUL",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionDIV{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="DIV";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                let R4div=Alu1.DivBinary(8);
                Registers[3].setvalue(R4div);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                let R4div=Alu1.DivBinary(16);
                Registers[3].setvalue(R4div);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"DIV",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}
class InstructionAND{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="AND";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.andBinary(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.andBinary(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"AND",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}
class InstructionOR{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="OR";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.orBinary(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.orBinary(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"OR",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionXOR{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="XOR";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.xorBinary(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.xorBinary(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"XOR",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionNOR{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="NOR";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.norBinary(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.norBinary(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"NOR",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
}

class InstructionNAND{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="NAND";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.Rual2.setleft(TwosComplement(this.value2,8));
                Alu1.nandBinary(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.Rual2.setvalue(TwosComplement(this.value2,16));
                Alu1.nandBinary(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"NAND",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
}

class InstructionPUSH{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="PUSH";
        this.steps=[()=>{
            if(this.taille==1){  
            memory.setRim(binaryToHex(Registers[parseInt(this.register1,2)].getvalue()).slice(0,2));
            memory.pushval();
            memory.setRim(binaryToHex(Registers[parseInt(this.register1,2)].getvalue()).slice(-2));
            memory.pushval();}else{
                memory.setRim(binaryToHexlow(this.value1));
                memory.pushval();
            }
        }
        ];
        this.buildanim=function(){
            if(this.register1=="000"){
                return[{
                    value:this.value1,
                    target:fitToR1.target,
                    time:fitToR1.time,
                    anim:fitToR1.anim,
                },
                {
                    value:this.value1,
                    target:infitToR1.target,
                    time:infitToR1.time,
                    anim:infitToR1.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="001"){
                return[{
                    value:this.value1,
                    target:fitToR2.target,
                    time:fitToR2.time,
                    anim:fitToR2.anim,
                },
                {
                    value:this.value1,
                    target:infitToR2.target,
                    time:infitToR2.time,
                    anim:infitToR2.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="010"){
                return[{
                    value:this.value1,
                    target:fitToR3.target,
                    time:fitToR3.time,
                    anim:fitToR3.anim,
                },
                {
                    value:this.value1,
                    target:infitToR3.target,
                    time:infitToR3.time,
                    anim:infitToR3.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="011"){
                return[{
                    value:this.value1,
                    target:fitToR4.target,
                    time:fitToR4.time,
                    anim:fitToR4.anim,
                },
                {
                    value:this.value1,
                    target:infitToR4.target,
                    time:infitToR4.time,
                    anim:infitToR4.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="100"){
                return[{
                    value:this.value1,
                    target:fitToAcc.target,
                    time:fitToAcc.time,
                    anim:fitToAcc.anim,
                },
                {
                    value:this.value1,
                    target:infitToAcc.target,
                    time:infitToAcc.time,
                    anim:infitToAcc.anim,
                },
                {
                    value:this.value1,
                    target:AccToBus.target,
                    time:AccToBus.time,
                    anim:AccToBus.anim,
                },
                {
                    value:this.value1,
                    target:AccToMDR.target,
                    time:AccToMDR.time,
                    anim:AccToMDR.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="101"){
                return[{
                    value:this.value1,
                    target:fitToBr.target,
                    time:fitToBr.time,
                    anim:fitToBr.anim,
                },
                {
                    value:this.value1,
                    target:infitToBr.target,
                    time:infitToBr.time,
                    anim:infitToBr.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="110"){
                return[{
                    value:this.value1,
                    target:fitToIdr.target,
                    time:fitToIdr.time,
                    anim:fitToIdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToIdr.target,
                    time:infitToIdr.time,
                    anim:infitToIdr.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }else if(this.register1=="111"){
                return[{
                    value:this.value1,
                    target:fitToSr.target,
                    time:fitToSr.time,
                    anim:fitToSr.anim,
                },
                {
                    value:this.value1,
                    target:infitToSR.target,
                    time:infitToSR.time,
                    anim:infitToSR.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:"PUSH",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                }
            ];
            }
        }
    }
}

class InstructionPOP{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="POP";
        this.steps=[()=>{
            if(this.taille==1){
                let reg;
                memory.popval();
                reg=memory.getRim();
                memory.popval();
                reg=memory.getRim()+reg;
                Registers[parseInt(this.register1,2)].setvalue(hex2bin(reg));
            }else{
                memory.popval();
                Registers[parseInt(this.register1,2)].setvalue(hex2bin(memory.getRim()));
                switch (this.register1) {
                    case "000":
                        Registers[0].setright(hex2binlow(memory.getRim()));
                        break;
                    case "001":
                        Registers[1].setright(hex2binlow(memory.getRim()));
                        break;
                    case "010":
                        Registers[2].setright(hex2binlow(memory.getRim()));
                        break;
                    case "011":
                        Registers[4].setright(hex2binlow(memory.getRim()));
                        break;
                    case "100":
                        Registers[0].setleft(hex2binlow(memory.getRim()));
                        break;
                    case "101":
                        Registers[1].setleft(hex2binlow(memory.getRim()));
                        break;
                    case "110":
                        Registers[2].setleft(hex2binlow(memory.getRim()));
                        break;
                    case "111":
                        Registers[4].setleft(hex2binlow(memory.getRim()));
                        break;

                }
            }
        }
        ];
        this.buildanim=function(){
            if(this.register1=="000"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR1.target,
                    time:fitToR1.time,
                    anim:fitToR1.anim,
                },
                {
                    value:this.value1,
                    target:infitToR1.target,
                    time:infitToR1.time,
                    anim:infitToR1.anim,
                },
            ];
            }else if(this.register1=="001"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR2.target,
                    time:fitToR2.time,
                    anim:fitToR2.anim,
                },
                {
                    value:this.value1,
                    target:infitToR2.target,
                    time:infitToR2.time,
                    anim:infitToR2.anim,
                },
                ];
            }else if(this.register1=="010"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR3.target,
                    time:fitToR3.time,
                    anim:fitToR3.anim,
                },
                {
                    value:this.value1,
                    target:infitToR3.target,
                    time:infitToR3.time,
                    anim:infitToR3.anim,
                },
            ];
            }else if(this.register1=="011"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR4.target,
                    time:fitToR4.time,
                    anim:fitToR4.anim,
                },
                {
                    value:this.value1,
                    target:infitToR4.target,
                    time:infitToR4.time,
                    anim:infitToR4.anim,
                },
                //push animation
            ];
            }else if(this.register1=="100"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MDRToAcc.target,
                    time:MDRToAcc.time,
                    anim:MDRToAcc.anim,
                },
                {
                    value:"",
                    target:BusToAcc.target,
                    time:BusToAcc.time,
                    anim:BusToAcc.anim,
                },
                {
                    value:this.value1,
                    target:fitToAcc.target,
                    time:fitToAcc.time,
                    anim:fitToAcc.anim,
                },
                {
                    value:this.value1,
                    target:infitToAcc.target,
                    time:infitToAcc.time,
                    anim:infitToAcc.anim,
                },
                //push animation
            ];
            }else if(this.register1=="101"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToBr.target,
                    time:fitToBr.time,
                    anim:fitToBr.anim,
                },
                {
                    value:this.value1,
                    target:infitToBr.target,
                    time:infitToBr.time,
                    anim:infitToBr.anim,
                },
                //push animation
            ];
            }else if(this.register1=="110"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation of pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToIdr.target,
                    time:fitToIdr.time,
                    anim:fitToIdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToIdr.target,
                    time:infitToIdr.time,
                    anim:infitToIdr.anim,
                },
                //push animation
            ];
            }else if(this.register1=="111"){
                return[{
                    value:"POP",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToSr.target,
                    time:fitToSr.time,
                    anim:fitToSr.anim,
                },
                {
                    value:this.value1,
                    target:infitToSR.target,
                    time:infitToSR.time,
                    anim:infitToSR.anim,
                },
                //push animation
            ];
            }
        }
    }
}

class InstructionBR{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="BR";
        this.steps=[(animations)=>{
            IP.setvalue(Dec2bin(this.addresse1));
            // console.log(`this is ip ${IP.getvalue()}`)
            /////we need to clear the queue from old instruction 
            queue.clear(animations);
            queue.fetchInstruction(animations,0,1,[],0);
            // console.log(`this is the queue ${queue.log()}`);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,1,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,2,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
        }
        ];
        this.buildanim=function(){
            return[];
        }
    }
}

class InstructionBE{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="BE";
        this.steps=[(animations)=>{
            
            if(Alu1.getFlags(0)==='1'){
                IP.setvalue(Dec2bin(this.addresse1));
            // console.log(`this is ip ${IP.getvalue()}`)
            /////we need to clear the queue from old instruction 
            queue.clear(animations);
            queue.fetchInstruction(animations,0,1,[],0);
            // console.log(`this is the queue ${queue.log()}`);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,1,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,2,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            }
            /////we need to clear the queue from old instruction 
        }
        ];
        this.buildanim=function(){
            return[];
        }
    }
}

class InstructionBNE{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="BNE";
        this.steps=[(animations)=>{
            if(Alu1.getFlags(0)==='0'){
                IP.setvalue(Dec2bin(this.addresse1));
            // console.log(`this is ip ${IP.getvalue()}`)
            /////we need to clear the queue from old instruction 
            queue.clear(animations);
            queue.fetchInstruction(animations,0,1,[],0);
            // console.log(`this is the queue ${queue.log()}`);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,1,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,2,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            }
            /////we need to clear the queue from old instruction 
        }
        ];
        this.buildanim=function(){
            return[];
        }
    }
}

class InstructionBS{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="BS";
        this.steps=[(animations)=>{
            if(Alu1.Acc.getvalue().toString().charAt(0)=='0'){
                IP.setvalue(Dec2bin(this.addresse1));
            // console.log(`this is ip ${IP.getvalue()}`)
            /////we need to clear the queue from old instruction 
            queue.clear(animations);
            queue.fetchInstruction(animations,0,1,[],0);
            // console.log(`this is the queue ${queue.log()}`);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,1,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,2,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            }
            /////we need to clear the queue from old instruction 
        }
        ];
        this.buildanim=function(){
            return[];
        }
    }
}

class InstructionBI{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="BI";
        this.steps=[(animations)=>{
            if(Alu1.Acc.getvalue().toString().charAt(0)==='1'){
                IP.setvalue(Dec2bin(this.addresse1));
            // console.log(`this is ip ${IP.getvalue()}`)
            /////we need to clear the queue from old instruction 
            queue.clear(animations);
            queue.fetchInstruction(animations,0,1,[],0);
            // console.log(`this is the queue ${queue.log()}`);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,1,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,2,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            }
            /////we need to clear the queue from old instruction 
        }
        ];
        this.buildanim=function(){
            return[];
        }
    }
}

class InstructionBIE{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="BIE";
        this.steps=[(animations)=>{
            if(Alu1.Acc.getvalue().toString().charAt(0)==='1' | Alu1.getFlags(0)==='1' ){
                IP.setvalue(Dec2bin(this.addresse1));
            // console.log(`this is ip ${IP.getvalue()}`)
            /////we need to clear the queue from old instruction 
            queue.clear(animations);
            queue.fetchInstruction(animations,0,1,[],0);
            // console.log(`this is the queue ${queue.log()}`);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,1,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,2,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            }
            /////we need to clear the queue from old instruction 
        }
        ];
        this.buildanim=function(){
            return[];
        }
    }
}

class InstructionBSE{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="BSE";
        this.steps=[(animations)=>{
            if(Alu1.Acc.getvalue().toString().charAt(0)==='0' | Alu1.getFlags(0)==='1' ){
                IP.setvalue(Dec2bin(this.addresse1));
            // console.log(`this is ip ${IP.getvalue()}`)
            /////we need to clear the queue from old instruction 
            queue.clear(animations);
            queue.fetchInstruction(animations,0,1,[],0);
            // console.log(`this is the queue ${queue.log()}`);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,1,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            queue.fetchInstruction(animations,2,1,[],0);
            queue.fetchInstruction(animations,0,0,[],0);
            }
            /////we need to clear the queue from old instruction 
        }
        ];
        this.buildanim=function(){
            return[];
        }    
    }
}

class InstructionSHL{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="SHL";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.SHL(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.SHL(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"SHL",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionSHR{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="SHR";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.SHR(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.SHR(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"SHR",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionROR{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="ROR";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.ROR(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.ROR(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"ROR",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionROL{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="ROL";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.ROL(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.ROL(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"ROL",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionNOT{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="NOT";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.NOT(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.NOT(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"NOT",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionNEG{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="NEG";
        this.steps=[()=>{
            // let res=this.value1+this.value2;
            // Registers[4].setvalue(res.toString(2));
            if(this.taille===0){
                Alu1.Rual1.setright(TwosComplement(this.value1,8));
                Alu1.NEG(8);
            }else{
                Alu1.Rual1.setvalue(TwosComplement(this.value1,16));
                Alu1.NEG(16);
            }
            return Alu1.Acc.getvalue();
        }
        ];
        this.buildanim=function(){
            return[{
                value:"NEG",
                target:addanim.target,
                time:addanim.time,
                anim:addanim.anim,
            },
            {
                value:"",
                target:AluToAcc.target,
                time:AluToAcc.time,
                anim:AluToAcc.anim,
            },
            {
                value:"res",
                target:fitToAcc.target,
                time:fitToAcc.time,
                anim:fitToAcc.anim,
            },
        ];
        }
    }
    
}

class InstructionPUSHA{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="PUSHA";
        this.steps=[()=>{
            memory.setRim(binaryToHex(Registers[0].getvalue()).slice(0,2));
            memory.pushval();
{memory.setRim(binaryToHex(Registers[0].getvalue()).slice(-2));}
            memory.pushval();
            memory.setRim(binaryToHex(Registers[1].getvalue()).slice(0,2));
            memory.pushval();
{memory.setRim(binaryToHex(Registers[1].getvalue()).slice(-2));}
            memory.pushval();
            memory.setRim(binaryToHex(Registers[2].getvalue()).slice(0,2));
            memory.pushval();
{memory.setRim(binaryToHex(Registers[2].getvalue()).slice(-2));}
            memory.pushval();
            memory.setRim(binaryToHex(Registers[3].getvalue()).slice(0,2));
            memory.pushval();
 {memory.setRim(binaryToHex(Registers[3].getvalue()).slice(-2));}
            memory.pushval();
            memory.setRim(binaryToHex(Registers[4].getvalue()).slice(0,2));
            memory.pushval();
{memory.setRim(binaryToHex(Registers[4].getvalue()).slice(-2));}
            memory.pushval();
            memory.setRim(binaryToHex(Registers[5].getvalue()).slice(0,2));
            memory.pushval();
{memory.setRim(binaryToHex(Registers[5].getvalue()).slice(-2));}
            memory.pushval();
            memory.setRim(binaryToHex(Registers[6].getvalue()).slice(0,2));
            memory.pushval();
{memory.setRim(binaryToHex(Registers[6].getvalue()).slice(-2));}
            memory.pushval();
            memory.setRim(binaryToHex(Registers[7].getvalue()).slice(0,2));
            memory.pushval();
 {memory.setRim(binaryToHex(Registers[7].getvalue()).slice(-2));}
            memory.pushval();
        }
        ];
        this.buildanim=function(){

                return[
                    {
                        value:"PUSHA",
                        target:MCanim.target,
                        time:MCanim.time,
                        anim:MCanim.anim,
                    },
                    {
                    value:this.value1,
                    target:fitToR1.target,
                    time:fitToR1.time,
                    anim:fitToR1.anim,
                },
                {
                    value:this.value1,
                    target:infitToR1.target,
                    time:infitToR1.time,
                    anim:infitToR1.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },

,{
                    value:this.value1,
                    target:fitToR2.target,
                    time:fitToR2.time,
                    anim:fitToR2.anim,
                },
                {
                    value:this.value1,
                    target:infitToR2.target,
                    time:infitToR2.time,
                    anim:infitToR2.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },

,{
                    value:this.value1,
                    target:fitToR3.target,
                    time:fitToR3.time,
                    anim:fitToR3.anim,
                },
                {
                    value:this.value1,
                    target:infitToR3.target,
                    time:infitToR3.time,
                    anim:infitToR3.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },

,{
                    value:this.value1,
                    target:fitToR4.target,
                    time:fitToR4.time,
                    anim:fitToR4.anim,
                },
                {
                    value:this.value1,
                    target:infitToR4.target,
                    time:infitToR4.time,
                    anim:infitToR4.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },

,{
                    value:this.value1,
                    target:fitToAcc.target,
                    time:fitToAcc.time,
                    anim:fitToAcc.anim,
                },
                {
                    value:this.value1,
                    target:infitToAcc.target,
                    time:infitToAcc.time,
                    anim:infitToAcc.anim,
                },
                {
                    value:this.value1,
                    target:AccToBus.target,
                    time:AccToBus.time,
                    anim:AccToBus.anim,
                },
                {
                    value:this.value1,
                    target:AccToMDR.target,
                    time:AccToMDR.time,
                    anim:AccToMDR.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },

,{
                    value:this.value1,
                    target:fitToBr.target,
                    time:fitToBr.time,
                    anim:fitToBr.anim,
                },
                {
                    value:this.value1,
                    target:infitToBr.target,
                    time:infitToBr.time,
                    anim:infitToBr.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },

,{
                    value:this.value1,
                    target:fitToIdr.target,
                    time:fitToIdr.time,
                    anim:fitToIdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToIdr.target,
                    time:infitToIdr.time,
                    anim:infitToIdr.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },

{
                    value:this.value1,
                    target:fitToSr.target,
                    time:fitToSr.time,
                    anim:fitToSr.anim,
                },
                {
                    value:this.value1,
                    target:infitToSR.target,
                    time:infitToSR.time,
                    anim:infitToSR.anim,
                },
                {
                    value:this.value1,
                    target:RegToMdr.target,
                    time:RegToMdr.time,
                    anim:RegToMdr.anim,
                },
                {
                    value:"",
                    target:BusToMdr.target,
                    time:BusToMdr.time,
                    anim:BusToMdr.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },

            ];
            
        }
    }
}

class InstructionPOPA{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="POPA";
        let reg; 
        this.steps=[()=>{
            memory.popval();
            reg=memory.getRim();
            memory.popval();
            reg=memory.getRim()+reg;
            Registers[7].setvalue(hex2bin(reg));
            memory.popval();
            reg=memory.getRim();
            memory.popval();
            reg=memory.getRim()+reg;
            Registers[6].setvalue(hex2bin(reg));
            memory.popval();
            reg=memory.getRim();
            memory.popval();
            reg=memory.getRim()+reg;
            Registers[5].setvalue(hex2bin(reg));
            memory.popval();
            reg=memory.getRim();
            memory.popval();
            reg=memory.getRim()+reg;
            Registers[4].setvalue(hex2bin(reg));
            memory.popval();
            reg=memory.getRim();
            memory.popval();
            reg=memory.getRim()+reg;
            Registers[3].setvalue(hex2bin(reg));
            memory.popval();
            reg=memory.getRim();
            memory.popval();
            reg=memory.getRim()+reg;
            Registers[2].setvalue(hex2bin(reg));
            memory.popval();          
              reg=memory.getRim();
            memory.popval();
            reg=memory.getRim()+reg;
            Registers[1].setvalue(hex2bin(reg));
            memory.popval();
            reg=memory.getRim();
            memory.popval();
            reg=memory.getRim()+reg;
            Registers[0].setvalue(hex2bin(reg));
        }
        ];
        this.buildanim=function(){

                return[{
                    value:"POPA",
                    target:MCanim.target,
                    time:MCanim.time,
                    anim:MCanim.anim,
                },
                {
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR1.target,
                    time:fitToR1.time,
                    anim:fitToR1.anim,
                },
                {
                    value:this.value1,
                    target:infitToR1.target,
                    time:infitToR1.time,
                    anim:infitToR1.anim,
                },

                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR2.target,
                    time:fitToR2.time,
                    anim:fitToR2.anim,
                },
                {
                    value:this.value1,
                    target:infitToR2.target,
                    time:infitToR2.time,
                    anim:infitToR2.anim,
                },

                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR3.target,
                    time:fitToR3.time,
                    anim:fitToR3.anim,
                },
                {
                    value:this.value1,
                    target:infitToR3.target,
                    time:infitToR3.time,
                    anim:infitToR3.anim,
                },

                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToR4.target,
                    time:fitToR4.time,
                    anim:fitToR4.anim,
                },
                {
                    value:this.value1,
                    target:infitToR4.target,
                    time:infitToR4.time,
                    anim:infitToR4.anim,
                },
                //push animation

                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MDRToAcc.target,
                    time:MDRToAcc.time,
                    anim:MDRToAcc.anim,
                },
                {
                    value:"",
                    target:BusToAcc.target,
                    time:BusToAcc.time,
                    anim:BusToAcc.anim,
                },
                {
                    value:this.value1,
                    target:fitToAcc.target,
                    time:fitToAcc.time,
                    anim:fitToAcc.anim,
                },
                {
                    value:this.value1,
                    target:infitToAcc.target,
                    time:infitToAcc.time,
                    anim:infitToAcc.anim,
                },
                //push animation

                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToBr.target,
                    time:fitToBr.time,
                    anim:fitToBr.anim,
                },
                {
                    value:this.value1,
                    target:infitToBr.target,
                    time:infitToBr.time,
                    anim:infitToBr.anim,
                },
                //push animation

                {//////animation of pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToIdr.target,
                    time:fitToIdr.time,
                    anim:fitToIdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToIdr.target,
                    time:infitToIdr.time,
                    anim:infitToIdr.anim,
                },
                {//////animation pf pop in MC
                    value:this.value1,
                    target:fitToMdr.target,
                    time:fitToMdr.time,
                    anim:fitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:infitToMdr.target,
                    time:infitToMdr.time,
                    anim:infitToMdr.anim,
                },
                {
                    value:this.value1,
                    target:MdrToBus.target,
                    time:MdrToBus.time,
                    anim:MdrToBus.anim,
                },
                {
                    value:"",
                    target:MdrToReg.target,
                    time:MdrToReg.time,
                    anim:MdrToReg.anim,
                },
                {
                    value:this.value1,
                    target:fitToSr.target,
                    time:fitToSr.time,
                    anim:fitToSr.anim,
                },
                {
                    value:this.value1,
                    target:infitToSR.target,
                    time:infitToSR.time,
                    anim:infitToSR.anim,
                },

            ];
            
        }
    }
}

class InstructionREAD{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="READ";
        this.steps=[()=>{
            let chr = this.value1.charCodeAt(0);

            ioUnit.buffer.setvalue('0'.repeat(8)+Dec2bin(chr));
           
            Registers[3].setvalue(ioUnit.getBuffer());
        }
        ];
        
         this.buildanim=function(){
                return[
                    {
                        value:this.value1,
                        target:fitToIO.target,
                        time:fitToIO.time,
                        anim:fitToIO.anim,
                    },
                    {
                        value:this.value1,
                        target:infitToIO.target,
                        time:infitToIO.time,
                        anim:infitToIO.anim,
                    },
                    {
                        value:"",
                        target:BufferToBus.target,
                        time:BufferToBus.time,
                        anim:BufferToBus.anim,
                    },
                    {
                        value:this.value2,
                        target:IOToBus.target,
                        time:IOToBus.time,
                        anim:IOToBus.anim,
                    },
                    {
                        value:this.value2,
                        target:fitToR4.target,
                        time: fitToR4.time,
                        anim: fitToR4.anim,
                    },
                    {
                        value:this.value2,
                        target:infitToR4.target,
                        time:infitToR4.time,
                        anim:infitToR4.anim,
                    },
                ];
            }
    }
}
let txt = [];
class InstructionWRITE{
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="WRITE";
        this.steps=[()=>{
     
            ioUnit.buffer.setvalue(  Registers[3].getvalue());
            let chr = ioUnit.buffer.getvalue();
            const result = String.fromCharCode(parseInt(chr,2));    
            txt.push(result);
        }
        ];
        this.buildanim=function(){
            return[ 
                {
                    value:this.value2,
                    target:fitToR4.target,
                    time:fitToR4.time,
                    anim:fitToR4.anim,
                },
                {
                    value:this.value2,
                    target:infitToR4.target,
                    time: infitToR4.time,
                    anim: infitToR4.anim,
                },
                {
                    value:this.value2,
                    target:BusToIO.target,
                    time:BusToIO.time,
                    anim:BusToIO.anim,
                },
                {
                    value:"",
                    target:BusToBuffer.target,
                    time:BusToBuffer.time,
                    anim:BusToBuffer.anim,
                },
                {
                    value:this.value1,
                    target:fitToIO.target,
                    time:fitToIO.time,
                    anim:fitToIO.anim,
                },
                {
                    value:this.value1,
                    target:infitToIO.target,
                    time:infitToIO.time,
                    anim:infitToIO.anim,
                },
        ];
     }
    }
}

class InstructionREADS {
    constructor(){
        this.value1=0;
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="READS";
        this.steps=[()=>{
            let string = this.value1;
            let address = this.addresse1;
            let i = 0;
            while (string[i]) {
                ioUnit.buffer.setvalue('0'.repeat(8) + Dec2bin(string[i].charCodeAt(0)));
                memory.setRim(Bin16ToHexaLow(ioUnit.buffer.getvalue()));
                memory.setRam(Dec2bin(address));
                memory.write();
                address++;
                memory.setRim(Bin16ToHexaHigh(ioUnit.buffer.getvalue()));
                memory.setRam(Dec2bin(address));
                memory.write();
                i++;
                address++;
            }
        }
        ];
        this.buildanim=function(){
            let animationSteps = [
                {
                    value:"",
                    nom:"QueueToIr",
                    target:queueExitToBus2.target,
                    time:queueExitToBus2.time,
                    anim:() => {},
                },
                {
                    value:"",
                    nom:"queueExitToBus",
                    target:queueExitToBus.target,
                    time:queueExitToBus.time,
                    anim:queueExitToBus.anim,
                },
                {
                    value:this.addresse1,
                    target:QueueToIO.target,
                    time:QueueToIO.time,
                    anim:QueueToIO.anim,
                },
                {
                    value:"",
                    target:BusToBuffer.target,
                    time:BusToBuffer.time,
                    anim:BusToBuffer.anim,
                },
                {
                    value:this.addresse1,
                    target:fitToIO.target,
                    time:fitToIO.time,
                    anim:fitToIO.anim,
                },
                {
                    value:this.addresse1,
                    target:infitToIO.target,
                    time:infitToIO.time,
                    anim:infitToIO.anim,
                },
            ];
            let animationSubSteps = [];
            let string = this.value1;
            let address = this.addresse1;
            let i = 0;
            while (string[i]) {
                const char = string[i];
                const ascii = char.charCodeAt(0);
                animationSubSteps = [
                    {
                        value:char,
                        target:fitToIO.target,
                        time:fitToIO.time,
                        anim:fitToIO.anim,
                    },
                    {
                        value:char,
                        target:infitToIO.target,
                        time:infitToIO.time,
                        anim:infitToIO.anim,
                    },
                    {
                        value:"",
                        target:BufferToBus.target,
                        time:BufferToBus.time,
                        anim:BufferToBus.anim,
                    },
                    {
                        value:"00"+ascii,
                        target:IOToMdr.target,
                        time:IOToMdr.time,
                        anim:IOToMdr.anim,
                    },
                    {
                        value:"",
                        target:BusToMdr.target,
                        time:BusToMdr.time,
                        anim:BusToMdr.anim,
                    },
                    {
                        value:"00"+ascii,
                        target:fitToMdr.target,
                        time:fitToMdr.time,
                        anim:fitToMdr.anim,
                    },
                    {
                        value:"00"+ascii,
                        target:infitToMdr.target,
                        time:infitToMdr.time,
                        anim:infitToMdr.anim,
                    },
                    {
                        value:address,
                        target:fitToIO.target,
                        time:fitToIO.time,
                        anim:fitToIO.anim,
                    },
                    {
                        value:address,
                        target:infitToIO.target,
                        time:infitToIO.time,
                        anim:infitToIO.anim,
                    },
                    {
                        value:"",
                        target:BufferToBus.target,
                        time:BufferToBus.time,
                        anim:BufferToBus.anim,
                    },
                    {
                        value:address,
                        target:IOToUnderIP.target,
                        time:IOToUnderIP.time,
                        anim:IOToUnderIP.anim,
                    },
                    {
                        value:"",
                        target:UnderIpToAddBus.target,
                        time:UnderIpToAddBus.time,
                        anim:UnderIpToAddBus.anim,
                    },
                    {
                        value:address,
                        target:UnderIPToMar.target,
                        time:UnderIPToMar.time,
                        anim:UnderIPToMar.anim,
                    },
                    {
                        value:address,
                        target:fitToMar.target,
                        time:fitToMar.time,
                        anim:fitToMar.anim,
                    },
                    {
                        value:address,
                        target:infitToMar.target,
                        time:infitToMar.time,
                        anim:infitToMar.anim,
                    },
                    {
                        value:"WRITE",
                        target:MCanim.target,
                        time:MCanim.time,
                        anim:MCanim.anim,
                    },
                ];
                animationSteps.push.apply(animationSteps, animationSubSteps);
                address++;
                address++;
                i++;
                i++;
            }
            return animationSteps;
     }
    }
}

class InstructionWRITES {
    constructor(){
        this.value1="";
        this.value2=0;
        this.addresse1=0;
        this.register1=0;
        this.addresse2=0;
        this.register2=0;
        this.taille=0;
        this.stepsNum=1;
        this.name="WRITES";
        this.steps=[()=>{
            let adr = this.addresse1 ;
            let result = "";
            let char = "";
            let ascii = "";
            while (char !== "$") {
                console.log("adr", Dec2bin(adr));
                memory.setRam(Dec2bin(adr));
                memory.read(false);
                ascii = memory.getRim();
                adr++;
                memory.setRam(Dec2bin(adr));
                memory.read(false);
                ascii = memory.getRim() + ascii;
                ioUnit.buffer.setvalue(hex2bin(ascii));
                char = String.fromCharCode(parseInt(ioUnit.buffer.getvalue(),2));
                if (char !== '$') {
                    result += char;
                }
                adr++;
            }
            txt.push(result);
        }
        ];
        this.buildanim=function(){
            let animationSteps = [
                {
                    value:"",
                    nom:"QueueToIr",
                    target:queueExitToBus2.target,
                    time:queueExitToBus2.time,
                    anim:() => {},
                },
                {
                    value:"",
                    nom:"queueExitToBus",
                    target:queueExitToBus.target,
                    time:queueExitToBus.time,
                    anim:queueExitToBus.anim,
                },
                {
                    value:this.addresse1,
                    target:QueueToIO.target,
                    time:QueueToIO.time,
                    anim:QueueToIO.anim,
                },
                {
                    value:"",
                    target:BusToBuffer.target,
                    time:BusToBuffer.time,
                    anim:BusToBuffer.anim,
                },
                {
                    value:this.addresse1,
                    target:fitToIO.target,
                    time:fitToIO.time,
                    anim:fitToIO.anim,
                },
                {
                    value:this.addresse1,
                    target:infitToIO.target,
                    time:infitToIO.time,
                    anim:infitToIO.anim,
                },
            ];
            let animationSubSteps = [];
            let string = this.value1;
            let address = this.addresse1;
            let i = 0;
            while (string[i]) {
                const char = string[i];
                const ascii = char.charCodeAt(0);
                animationSubSteps = [
                    {
                        value:address,
                        target:fitToIO.target,
                        time:fitToIO.time,
                        anim:fitToIO.anim,
                    },
                    {
                        value:address,
                        target:infitToIO.target,
                        time:infitToIO.time,
                        anim:infitToIO.anim,
                    },
                    {
                        value:"",
                        target:BufferToBus.target,
                        time:BufferToBus.time,
                        anim:BufferToBus.anim,
                    },
                    {
                        value:address,
                        target:IOToUnderIP.target,
                        time:IOToUnderIP.time,
                        anim:IOToUnderIP.anim,
                    },
                    {
                        value:"",
                        target:UnderIpToAddBus.target,
                        time:UnderIpToAddBus.time,
                        anim:UnderIpToAddBus.anim,
                    },
                    {
                        value:address,
                        target:UnderIPToMar.target,
                        time:UnderIPToMar.time,
                        anim:UnderIPToMar.anim,
                    },
                    {
                        value:address,
                        target:fitToMar.target,
                        time:fitToMar.time,
                        anim:fitToMar.anim,
                    },
                    {
                        value:address,
                        target:infitToMar.target,
                        time:infitToMar.time,
                        anim:infitToMar.anim,
                    },
                    {
                        value:"READ",
                        target:MCanim.target,
                        time:MCanim.time,
                        anim:MCanim.anim,
                    },
                    {
                        value:"00"+ascii,
                        target:fitToMdr.target,
                        time:fitToMdr.time,
                        anim:fitToMdr.anim,
                    },
                    {
                        value:"00"+ascii,
                        target:infitToMdr.target,
                        time:infitToMdr.time,
                        anim:infitToMdr.anim,
                    },
                    {
                        value:"",
                        target:MdrToBus.target,
                        time:MdrToBus.time,
                        anim:MdrToBus.anim,
                    },
                    {
                        value:"00"+ascii,
                        target:MdrToIO.target,
                        time:MdrToIO.time,
                        anim:MdrToIO.anim,
                    },
                    {
                        value:"",
                        target:BusToBuffer.target,
                        time:BusToBuffer.time,
                        anim:BusToBuffer.anim,
                    },
                    {
                        value:char,
                        target:fitToIO.target,
                        time:fitToIO.time,
                        anim:fitToIO.anim,
                    },
                    {
                        value:char,
                        target:infitToIO.target,
                        time:infitToIO.time,
                        anim:infitToIO.anim,
                    },
                ];
                animationSteps.push.apply(animationSteps, animationSubSteps);
                address++;
                address++;
                i++;
                i++;
            }
            return animationSteps;
     }
    }
}

export {InstructionREADS,InstructionWRITES,InstructionCMP,InstructionREAD,InstructionWRITE,InstructionADD,InstructionMOV00,InstructionMOV01,InstructionMOV10,InstructionMOV11,InstructionSUB,InstructionMUL,InstructionDIV,InstructionBSE,InstructionBIE,InstructionBI,InstructionBS,InstructionBNE,InstructionBE,InstructionBR,InstructionPOP,InstructionPUSH,InstructionAND,InstructionOR,InstructionNAND,InstructionNOR,InstructionXOR,InstructionNEG,InstructionNOT,InstructionROL,InstructionROR,InstructionSHL,InstructionSHR,InstructionPOPA,InstructionPUSHA}
export default txt  ;