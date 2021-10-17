import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RFO, RFO_Status } from 'app/@core/data/model';
import { RequestService } from 'app/services/request.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchTerm = ''
  searched = false
  searching = false
  requestsInView: RFO[] = [];
  rs = RFO_Status;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestS: RequestService
  ) { }

  ngOnInit(): void {
  }

  async search() {
    this.searching, this.searched = true
    this.requestsInView = await this.requestS.searchRFO(this.searchTerm);
    console.log(this.requestsInView)
    this.searching = false
  }

  view(id: string) {
    this.router.navigate(["/requests", id], { relativeTo: this.route });
  }
}
