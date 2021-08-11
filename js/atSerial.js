"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtSerial = void 0;
const SerialPort = require("serialPort");
class AtSerial {
    constructor(baudRate = 115200) {
        this.baudRate = baudRate;
    }
    async listPorts() {
        return new Promise((resolve, reject) => {
            let portList = [];
            SerialPort.list()
                .then((ports) => {
                ports.forEach((port) => portList.push(port.path));
                resolve(portList);
            })
                .catch((err) => reject(err));
        });
    }
    async atOneLine(path, command) {
        return new Promise((resolve, reject) => {
            const serial = new SerialPort(path, { autoOpen: false, baudRate: this.baudRate, dataBits: 8 });
            const readLineParser = new SerialPort.parsers.Readline({
                delimiter: "\r\n",
            });
            serial.open(); //maybe we don't need to open the serial port every time
            serial.pipe(readLineParser);
            serial.write(command, () => {
                readLineParser.on("data", (data) => {
                    data;
                    if (data.includes("ERROR")) {
                        reject(new Error(data));
                    }
                    resolve(data);
                    serial.close();
                });
                setTimeout(() => {
                    reject(new Error("Time Out"));
                }, 5000);
            });
        });
    }
    async atVersion(path) {
        return this.atOneLine(path, "at+version\r\n");
    }
    async atJoin(path) {
        return this.atOneLine(path, "at+join\r\n");
    }
    async atDevEUI(path, device) {
        return this.atOneLine(path, `at+set_config=lora:dev_eui:${device.devEUI}\r\n`);
    }
    async atAppKey(path, device) {
        return this.atOneLine(path, `at+set_config=lora:app_key:${device.appKey}\r\n`);
    }
    async atSendMsg(path, msg, fport = 1) {
        return this.atOneLine(path, `at+send=lora:${fport}:${msg.stringify()}\r\n`);
    }
}
exports.AtSerial = AtSerial;
//# sourceMappingURL=atSerial.js.map