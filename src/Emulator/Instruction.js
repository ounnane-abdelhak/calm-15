import { memory, Registers, queue, Alu1, IP, ioUnit } from "../pages/Ide";
import { settext } from "./setgettxt.js";
import { TwosComplement } from "./ALU.js";
import { gsap } from "gsap";
import { pushadrs, getcode, nsp, code2 } from "./speed.js";
// import { Register } from "./Register.js";
////////////////////////////////////////////////

let pos = 0;
function getinst(nu) {
  let v = 0;
  let i = 0;
  while (v !== nu) {
    v += getInstLeng(getcode()[i]);
    i++;
  }
  return i;
}

function getallLeng(co) {
  const c = [...co];
  let num = 0;
  for (let i = 0; i < c.length; i++) {
    num += getInstLeng(c[i]);
  }
  return num;
}

function getInstLeng(instruction) {
  if (!instruction) return 0;
  const tokens = instruction
    .trim()
    .split(/[\s,]+/)
    .filter((token) => token.length > 0);
  if (tokens.length === 0) return 0;
  const inst = tokens[0].toUpperCase();
  const registers = new Set([
    "R1",
    "R2",
    "R3",
    "R4",
    "ACC",
    "BR",
    "IDR",
    "IR",
    "SR",
    "MAR",
    "MDR",
    "IP",
  ]);
  function isImmediate(token) {
    if (/^(\d+|0x[0-9a-fA-F]+)$/.test(token)) return true;
    if (token.startsWith("[") && token.endsWith("]")) return false;
    return !registers.has(token.toUpperCase());
  }
  const branchInst = new Set(["BNE", "BE", "BS", "BI", "BIE", "BSE", "BRI"]);
  if (branchInst.has(inst)) return 3;
  if (inst === "MOV") {
    if (tokens.length < 3) return 0;
    return isImmediate(tokens[2]) ? 4 : 2;
  }
  if (inst === "RDS" || inst === "WRTS") {
    if (tokens.length < 2) return 0;
    return 3;
  }
  const twoOpInst = new Set([
    "ADD",
    "SUB",
    "MUL",
    "DIV",
    "AND",
    "OR",
    "XOR",
    "NOR",
    "NAND",
    "CMP",

  ]);
  if (twoOpInst.has(inst)) {
    if (tokens.length < 3) return 0;
    return isImmediate(tokens[2]) ? 4 : 2;
  }
  if (inst === "CALL") return 3;
  const noOpInst = new Set(["RET", "PUSHA", "POPA","STOP"]);
  if (noOpInst.has(inst)) return 1;
  const reducedInst = new Set([
    "NOT",
    "NEG",
    "SHL",
    "SHR",
    "RD",
    "WRT",
    "PUSH",
    "POP",
    "ROR",
    "ROL",
    "MOVS",
    'LODS',
    "CMPS"
  ]);
  if (reducedInst.has(inst)) {
    if (inst === "RD" || inst === "WRT"|| inst === 'LODS' || inst === 'CMPS'|| inst === 'MOVS') return 1;
    if (tokens.length < 2) return 1;
    const operand = tokens[1];
    return isImmediate(operand) ||
      (operand.startsWith("[") && operand.endsWith("]"))
      ? 2
      : 1;
  }
  return 0;
}

function Dec2bin(dec) {
  return ("00000000" + parseInt(dec, 10).toString(2)).substr(-8);
}
function Dec2bin2(dec) {
  return "00000000" + parseInt(dec, 10).toString(2);
}
function hex2bin(hex) {
  return (
    "0".repeat(16 - parseInt(hex, 16).toString(2).length) +
    parseInt(hex, 16).toString(2)
  );
}
function hex2binlow(hex) {
  return (
    "0".repeat(8 - parseInt(hex, 16).toString(2).length) +
    parseInt(hex, 16).toString(2)
  );
}
function binaryToHexlow(binaryString) {
  const decimalValue = parseInt(binaryString, 2);
  let hexString = decimalValue.toString(16).toUpperCase();
  if (hexString.length % 2 == 1) {
    hexString = "0" + hexString;
  }
  return hexString;
}
const Bin16ToHexaLow = (bin) => {
  const c = bin.substring(8, 12);
  const d = bin.substring(12, 16);
  let hexStr = "";
  switch (c) {
    case "0000":
      hexStr += "0";
      break;
    case "0001":
      hexStr += "1";
      break;
    case "0010":
      hexStr += "2";
      break;
    case "0011":
      hexStr += "3";
      break;
    case "0100":
      hexStr += "4";
      break;
    case "0101":
      hexStr += "5";
      break;
    case "0110":
      hexStr += "6";
      break;
    case "0111":
      hexStr += "7";
      break;
    case "1000":
      hexStr += "8";
      break;
    case "1001":
      hexStr += "9";
      break;
    case "1010":
      hexStr += "a";
      break;
    case "1011":
      hexStr += "b";
      break;
    case "1100":
      hexStr += "c";
      break;
    case "1101":
      hexStr += "d";
      break;
    case "1110":
      hexStr += "e";
      break;
    case "1111":
      hexStr += "f";
      break;
    default:
      break;
  }
  switch (d) {
    case "0000":
      hexStr += "0";
      break;
    case "0001":
      hexStr += "1";
      break;
    case "0010":
      hexStr += "2";
      break;
    case "0011":
      hexStr += "3";
      break;
    case "0100":
      hexStr += "4";
      break;
    case "0101":
      hexStr += "5";
      break;
    case "0110":
      hexStr += "6";
      break;
    case "0111":
      hexStr += "7";
      break;
    case "1000":
      hexStr += "8";
      break;
    case "1001":
      hexStr += "9";
      break;
    case "1010":
      hexStr += "a";
      break;
    case "1011":
      hexStr += "b";
      break;
    case "1100":
      hexStr += "c";
      break;
    case "1101":
      hexStr += "d";
      break;
    case "1110":
      hexStr += "e";
      break;
    case "1111":
      hexStr += "f";
      break;
    default:
      break;
  }
  return hexStr;
};
const Bin16ToHexaHigh = (bin) => {
  const a = bin.substring(0, 4);
  const b = bin.substring(4, 8);
  let hexStr = "";
  switch (a) {
    case "0000":
      hexStr += "0";
      break;
    case "0001":
      hexStr += "1";
      break;
    case "0010":
      hexStr += "2";
      break;
    case "0011":
      hexStr += "3";
      break;
    case "0100":
      hexStr += "4";
      break;
    case "0101":
      hexStr += "5";
      break;
    case "0110":
      hexStr += "6";
      break;
    case "0111":
      hexStr += "7";
      break;
    case "1000":
      hexStr += "8";
      break;
    case "1001":
      hexStr += "9";
      break;
    case "1010":
      hexStr += "a";
      break;
    case "1011":
      hexStr += "b";
      break;
    case "1100":
      hexStr += "c";
      break;
    case "1101":
      hexStr += "d";
      break;
    case "1110":
      hexStr += "e";
      break;
    case "1111":
      hexStr += "f";
      break;
    default:
      break;
  }
  switch (b) {
    case "0000":
      hexStr += "0";
      break;
    case "0001":
      hexStr += "1";
      break;
    case "0010":
      hexStr += "2";
      break;
    case "0011":
      hexStr += "3";
      break;
    case "0100":
      hexStr += "4";
      break;
    case "0101":
      hexStr += "5";
      break;
    case "0110":
      hexStr += "6";
      break;
    case "0111":
      hexStr += "7";
      break;
    case "1000":
      hexStr += "8";
      break;
    case "1001":
      hexStr += "9";
      break;
    case "1010":
      hexStr += "a";
      break;
    case "1011":
      hexStr += "b";
      break;
    case "1100":
      hexStr += "c";
      break;
    case "1101":
      hexStr += "d";
      break;
    case "1110":
      hexStr += "e";
      break;
    case "1111":
      hexStr += "f";
      break;
    default:
      break;
  }
  return hexStr;
};
/////////////////animations to test////////////////////

function binaryToHex(binaryString) {
  const decimalValue = parseInt(binaryString, 2);
  let hexString = decimalValue.toString(16).toUpperCase();
  if (hexString.length % 2 == 1) {
    hexString = "0" + hexString;
  }
  if (hexString.length == 2) {
    hexString = "00" + hexString;
  }
  return hexString;
}

// Speed control (put this at the top)

const IounitToBus = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.221,
        y: h * 0.39,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.221, y: h * 0.39 },
      { y: h * 0.46, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const BusToRual1 = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.143,
        y: h * 0.56,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.143, y: h * 0.56 },
      { y: h * 0.625, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const Rual1ToBus = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.143,
        y: h * 0.625,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.143, y: h * 0.625 },
      { y: h * 0.56, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const BusToRual2 = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.299,
        y: h * 0.56,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.299, y: h * 0.56 },
      { y: h * 0.625, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const BusToRegisters = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.481,
        y: h * 0.555,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.481, y: h * 0.555 },
      { y: h * 0.58, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const RegistersToBus = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.481,
        y: h * 0.58,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.481, y: h * 0.58 },
      { y: h * 0.555, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const IrToDecoder = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.644,
        y: h * 0.708,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.644, y: h * 0.708 },
      { y: h * 0.725, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const DecoderToSequencer = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.644,
        y: h * 0.813,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.644, y: h * 0.813 },
      { y: h * 0.827, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const QueueToIr = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.726,
        y: h * 0.6638,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.726, y: h * 0.6638 },
      { x: w * 0.711, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const queueExitToBus = {
  value: "",
  target: ".ball",
  time: () => 4000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.726,
        y: h * 0.6638,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.726, y: h * 0.6638 },
      { x: w * 0.715, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { y: h * 0.555, duration: 1 * nsp(), delay: 2 * nsp() });
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 3 * nsp() });
  },
};

const queueExitToBus2 = {
  value: "",
  target: ".ball",
  time: () => 500 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.726,
        y: h * 0.6638,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.726, y: h * 0.6638 },
      { x: w * 0.715, duration: 1 * nsp(), delay: 1 * nsp() }
    );
  },
};

const BusToQueue = {
  value: "",
  target: ".ball",
  time: () => 4000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.931,
        y: h * 0.56,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.931, y: h * 0.56 },
      { y: h * 0.6638, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { x: w * 0.921, duration: 1 * nsp(), delay: 2 * nsp() });
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 3 * nsp() });
  },
};

const BusToAcc = {
  value: "",
  target: ".ball",
  time: () => 4000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.361,
        y: h * 0.56,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.361, y: h * 0.56 },
      { y: h * 0.923, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { x: w * 0.282, duration: 1 * nsp(), delay: 2 * nsp() });
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 3 * nsp() });
  },
};

const AccToBus = {
  value: "",
  target: ".ball",
  time: () => 4000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.282,
        y: h * 0.923,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.282, y: h * 0.923 },
      { x: w * 0.361, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { y: h * 0.56, duration: 1 * nsp(), delay: 2 * nsp() });
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 3 * nsp() });
  },
};

const AluToAcc = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.226,
        y: h * 0.863,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.226, y: h * 0.863 },
      { y: h * 0.877, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const MdrToBus = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.539,
        y: h * 0.445,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.539, y: h * 0.445 },
      { y: h * 0.465, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const BusToMdr = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.539,
        y: h * 0.465,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.539, y: h * 0.465 },
      { y: h * 0.445, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const AdrToBus = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.784,
        y: h * 0.137,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.784, y: h * 0.137 },
      { y: h * 0.18, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const IpToAdr = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.746,
        y: h * 0.26,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.746, y: h * 0.26 },
      { y: h * 0.46, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const MdrTOQue = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497 },
      { x: w * 0.874, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const MdrToReg = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497 },
      { x: w * 0.44, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const RegToMdr = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.44, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.44 },
      { x: w * 0.497, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const queueExitToReg = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.68, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.68 },
      { x: w * 0.44, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const MdrToIO = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497 },
      { x: w * 0.182, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const IOToMdr = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.182, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.182 },
      { x: w * 0.497, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const IOToUnderIP = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.182, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.182 },
      { x: w * 0.708, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const RegToUnderIP = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.44, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.44 },
      { x: w * 0.708, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const UnderIPToMar = {
  value: "",
  target: ".box-ADR",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-ADR",
      { x: w * 0.712, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-ADR",
      { x: w * 0.712 },
      { x: w * 0.648, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-ADR", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const UnderIpToAddBus = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.745,
        y: h * 0.465,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.745, y: h * 0.465 },
      { y: h * 0.26, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const MdrToRual1 = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497 },
      { x: w * 0.262, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const RegToRual1 = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.44, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.44 },
      { x: w * 0.262, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const MdrToRual2 = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497 },
      { x: w * 0.106, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const RegToRual2 = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.44, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.44 },
      { x: w * 0.106, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const AccToMDR = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.321, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.321 },
      { x: w * 0.497, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const MDRToAcc = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497 },
      { x: w * 0.321, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const AccToReg = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.321, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.321 },
      { x: w * 0.44, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const RegToAcc = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.44, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.44 },
      { x: w * 0.321, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const MdrToADR = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497 },
      { x: w * 0.705, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const AccToADR = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.321, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.321 },
      { x: w * 0.705, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const Rual1ToADR = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.44, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.44 },
      { x: w * 0.705, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const BusToIr = {
  value: "",
  target: ".ball",
  time: () => 4000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      { x: w * 0.931, y: h * 0.56, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.931, y: h * 0.56 },
      { y: h * 0.6638, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { x: w * 0.711, duration: 1 * nsp(), delay: 2 * nsp() });
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 3 * nsp() });
  },
};

const IPToMAR = {
  value: "",
  target: ".box-ADR",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-ADR",
      { x: w * 0.753, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-ADR",
      { x: w * 0.753 },
      { x: w * 0.648, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-ADR", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const ADRToMAR = {
  value: "",
  target: ".box-ADR",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-ADR",
      { x: w * 0.712, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-ADR",
      { x: w * 0.712 },
      { x: w * 0.648, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-ADR", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const fitToRual1 = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "20px",
        width: w * 0.067,
        height: h * 0.05,
        x: w * 0.12,
        y: h * 0.658,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const infitToRual1 = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp() });
  },
};

const fitToRual2={
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".ball", {
      borderRadius: "20px",
      width: w * 0.067,
      height: h * 0.05,
      x: w * 0.275,
      y: h * 0.658,
      opacity: "0"
    },{
      opacity:"1",
      duration: 1 * nsp()
    });
  }
};

const fitToR2 = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.1,
        height: h * 0.045,
        x: w * 0.442,
        y: h * 0.666,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const infitToR2 = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp() });
  },
};

const fitToR1 = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.1,
        height: h * 0.045,
        x: w * 0.442,
        y: h * 0.6105,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const infitToR1 = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp() });
  },
};

const fitToR3 = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.1,
        height: h * 0.045,
        x: w * 0.442,
        y: h * 0.7205,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const infitToR3 = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp() });
  },
};

const fitToR4 = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.1,
        height: h * 0.045,
        x: w * 0.442,
        y: h * 0.7735,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const infitToR4 = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp() });
  },
};

const fitToIdr = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.1,
        height: h * 0.045,
        x: w * 0.442,
        y: h * 0.8277,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const infitToIdr = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp() });
  },
};

const fitToBr = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.1,
        height: h * 0.045,
        x: w * 0.442,
        y: h * 0.8815,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const infitToBr = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp() });
  },
};

const fitToSr = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.1,
        height: h * 0.045,
        x: w * 0.442,
        y: h * 0.9347,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const infitToSR = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp() });
  },
};

const fitToIr = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.1,
        height: h * 0.055,
        x: w * 0.6,
        y: h * 0.6495,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const fitToDecode = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.1,
        height: h * 0.055,
        x: w * 0.6,
        y: h * 0.753,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const fitToSequencer = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.1,
        height: h * 0.055,
        x: w * 0.6,
        y: h * 0.858,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const fitToAcc = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.07,
        height: h * 0.055,
        x: w * 0.1995,
        y: h * 0.91,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const infitToAcc = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp() });
  },
};

const fitToMdr = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.11,
        height: h * 0.06,
        x: w * 0.49,
        y: h * 0.38,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const infitToMdr = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp() });
  },
};

const fitToMar = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.032,
        height: h * 0.14,
        x: w * 0.623,
        y: h * 0.165,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const infitToMar = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp() });
  },
};

const addanim = {
  value: "",
  target: ".ALU",
  time: () => 2000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ALU",
      { opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ALU",
      { opacity: "1" },
      { opacity: "0", duration: 1 * nsp(), delay: 1 * nsp() }
    );
  },
};

