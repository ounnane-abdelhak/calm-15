import { Register } from "./Register.js";
import Cache from "./Cache.js";
class MC {
  constructor() {
    this.rim = new Register();
    this.ram = new Register();
    this.stack = new Array(65535); //size à revoir
    this.data = new Array(65535);
    this.code = new Array(65535);
    this.cache = new Cache(6553);
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

    if (isCode) {
      this.rim = this.code[address];
    } else {
      let cachedData = this.cache.get(address);

      //Check if data exists in cache
      if (cachedData !== undefined && cachedData !== "00000000") {
        this.rim = cachedData; // Cache Hit
        return;
      }

      // Cache Miss then Load from Memory
      this.rim = this.data[address];

      //Store in Cache
      // this.cache.set(address, this.rim);
    }
  }

  //Store in both main memory & cache

  initialize() {
    let address = parseInt(this.ram, 2);
    this.data[address] = this.rim;
  }

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
