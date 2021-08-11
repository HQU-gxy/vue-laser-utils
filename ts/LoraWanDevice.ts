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
  tags?: Record<string,unknown>,
  variables?: Record<string,unknown>,
}


export class LoraWanDevice implements DeviceProfile {
  devEUI: string = this.getRandomDevEui()
  appKey: string = this.getRandomAppKey()
  applicationID = "2"
  description = "test"
  deviceProfileID = "70298761-1bf9-4a6c-bda1-69a0eb04aaaf"
  isDisabled = false
  skipFCntCheck = false
  name: string = this.getRandomName()
  referenceAltitude = 0

  constructor()
  constructor(config: DeviceProfile)
  constructor(config?: DeviceProfile) {
    Object.assign(this, config)
  }
  private getRandomName(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  private getRandomHexHalfOctet(): string {
    return (Math.random() * 0xF << 0).toString(16)
  }
  private getRandomHex(bits: number): string {
    let hex_string = ""
    for (let i = 0; i < (Math.floor(bits / 4)); i++) {
      hex_string += this.getRandomHexHalfOctet()
    }
    return hex_string
  }
  private getRandomDevEui(): string {
    return this.getRandomHex(64)
  }
  private getRandomAppKey(): string {
    return this.getRandomHex(128)
  }
}