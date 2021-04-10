import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { SearchBoxStateManager } from './../../../state.managers/search.box.state.manager';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { DnngComponentBase } from 'src/app/base-component/dnng.component.base';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: SearchBoxComponent }]
})
export class SearchBoxComponent extends DnngComponentBase implements OnInit, AfterViewInit {

  @ViewChild('searchInput') private searchInputRef: ElementRef<HTMLInputElement> | null = null;

  loadedId: string | null = null;

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public searchBoxStateManager: SearchBoxStateManager,
              @Inject(PLATFORM_ID) private platformId: object,
              private router: Router) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this.searchBoxStateManager.onChanged.listen(this, () => {
      this.markForCheckLocaly();
    });
    this.searchBoxStateManager.init();
  }

  ngAfterViewInit(): void {
    if (this.searchInputRef) {
      if (isPlatformBrowser(this.platformId)) {
        fromEvent(this.searchInputRef.nativeElement, 'input')
        .pipe(debounceTime(400))
        .listen(this, () => {
          this.searchBoxStateManager.fetchFirstTen();
        });
      }
    }
  }

  keyUp(key: string, id: string, name: string): void {
    if (key === 'Enter') {
      this.loadedId = id;
      this.searchBoxStateManager.searchKey = name;
      this.searchBoxStateManager.clear();
    }
  }

  itemClicked(id: string, name: string): void {
    this.loadedId = id;
    this.searchBoxStateManager.searchKey = name;
    this.searchBoxStateManager.clear();
  }

  navigateTo(): void {
    if (this.searchBoxStateManager.searchKey !== '' && this.loadedId) {
      this.router.navigate(['/single-product', this.loadedId]);
    }
  }
}
