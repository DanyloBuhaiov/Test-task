import { CatInfoService } from './../filter-form/catInfo.service';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { CatInfo } from "../filter-form/catInfo.service";
import { CatResultInfo, SearchResultService } from "../search-result/search-result.service";
import { GetCatsInfo, GetSearchCats, IsLoadingSearch } from './app.actions';
import { catchError, tap } from 'rxjs';


export interface CatInfoState {
  catsInfo: CatInfo[],
  catsInfoError: string,
  searchResults: CatResultInfo[],
  searchResultsError: string,
  isLoadingSearch: boolean
}

@State<CatInfoState>({
  name: 'Cats',
  defaults: {
    catsInfo: [],
    catsInfoError: '',
    searchResults: [],
    searchResultsError: '',
    isLoadingSearch: false
  }
})
@Injectable()
export class CatState {

  constructor(private catInfoService: CatInfoService, private searchResultService: SearchResultService) {}

  @Selector()
  static GetCatsInfoSelector(state: CatInfoState) {
    return state.catsInfo;
  }
  @Selector()
  static GetSearchCatsSelector(state: CatInfoState) {
    return state.searchResults;
  }
  @Selector()
  static GetisLoadingSearchSelector(state: CatInfoState) {
    return state.isLoadingSearch;
  }
  @Selector()
  static GetCatsInfoErrorSelector(state: CatInfoState) {
    return state.catsInfoError;
  }
  @Selector()
  static GetSearchResultsErrorSelector(state: CatInfoState) {
    return state.searchResultsError;
  }

  @Action(GetCatsInfo)
  GetCatsInfoAction(ctx: StateContext<CatInfoState>) {
    return this.catInfoService.getCatInfoForState().pipe(
      tap(res => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          catsInfo: res,
          catsInfoError: ''
        })
      }),
      catchError(e => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          catsInfoError: e.message
        })
        throw new Error(e.message);
        })
    )
  }

  @Action(GetSearchCats)
  GetSearchCatsAction(ctx: StateContext<CatInfoState>, action: GetSearchCats) {
    return this.searchResultService.getResultsForState(action.limit, action.breedId).pipe(
      tap(res => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          searchResults: res,
          isLoadingSearch: false,
          searchResultsError: ''
        })
      }),
      catchError(e => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          isLoadingSearch: false,
          searchResultsError: e.message
        })
        throw new Error(e.message);
        })
    )
  }

  @Action(IsLoadingSearch)
  IsLoadingSearchAction(ctx: StateContext<CatInfoState>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isLoadingSearch: true
    });
  }


}
