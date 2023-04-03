import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom} from "rxjs";
import {AxiosError} from "axios";

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);

    constructor(private readonly httpService: HttpService) {
    }

    getHello(): Object {
        return {res: 'Hello World!'};
    }

    async getSellingList(accessToken: string): Promise<any> {
        const bodyDetails = {
            "organizationId": "1598606805067-350554463",
            "beginDate": 1680472800000,
            "endDate": 1680559199999,
            "cashierUserId": null,
            "parentId": null,
            "tradeObjectIds": null
        }

        const url = 'https://kassa.bifit.com/cashdesk-api/v1/protected/reports/selling_report/list/read';

        console.log('accessToken', accessToken);

        const {data} = await firstValueFrom(this.httpService.post<any>(url, JSON.stringify(bodyDetails), {
            method: 'POST',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ accessToken,
            },
        }).pipe(
            catchError((error: AxiosError) => {
                this.logger.error('!!!CATCH ERROR', error.response.data);
                throw 'An error happened!';
            }),
        ));

        return data;
    }

    async getToken(): Promise<any> {
        const bodyDetails = {
            'username': '79091587558',
            'password': 'AOZI3qZPM0BrrtT66b70vGzmIXuaJeem2HP3K+p5R1Q',
            'client_id': 'cashdesk-rest-client',
            'client_secret': 'cashdesk-rest-client',
            'grant_type': 'password',
        };

        let formBody = [];
        for (let property in bodyDetails) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(bodyDetails[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        const formBodyString = formBody.join("&");

        const url = 'https://kassa.bifit.com/cashdesk-api/v1/oauth/token';

        const {data} = await firstValueFrom(
            this.httpService.post<any>(url, formBodyString, {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error('!!!CATCH ERROR', error.response.data);
                    throw 'An error happened!';
                }),
            ),
        );
        return data;
    }
}
