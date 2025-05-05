import  {memory,IP} from "../pages/Ide";
import { TwosComplement } from "./ALU.js";
import { gsap } from "gsap";
import { nsp  } from "./speed.js";




const IpToAdr = {
  value: "",
  target: ".ball",
  time:()=> 1800 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".ball", 
      { height: "2.812%", width: "1.4%", borderRadius: "50%", x: w * 0.782, y: h * 0.14, opacity: "0" },
      { opacity: "1", duration: 0.5 * nsp() }
    );
    gsap.fromTo(".ball",
      { x: w * 0.782, y: h * 0.14 },
      { y: h * 0.18, duration: 0.8 * nsp(), delay: 0.5 * nsp() }
    );
    gsap.to(".ball",
      { opacity: "0", duration: 0.5 * nsp(), delay: 1.3 * nsp() }
    );
  }
};

const IPToMAR = {
  value: "",
  target: ".box-ADR",
  time:()=> 1800 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".box-ADR",
      { x: w * 0.753, opacity: "0" },
      { opacity: "1", duration: 0.5 * nsp() }
    );
    gsap.fromTo(".box-ADR",
      { x: w * 0.753 },
      { x: w * 0.648, duration: 0.8 * nsp(), delay: 0.5 * nsp() }
    );
    gsap.to(".box-ADR",
      { opacity: "0", duration: 0.5 * nsp(), delay: 1.3 * nsp() }
    );
  }
};

const fitToMdr = {
  value: "",
  target: ".ball",
  time:()=> 600 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".ball",
      { borderRadius: "10px", width: w * 0.11, height: h * 0.06, x: w * 0.49, y: h * 0.38, opacity: "0" },
      { opacity: "1", duration: 0.6 * nsp() }
    );
  }
};

const infitToMdr = {
  value: "",
  target: ".ball",
  time:()=> 600 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball",
      { opacity: "0", duration: 0.6 * nsp() }
    );
  }
};

const fitToMar = {
  value: "",
  target: ".ball",
  time:()=> 600 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".ball",
      { borderRadius: "10px", width: w * 0.032, height: h * 0.14, x: w * 0.623, y: h * 0.165, opacity: "0" },
      { opacity: "1", duration: 0.6 * nsp() }
    );
  }
};

const fitToIr = {
  value: "",
  target: ".ball",
  time:()=> 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".ball",
      { borderRadius: "10px", width: w * 0.1, height: h * 0.055, x: w * 0.6, y: h * 0.6495, opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
  }
};

const infitToIr = {
  value: "",
  target: ".ball",
  time:()=> 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball",
      { opacity: "0", duration: 1 * nsp() }
    );
  }
};

const MdrToBus = {
  value: "",
  target: ".ball",
  time:()=> 1800 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".ball",
      { height: "2.812%", width: "1.4%", borderRadius: "50%", x: w * 0.539, y: h * 0.445, opacity: "0" },
      { opacity: "1", duration: 0.5 * nsp() }
    );
    gsap.fromTo(".ball",
      { x: w * 0.539, y: h * 0.445 },
      { y: h * 0.465, duration: 0.8 * nsp(), delay: 0.5 * nsp() }
    );
    gsap.to(".ball",
      { opacity: "0", duration: 0.5 * nsp(), delay: 1.3 * nsp() }
    );
  }
};

const MdrTOQue = {
  value: "",
  target: ".box-data",
  time:()=> 1100 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".box-data",
      { x: w * 0.497, opacity: "0" },
      { opacity: "1", duration: 0.3 * nsp() }
    );
    gsap.fromTo(".box-data",
      { x: w * 0.497 },
      { x: w * 0.874, duration: 0.5 * nsp(), delay: 0.3 * nsp() }
    );
    gsap.to(".box-data",
      { opacity: "0", duration: 0.3 * nsp(), delay: 0.8 * nsp() }
    );
  }
};

