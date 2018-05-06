import {Component, OnInit} from '@angular/core';
import {MietvertragService} from "../mietvertrag.service";
import {Mietvertrag} from "../../shared/mietvertrag.model";

@Component({
  selector: 'mietobjekt-list',
  templateUrl: './mietobjekt-list.component.html',
  styleUrls: ['./mietobjekt-list.component.css']
})
export class MietobjektListComponent implements OnInit{

  mietvertraege: Mietvertrag[];

  constructor(private moService: MietvertragService) { }

  ngOnInit() {
    this.mietvertraege = this.moService.getMietvertraege();
  }

}
