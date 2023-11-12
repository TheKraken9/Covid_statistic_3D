export class Condition {

  _id!: string;
  _temperature_max!: number;
  _temperature_min!: number;
  _saturation_max!: number;
  _saturation_min!: number;
  _jour_debut!: number;
  _jour_fin!: number;
  _etat!: number;

  constructor(
    id: string,
    temperature_max: number,
    temperature_min: number,
    saturation_max: number,
    saturation_min: number,
    etat: number,
    jour_debut: number,
    jour_fin: number
  ) {
    this.id = id;
    this.temperature_max = temperature_max;
    this.temperature_min = temperature_min;
    this.saturation_max = saturation_max;
    this.saturation_min = saturation_min;
    this.etat = etat;
    this.jour_debut = jour_debut;
    this.jour_fin = jour_fin;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    // Add logic constraints
    if (value.length === 0) {
      throw new Error('ID cannot be empty.');
    }
    this._id = value;
  }

  get temperature_max(): number {
    return this._temperature_max;
  }

  set temperature_max(value: number | string) {
    // Add logic constraints
    value = Number(value);
    if (isNaN(value) || value < 30 || value > 50) throw new Error("Invalid value for temperature");
    if (value < this._temperature_min) {
      throw new Error('Maximum temperature cannot be less than minimum temperature.');
    }
    this._temperature_max = value;
  }

  get temperature_min(): number {
    return this._temperature_min;
  }

  set temperature_min(value: number  | string) {
    // Add logic constraints
    value = Number(value)
    if (isNaN(value) || value < 30 || value > 50) throw new Error("Invalid value for temperature");
    if (value > this._temperature_max) {
      throw new Error('Minimum temperature cannot be greater than maximum temperature.');
    }
    this._temperature_min = value;
  }

  get saturation_max(): number {
    return this._saturation_max;
  }

  set saturation_max(value: number | string) {
    // Add logic constraints
    value = Number(value)
    if (isNaN(value) || value < 0 || value > 100) throw new Error("Invalid value for saturation");
    if (value < this._saturation_min) {
      throw new Error('Maximum saturation cannot be less than minimum saturation.');
    }
    this._saturation_max = value;
  }

  get saturation_min(): number {
    return this._saturation_min;
  }

  set saturation_min(value: number | string) {
    // Add logic constraints
    value = Number(value)
    if (isNaN(value) || value < 0 || value > 100) throw new Error("Invalid value for saturation");
    if (value > this._saturation_max) {
      throw new Error('Minimum saturation cannot be greater than maximum saturation.');
    }
    this._saturation_min = value;
  }

  get etat(): number {
    return this._etat;
  }

  set etat(value: number | string) {
    // Add logic constraints
    value = Number(value)
    this._etat = value;
  }

  get jour_debut(): number {
    return this._jour_debut;
  }

  set jour_debut(value: number | string) {
    // Add logic constraints
    value = Number(value)
    if (value < 0 || value > 100) {
      throw new Error('Jour_debut must be between 0 and 100.');
    }
    this._jour_debut = value;
  }

  get jour_fin(): number {
    return this._jour_fin;
  }

  set jour_fin(value: number | string) {
    // Add logic constraints
    value = Number(value)
    if (value < 0 || value > 100) {
      throw new Error('Jour_fin must be between 0 and 100.');
    }
    this._jour_fin = value;
  }

  getPointsSquarre() {
    return [[this._temperature_min, this._saturation_min], [this._temperature_min, this._saturation_max], [this._temperature_max, this._saturation_max] , [this._temperature_max, this._saturation_min]];
  }

  getColor() {
    switch (this._etat) {
      case 10:
        return '#33FF00';
      case 0:
        return '#FFFF33';
      case -10:
        return '#CC0033';
      default:
        return '#000000';
    }
  }

  getWidth() {
    return (this.temperature_max - this.temperature_min) / 10;
  }

  getHeight() {
    return (this.saturation_max - this.saturation_min) / 10;
  }

  getDepth() {
    return this.jour_fin - this.jour_debut;
  }

  getOrigin() {
    return {x: (this.temperature_min / 10) + (this.getWidth() / 2), y: this.saturation_min / 10 + (this.getHeight() / 2), z: this.jour_debut + (this.getDepth() / 2)};
  }
}
