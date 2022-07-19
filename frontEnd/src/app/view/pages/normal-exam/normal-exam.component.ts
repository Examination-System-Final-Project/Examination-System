import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { filter } from 'rxjs';
import { examineeAnswer } from 'src/app/models/examineeAnswer';
import { NavBarServiceService } from 'src/app/services/core/nav-bar-service.service';
import { VoiceRecognitionService } from 'src/app/services/exam/voice-recognition-service.service';
import { ExamineeExamService } from 'src/app/services/examinee/examinee-exam.service';
import { ListStudentExamService } from 'src/app/services/list-student-exam.service';
import { FinishAttemptDialogComponent } from '../finish-attempt-dialog/finish-attempt-dialog.component';
const KEY = 'time';

@Component({
  selector: 'app-normal-exam',
  templateUrl: './normal-exam.component.html',
  styleUrls: ['./normal-exam.component.css']
})
export class NormalExamComponent implements OnInit {

  public term: boolean = false
  examQuestions : any=[]
  currentQuestion : number=0
  examLength:any
  isChecked: boolean=false 
  answers=new UntypedFormGroup({
    examineeAnswer : new UntypedFormControl('')
  });
  // settimeout:any
  // settimeout2:any
  // settimeout3:any
  // settimeout4:any
  // audio1=new Audio() // question audio 
  // audio2=new Audio() // navigation mcq
  // audio3=new Audio() // total exam questions mcq
  // audio4=new Audio() // question type mcq
  // // audio5=new Audio() // navigation TF
  // // audio6=new Audio() // total exam questions TF
  // audio7=new Audio() // question type TF
  // // audio8=new Audio() // navigation essay
  // // audio9=new Audio() // total exam questions essay
  // audio10=new Audio() //question type essay
  // audio11=new Audio() // end of exam mcq
  // audio12=new Audio() // end of exam TF
  // audio13=new Audio() // end of exam essay
  muteAudio=false;
  answer2:any
  answer3:any
  answer4:any
  examinee : examineeAnswer= {
    examID : '',
    questionID : '',
    Answer : '',
    examineeID :'1'
  }
  isStillRecoginze = false
  hide = false
  hideNextQuestionButton=false;
  spacePressed:boolean=false
  counter:number=0
  ngif:boolean=false;
  textArea : any
  constructor(public nav : NavBarServiceService,
    private listQuestionsInExam :ListStudentExamService,
    public router:ActivatedRoute,
    public voiceRecognition : VoiceRecognitionService,
    private storeExamineeAnswer:ExamineeExamService,
    public dialog : MatDialog,
    public route : Router,
    private locationStrategy : LocationStrategy
     ) {   
      this.voiceRecognition.init();
      route.events.pipe(filter(event=> event instanceof NavigationStart)).subscribe(()=>{
        // this.audio1.muted=true;
        // this.audio2.muted=true
        // this.audio3.muted=true
        // this.audio4.muted=true
        // this.audio7.muted=true
        // this.audio10.muted=true
        // this.audio11.muted=true
        // this.audio12.muted=true
        // this.audio13.muted=true
        localStorage.removeItem('time')
       })
      }
    DEFAULT=this.storeExamineeAnswer.Duration*60
    config: CountdownConfig = { leftTime: this.DEFAULT, notify: 0 };
      public EID = this.router.snapshot.paramMap.get('id')
      public ExID = this.router.snapshot.paramMap.get('id2')
  ngOnInit(): void {
    this.nav.hide();
   
    
  }
  ngAfterContentInit()
  {
    let value = +localStorage.getItem(KEY)!! ?? this.DEFAULT
    if (value <= 0) value = this.DEFAULT;
    this.config = { ...this.config, leftTime: value };
    if(localStorage.getItem('numberOfQuestion'))
    {
      this.currentQuestion= parseInt(localStorage.getItem('numberOfQuestion')!)
    }
    else
    this.currentQuestion=0
    localStorage.removeItem('numberOfQuestion')
    this.listExamQuestions()
    // window.addEventListener('keydown',(event)=>{
    //   if(event.key=='ArrowRight')
    //   {
    //   // if(this.currentQuestion<this.examQuestions.examQuestion.length-1)
    //   // {
    //   // this.currentQuestion++
    //   // localStorage.setItem('numberOfQuestion',this.currentQuestion.toString())
    //   // }
    //   this.nextQuestion(this.examQuestions.examQuestion[this.currentQuestion].Question_ID)
      
    // }
    
    // })
    // window.addEventListener('keydown',(event)=>{
    //   if(event.key=='ArrowLeft')
    //   {
    //   // if(this.currentQuestion<this.examQuestions.examQuestion.length-1)
    //   // {
    //   // this.currentQuestion++
    //   // localStorage.setItem('numberOfQuestion',this.currentQuestion.toString())
    //   // }
    //   this.previousQuestion()
      
    // }
    // })
    // window.addEventListener('keydown',(event)=>{
    //   if(event.key=='Escape')
    //   {
    //   // if(this.currentQuestion<this.examQuestions.examQuestion.length-1)
    //   // {
    //   // this.currentQuestion++
    //   // localStorage.setItem('numberOfQuestion',this.currentQuestion.toString())
    //   // }
    //   this.audio1.pause()
    //   this.audio2.pause()
    //   clearTimeout(this.settimeout)
    //   clearTimeout(this.settimeout2)
    //   clearTimeout(this.settimeout3)
    //   clearTimeout(this.settimeout4)
    //   this.audio11.pause()
    //   this.audio12.pause()
    //   this.audio13.pause()
    // }
    // })
    // window.addEventListener('keydown',(event)=>{
    //   if(event.key==' ')
    //   {
    //   // if(this.currentQuestion<this.examQuestions.examQuestion.length-1)
    //   // {
    //   // this.currentQuestion++
    //   // localStorage.setItem('numberOfQuestion',this.currentQuestion.toString())
    //   // }
    //   this.playAudio(this.examQuestions.examQuestion[this.currentQuestion].Question_ID)
      
    // }
    // })
    // window.addEventListener('keydown',(event)=>{
    //   if(event.key=='1' && this.examQuestions.examQuestion[this.currentQuestion].QuestionType == 'mcq')
    //   {
     
    //   let mcqFirstAnswer = document.getElementById('1-mcq') as HTMLInputElement
    //    mcqFirstAnswer.value=this.examQuestions.examQuestion[this.currentQuestion].Option_1
    //   let mcqSecondAnswer = document.getElementById('2-mcq') as HTMLInputElement
    //   let mcqThirdAnswer = document.getElementById('3-mcq') as HTMLInputElement
    //   let mcqFourthAnswer = document.getElementById('4-mcq') as HTMLInputElement
    //   console.log(mcqFirstAnswer.value)
    //   this.answers.controls['examineeAnswer'].setValue(mcqFirstAnswer.value)
    //   console.log(this.answers.value)
    //     mcqSecondAnswer.checked=false;
    //     mcqThirdAnswer.checked=false;
    //     mcqFourthAnswer.checked=false;
        
    //     // this.answers.controls['examineeAnswer'].setValue("ay haga") 
    //  mcqFirstAnswer.checked=true
     
    // //  if( mcqFirstAnswer.checked==true)
    // //  this.answers.controls['examineeAnswer'].setValue(mcqFirstAnswer.value)      
    // }
    // if(event.key=='1' && this.examQuestions.examQuestion[this.currentQuestion].QuestionType == 'true or false'){
    // let TFanswer1 = document.getElementById('1-TF') as HTMLInputElement
    // TFanswer1.value=this.examQuestions.examQuestion[this.currentQuestion].Option_1
    //       this.answers.controls['examineeAnswer'].setValue( TFanswer1.value)
    // let TFanswer2 = document.getElementById('2-TF') as HTMLInputElement
    // TFanswer2.checked=false;
    // TFanswer1.checked=true
    // }
    // })
    // window.addEventListener('keydown',(event)=>{
    //   if(event.key=='2' && this.examQuestions.examQuestion[this.currentQuestion].QuestionType == 'mcq')
    //   {
    //   // if(this.currentQuestion<this.examQuestions.examQuestion.length-1)
    //   // {
    //   // this.currentQuestion++
    //   // localStorage.setItem('numberOfQuestion',this.currentQuestion.toString())
    //   // }
    //   let mcqFirstAnswer = document.getElementById('1-mcq') as HTMLInputElement
    //   let mcqSecondAnswer = document.getElementById('2-mcq') as HTMLInputElement
    //   mcqSecondAnswer.value= this.examQuestions.examQuestion[this.currentQuestion].Option_2
    //   this.answers.controls['examineeAnswer'].setValue( mcqSecondAnswer.value)
    //   let mcqThirdAnswer = document.getElementById('3-mcq') as HTMLInputElement
    //   let mcqFourthAnswer = document.getElementById('4-mcq') as HTMLInputElement
    //   mcqFirstAnswer.checked=false;
    //   mcqThirdAnswer.checked=false;
    //   mcqFourthAnswer.checked=false;
    //  mcqSecondAnswer.checked=true
    
    // }
    // if(event.key=='2' && this.examQuestions.examQuestion[this.currentQuestion].QuestionType == 'true or false'){
    //   let TFanswer1 = document.getElementById('1-TF') as HTMLInputElement
    //   let TFanswer2 = document.getElementById('2-TF') as HTMLInputElement
    //       TFanswer2.value=this.examQuestions.examQuestion[this.currentQuestion].Option_2
    //       this.answers.controls['examineeAnswer'].setValue( TFanswer2.value)
    //   TFanswer1.checked=false
    //  TFanswer2.checked=true
    //   }
    // })
    // window.addEventListener('keydown',(event)=>{
    //   if(event.key=='3')
    //   {
    //   // if(this.currentQuestion<this.examQuestions.examQuestion.length-1)
    //   // {
    //   // this.currentQuestion++
    //   // localStorage.setItem('numberOfQuestion',this.currentQuestion.toString())
    //   // }
    //   let mcqFirstAnswer = document.getElementById('1-mcq') as HTMLInputElement
    //   let mcqSecondAnswer = document.getElementById('2-mcq') as HTMLInputElement
    //   let mcqThirdAnswer = document.getElementById('3-mcq') as HTMLInputElement
    //   mcqThirdAnswer.value= this.examQuestions.examQuestion[this.currentQuestion].Option_3
    //   this.answers.controls['examineeAnswer'].setValue( mcqThirdAnswer.value)
    //   let mcqFourthAnswer = document.getElementById('4-mcq') as HTMLInputElement
    //   mcqFirstAnswer.checked=false;
    //   mcqSecondAnswer.checked=false;
    //   mcqFourthAnswer.checked=false;
    //  mcqThirdAnswer.checked=true
      
    // }
    // })
    // window.addEventListener('keydown',(event)=>{
    //   if(event.key=='4')
    //   {
    //   // if(this.currentQuestion<this.examQuestions.examQuestion.length-1)
    //   // {
    //   // this.currentQuestion++
    //   // localStorage.setItem('numberOfQuestion',this.currentQuestion.toString())
    //   // }
    //   let mcqFirstAnswer = document.getElementById('1-mcq') as HTMLInputElement
    //   let mcqSecondAnswer = document.getElementById('2-mcq') as HTMLInputElement
    //   let mcqThirdAnswer = document.getElementById('3-mcq') as HTMLInputElement
    //   let mcqFourthAnswer = document.getElementById('4-mcq') as HTMLInputElement
    //   mcqFourthAnswer.value= this.examQuestions.examQuestion[this.currentQuestion].Option_4
    //   this.answers.controls['examineeAnswer'].setValue( mcqFourthAnswer.value)
    //   mcqFirstAnswer.checked=false;
    //   mcqSecondAnswer.checked=false;
    //   mcqThirdAnswer.checked=false;
    //  mcqFourthAnswer.checked=true
      
    // }
    // })
    // window.addEventListener('keydown',(event)=>{
    //   if(event.key=='ArrowUp')
    //   {
    //     this.startVoice()
    //     this.spacePressed=true;
    //     // this.counter++
    //     console.log(event)
    //     console.log(this.spacePressed)
    //     // console.log(this.counter)
       
    //   }
     
      // if(event.code=='Space' && this.spacePressed==true)
      // {
        // this.isStillRecoginze=this.voiceRecognition.stop() === false ? false : false
        // this.hide=false
        // this.textArea=this.voiceRecognition.text
      //   this.spacePressed=false;
      // }
    
    
    // window.addEventListener('keydown',(event)=>{
    //   if(event.key=='ArrowDown')
    //   {
    //     this.isStillRecoginze=this.voiceRecognition.stop() === false ? false : false
    //     this.textArea=this.voiceRecognition.text
    //     this.hide=false
    //     console.log(event)
    //   }
    // })
    // window.addEventListener('keydown',(event)=>{
    //   if(event.key=='Enter')
    //   {
    //     this.sendExamineeAnswersForEvaluation(this.examQuestions.examQuestion[this.currentQuestion].Question_ID)
    //     this.openDialog()
    //   }
    // })

  }
  handleEvent(ev: CountdownEvent) {
    if (ev.action === 'notify') {
      // Save current value
      localStorage.setItem(KEY, `${ev.left / 1000}`);
      if(localStorage.getItem('time') =='0')
      {
           this.route.navigate(['/resultPage',this.EID,this.ExID])
      }
    }
  }
  nextQuestion(questionID:any){
    
    if(this.currentQuestion<this.examQuestions.examQuestion.length-1)
    {
    this.currentQuestion++
    // this.audio2.pause()
    // clearTimeout(this.settimeout)
    // clearTimeout(this.settimeout2)
    // clearTimeout(this.settimeout3)
    // clearTimeout(this.settimeout4)
    // this.ExamAudioInstructions()
    }       
    localStorage.setItem('numberOfQuestion',this.currentQuestion.toString())
    this.storeExamineeAnswer.storeExamineeAnswer(this.EID,this.ExID,questionID,this.answers.value).subscribe((res)=>{
      this.answers.controls['examineeAnswer'].setValue('')
      console.log(res)
      // console.log(this.answerOfExam)
    },err=>{
      console.log(err)
    })
   
    
  }
  previousQuestion()
  {
    this.hideNextQuestionButton=false;
    if(this.currentQuestion>0)
    this.currentQuestion--
    localStorage.setItem('numberOfQuestion',this.currentQuestion.toString())
  }
  listExamQuestions()
  {
    this.listQuestionsInExam.listQuestionsInExam(this.EID,this.ExID).subscribe((res:any)=>{
      this.examQuestions=res
      // this.examQuestions.examQuestion.sort(() => (Math.random() > .5) ? 1 : -1)
      console.log(this.examQuestions)
      this.ngOnInit()
      this.examLength=this.examQuestions.examQuestion.length
      console.log(this.examQuestions.examQuestion.length)
    },err=>{
         console.log(err)
    }
    )
 }
 localStorageOnInitialization()
 {
   localStorage.setItem('numberOfQuestion','0')
 }
 radioButtonChecked(e:any,QID : any, examID : any)
 {
  
    this.examinee.Answer=e.target.value
    this.examinee.examID=examID
    this.examinee.questionID=QID
    console.log(this.examinee.examID)   
    console.log(this.examinee.Answer)
    console.log(this.examinee.questionID)
  
 }
 
