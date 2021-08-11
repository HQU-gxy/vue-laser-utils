import { LoraUtils } from "./utils"
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

export interface DeviceProfile {
  applicationID?: string,
  appKey?: string,
  description?: string,
  devEUI?: string,
  deviceProfileID?: string,
  isDisabled?: boolean,
  name?: string,
  referenceAltitude?: number,
  skipFCntCheck?: boolean,
  tags?: Record<string, unknown>,
  variables?: Record<string, unknown>,
}

export class LoraWanDevice implements DeviceProfile {
  devEUI: string = LoraUtils.getRandomDevEui()
  appKey: string = LoraUtils.getRandomAppKey()
  applicationID = "2"
  description = "test"
  deviceProfileID = "70298761-1bf9-4a6c-bda1-69a0eb04aaaf"
  isDisabled = false
  skipFCntCheck = false
  name: string = LoraUtils.getRandomName()
  referenceAltitude = 0

  constructor()
  constructor(config?: DeviceProfile) {
    Object.assign(this, config)
  }
}
