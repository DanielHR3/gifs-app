import { Component } from '@angular/core';
import { GifsService } from '../../sevices/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  get tags():string[] {
    return this.gifsService.tagHistory;
  }

  reloadGifs(tag: string): void {
    this.gifsService.searchTag( tag );
  }
}
