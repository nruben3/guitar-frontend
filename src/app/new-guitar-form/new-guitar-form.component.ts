import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { GuitarService } from '../services/guitar.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-guitar-form',
  templateUrl: './new-guitar-form.component.html',
  styleUrls: ['./new-guitar-form.component.css']
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
        this.guitarFormGroup.addControl(field, new FormControl(''))
      }
    }
  }

  onSubmit(): void {
    console.log(this.guitarFormGroup.value)
    this.guitarService.addGuitar(this.guitarFormGroup.value).subscribe((response: any) => {
      if (response) {
        console.log(response.brand + " " + response.model + " was added!")
      }
      this.guitarFormGroup.reset()
      this.formSubmitted.emit()
    })
  }
}
