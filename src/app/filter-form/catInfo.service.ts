import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CatInfo {
  "weight"?: {
  "imperial"?: string,
  "metric"?: string
  },
  "id"?: string,
  "name"?: string,
  "vetstreet_url"?: string,
  "temperament"?: string,
  "origin"?: string,
  "country_codes"?: string,
  "country_code"?: string,
  "description"?: string,
  "life_span"?: string,
  "indoor"?: number,
  "alt_names"?: string,
  "adaptability"?: number,
  "affection_level"?: number,
  "child_friendly"?: number,
  "dog_friendly"?: number,
  "energy_level"?: number,
  "grooming"?: number,
  "health_issues"?: number,
  "intelligence"?: number,
  "shedding_level"?: number,
  "social_needs"?: number,
  "stranger_friendly"?: number,
  "vocalisation"?: number,
  "experimental"?: number,
  "hairless"?: number,
  "natural"?: number,
  "rare"?: number,
  "rex"?: number,
  "suppressed_tail"?: number,
  "short_legs"?: number,
  "wikipedia_url"?: string,
  "hypoallergenic"?: number,
  "reference_image_id"?: string
  }

@Injectable({
  providedIn: 'root'
})
export class CatInfoService{
  catInfoUrl: string = "https://api.thecatapi.com/v1/breeds";

  constructor(private http: HttpClient) { }

  getCatInfoForState() {
    return this.http.get<CatInfo[]>(this.catInfoUrl);
  }
}
