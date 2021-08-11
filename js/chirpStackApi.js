"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChirpStackApi = void 0;
const axios_1 = require("axios");
// for LoraWan 1.0.x 
// nwkKey is app key
// {deviceKeys: {nwkKey: "e11e195840ec0369b9c0902b6d817cc8", devEUI: "6c60d6c41c5c144c"}}
class ChirpStackApi {
    constructor(api_info) {
        const default_api_info = {
            url: "http://nyan.one:8082/api",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiODliNGVhM2YtNGNlYS00NDcyLTllMjItYmVlNDY4MWUzOThmIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYyMzczNDQwNCwic3ViIjoiYXBpX2tleSJ9.J6JZYcMYYtPXSFjGs2RsVW6k7-r7bU8OHHdKMH1UESM",
            applicationID: "2"
        };
        this.config = api_info ? Object.assign(Object.assign({}, default_api_info), api_info) : default_api_info;
        this.axios = axios_1.default.create({
            baseURL: this.config.url,
            timeout: 2000,
            headers: {
                "Authorization": "Bearer " + this.config.token
            }
        });
    }
    // async initialize() {
    //   this.device_list = await this.getRemoteDeviceInfo()
    // }
    getRemoteDeviceList(limit) {
        return new Promise((resolve, reject) => {
            this.axios.get('/devices', {
                params: {
                    "applicationID": this.config.applicationID,
                    "limit": limit
                }
            }).then((response) => {
                // console.log(response.data)
                resolve(response.data.result);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    async postDevice(device) {
        // omit appKey
        let postContent = { "device": ((_a) => {
                var { appKey } = _a, obj = __rest(_a, ["appKey"]);
                return obj;
            })(device) };
        return new Promise((resolve, reject) => {
            this.axios.post('/devices', postContent, { params: { applicationID: device.applicationID } })
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }
    async postDeviceKey(device) {
        let postContent = {
            "deviceKeys": {
                nwkKey: device.appKey,
                devEUI: device.devEUI
            }
        };
        return new Promise((resolve, reject) => {
            this.axios.post(`/devices/${device.devEUI}/keys`, postContent, { params: { applicationID: device.applicationID } })
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }
}
exports.ChirpStackApi = ChirpStackApi;
//# sourceMappingURL=chirpStackApi.js.map