import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Output () closeModal: EventEmitter<string> = new EventEmitter();

  userData: any;
  userCoordenates: any;

  constructor(private authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.getUserData();
    this.getUserGeolocation();
  }

  getUserData() {
    this.authService.getMyProfile().subscribe((data) => {
      this.userData = data;
      //console.log(data)
      if (!this.userData.name) {
        localStorage.clear();
        this._router.navigate(['/']);
      } 
    })
  }

  sendCloseModal() {
    //console.log('Close modal from child') 
    this.closeModal.emit('Cerrar el modal');
  }

  goMap() {
    this.closeModal.emit(this.userCoordenates);
  }

  getUserGeolocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        //console.log(position.coords);
        this.userCoordenates = position.coords;
      });   
    }
  }
}
