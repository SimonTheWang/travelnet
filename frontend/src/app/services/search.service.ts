import { CustomCoordinates } from './../models/coordinates';
import { tab } from 'src/app/models/tab.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FoursquareService } from './map/foursquare.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { CategoryNode } from '../models/CategoryNode.model';


@Injectable({
  providedIn: 'root'
})
export class SearchService implements OnDestroy {


  private search: tab = {query: null, content : {'users':[], 'venues':[]}}
  private _searchTab: BehaviorSubject<tab> = new BehaviorSubject(this.search)
  public searchTab : Observable<tab> = this._searchTab.asObservable()

  private filter: number = 0
  private _filterNumber: BehaviorSubject<number> = new BehaviorSubject(this.filter)
  public filterNumber : Observable<number> = this._filterNumber.asObservable()

  private categories: CategoryNode[] = null
  private _categoryTree: BehaviorSubject<CategoryNode[]> = new BehaviorSubject(this.categories)
  public categoryTree : Observable<CategoryNode[]> = this._categoryTree.asObservable()

  private categoriesCollection: any
  private _categorySet: BehaviorSubject<Set<any>> = new BehaviorSubject(this.categoriesCollection)
  public categorySet : Observable<Set<any>> = this._categorySet.asObservable()

  treeValues: {
    [key: string]: any
    tree: [],
    categorySet: Set<any>
  } = {
    tree: [],
    categorySet: new Set()
  }

  constructor(private HttpClient: HttpClient,
              private foursquareService: FoursquareService) {
    this.updateCategories()
    .then((x: CategoryNode[]) => {
      this._categoryTree.next(x)
      this._categorySet.next(this.treeValues.categorySet)
    })
  }

  //looks for venues in the area
  foursquareSearchVenues(query: string, latLng: CustomCoordinates): Promise<any> {
    return new Promise((resolve, reject) => {
      this.foursquareService.searchVenues(query, latLng.toStringReorder(2))
      .subscribe((result) => {
        resolve(result)
      }, (err) => {
        reject(err)
      })
    }
  )}

  //gets user info with username input, connection to database
  userSearch(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.HttpClient.get<any>(environment.travelnet.searchUsers,
        {
          headers: {
            authorization: localStorage.getItem('token')? localStorage.getItem('token').toString() : 'monkas',
          },
          params: {
            user: query
          }
        }
      )
      .subscribe((result) => {
        resolve(result)
      }, (err) =>{
        reject(err)
      })
    }
  )}

  //gets venue data with id in the query
  formatDetails(query: string){
    return new Promise<any>((resolve,reject)=>{
      this.foursquareService.getDetails(query)
      .subscribe(result=>{
        resolve(result)
      }, (err) => {
        reject(err)
      })
    })
  }

  //combines both user and venue search
  async mainSearch(query: string, coord: CustomCoordinates): Promise<any[]> {
    return await Promise.all([this.foursquareSearchVenues(query, coord), this.userSearch(query)])
  }

  //user makes new search in a tab
  enterSearch(query: string, searchType: Promise<any>, coord: CustomCoordinates) {
    return new Promise((resolve,reject)=>{
      this.resetSearchContent()
      searchType
      .then(result => {
        console.log(result)

        if (result[0].response.totalResults != 0) {
          result[0].response.groups[0].items.forEach(venue =>{
            this.search.content.venues.push(venue)
          })
        } else {
          this.search.content.venues = []
        }

        if (sessionStorage.getItem('username')) {
          if (true && result[1].users){
            result[1].users.forEach(user=>{
              this.search.content.users.push(user)
            })
          }
        } else {
          this.search.push({'type' : 'warning', 'name' : 'You must be logged in to see users'})
        }
        this.search = ({
          query: {
            query: query,
            lng: coord.lng,
            lat: coord.lat
          },
          content: this.search.content
        })
        resolve(this._searchTab.next(this.search))
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  //anything category related
  updateCategories(): Promise<CategoryNode[]> {
    return new Promise((resolve,reject)=>{
      this.foursquareService.updateCategories()
      .subscribe(x=>{
        console.log(x)
        this.initiateTree(x.response.categories)
        resolve(x.response.categories)
      }, err => {
        console.log(err)
        reject(err)
      })
    })
  }

  /**makes tree leaves checked and creates array containing category id*/
  initiateTree(data: CategoryNode[]) {
    data.forEach((category: CategoryNode) => {
      if (category.categories.length === 0) {
        category.checked = true
        this.treeValues.categorySet.add(category.id)
      }
      else if (category.categories.length !== 0) {
        this.treeValues.categorySet.add(category.id)
        this.initiateTree(category.categories)
      }
    })
  }

  updateCategoryTree(newData){
    this._categoryTree.next(newData)
  }

  updateCategorySet(newData){
    this._categorySet.next(newData)
  }

  getSearchResult(search){
    if (search.type == 'venue'){
      return ('venue: ' + search.name)
    }
    else{
      return ('User: ' + search.name)
    }
  }

  resetSearchContent(){
    this.search.content= {venues:[],users:[]}
    this._searchTab.next(this.search)
  }

  updatePath(path){
    this.search.prePath = this.search.path
    this.search.path = path
    this._searchTab.next(this.search)
  }

  goBack(){
    this.search.path = this.search.prePath
    this.search.prePath = 'search/'
    this._searchTab.next(this.search)
    console.log(this.search)
  }

  changeFilter(filter: number){
    this._filterNumber.next(filter)
  }

  ngOnDestroy() {
    this._searchTab.unsubscribe()
    this._categoryTree.unsubscribe()
    this._categorySet.unsubscribe()
    this._filterNumber.unsubscribe()
  }
}