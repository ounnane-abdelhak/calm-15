import { Register } from "./Register.js"
import  {memory} from './mess.js';

class MC {
    constructor(){
    this.rim=new Register()
    this.ram=new Register() 
    this.stack =Array.from({ length: 50 }, () => "00000000");//size à revoir
    this.data = Array.from({ length: 50 }, () => "00000000");
    this.code = Array.from({ length: 50 }, () => "00000000");
    }

    setcode(code){
        this.code=code;
    }
    setRim (val){//val in hexa
    this.rim=val;
    }
    setRam (adr){//val in decimal
    this.ram=adr;
    }
    getRam(){
    return this.ram;
    }
    getRim (){
    return this.rim

    }
    read(iscode){
    if(iscode==1){
        this.rim=this.code[parseInt(this.ram,2)]
    }
    else{if(iscode==0){
        this.rim=this.data[parseInt(this.ram,2)]}else{if(iscode==2
        ){
            this.rim=this.label[parseInt(this.ram,2)]   }
        }
    }
    }
    write(){
        this.data[parseInt(this.ram,2)]=this.rim;
    }
    popval(){
    this.rim=this.stack.pop();
    }
    pushval(){
    this.stack.push(this.rim);
    }
    getData(){
        return this.data;
    }
    setData(off,val){
        this.data[off]=val

    }
    getstack(){
        return this.stack;
    }
}
export default MC;