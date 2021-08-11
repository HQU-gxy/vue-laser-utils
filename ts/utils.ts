export class LoraUtils {
  static getRandomName(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  static getRandomHexHalfOctet(): string {
    // eslint-disable-next-line no-bitwise
    return (Math.random() * 0xF << 0).toString(16)
  }

  static getRandomHex(bits: number): string {
    let hex_string = ""
    for (let i = 0; i < (Math.floor(bits / 4)); i++) {
      hex_string += LoraUtils.getRandomHexHalfOctet()
    }
    return hex_string
  }

  static getRandomDevEui(): string {
    return LoraUtils.getRandomHex(64)
  }

  static getRandomAppKey(): string {
    return LoraUtils.getRandomHex(128)
  }
  static uint16ToUint8Array(num: number): Uint8Array {
    // It's a must to use a bitwise
    // eslint-disable-next-line no-bitwise
    const low_octave = num & 0xff
    // eslint-disable-next-line no-bitwise
    const high_octave = (num & 0xff00) >> 8
    return new Uint8Array([high_octave, low_octave])
  }
}
