import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class AuthService{

	constructor(private http: HttpClient){}

	login(email, password){

		return new Observable((o: Observer<any>) => {
			this.http.post('http://localhost/api/login', {
				email: email,
				password: password
			})
			.subscribe((token: string) => {
				window.localStorage.setItem('loginToken', token);

				o.next(token);
				return o.complete();
			},
			(err) => {
				return o.error(err);
			});
		});

	}
}

