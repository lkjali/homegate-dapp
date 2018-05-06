import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MietobjektVerkaufComponent } from './mietobjekt-verkauf/mietobjekt-verkauf.component';
import { MietobjektBewerbungComponent } from './mietobjekt-bewerbung/mietobjekt-bewerbung.component';
import { MietobjektListComponent } from './mietobjekt-verkauf/mietobjekt-list/mietobjekt-list.component';
import { MietobjektItemComponent } from './mietobjekt-verkauf/mietobjekt-list/mietobjekt-item/mietobjekt-item.component';
import { MietobjektFormComponent } from './mietobjekt-verkauf/mietobjekt-form/mietobjekt-form.component';
import {SmartcontractService} from "./shared/smartcontract.service";
import {MietvertragService} from "./mietobjekt-verkauf/mietvertrag.service";
import {StatuscolorDirective} from "./shared/statuscolor.directive";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MietobjektVerkaufComponent,
    MietobjektBewerbungComponent,
    MietobjektListComponent,
    MietobjektItemComponent,
    MietobjektFormComponent,
    StatuscolorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [SmartcontractService, MietvertragService],
  bootstrap: [AppComponent]
})
export class AppModule { }
