import { Component, Input, OnInit, SimpleChange } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RFO, RFO_Status } from "app/@core/data/model";
import { UserRoles } from "app/@core/data/users";
import { RequestService } from "app/services/request.service";
import { UserService } from "app/services/user.service";

@Component({
  selector: "cmp-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.scss"],
})
export class RequestsComponent implements OnInit {
  @Input() new: Request;
  requestsInView: RFO[] = [];
  loadingRequests = true;
  isEmpty: boolean = false;
  noOfItems = 5
  rs = RFO_Status;
  todayDate = Date.now();
  lastId: string;

  constructor(
    private reqS: RequestService,
    private router: Router,
    private route: ActivatedRoute,
    private userS: UserService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    let change: SimpleChange = changes["new"];
    if (change.currentValue) {
      this.requestsInView.unshift(change.currentValue);
    }
  }

  async init() {
    if (this.userS.UserInfo.role === UserRoles.STAFF) {
      this.requestsInView = await this.reqS.getRFOsByUser(
        this.userS.UserInfo.id
      );
    }
    if (
      this.userS.UserInfo.role === UserRoles.ADMIN ||
      this.userS.UserInfo.role === UserRoles.SUPER
    ) {
      this.requestsInView = await this.reqS.getRFOs(this.noOfItems);
    }
    if (this.requestsInView.length < this.noOfItems) this.isEmpty = true
    this.lastId = this.requestsInView[this.requestsInView.length - 1].id;
    this.loadingRequests = false;
    return;
  }

  async paginate() {
    let moreData = []
    if (this.userS.UserInfo.role === UserRoles.STAFF) {
      moreData = await this.reqS.paginateRFOsByUser(
        this.userS.UserInfo.id,
        this.lastId
      );
      this.requestsInView = [...this.requestsInView, ...moreData];
    }
    if (
      this.userS.UserInfo.role === UserRoles.ADMIN ||
      this.userS.UserInfo.role === UserRoles.SUPER
    ) {
      moreData = await this.reqS.paginateRFOs(5, this.lastId);
      this.requestsInView = [...this.requestsInView, ...moreData]
    }
    if (moreData.length < this.noOfItems) this.isEmpty = true
    this.lastId = this.requestsInView[this.requestsInView.length - 1].id;
    this.loadingRequests = false;
    return;
  }

  view(id: string) {
    this.router.navigate(["/requests", id], { relativeTo: this.route });
  }
}