const BusToQueue = {
  value: "",
  target: ".ball",
  time:()=> 2400 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".ball",
      { height: "2.812%", width: "1.4%", borderRadius: "50%", x: w * 0.931, y: h * 0.56, opacity: "0" },
      { opacity: "1", duration: 0.5 * nsp() }
    );
    gsap.fromTo(".ball",
      { x: w * 0.931, y: h * 0.56 },
      { y: h * 0.6638, duration: 0.7 * nsp(), delay: 0.5 * nsp() }
    );
    gsap.to(".ball",
      { x: w * 0.921, duration: 0.7 * nsp(), delay: 1.2 * nsp() }
    );
    gsap.to(".ball",
      { opacity: "0", duration: 0.5 * nsp(), delay: 1.9 * nsp() }
    );
  }
};

// Queue animation objects
const fitqueue6 = {
  value: "",
  target: ".queue1",
  time:()=> 300 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".queue1",
      { opacity: "0" },
      { opacity: "1", duration: 0.3 * nsp() }
    );
  }
};

const fitqueue5 = {
  value: "",
  target: ".queue2",
  time:()=> 300 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".queue2",
      { opacity: "0" },
      { opacity: "1", duration: 0.3 * nsp() }
    );
  }
};

const fitqueue4 = {
  value: "",
  target: ".queue3",
  time:()=> 300 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".queue3",
      { opacity: "0" },
      { opacity: "1", duration: 0.3 * nsp() }
    );
  }
};

const fitqueue3 = {
  value: "",
  target: ".queue4",
  time:()=> 300 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".queue4",
      { opacity: "0" },
      { opacity: "1", duration: 0.3 * nsp() }
    );
  }
};

const fitqueue2 = {
  value: "",
  target: ".queue5",
  time:()=> 300 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".queue5",
      { opacity: "0" },
      { opacity: "1", duration: 0.3 * nsp() }
    );
  }
};

const fitqueue1 = {
  value: "",
  target: ".queue6",
  time:()=> 300 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".queue6",
      { opacity: "0" },
      { opacity: "1", duration: 0.3 * nsp() }
    );
  }
};

const infitqueue6 = {
  value: "",
  target: ".queue1",
  time:()=> 300 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".queue1",
      { opacity: "1" },
      { opacity: "0", duration: 0.3 * nsp() }
    );
  }
};

const infitqueue5 = {
  value: "",
  target: ".queue2",
  time:()=> 300 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".queue2",
      { opacity: "1" },
      { opacity: "0", duration: 0.3 * nsp() }
    );
  }
};

const infitqueue4 = {
  value: "",
  target: ".queue3",
  time:()=> 300 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".queue3",
      { opacity: "1" },
      { opacity: "0", duration: 0.3 * nsp() }
    );
  }
};

const infitqueue3 = {
  value: "",
  target: ".queue4",
  time:()=> 300 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".queue4",
      { opacity: "1" },
      { opacity: "0", duration: 0.3 * nsp() }
    );
  }
};

const infitqueue2 = {
  value: "",
  target: ".queue5",
  time:()=> 300 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".queue5",
      { opacity: "1" },
      { opacity: "0", duration: 0.3 * nsp() }
    );
  }
};

const infitqueue1 = {
  value: "",
  target: ".queue6",
  time:()=> 300 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".queue6",
      { opacity: "1" },
      { opacity: "0", duration: 0.3 * nsp() }
    );
  }
};

const infitToMar = {
  value: "",
  target: ".ball",
  time:()=> 1000 * nsp(),
  anim: (val, h, w) => {
    gsap.to(".ball",
      { opacity: "0", duration: 1 * nsp() }
    );
  }
};

const MCanim = {
  value: "",
  target: ".MC",
  time:()=> 2000 * nsp(),
  anim: (val, h, w) => {
    gsap.fromTo(".MC",
      { opacity: "0" },
      { opacity: "1", duration: 1 * nsp() }
    );
    gsap.fromTo(".MC",
      { opacity: "1" },
      { opacity: "0", duration: 1 * nsp(), delay: 1 * nsp() }
    );
  }
};

