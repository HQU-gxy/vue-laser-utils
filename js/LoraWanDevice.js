"use strict";
// {
//   "device": {
//     "applicationID": "string",
//     "description": "string",
//     "devEUI": "string",
//     "deviceProfileID": "string",
//     "isDisabled": true,
//     "name": "string",
//     "referenceAltitude": 0,
//     "skipFCntCheck": true,
//     "tags": {},
//     "variables": {}
//   }
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoraWanDevice = void 0;
class LoraWanDevice {
    constructor(config) {
        this.devEUI = this.getRandomDevEui();
        this.appKey = this.getRandomAppKey();
        this.applicationID = "2";
        this.description = "test";
        this.deviceProfileID = "70298761-1bf9-4a6c-bda1-69a0eb04aaaf";
        this.isDisabled = false;
        this.skipFCntCheck = false;
        this.name = this.getRandomName();
        this.referenceAltitude = 0;
        Object.assign(this, config);
    }
    getRandomName() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    getRandomHexHalfOctet() {
        return (Math.random() * 0xF << 0).toString(16);
    }
    getRandomHex(bits) {
        let hex_string = "";
        for (let i = 0; i < (Math.floor(bits / 4)); i++) {
            hex_string += this.getRandomHexHalfOctet();
        }
        return hex_string;
    }
    getRandomDevEui() {
        return this.getRandomHex(64);
    }
    getRandomAppKey() {
        return this.getRandomHex(128);
    }
}
exports.LoraWanDevice = LoraWanDevice;
//# sourceMappingURL=LoraWanDevice.js.map