import { Component, OnInit, Renderer2, OnDestroy,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { tab } from 'src/app/models/tab.model';
import { Subscription } from 'rxjs';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  loading: boolean = false
  private child: HTMLParagraphElement

  openTab: tab
  private returnTab: Subscription
  @ViewChild('searchResultsContainer') div: ElementRef

  select: number = 0

  constructor(
    private map: MapService,
    private Renderer : Renderer2,
    private router : Router,
    private SearchService: SearchService
  ) {

  }

  ngOnInit(): void {
    this.returnTab = this.SearchService.searchTab.subscribe((tab)=> this.openTab = tab)
  }

  onSubmit(data: string) {
    this.SearchService.enterSearch(data,this.SearchService.mainSearch(data, this.map.getCenter())).then(()=>{
    this.router.navigate([this.openTab.path])
    })
  }


  onKey(data: string) {
    if (data === "") {
        this.loading = false
    } else {
        this.loading = true
        this.SearchService.mainSearch(data, this.map.getCenter())
        .then((finalData) => {
            this.loading = false
            this.Renderer.removeChild(this.div, this.child)
            this.child = this.Renderer.createElement('p');
            this.child.innerHTML = finalData[1]
            this.Renderer.appendChild(this.div.nativeElement, this.child)
        })
        .catch((err) => {
            this.loading = false
        })
    }
  }

  ngOnDestroy(){
    this.returnTab.unsubscribe()
  }


}
