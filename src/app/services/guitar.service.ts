import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class GuitarService {
  private url = environment.apiURL
  
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
