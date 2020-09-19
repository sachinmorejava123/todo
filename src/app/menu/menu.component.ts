import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public basicAuthenticationService: BasicAuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  navigateToHome() {
    const username = sessionStorage.getItem('authenticatorUser');
    this.router.navigate([`/welcome/${username}`]);
  }

}
