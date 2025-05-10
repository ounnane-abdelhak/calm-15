import { Register } from "./Register";

class IOController {
    constructor() {
        this.MAR = new Register();
        this.CC = 0;
    }
    setMAR(value) {
        this.MAR.setvalue(value);
    }
    getMAR() {
        return this.MAR;
    }
    setCC(value) {
        this.CC = value;
    }
    getCC() {
        return this.CC;
    }
}

class IOUnit {
    constructor() {
        this.ioController = new IOController();
        this.buffer = new Register();
    }
    getBuffer() {
        return this.buffer.value;
    }
    setBuffer(value) {
        this.buffer.setvalue(value);
    }
}

export default IOUnit;
