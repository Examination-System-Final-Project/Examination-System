import { Component, OnInit } from '@angular/core';
import { FooterService } from 'src/app/services/core/footer.service';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public nav : NavBarServiceService,
    public footer : FooterService) { }
  
  ngOnInit(): void {
    this.nav.show();
    this.footer.show()
  }

}
