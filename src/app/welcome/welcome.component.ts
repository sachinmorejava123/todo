import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  name = '';
  messageFromService: any;
  errorResponseMessage: any;

  constructor(
    private route: ActivatedRoute,
    private welcomeDataService: WelcomeDataService
    ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params.name;
  }

  getWelcomeMessage() {
    this.welcomeDataService.executeHelloWorldBeanService().subscribe(
      response => this.messageFromService = response.message,
      error => this.handleErrorResponse(error)
    );
  }

  getWelcomeMessageWithParameter() {
    this.welcomeDataService.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe(
      response => this.messageFromService = response.message,
      error => this.handleErrorResponse(error)
    );
  }

  handleErrorResponse(error) {
    this.errorResponseMessage = error.error.message;
  }

}
