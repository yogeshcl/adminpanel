import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Hashtags } from '../data/dragDropList';
import { Trends } from '../data/trenddatainterface';
import { Updatetrend } from '../data/trenddatainterface';
import { Hashtagmain } from '../data/trenddatainterface';
import { Login } from '../data/trenddatainterface';

@Injectable({
  providedIn: 'root'
})
export class ManagetrendService {
  url_main = 'http://www.hashme.in:3000/';
  url_login = this.url_main+"login";
  url_getHastag = this.url_main+'gethashtags/10';
  url_getTrend = this.url_main+'gettrendinghashtags';
  url_updateTrend = this.url_main+'trendinghashtags';
  url_searchhashtag = this.url_main+'searchhashtags/';
  token = localStorage.getItem('auth');
  
  headers= new HttpHeaders()
  .set('Content-Type', 'application/json');
  // .set('Authorization', "Bearer " + this.token);
  

  constructor(private http: HttpClient) { 
  
  
  }
 
  isLoggedIn(){
    if (localStorage.getItem('auth')){
      return true
    }
    return false
  }
  logout(){
    localStorage.removeItem('auth');
    this.token = '';
  }
  login(email,pwd){
    return this.http.post<Login>(this.url_login,{ "email" : email,"password" : pwd });
    
  }
  getHashtags() {
    return this.http.get<Hashtags>(this.url_getHastag, { 'headers': this.headers });
  }

  getTrendingHastags() {
    return this.http.post<Trends[]>(this.url_getTrend,null, { 'headers': this.headers });
  }
  updateTrendingHastags(data) {
    return this.http.post<Updatetrend[]>(this.url_updateTrend,data, { 'headers': this.headers });
  }
  searchHashtag(value){
    return this.http.post<Hashtagmain[]>(this.url_searchhashtag+value+"?limit=5",null,{ 'headers':this.headers});
  }
}
