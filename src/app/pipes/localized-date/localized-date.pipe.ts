import { Pipe, PipeTransform, InjectionToken } from "@angular/core";
import { DatePipe } from "@angular/common";
import { DateAdapter, MatDateFormats } from "@angular/material/core";
import { TranslateService } from "@ngx-translate/core";
import { Moment } from "moment";

export const DATE_FORMATS = new InjectionToken<MatDateFormats>("date-formats");
export const TIME_FORMATS = new InjectionToken<MatDateFormats>("time-formats");

@Pipe({
  name: "localizedDate",
  pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService, public adapter: DateAdapter<Moment>) {}

  transform(value: any, pattern = "medium"): any {
    const date = this.adapter.deserialize(value);
    const isValidDate = this.getValidDateTimeOrNull(date);
    if (isValidDate) {
      const datePipe = new DatePipe(this.translateService?.currentLang || "en");
      return datePipe.transform(value, pattern);
    } else {
      return value ? value : "";
    }
  }

  private getValidDateTimeOrNull(obj: any): Moment | null {
    return this.adapter.isDateInstance(obj) && this.adapter.isValid(obj) ? obj : null;
  }
}
