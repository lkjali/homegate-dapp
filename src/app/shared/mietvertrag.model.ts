import {Mietgegenstand} from "./mietgegenstand.model";
import {Miete} from "./miete.model";
import {Konditionen} from "./konditionen.model";
import {Status} from "./status.model";
import {Interessent} from "./interessent.model";

export class Mietvertrag {

  constructor(
    public index: number,
    public mietgegenstand: Mietgegenstand,
    public miete: Miete,
    public konditionen: Konditionen,
    public vermieter: string,
    public mieter: string,
    public mietbeginn: string,
    public imagePath: string,
    public schlussbetrag: number,
    public status: Status,
    public statusString: string,
    public interessenten: Interessent[]
  ) {  }

}
