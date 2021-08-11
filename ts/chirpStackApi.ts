import { LoraWanDevice } from "./LoraWanDevice";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface ChirpStackApiConfig {
  url: string
  token: string
  applicationID: string
}
export interface DeviceRespProfile {
  devEUI: string,
  name: string,
  applicationID: string,
  description: string,
  deviceProfileID: string,
  deviceProfileName: string,
  deviceStatusBattery: number,
  deviceStatusMargin: number,
  deviceStatusExternalPowerSource: boolean,
  deviceStatusBatteryLevelUnavailable: boolean,
  deviceStatusBatteryLevel: number,
  lastSeenAt: string | null
}
// {
//   "deviceKeys": {
//     "appKey": "string",
//     "devEUI": "string",
//     "genAppKey": "string",
//     "nwkKey": "string"
//   }
// }
export interface DeviceKeys {
  "deviceKeys": {
    appKey?: string,
    devEUI: string,
    genAppKey?: string,
    nwkKey: string
  }
}

// for LoraWan 1.0.x 
// nwkKey is app key
// {deviceKeys: {nwkKey: "e11e195840ec0369b9c0902b6d817cc8", devEUI: "6c60d6c41c5c144c"}}
export class ChirpStackApi {
  private config: ChirpStackApiConfig
  private axios: AxiosInstance;
  constructor()
  constructor(api_info: ChirpStackApiConfig)
  constructor(api_info?: ChirpStackApiConfig) {
    const default_api_info = {
      url: "http://nyan.one:8082/api",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiODliNGVhM2YtNGNlYS00NDcyLTllMjItYmVlNDY4MWUzOThmIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYyMzczNDQwNCwic3ViIjoiYXBpX2tleSJ9.J6JZYcMYYtPXSFjGs2RsVW6k7-r7bU8OHHdKMH1UESM",
      applicationID: "2"
    }
    this.config = api_info ? { ...default_api_info, ...api_info } : default_api_info
    this.axios = axios.create({
      baseURL: this.config.url,
      timeout: 2000,
      headers: {
        "Authorization": "Bearer " + this.config.token
      }
    })
  }
  // async initialize() {
  //   this.device_list = await this.getRemoteDeviceInfo()
  // }

  public getRemoteDeviceList(limit: number): Promise<DeviceRespProfile[]> {
    return new Promise((resolve, reject) => {
      this.axios.get('/devices', {
        params: {
          "applicationID": this.config.applicationID,
          "limit": limit
        }
      }).then((response) => {
        // console.log(response.data)
        resolve(response.data.result)
      }).catch((error) => {
        reject(error)
      })
    })
  }
  public async postDevice(device: LoraWanDevice): Promise<AxiosResponse> {
    // omit appKey
    let postContent = { "device": (({ appKey, ...obj }) => obj)(device) }
    return new Promise((resolve, reject) => {
      this.axios.post('/devices', postContent, { params: { applicationID: device.applicationID } })
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  }
  public async postDeviceKey(device: LoraWanDevice): Promise<AxiosResponse> {
    let postContent: DeviceKeys = {
      "deviceKeys": {
        nwkKey: device.appKey,
        devEUI: device.devEUI
      }
    }
    return new Promise((resolve, reject) => {
      this.axios.post(`/devices/${device.devEUI}/keys`, postContent, { params: { applicationID: device.applicationID } })
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  }
}