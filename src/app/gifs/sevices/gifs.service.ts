import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

// const GIPHY_API_KEY = 'uwb7lFfm3lg8zuKpTJnxVRF1FWkTXaJ5' PODRIA FUNCIONAR COMO CONSTANTE

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];

  private _tagHistory: string[] = [];
  private apiKey: string = 'uwb7lFfm3lg8zuKpTJnxVRF1FWkTXaJ5';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

  get tagHistory() {
    return [...this._tagHistory];
  }

  private organizedHistory(tag: string) {
    tag = tag.toLowerCase(); //Lo pasa a minuscula

    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag); //elimina el tag viejo
    }

    this._tagHistory.unshift(tag); //regresa el tag nuevo al inicio y lo vuelvo al inicio
    this._tagHistory = this.tagHistory.splice(0, 10);
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));

    if( this._tagHistory.length === 0 ) return;
    this.searchTag( this._tagHistory[0] );
  }

  private loadLocalStorage():void{

    if( !localStorage.getItem('history')) return;

    this._tagHistory = JSON.parse (localStorage.getItem('history')!);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizedHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
        console.log({ gifs: this.gifList });
        console.table({ gifs: this.gifList });
      });
  }

  //servicio para number-date
  agregarHistorial(tag: string) {
    this.organizedHistory(tag);
  }
}
