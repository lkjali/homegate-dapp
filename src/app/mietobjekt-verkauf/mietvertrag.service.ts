import {Mietvertrag} from "../shared/mietvertrag.model";
import {Mietgegenstand} from "../shared/mietgegenstand.model";
import {Miete} from "../shared/miete.model";
import {Konditionen} from "../shared/konditionen.model";
import {Status} from "../shared/status.model";
import {Interessent} from "../shared/interessent.model";
import {SmartcontractService} from "../shared/smartcontract.service";
import {Injectable} from "@angular/core";

@Injectable()
export class MietvertragService {

  counter: number = 1;

  private mietvertraege: Mietvertrag[] = [
    new Mietvertrag(0,
      new Mietgegenstand(2, 103, '8952 Schlieren'),
      new Miete(4000, 2000, 10),
      new Konditionen('5 Monate', true), null, null, '01.10.2018',
      'https://static.dezeen.com/uploads/2018/03/window-on-the-lake-yh2-architecture-residential-canada_dezeen_2364_col_17.jpg',
      null, Status.selektiert, Status[Status.selektiert],
      [new Interessent('Rob', 'I3', false, true), new Interessent('Mary', 'I4', true, false), new Interessent('Tom', 'I5', false, false)])
  ];

  constructor(private scService: SmartcontractService) { }

  getMietvertraege() {
    return this.mietvertraege;
  }

  addMietvertrag(mietvertrag: Mietvertrag) {
    mietvertrag.index = this.counter;
    this.mietvertraege.push(mietvertrag);
    this.counter++;
  }

  addInteressent(vertragIndex: number, interessent: Interessent) {
    var hasBet = this.scService.addInteressent(interessent.name);
    interessent.hasBetreibungen = hasBet;
    this.mietvertraege[vertragIndex].interessenten.push(interessent);
  }

  selectInteressent(vertragIndex: number, interessentIndex: number) {
    this.mietvertraege[vertragIndex].interessenten[interessentIndex].isSelected = true;
    var name =  this.mietvertraege[vertragIndex].interessenten[interessentIndex].name;
    this.scService.selectInteressent(name);
    this.updateStatus(vertragIndex);
  }

  signContract(vertragIndex: number, interessentIndex: number) {
    this.mietvertraege[vertragIndex].mieter = this.mietvertraege[vertragIndex].interessenten[interessentIndex].name;
    let name: string = this.mietvertraege[vertragIndex].interessenten[interessentIndex].name;
    let kaution: number = this.mietvertraege[vertragIndex].miete.mietkaution;
    this.scService.signContract(name, kaution);
    this.updateStatus(vertragIndex);
  }

  updateStatus(index: number) {
    var status = this.scService.getContractStatus();
    this.mietvertraege[index].status = status;
    this.mietvertraege[index].statusString = Status[status];
  }
}
