import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SignupformstudentComponent } from './signupformstudent/signupformstudent.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpInstructorComponent } from './sign-up-instructor/sign-up-instructor.component';
import { LayoutRouterModule } from '../layout/layout-router.module';
import { HttpClientModule } from '@angular/common/http';
import { QuestionbankComponent } from './questionbank/questionbank.component';
import { InstructorDashboardNavigationComponent } from './instructor-dashboard-navigation/instructor-dashboard-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DashQuestionBankComponent } from './dash-question-bank/dash-question-bank.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestionsComponent } from './questions/questions.component';
import { DashQuestionsComponent } from './dash-questions/dash-questions.component';
import { ExamsComponent } from './exams/exams.component';
import { DashExamsComponent } from './dash-exams/dash-exams.component';
import { PreviewQuestionBankComponent } from './preview-question-bank/preview-question-bank.component';
import { DashPreviewQuestionBankComponent } from './dash-preview-question-bank/dash-preview-question-bank.component';
import { TrueFalseFormComponent } from './true-false-form/true-false-form.component';
import { EssayFormComponent } from './essay-form/essay-form.component';
import { McqFormComponent } from './mcq-form/mcq-form.component';
import { EditChooseFormComponent } from './edit-choose-form/edit-choose-form.component';
import { EditTrueFalseFormComponent } from './edit-true-false-form/edit-true-false-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CreateQuestionDialogComponent } from './create-question-dialog/create-question-dialog.component';
import { ExamcreationComponent } from './examcreation/examcreation.component';
import { StudentDashboardNavigationComponent } from './student-dashboard-navigation/student-dashboard-navigation.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ExamPageComponent } from './exam-page/exam-page.component';
import { GroupsComponent } from './groups/groups.component';
import { PreviewGroupsComponent } from './preview-groups/preview-groups.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { DashboardGroupsComponent } from './dashboard-groups/dashboard-groups.component';
import { DashboardPreviewGroupsComponent } from './dashboard-preview-groups/dashboard-preview-groups.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { DashboardExamListComponent } from './dashboard-exam-list/dashboard-exam-list.component';
import { EditExamComponent } from './edit-exam/edit-exam.component';
import { InstructionPageComponent } from './instruction-page/instruction-page.component';
import { EditExamQuestionsComponent } from './edit-exam-questions/edit-exam-questions.component';
import { DashboaedEditExamQuestionsComponent } from './dashboaed-edit-exam-questions/dashboaed-edit-exam-questions.component';
import { AddQuestionToExamComponent } from './add-question-to-exam/add-question-to-exam.component';
import { TestComponent } from './test/test.component';
import { CountdownModule } from 'ngx-countdown';
import { AutoExamGenerationComponent } from './auto-exam-generation/auto-exam-generation.component';
import { FinishAttemptDialogComponent } from './finish-attempt-dialog/finish-attempt-dialog.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { TeessstttComponent } from './teesssttt/teesssttt.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { InjuredExamComponent } from './injured-exam/injured-exam.component';
import { NormalExamComponent } from './normal-exam/normal-exam.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { DashProfileSettingsComponent } from './dash-profile-settings/dash-profile-settings.component';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { FirstStepComponent } from './first-step/first-step.component';
import { SecondStepComponent } from './second-step/second-step.component';
import { ThirdStepComponent } from './third-step/third-step.component';
import { FourthStepComponent } from './fourth-step/fourth-step.component';
import { ExamnieeReportComponent } from './examniee-report/examniee-report.component';
import { PreviewExamForExmaineeComponent } from './preview-exam-for-exmainee/preview-exam-for-exmainee.component';
import { DashboardExamnieeReportsComponent } from './dashboard-examniee-reports/dashboard-examniee-reports.component';
import { DashPreviewExamExamnieeComponent } from './dash-preview-exam-examniee/dash-preview-exam-examniee.component';
import { InstructorReportsComponent } from './instructor-reports/instructor-reports.component';
import { DashInstructorReportsComponent } from './dash-instructor-reports/dash-instructor-reports.component';
import { InstructorPreviewExamReportComponent } from './instructor-preview-exam-report/instructor-preview-exam-report.component';
import { DashPreviewInstructorExamReportComponent } from './dash-preview-instructor-exam-report/dash-preview-instructor-exam-report.component';
import { PreviewExamInstructorComponent } from './preview-exam-instructor/preview-exam-instructor.component';
import { DashPreviewExamInstructorComponent } from './dash-preview-exam-instructor/dash-preview-exam-instructor.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
@NgModule({
  declarations: [
    HomeComponent,
    SignupComponent,
    SignupformstudentComponent,
    SignUpInstructorComponent,
    QuestionbankComponent,
    InstructorDashboardNavigationComponent,
    DashQuestionBankComponent,
    QuestionsComponent,
    DashQuestionsComponent,
    ExamsComponent,
    DashExamsComponent,
    PreviewQuestionBankComponent,
    DashPreviewQuestionBankComponent,
    TrueFalseFormComponent,
    EssayFormComponent,
    McqFormComponent,
    EditChooseFormComponent,
    EditTrueFalseFormComponent,
    CreateQuestionDialogComponent,
    ExamcreationComponent,
    StudentDashboardNavigationComponent,
    StudentDashboardComponent,
    ExamPageComponent,
    GroupsComponent,
    PreviewGroupsComponent,
    StudentsListComponent,
    DashboardGroupsComponent,
    DashboardPreviewGroupsComponent,
    ExamListComponent,
    DashboardExamListComponent,
    EditExamComponent,
    InstructionPageComponent,
    EditExamQuestionsComponent,
    DashboaedEditExamQuestionsComponent,
    AddQuestionToExamComponent,
    TestComponent,
    AutoExamGenerationComponent,
    FinishAttemptDialogComponent,
    TeessstttComponent,
    ContactUsComponent,

    InstructorDashboardComponent,
    ResultPageComponent,
    ReportsComponent,
    InjuredExamComponent,
    NormalExamComponent,
    ProfileSettingsComponent,
    DashProfileSettingsComponent,
    CreateExamComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent,
    FourthStepComponent,
    ExamnieeReportComponent,
    PreviewExamForExmaineeComponent,
    DashboardExamnieeReportsComponent,
    DashPreviewExamExamnieeComponent,
    InstructorReportsComponent,
    DashInstructorReportsComponent,
    InstructorPreviewExamReportComponent,
    DashPreviewInstructorExamReportComponent,
    PreviewExamInstructorComponent,
    DashPreviewExamInstructorComponent,
    SpinnerComponent
  ],
  entryComponents:[
    CreateQuestionDialogComponent,
    EditChooseFormComponent,
    FinishAttemptDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    AppRoutingModule,
    NgbModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CountdownModule,
    DatePickerModule,
  ],
  exports:[
    HomeComponent,
    SignupComponent,
    SignupformstudentComponent
  ]


})
export class PagesModule { }
