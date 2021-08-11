"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoraWanDevice_1 = require("./LoraWanDevice");
const chirpStackApi_1 = require("./chirpStackApi");
const atSerial_1 = require("./atSerial");
const api = new chirpStackApi_1.ChirpStackApi();
const atSerial = new atSerial_1.AtSerial(115200);
const device = new LoraWanDevice_1.LoraWanDevice;
const port = "COM4";
async function postToChirpStack() {
    console.log((await api.postDevice(device)).data);
}
https: //developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 console.log(device);
atSerial.listPorts().then(portList => console.log(portList));
// atSerial.atVersion(port)
// 	.then(console.log)
// 	.catch(err => console.log(err))
// atSerial.listPorts().then(console.log)
atSerial.atVersion(port)
    .then(console.log)
    .then(() => atSerial.atDevEUI(port, device))
    .then(console.log)
    .then(() => atSerial.atAppKey(port, device))
    .then(console.log)
    .then(() => api.postDevice(device))
    .then((resp) => console.log(resp.data))
    .then(() => api.postDeviceKey(device))
    .then((resp) => console.log(resp.data))
    .catch(err => console.log(err));
// Or use Promise.all
//# sourceMappingURL=index.js.map