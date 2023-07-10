export class GetSearchCats {
  static readonly type = '[Cats] Search Cats';
  constructor(public limit: number, public breedId: string) {}
}

export class GetCatsInfo {
  static readonly type = '[Cats] Get Cats Info';
  constructor() {}
}

export class IsLoadingSearch {
  static readonly type = '[Cats] Is Loading Search';
  constructor() {}
}
