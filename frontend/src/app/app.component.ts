import { Component } from '@angular/core';
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any = null;
  accessToken = '';
  constructor(private apiService: ApiService) {
  }

  authorization() {
    this.apiService.oauthGetToken();
  }
  getSellingData() {
    this.apiService.getSellingData().subscribe((result) => {
      this.data = result;
    });
  }
  getTestData() {
    this.apiService.testGetRequest().subscribe((res: any) => {
      this.data = res;
      this.accessToken = res['access_token'];
    })
  }

  getSellingList() {
    this.apiService.getSellingList(this.accessToken).subscribe((res) => {
      this.data = res;
    })
  }
}
