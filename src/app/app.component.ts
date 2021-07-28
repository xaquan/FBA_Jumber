import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { MenuController } from '@ionic/angular';
import { AuthService, User } from "./services/auth.service";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [  
    { title: 'FB Accounts', url: '/fbaccounts', icon: 'key' },
    { title: 'Accounts', url: '/accounts', icon: 'people' },
  ];
  public user: User;
  public displayName = "Hello!"
  constructor(
    private ngAngularFirestore: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private menuCtrl: MenuController
  ){    
  }

  ngOnInit(){
    if(!this.authService.isLoggedIn){
      this.menuCtrl.enable(false);
    }else{
      this.menuCtrl.enable(true);
      
      this.user = JSON.parse(localStorage.getItem('user'));
      // Set display name if user data has display name.
      // if (this.user) {
        if (this.user.displayName ) {
          this.displayName += " ${this.user.displayName}";
        }
      // }
    }
  }

  signOut(){
    this.menuCtrl.enable(false);
    this.authService.SignOut();    
  }
}
