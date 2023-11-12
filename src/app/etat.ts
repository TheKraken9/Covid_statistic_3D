import { Patient } from './patient';

export class Etat {

  _id!: string;
  _day!: number;
  _temperature!: number;
  _saturation!: number;
  _patient!: Patient;

  // getter and setter for all attributes
  set id(id: string) {
    this._id = id
  }

  get id() {
    return this._id;
  }

  set day(day: number | string) {
    let value = Number(day);
    if (isNaN(value) || value < 0) throw new Error("Invalid value for day");
    this._day = value;
  }

  get day(): number {
    return this._day
  }

  set temperature(temperature: number | string) {
    let value = Number(temperature);
    if (isNaN(value) || value < 30) throw new Error("Invalid value for temperature");
    this._temperature = value
  }

  get temperature(): number {
    return this._temperature
  }

  set saturation(saturation: number | string) {
    let value = Number(saturation);
    if (isNaN(value) || value < 0 || value > 100) throw new Error("Invalid value for saturation");
    this._saturation = value
  }

  get saturation(): number {
    return this._saturation
  }

  set patient(patient: Patient) {
    this._patient = patient;
  }

  get patient(): Patient {
    return this._patient
  }

  constructor(id :string, day :number, temperature :number, saturation :number, patient :Patient) {
    this.id = id;
    this.day = day;
    this.temperature = temperature;
    this.saturation = saturation;
    this.patient = patient;
  }
}
