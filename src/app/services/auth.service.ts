import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async login(data: any | object){
    await this.delay(2000);
    if(data.email === 'admin@gmail.com' && data.password === 'admin') {
      this.setCurrentUser({email: data.email, role: 'admin'});
      return true;
    }
    else if(data.email === 'user@gmail.com' && data.password === 'user') {
      this.setCurrentUser({email: data.email, role: 'user'});
      return true;
    }

    return false;
  }

  logout(){
    localStorage.removeItem('currentUser');
  }


  getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  setCurrentUser(user: any | object){
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Temporary delay simulation. Can be removed when backend is ready
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