const MCanim = {
  value: "",
  target: ".MC",
  time: () => 2000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".MC", { opacity: "0" }, { opacity: "1", duration: 1 * nsp() });
    gsap.fromTo(
      ".MC",
      { opacity: "1" },
      { opacity: "0", duration: 1 * nsp(), delay: 1 * nsp() }
    );
  },
};

const IOToBus = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.182, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.182 },
      { x: w * 0.442, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const BusToIO = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.442, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.442 },
      { x: w * 0.182, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const QueueToIO = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.68, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.68 },
      { x: w * 0.182, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const BufferToBus = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.221,
        y: h * 0.39,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.221, y: h * 0.39 },
      { y: h * 0.465, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const BusToBuffer = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.812%",
        width: "1.4%",
        borderRadius: "50%",
        x: w * 0.221,
        y: h * 0.465,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".ball",
      { x: w * 0.221, y: h * 0.465 },
      { y: h * 0.39, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const fitToIO = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.07,
        height: h * 0.05,
        x: w * 0.197,
        y: h * 0.315,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
  },
};

const infitToIO = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp() });
  },
};

const fitToCache = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        borderRadius: "10px",
        width: w * 0.07,
        height: h * 0.05,
        x: w * 0.33,
        y: h * 0.31,
        opacity: "0",
      },
      { opacity: "1", duration: 0.4 * nsp() }
    );
    gsap.to(".ball", {
      opacity: "0",
      duration: 0.4 * nsp(),
      delay: 0.4 * nsp(),
    });
  },
};

const infitToCache = {
  value: "",
  target: ".ball",
  time: () => 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp() });
  },
};

const CacheToBus = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.7%",
        width: "1.5%",
        borderRadius: "50%",
        x: w * 0.353,
        y: h * 0.42,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.to(".ball", { y: h * 0.465, duration: 1 * nsp(), delay: 1 * nsp() });
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const BusToCache = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.7%",
        width: "1.5%",
        borderRadius: "50%",
        x: w * 0.353,
        y: h * 0.465,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.to(".ball", { y: h * 0.42, duration: 1 * nsp(), delay: 1 * nsp() });
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};

const Cacheanim = {
  value: "",
  target: ".Cache",
  time: () => 2000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".Cache",
      { opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".Cache",
      { opacity: "1" },
      { opacity: "0", duration: 1 * nsp(), delay: 1 * nsp() }
    );
  },
};

const IOToCache = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.182, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.182 },
      { x: w * 0.32, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

const BusCacheToIO = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.325, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.325 },
      { x: w * 0.182, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};