class Queue {
    constructor(instructionBytes) {
    this.instructionBytes = instructionBytes;
    }
    getqueuelen(){
        return this.instructionBytes.length;
    }
    fetchInstruction(animations,num,is_animated,Contextarray,buildCTX){//for queue length cause i coudln't access directly with this.getqueuelen
        let marval=IP.getvalue();
        memory.setRam(marval);
        memory.read(1);
        let instruction=memory.getRim();
        ///this one is jyst for anim
        memory.setRam(TwosComplement(parseInt(marval,2)+1,16));
        memory.read(1);
        let instructionpart2=memory.getRim();
        let mdrval=instruction+instructionpart2;
        //////////////////////////////
        this.instructionBytes.push(instruction);
        IP.setvalue(TwosComplement(parseInt(IP.getvalue(),2)+1,16));
        //animation:
        if(is_animated){
          marval=parseInt(marval,2).toString(16);
        animations.push({
            value:"",
            target:"IP",
            time:IpToAdr.time,
            anim:IpToAdr.anim,
        });
        animations.push({
            value:marval,
            target:IPToMAR.target,
            time:IPToMAR.time,
            anim:IPToMAR.anim,
        });
        animations.push({
            value:marval,
            target:fitToMar.target,
            time:fitToMar.time,
            anim:fitToMar.anim,
        });
        animations.push({
          value:marval,
          target:infitToMar.target,
          time:infitToMar.time,
          anim:infitToMar.anim,
      });
      animations.push({
        value:"READ",
        target:MCanim.target,
        time:MCanim.time,
        anim:MCanim.anim,
    });
        animations.push({
            value:mdrval,
            target:fitToMdr.target,
            time:fitToMdr.time,
            anim:fitToMdr.anim,
        });
        animations.push({
            value:mdrval,
            target:infitToMdr.target,
            time:infitToMdr.time,
            anim:infitToMdr.anim,
        });
        animations.push({
            value:"",
            target:MdrToBus.target,
            time:MdrToBus.time,
            anim:MdrToBus.anim,
        });
        animations.push({
            value:mdrval,
            target:MdrTOQue.target,
            time:MdrTOQue.time,
            anim:MdrTOQue.anim,
        });
        animations.push({
            value:"",
            target:BusToQueue.target,
            time:BusToQueue.time,
            anim:BusToQueue.anim,
        });
        if(num==0){
            animations.push({
              value:"",
              target:fitqueue1.target,
              time:fitqueue1.time,
              anim:()=>{
                gsap.to(".queue1",{opacity:"1",duration:"0.2"});
                gsap.to(".queue2",{opacity:"1",duration:"0.2"});
              },
            });
          // animations.push({
          //   value:"",
          //   target:fitqueue1.target,
          //   time:fitqueue1.time,
          //   anim:fitqueue1.anim,
          // });
          // animations.push({
          // value:"",
          // target:infitqueue1.target,
          // time:infitqueue1.time,
          // anim:infitqueue1.anim,
          // });
          // animations.push({
          // value:"",
          // target:fitqueue2.target,
          // time:fitqueue2.time,
          // anim:fitqueue2.anim,
          // });
          // animations.push({
          // value:"",
          // target:infitqueue2.target,
          // time:infitqueue2.time,
          // anim:infitqueue2.anim,
          // });
          // animations.push({
          //   value:"",
          //   target:fitqueue3.target,
          //   time:fitqueue3.time,
          //   anim:fitqueue3.anim,
          //   });
          //   animations.push({
          //   value:"",
          //   target:infitqueue3.target,
          //   time:infitqueue3.time,
          //   anim:infitqueue3.anim,
          //   });
          //   animations.push({
          //     value:"",
          //     target:fitqueue4.target,
          //     time:fitqueue4.time,
          //     anim:fitqueue4.anim,
          //     });
          //     animations.push({
          //     value:"",
          //     target:infitqueue4.target,
          //     time:infitqueue4.time,
          //     anim:infitqueue4.anim,
          //     });
          //     animations.push({
          //       value:"",
          //       target:fitqueue5.target,
          //       time:fitqueue5.time,
          //       anim:fitqueue5.anim,
          //       });
          //       animations.push({
          //       value:"",
          //       target:infitqueue5.target,
          //       time:infitqueue5.time,
          //       anim:infitqueue5.anim,
          //       });
          //       animations.push({
          //         value:"",
          //         target:fitqueue6.target,
          //         time:fitqueue6.time,
          //         anim:fitqueue6.anim,
          //         });
        }else if(num==1){
          animations.push({
            value:"",
            target:fitqueue1.target,
            time:fitqueue1.time,
            anim:()=>{
              gsap.to(".queue3",{opacity:"1",duration:"0.2"});
              gsap.to(".queue4",{opacity:"1",duration:"0.2"});
            },
          });
          // animations.push({
          //   value:"",
          //   target:fitqueue1.target,
          //   time:fitqueue1.time,
          //   anim:fitqueue1.anim,
          // });
          // animations.push({
          // value:"",
          // target:infitqueue1.target,
          // time:infitqueue1.time,
          // anim:infitqueue1.anim,
          // });
          // animations.push({
          // value:"",
          // target:fitqueue2.target,
          // time:fitqueue2.time,
          // anim:fitqueue2.anim,
          // });
          // animations.push({
          // value:"",
          // target:infitqueue2.target,
          // time:infitqueue2.time,
          // anim:infitqueue2.anim,
          // });
          // animations.push({
          //   value:"",
          //   target:fitqueue3.target,
          //   time:fitqueue3.time,
          //   anim:fitqueue3.anim,
          //   });
          //   animations.push({
          //   value:"",
          //   target:infitqueue3.target,
          //   time:infitqueue3.time,
          //   anim:infitqueue3.anim,
          //   });
          //   animations.push({
          //     value:"",
          //     target:fitqueue4.target,
          //     time:fitqueue4.time,
          //     anim:fitqueue4.anim,
          //     });
          //     animations.push({
          //     value:"",
          //     target:infitqueue4.target,
          //     time:infitqueue4.time,
          //     anim:infitqueue4.anim,
          //     });
          //     animations.push({
          //       value:"",
          //       target:fitqueue5.target,
          //       time:fitqueue5.time,
          //       anim:fitqueue5.anim,
          //       });
        }else if(num==2){
          animations.push({
            value:"",
            target:fitqueue1.target,
            time:fitqueue1.time,
            anim:()=>{
              gsap.to(".queue5",{opacity:"1",duration:"0.2"});
              gsap.to(".queue6",{opacity:"1",duration:"0.2"});
            },
          });
          // animations.push({
          //   value:"",
          //   target:fitqueue1.target,
          //   time:fitqueue1.time,
          //   anim:fitqueue1.anim,
          // });
          // animations.push({
          // value:"",
          // target:infitqueue1.target,
          // time:infitqueue1.time,
          // anim:infitqueue1.anim,
          // });
          // animations.push({
          // value:"",
          // target:fitqueue2.target,
          // time:fitqueue2.time,
          // anim:fitqueue2.anim,
          // });
          // animations.push({
          // value:"",
          // target:infitqueue2.target,
          // time:infitqueue2.time,
          // anim:infitqueue2.anim,
          // });
          // animations.push({
          //   value:"",
          //   target:fitqueue3.target,
          //   time:fitqueue3.time,
          //   anim:fitqueue3.anim,
          //   });
          //   animations.push({
          //   value:"",
          //   target:infitqueue3.target,
          //   time:infitqueue3.time,
          //   anim:infitqueue3.anim,
          //   });
          //   animations.push({
          //     value:"",
          //     target:fitqueue4.target,
          //     time:fitqueue4.time,
          //     anim:fitqueue4.anim,
          //     });
        }else if(num==3){
          // animations.push({
          //   value:"",
          //   target:fitqueue1.target,
          //   time:fitqueue1.time,
          //   anim:fitqueue1.anim,
          // });
          // animations.push({
          // value:"",
          // target:infitqueue1.target,
          // time:infitqueue1.time,
          // anim:infitqueue1.anim,
          // });
          // animations.push({
          // value:"",
          // target:fitqueue2.target,
          // time:fitqueue2.time,
          // anim:fitqueue2.anim,
          // });
          // animations.push({
          // value:"",
          // target:infitqueue2.target,
          // time:infitqueue2.time,
          // anim:infitqueue2.anim,
          // });
          // animations.push({
          //   value:"",
          //   target:fitqueue3.target,
          //   time:fitqueue3.time,
          //   anim:fitqueue3.anim,
          //   });
        }else if(num==4){
          // animations.push({
          //   value:"",
          //   target:fitqueue1.target,
          //   time:fitqueue1.time,
          //   anim:fitqueue1.anim,
          // });
          // animations.push({
          // value:"",
          // target:infitqueue1.target,
          // time:infitqueue1.time,
          // anim:infitqueue1.anim,
          // });
          // animations.push({
          // value:"",
          // target:fitqueue2.target,
          // time:fitqueue2.time,
          // anim:fitqueue2.anim,
          // });
        }else if(num==5){
          // animations.push({
          //   value:"",
          //   target:fitqueue1.target,
          //   time:fitqueue1.time,
          //   anim:fitqueue1.anim,
          // });
        }}else{
          // console.log("befor condition:::::::::"+marval+" "+mdrval+" "+parseInt(marval,2)%2+" "+buildCTX+" "+isNaN(marval)+" "+isNaN(mdrval))
          if(parseInt(marval,2)%2===0 & buildCTX===1 & !marval.toString().includes("NaN") & !marval.toString().includes("undefined") & !mdrval.toString().includes("NaN") & !mdrval.toString().includes("undefined") ){
            marval=parseInt(marval,2).toString(16);
            // console.log("after condition:::::::::"+marval+mdrval)
            Contextarray.push(marval);
            Contextarray.push(mdrval);
          }
          // isNaN(marval)==false &  (isNaN(mdrval)==false | mdrval.toString().includes("a") | mdrval.toString().includes("b") | mdrval.toString().includes("c") | mdrval.toString().includes("d") | mdrval.toString().includes("e") | mdrval.toString().includes("f"))
      }
    }
    push(value) {
    this.instructionBytes.push(value);
    }
    shift() {
    return this.instructionBytes.shift();//in hexa
    }
    getinstwithoutshift(){//this one is used to get the instruction in head of the list without loosing it not like shift , and it is used in RI animation
      return this.instructionBytes[0];//in hexa
    }
    /////this one is for test reasons
    instructionset(hexains){
        this.instructionBytes=hexains;//in hexa
    }
    clear(animations){
      this.instructionBytes=[];
      animations.push({
        value:"",
        target:"",
        time:300,
        anim:()=>{
          gsap.to(".queue6",{opacity:"0" ,duration:0.3* nsp()});
          gsap.to(".queue5",{opacity:"0" ,duration:0.3* nsp()});
          gsap.to(".queue4",{opacity:"0" ,duration:0.3* nsp()});
          gsap.to(".queue3",{opacity:"0" ,duration:0.3* nsp()});
          gsap.to(".queue2",{opacity:"0" ,duration:0.3* nsp()});
          gsap.to(".queue1",{opacity:"0" ,duration:0.3* nsp()});
        },
    })
    }
    log(){
      return this.instructionBytes;
    }
    ////////////////
}
export default Queue;