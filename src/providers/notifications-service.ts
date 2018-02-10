import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class NotificationsService {
    constructor(private http: Http) {}

    public getNotificationCount() {
        return this.http.get(`/admin/notificationCount`)
            .do( (response) => console.log(response.json()))
            .map( (response) => response.json() ); 
    }

    public getNotifications() {
        return this.http.get(`/admin/notifications`)
            .do( (response) => console.log(response.json()))
            .map( (response) => response.json() ); 
    }

    public submitApproxAmount(notificationId: number, approxAmount: number) {
        return this.http.patch(`/admin/notifications/${notificationId}/${approxAmount}`, null)
            .do( (response) => console.log(response.json()))
            .map( (response) => response.json() ); 
    }
}