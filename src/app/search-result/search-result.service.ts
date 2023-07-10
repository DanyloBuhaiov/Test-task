import { IsLoadingSearch } from './../state/app.actions';
import { Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface CatResultInfo {
  "breeds"?: [],
  "id"?: string,
  "url"?: string,
  "width"?: number,
  "height"?: number
  }

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {
  apiKey: string = 'live_hqGTYT2uOuK8FH5nfFZ7FMp94QybAmIxmaI2HOQHMARxkxPyfFxxLtp1RjanDzJ3';

  constructor(
    private http: HttpClient,
    private store: Store
    ) {}

  getResultsForState(limit:number, breedId: string) {
    this.store.dispatch(new IsLoadingSearch());
    return this.http.get<CatResultInfo[]>(`https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${breedId}&api_key=${this.apiKey}`);
  }
}
