import "./style.css";
import { useState, useRef, useEffect } from "react";
import Archi2 from "../../assets/newarchi.png";
import gsap from "gsap";
import queuearrow from "../../assets/images/icons/fleche.png";
import { getSpeed, nsp } from "../../Emulator/speed.js";
import { components } from "react-select";
import { Registers, memory } from "../Ide";

//////////////////////////////////////

const decimalToBinary = (dec) => {
  return dec.toString(2).padStart(16, "0");
};

const decimalToHexa = (dec) => {
  return Number(dec).toString(16);
};

const hexadecimalToBinary = (hex) => {
  return hex
    .split("")
    .map((char) => parseInt(char, 16).toString(2).padStart(4, "0"))
    .join("")
    .padStart(16, "0");
};

const isBinary = (str) => {
  return /^[01]+$/.test(str);
};

let tablec = [];
let MCen = memory.getData();

const initialization = () => {
  const code = JSON.parse(localStorage.getItem("restoreCode"));
  const codeArray = code
    .replace(/\n{2,}/g, "\n")
    .trim()
    .split("\n");
  let result = [];
  codeArray.forEach((element) => {
    result.push(element.trim().split(""));
  });
  let strings = "";
  if (result && result[0][0] + result[0][1] + result[0][2]) {
    if ((result[0][0] + result[0][1] + result[0][2]).toLowerCase() === "str") {
      for (let i = 0; i < result.length; i++) {
        if (
          (result[i][0] + result[i][1] + result[i][2]).toLowerCase() === "str"
        ) {
          let line = "";
          result[i].forEach((element) => {
            line += element;
          });
          strings += line.slice(line.indexOf('"') + 1, line.length - 1);
        }
      }
      let j = 0;
      MCen.forEach((element, index) => {
        if (strings[index - 1]) {
          j = 2 * index;
          tablec.push(
            <tr>
              <td>{j - 2}</td>
              <td>{decimalToHexa(strings[index - 1].charCodeAt(0))}</td>
            </tr>
          );
          tablec.push(
            <tr>
              <td>{j - 1}</td>
              <td>00</td>
            </tr>
          );
        } else {
          tablec.push(
            <tr>
              <td>{j}</td>
              <td>00000000</td>
            </tr>
          );
          j++;
        }
      });
    } else {
      MCen.forEach((element, index) => {
        tablec.push(
          <tr>
            <td>{index - 1}</td>
            <td>00000000</td>
          </tr>
        );
      });
    }
  } else {
    MCen.forEach((element, index) => {
      tablec.push(
        <tr>
          <td>{index - 1}</td>
          <td>00000000</td>
        </tr>
      );
    });
  }
};

