import { Component } from '@angular/core';
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any = null;
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
}
