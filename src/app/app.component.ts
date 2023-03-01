import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GuitarService } from './services/guitar.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  
  constructor(private guitarService: GuitarService) {}
  
  title = "Noah's Guitars"
  guitars: any
  guitarSchema: any
  guitarTileFields: string[] = ['color', 'condition', 'price']

  ngOnInit(): void {

    this.guitarService.getGuitarFields().subscribe((response: any) => {
      this.guitarSchema = response
    })

    this.loadGuitarList()
  }

  loadGuitarList(): void {
    this.guitarService.getGuitars().subscribe((response) => {
      this.guitars = response
    })
  }

  onDelete(id: String) {
    this.guitarService.deleteGuitar(id).subscribe((response: any) => {
      if (response) {
        console.log(response)
      }
      this.loadGuitarList()
    })
  }

}
