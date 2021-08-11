import { LoraWanDevice } from "./LoraWanDevice"
import { Msg } from "./msgGen"
import SerialPort = require("serialPort")

export class AtSerial {
  private baudRate: number

  constructor(baudRate = 115200) {
    this.baudRate = baudRate
  }

  async listPorts(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const portList: string[] = []
      SerialPort.list()
        .then((ports) => {
          ports.forEach((port) => portList.push(port.path))
          resolve(portList)
        })
        .catch((err) => reject(err))
    })
  }
  private async atOneLine(path: string, command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const serial = new SerialPort(path, {
        autoOpen: false,
        baudRate: this.baudRate,
        dataBits: 8,
      })
      const readLineParser = new SerialPort.parsers.Readline({
        delimiter: "\r\n",
      })
      serial.open() //maybe we don't need to open the serial port every time
      serial.pipe(readLineParser)
      serial.write(command, () => {
        readLineParser.on("data", (data) => {
          data as string
          if (data.includes("ERROR")) {
            reject(new Error(data))
          }
          resolve(data)
          serial.close()
        })
        setTimeout(() => {
          reject(new Error("Time Out"))
        }, 5000)
      })
    })
  }
  async atVersion(path: string): Promise<string> {
    return this.atOneLine(path, "at+version\r\n")
  }
  async atJoin(path: string): Promise<string> {
    return this.atOneLine(path, "at+join\r\n")
  }
  async atDevEUI(path: string, device: LoraWanDevice): Promise<string> {
    return this.atOneLine(
      path,
      `at+set_config=lora:dev_eui:${device.devEUI}\r\n`,
    )
  }
  async atAppKey(path: string, device: LoraWanDevice): Promise<string> {
    return this.atOneLine(
      path,
      `at+set_config=lora:app_key:${device.appKey}\r\n`,
    )
  }
  async atSendMsg(path: string, msg: Msg, fport = 1): Promise<string> {
    return this.atOneLine(path, `at+send=lora:${fport}:${msg.stringify()}\r\n`)
  }
}
