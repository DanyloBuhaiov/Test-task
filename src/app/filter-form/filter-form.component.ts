import { CatState } from './../state/app.state';
import { GetCatsInfo, GetSearchCats } from './../state/app.actions';
import { CatInfo } from './catInfo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit, OnDestroy{
  catInfoList: CatInfo[] = [];
  breedId: string = '';
  limit: number = 10;
  errorLoadCatList: string = '';
  private destroy: Subject<boolean> = new Subject<boolean>();

  filterForm: FormGroup = new FormGroup({
    'breedId': new FormControl(this.breedId),
    'limit': new FormControl(this.limit)
  });
  @Select(CatState.GetCatsInfoSelector) catInfo$: Observable<CatInfo[]> | undefined;
  @Select(CatState.GetCatsInfoErrorSelector) catInfoError$: Observable<string> | undefined;

  constructor(
    private store: Store
    ) {}

  ngOnInit(): void {
    this.catInfo$?.pipe(takeUntil(this.destroy)).subscribe(catInfoList => this.catInfoList = catInfoList);
    this.catInfoError$?.pipe(takeUntil(this.destroy)).subscribe(err => this.errorLoadCatList = err)

    this.store.dispatch(new GetCatsInfo());
    this.store.dispatch(new GetSearchCats(this.limit, this.breedId));
  }


  onSubmit() {
    this.store.dispatch(new GetSearchCats(this.filterForm.value.limit, this.filterForm.value.breedId));
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
