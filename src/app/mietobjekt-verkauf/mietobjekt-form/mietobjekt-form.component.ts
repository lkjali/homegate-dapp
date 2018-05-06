import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MietvertragService} from "../mietvertrag.service";
import {Mietgegenstand} from "../../shared/mietgegenstand.model";
import {Miete} from "../../shared/miete.model";
import {Konditionen} from "../../shared/konditionen.model";
import {Mietvertrag} from "../../shared/mietvertrag.model";
import {Status} from "../../shared/status.model";

@Component({
  selector: 'mietobjekt-form',
  templateUrl: './mietobjekt-form.component.html',
  styleUrls: ['./mietobjekt-form.component.css']
})
export class MietobjektFormComponent implements OnInit {
  @ViewChild('f') moForm: NgForm;
  showMessage: boolean;

  constructor(private mvService: MietvertragService) { }

  onSubmit(form: NgForm) {
    const value = form.value;

    const mg: Mietgegenstand = new Mietgegenstand(value.liegenschaftsnr, value.objektnr, value.adresse);
    const miete: Miete = new Miete(value.mietkaution, value.nettomiete, value.nebenkosten);
    const konditionen: Konditionen = new Konditionen(value.frist, value.haustiere === 'ja' ? true : false);
    const mietbeginn = value.mietbeginn;
    const imagePath = value.imgPath;

    this.mvService.addMietvertrag(new Mietvertrag(null, mg, miete, konditionen, null, null,
      mietbeginn, imagePath, null, Status.ausgeschrieben, Status[Status.ausgeschrieben],
      []));

    form.reset();

    setTimeout(()=>{
      this.showMessage = false;
    },4000);
    this.showMessage = true;
  }

  onClear() {
    this.moForm.reset();
  }

  ngOnInit() {
  }

}
