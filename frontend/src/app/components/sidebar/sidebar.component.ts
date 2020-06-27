import { Router } from '@angular/router';
import { tab } from './tab.model';
import { SearchService } from 'src/app/services/search.service';
import { ResizableModule, ResizeEvent } from 'angular-resizable-element';
import { Subscription } from 'rxjs';
import { FriendlistService } from 'src/app/services/chatsystem/friendlist.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition, } from '@angular/animations'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('hamburguerX', [
      state('hamburguer', style({})),
      state('topX', style({
        transform: 'rotate(45deg)',
        transformOrigin: 'left',
        margin: '6px'
      })),
      state('hide', style({
        opacity: 0
      })),
      state('bottomX', style({
        transform: 'rotate(-45deg)',
        transformOrigin: 'left',
        margin: '6px'
      })),
      transition('* => *', [
        animate('0.2s')
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {
  // about sidebar
  windowSub: Subscription
  window: boolean = window.innerWidth > 500? true : false
  width: number = 0.35
  Styles = {
    'position': 'fixed',
    'background-color': 'rgba(255,255,255,0.75)',
    'min-width': '700px',
    'top': '1%',
    'left': '1%',
    'height': '95%',
    'max-height': '95%',
    'overflow':'hidden',
    'padding': '0',
    'width': `${window.innerWidth >= 500? window.innerWidth*this.width : window.innerWidth}px`,
  }
  showFiller = true
  @ViewChild('drawer') drawer

  // about sidebar tabs
  private openTabSub: Subscription
  openTab: tab

  tabs : any[] = ['home', 'mytrip', 'search']

  selectedTab(): string {
    if (this.Router.url.substr(0, 14) == '/search') {
      return '/search'
    } else {
      return this.Router.url
    }
  }

  constructor(private FriendlistService: FriendlistService,
              private SearchService: SearchService,
              private Router: Router
              )
  {

  }

  ngOnInit(): void {
    this.openTabSub = this.SearchService.searchTab.subscribe(x => {
      this.openTab = x
    })
  }

  ngAfterViewInit() {
    this.windowSub = this.FriendlistService.windowSize.subscribe((windowWidth) => {
      if (windowWidth <= this.drawer._width) {
        if (windowWidth < 500 || window.innerWidth) {
          this.window = false
        } else {
          this.Styles.width= `${windowWidth * 0.96}px`
        }
      } else {
        this.window = true
      }
    })
  }

  validate(event: ResizeEvent) {
    const MIN_DIMENSIONS_PX: number = 500;
    const maxWidth: number = window.innerWidth * 0.96
    if (
      event.rectangle.width && // if defined
        event.rectangle.height && // if defined
          (event.rectangle.width < MIN_DIMENSIONS_PX ||
            event.rectangle.width > maxWidth)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: any): void {
    this.Styles.width = `${event.rectangle.width}px`
  }

  searchFriend() {
    this.SearchService.userSearch('saisi')
    .then(x => {
      console.log(x)
    })
    .catch(x => {
      console.log(x)
    })
  }

  ngOnDestroy() {
    this.windowSub.unsubscribe()
    this.openTabSub.unsubscribe()
  }
  // newTab(){
  //   this.SearchService.newTab()
  // }

}

