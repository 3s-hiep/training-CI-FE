import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
export interface Labels {
  placeholder: string;
  aria: string;
}

@Component({
  selector: "cie-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnInit, OnDestroy {
  @Input() labels: Labels;
  @Input() defaultValue?: string;
  @Output() value = new EventEmitter<string>();
  @Input() notValid?: boolean;
  @Input() message?: string;

  formControl = new FormControl("");
  alive: Subject<any> = new Subject();

  constructor() {}

  ngOnInit() {
    const defaultValue = this.defaultValue ? this.defaultValue : "";
    this.formControl.setValue(defaultValue);
    this.formControl.valueChanges.pipe(takeUntil(this.alive)).subscribe({
      next: (event) => {
        this.value.emit(event);
      },
    });
  }
  ngOnDestroy() {
    this.alive.next(true);
    this.alive.complete();
  }
}
