import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template:`
<h5>Buscar:</h5>

<input class="form-control"
type="text"
placeholder="Buscar GIFs..."
(keyup.enter)="searchTag()"
#txtTagInput
>
  `
})

export class SearchBoxComponent  {

@ViewChild('txtTagInput')
public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService) { }

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);
    
    this.tagInput.nativeElement.value = '';  // Clear input field after search.
  }


}
