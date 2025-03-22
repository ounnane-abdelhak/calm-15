import { Register } from "./Register.js";
import { memory } from "./mess.js";
import Cache from "./Cache.js";
class MC {
  constructor() {
    this.rim = new Register();
    this.ram = new Register();
    this.stack =new Array(100); //size à revoir
    this.data =new Array(100);
    this.code =new Array(100);
    this.cache = new Cache(10);
  }

  setcode(code) {
    this.code = code;
  }
  setRim(val) {
    //val in hexa
    this.rim = val;
  }
  setRam(adr) {
    //val in decimal
    this.ram = adr;
  }
  getRam() {
    return this.ram;
  }
  getRim() {
    return this.rim;
  }
  read(isCode) {
    let address = parseInt(this.ram, 2);

    //Check if data exists in cache
    let cachedData = this.cache.get(address);
    if (cachedData !== undefined) {
      this.rim = cachedData; // Cache Hit
      return;
    }

    // Cache Miss then Load from Memory
    if (isCode) {
      this.rim = this.code[address];
    } else {
      this.rim = this.data[address];
    }

    //Store in Cache
    this.cache.set(address, this.rim);
  }

  //Store in both main memory & cache
  write() {
    let address = parseInt(this.ram, 2);
    this.data[address] = this.rim;

    //Store in Cache
    this.cache.set(address, this.rim);
  }

  popval() {
    this.rim = this.stack.pop();
  }

  pushval() {
    this.stack.push(this.rim);
  }

  getData() {
    return this.data;
  }

  getstack() {
    return this.stack;
  }
}

export default MC;
