import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MietvertragService} from "../../mietvertrag.service";
import {Mietvertrag} from "../../../shared/mietvertrag.model";

@Component({
  selector: 'mietobjekt-item',
  templateUrl: './mietobjekt-item.component.html',
  styleUrls: ['./mietobjekt-item.component.css']
})
export class MietobjektItemComponent implements OnInit, OnChanges {

  @Input() mietvertrag: Mietvertrag;

  mieterName: string;

  constructor(private mvService: MietvertragService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.mieterName = this.mietvertrag.mieter;
  }

  onClickSelektiert(interessentenIndex: number) {
    this.mvService.selectInteressent(this.mietvertrag.index, interessentenIndex);
  }

}
