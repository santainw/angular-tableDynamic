import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resp } from '../componets/users/users.model'
import { resolve } from 'url';

// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<Resp>('http://128.199.167.160:3000/api/v1/users');
  }

  public getById(id){
    return this.http.get<Resp>(`http://128.199.167.160:3000/api/v1/users/${id}`)
  }

  public create(user)
  {
    return this.http.post('http://128.199.167.160:3000/api/v1/users', user)
  }

  public update(id, user){
    return this.http.put(`http://128.199.167.160:3000/api/v1/users/${id}`, user)
  }

  public delete(id){
    return this.http.delete<Resp>(`http://128.199.167.160:3000/api/v1/users/${id}`)
  }

}