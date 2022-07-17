import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-instruction-page',
  templateUrl: './instruction-page.component.html',
  styleUrls: ['./instruction-page.component.css']
})
export class InstructionPageComponent implements OnInit {
audio = new Audio();
audio2 = new Audio()
  constructor(public router:ActivatedRoute,
    private route : Router) { 
      route.events.pipe(filter(event=> event instanceof NavigationStart)).subscribe(()=>{
       this.audio.muted=true;
       this.audio2.muted=true
      })
    }
  public EID = this.router.snapshot.paramMap.get('id')
  public ExID = this.router.snapshot.paramMap.get('id2')
  ngOnInit(): void {
     this.audio =new Audio()
    this.audio.src=`../../../../assets/examAudioInstructions/examIntroduction.mp3`
    this.audio.load();
    this.audio.play();
    // this.audio.muted=true
     this.audio2 = new Audio()
    this.audio2.src="../../../../assets/examAudioInstructions/examMainInstructions.mp3"
    // this.audio2.muted=true;
    this.audio2.load()
    setTimeout(()=>{
      this.audio2.play()
    },9000)
    // setInterval(()=>{
    //   let audio= new Audio();
    // })
    window.addEventListener('keypress',(event)=>{
      if(event.code=='Digit0')
      {
         this.route.navigate(['examPage',this.EID,this.ExID])
         this.audio.muted=true;
         this.audio2.muted=true;
      }
    })
    window.addEventListener('keypress',(event)=>{
      if(event.key=='Shift')
      {
         if(this.audio2.ended==false)
         {
          this.audio2.pause();
          this.audio2.load()
          this.audio2.play()
         }
         if(this.audio2.ended==true)
         {
          this.audio2.play()
         }
      }
    })
  }

}
