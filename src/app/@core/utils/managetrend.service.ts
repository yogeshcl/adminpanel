import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {hashtags } from '../data/dragDropList';
import { trends } from '../data/trenddatainterface';
import { updatetrend } from '../data/trenddatainterface';
import { hashtagmain } from '../data/trenddatainterface';
import { login } from '../data/trenddatainterface';

@Injectable({
  providedIn: 'root'
})
export class ManagetrendService {
  url_main = "http://www.hashme.in:3000/"
  url_login = this.url_main+"login";
  url_getHastag = this.url_main+'gethashtags/10';
  url_getTrend = this.url_main+'gettrendinghashtags'
  url_updateTrend = this.url_main+'trendinghashtags'
  url_searchhashtag = this.url_main+'searchhashtags/'
  token = localStorage.getItem("auth")
  
  headers= new HttpHeaders()
  .set('Content-Type', 'application/json');
  // .set('Authorization', "Bearer " + this.token);
  

  constructor(private http: HttpClient) { 
  
  
  }
 
  isLoggedIn(){
    if (localStorage.getItem("auth")){
      return true
    }
    return false
  }
  logout(){
    localStorage.removeItem('auth');
    this.token = '';
  }
  login(email,pwd){
    return this.http.post<login>(this.url_login,{ "email" : email,"password" : pwd })
    
  }
  getHashtags() {
    return this.http.get<hashtags>(this.url_getHastag, { 'headers': this.headers })
  }

  getTrendingHastags() {
    return this.http.post<trends[]>(this.url_getTrend,null, { 'headers': this.headers })
  }
  updateTrendingHastags(data) {
    return this.http.post<updatetrend[]>(this.url_updateTrend,data, { 'headers': this.headers })
  }
  searchHashtag(value){
    return this.http.post<hashtagmain[]>(this.url_searchhashtag+value+"?limit=5",null,{ 'headers':this.headers})
  }
}
