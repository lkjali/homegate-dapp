import {Component, OnInit, ViewChild} from '@angular/core';
import {Mietvertrag} from "../shared/mietvertrag.model";
import {MietvertragService} from "../mietobjekt-verkauf/mietvertrag.service";
import {NgForm} from "@angular/forms";
import {Interessent} from "../shared/interessent.model";

@Component({
  selector: 'mietobjekt-bewerbung',
  templateUrl: './mietobjekt-bewerbung.component.html',
  styleUrls: ['./mietobjekt-bewerbung.component.css']
})
export class MietobjektBewerbungComponent implements OnInit {
  @ViewChild('f') moForm: NgForm;

  mietvertraege: Mietvertrag[];

  constructor(private mvService: MietvertragService) { }

  ngOnInit() {
    this.mietvertraege = this.mvService.getMietvertraege();
  }

  onSubmit(form: NgForm, index: number) {
    const value = form.value;
    const interessentenName = value.bewerberName;
    const interessentenAdresse = value.bewerberAddress;
    this.mvService.addInteressent(index, new Interessent(interessentenName, interessentenAdresse, false, false));

    form.reset();
  }

  onClickAbschliessen(interessentIndex: number, vertragIndex: number) {
    this.mvService.signContract(vertragIndex, interessentIndex);
  }

}
