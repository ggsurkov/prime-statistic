import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable()
export class ApiService {

  access_token$ = new Subject();
  access_token = '';
  constructor(private http: HttpClient) {
  }

  oauthGetToken() {
    const bodyDetails = {
      'username': '79091587558',
      'password': 'AOZI3qZPM0BrrtT66b70vGzmIXuaJeem2HP3K+p5R1Q',
      'client_id': 'cashdesk-rest-client',
      'client_secret': 'cashdesk-rest-client',
      'grant_type': 'password',
    };

    this.http.post(`https://kassa.bifit.com/cashdesk-api/v1/oauth/token`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyDetails
    }).subscribe((data: any) => {
      console.log('oauthGetToken', data)
      this.access_token$.next(data['access_token']);
      this.access_token = data['access_token'];
    })
  }
  getSellingData() {
    const bodyDetails = {
      "organizationId": "1598606805067-350554463",
      "beginDate": 1680472800000,
      "endDate": 1680559199999,
      "cashierUserId": null,
      "parentId": null,
      "tradeObjectIds": null
    }

    return this.http.post('https://kassa.bifit.com/cashdesk-api/v1/protected/reports/selling_report/list/read', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': '*/*',
        'Authorization': 'Bearer '+ this.access_token,
      },
      body: bodyDetails
    })
  }
}
