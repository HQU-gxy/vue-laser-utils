"use strict";
// typescript Type definition is installed automatically
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingMsg = exports.HitMsg = exports.Msg = void 0;
// const myPingMsg=new PingMsg({
//   id:123,
//   ammo:96,
//   latitude:4213.3213,
//   longitude:12333.5555,
//   helmet_hit:0,
//   armor_hit:0
// })
// console.log(myPingMsg.stringify())
// const myHitMsg=new HitMsg({
//   id_target:123,
//   id_fire_from:456,
//   body_part:0b01000000
// })
// console.log(myHitMsg.stringify())
class Msg {
    constructor() {
        this.msg = new Uint8Array;
    }
    print() {
        this.msg.forEach(num => { console.log(num.toString(16).padStart(2, '0')); });
    }
    stringify() {
        let string_buffer = "";
        this.msg.forEach(num => { string_buffer += num.toString(16).padStart(2, '0'); });
        return string_buffer;
    }
    uint16ToUint8Array(num) {
        const low_octave = num & 0xff;
        const high_octave = (num & 0xff00) >> 8;
        const array = new Uint8Array([high_octave, low_octave]);
        return array;
    }
}
exports.Msg = Msg;
class HitMsg extends Msg {
    constructor(msg) {
        super();
        this.id_target = msg.id_target;
        this.id_fire = msg.id_fire_from;
        this.body_part = msg.body_part;
        this.msg = this.hexlifyMsg();
    }
    hexlifyMsg() {
        return new Uint8Array([
            (this.body_part & 0xff),
            ...this.uint16ToUint8Array(this.id_fire),
            ...this.uint16ToUint8Array(this.id_target),
            0x5b
        ]);
    }
}
exports.HitMsg = HitMsg;
class PingMsg extends Msg {
    // private redundancy: number;
    constructor(msg) {
        super();
        this.ammo = msg.ammo;
        this.helmet_hit = msg.helmet_hit;
        this.armor_hit = msg.armor_hit;
        this.latitude = msg.latitude;
        this.longitude = msg.longitude;
        this.id = msg.id;
        this.msg = this.hexlifyMsg();
    }
    hexlifyId() {
        return this.uint16ToUint8Array(this.id);
    }
    hexlifyLatitude() {
        const high_double_byte = Math.floor(this.latitude * 100);
        const low_double_byte = Math.floor((this.latitude * 100 - high_double_byte) * 10000);
        const high_double_byte_array = this.uint16ToUint8Array(high_double_byte);
        const low_double_byte_array = this.uint16ToUint8Array(low_double_byte);
        return (new Uint8Array([...high_double_byte_array, ...low_double_byte_array]));
    }
    hexlifyLongitude() {
        const high_double_byte = Math.floor(this.longitude * 100);
        const low_double_byte = Math.floor((this.longitude * 100 - high_double_byte) * 10000);
        const high_double_byte_array = this.uint16ToUint8Array(high_double_byte);
        const low_double_byte_array = this.uint16ToUint8Array(low_double_byte);
        return (new Uint8Array([...high_double_byte_array, ...low_double_byte_array]));
    }
    hexlifyMsg() {
        return (new Uint8Array([0x00, this.ammo, this.helmet_hit, this.armor_hit,
            ...this.hexlifyLongitude(), ...this.hexlifyLatitude(),
            ...this.hexlifyId(), 0x8a]));
    }
}
exports.PingMsg = PingMsg;
//# sourceMappingURL=msgGen.js.map