const AdrToIp = {
  value: "",
  target: ".ball",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".ball",
      {
        height: "2.7%",
        width: "1.5%",
        borderRadius: "50%",
        x: w * 0.77,
        y: h * 0.25,
        opacity: "0",
      },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.to(".ball", { y: h * 0.136, duration: 1 * nsp(), delay: 1 * nsp() });
    gsap.to(".ball", { opacity: "0", duration: 1 * nsp(), delay: 2 * nsp() });
  },
};
const MdrToUnderIp = {
  value: "",
  target: ".box-data",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(
      ".box-data",
      { x: w * 0.497 },
      { x: w * 0.708, duration: 1 * nsp(), delay: 1 * nsp() }
    );
    gsap.to(".box-data", {
      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};
const AdrBusToAdr = {
  value: "",
  target: ".box-ADR",
  time: () => 3000 * nsp(),
  anim: (val, h, w) => {
    const startX = w * 0.746;
    const endX = w * 0.76;

    gsap.fromTo(
      ".box-ADR",
      { x: startX, opacity: "0" },
      { x: startX, opacity: "1", duration: 1 * nsp() }
    );
    gsap.to(".box-ADR", {
      x: endX,

      duration: 1 * nsp(),
      delay: 1 * nsp(),
    });
    gsap.to(".box-ADR", {
      x: endX,

      opacity: "0",
      duration: 1 * nsp(),
      delay: 2 * nsp(),
    });
  },
};

///////////////////////////////////////////////////////////////////////////////////////////////
class InstructionCALL {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.res = 0;
    this.name = "CALL";
    this.steps = [
      (animations) => {
        IP.setvalue(Dec2bin(this.addresse2));
        pos = this.addresse2;
        queue.clear(animations);
        queue.fetchInstruction(animations, 0, 1, [], 0);
        queue.fetchInstruction(animations, 0, 0, [], 0);
        queue.fetchInstruction(animations, 1, 1, [], 0);
        queue.fetchInstruction(animations, 0, 0, [], 0);
        queue.fetchInstruction(animations, 2, 1, [], 0);
        queue.fetchInstruction(animations, 0, 0, [], 0);
        memory.setRim(binaryToHex(Dec2bin(this.addresse1)).slice(0, 2));
        memory.pushval();
        memory.setRim(binaryToHex(Dec2bin(this.addresse1)).slice(-2));
        memory.pushval();
        const line = getinst(this.addresse2);
        let i = line;
        let found = false;
        while (
          !found &&
          i < getcode().length &&
          !["STOP","BNE", "BE", "BRI", "BS", "BI", "BSE", "BIE", "RET"].includes(
            code2()[i][0]
          )
        ) {
          if (code2()[i][0] == "CALL") {
            found = true;
          }
          i++;
        }
        if (found) {
          pushadrs(getallLeng(getcode().slice(0, i)));
        }
      },
    ];
    this.buildanim = function () {
      return [
        {
          value: this.value1,
          target: RegToMdr.target,
          time: RegToMdr.time,
          anim: RegToMdr.anim,
        },
        {
          value: "",
          target: BusToMdr.target,
          time: BusToMdr.time,
          anim: BusToMdr.anim,
        },
        {
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: "PUSH",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
      ];
    };
  }
}

class InstructionRET {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.res = 0;
    this.name = "RET";
    this.steps = [
      (animations) => {
        let reg;
        memory.popval();
        reg = memory.getRim();
        memory.popval();
        reg = memory.getRim() + reg;
        reg = parseInt(reg, 16);
        IP.setvalue(Dec2bin(reg.toString()));
        pos = reg;
        queue.clear(animations);
        queue.fetchInstruction(animations, 0, 1, [], 0);
        queue.fetchInstruction(animations, 0, 0, [], 0);
        queue.fetchInstruction(animations, 1, 1, [], 0);
        queue.fetchInstruction(animations, 0, 0, [], 0);
        queue.fetchInstruction(animations, 2, 1, [], 0);
        queue.fetchInstruction(animations, 0, 0, [], 0);

        const line = getinst(reg);
        let i = line;

        let found = false;
        while (
          !found &&
          i < getcode().length &&
          !["STOP","BNE", "BE", "BRI", "BS", "BI", "BSE", "BIE", "RET"].includes(
            code2()[i][0]
          )
        ) {
          if (code2()[i][0] == "CALL") {
            found = true;
          }
          i++;
        }
        if (found) {
          pushadrs(getallLeng(getcode().slice(0, i)));
        }
      },
    ];
    this.buildanim = function () {
      return [
        {
          value: "RET",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: this.value1,
          target: MdrToBus.target,
          time: MdrToBus.time,
          anim: MdrToBus.anim,
        },
        //add here the rest of pop animation
        {
          value: "",
          target: MdrToUnderIp.target,
          time: MdrToUnderIp.time,
          anim: MdrToUnderIp.anim,
        },
        {
          value: "",
          target: UnderIpToAddBus.target,
          time: UnderIpToAddBus.time,
          anim: UnderIpToAddBus.anim,
        },
        {
          value: "adr",
          target: AdrBusToAdr.target,
          time: AdrBusToAdr.time,
          anim: AdrBusToAdr.anim,
        },
        {
          value: "",
          target: AdrToIp.target,
          time: AdrToIp.time,
          anim: AdrToIp.anim,
        },
      ];
    };
  }
}

class InstructionCMP {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.res = 0;
    this.name = "CMP";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.Rual2.setleft(TwosComplement(this.value2, 8));
          Alu1.compareBinary(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.Rual2.setvalue(TwosComplement(this.value2, 16));
          Alu1.compareBinary(16);
        }
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "CMP",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[5] === "1" ? "1-OVERFLOW" : "0-OVERFLOW",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}

class InstructionADD {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.res = 0;
    this.name = "ADD";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // this.res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.Rual2.setleft(TwosComplement(this.value2, 8));
          Alu1.addBinary(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.Rual2.setvalue(TwosComplement(this.value2, 16));
          Alu1.addBinary(16);
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "ADD",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[5] === "1" ? "1-OVERFLOW" : "0-OVERFLOW",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}
class InstructionMOV00 {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "MOV-RR";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        Registers[this.register1].setvalue(TwosComplement(this.value2, 16));
      },
    ];
    this.buildanim = function () {
      if (this.register1 == "000") {
        if (this.register2 == "000") {
          return [
            {
              nom: "R1",
              value: "value2",
              target: infitToR1.target,
              time: infitToR1.time,
              anim: infitToR1.anim,
            },
            {
              nom: "R1",
              value: "value2",
              target: fitToR1.target,
              time: fitToR1.time,
              anim: fitToR1.anim,
            },
          ];
        } else if (this.register2 == "001") {
          return [
            {
              nom: "R2",
              value: "value2",
              target: infitToR2.target,
              time: infitToR2.time,
              anim: infitToR2.anim,
            },
            {
              nom: "R1",
              value: "value2",
              target: fitToR1.target,
              time: fitToR1.time,
              anim: fitToR1.anim,
            },
          ];
        } else if (this.register2 == "2") {
          return [
            {
              nom: "R3",
              value: "value2",
              target: infitToR3.target,
              time: infitToR3.time,
              anim: infitToR3.anim,
            },
            {
              nom: "R1",
              value: "value2",
              target: fitToR1.target,
              time: fitToR1.time,
              anim: fitToR1.anim,
            },
          ];
        } else if (this.register2 == "3") {
          return [
            {
              nom: "R4",
              value: "value2",
              target: infitToR4.target,
              time: infitToR4.time,
              anim: infitToR4.anim,
            },
            {
              nom: "R1",
              value: "value2",
              target: infitToR1.target,
              time: infitToR1.time,
              anim: fitToR1.anim,
            },
          ];
        } else if (this.register2 == "4") {
          return [
            {
              nom: "ACC",
              value: "value2",
              target: infitToAcc.target,
              time: infitToAcc.time,
              anim: infitToAcc.anim,
            },
            {
              value: "",
              target: AccToBus.target,
              time: AccToBus.time,
              anim: AccToBus.anim,
            },
            {
              value: "value2",
              target: AccToReg.target,
              time: AccToReg.time,
              anim: AccToReg.anim,
            },
            {
              nom: "R1",
              value: "value2",
              target: fitToR1.target,
              time: fitToR1.time,
              anim: fitToR1.anim,
            },
          ];
        } else if (this.register2 == "5") {
          return [
            {
              nom: "BR",
              value: "value2",
              target: infitToBr.target,
              time: infitToBr.time,
              anim: infitToBr.anim,
            },
            {
              nom: "R1",
              value: "value2",
              target: fitToR1.target,
              time: fitToR1.time,
              anim: fitToR1.anim,
            },
          ];
        } else if (this.register2 == "6") {
          return [
            {
              nom: "IDR",
              value: "value2",
              target: infitToIdr.target,
              time: infitToIdr.time,
              anim: infitToIdr.anim,
            },
            {
              nom: "R1",
              value: "value2",
              target: fitToR1.target,
              time: fitToR1.time,
              anim: fitToR1.anim,
            },
          ];
        } else if (this.register2 == "7") {
          return [
            {
              nom: "SR",
              value: "value2",
              target: infitToSR.target,
              time: infitToSR.time,
              anim: infitToSR.anim,
            },
            {
              nom: "R1",
              value: "value2",
              target: fitToR1.target,
              time: fitToR1.time,
              anim: fitToR1.anim,
            },
          ];
        }
      } else if (this.register1 == "001") {
        if (this.register2 == "000") {
          return [
            {
              nom: "R1",
              value: "value2",
              target: infitToR1.target,
              time: infitToR1.time,
              anim: infitToR1.anim,
            },
            {
              nom: "R2",
              target: fitToR2.target,
              time: fitToR2.time,
              value: "value2",
              anim: fitToR2.anim,
            },
          ];
        } else if (this.register2 == "001") {
          return [
            {
              nom: "R2",
              value: "value2",
              target: infitToR2.target,
              time: infitToR2.time,
              anim: infitToR2.anim,
            },
            {
              nom: "R2",
              value: "value2",
              target: fitToR2.target,
              time: fitToR2.time,
              anim: fitToR2.anim,
            },
          ];
        } else if (this.register2 == "2") {
          return [
            {
              nom: "R3",
              value: "value2",
              target: infitToR3.target,
              time: infitToR3.time,
              anim: infitToR3.anim,
            },
            {
              nom: "R2",
              value: "value2",
              target: fitToR2.target,
              time: fitToR2.time,
              anim: fitToR2.anim,
            },
          ];
        } else if (this.register2 == "3") {
          return [
            {
              nom: "R4",
              value: "value2",
              target: infitToR4.target,
              time: infitToR4.time,
              anim: infitToR4.anim,
            },
            {
              nom: "R2",
              value: "value2",
              target: fitToR2.target,
              time: fitToR2.time,
              anim: fitToR2.anim,
            },
          ];
        } else if (this.register2 == "4") {
          return [
            {
              nom: "ACC",
              value: "value2",
              target: infitToAcc.target,
              time: infitToAcc.time,
              anim: infitToAcc.anim,
            },
            {
              value: "",
              target: AccToBus.target,
              time: AccToBus.time,
              anim: AccToBus.anim,
            },
            {
              value: "value2",
              target: AccToReg.target,
              time: AccToReg.time,
              anim: AccToReg.anim,
            },
            {
              nom: "R2",
              value: "value2",
              target: fitToR2.target,
              time: fitToR2.time,
              anim: fitToR2.anim,
            },
          ];
        } else if (this.register2 == "5") {
          return [
            {
              nom: "BR",
              value: "value2",
              target: infitToBr.target,
              time: infitToBr.time,
              anim: infitToBr.anim,
            },
            {
              nom: "R2",
              value: "value2",
              target: fitToR2.target,
              time: fitToR2.time,
              anim: fitToR2.anim,
            },
          ];
        } else if (this.register2 == "6") {
          return [
            {
              nom: "IDR",
              value: "value2",
              target: infitToIdr.target,
              time: infitToIdr.time,
              anim: infitToIdr.anim,
            },
            {
              nom: "R2",
              value: "value2",
              target: fitToR2.target,
              time: fitToR2.time,
              anim: fitToR2.anim,
            },
          ];
        } else if (this.register2 == "7") {
          return [
            {
              nom: "SR",
              value: "value2",
              target: infitToSR.target,
              time: infitToSR.time,
              anim: infitToSR.anim,
            },
            {
              nom: "R2",
              value: "value2",
              target: fitToR2.target,
              time: fitToR2.time,
              anim: fitToR2.anim,
            },
          ];
        }
      } else if (this.register1 == "2") {
        if (this.register2 == "000") {
          return [
            {
              nom: "R1",
              value: "value2",
              target: infitToR1.target,
              time: infitToR1.time,
              anim: infitToR1.anim,
            },
            {
              nom: "R3",
              value: "value2",
              target: fitToR3.target,
              time: fitToR3.time,
              anim: fitToR3.anim,
            },
          ];
        } else if (this.register2 == "001") {
          return [
            {
              nom: "R2",
              value: "value2",
              target: infitToR2.target,
              time: infitToR2.time,
              anim: infitToR2.anim,
            },
            {
              nom: "R3",
              value: "value2",
              target: fitToR3.target,
              time: fitToR3.time,
              anim: fitToR3.anim,
            },
          ];
        } else if (this.register2 == "2") {
          return [
            {
              nom: "R3",
              value: "value2",
              target: infitToR3.target,
              time: infitToR3.time,
              anim: infitToR3.anim,
            },
            {
              nom: "R3",
              value: "value2",
              target: fitToR3.target,
              time: fitToR3.time,
              anim: fitToR3.anim,
            },
          ];
        } else if (this.register2 == "3") {
          return [
            {
              nom: "R4",
              value: "value2",
              target: infitToR4.target,
              time: infitToR4.time,
              anim: infitToR4.anim,
            },
            {
              nom: "R3",
              value: "value2",
              target: fitToR3.target,
              time: fitToR3.time,
              anim: fitToR3.anim,
            },
          ];
        } else if (this.register2 == "4") {
          return [
            {
              nom: "ACC",
              value: "value2",
              target: infitToAcc.target,
              time: infitToAcc.time,
              anim: infitToAcc.anim,
            },
            {
              value: "",
              target: AccToBus.target,
              time: AccToBus.time,
              anim: AccToBus.anim,
            },
            {
              value: "value2",
              target: AccToReg.target,
              time: AccToReg.time,
              anim: AccToReg.anim,
            },
            {
              nom: "R3",
              value: "value2",
              target: fitToR3.target,
              time: fitToR3.time,
              anim: fitToR3.anim,
            },
          ];
        } else if (this.register2 == "5") {
          return [
            {
              nom: "BR",
              value: "value2",
              target: infitToBr.target,
              time: infitToBr.time,
              anim: infitToBr.anim,
            },
            {
              nom: "R3",
              value: "value2",
              target: fitToR3.target,
              time: fitToR3.time,
              anim: fitToR3.anim,
            },
          ];
        } else if (this.register2 == "6") {
          return [
            {
              nom: "IDR",
              value: "value2",
              target: infitToIdr.target,
              time: infitToIdr.time,
              anim: infitToIdr.anim,
            },
            {
              nom: "R3",
              value: "value2",
              target: fitToR3.target,
              time: fitToR3.time,
              anim: fitToR3.anim,
            },
          ];
        } else if (this.register2 == "7") {
          return [
            {
              nom: "SR",
              value: "value2",
              target: infitToSR.target,
              time: infitToSR.time,
              anim: infitToSR.anim,
            },
            {
              nom: "R3",
              value: "value2",
              target: fitToR3.target,
              time: fitToR3.time,
              anim: fitToR3.anim,
            },
          ];
        }
      } else if (this.register1 == "3") {
        if (this.register2 == "000") {
          return [
            {
              nom: "R1",
              value: "value2",
              target: infitToR1.target,
              time: infitToR1.time,
              anim: infitToR1.anim,
            },
            {
              nom: "R4",
              value: "value2",
              target: fitToR4.target,
              time: fitToR4.time,
              anim: fitToR4.anim,
            },
          ];
        } else if (this.register2 == "001") {
          return [
            {
              nom: "R2",
              value: "value2",
              target: infitToR2.target,
              time: infitToR2.time,
              anim: infitToR2.anim,
            },
            {
              nom: "R4",
              value: "value2",
              target: fitToR4.target,
              time: fitToR4.time,
              anim: fitToR4.anim,
            },
          ];
        } else if (this.register2 == "2") {
          return [
            {
              nom: "R3",
              value: "value2",
              target: infitToR3.target,
              time: infitToR3.time,
              anim: infitToR3.anim,
            },
            {
              nom: "R4",
              value: "value2",
              target: fitToR4.target,
              time: fitToR4.time,
              anim: fitToR4.anim,
            },
          ];
        } else if (this.register2 == "3") {
          return [
            {
              nom: "R4",
              value: "value2",
              target: infitToR4.target,
              time: infitToR4.time,
              anim: infitToR4.anim,
            },
            {
              nom: "R4",
              value: "value2",
              target: fitToR4.target,
              time: fitToR4.time,
              anim: fitToR4.anim,
            },
          ];
        } else if (this.register2 == "4") {
          return [
            {
              nom: "ACC",
              value: "value2",
              target: infitToAcc.target,
              time: infitToAcc.time,
              anim: infitToAcc.anim,
            },
            {
              value: "",
              target: AccToBus.target,
              time: AccToBus.time,
              anim: AccToBus.anim,
            },
            {
              value: "value2",
              target: AccToReg.target,
              time: AccToReg.time,
              anim: AccToReg.anim,
            },
            {
              nom: "R4",
              value: "value2",
              target: fitToR4.target,
              time: fitToR4.time,
              anim: fitToR4.anim,
            },
          ];
        } else if (this.register2 == "5") {
          return [
            {
              nom: "BR",
              value: "value2",
              target: infitToBr.target,
              time: infitToBr.time,
              anim: infitToBr.anim,
            },
            {
              nom: "R4",
              value: "value2",
              target: fitToR4.target,
              time: fitToR4.time,
              anim: fitToR4.anim,
            },
          ];
        } else if (this.register2 == "6") {
          return [
            {
              nom: "IDR",
              value: "value2",
              target: infitToIdr.target,
              time: infitToIdr.time,
              anim: infitToIdr.anim,
            },
            {
              nom: "R4",
              value: "value2",
              target: fitToR4.target,
              time: fitToR4.time,
              anim: fitToR4.anim,
            },
          ];
        } else if (this.register2 == "7") {
          return [
            {
              nom: "SR",
              value: "value2",
              target: infitToSR.target,
              time: infitToSR.time,
              anim: infitToSR.anim,
            },
            {
              nom: "R4",
              value: "value2",
              target: fitToR4.target,
              time: fitToR4.time,
              anim: fitToR4.anim,
            },
          ];
        }
      } else if (this.register1 == "4") {
        if (this.register2 == "000") {
          return [
            {
              nom: "R1",
              value: "value2",
              target: infitToR1.target,
              time: infitToR1.time,
              anim: infitToR1.anim,
            },
            {
              value: "value2",
              target: RegToAcc.target,
              time: RegToAcc.time,
              anim: RegToAcc.anim,
            },
            {
              value: "value2",
              target: BusToAcc.target,
              time: BusToAcc.time,
              anim: BusToAcc.anim,
            },
            {
              nom: "ACC",
              value: "value2",
              target: fitToAcc.target,
              time: fitToAcc.time,
              anim: fitToAcc.anim,
            },
          ];
        } else if (this.register2 == "001") {
          return [
            {
              nom: "R2",
              value: "value2",
              target: infitToR2.target,
              time: infitToR2.time,
              anim: infitToR2.anim,
            },
            {
              value: "value2",
              target: RegToAcc.target,
              time: RegToAcc.time,
              anim: RegToAcc.anim,
            },
            {
              value: "value2",
              target: BusToAcc.target,
              time: BusToAcc.time,
              anim: BusToAcc.anim,
            },
            {
              nom: "ACC",
              value: "value2",
              target: fitToAcc.target,
              time: fitToAcc.time,
              anim: fitToAcc.anim,
            },
          ];
        } else if (this.register2 == "2") {
          return [
            {
              nom: "R3",
              value: "value2",
              target: infitToR3.target,
              time: infitToR3.time,
              anim: infitToR3.anim,
            },
            {
              value: "value2",
              target: RegToAcc.target,
              time: RegToAcc.time,
              anim: RegToAcc.anim,
            },
            {
              value: "value2",
              target: BusToAcc.target,
              time: BusToAcc.time,
              anim: BusToAcc.anim,
            },
            {
              nom: "ACC",
              value: "value2",
              target: fitToAcc.target,
              time: fitToAcc.time,
              anim: fitToAcc.anim,
            },
          ];
        } else if (this.register2 == "3") {
          return [
            {
              nom: "R4",
              value: "value2",
              target: infitToR4.target,
              time: infitToR4.time,
              anim: infitToR4.anim,
            },
            {
              value: "value2",
              target: RegToAcc.target,
              time: RegToAcc.time,
              anim: RegToAcc.anim,
            },
            {
              value: "value2",
              target: BusToAcc.target,
              time: BusToAcc.time,
              anim: BusToAcc.anim,
            },
            {
              nom: "ACC",
              value: "value2",
              target: fitToAcc.target,
              time: fitToAcc.time,
              anim: fitToAcc.anim,
            },
          ];
        } else if (this.register2 == "4") {
          return [
            {
              nom: "ACC",
              value: "value2",
              target: infitToAcc.target,
              time: infitToAcc.time,
              anim: infitToAcc.anim,
            },
            {
              nom: "ACC",
              value: "value2",
              target: fitToAcc.target,
              time: fitToAcc.time,
              anim: fitToAcc.anim,
            },
          ];
        } else if (this.register2 == "5") {
          return [
            {
              nom: "BR",
              value: "value2",
              target: infitToBr.target,
              time: infitToBr.time,
              anim: infitToBr.anim,
            },
            {
              value: "value2",
              target: RegToAcc.target,
              time: RegToAcc.time,
              anim: RegToAcc.anim,
            },
            {
              value: "value2",
              target: BusToAcc.target,
              time: BusToAcc.time,
              anim: BusToAcc.anim,
            },
            {
              nom: "ACC",
              value: "value2",
              target: fitToAcc.target,
              time: fitToAcc.time,
              anim: fitToAcc.anim,
            },
          ];
        } else if (this.register2 == "6") {
          return [
            {
              nom: "IDR",
              value: "value2",
              target: infitToIdr.target,
              time: infitToIdr.time,
              anim: infitToIdr.anim,
            },
            {
              value: "value2",
              target: RegToAcc.target,
              time: RegToAcc.time,
              anim: RegToAcc.anim,
            },
            {
              value: "value2",
              target: BusToAcc.target,
              time: BusToAcc.time,
              anim: BusToAcc.anim,
            },
            {
              nom: "ACC",
              value: "value2",
              target: fitToAcc.target,
              time: fitToAcc.time,
              anim: fitToAcc.anim,
            },
          ];
        } else if (this.register2 == "7") {
          return [
            {
              nom: "SR",
              value: "value2",
              target: infitToSR.target,
              time: infitToSR.time,
              anim: infitToSR.anim,
            },
            {
              value: "value2",
              target: RegToAcc.target,
              time: RegToAcc.time,
              anim: RegToAcc.anim,
            },
            {
              value: "value2",
              target: BusToAcc.target,
              time: BusToAcc.time,
              anim: BusToAcc.anim,
            },
            {
              nom: "ACC",
              value: "value2",
              target: fitToAcc.target,
              time: fitToAcc.time,
              anim: fitToAcc.anim,
            },
          ];
        }
      } else if (this.register1 == "5") {
        if (this.register2 == "000") {
          return [
            {
              nom: "R1",
              value: "value2",
              target: infitToR1.target,
              time: infitToR1.time,
              anim: infitToR1.anim,
            },
            {
              nom: "BR",
              value: "value2",
              target: fitToBr.target,
              time: fitToBr.time,
              anim: fitToBr.anim,
            },
          ];
        } else if (this.register2 == "001") {
          return [
            {
              nom: "R2",
              value: "value2",
              target: infitToR2.target,
              time: infitToR2.time,
              anim: infitToR2.anim,
            },
            {
              nom: "BR",
              value: "value2",
              target: fitToBr.target,
              time: fitToBr.time,
              anim: fitToBr.anim,
            },
          ];
        } else if (this.register2 == "2") {
          return [
            {
              nom: "R3",
              value: "value2",
              target: infitToR3.target,
              time: infitToR3.time,
              anim: infitToR3.anim,
            },
            {
              nom: "BR",
              value: "value2",
              target: fitToBr.target,
              time: fitToBr.time,
              anim: fitToBr.anim,
            },
          ];
        } else if (this.register2 == "3") {
          return [
            {
              nom: "R4",
              value: "value2",
              target: infitToR4.target,
              time: infitToR4.time,
              anim: infitToR4.anim,
            },
            {
              nom: "BR",
              value: "value2",
              target: fitToBr.target,
              time: fitToBr.time,
              anim: fitToBr.anim,
            },
          ];
        } else if (this.register2 == "4") {
          return [
            {
              nom: "ACC",
              value: "value2",
              target: infitToAcc.target,
              time: infitToAcc.time,
              anim: infitToAcc.anim,
            },
            {
              value: "",
              target: AccToBus.target,
              time: AccToBus.time,
              anim: AccToBus.anim,
            },
            {
              value: "value2",
              target: AccToReg.target,
              time: AccToReg.time,
              anim: AccToReg.anim,
            },
            {
              nom: "BR",
              value: "value2",
              target: fitToBr.target,
              time: fitToBr.time,
              anim: fitToBr.anim,
            },
          ];
        } else if (this.register2 == "5") {
          return [
            {
              nom: "BR",
              value: "value2",
              target: infitToBr.target,
              time: infitToBr.time,
              anim: infitToBr.anim,
            },
            {
              nom: "BR",
              value: "value2",
              target: fitToBr.target,
              time: fitToBr.time,
              anim: fitToBr.anim,
            },
          ];
        } else if (this.register2 == "6") {
          return [
            {
              nom: "IDR",
              value: "value2",
              target: infitToIdr.target,
              time: infitToIdr.time,
              anim: infitToIdr.anim,
            },
            {
              nom: "BR",
              value: "value2",
              target: fitToBr.target,
              time: fitToBr.time,
              anim: fitToBr.anim,
            },
          ];
        } else if (this.register2 == "7") {
          return [
            {
              nom: "SR",
              value: "value2",
              target: infitToSR.target,
              time: infitToSR.time,
              anim: infitToSR.anim,
            },
            {
              nom: "BR",
              value: "value2",
              target: fitToBr.target,
              time: fitToBr.time,
              anim: fitToBr.anim,
            },
          ];
        }
      } else if (this.register1 == "6") {
        if (this.register2 == "000") {
          return [
            {
              nom: "R1",
              value: "value2",
              target: infitToR1.target,
              time: infitToR1.time,
              anim: infitToR1.anim,
            },
            {
              nom: "IDR",
              value: "value2",
              target: fitToIdr.target,
              time: fitToIdr.time,
              anim: fitToIdr.anim,
            },
          ];
        } else if (this.register2 == "001") {
          return [
            {
              nom: "R2",
              value: "value2",
              target: infitToR2.target,
              time: infitToR2.time,
              anim: infitToR2.anim,
            },
            {
              nom: "IDR",
              value: "value2",
              target: fitToIdr.target,
              time: fitToIdr.time,
              anim: fitToIdr.anim,
            },
          ];
        } else if (this.register2 == "2") {
          return [
            {
              nom: "R3",
              value: "value2",
              target: infitToR3.target,
              time: infitToR3.time,
              anim: infitToR3.anim,
            },
            {
              nom: "IDR",
              value: "value2",
              target: fitToIdr.target,
              time: fitToIdr.time,
              anim: fitToIdr.anim,
            },
          ];
        } else if (this.register2 == "3") {
          return [
            {
              nom: "R4",
              value: "value2",
              target: infitToR4.target,
              time: infitToR4.time,
              anim: infitToR4.anim,
            },
            {
              nom: "IDR",
              value: "value2",
              target: fitToIdr.target,
              time: fitToIdr.time,
              anim: fitToIdr.anim,
            },
          ];
        } else if (this.register2 == "4") {
          return [
            {
              nom: "ACC",
              value: "value2",
              target: infitToAcc.target,
              time: infitToAcc.time,
              anim: infitToAcc.anim,
            },
            {
              value: "",
              target: AccToBus.target,
              time: AccToBus.time,
              anim: AccToBus.anim,
            },
            {
              value: "value2",
              target: AccToReg.target,
              time: AccToReg.time,
              anim: AccToReg.anim,
            },
            {
              nom: "IDR",
              value: "value2",
              target: fitToIdr.target,
              time: fitToIdr.time,
              anim: fitToIdr.anim,
            },
          ];
        } else if (this.register2 == "5") {
          return [
            {
              nom: "BR",
              value: "value2",
              target: infitToBr.target,
              time: infitToBr.time,
              anim: infitToBr.anim,
            },
            {
              nom: "IDR",
              value: "value2",
              target: fitToIdr.target,
              time: fitToIdr.time,
              anim: fitToIdr.anim,
            },
          ];
        } else if (this.register2 == "6") {
          return [
            {
              nom: "IDR",
              value: "value2",
              target: infitToIdr.target,
              time: infitToIdr.time,
              anim: infitToIdr.anim,
            },
            {
              nom: "IDR",
              value: "value2",
              target: fitToIdr.target,
              time: fitToIdr.time,
              anim: fitToIdr.anim,
            },
          ];
        } else if (this.register2 == "7") {
          return [
            {
              nom: "SR",
              value: "value2",
              target: infitToSR.target,
              time: infitToSR.time,
              anim: infitToSR.anim,
            },
            {
              nom: "IDR",
              value: "value2",
              target: fitToIdr.target,
              time: fitToIdr.time,
              anim: fitToIdr.anim,
            },
          ];
        }
      } else if (this.register1 == "7") {
        if (this.register2 == "000") {
          return [
            {
              nom: "R1",
              value: "value2",
              target: infitToR1.target,
              time: infitToR1.time,
              anim: infitToR1.anim,
            },
            {
              nom: "SR",
              value: "value2",
              target: fitToSr.target,
              time: fitToSr.time,
              anim: fitToSr.anim,
            },
          ];
        } else if (this.register2 == "001") {
          return [
            {
              nom: "R2",
              value: "value2",
              target: infitToR2.target,
              time: infitToR2.time,
              anim: infitToR2.anim,
            },
            {
              nom: "SR",
              value: "value2",
              target: fitToSr.target,
              time: fitToSr.time,
              anim: fitToSr.anim,
            },
          ];
        } else if (this.register2 == "2") {
          return [
            {
              nom: "R3",
              value: "value2",
              target: infitToR3.target,
              time: infitToR3.time,
              anim: infitToR3.anim,
            },
            {
              nom: "SR",
              value: "value2",
              target: fitToSr.target,
              time: fitToSr.time,
              anim: fitToSr.anim,
            },
          ];
        } else if (this.register2 == "3") {
          return [
            {
              nom: "R4",
              value: "value2",
              target: infitToR4.target,
              time: infitToR4.time,
              anim: infitToR4.anim,
            },
            {
              nom: "SR",
              value: "value2",
              target: fitToSr.target,
              time: fitToSr.time,
              anim: fitToSr.anim,
            },
          ];
        } else if (this.register2 == "4") {
          return [
            {
              nom: "ACC",
              value: "value2",
              target: infitToAcc.target,
              time: infitToAcc.time,
              anim: infitToAcc.anim,
            },
            {
              value: "",
              target: AccToBus.target,
              time: AccToBus.time,
              anim: AccToBus.anim,
            },
            {
              value: "value2",
              target: AccToReg.target,
              time: AccToReg.time,
              anim: AccToReg.anim,
            },
            {
              nom: "SR",
              value: "value2",
              target: fitToSr.target,
              time: fitToSr.time,
              anim: fitToSr.anim,
            },
          ];
        } else if (this.register2 == "5") {
          return [
            {
              nom: "BR",
              value: "value2",
              target: infitToBr.target,
              time: infitToBr.time,
              anim: infitToBr.anim,
            },
            {
              nom: "SR",
              value: "value2",
              target: fitToSr.target,
              time: fitToSr.time,
              anim: fitToSr.anim,
            },
          ];
        } else if (this.register2 == "6") {
          return [
            {
              nom: "IDR",
              value: "value2",
              target: infitToIdr.target,
              time: infitToIdr.time,
              anim: infitToIdr.anim,
            },
            {
              nom: "SR",
              value: "value2",
              target: fitToSr.target,
              time: fitToSr.time,
              anim: fitToSr.anim,
            },
          ];
        } else if (this.register2 == "7") {
          return [
            {
              nom: "SR",
              value: "value2",
              target: infitToSR.target,
              time: infitToSR.time,
              anim: infitToSR.anim,
            },
            {
              nom: "SR",
              value: "value2",
              target: fitToSr.target,
              time: fitToSr.time,
              anim: fitToSr.anim,
            },
          ];
        }
      }
    };
  }
}
class InstructionMOV01 {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.isimmed = 0;
    this.name = "MOV-RM";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        Registers[this.register1].setvalue(TwosComplement(this.value2, 16));
      },
    ];
    this.buildanim = function () {
      if (this.register1 == "0") {
        if (this.isimmed === 1) {
          return [
            {
              nom: "R1",
              value: "value2",
              target: fitToR1.target,
              time: fitToR1.time,
              anim: fitToR1.anim,
            },
          ];
        } else {
          return [
            {
              value: "value2",
              target: infitToMdr.target,
              time: infitToMdr.time,
              anim: infitToMdr.anim,
            },
            {
              value: "",
              target: MdrToBus.target,
              time: MdrToBus.time,
              anim: MdrToBus.anim,
            },
            {
              value: "value2",
              target: MdrToReg.target,
              time: MdrToReg.time,
              anim: MdrToReg.anim,
            },
            {
              nom: "R1",
              value: "value2",
              target: fitToR1.target,
              time: fitToR1.time,
              anim: fitToR1.anim,
            },
          ];
        }
      } else if (this.register1 == "1") {
        if (this.isimmed === 1) {
          return [
            {
              nom: "R2",
              value: "value2",
              target: fitToR2.target,
              time: fitToR2.time,
              anim: fitToR2.anim,
            },
          ];
        } else {
          return [
            {
              value: "value2",
              target: infitToMdr.target,
              time: infitToMdr.time,
              anim: infitToMdr.anim,
            },
            {
              value: "",
              target: MdrToBus.target,
              time: MdrToBus.time,
              anim: MdrToBus.anim,
            },
            {
              value: "value2",
              target: MdrToReg.target,
              time: MdrToReg.time,
              anim: MdrToReg.anim,
            },
            {
              nom: "R2",
              value: "value2",
              target: fitToR2.target,
              time: fitToR2.time,
              anim: fitToR2.anim,
            },
          ];
        }
      } else if (this.register1 == 2) {
        if (this.isimmed === 1) {
          return [
            {
              nom: "R3",
              value: "value2",
              target: fitToR3.target,
              time: fitToR3.time,
              anim: fitToR3.anim,
            },
          ];
        } else {
          return [
            {
              value: "value2",
              target: infitToMdr.target,
              time: infitToMdr.time,
              anim: infitToMdr.anim,
            },
            {
              value: "",
              target: MdrToBus.target,
              time: MdrToBus.time,
              anim: MdrToBus.anim,
            },
            {
              value: "value2",
              target: MdrToReg.target,
              time: MdrToReg.time,
              anim: MdrToReg.anim,
            },
            {
              nom: "R3",
              value: "value2",
              target: fitToR3.target,
              time: fitToR3.time,
              anim: fitToR3.anim,
            },
          ];
        }
      } else if (this.register1 == "3") {
        if (this.isimmed === 1) {
          return [
            {
              nom: "R4",
              value: "value2",
              target: fitToR4.target,
              time: fitToR4.time,
              anim: fitToR4.anim,
            },
          ];
        } else {
          return [
            {
              value: "value2",
              target: infitToMdr.target,
              time: infitToMdr.time,
              anim: infitToMdr.anim,
            },
            {
              value: "",
              target: MdrToBus.target,
              time: MdrToBus.time,
              anim: MdrToBus.anim,
            },
            {
              value: "value2",
              target: MdrToReg.target,
              time: MdrToReg.time,
              anim: MdrToReg.anim,
            },
            {
              nom: "R4",
              value: "value2",
              target: fitToR4.target,
              time: fitToR4.time,
              anim: fitToR4.anim,
            },
          ];
        }
      } else if (this.register1 == "4") {
        if (this.isimmed === 1) {
          return [
            {
              value: "value2",
              target: BusToAcc.target,
              time: BusToAcc.time,
              anim: BusToAcc.anim,
            },
            {
              nom: "ACC",
              value: "value2",
              target: fitToAcc.target,
              time: fitToAcc.time,
              anim: fitToAcc.anim,
            },
          ];
        } else {
          return [
            {
              value: "value2",
              target: infitToMdr.target,
              time: infitToMdr.time,
              anim: infitToMdr.anim,
            },
            {
              value: "",
              target: MdrToBus.target,
              time: MdrToBus.time,
              anim: MdrToBus.anim,
            },
            {
              value: "value2",
              target: MDRToAcc.target,
              time: MDRToAcc.time,
              anim: MDRToAcc.anim,
            },
            {
              value: "value2",
              target: BusToAcc.target,
              time: BusToAcc.time,
              anim: BusToAcc.anim,
            },
            {
              nom: "ACC",
              value: "value2",
              target: fitToAcc.target,
              time: fitToAcc.time,
              anim: fitToAcc.anim,
            },
          ];
        }
      } else if (this.register1 == "5") {
        if (this.isimmed === 1) {
          return [
            {
              nom: "BR",
              value: "value2",
              target: fitToBr.target,
              time: fitToBr.time,
              anim: fitToBr.anim,
            },
          ];
        } else {
          return [
            {
              value: "value2",
              target: infitToMdr.target,
              time: infitToMdr.time,
              anim: infitToMdr.anim,
            },
            {
              value: "",
              target: MdrToBus.target,
              time: MdrToBus.time,
              anim: MdrToBus.anim,
            },
            {
              value: "value2",
              target: MdrToReg.target,
              time: MdrToReg.time,
              anim: MdrToReg.anim,
            },
            {
              nom: "BR",
              value: "value2",
              target: fitToBr.target,
              time: fitToBr.time,
              anim: fitToBr.anim,
            },
          ];
        }
      } else if (this.register1 == "6") {
        if (this.isimmed === 1) {
          return [
            {
              nom: "IDR",
              value: "value2",
              target: fitToIdr.target,
              time: fitToIdr.time,
              anim: fitToIdr.anim,
            },
          ];
        } else {
          return [
            {
              value: "value2",
              target: infitToMdr.target,
              time: infitToMdr.time,
              anim: infitToMdr.anim,
            },
            {
              value: "",
              target: MdrToBus.target,
              time: MdrToBus.time,
              anim: MdrToBus.anim,
            },
            {
              value: "value2",
              target: MdrToReg.target,
              time: MdrToReg.time,
              anim: MdrToReg.anim,
            },
            {
              nom: "IDR",
              value: "value2",
              target: fitToIdr.target,
              time: fitToIdr.time,
              anim: fitToIdr.anim,
            },
          ];
        }
      } else if (this.register1 == "7") {
        if (this.isimmed === 1) {
          return [
            {
              nom: "SR",
              value: "value2",
              target: fitToSr.target,
              time: fitToSr.time,
              anim: fitToSr.anim,
            },
          ];
        } else {
          return [
            {
              value: "value2",
              target: infitToMdr.target,
              time: infitToMdr.time,
              anim: infitToMdr.anim,
            },
            {
              value: "",
              target: MdrToBus.target,
              time: MdrToBus.time,
              anim: MdrToBus.anim,
            },
            {
              value: "value2",
              target: MdrToReg.target,
              time: MdrToReg.time,
              anim: MdrToReg.anim,
            },
            {
              nom: "SR",
              value: "value2",
              target: fitToSr.target,
              time: fitToSr.time,
              anim: fitToSr.anim,
            },
          ];
        }
      }
    };
  }
}
class InstructionMOV10 {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "MOV-MR";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        if (this.taille == 1) {
          let hexval = this.value2.toString(16);
          while (hexval.length < 4) {
            hexval = "0" + hexval;
          }
          memory.setRim(hexval.substring(0, 2));
          memory.setRam(TwosComplement(this.addresse1 + 1, 16));
          memory.write();
          memory.setRim(hexval.substring(2, 4));
          memory.setRam(TwosComplement(this.addresse1, 16));
          memory.write();
        } else {
          memory.setRim(this.value2.toString(16));
          memory.setRam(TwosComplement(this.addresse1, 16));
          memory.write();
        }
      },
    ];
    this.buildanim = function () {
      if (this.register1 == "000") {
        return [
          {
            nom: "R1",
            value: "value2",
            target: infitToR1.target,
            time: infitToR1.time,
            anim: infitToR1.anim,
          },
          {
            value: "",
            target: RegistersToBus.target,
            time: RegistersToBus.time,
            anim: RegistersToBus.anim,
          },
          {
            value: "value2",
            target: RegToMdr.target,
            time: RegToMdr.time,
            anim: RegToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: "value2",
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            name: "mainMem",
            value: "WRITE",
            taille: "taille",
            address: "addresse1",
            content: "value2",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else if (this.register1 == "001") {
        return [
          {
            nom: "R2",
            value: "value2",
            target: infitToR2.target,
            time: infitToR2.time,
            anim: infitToR2.anim,
          },
          {
            value: "",
            target: RegistersToBus.target,
            time: RegistersToBus.time,
            anim: RegistersToBus.anim,
          },
          {
            value: "value2",
            target: RegToMdr.target,
            time: RegToMdr.time,
            anim: RegToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: "value2",
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            name: "mainMem",
            value: "WRITE",
            taille: "taille",
            address: "addresse1",
            content: "value2",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else if (this.register1 == "2") {
        return [
          {
            nom: "R3",
            value: "value2",
            target: infitToR3.target,
            time: infitToR3.time,
            anim: infitToR3.anim,
          },
          {
            value: "",
            target: RegistersToBus.target,
            time: RegistersToBus.time,
            anim: RegistersToBus.anim,
          },
          {
            value: "value2",
            target: RegToMdr.target,
            time: RegToMdr.time,
            anim: RegToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: "value2",
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            name: "mainMem",
            value: "WRITE",
            taille: "taille",
            address: "addresse1",
            content: "value2",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else if (this.register1 == "3") {
        return [
          {
            nom: "R4",
            value: "value2",
            target: infitToR4.target,
            time: infitToR4.time,
            anim: infitToR4.anim,
          },
          {
            value: "",
            target: RegistersToBus.target,
            time: RegistersToBus.time,
            anim: RegistersToBus.anim,
          },
          {
            value: "value2",
            target: RegToMdr.target,
            time: RegToMdr.time,
            anim: RegToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: "value2",
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            name: "mainMem",
            value: "WRITE",
            taille: "taille",
            address: "addresse1",
            content: "value2",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else if (this.register1 == "4") {
        return [
          {
            nom: "ACC",
            value: "value2",
            target: infitToAcc.target,
            time: infitToAcc.time,
            anim: infitToAcc.anim, //we have to change animations here___________________________________
          },
          {
            value: "",
            target: AccToBus.target,
            time: AccToBus.time,
            anim: AccToBus.anim,
          },
          {
            value: "value2",
            target: AccToMDR.target,
            time: AccToMDR.time,
            anim: AccToMDR.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: "value2",
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            name: "mainMem",
            value: "WRITE",
            taille: "taille",
            address: "addresse1",
            content: "value2",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else if (this.register1 == "5") {
        return [
          {
            nom: "BR",
            value: "value2",
            target: infitToBr.target,
            time: infitToBr.time,
            anim: infitToBr.anim,
          },
          {
            value: "",
            target: RegistersToBus.target,
            time: RegistersToBus.time,
            anim: RegistersToBus.anim,
          },
          {
            value: "value2",
            target: RegToMdr.target,
            time: RegToMdr.time,
            anim: RegToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: "value2",
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            name: "mainMem",
            value: "WRITE",
            taille: "taille",
            address: "addresse1",
            content: "value2",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else if (this.register1 == "6") {
        return [
          {
            nom: "IDR",
            value: "value2",
            target: infitToIdr.target,
            time: infitToIdr.time,
            anim: infitToIdr.anim,
          },
          {
            value: "",
            target: RegistersToBus.target,
            time: RegistersToBus.time,
            anim: RegistersToBus.anim,
          },
          {
            value: "value2",
            target: RegToMdr.target,
            time: RegToMdr.time,
            anim: RegToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: "value2",
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            name: "mainMem",
            value: "WRITE",
            taille: "taille",
            address: "addresse1",
            content: "value2",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else if (this.register1 == "7") {
        return [
          {
            nom: "SR",
            value: "value2",
            target: infitToSR.target,
            time: infitToSR.time,
            anim: infitToSR.anim,
          },
          {
            value: "",
            target: RegistersToBus.target,
            time: RegistersToBus.time,
            anim: RegistersToBus.anim,
          },
          {
            value: "value2",
            target: RegToMdr.target,
            time: RegToMdr.time,
            anim: RegToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: "value2",
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            name: "mainMem",
            value: "WRITE",
            taille: "taille",
            address: "addresse1",
            content: "value2",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      }
    };
  }
}
class InstructionMOV11 {
  ////the difference between them will be in the animation part
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.isimmed = true;
    this.name = "MOV-MM";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        if (this.taille == 1) {
          let hexval = this.value2.toString(16);
          while (hexval.length < 4) {
            hexval = "0" + hexval;
          }
          memory.setRim(hexval.substring(0, 2));
          memory.setRam(TwosComplement(this.addresse1 + 1, 16));
          memory.write();
          memory.setRim(hexval.substring(2, 4));
          memory.setRam(TwosComplement(this.addresse1, 16));
          memory.write();
        } else {
          memory.setRim(this.value2.toString(16));
          memory.setRam(TwosComplement(this.addresse1, 16));
          memory.write();
        }
      },
    ];
    this.buildanim = function () {
      if (this.isimmed == false) {
        return [
          {
            nom: "ACC",
            value: "addresse1",
            target: infitToAcc.target,
            time: infitToAcc.time,
            anim: infitToAcc.anim,
          },
          {
            value: "",
            target: AccToBus.target,
            time: AccToBus.time,
            anim: AccToBus.anim,
          },
          {
            value: "addresse1",
            target: AccToADR.target,
            time: AccToADR.time,
            anim: AccToADR.anim,
          },
          {
            value: "addresse1",
            target: ADRToMAR.target,
            time: ADRToMAR.time,
            anim: ADRToMAR.anim,
          },
          {
            value: "addresse1",
            target: fitToMar.target,
            time: fitToMar.time,
            anim: fitToMar.anim,
          },
          {
            name: "mainMem",
            value: "WRITE",
            taille: "taille",
            address: "addresse1",
            content: "value2",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else {
        return [
          {
            value: "value2",
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            name: "mainMem",
            value: "WRITE",
            taille: "taille",
            address: "addresse1",
            content: "value2",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ]; ///animation of writing in MC/___________________________
      }
    };
  }
}

class InstructionSUB {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "SUB";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // let res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.Rual2.setleft(TwosComplement(this.value2, 8));
          Alu1.subBinary(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.Rual2.setvalue(TwosComplement(this.value2, 16));
          Alu1.subBinary(16);
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "SUB",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[5] === "1" ? "1-OVERFLOW" : "0-OVERFLOW",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}

class InstructionMUL {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "MUL";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // let res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.Rual2.setleft(TwosComplement(this.value2, 8));
          Alu1.binaryMultiply(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.Rual2.setvalue(TwosComplement(this.value2, 16));
          let R4MUL = Alu1.binaryMultiply(16);
          if (Alu1.Acc.getvalue().length > 16) {
            Registers[3].setvalue(R4MUL);
          }
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "MUL",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[5] === "1" ? "1-OVERFLOW" : "0-OVERFLOW",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}

class InstructionDIV {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "DIV";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // let res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.Rual2.setleft(TwosComplement(this.value2, 8));
          let R4div = Alu1.DivBinary(8);
          Registers[3].setvalue(R4div);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.Rual2.setvalue(TwosComplement(this.value2, 16));
          let R4div = Alu1.DivBinary(16);
          Registers[3].setvalue(R4div);
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "DIV",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[5] === "1" ? "1-OVERFLOW" : "0-OVERFLOW",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}
class InstructionAND {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "AND";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // let res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.Rual2.setleft(TwosComplement(this.value2, 8));
          Alu1.andBinary(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.Rual2.setvalue(TwosComplement(this.value2, 16));
          Alu1.andBinary(16);
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "AND",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}
class InstructionOR {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "OR";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // let res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.Rual2.setleft(TwosComplement(this.value2, 8));
          Alu1.orBinary(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.Rual2.setvalue(TwosComplement(this.value2, 16));
          Alu1.orBinary(16);
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "OR",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}

class InstructionXOR {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "XOR";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // let res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.Rual2.setleft(TwosComplement(this.value2, 8));
          Alu1.xorBinary(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.Rual2.setvalue(TwosComplement(this.value2, 16));
          Alu1.xorBinary(16);
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "XOR",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}

class InstructionNOR {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "NOR";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // let res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.Rual2.setleft(TwosComplement(this.value2, 8));
          Alu1.norBinary(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.Rual2.setvalue(TwosComplement(this.value2, 16));
          Alu1.norBinary(16);
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "NOR",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}

class InstructionNAND {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "NAND";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // let res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.Rual2.setleft(TwosComplement(this.value2, 8));
          Alu1.nandBinary(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.Rual2.setvalue(TwosComplement(this.value2, 16));
          Alu1.nandBinary(16);
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "NAND",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}

class InstructionPUSH {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "PUSH";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        if (this.taille == 1) {
          memory.setRim(
            binaryToHex(
              Registers[parseInt(this.register1, 2)].getvalue()
            ).slice(0, 2)
          );
          memory.pushval();
          memory.setRim(
            binaryToHex(
              Registers[parseInt(this.register1, 2)].getvalue()
            ).slice(-2)
          );
          memory.pushval();
        } else {
          memory.setRim(binaryToHexlow(this.value1));
          memory.pushval();
        }
      },
    ];
    this.buildanim = function () {
      if (this.register1 == "000") {
        return [
          {
            nom: "R1",
            value: this.value1,
            target: fitToR1.target,
            time: fitToR1.time,
            anim: fitToR1.anim,
          },
          {
            nom: "R1",
            value: this.value1,
            target: infitToR1.target,
            time: infitToR1.time,
            anim: infitToR1.anim,
          },
          {
            value: this.value1,
            target: RegToMdr.target,
            time: RegToMdr.time,
            anim: RegToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: "PUSH",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else if (this.register1 == "001") {
        return [
          {
            nom: "R2",
            value: this.value1,
            target: fitToR2.target,
            time: fitToR2.time,
            anim: fitToR2.anim,
          },
          {
            nom: "R2",
            value: this.value1,
            target: infitToR2.target,
            time: infitToR2.time,
            anim: infitToR2.anim,
          },
          {
            value: this.value1,
            target: RegToMdr.target,
            time: RegToMdr.time,
            anim: RegToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: "PUSH",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else if (this.register1 == "010") {
        return [
          {
            nom: "R3",
            value: this.value1,
            target: fitToR3.target,
            time: fitToR3.time,
            anim: fitToR3.anim,
          },
          {
            nom: "R3",
            value: this.value1,
            target: infitToR3.target,
            time: infitToR3.time,
            anim: infitToR3.anim,
          },
          {
            value: this.value1,
            target: RegToMdr.target,
            time: RegToMdr.time,
            anim: RegToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: "PUSH",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else if (this.register1 == "011") {
        return [
          {
            nom: "R4",
            value: this.value1,
            target: fitToR4.target,
            time: fitToR4.time,
            anim: fitToR4.anim,
          },
          {
            nom: "R4",
            value: this.value1,
            target: infitToR4.target,
            time: infitToR4.time,
            anim: infitToR4.anim,
          },
          {
            value: this.value1,
            target: RegToMdr.target,
            time: RegToMdr.time,
            anim: RegToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: "PUSH",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else if (this.register1 == "100") {
        return [
          {
            nom: "ACC",
            value: this.value1,
            target: fitToAcc.target,
            time: fitToAcc.time,
            anim: fitToAcc.anim,
          },
          {
            nom: "ACC",
            value: this.value1,
            target: infitToAcc.target,
            time: infitToAcc.time,
            anim: infitToAcc.anim,
          },
          {
            value: this.value1,
            target: AccToBus.target,
            time: AccToBus.time,
            anim: AccToBus.anim,
          },
          {
            value: this.value1,
            target: AccToMDR.target,
            time: AccToMDR.time,
            anim: AccToMDR.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: "PUSH",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else if (this.register1 == "101") {
        return [
          {
            nom: "BR",
            value: this.value1,
            target: fitToBr.target,
            time: fitToBr.time,
            anim: fitToBr.anim,
          },
          {
            nom: "BR",
            value: this.value1,
            target: infitToBr.target,
            time: infitToBr.time,
            anim: infitToBr.anim,
          },
          {
            value: this.value1,
            target: RegToMdr.target,
            time: RegToMdr.time,
            anim: RegToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: "PUSH",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else if (this.register1 == "110") {
        return [
          {
            nom: "IDR",
            value: this.value1,
            target: fitToIdr.target,
            time: fitToIdr.time,
            anim: fitToIdr.anim,
          },
          {
            nom: "IDR",
            value: this.value1,
            target: infitToIdr.target,
            time: infitToIdr.time,
            anim: infitToIdr.anim,
          },
          {
            value: this.value1,
            target: RegToMdr.target,
            time: RegToMdr.time,
            anim: RegToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: "PUSH",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      } else if (this.register1 == "111") {
        return [
          {
            nom: "SR",
            value: this.value1,
            target: fitToSr.target,
            time: fitToSr.time,
            anim: fitToSr.anim,
          },
          {
            nom: "SR",
            value: this.value1,
            target: infitToSR.target,
            time: infitToSR.time,
            anim: infitToSR.anim,
          },
          {
            value: this.value1,
            target: RegToMdr.target,
            time: RegToMdr.time,
            anim: RegToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: "PUSH",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
      }
    };
  }
}

class InstructionPOP {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "POP";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        if (this.taille == 1) {
          let reg;
          memory.popval();
          reg = memory.getRim();
          memory.popval();
          reg = memory.getRim() + reg;
          Registers[parseInt(this.register1, 2)].setvalue(hex2bin(reg));
        } else {
          memory.popval();
          Registers[parseInt(this.register1, 2)].setvalue(
            hex2bin(memory.getRim())
          );
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
      },
    ];
    this.buildanim = function () {
      if (this.register1 == "000") {
        return [
          {
            value: "POP",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
          {
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: this.value1,
            target: MdrToBus.target,
            time: MdrToBus.time,
            anim: MdrToBus.anim,
          },
          {
            value: "",
            target: MdrToReg.target,
            time: MdrToReg.time,
            anim: MdrToReg.anim,
          },
          {
            nom: "R1",
            value: this.value1,
            target: fitToR1.target,
            time: fitToR1.time,
            anim: fitToR1.anim,
          },
          {
            nom: "R1",
            value: this.value1,
            target: infitToR1.target,
            time: infitToR1.time,
            anim: infitToR1.anim,
          },
        ];
      } else if (this.register1 == "001") {
        return [
          {
            value: "POP",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
          {
            //////animation pf pop in MC
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: this.value1,
            target: MdrToBus.target,
            time: MdrToBus.time,
            anim: MdrToBus.anim,
          },
          {
            value: "",
            target: MdrToReg.target,
            time: MdrToReg.time,
            anim: MdrToReg.anim,
          },
          {
            nom: "R2",
            value: this.value1,
            target: fitToR2.target,
            time: fitToR2.time,
            anim: fitToR2.anim,
          },
          {
            nom: "R2",
            value: this.value1,
            target: infitToR2.target,
            time: infitToR2.time,
            anim: infitToR2.anim,
          },
        ];
      } else if (this.register1 == "010") {
        return [
          {
            value: "POP",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
          {
            //////animation pf pop in MC
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: this.value1,
            target: MdrToBus.target,
            time: MdrToBus.time,
            anim: MdrToBus.anim,
          },
          {
            value: "",
            target: MdrToReg.target,
            time: MdrToReg.time,
            anim: MdrToReg.anim,
          },
          {
            nom: "R3",
            value: this.value1,
            target: fitToR3.target,
            time: fitToR3.time,
            anim: fitToR3.anim,
          },
          {
            nom: "R3",
            value: this.value1,
            target: infitToR3.target,
            time: infitToR3.time,
            anim: infitToR3.anim,
          },
        ];
      } else if (this.register1 == "011") {
        return [
          {
            value: "POP",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
          {
            //////animation pf pop in MC
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: this.value1,
            target: MdrToBus.target,
            time: MdrToBus.time,
            anim: MdrToBus.anim,
          },
          {
            value: "",
            target: MdrToReg.target,
            time: MdrToReg.time,
            anim: MdrToReg.anim,
          },
          {
            nom: "R4",
            value: this.value1,
            target: fitToR4.target,
            time: fitToR4.time,
            anim: fitToR4.anim,
          },
          {
            nom: "R4",
            value: this.value1,
            target: infitToR4.target,
            time: infitToR4.time,
            anim: infitToR4.anim,
          },
          //push animation
        ];
      } else if (this.register1 == "100") {
        return [
          {
            value: "POP",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
          {
            //////animation pf pop in MC
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: this.value1,
            target: MdrToBus.target,
            time: MdrToBus.time,
            anim: MdrToBus.anim,
          },
          {
            value: "",
            target: MDRToAcc.target,
            time: MDRToAcc.time,
            anim: MDRToAcc.anim,
          },
          {
            value: "",
            target: BusToAcc.target,
            time: BusToAcc.time,
            anim: BusToAcc.anim,
          },
          {
            nom: "ACC",
            value: this.value1,
            target: fitToAcc.target,
            time: fitToAcc.time,
            anim: fitToAcc.anim,
          },
          {
            nom: "ACC",
            value: this.value1,
            target: infitToAcc.target,
            time: infitToAcc.time,
            anim: infitToAcc.anim,
          },
          //push animation
        ];
      } else if (this.register1 == "101") {
        return [
          {
            value: "POP",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
          {
            //////animation pf pop in MC
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: this.value1,
            target: MdrToBus.target,
            time: MdrToBus.time,
            anim: MdrToBus.anim,
          },
          {
            value: "",
            target: MdrToReg.target,
            time: MdrToReg.time,
            anim: MdrToReg.anim,
          },
          {
            nom: "BR",
            value: this.value1,
            target: fitToBr.target,
            time: fitToBr.time,
            anim: fitToBr.anim,
          },
          {
            nom: "BR",
            value: this.value1,
            target: infitToBr.target,
            time: infitToBr.time,
            anim: infitToBr.anim,
          },
          //push animation
        ];
      } else if (this.register1 == "110") {
        return [
          {
            value: "POP",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
          {
            //////animation of pop in MC
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: this.value1,
            target: MdrToBus.target,
            time: MdrToBus.time,
            anim: MdrToBus.anim,
          },
          {
            value: "",
            target: MdrToReg.target,
            time: MdrToReg.time,
            anim: MdrToReg.anim,
          },
          {
            nom: "IDR",
            value: this.value1,
            target: fitToIdr.target,
            time: fitToIdr.time,
            anim: fitToIdr.anim,
          },
          {
            nom: "IDR",
            value: this.value1,
            target: infitToIdr.target,
            time: infitToIdr.time,
            anim: infitToIdr.anim,
          },
          //push animation
        ];
      } else if (this.register1 == "111") {
        return [
          {
            value: "POP",
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
          {
            //////animation pf pop in MC
            value: this.value1,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: this.value1,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: this.value1,
            target: MdrToBus.target,
            time: MdrToBus.time,
            anim: MdrToBus.anim,
          },
          {
            value: "",
            target: MdrToReg.target,
            time: MdrToReg.time,
            anim: MdrToReg.anim,
          },
          {
            nom: "SR",
            value: this.value1,
            target: fitToSr.target,
            time: fitToSr.time,
            anim: fitToSr.anim,
          },
          {
            nom: "SR",
            value: this.value1,
            target: infitToSR.target,
            time: infitToSR.time,
            anim: infitToSR.anim,
          },
          //push animation
        ];
      }
    };
  }
}

class InstructionBR {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "BR";
    this.steps = [
      (animations) => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        pos = this.addresse1;
        IP.setvalue(Dec2bin(this.addresse1));
        queue.clear(animations);
        queue.fetchInstruction(animations, 0, 1, [], 0);
        queue.fetchInstruction(animations, 0, 0, [], 0);
        queue.fetchInstruction(animations, 1, 1, [], 0);
        queue.fetchInstruction(animations, 0, 0, [], 0);
        queue.fetchInstruction(animations, 2, 1, [], 0);
        queue.fetchInstruction(animations, 0, 0, [], 0);

        const line = getinst(this.addresse1);
        let i = line;
        let found = false;
        while (
          !found &&
          i < getcode().length &&
          !["STOP","BNE", "BE", "BRI", "BS", "BI", "BSE", "BIE", "RET"].includes(
            code2()[i][0]
          )
        ) {
          if (code2()[i][0] == "CALL") {
            found = true;
          }
          i++;
        }
        if (found) {
          pushadrs(getallLeng(getcode().slice(0, i)));
        }
      },
    ];
    this.buildanim = function () {
      return [];
    };
  }
}

class InstructionBE {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "BE";
    this.steps = [
      (animations) => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        if (Alu1.getFlags(0) === "1") {
          IP.setvalue(Dec2bin(this.addresse1));
          pos = this.addresse1;
          // console.log(`this is ip ${IP.getvalue()}`)
          /////we need to clear the queue from old instruction
          queue.clear(animations);
          queue.fetchInstruction(animations, 0, 1, [], 0);
          // console.log(`this is the queue ${queue.log()}`);
          queue.fetchInstruction(animations, 0, 0, [], 0);
          queue.fetchInstruction(animations, 1, 1, [], 0);
          queue.fetchInstruction(animations, 0, 0, [], 0);
          queue.fetchInstruction(animations, 2, 1, [], 0);
          queue.fetchInstruction(animations, 0, 0, [], 0);
        }
        const line = getinst(pos);

        let i = line;
        let found = false;
        while (
          !found &&
          i < getcode().length &&
          !["STOP","BNE", "BE", "BRI", "BS", "BI", "BSE", "BIE", "RET"].includes(
            code2()[i][0]
          )
        ) {
          if (code2()[i][0] == "CALL") {
            found = true;
          }
          i++;
        }
        if (found) {
          pushadrs(getallLeng(getcode().slice(0, i)));
        }

        /////we need to clear the queue from old instruction
      },
    ];
    this.buildanim = function () {
      return [];
    };
  }
}

class InstructionBNE {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "BNE";
    this.steps = [
      (animations) => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        if (Alu1.getFlags(0) === "0") {
          pos = this.addresse1;
          IP.setvalue(Dec2bin(this.addresse1));
          // console.log(`this is ip ${IP.getvalue()}`)
          /////we need to clear the queue from old instruction
          queue.clear(animations);
          queue.fetchInstruction(animations, 0, 1, [], 0);
          // console.log(`this is the queue ${queue.log()}`);
          queue.fetchInstruction(animations, 0, 0, [], 0);
          queue.fetchInstruction(animations, 1, 1, [], 0);
          queue.fetchInstruction(animations, 0, 0, [], 0);
          queue.fetchInstruction(animations, 2, 1, [], 0);
          queue.fetchInstruction(animations, 0, 0, [], 0);
        }
        const line = getinst(this.addresse1);
        let i = line;
        let found = false;
        while (
          !found &&
          i < getcode().length &&
          !["STOP","BNE", "BE", "BRI", "BS", "BI", "BSE", "BIE", "RET"].includes(
            code2()[i][0]
          )
        ) {
          if (code2()[i][0] == "CALL") {
            found = true;
          }
          i++;
        }
        if (found) {
          pushadrs(getallLeng(getcode().slice(0, i)));
        }

        /////we need to clear the queue from old instruction
      },
    ];
    this.buildanim = function () {
      return [];
    };
  }
}

class InstructionBS {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "BS";
    this.steps = [
      (animations) => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        if (Alu1.Acc.getvalue().toString().charAt(0) == "0") {
          pos = this.addresse1;
          IP.setvalue(Dec2bin(this.addresse1));
          // console.log(`this is ip ${IP.getvalue()}`)
          /////we need to clear the queue from old instruction
          queue.clear(animations);
          queue.fetchInstruction(animations, 0, 1, [], 0);
          // console.log(`this is the queue ${queue.log()}`);
          queue.fetchInstruction(animations, 0, 0, [], 0);
          queue.fetchInstruction(animations, 1, 1, [], 0);
          queue.fetchInstruction(animations, 0, 0, [], 0);
          queue.fetchInstruction(animations, 2, 1, [], 0);
          queue.fetchInstruction(animations, 0, 0, [], 0);
        }
        const line = getinst(this.addresse1);
        let i = line;
        let found = false;
        while (
          !found &&
          i < getcode().length &&
          !["STOP","BNE", "BE", "BRI", "BS", "BI", "BSE", "BIE", "RET"].includes(
            code2()[i][0]
          )
        ) {
          if (code2()[i][0] == "CALL") {
            found = true;
          }
          i++;
        }
        if (found) {
          pushadrs(getallLeng(getcode().slice(0, i)));
        }

        /////we need to clear the queue from old instruction
      },
    ];
    this.buildanim = function () {
      return [];
    };
  }
}

class InstructionBI {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "BI";
    this.steps = [
      (animations) => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        if (Alu1.Acc.getvalue().toString().charAt(0) === "1") {
          pos = this.addresse1;
          IP.setvalue(Dec2bin(this.addresse1));
          // console.log(`this is ip ${IP.getvalue()}`)
          /////we need to clear the queue from old instruction
          queue.clear(animations);
          queue.fetchInstruction(animations, 0, 1, [], 0);
          // console.log(`this is the queue ${queue.log()}`);
          queue.fetchInstruction(animations, 0, 0, [], 0);
          queue.fetchInstruction(animations, 1, 1, [], 0);
          queue.fetchInstruction(animations, 0, 0, [], 0);
          queue.fetchInstruction(animations, 2, 1, [], 0);
          queue.fetchInstruction(animations, 0, 0, [], 0);
        }
        const line = getinst(this.addresse1);
        let i = line;
        let found = false;
        while (
          !found &&
          i < getcode().length &&
          !["STOP","BNE", "BE", "BRI", "BS", "BI", "BSE", "BIE", "RET"].includes(
            code2()[i][0]
          )
        ) {
          if (code2()[i][0] == "CALL") {
            found = true;
          }
          i++;
        }
        if (found) {
          pushadrs(getallLeng(getcode().slice(0, i)));
        }

        /////we need to clear the queue from old instruction
      },
    ];
    this.buildanim = function () {
      return [];
    };
  }
}

class InstructionBIE {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "BIE";
    this.steps = [
      (animations) => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        if (
          (Alu1.Acc.getvalue().toString().charAt(0) === "1") |
          (Alu1.getFlags(0) === "1")
        ) {
          pos = this.addresse1;
          IP.setvalue(Dec2bin(this.addresse1));
          // console.log(`this is ip ${IP.getvalue()}`)
          /////we need to clear the queue from old instruction
          queue.clear(animations);
          queue.fetchInstruction(animations, 0, 1, [], 0);
          // console.log(`this is the queue ${queue.log()}`);
          queue.fetchInstruction(animations, 0, 0, [], 0);
          queue.fetchInstruction(animations, 1, 1, [], 0);
          queue.fetchInstruction(animations, 0, 0, [], 0);
          queue.fetchInstruction(animations, 2, 1, [], 0);
          queue.fetchInstruction(animations, 0, 0, [], 0);
        }
        const line = getinst(this.addresse1);
        let i = line;
        let found = false;
        while (
          !found &&
          i < getcode().length &&
          !["STOP","BNE", "BE", "BRI", "BS", "BI", "BSE", "BIE", "RET"].includes(
            code2()[i][0]
          )
        ) {
          if (code2()[i][0] == "CALL") {
            found = true;
          }
          i++;
        }
        if (found) {
          pushadrs(getallLeng(getcode().slice(0, i)));
        }

        /////we need to clear the queue from old instruction
      },
    ];
    this.buildanim = function () {
      return [];
    };
  }
}

class InstructionBSE {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "BSE";
    this.steps = [
      (animations) => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        if (
          (Alu1.Acc.getvalue().toString().charAt(0) === "0") |
          (Alu1.getFlags(0) === "1")
        ) {
          pos = this.addresse1;
          IP.setvalue(Dec2bin(this.addresse1));
          // console.log(`this is ip ${IP.getvalue()}`)
          /////we need to clear the queue from old instruction
          queue.clear(animations);
          queue.fetchInstruction(animations, 0, 1, [], 0);
          // console.log(`this is the queue ${queue.log()}`);
          queue.fetchInstruction(animations, 0, 0, [], 0);
          queue.fetchInstruction(animations, 1, 1, [], 0);
          queue.fetchInstruction(animations, 0, 0, [], 0);
          queue.fetchInstruction(animations, 2, 1, [], 0);
          queue.fetchInstruction(animations, 0, 0, [], 0);
        }
        const line = getinst(this.addresse1);
        let i = line;
        let found = false;
        while (
          !found &&
          i < getcode().length &&
          !["STOP","BNE", "BE", "BRI", "BS", "BI", "BSE", "BIE", "RET"].includes(
            code2()[i][0]
          )
        ) {
          if (code2()[i][0] == "CALL") {
            found = true;
          }
          i++;
        }
        if (found) {
          pushadrs(getallLeng(getcode().slice(0, i)));
        }
        /////we need to clear the queue from old instruction
      },
    ];
    this.buildanim = function () {
      return [];
    };
  }
}

class InstructionSHL {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "SHL";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // let res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.SHL(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.SHL(16);
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "SHL",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}

class InstructionSHR {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "SHR";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // let res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.SHR(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.SHR(16);
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "SHR",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}

class InstructionROR {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "ROR";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // let res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.ROR(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.ROR(16);
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "ROR",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}

class InstructionROL {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "ROL";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // let res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.ROL(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.ROL(16);
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "ROL",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}

class InstructionNOT {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "NOT";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // let res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.NOT(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.NOT(16);
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "NOT",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}

class InstructionNEG {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "NEG";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        // let res=this.value1+this.value2;
        // Registers[4].setvalue(res.toString(2));
        if (this.taille === 0) {
          Alu1.Rual1.setright(TwosComplement(this.value1, 8));
          Alu1.NEG(8);
        } else {
          Alu1.Rual1.setvalue(TwosComplement(this.value1, 16));
          Alu1.NEG(16);
        }
        return Alu1.Acc.getvalue();
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      return [
        {
          value: "NEG",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          target: AluToAcc.target,
          time: AluToAcc.time,
          anim: AluToAcc.anim,
        },
        {
          nom: "ACC",
          value: "res",
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[4] === "1" ? "1-PAIRIMPAIR" : "0-PAIRIMPAIR",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}

class InstructionPUSHA {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "PUSHA";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        memory.setRim(binaryToHex(Registers[0].getvalue()).slice(0, 2));
        memory.pushval();
        {
          memory.setRim(binaryToHex(Registers[0].getvalue()).slice(-2));
        }
        memory.pushval();
        memory.setRim(binaryToHex(Registers[1].getvalue()).slice(0, 2));
        memory.pushval();
        {
          memory.setRim(binaryToHex(Registers[1].getvalue()).slice(-2));
        }
        memory.pushval();
        memory.setRim(binaryToHex(Registers[2].getvalue()).slice(0, 2));
        memory.pushval();
        {
          memory.setRim(binaryToHex(Registers[2].getvalue()).slice(-2));
        }
        memory.pushval();
        memory.setRim(binaryToHex(Registers[3].getvalue()).slice(0, 2));
        memory.pushval();
        {
          memory.setRim(binaryToHex(Registers[3].getvalue()).slice(-2));
        }
        memory.pushval();
        memory.setRim(binaryToHex(Registers[4].getvalue()).slice(0, 2));
        memory.pushval();
        {
          memory.setRim(binaryToHex(Registers[4].getvalue()).slice(-2));
        }
        memory.pushval();
        memory.setRim(binaryToHex(Registers[5].getvalue()).slice(0, 2));
        memory.pushval();
        {
          memory.setRim(binaryToHex(Registers[5].getvalue()).slice(-2));
        }
        memory.pushval();
        memory.setRim(binaryToHex(Registers[6].getvalue()).slice(0, 2));
        memory.pushval();
        {
          memory.setRim(binaryToHex(Registers[6].getvalue()).slice(-2));
        }
        memory.pushval();
        memory.setRim(binaryToHex(Registers[7].getvalue()).slice(0, 2));
        memory.pushval();
        {
          memory.setRim(binaryToHex(Registers[7].getvalue()).slice(-2));
        }
        memory.pushval();
      },
    ];
    this.buildanim = function () {
      return [
        {
          nom: "R1",
          value: this.value1,
          target: fitToR1.target,
          time: fitToR1.time,
          anim: fitToR1.anim,
        },
        {
          nom: "R1",
          value: this.value1,
          target: infitToR1.target,
          time: infitToR1.time,
          anim: infitToR1.anim,
        },
        {
          value: this.value1,
          target: RegToMdr.target,
          time: RegToMdr.time,
          anim: RegToMdr.anim,
        },
        {
          value: "",
          target: BusToMdr.target,
          time: BusToMdr.time,
          anim: BusToMdr.anim,
        },
        {
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: "PUSH",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          nom: "R2",
          value: this.value1,
          target: fitToR2.target,
          time: fitToR2.time,
          anim: fitToR2.anim,
        },
        {
          nom: "R2",
          value: this.value1,
          target: infitToR2.target,
          time: infitToR2.time,
          anim: infitToR2.anim,
        },
        {
          value: this.value1,
          target: RegToMdr.target,
          time: RegToMdr.time,
          anim: RegToMdr.anim,
        },
        {
          value: "",
          target: BusToMdr.target,
          time: BusToMdr.time,
          anim: BusToMdr.anim,
        },
        {
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: "PUSH",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          nom: "R3",
          value: this.value1,
          target: fitToR3.target,
          time: fitToR3.time,
          anim: fitToR3.anim,
        },
        {
          nom: "R3",
          value: this.value1,
          target: infitToR3.target,
          time: infitToR3.time,
          anim: infitToR3.anim,
        },
        {
          value: this.value1,
          target: RegToMdr.target,
          time: RegToMdr.time,
          anim: RegToMdr.anim,
        },
        {
          value: "",
          target: BusToMdr.target,
          time: BusToMdr.time,
          anim: BusToMdr.anim,
        },
        {
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: "PUSH",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          nom: "R4",
          value: this.value1,
          target: fitToR4.target,
          time: fitToR4.time,
          anim: fitToR4.anim,
        },
        {
          nom: "R4",
          value: this.value1,
          target: infitToR4.target,
          time: infitToR4.time,
          anim: infitToR4.anim,
        },
        {
          value: this.value1,
          target: RegToMdr.target,
          time: RegToMdr.time,
          anim: RegToMdr.anim,
        },
        {
          value: "",
          target: BusToMdr.target,
          time: BusToMdr.time,
          anim: BusToMdr.anim,
        },
        {
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: "PUSH",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          nom: "ACC",
          value: this.value1,
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          nom: "ACC",
          value: this.value1,
          target: infitToAcc.target,
          time: infitToAcc.time,
          anim: infitToAcc.anim,
        },
        {
          value: this.value1,
          target: AccToBus.target,
          time: AccToBus.time,
          anim: AccToBus.anim,
        },
        {
          value: this.value1,
          target: AccToMDR.target,
          time: AccToMDR.time,
          anim: AccToMDR.anim,
        },
        {
          value: "",
          target: BusToMdr.target,
          time: BusToMdr.time,
          anim: BusToMdr.anim,
        },
        {
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: "PUSH",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          nom: "BR",
          value: this.value1,
          target: fitToBr.target,
          time: fitToBr.time,
          anim: fitToBr.anim,
        },
        {
          nom: "BR",
          value: this.value1,
          target: infitToBr.target,
          time: infitToBr.time,
          anim: infitToBr.anim,
        },
        {
          value: this.value1,
          target: RegToMdr.target,
          time: RegToMdr.time,
          anim: RegToMdr.anim,
        },
        {
          value: "",
          target: BusToMdr.target,
          time: BusToMdr.time,
          anim: BusToMdr.anim,
        },
        {
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: "PUSH",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          nom: "IDR",
          value: this.value1,
          target: fitToIdr.target,
          time: fitToIdr.time,
          anim: fitToIdr.anim,
        },
        {
          nom: "IDR",
          value: this.value1,
          target: infitToIdr.target,
          time: infitToIdr.time,
          anim: infitToIdr.anim,
        },
        {
          value: this.value1,
          target: RegToMdr.target,
          time: RegToMdr.time,
          anim: RegToMdr.anim,
        },
        {
          value: "",
          target: BusToMdr.target,
          time: BusToMdr.time,
          anim: BusToMdr.anim,
        },
        {
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: "PUSH",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          nom: "SR",
          value: this.value1,
          target: fitToSr.target,
          time: fitToSr.time,
          anim: fitToSr.anim,
        },
        {
          nom: "SR",
          value: this.value1,
          target: infitToSR.target,
          time: infitToSR.time,
          anim: infitToSR.anim,
        },
        {
          value: this.value1,
          target: RegToMdr.target,
          time: RegToMdr.time,
          anim: RegToMdr.anim,
        },
        {
          value: "",
          target: BusToMdr.target,
          time: BusToMdr.time,
          anim: BusToMdr.anim,
        },
        {
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: "PUSH",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
      ];
    };
  }
}

class InstructionPOPA {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "POPA";
    let reg;
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        memory.popval();
        reg = memory.getRim();
        memory.popval();
        reg = memory.getRim() + reg;
        Registers[7].setvalue(hex2bin(reg));
        memory.popval();
        reg = memory.getRim();
        memory.popval();
        reg = memory.getRim() + reg;
        Registers[6].setvalue(hex2bin(reg));
        memory.popval();
        reg = memory.getRim();
        memory.popval();
        reg = memory.getRim() + reg;
        Registers[5].setvalue(hex2bin(reg));
        memory.popval();
        reg = memory.getRim();
        memory.popval();
        reg = memory.getRim() + reg;
        Registers[4].setvalue(hex2bin(reg));
        memory.popval();
        reg = memory.getRim();
        memory.popval();
        reg = memory.getRim() + reg;
        Registers[3].setvalue(hex2bin(reg));
        memory.popval();
        reg = memory.getRim();
        memory.popval();
        reg = memory.getRim() + reg;
        Registers[2].setvalue(hex2bin(reg));
        memory.popval();
        reg = memory.getRim();
        memory.popval();
        reg = memory.getRim() + reg;
        Registers[1].setvalue(hex2bin(reg));
        memory.popval();
        reg = memory.getRim();
        memory.popval();
        reg = memory.getRim() + reg;
        Registers[0].setvalue(hex2bin(reg));
      },
    ];
    this.buildanim = function () {
      return [
        {
          value: "POP",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: this.value1,
          target: MdrToBus.target,
          time: MdrToBus.time,
          anim: MdrToBus.anim,
        },
        {
          value: "",
          target: MdrToReg.target,
          time: MdrToReg.time,
          anim: MdrToReg.anim,
        },
        {
          nom: "R1",
          value: this.value1,
          target: fitToR1.target,
          time: fitToR1.time,
          anim: fitToR1.anim,
        },
        {
          nom: "R1",
          value: this.value1,
          target: infitToR1.target,
          time: infitToR1.time,
          anim: infitToR1.anim,
        },
        {
          value: "POP",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          //////animation of pop in MC
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: this.value1,
          target: MdrToBus.target,
          time: MdrToBus.time,
          anim: MdrToBus.anim,
        },
        {
          value: "",
          target: MdrToReg.target,
          time: MdrToReg.time,
          anim: MdrToReg.anim,
        },
        {
          nom: "R2",
          value: this.value1,
          target: fitToR2.target,
          time: fitToR2.time,
          anim: fitToR2.anim,
        },
        {
          nom: "R2",
          value: this.value1,
          target: infitToR2.target,
          time: infitToR2.time,
          anim: infitToR2.anim,
        },
        {
          value: "POP",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          //////animation pf pop in MC
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: this.value1,
          target: MdrToBus.target,
          time: MdrToBus.time,
          anim: MdrToBus.anim,
        },
        {
          value: "",
          target: MdrToReg.target,
          time: MdrToReg.time,
          anim: MdrToReg.anim,
        },
        {
          nom: "R3",
          value: this.value1,
          target: fitToR3.target,
          time: fitToR3.time,
          anim: fitToR3.anim,
        },
        {
          nom: "R3",
          value: this.value1,
          target: infitToR3.target,
          time: infitToR3.time,
          anim: infitToR3.anim,
        },
        {
          value: "POP",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          //////animation pf pop in MC
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: this.value1,
          target: MdrToBus.target,
          time: MdrToBus.time,
          anim: MdrToBus.anim,
        },
        {
          value: "",
          target: MdrToReg.target,
          time: MdrToReg.time,
          anim: MdrToReg.anim,
        },
        {
          nom: "R4",
          value: this.value1,
          target: fitToR4.target,
          time: fitToR4.time,
          anim: fitToR4.anim,
        },
        {
          nom: "R4",
          value: this.value1,
          target: infitToR4.target,
          time: infitToR4.time,
          anim: infitToR4.anim,
        },
        {
          value: "POP",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          //////animation pf pop in MC
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: this.value1,
          target: MdrToBus.target,
          time: MdrToBus.time,
          anim: MdrToBus.anim,
        },
        {
          value: "",
          target: MDRToAcc.target,
          time: MDRToAcc.time,
          anim: MDRToAcc.anim,
        },
        {
          value: "",
          target: BusToAcc.target,
          time: BusToAcc.time,
          anim: BusToAcc.anim,
        },
        {
          nom: "ACC",
          value: this.value1,
          target: fitToAcc.target,
          time: fitToAcc.time,
          anim: fitToAcc.anim,
        },
        {
          nom: "ACC",
          value: this.value1,
          target: infitToAcc.target,
          time: infitToAcc.time,
          anim: infitToAcc.anim,
        },
        {
          value: "POP",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          //////animation pf pop in MC
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: this.value1,
          target: MdrToBus.target,
          time: MdrToBus.time,
          anim: MdrToBus.anim,
        },
        {
          value: "",
          target: MdrToReg.target,
          time: MdrToReg.time,
          anim: MdrToReg.anim,
        },
        {
          nom: "BR",
          value: this.value1,
          target: fitToBr.target,
          time: fitToBr.time,
          anim: fitToBr.anim,
        },
        {
          nom: "BR",
          value: this.value1,
          target: infitToBr.target,
          time: infitToBr.time,
          anim: infitToBr.anim,
        },
        {
          value: "POP",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          //////animation of pop in MC
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: this.value1,
          target: MdrToBus.target,
          time: MdrToBus.time,
          anim: MdrToBus.anim,
        },
        {
          value: "",
          target: MdrToReg.target,
          time: MdrToReg.time,
          anim: MdrToReg.anim,
        },
        {
          nom: "IDR",
          value: this.value1,
          target: fitToIdr.target,
          time: fitToIdr.time,
          anim: fitToIdr.anim,
        },
        {
          nom: "IDR",
          value: this.value1,
          target: infitToIdr.target,
          time: infitToIdr.time,
          anim: infitToIdr.anim,
        },
        {
          value: "POP",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          //////animation pf pop in MC
          value: this.value1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.value1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: this.value1,
          target: MdrToBus.target,
          time: MdrToBus.time,
          anim: MdrToBus.anim,
        },
        {
          value: "",
          target: MdrToReg.target,
          time: MdrToReg.time,
          anim: MdrToReg.anim,
        },
        {
          nom: "SR",
          value: this.value1,
          target: fitToSr.target,
          time: fitToSr.time,
          anim: fitToSr.anim,
        },
        {
          nom: "SR",
          value: this.value1,
          target: infitToSR.target,
          time: infitToSR.time,
          anim: infitToSR.anim,
        },
      ];
    };
  }
}

class InstructionREAD {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "RD";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);

        Alu1.Flags[7] = "1";

        let chr = this.value1.charCodeAt(0);

        ioUnit.buffer.setvalue("0".repeat(8) + Dec2bin(chr));

        Registers[3].setvalue(ioUnit.getBuffer());
        Alu1.Flags[7] = "0";
      },
    ];

    this.buildanim = function () {
      return [
        {
          value: this.value1,
          flag: "IO",
          target: fitToIO.target,
          time: fitToIO.time,
          anim: fitToIO.anim,
        },
        {
          value: this.value1,
          target: infitToIO.target,
          time: infitToIO.time,
          anim: infitToIO.anim,
        },
        {
          value: "",
          target: BufferToBus.target,
          time: BufferToBus.time,
          anim: BufferToBus.anim,
        },
        {
          value: this.value2,
          target: IOToBus.target,
          time: IOToBus.time,
          anim: IOToBus.anim,
        },
        {
          nom: "R4",
          value: this.value2,
          target: fitToR4.target,
          time: fitToR4.time,
          anim: fitToR4.anim,
        },
        {
          nom: "R4",
          flag: "END-IO",
          value: this.value2,
          target: infitToR4.target,
          time: infitToR4.time,
          anim: infitToR4.anim,
        },
      ];
    };
  }
}
let txt = "";
class InstructionWRITE {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "WRT";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);

        Alu1.Flags[7] = "1";

        ioUnit.buffer.setvalue(Registers[3].getvalue());
        let chr = ioUnit.buffer.getvalue();
        const result = String.fromCharCode(parseInt(chr, 2));
        txt += result;
        settext(txt);
        Alu1.Flags[7] = "0";
      },
    ];
    this.buildanim = function () {
      return [
        {
          nom: "R4",
          flag: "IO",
          value: this.value2,
          target: fitToR4.target,
          time: fitToR4.time,
          anim: fitToR4.anim,
        },
        {
          nom: "R4",
          value: this.value2,
          target: infitToR4.target,
          time: infitToR4.time,
          anim: infitToR4.anim,
        },
        {
          value: this.value2,
          target: BusToIO.target,
          time: BusToIO.time,
          anim: BusToIO.anim,
        },
        {
          value: "",
          target: BusToBuffer.target,
          time: BusToBuffer.time,
          anim: BusToBuffer.anim,
        },
        {
          value: this.value1,
          target: fitToIO.target,
          time: fitToIO.time,
          anim: fitToIO.anim,
        },
        {
          value: this.value1,
          flag: "END-IO",
          target: infitToIO.target,
          time: infitToIO.time,
          anim: infitToIO.anim,
        },
      ];
    };
  }
}

class InstructionREADS {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "RDS";
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);

        Alu1.Flags[7] = "1";

        let string = this.value1;
        let address = this.addresse1;
        ioUnit.ioController.setMAR(Dec2bin(address));
        ioUnit.ioController.setCC(0);
        let i = 0;
        while (string[i]) {
          ioUnit.buffer.setvalue(
            Dec2bin(string[i].charCodeAt(0)).padStart(16, "0")
          );
          memory.setRim(Bin16ToHexaLow(ioUnit.buffer.getvalue()));
          memory.setRam(Dec2bin(address));
          memory.write(); //write in both MC and Cache
          address++;
          memory.setRim(Bin16ToHexaHigh(ioUnit.buffer.getvalue()));
          memory.setRam(Dec2bin(address));
          memory.write(); //write in both MC and Cache
          i++;
          address++;
          ioUnit.ioController.CC++;
        }
        Alu1.Flags[7] = "0";
        ioUnit.ioController.setCC(0);
      },
    ];
    this.buildanim = function () {
      let animationSteps = [
        {
          value: "",
          flag: "IO",
          nom: "QueueToIr",
          target: queueExitToBus2.target,
          time: queueExitToBus2.time,
          anim: () => {},
        },
        {
          value: "",
          nom: "queueExitToBus",
          target: queueExitToBus.target,
          time: queueExitToBus.time,
          anim: queueExitToBus.anim,
        },
        {
          value: this.addresse1,
          target: QueueToIO.target,
          time: QueueToIO.time,
          anim: QueueToIO.anim,
        },
        {
          value: "",
          target: BusToBuffer.target,
          time: BusToBuffer.time,
          anim: BusToBuffer.anim,
        },
        {
          value: this.addresse1,
          target: fitToIO.target,
          time: fitToIO.time,
          anim: fitToIO.anim,
        },
        {
          value: this.addresse1,
          target: infitToIO.target,
          time: infitToIO.time,
          anim: infitToIO.anim,
        },
      ];
      let animationSubSteps = [];
      let string = this.value1;
      let address = this.addresse1;
      let i = 0;
      let char = "";
      while (string[i]) {
        char = string[i];
        const ascii = parseInt(char.charCodeAt(0)).toString(16) + "h";
        animationSubSteps = [
          {
            value: char,
            target: fitToIO.target,
            time: fitToIO.time,
            anim: fitToIO.anim,
          },
          {
            value: char,
            target: infitToIO.target,
            time: infitToIO.time,
            anim: infitToIO.anim,
          },
          {
            value: "",
            target: BufferToBus.target,
            time: BufferToBus.time,
            anim: BufferToBus.anim,
          },
          {
            value: "00" + ascii,
            target: IOToCache.target,
            time: IOToCache.time,
            anim: IOToCache.anim,
          },
          {
            value: "",
            target: BusToCache.target,
            time: BusToCache.time,
            anim: BusToCache.anim,
          },
          {
            value: "00" + ascii,
            target: fitToCache.target,
            time: fitToCache.time,
            anim: fitToCache.anim,
          },
          {
            value: "00" + ascii,
            target: infitToCache.target,
            time: infitToCache.time,
            anim: infitToCache.anim,
          },
          {
            name: "cacheMem",
            value: "WRITE",
            target: Cacheanim.target,
            time: Cacheanim.time,
            anim: Cacheanim.anim,
          },

          {
            value: "00" + ascii,
            target: IOToMdr.target,
            time: IOToMdr.time,
            anim: IOToMdr.anim,
          },
          {
            value: "",
            target: BusToMdr.target,
            time: BusToMdr.time,
            anim: BusToMdr.anim,
          },
          {
            value: "00" + ascii,
            target: fitToMdr.target,
            time: fitToMdr.time,
            anim: fitToMdr.anim,
          },
          {
            value: "00" + ascii,
            target: infitToMdr.target,
            time: infitToMdr.time,
            anim: infitToMdr.anim,
          },
          {
            value: address,
            target: fitToIO.target,
            time: fitToIO.time,
            anim: fitToIO.anim,
          },
          {
            value: address,
            target: infitToIO.target,
            time: infitToIO.time,
            anim: infitToIO.anim,
          },
          {
            value: "",
            target: BufferToBus.target,
            time: BufferToBus.time,
            anim: BufferToBus.anim,
          },
          {
            value: address,
            target: IOToUnderIP.target,
            time: IOToUnderIP.time,
            anim: IOToUnderIP.anim,
          },
          {
            value: "",
            target: UnderIpToAddBus.target,
            time: UnderIpToAddBus.time,
            anim: UnderIpToAddBus.anim,
          },
          {
            value: address,
            target: UnderIPToMar.target,
            time: UnderIPToMar.time,
            anim: UnderIPToMar.anim,
          },
          {
            value: address,
            target: fitToMar.target,
            time: fitToMar.time,
            anim: fitToMar.anim,
          },
          {
            value: address,
            target: infitToMar.target,
            time: infitToMar.time,
            anim: infitToMar.anim,
          },
          {
            name: "mainMem",
            value: "WRITE",
            address: address,
            content: "00" + ascii,
            target: MCanim.target,
            time: MCanim.time,
            anim: MCanim.anim,
          },
        ];
        animationSteps.push.apply(animationSteps, animationSubSteps);
        address++;
        address++;
        i++;
      }
      animationSteps.push({
        flag: "END-IO",
        target: "",
        time: 0,
        anim: () => {},
      });
      return animationSteps;
    };
  }
}

class InstructionWRITES {
  constructor() {
    this.value1 = "";
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.name = "WRTS";

    // Core steps remain unchanged, animation logic adapts dynamically
    this.steps = [
      () => {
        pos += getInstLeng(getcode()[getinst(pos)]);
        Alu1.Flags[7] = "1";
        let adr = this.addresse1;
        ioUnit.ioController.setMAR(Dec2bin(adr));
        ioUnit.ioController.setCC(0);
        let result = "";
        let char = "";
        let ascii = "";
        let count = 0;

        while (char !== "$" && count < 256) {
          memory.setRam(Dec2bin(adr));
          memory.read(false);
          ascii = memory.getRim();
          adr++;
          memory.setRam(Dec2bin(adr));
          memory.read(false);
          ascii = memory.getRim() + ascii;
          ioUnit.buffer.setvalue(hex2bin(ascii));
          char = String.fromCharCode(parseInt(ioUnit.buffer.getvalue(), 2));

          if (char !== "$") {
            result += char;
          }
          adr++;
          count++;
          ioUnit.ioController.CC++;
        }
        txt += result;
        Alu1.Flags[7] = "0";
        ioUnit.ioController.setCC(0);
        settext(txt);
      },
    ];

    // Cache-aware animation logic
    this.buildanim = function () {
      let animationSteps = [
        {
          value: "",
          flag: "IO",
          nom: "QueueToIr",
          target: queueExitToBus2.target,
          time: queueExitToBus2.time,
          anim: () => {},
        },
        {
          value: "",
          nom: "queueExitToBus",
          target: queueExitToBus.target,
          time: queueExitToBus.time,
          anim: queueExitToBus.anim,
        },
        {
          value: this.addresse1,
          target: QueueToIO.target,
          time: QueueToIO.time,
          anim: QueueToIO.anim,
        },
        {
          value: "",
          target: BusToBuffer.target,
          time: BusToBuffer.time,
          anim: BusToBuffer.anim,
        },
        {
          value: this.addresse1,
          target: fitToIO.target,
          time: fitToIO.time,
          anim: fitToIO.anim,
        },
        {
          value: this.addresse1,
          target: infitToIO.target,
          time: infitToIO.time,
          anim: infitToIO.anim,
        },
      ];

      let string = this.value1;
      let address = this.addresse1;
      let i = 0;

      while (string[i]) {
        const char = string[i];
        const ascii = parseInt(char.charCodeAt(0)).toString(16) + "h";

        // Check if data exists in cache
        let cachedData = memory.cache.get(address);

        if (cachedData) {
          animationSteps.push(
            {
              value: address,
              target: fitToIO.target,
              time: fitToIO.time,
              anim: fitToIO.anim,
            },
            {
              value: address,
              target: infitToIO.target,
              time: infitToIO.time,
              anim: infitToIO.anim,
            },
            {
              value: "",
              target: BufferToBus.target,
              time: BufferToBus.time,
              anim: BufferToBus.anim,
            },
            {
              value: address,
              target: IOToCache.target,
              time: IOToCache.time,
              anim: IOToCache.anim,
            },
            {
              value: "",
              target: BusToCache.target,
              time: BusToCache.time,
              anim: BusToCache.anim,
            },
            {
              value: address,
              target: fitToCache.target,
              time: fitToCache.time,
              anim: fitToCache.anim,
            },
            {
              value: address,
              target: infitToCache.target,
              time: infitToCache.time,
              anim: infitToCache.anim,
            },
            {
              value: "READ",
              target: Cacheanim.target,
              time: Cacheanim.time,
              anim: Cacheanim.anim,
            },
            {
              value: "",
              target: CacheToBus.target,
              time: CacheToBus.time,
              anim: CacheToBus.anim,
            },
            {
              value: char,
              target: BusCacheToIO.target,
              time: BusCacheToIO.time,
              anim: BusCacheToIO.anim,
            }
          );
        } else {
          console.log("Cache miss, accessing main memory and updating cache");
          memory.setRam(Dec2bin(address));
          memory.read(false); // Read from main memory and store in cache
          memory.cache.set(address, char);
          // Continue with main memory animation
          animationSteps.push(
            {
              value: address,
              target: fitToIO.target,
              time: fitToIO.time,
              anim: fitToIO.anim,
            },
            {
              value: address,
              target: infitToIO.target,
              time: infitToIO.time,
              anim: infitToIO.anim,
            },
            {
              value: "",
              target: BufferToBus.target,
              time: BufferToBus.time,
              anim: BufferToBus.anim,
            },

            {
              value: address,
              target: IOToUnderIP.target,
              time: IOToUnderIP.time,
              anim: IOToUnderIP.anim,
            },
            {
              value: "",
              target: UnderIpToAddBus.target,
              time: UnderIpToAddBus.time,
              anim: UnderIpToAddBus.anim,
            },
            {
              value: address,
              target: UnderIPToMar.target,
              time: UnderIPToMar.time,
              anim: UnderIPToMar.anim,
            },
            {
              value: address,
              target: fitToMar.target,
              time: fitToMar.time,
              anim: fitToMar.anim,
            },
            {
              value: address,
              target: infitToMar.target,
              time: infitToMar.time,
              anim: infitToMar.anim,
            },
            {
              value: "READ",
              target: MCanim.target,
              time: MCanim.time,
              anim: MCanim.anim,
            },
            {
              value: "00" + ascii,
              target: fitToMdr.target,
              time: fitToMdr.time,
              anim: fitToMdr.anim,
            },
            {
              value: "00" + ascii,
              target: infitToMdr.target,
              time: infitToMdr.time,
              anim: infitToMdr.anim,
            },
            {
              value: "",
              target: MdrToBus.target,
              time: MdrToBus.time,
              anim: MdrToBus.anim,
            },
            {
              value: "00" + ascii,
              target: MdrToIO.target,
              time: MdrToIO.time,
              anim: MdrToIO.anim,
            }
          );
        }

        // Continue with buffer and I/O animations after data fetch (either from cache or memory)
        animationSteps.push(
          {
            value: "",
            target: BusToBuffer.target,
            time: BusToBuffer.time,
            anim: BusToBuffer.anim,
          },
          {
            value: char,
            target: fitToIO.target,
            time: fitToIO.time,
            anim: fitToIO.anim,
          },
          {
            value: char,
            target: infitToIO.target,
            time: infitToIO.time,
            anim: infitToIO.anim,
          }
        );
        address++;
        address++;
        i++;
        i++;
      }
      animationSteps.push({
        flag: "END-IO",
        target: "",
        time: 0,
        anim: () => {},
      });
      return animationSteps;
    };
  }
}

class InstructionMOVS {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.isimmed = true;
    this.name = "MOVS";
    this.steps = [
      () => {
        memory.setRam(Registers[6].getvalue());
        memory.read(false);
        memory.setRim(memory.getRim());
        memory.setRam(Registers[5].getvalue());
        memory.write();
        Registers[6].setvalue(
          (parseInt(Registers[6].getvalue(), 2) + 2)
            .toString(2)
            .padStart(16, "0")
        );
        Registers[5].setvalue(
          (parseInt(Registers[5].getvalue(), 2) + 2)
            .toString(2)
            .padStart(16, "0")
        );
      },
    ];
    this.buildanim = function () {
      return [
        {
          nom: "IDR",
          value: this.value2,
          target: fitToIdr.target,
          time: fitToIdr.time,
          anim: fitToIdr.anim,
        },
        {
          nom: "IDR",
          value: this.value2,
          target: infitToIdr.target,
          time: infitToIdr.time,
          anim: infitToIdr.anim,
        },
        {
          value: this.value2,
          target: RegToUnderIP.target,
          time: RegToUnderIP.time,
          anim: RegToUnderIP.anim,
        },
        {
          value: "",
          target: UnderIpToAddBus.target,
          time: UnderIpToAddBus.time,
          anim: UnderIpToAddBus.anim,
        },
        {
          value: this.value2,
          target: UnderIPToMar.target,
          time: UnderIPToMar.time,
          anim: UnderIPToMar.anim,
        },
        {
          value: this.value2,
          target: fitToMar.target,
          time: fitToMar.time,
          anim: fitToMar.anim,
        },
        {
          value: this.value2,
          target: infitToMar.target,
          time: infitToMar.time,
          anim: infitToMar.anim,
        },
        {
          value: "READ",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          value: "00" + String(this.register2) + "h",
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: "00" + String(this.register2) + "h",
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          nom: "BR",
          value: this.value1,
          target: fitToBr.target,
          time: fitToBr.time,
          anim: fitToBr.anim,
        },
        {
          nom: "BR",
          value: this.value1,
          target: infitToBr.target,
          time: infitToBr.time,
          anim: infitToBr.anim,
        },
        {
          value: this.value1,
          target: RegToUnderIP.target,
          time: RegToUnderIP.time,
          anim: RegToUnderIP.anim,
        },
        {
          value: "",
          target: UnderIpToAddBus.target,
          time: UnderIpToAddBus.time,
          anim: UnderIpToAddBus.anim,
        },
        {
          value: this.value1,
          target: UnderIPToMar.target,
          time: UnderIPToMar.time,
          anim: UnderIPToMar.anim,
        },
        {
          value: this.value1,
          target: fitToMar.target,
          time: fitToMar.time,
          anim: fitToMar.anim,
        },
        {
          value: this.value1,
          target: infitToMar.target,
          time: infitToMar.time,
          anim: infitToMar.anim,
        },
        {
          name: "mainMem",
          value: "WRITE",
          taille: "taille",
          address: "addresse1",
          content: String(this.register2),
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
      ];
    };
  }
}

class InstructionLODS {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.isimmed = true;
    this.name = "LODS";
    this.steps = [
      () => {
        let res;
        memory.setRam(Registers[6].getvalue());
        memory.read(false);
        res = memory.getRim();
        Registers[3].setvalue(hex2bin(res));
        Registers[6].setvalue(
          (parseInt(Registers[6].getvalue(), 2) + 2)
            .toString(2)
            .padStart(16, "0")
        );
      },
    ];
    this.buildanim = function () {
      return [
        {
          nom: "IDR",
          value: this.value2,
          target: fitToIdr.target,
          time: fitToIdr.time,
          anim: fitToIdr.anim,
        },
        {
          nom: "IDR",
          value: this.value2,
          target: infitToIdr.target,
          time: infitToIdr.time,
          anim: infitToIdr.anim,
        },
        {
          value: this.value2,
          target: RegToUnderIP.target,
          time: RegToUnderIP.time,
          anim: RegToUnderIP.anim,
        },
        {
          value: "",
          target: UnderIpToAddBus.target,
          time: UnderIpToAddBus.time,
          anim: UnderIpToAddBus.anim,
        },
        {
          value: this.value2,
          target: UnderIPToMar.target,
          time: UnderIPToMar.time,
          anim: UnderIPToMar.anim,
        },
        {
          value: this.value2,
          target: fitToMar.target,
          time: fitToMar.time,
          anim: fitToMar.anim,
        },
        {
          value: this.value2,
          target: infitToMar.target,
          time: infitToMar.time,
          anim: infitToMar.anim,
        },
        {
          value: "READ",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          value: this.register1,
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: this.register1,
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: "",
          target: MdrToBus.target,
          time: MdrToBus.time,
          anim: MdrToBus.anim,
        },
        {
          value: this.register1,
          target: MdrToReg.target,
          time: MdrToReg.time,
          anim: MdrToReg.anim,
        },
        {
          nom: "R4",
          value: this.register1,
          target: fitToR4.target,
          time: fitToR4.time,
          anim: fitToR4.anim,
        },
        {
          nom: "R4",
          value: this.register1,
          target: infitToR4.target,
          time: infitToR4.time,
          anim: infitToR4.anim,
        },
      ];
    };
  }
}
class InstructionCMPS {
  constructor() {
    this.value1 = 0;
    this.value2 = 0;
    this.addresse1 = 0;
    this.register1 = 0;
    this.addresse2 = 0;
    this.register2 = 0;
    this.taille = 0;
    this.stepsNum = 1;
    this.isimmed = true;
    this.name = "CMPS";
    this.steps = [
      () => {
        let temp1;
        let temp2;
        let res;
        let res1;
        let i =0 ;
        let count = 0 ;
      
        memory.setRam(Registers[6].getvalue());
        memory.read(false);
        temp1 = memory.getRim();
        memory.setRam(Registers[5].getvalue());
        memory.read(false);
        temp2 = memory.getRim();
        
        res =temp1- temp2 ;
        res1 = res.toString();
        res1 = parseInt(res1, 16);

        let res2 = TwosComplement(res1,16);
      
        while( i< res2.length){
            if (res2[i] == "1") {
              count ++ ;
            }
            i++ ;
        }

        if(res == 0){
          Alu1.Flags[0] = "1";
        }
        if(res < 0){
          Alu1.Flags[1] = "1";
        }
        if (count%2 === 0){
          Alu1.Flags[3] = "1";
        }
        if(res%2 == 1){
          Alu1.Flags[4] = "1";
        }
      
        Registers[6].setvalue(
          (parseInt(Registers[6].getvalue(), 2) + 2)
            .toString(2)
            .padStart(16, "0")
        );
        Registers[5].setvalue(
          (parseInt(Registers[5].getvalue(), 2) + 2)
            .toString(2)
            .padStart(16, "0")
        );
        return {
          value1: temp1,
          value2: temp2
        }
      },
    ];
    this.buildanim = function () {
      const flags = Alu1.getAllFlags();
      const idrValue = parseInt(Registers[6].getvalue(), 2).toString(16);
      const brValue = parseInt(Registers[5].getvalue(), 2).toString(16);
      return [
        {
          nom: "IDR",
          value: idrValue.padStart(4, "0"),
          target: fitToIdr.target,
          time: fitToIdr.time,
          anim: fitToIdr.anim,
        },
        {
          nom: "IDR",
          value: idrValue.padStart(4, "0"),
          target: infitToIdr.target,
          time: infitToIdr.time,
          anim: infitToIdr.anim,
        },
        {
          value: idrValue.padStart(4, "0"),
          target: RegToUnderIP.target,
          time: RegToUnderIP.time,
          anim: RegToUnderIP.anim,
        },
        {
          value: "",
          target: UnderIpToAddBus.target,
          time: UnderIpToAddBus.time,
          anim: UnderIpToAddBus.anim,
        },
        {
          value: idrValue,
          target: UnderIPToMar.target,
          time: UnderIPToMar.time,
          anim: UnderIPToMar.anim,
        },
        {
          value: idrValue,
          target: fitToMar.target,
          time: fitToMar.time,
          anim: fitToMar.anim,
        },
        {
          value: idrValue,
          target: infitToMar.target,
          time: infitToMar.time,
          anim: infitToMar.anim,
        },
        {
          value: "READ",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          value: String(this.value1).padStart(4, "0"),
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: String(this.value1).padStart(4, "0"),
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: "",
          target: MdrToBus.target,
          time: MdrToBus.time,
          anim: MdrToBus.anim,
        },
        {
          value: String(this.value1).padStart(4, "0"),
          target: MdrToRual1.target,
          time: MdrToRual1.time,
          anim: MdrToRual1.anim,
        },
        {
          value: this.value1,
          target: fitToRual2.target,
          time: fitToRual2.time,
          anim: fitToRual2.anim,
        },
        {
          value: this.value1,
          target: infitToRual1.target,
          time: infitToRual1.time,
          anim: infitToRual1.anim,
        },
        {
          nom: "BR",
          value: brValue.padStart(4, "0"),
          target: fitToBr.target,
          time: fitToBr.time,
          anim: fitToBr.anim,
        },
        {
          nom: "BR",
          value: brValue.padStart(4, "0"),
          target: infitToBr.target,
          time: infitToBr.time,
          anim: infitToBr.anim,
        },
        {
          value: brValue.padStart(4, "0"),
          target: RegToUnderIP.target,
          time: RegToUnderIP.time,
          anim: RegToUnderIP.anim,
        },
        {
          value: "",
          target: UnderIpToAddBus.target,
          time: UnderIpToAddBus.time,
          anim: UnderIpToAddBus.anim,
        },
        {
          value: brValue,
          target: UnderIPToMar.target,
          time: UnderIPToMar.time,
          anim: UnderIPToMar.anim,
        },
        {
          value: brValue,
          target: fitToMar.target,
          time: fitToMar.time,
          anim: fitToMar.anim,
        },
        {
          value: brValue,
          target: infitToMar.target,
          time: infitToMar.time,
          anim: infitToMar.anim,
        },
        {
          value: "READ",
          target: MCanim.target,
          time: MCanim.time,
          anim: MCanim.anim,
        },
        {
          value: String(this.value2).padStart(4, "0"),
          target: fitToMdr.target,
          time: fitToMdr.time,
          anim: fitToMdr.anim,
        },
        {
          value: String(this.value2).padStart(4, "0"),
          target: infitToMdr.target,
          time: infitToMdr.time,
          anim: infitToMdr.anim,
        },
        {
          value: "",
          target: MdrToBus.target,
          time: MdrToBus.time,
          anim: MdrToBus.anim,
        },
        {
          value: String(this.value2).padStart(4, "0"),
          target: MdrToRual2.target,
          time: MdrToRual2.time,
          anim: MdrToRual2.anim,
        },
        {
          value: this.value2,
          target: fitToRual1.target,
          time: fitToRual1.time,
          anim: fitToRual1.anim,
        },
        {
          value: this.value2,
          target: infitToRual1.target,
          time: infitToRual1.time,
          anim: infitToRual1.anim,
        },
        {
          value: "CMPS",
          target: addanim.target,
          time: addanim.time,
          anim: addanim.anim,
        },
        {
          value: "",
          flag: flags[0] === "1" ? "1-ZERO" : "0-ZERO",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[1] === "1" ? "1-SIGN" : "0-SIGN",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[2] === "1" ? "1-CARRY" : "0-CARRY",
          target: "",
          time: 0,
          anim: () => {},
        },
        {
          value: "",
          flag: flags[3] === "1" ? "1-PARITY" : "0-PARITY",
          target: "",
          time: 0,
          anim: () => {},
        },
      ];
    };
  }
}

export {
  InstructionCMPS,
  InstructionLODS,
  InstructionMOVS,
  InstructionREADS,
  InstructionWRITES,
  InstructionCMP,
  InstructionREAD,
  InstructionWRITE,
  InstructionADD,
  InstructionMOV00,
  InstructionMOV01,
  InstructionMOV10,
  InstructionMOV11,
  InstructionSUB,
  InstructionMUL,
  InstructionDIV,
  InstructionBSE,
  InstructionBIE,
  InstructionBI,
  InstructionBS,
  InstructionBNE,
  InstructionBE,
  InstructionBR,
  InstructionPOP,
  InstructionPUSH,
  InstructionAND,
  InstructionOR,
  InstructionNAND,
  InstructionNOR,
  InstructionXOR,
  InstructionNEG,
  InstructionNOT,
  InstructionROL,
  InstructionROR,
  InstructionSHL,
  InstructionSHR,
  InstructionPOPA,
  InstructionPUSHA,
  InstructionRET,
  InstructionCALL,
};
