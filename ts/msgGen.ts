export class Msg {
  protected msg: Uint8Array = new Uint8Array()
  public print(): void {
    this.msg.forEach((num) => {
      console.log(num.toString(16).padStart(2, "0"))
    })
  }
  public stringify(): string {
    let string_buffer = ""
    this.msg.forEach((num) => {
      string_buffer += num.toString(16).padStart(2, "0")
    })
    return string_buffer
  }
  protected uint16ToUint8Array(num: number): Uint8Array {
    const low_octave = num & 0xff
    const high_octave = (num & 0xff00) >> 8
    const array = new Uint8Array([high_octave, low_octave])
    return array
  }
}

export interface HitInit {
  id_target: number
  id_fire_from: number
  body_part: number
}

export class HitMsg extends Msg {
  private id_target: number
  private id_fire: number
  private body_part: number
  constructor(msg: HitInit) {
    super()
    this.id_target = msg.id_target
    this.id_fire = msg.id_fire_from
    this.body_part = msg.body_part
    this.msg = this.hexlifyMsg()
  }
  private hexlifyMsg(): Uint8Array {
    return new Uint8Array([
      this.body_part & 0xff,
      ...this.uint16ToUint8Array(this.id_fire),
      ...this.uint16ToUint8Array(this.id_target),
      0x5b,
    ])
  }
}

export interface PingInit {
  ammo: number
  helmet_hit: number
  armor_hit: number
  latitude: number
  longitude: number
  id: number
}

export class PingMsg extends Msg {
  private ammo: number
  private helmet_hit: number
  private armor_hit: number
  private latitude: number
  private longitude: number
  private id: number
  // private redundancy: number;

  constructor(msg: PingInit) {
    super()
    this.ammo = msg.ammo
    this.helmet_hit = msg.helmet_hit
    this.armor_hit = msg.armor_hit
    this.latitude = msg.latitude
    this.longitude = msg.longitude
    this.id = msg.id
    this.msg = this.hexlifyMsg()
  }

  private hexlifyId(): Uint8Array {
    return this.uint16ToUint8Array(this.id)
  }
  private hexlifyLatitude(): Uint8Array {
    const high_double_byte = Math.floor(this.latitude * 100)
    const low_double_byte = Math.floor(
      (this.latitude * 100 - high_double_byte) * 10000,
    )
    const high_double_byte_array = this.uint16ToUint8Array(high_double_byte)
    const low_double_byte_array = this.uint16ToUint8Array(low_double_byte)
    return new Uint8Array([...high_double_byte_array, ...low_double_byte_array])
  }
  private hexlifyLongitude(): Uint8Array {
    const high_double_byte = Math.floor(this.longitude * 100)
    const low_double_byte = Math.floor(
      (this.longitude * 100 - high_double_byte) * 10000,
    )
    const high_double_byte_array = this.uint16ToUint8Array(high_double_byte)
    const low_double_byte_array = this.uint16ToUint8Array(low_double_byte)
    return new Uint8Array([...high_double_byte_array, ...low_double_byte_array])
  }
  private hexlifyMsg(): Uint8Array {
    return new Uint8Array([
      0x00,
      this.ammo,
      this.helmet_hit,
      this.armor_hit,
      ...this.hexlifyLongitude(),
      ...this.hexlifyLatitude(),
      ...this.hexlifyId(),
      0x8a,
    ])
  }
}
