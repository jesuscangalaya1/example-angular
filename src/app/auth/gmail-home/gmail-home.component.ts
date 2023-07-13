import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgOneTapService} from "ng-google-one-tap";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-gmail-home',
  templateUrl: './gmail-home.component.html',
  styleUrls: ['./gmail-home.component.scss']
})
export class GmailHomeComponent implements OnInit{


  constructor(
    private router: Router,
    private onetap: NgOneTapService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.loadLogin();
  }

  loadLogin(): void {
    this.onetap.tapInitialize(); //Initialize OneTap, At intial time you can pass config  like this.onetap.tapInitialize(conif) here config is optional.
    this.onetap.promtMoment.subscribe(res => {  // Subscribe the Tap Moment. following response options all have self explanatory. If you want more info pls refer official document below attached link.
      res.getDismissedReason();
      res.getMomentType();
      res.getNotDisplayedReason();
      res.getSkippedReason();
      res.isDismissedMoment();
      res.isDisplayed();
      res.isNotDisplayed();
      res.isSkippedMoment();
    });
    this.onetap.oneTapCredentialResponse.subscribe(res => { // After continue with one tap JWT credentials response.
      console.log(res.credential);
      const token = res.credential;
      this.tokenService.setToken(token);
      this.router.navigate(['/flights']);
    });

  }

}
