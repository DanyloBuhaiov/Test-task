import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CatState } from '../state/app.state';
import { CatResultInfo } from './search-result.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy{
  searchResultList: CatResultInfo[] = [];
  isLoading: boolean = false;
  searchResultListError: string = '';
  private destroy: Subject<boolean> = new Subject<boolean>();

  @Select(CatState.GetSearchCatsSelector) catsResult$: Observable<CatResultInfo[]> | undefined;
  @Select(CatState.GetisLoadingSearchSelector) isLoading$: Observable<boolean> | undefined;
  @Select(CatState.GetSearchResultsErrorSelector) searchResultListError$: Observable<string> | undefined;

  constructor() {}

  ngOnInit(): void {
    this.catsResult$?.pipe(takeUntil(this.destroy)).subscribe(searchResultList => this.searchResultList = searchResultList);
    this.isLoading$?.pipe(takeUntil(this.destroy)).subscribe(isLoading => this.isLoading = isLoading);
    this.searchResultListError$?.pipe(takeUntil(this.destroy)).subscribe(searchResultListError => this.searchResultListError = searchResultListError);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