 startVoice()
 {
   this.isStillRecoginze=this.voiceRecognition.start() === true ? true : false
   this.hide=true
   
 }
 stopVoice()
 {
  this.isStillRecoginze=this.voiceRecognition.stop() === false ? false : false
  this.hide=false
  this.textArea=this.voiceRecognition.text
 }
 playAudio(id:any)
 {
  
  // this.audio1.src=`../../../../assets/questionsAudio/question${id}.mp3`
  // this.audio1.load();
  // this.audio1.play();
 }
 ExamAudioInstructions()
 {
 
 
  // if(this.currentQuestion<this.examQuestions.examQuestion.length && this.examQuestions.examQuestion[this.currentQuestion].QuestionType=='mcq')
  // {
     
    
  //     this.audio2.src=`../../../../assets/examAudioInstructions/questionNumberNavigation/questionNumberNavigation${this.currentQuestion+1}.mp3`
  //     this.audio2.load()
  //     this.audio2.play();
  //   this.settimeout =  setTimeout(()=>{
  //      this.audio3.src=`../../../../assets/examAudioInstructions/totalExamQuestions/totalExamQuestions${this.examQuestions.examQuestion.length}.mp3`
  //      this.audio3.load()
  //      this.audio3.play()
  //      return 3 ;
  //     },3000)
  //     this.settimeout2= setTimeout(()=>{
  //       // setTimeout(()=>{
  //       //   this.audio4.pause()
  //       // },800) 
  //       this.audio4.src=`../../../../assets/examAudioInstructions/questionType/questionTypeMcq.mp3`
  //       this.audio4.load()
  //       this.audio4.play()
  //      },5000)
      
  //      if(this.currentQuestion==this.examQuestions.examQuestion.length-1)
  //      {
  //       setTimeout(()=>{
          
  //         this.audio11.src="../../../../assets/examAudioInstructions/endOfExam.mp3"
  //         this.audio11.load()
  //         this.audio11.play()
  //       },8000)
       
  //      }
  //   }
  //   if(this.currentQuestion<this.examQuestions.examQuestion.length && this.examQuestions.examQuestion[this.currentQuestion].QuestionType=='true or false')
  //   {
        
  //       this.audio2.src=`../../../../assets/examAudioInstructions/questionNumberNavigation/questionNumberNavigation${this.currentQuestion+1}.mp3`
  //       this.audio2.load()
  //       this.audio2.play();
  //       this.settimeout=setTimeout(()=>{
  //         // setTimeout(()=>{
  //         //   this.audio6.pause()
  //         // },800) 
  //        this.audio3.src=`../../../../assets/examAudioInstructions/totalExamQuestions/totalExamQuestions${this.examQuestions.examQuestion.length}.mp3`
  //        this.audio3.load()
  //        this.audio3.play()
  //       },3000)
  //       this.settimeout3= setTimeout(()=>{
  //         // setTimeout(()=>{
  //         //   this.audio7.pause()
  //         // },800) 
  //         this.audio7.src=`../../../../assets/examAudioInstructions/questionType/questionTypeTrueOfFalse.mp3`
  //         this.audio7.load()
  //         this.audio7.play()
  //        },5000)
  //        if(this.currentQuestion==this.examQuestions.examQuestion.length-1)
  //        {
  //         setTimeout(()=>{
            
  //           this.audio12.src="../../../../assets/examAudioInstructions/endOfExam.mp3"
  //           this.audio12.load()
  //           this.audio12.play()
  //         },13000)
         
  //        }
  //     }
  //     if(this.currentQuestion<this.examQuestions.examQuestion.length && this.examQuestions.examQuestion[this.currentQuestion].QuestionType=='essay')
  //     {
       
  //         this.audio2.src=`../../../../assets/examAudioInstructions/questionNumberNavigation/questionNumberNavigation${this.currentQuestion+1}.mp3`
  //         this.audio2.load()
  //         this.audio2.play();
  //         this.settimeout=setTimeout(()=>{
  //           // setTimeout(()=>{
  //           //   this.audio9.pause()
  //           // },800) 
  //          this.audio3.src=`../../../../assets/examAudioInstructions/totalExamQuestions/totalExamQuestions${this.examQuestions.examQuestion.length}.mp3`
  //          this.audio3.load()
  //          this.audio3.play()
  //         },3000)
  //         this.settimeout4= setTimeout(()=>{
  //         //   setTimeout(()=>{
  //         //   this.audio10.pause()
  //         // },800) 
  //           this.audio10.src=`../../../../assets/examAudioInstructions/questionType/questionTypeEssay.mp3`
  //           this.audio10.load()
  //           this.audio10.play()
  //          },5000)
  //          if(this.currentQuestion==this.examQuestions.examQuestion.length-1)
  //          {
  //           setTimeout(()=>{
              
  //             this.audio13.src="../../../../assets/examAudioInstructions/endOfExam.mp3"
  //             this.audio13.load()
  //             this.audio13.play()
  //           },10000)
           
  //          }
  //       }
    
 }
 onRadioChange(e:any){
           
 }
 sendExamineeAnswersForEvaluation(questionID:any)
 {
  localStorage.removeItem('numberOfQuestion')
  if(this.currentQuestion==this.examLength-1)
  {
    this.storeExamineeAnswer.storeExamineeAnswer(this.EID,this.ExID,questionID,this.answers.value).subscribe((res)=>{
      this.answers.controls['examineeAnswer'].setValue('')
      console.log(res)
      // console.log(this.answerOfExam)
    },err=>{
      console.log(err)
    })
  }
  this.storeExamineeAnswer.sendAnswersForEvaluation(this.EID,this.ExID).subscribe((res:any)=>{
    console.log(res)
    this.storeExamineeAnswer.evaluateExam(this.EID,this.ExID).subscribe(async (res:any)=>{
      this.route.navigate(['resultPage',this.EID,this.ExID])
      console.log(res)
    })
  },err=>{
    console.log(err)
  })
 }
 hideNextButton() : boolean
 {
  if(this.currentQuestion==this.examLength-1)
  {
    this.hideNextQuestionButton=true;
   return true 
  }
  else{
    this.hideNextQuestionButton=false
    return false
  }
 }
//  openDialog()
//  {
//   const dialogConfig= new MatDialogConfig();
//   dialogConfig.disableClose=true;
//   let dialogRef =this.dialog.open(FinishAttemptDialogComponent,{data: {
//     examId: this.EID,
//     examineeid : this.ExID
//   }})
//   dialogRef.afterClosed().subscribe(result=>{
//     if(result=="true")
//     {
//           this.route.navigate(['studentDashboard'])
//     }
//   })
//  }
 onKeydownMain(e:any, questionID:any)
 {
    if(e.key=="ArrowRight")
    {
      this.nextQuestion(questionID)
    }
 }

}
