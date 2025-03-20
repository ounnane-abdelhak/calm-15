import { Register } from "./Register";

class IOController {
    constructor() {}
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
