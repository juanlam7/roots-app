import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userData();
  }

  userData() {
    this.authService.getMyProfile().subscribe((data) => {
      console.log(data)
    })
  }
}
