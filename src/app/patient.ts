import { Condition } from './condition';
import { Etat } from "./etat";

export class Patient {

  id :string = '';
  name :string | undefined;
  etats :Etat[] = [];
  points! :any[];

  constructor(id :string, name :string) {
    this.id = id;
    this.name = name;
  }

  setPoints() {
    let array :any[] = [];
    this.etats.forEach(element => {
      array.push({x: element.temperature, y: element.saturation, name: this.name});
    });
    this.points = array;
  }

  checkSante(conditions :Condition[]) {
    for (let index = 0; index < conditions.length; index++) {
      const element = conditions[index];
      if (this.check(element)) {
        return element;
      }
    }
    return null;
  }

  check(condition :Condition) {
    const last = this.etats.at(this.etats.length - 1);
    return last
      && condition.temperature_min <= last?.temperature && last?.temperature <= condition.temperature_max
      && condition.saturation_min <= last?.saturation && last?.saturation <= condition.saturation_max
  }

  getEtatSante(conditions :Condition[]) {
    const condition = this.checkSante(conditions);
    switch (condition?.etat) {
      case 10:
        return 'rétablie'
      case -10:
        return 'critique'
      default:
        return 'indéterminée'
    }
  }

}
