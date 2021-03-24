import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "cie-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  @Input() required: boolean;
  @Input() isDisabled = false;
  @Input() isColor: string;
  @Input() isIcon: boolean;
  @Input() iconName: string;

  @Output() clicked = new EventEmitter<any>();

  onClickButton(event: any) {
    this.clicked.emit(event);
  }
}
