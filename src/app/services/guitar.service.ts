import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuitarService {
  private url = 'http://localhost:3100/api'
  
  constructor(private httpClient: HttpClient) { }

  getGuitars() {
    return this.httpClient.get(this.url + '/guitars')
  }

  addGuitar(guitar: Object) {
    return this.httpClient.post(this.url + '/guitars', guitar)
  }

  deleteGuitar(guitarId: String) {
    return this.httpClient.delete(this.url + '/guitars/' + guitarId)
  }

  getGuitarFields() {
    return this.httpClient.get<string[]>(this.url + '/guitars/fields')
  }
  
}
