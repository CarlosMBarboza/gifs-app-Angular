import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'NACyCKUtTKy9XyIzleOx430cJ0aHTKxK';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {
    this.loadLocalStorages();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 20);
    this.saveLocalStorages();

  }

  private saveLocalStorages():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorages():void {
    if(!localStorage.getItem('history')) return;
    const history = JSON.parse(localStorage.getItem('history')!) || [];
    this._tagsHistory = history;
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '20')
    .set('q', tag)

    this.http.get< SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe((resp) => {
        this.gifList = resp.data;

    });
  }
}
