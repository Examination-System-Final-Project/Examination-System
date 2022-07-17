import { Component, OnInit } from '@angular/core';
import { FooterService } from 'src/app/services/core/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public footer : FooterService) { }

  ngOnInit(): void {
  }

}