const Arch = (props) => {
  initialization();

  let [dataBusText, setDataBusText] = useState("");
  let [AdrBusText, setAdrBusText] = useState("");
  let [reg1, setReg1] = useState("0000000000000000");
  let [reg2, setReg2] = useState("0000000000000000");
  let [reg3, setReg3] = useState("0000000000000000");
  let [reg4, setReg4] = useState("0000000000000000");
  let [regIdr, setRegIdr] = useState("0000000000000000");
  let [regIr, setRegIr] = useState("0000000000000000");
  let [regIp, setRegIp] = useState("0000000000000000");
  let [regBr, setRegBr] = useState("0000000000000000");
  let [regSr, setRegSr] = useState("0000000000000000");
  let [regAcc, setRegAcc] = useState("0000000000000000");
  let [zeroFlag, setZeroFlag] = useState(0);
  let [signFlag, setSignFlag] = useState(0);
  let [carryFlag, setCarryFlag] = useState(0);
  let [parityFlag, setParityFlag] = useState(0);
  let [pairImpairFlag, setPairImpairFlag] = useState(0);
  let [overflowFlag, setOverflowFlag] = useState(0);
  let [interruptFlag, setInterruptFlag] = useState(0);
  let [ioFlag, setIoFlag] = useState(0);
  let [memoryContent, setMemoryContent] = useState([...new Set(tablec)]);
  let [ballText, setballText] = useState("");
  let [ball2Text, setball2Text] = useState(0);
  let [IPval, setipval] = useState(0);
  let [AluVal, setAluVal] = useState("");
  let [MCVal, setMCVal] = useState("");
  let [CacheVal, setCacheVal] = useState("");
  useEffect(() => {
    console.log("yep it working");
    stop();
  }, [getSpeed()]);
  ///////////////to add delay////////////////////////
  let thecontext = [...props.theCTX];
  console.log("the context : " + thecontext);
  let tmpctx = 0;
  let done = 0;

  const updateElementAtIndex = (index, newElement) => {
    setMemoryContent((prevElements) => {
      const updated = [...prevElements];
      updated[index] = newElement;
      return updated;
    });
  };

  const animate = (i, animation, h, w, dl, chaine) => {
    setTimeout(function () {
      if (animation.target === ".ball") {
        if (animation.value.toString().length > 7) {
          setballText(parseInt(animation.value, 2).toString(16));
        } else {
          setballText(animation.value.toString());
        }
      } else if (animation.target === ".box-data") {
        if (animation.value.toString().length > 7) {
          setDataBusText(parseInt(animation.value, 2).toString(16));
        } else {
          setDataBusText(animation.value.toString());
        }
      } else if (animation.target === ".box-ADR") {
        if (animation.value.toString().length > 7) {
          setAdrBusText(parseInt(animation.value, 2).toString(16));
        } else {
          setAdrBusText(animation.value.toString());
        }
      } else if (animation.target === "IP") {
        IPval = IPval + 2;
        setRegIp(decimalToBinary(IPval));
        setipval(IPval);
      } else if (animation.target === ".ALU") {
        setAluVal(animation.value);
      } else if (animation.target === ".MC") {
        setMCVal(animation.value);
      } else if (animation.target === ".Cache") {
        setCacheVal(animation.value);
      }

      if (animation.flag) {
        switch (animation.flag) {
          case "0-ZERO":
            setZeroFlag((prev) => {
              return 0;
            });
            break;
          case "1-ZERO":
            setZeroFlag((prev) => {
              return 1;
            });
            break;
          case "0-SIGN":
            setSignFlag((prev) => {
              return 0;
            });
            break;
          case "1-SIGN":
            setSignFlag((prev) => {
              return 1;
            });
            break;
          case "0-CARRY":
            setCarryFlag((prev) => {
              return 0;
            });
            break;
          case "1-CARRY":
            setCarryFlag((prev) => {
              return 1;
            });
            break;
          case "0-PARITY":
            setParityFlag((prev) => {
              return 0;
            });
            break;
          case "1-PARITY":
            setParityFlag((prev) => {
              return 1;
            });
            break;
          case "0-PAIRIMPAIR":
            setPairImpairFlag((prev) => {
              return 0;
            });
            break;
          case "1-PAIRIMPAIR":
            setPairImpairFlag((prev) => {
              return 1;
            });
            break;
          case "0-OVERFLOW":
            setOverflowFlag((prev) => {
              return 0;
            });
            break;
          case "1-OVERFLOW":
            setOverflowFlag((prev) => {
              return 1;
            });
            break;
          case "0-INTERRUPT":
            setInterruptFlag((prev) => {
              return 0;
            });
            break;
          case "1-INTERRUPT":
            setInterruptFlag((prev) => {
              return 1;
            });
            break;
          case "IO":
            setIoFlag((prev) => prev + 1);
            break;
          case "END-IO":
            setIoFlag((prev) => prev - 1);
            break;
          default:
            break;
        }
      }

      if (animation.nom && animation.value !== "") {
        switch (animation.nom) {
          case "R1":
            setReg1((prev) => {
              return decimalToBinary(animation.value);
            });
            break;
          case "R2":
            setReg2((prev) => {
              return decimalToBinary(animation.value);
            });
            break;
          case "R3":
            setReg3((prev) => {
              return decimalToBinary(animation.value);
            });
            break;
          case "R4":
            setReg4((prev) => {
              return decimalToBinary(animation.value);
            });
            break;
          case "IDR":
            setRegIdr((prev) => {
              return decimalToBinary(animation.value);
            });
            break;
          case "SR":
            setRegSr((prev) => {
              return decimalToBinary(animation.value);
            });
            break;
          case "BR":
            setRegBr((prev) => {
              return decimalToBinary(animation.value);
            });
            break;
          case "ACC":
            setRegAcc((prev) => {
              return decimalToBinary(animation.value);
            });
            break;
          default:
            break;
        }
      }

      if (animation.name && animation.name === "IR") {
        if (isBinary(animation.value)) {
          setRegIr((prev) => {
            return animation.value.padStart(16, "0");
          });
        } else {
          setRegIr((prev) => {
            return hexadecimalToBinary(animation.value);
          });
        }
      }

      if (animation.value === "WRITE" && animation.name !== "cacheMem") {
        if ("taille" in animation) {
          if (animation.taille == 0) {
            const element = (
              <tr>
                <td>{animation.address + 1}</td>
                <td>{animation.content[0] + animation.content[1]}</td>
              </tr>
            );
            updateElementAtIndex(animation.address + 1, element);
          } else {
            const element = (
              <tr>
                <td>{animation.address + 1}</td>
                <td>{animation.content[0] + animation.content[1]}</td>
              </tr>
            );
            const element1 = (
              <tr>
                <td>{animation.address}</td>
                <td>{animation.content[2] + animation.content[3]}</td>
              </tr>
            );
            updateElementAtIndex(animation.address + 1, element1);
            updateElementAtIndex(animation.address + 2, element);
          }
        } else {
          const element = (
            <tr>
              <td>{animation.address + 1}</td>
              <td>{animation.content[0] + animation.content[1]}</td>
            </tr>
          );
          const element1 = (
            <tr>
              <td>{animation.address}</td>
              <td>{animation.content[2] + animation.content[3]}</td>
            </tr>
          );
          updateElementAtIndex(animation.address + 1, element1);
          updateElementAtIndex(animation.address + 2, element);
        }
      }

      if (
        (animation.nom === "QueueToIr") |
        (animation.nom === "queueExitToBus")
      ) {
        //decalage par 1
        gsap.fromTo(
          ".queuearrow",
          { top: "60%", left: "83%", opacity: "0" },
          { top: "60%", left: "73%", opacity: "1", duration: 0.3 * nsp() }
        );
        gsap.to(".queuearrow", {
          opacity: "0",
          duration: 0.1 * nsp(),
          delay: 0.3 * nsp(),
        });
        if (animqueuelen() == 6) {
          gsap.to(".queue6", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue5", { opacity: "1", duration: 0.4 * nsp() });
          gsap.to(".queue4", { opacity: "1", duration: 0.4 * nsp() });
          gsap.to(".queue3", { opacity: "1", duration: 0.4 * nsp() });
          gsap.to(".queue2", { opacity: "1", duration: 0.4 * nsp() });
          gsap.to(".queue1", { opacity: "1", duration: 0.4 * nsp() });
        } else if (animqueuelen() == 5) {
          gsap.to(".queue6", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue5", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue4", { opacity: "1", duration: 0.4 * nsp() });
          gsap.to(".queue3", { opacity: "1", duration: 0.4 * nsp() });
          gsap.to(".queue2", { opacity: "1", duration: 0.4 * nsp() });
          gsap.to(".queue1", { opacity: "1", duration: 0.4 * nsp() });
        } else if (animqueuelen() == 4) {
          gsap.to(".queue6", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue5", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue4", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue3", { opacity: "1", duration: 0.4 * nsp() });
          gsap.to(".queue2", { opacity: "1", duration: 0.4 * nsp() });
          gsap.to(".queue1", { opacity: "1", duration: 0.4 * nsp() });
        } else if (animqueuelen() == 3) {
          gsap.to(".queue6", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue5", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue4", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue3", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue2", { opacity: "1", duration: 0.4 * nsp() });
          gsap.to(".queue1", { opacity: "1", duration: 0.4 * nsp() });
        } else if (animqueuelen() == 2) {
          gsap.to(".queue6", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue5", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue4", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue3", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue2", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue1", { opacity: "1", duration: 0.4 * nsp() });
        } else if (animqueuelen() == 1) {
          gsap.to(".queue6", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue5", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue4", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue3", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue2", { opacity: "0", duration: 0.4 * nsp() });
          gsap.to(".queue1", { opacity: "0", duration: 0.4 * nsp() });
        }
      }
      animation.anim(animation.value, h, w);
      if (animqueuelen() == 6) {
        done = 1;
      }
      if (chaine & (done === 1)) {
        if (!isNaN(thecontext[tmpctx]) & !isNaN(thecontext[tmpctx])) {
          let tl = gsap.timeline();
          tl.add(() => {
            setball2Text("");
          })
            .fromTo(
              ".ball2",
              {
                height: "2.812%",
                width: "1.4%",
                borderRadius: "50%",
                x: w * 0.782,
                y: h * 0.14,
                opacity: "0",
              },
              { opacity: "1", duration: 0.5 * nsp() }
            )
            .fromTo(
              ".ball2",
              { x: w * 0.782, y: h * 0.14 },
              { y: h * 0.18, duration: 0.8 * nsp() }
            )
            .to(".ball2", { opacity: "0", duration: 0.5 * nsp() })
            .add(() => {
              setAdrBusText(thecontext[tmpctx]);
              IPval = IPval + 2;
              setipval(IPval);
            })
            .fromTo(
              ".box-ADR",
              { x: w * 0.753, opacity: "0" },
              { opacity: "1", duration: 0.5 * nsp() }
            )
            .fromTo(
              ".box-ADR",
              { x: w * 0.753 },
              { x: w * 0.648, duration: 0.8 * nsp() }
            )
            .to(".box-ADR", { opacity: "0", duration: 0.5 * nsp() })
            .add(() => {
              setball2Text(thecontext[tmpctx]);
              tmpctx++;
            })
            .fromTo(
              ".ball2",
              {
                borderRadius: "10px",
                width: w * 0.032,
                height: h * 0.14,
                x: w * 0.623,
                y: h * 0.165,
                opacity: "0",
              },
              { opacity: "1", duration: 0.5 * nsp() }
            )
            .to(".ball2", { opacity: "0", duration: 0.5 * nsp() })
            .add(() => {
              setball2Text(thecontext[tmpctx]);
            })
            .fromTo(
              ".ball2",
              {
                borderRadius: "10px",
                width: w * 0.11,
                height: h * 0.06,
                x: w * 0.49,
                y: h * 0.38,
                opacity: "0",
              },
              { opacity: "1", duration: 0.5 * nsp() }
            )
            .to(".ball2", { opacity: "0", duration: 0.5 * nsp() })
            .fromTo(
              ".ball2",
              {
                height: "2.812%",
                width: "1.4%",
                borderRadius: "50%",
                x: w * 0.539,
                y: h * 0.445,
                opacity: "0",
              },
              { opacity: "1", duration: 0.5 * nsp() }
            )
            .fromTo(
              ".ball2",
              { x: w * 0.539, y: h * 0.445 },
              { y: h * 0.465, duration: 0.8 * nsp() }
            )
            .to(".ball2", { opacity: "0", duration: 0.5 * nsp() })
            .add(() => {
              setDataBusText(thecontext[tmpctx]);
              tmpctx++;
            })
            .fromTo(
              ".box-data",
              { x: w * 0.497, opacity: "0" },
              { opacity: "1", duration: 0.5 * nsp() }
            )
            .fromTo(
              ".box-data",
              { x: w * 0.497 },
              { x: w * 0.874, duration: 0.8 * nsp() }
            )
            .to(".box-data", { opacity: "0", duration: 0.5 * nsp() })
            .fromTo(
              ".ball2",
              {
                height: "2.812%",
                width: "1.4%",
                borderRadius: "50%",
                x: w * 0.931,
                y: h * 0.56,
                opacity: "0",
              },
              { opacity: "1", duration: 0.5 * nsp() }
            )
            .fromTo(
              ".ball2",
              { x: w * 0.931, y: h * 0.56 },
              { y: h * 0.6638, duration: 0.5 * nsp() }
            )
            .to(".ball2", { x: w * 0.921, duration: 0.5 * nsp() })
            .to(".ball2", { opacity: "0", duration: 0.3 * nsp() });
          if (animqueuelen() === 5) {
            tl.to(".queue6", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue5", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue4", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue3", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue2", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue1", { opacity: "1", duration: 0.4 * nsp() });
          } else if (animqueuelen() === 4) {
            tl.to(".queue6", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue5", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue4", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue3", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue2", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue1", { opacity: "1", duration: 0.4 * nsp() });
          } else if (animqueuelen() === 3) {
            tl.to(".queue6", { opacity: "0", duration: 0.4 * nsp() });
            tl.to(".queue5", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue4", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue3", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue2", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue1", { opacity: "1", duration: 0.4 * nsp() });
          } else if (animqueuelen() === 2) {
            tl.to(".queue6", { opacity: "0", duration: 0.4 * nsp() });
            tl.to(".queue5", { opacity: "0", duration: 0.4 * nsp() });
            tl.to(".queue4", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue3", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue2", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue1", { opacity: "1", duration: 0.4 * nsp() });
          } else if (animqueuelen() === 1) {
            tl.to(".queue6", { opacity: "0", duration: 0.4 * nsp() });
            tl.to(".queue5", { opacity: "0", duration: 0.4 * nsp() });
            tl.to(".queue4", { opacity: "0", duration: 0.4 * nsp() });
            tl.to(".queue3", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue2", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue1", { opacity: "1", duration: 0.4 * nsp() });
          } else if (animqueuelen() === 0) {
            tl.to(".queue6", { opacity: "0", duration: 0.4 * nsp() });
            tl.to(".queue5", { opacity: "0", duration: 0.4 * nsp() });
            tl.to(".queue4", { opacity: "0", duration: 0.4 * nsp() });
            tl.to(".queue3", { opacity: "0", duration: 0.4 * nsp() });
            tl.to(".queue2", { opacity: "1", duration: 0.4 * nsp() });
            tl.to(".queue1", { opacity: "1", duration: 0.4 * nsp() });
          }
        }
      }
    }, dl);
  };
  const [len, setlen] = useState(0);
  const animqueuelen = () => {
    let len = 0;
    if (q6.current.style.opacity == 1) {
      len = len + 1;
    }
    if (q5.current.style.opacity == 1) {
      len = len + 1;
    }
    if (q4.current.style.opacity == 1) {
      len = len + 1;
    }
    if (q3.current.style.opacity == 1) {
      len = len + 1;
    }
    if (q2.current.style.opacity == 1) {
      len = len + 1;
    }
    if (q1.current.style.opacity == 1) {
      len = len + 1;
    }
    setlen(len);
    return len;
  };
  let myref = useRef();
  let q1 = useRef();
  let q2 = useRef();
  let q3 = useRef();
  let q4 = useRef();
  let q5 = useRef();
  let q6 = useRef();
  const [inanim, incanim] = useState(0);
  const [cont, setcont] = useState("start");
  const next = () => {
    setcont("continue");
    document.getElementById("next").disabled = true;
    document.getElementById("reload").disabled = true;
    document.getElementById("stop").disabled = true;
    document.getElementById("continue").disabled = true;
    simulate(inanim);
    setTimeout(() => {
      document.getElementById("next").disabled = false;
      document.getElementById("reload").disabled = false;
      document.getElementById("stop").disabled = false;
      document.getElementById("continue").disabled = false;
    }, props.anim[inanim]?.time?.() ?? 1000 * nsp());
    incanim(inanim + 1);
  };
  const reload = () => {
    stop();
    incanim(0);
    setipval(0);
    setcont("start");
    setlen(0);

    q1.current.style.opacity = 0;
    q2.current.style.opacity = 0;
    q3.current.style.opacity = 0;
    q4.current.style.opacity = 0;
    q5.current.style.opacity = 0;
    q6.current.style.opacity = 0;
  };
  const stopan = useRef(true);
  const curtime = useRef(null);
  const dl2 = useRef(0);
  const continu = () => {
    setcont("continue");
    document.getElementById("next").disabled = true;
    document.getElementById("continue").disabled = true;
    stopan.current = false;
    let i = inanim;
    const runAnimation = () => {
       if (stopan.current || i >= (props.anim?.length || 0)) {
        document.getElementById("next").disabled = false;
        document.getElementById("continue").disabled = false;
        return;
      }
      const cfg = props.anim[i];
      simulate(i);
      const timeValue =()=>{return typeof cfg.time === 'function' 
      ? cfg.time() 
      : cfg.time ?? 1000; }
  
      dl2.current = timeValue() * (nsp()); 
      i++;
      incanim(i);
      curtime.current =setTimeout(runAnimation, dl2.current*0.8);

    };
    runAnimation();
  };

  const stop = () => {

    stopan.current =true;  
    dl2.current=0;
    dl.current=0
    clearTimeout(curtime.current);
        document.getElementById("next").disabled = false;
        document.getElementById("continue").disabled = false;
  };
  const allow = useRef(false);
  const allowtmp = useRef(0);
  const dl = useRef(0);
  const simulate = (j) => {
    console.log(props.anim);

    const cfg = props.anim[j];
    if (!cfg) return null;

    const h = myref.current.clientHeight;
    const w = myref.current.clientWidth;

    let k = 0;
    let stop = false;
    let chaine = false;

    allowtmp.current++;
    if (allowtmp.current >= 10) {
      allow.current = true;
    }

    while (k < 10 && !stop && j + k < props.anim.length) {
      const checkIndex = Math.max(j + k - 4, 0);
      const animItem = props.anim[checkIndex];

      if (animItem?.target !== ".box-data" && animItem?.target !== ".box-ADR") {
        k++;
      } else {
        stop = true;
      }
    }

    if (k === 10 && animqueuelen() <= 4 && allow.current) {
      chaine = true;
      allow.current = false;
      allowtmp.current = 0;
    }



      const timeValue = typeof cfg.time === 'function' ? cfg.time() : 1000 * nsp();

      animate(0, cfg, h, w, dl.current, chaine);
      dl.current =dl.current+timeValue + 1;

    };

  ///////////////////////////////
  // useEffect(() => {
  // let i=0;
  // for(let animation of props.anim){
  //     animate(i,animation);
  //     i++;
  // }
  // // props.anim[0](myref.current.clientHeight,current.clientWidth);
  // },[]);
  //////////////////////////
  return (
    <>
      <div className="arch-contain">
        {/*///*/}
        {/* <img src={Archi} alt="" className="archi" ref={myref} onLoad={()=>{simulate(myref.current.clientHeight,myref.current.clientWidth)}}/> */}
        <img
          src={Archi2}
          alt=""
          className="archi"
          ref={myref}
          onLoad={() => {
            simulate();
          }}
        />

        <div
          className="IP"
          style={{
            height: "4.2%",
            width: "6%",
            position: "absolute",
            borderRadius: "25%",
            border: "solid #1BE988",
            backgroundColor: "#1BE985",
            top: "5%",
            left: "75%",
            // left:"23%",
            // display:"none",
          }}
        >
          {IPval}
        </div>
        <div
          className="box-data"
          style={{
            height: "5%",
            width: "7.5%",
            position: "absolute",
            borderRadius: "25%",
            border: "solid #1BE988",
            backgroundColor: "#1BE985",
            top: "45.89999%",
            // left:"23%",
            // display:"none",
            opacity: "0",
          }}
        >
          {dataBusText}
        </div>
        <div
          className="ball"
          style={{
            height: "2.812%",
            width: "1.4%",
            borderRadius: "50%",
            position: "fixed",
            backgroundColor: "#1BE985",
            top: `0%`,
            left: "0%",
          }}
        >
          {ballText}
        </div>
        <div
          className="ball2"
          style={{
            height: "2.812%",
            width: "1.4%",
            borderRadius: "50%",
            position: "fixed",
            backgroundColor: "#1BE985",
            top: `0%`,
            left: "0%",
            opacity: "0",
          }}
        >
          {ball2Text}
        </div>
        <div
          className="box-ADR"
          style={{
            height: "4.2%",
            width: "6%",
            position: "absolute",
            borderRadius: "25%",
            border: "solid #1BE988",
            backgroundColor: "#1BE985",
            top: "17.9%",
            opacity: "0",
          }}
        >
          {AdrBusText}
        </div>
        <div
          className="queue1"
          ref={q1}
          style={{
            width: "2%",
            height: "9%",
            position: "absolute",
            backgroundColor: "#1BE985",
            top: "59%",
            left: "74.4%",
            borderRadius: "10px",
            opacity: "0",
          }}
        ></div>
        <div
          className="queue2"
          ref={q2}
          style={{
            width: "2%",
            height: "9%",
            position: "absolute",
            backgroundColor: "#1BE985",
            top: "59%",
            left: "77.1%",
            borderRadius: "10px",
            opacity: "0",
          }}
        ></div>
        <div
          className="queue3"
          ref={q3}
          style={{
            width: "2%",
            height: "9%",
            position: "absolute",
            backgroundColor: "#1BE985",
            top: "59%",
            left: "79.8%",
            borderRadius: "10px",
            opacity: "0",
          }}
        ></div>
        <div
          className="queue4"
          ref={q4}
          style={{
            width: "2%",
            height: "9%",
            position: "absolute",
            backgroundColor: "#1BE985",
            top: "59%",
            left: "82.6%",
            borderRadius: "10px",
            opacity: "0",
          }}
        ></div>
        <div
          className="queue5"
          ref={q5}
          style={{
            width: "2%",
            height: "9%",
            position: "absolute",
            backgroundColor: "#1BE985",
            top: "59%",
            left: "85.3%",
            borderRadius: "10px",
            opacity: "0",
          }}
        ></div>
        <div
          className="queue6"
          ref={q6}
          style={{
            width: "2%",
            height: "9%",
            position: "absolute",
            backgroundColor: "#1BE985",
            top: "59%",
            left: "88%",
            borderRadius: "10px",
            opacity: "0",
          }}
        ></div>
        <div
          className="ALU"
          style={{
            height: "5%",
            width: "10%",
            position: "absolute",
            top: "75%",
            left: "17%",
            opacity: "0",
            color: "#1BE988",
            fontSize: "32px",
            fontWeight: "800",
          }}
        >
          {AluVal}
        </div>
        <div
          className="MC"
          style={{
            height: "5%",
            width: "10%",
            position: "absolute",
            top: "16%",
            left: "48.7%",
            opacity: "0",
            color: "#1BE988",
            fontSize: "25px",
            fontWeight: "800",
          }}
        >
          {MCVal}
        </div>
        <div
          className="Cache"
          style={{
            height: "4%",
            width: "8%",
            position: "absolute",
            top: "25%",
            left: "31.5%",
            opacity: "0",
            color: "#1BE988",
            fontSize: "25px",
            fontWeight: "800",
          }}
        >
          {CacheVal}
        </div>
        <img
          src={queuearrow}
          className="queuearrow"
          alt=""
          style={{
            width: "60px",
            height: "40px",
            position: "absolute",
            top: "60%",
            left: "73%",
            opacity: "0",
          }}
        />
      </div>
      {/*///*/}
      <div
        style={{
          height: "90%",
          width: "25%",
          backgroundColor: "#1C2025",
          position: "fixed",
          right: "1%",
          top: "8%",
          borderRadius: "20px",
          textAlign: "center",
          border: "1px solid #1BE985",
        }}
      >
        <div>
          <h2 className="contentTableText">Registers</h2>
          <div className="contentTableDiv">
            <div className="aregister">
              <p className="aregP">IP :</p>
              <div className="aregC">
                <p style={{ margin: "6px" }}>{regIp}</p>
              </div>
            </div>
            <div className="aregister">
              <p className="aregP">R1 :</p>
              <div className="aregC">
                <p style={{ margin: "6px" }}>{reg1}</p>
              </div>
            </div>
            <div className="aregister">
              <p className="aregP">R2 :</p>
              <div className="aregC">
                <p style={{ margin: "6px" }}>{reg2}</p>
              </div>
            </div>
            <div className="aregister">
              <p className="aregP">R3 :</p>
              <div className="aregC">
                <p style={{ margin: "6px" }}>{reg3}</p>
              </div>
            </div>
            <div className="aregister">
              <p className="aregP">R4 :</p>
              <div className="aregC">
                <p style={{ margin: "6px" }}>{reg4}</p>
              </div>
            </div>
            <div className="aregister">
              <p className="aregP">IR :</p>
              <div className="aregC">
                <p style={{ margin: "6px" }}>{regIr}</p>
              </div>
            </div>
            <div className="aregister">
              <p className="aregP">BR :</p>
              <div className="aregC">
                <p style={{ margin: "6px" }}>{regBr}</p>
              </div>
            </div>
            <div className="aregister">
              <p className="aregP">SR :</p>
              <div className="aregC">
                <p style={{ margin: "6px" }}>{regSr}</p>
              </div>
            </div>
            <div className="aregister">
              <p className="aregP">IDR :</p>
              <div className="aregC">
                <p style={{ margin: "6px" }}>{regIdr}</p>
              </div>
            </div>
            <div className="aregister">
              <p className="aregP">ACC :</p>
              <div className="aregC">
                <p style={{ margin: "6px" }}>{regAcc}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="contentTableText">Flags</h2>
          <div className="contentTableDivFlags">
            <div className="aflagContainer">
              <p className="aflagName">ZF</p>
              <div className="aflagdiv">
                <p className="aflag">{zeroFlag}</p>
              </div>
            </div>
            <div className="aflagContainer">
              <p className="aflagName">SF</p>
              <div className="aflagdiv">
                <p className="aflag">{signFlag}</p>
              </div>
            </div>
            <div className="aflagContainer">
              <p className="aflagName">CF</p>
              <div className="aflagdiv">
                <p className="aflag">{carryFlag}</p>
              </div>
            </div>
            <div className="aflagContainer">
              <p className="aflagName">PF</p>
              <div className="aflagdiv">
                <p className="aflag">{parityFlag}</p>
              </div>
            </div>
            <div className="aflagContainer">
              <p className="aflagName">PIF</p>
              <div className="aflagdiv">
                <p className="aflag">{pairImpairFlag}</p>
              </div>
            </div>
            <div className="aflagContainer">
              <p className="aflagName">OF</p>
              <div className="aflagdiv">
                <p className="aflag">{overflowFlag}</p>
              </div>
            </div>
            <div className="aflagContainer">
              <p className="aflagName">IF</p>
              <div className="aflagdiv">
                <p className="aflag">{interruptFlag}</p>
              </div>
            </div>
            <div className="aflagContainer">
              <p className="aflagName">IOF</p>
              <div className="aflagdiv">
                <p className="aflag">{ioFlag}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="contentTableText">MC</h2>
          <div className="contentTableDivMC">
            <div className="MChead">
              <p>address</p>
              <p>content</p>
            </div>
            <table className="contentTableMC">
              <tbody>
                <tr>
                  <td>address</td>
                  <td>content</td>
                </tr>
                {memoryContent}
              </tbody>
            </table>
          </div>
        </div>
        <button
          className="returnBtn"
          onClick={() => {
            window.location.reload(false);
          }}
        >
          return
        </button>
        <br />
        <br />
        <div>
          <button className="control" onClick={reload} id="reload">
            reload
          </button>
          <button className="control" onClick={next} id="next">
            next
          </button>
          <button className="control" onClick={continu} id="continue">
            {cont}
          </button>
          <button className="control" onClick={stop} id="stop">
            stop
          </button>
        </div>
      </div>
    </>
  );
};
export default Arch;
