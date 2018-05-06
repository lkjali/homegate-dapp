import {Directive, ElementRef, Input} from "@angular/core";
import {Status} from "./status.model";

@Directive({
  selector: '[statusColor]'
})
export class StatuscolorDirective {
  @Input('statusColor') value: Status;

  constructor(public el: ElementRef) {
  }

  ngOnChanges() {
    this.el.nativeElement.style.color = 'white';
    console.log(this.value);
    switch (+this.value) {
      case Status.ausgeschrieben:
        this.el.nativeElement.style.backgroundColor = 'blue';
        break;
      case Status.selektiert:
        this.el.nativeElement.style.backgroundColor = 'green';
        break;
      case Status.vermietet:
        this.el.nativeElement.style.backgroundColor = 'red';
        break;
      default:
        this.el.nativeElement.style.backgroundColor = 'red';
        break;
    }
  }

}
