import { Register } from "./Register";

class IOController {
    constructor() {}
}

class IOUnit {
    constructor() {
        this.ioController = new IOController();
        this.buffer = [
            new Register(),
            new Register(),
            new Register(),
            new Register()
        ];
    }
    getBuffer() {
        return this.buffer;
    }
    setBuffer(value) {
        this.buffer.setvalue(value);
    }
}

export default IOUnit;
