import { LoraWanDevice } from "./LoraWanDevice"
import { ChirpStackApi } from "./chirpStackApi"
import { AtSerial } from "./atSerial"

const api = new ChirpStackApi()

const atSerial = new AtSerial(115200)
const device = new LoraWanDevice()
const port = "COM4"

// async function postToChirpStack() {
//   console.log((await api.postDevice(device)).data)
// }

/* https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions */

console.log(device)

AtSerial.listPorts().then((portList) => console.log(portList))

// atSerial.atVersion(port)
// .then(console.log)
// .catch(err => console.log(err))

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
  .catch((err) => console.log(err))

// Or use Promise.all
