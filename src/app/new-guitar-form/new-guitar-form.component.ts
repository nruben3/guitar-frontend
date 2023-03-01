import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { GuitarService } from '../services/guitar.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-new-guitar-form',
  templateUrl: './new-guitar-form.component.html',
  styleUrls: ['./new-guitar-form.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class NewGuitarFormComponent implements OnInit {

  constructor(private guitarService: GuitarService, private formBuilder: FormBuilder) { }

  guitarFormGroup: FormGroup = this.formBuilder.group({})
  guitarSchema: any

  @Output()
  formSubmitted: EventEmitter<string> = new EventEmitter<string>

  ngOnInit() {
    this.guitarService.getGuitarFields().subscribe((response: any) => {
      this.guitarSchema = response
      this.createForm()
    })
  }

  createForm() {
    for (let field of Object.keys(this.guitarSchema)) {
      if (!['_id', '__v'].includes(field)) {
        this.guitarFormGroup.addControl(field, new FormControl())
      }
    }
    this.guitarFormGroup.setControl('year', new FormControl(moment()))
  }

  onSubmit(): void {
    this.guitarFormGroup.setControl('year', new FormControl(this.guitarFormGroup.value['year']._d.getFullYear()))
    console.log(this.guitarFormGroup.value)
    this.guitarService.addGuitar(this.guitarFormGroup.value).subscribe((response: any) => {
      if (response) {
        console.log(response.brand + " " + response.model + " was added!")
      }
      this.guitarFormGroup.reset()
      this.formSubmitted.emit()
    })
  }

  chosenYearHandler(normalizedYear: Moment, dp: any) {
    const ctrlValue = this.guitarFormGroup.value['year'];
    ctrlValue.year(normalizedYear.year());
    this.guitarFormGroup.get('year')?.setValue(ctrlValue)
    dp.close();
  }
}
