import { HomeComponent } from "../pages/home/home.component";
import { SignupComponent } from "../pages/signup/signup.component";
import { SignupformstudentComponent } from "../pages/signupformstudent/signupformstudent.component";
import { Routes } from '@angular/router';
import { SignUpInstructorComponent } from "../pages/sign-up-instructor/sign-up-instructor.component";
import { QuestionbankComponent } from "../pages/questionbank/questionbank.component";
import { InstructorDashboardNavigationComponent } from "../pages/instructor-dashboard-navigation/instructor-dashboard-navigation.component";
import { InstructorDashboardComponent } from "../pages/instructor-dashboard/instructor-dashboard.component";
import { DashQuestionBankComponent } from "../pages/dash-question-bank/dash-question-bank.component";
import { DashQuestionsComponent } from "../pages/dash-questions/dash-questions.component";
import { DashExamsComponent } from "../pages/dash-exams/dash-exams.component";
import { DashPreviewQuestionBankComponent } from "../pages/dash-preview-question-bank/dash-preview-question-bank.component";
import { IsAuthenticatedGuard } from "src/app/services/guards/is-authenticated.guard";
import { StudentDashboardNavigationComponent } from "../pages/student-dashboard-navigation/student-dashboard-navigation.component";
import { ExamsComponent } from "../pages/exams/exams.component";
import { ExamPageComponent } from "../pages/exam-page/exam-page.component";
import { GroupsComponent } from "../pages/groups/groups.component";
import { PreviewGroupsComponent } from "../pages/preview-groups/preview-groups.component";
import { ExamcreationComponent } from "../pages/examcreation/examcreation.component";
import { StudentsListComponent } from "../pages/students-list/students-list.component";
import { DashboardGroupsComponent } from "../pages/dashboard-groups/dashboard-groups.component";
import { DashboardPreviewGroupsComponent } from "../pages/dashboard-preview-groups/dashboard-preview-groups.component";
import { ExamListComponent } from "../pages/exam-list/exam-list.component";
import { DashboardExamListComponent } from "../pages/dashboard-exam-list/dashboard-exam-list.component";
import { EditExamComponent } from "../pages/edit-exam/edit-exam.component";
import { InstructionPageComponent } from "../pages/instruction-page/instruction-page.component";
import { EditExamQuestionsComponent } from "../pages/edit-exam-questions/edit-exam-questions.component";
import { DashboaedEditExamQuestionsComponent } from "../pages/dashboaed-edit-exam-questions/dashboaed-edit-exam-questions.component";
import { AddQuestionToExamComponent } from "../pages/add-question-to-exam/add-question-to-exam.component";
import { McqFormComponent } from "../pages/mcq-form/mcq-form.component";
import { TestComponent } from "../pages/test/test.component";
import { AutoExamGenerationComponent } from "../pages/auto-exam-generation/auto-exam-generation.component";
import { ResultPageComponent } from "../pages/result-page/result-page.component";
import { IsAuthenticatedInstructorGuard } from "src/app/services/guards/is-authenticated-instructor.guard";
import { TeessstttComponent } from "../pages/teesssttt/teesssttt.component";
import { ContactUsComponent } from "../pages/contact-us/contact-us.component";
import { DashProfileSettingsComponent } from "../pages/dash-profile-settings/dash-profile-settings.component";
import { ReportsComponent } from "../pages/reports/reports.component";
import { CreateExamComponent } from "../pages/create-exam/create-exam.component";
import { ExamnieeReportComponent } from "../pages/examniee-report/examniee-report.component";
import { PreviewExamForExmaineeComponent } from "../pages/preview-exam-for-exmainee/preview-exam-for-exmainee.component";
import { NormalExamComponent } from "../pages/normal-exam/normal-exam.component";
import { DashboardExamnieeReportsComponent } from "../pages/dashboard-examniee-reports/dashboard-examniee-reports.component";
import { DashPreviewExamExamnieeComponent } from "../pages/dash-preview-exam-examniee/dash-preview-exam-examniee.component";
import { InjuredExamComponent } from "../pages/injured-exam/injured-exam.component";
import { InstructorReportsComponent } from "../pages/instructor-reports/instructor-reports.component";
import { DashInstructorReportsComponent } from "../pages/dash-instructor-reports/dash-instructor-reports.component";
import { InstructorPreviewExamReportComponent } from "../pages/instructor-preview-exam-report/instructor-preview-exam-report.component";
import { DashPreviewInstructorExamReportComponent } from "../pages/dash-preview-instructor-exam-report/dash-preview-instructor-exam-report.component";
import { PreviewExamInstructorComponent } from "../pages/preview-exam-instructor/preview-exam-instructor.component";
import { DashPreviewExamInstructorComponent } from "../pages/dash-preview-exam-instructor/dash-preview-exam-instructor.component";





export const LayoutRouterModule : Routes =[
    {path : 'home', component: HomeComponent},
    {path : 'signupformstudent', component: SignupformstudentComponent},
    {path : 'signin', component: SignupComponent},
    {path : 'signupinstructor', component: SignUpInstructorComponent},
    {path : 'questionbank', component : QuestionbankComponent},
    {path : 'instructorDashboard', component : InstructorDashboardNavigationComponent,
            canActivate : [IsAuthenticatedInstructorGuard]},
    {path : 'homeinstructor',component : InstructorDashboardComponent},
    {path : 'dashboardQuestionbank',component : DashQuestionBankComponent},
    {path : 'dashboardQuestions',component : DashQuestionsComponent},
    {path : 'dashboardExams',component : DashExamsComponent},
    {path : 'dashpreviewQuestionBank/:id',component : DashPreviewQuestionBankComponent},
    {path : 'studentDashboard', component : StudentDashboardNavigationComponent,
     canActivate : [IsAuthenticatedGuard]},
    
    // {path : 'exam', component : ExamsComponent},
    {path : 'examPage/:id/:id2', component : ExamPageComponent},
    {path : 'instructionPage/:id/:id2',component : InstructionPageComponent},
    {path:'groups',component:GroupsComponent},
   {path:'dashpreviewGroups/:id',component:PreviewGroupsComponent},
   {path:'examcreation',component:ExamcreationComponent},
   {path:'listStudents',component:StudentsListComponent},
   {path:"dashboardGroups",component:DashboardGroupsComponent},
   {path : 'dashboardpreviewGroups/:id',component : DashboardPreviewGroupsComponent},
   {path:'exam-list',component:ExamListComponent},
   {path:'dashboard-exam-list',component:DashboardExamListComponent},
   {path:'',component:HomeComponent},
   {path:'edit-exam',component:EditExamComponent},
   {path : 'dashboard-edit-exam-questions/:id',component : DashboaedEditExamQuestionsComponent},

{path:'test2',component:TeessstttComponent},
{path : 'resultPage/:id/:id2',component : ResultPageComponent},
{path : 'contactUs', component : ContactUsComponent},
{path:'autoExam',component:AutoExamGenerationComponent},
{path:'test',component:TestComponent},
{path : 'resultPage/:id/:id2',component : ResultPageComponent},
{path : 'profile', component : DashProfileSettingsComponent},
{path : 'reports', component : ReportsComponent},
{path : 'testest',component : CreateExamComponent},
{path : 'normalExam/:id/:id2', component : NormalExamComponent},
{path:'examnieeReport',component:ExamnieeReportComponent},
{path : 'previewExamForExamniee/:id',component : PreviewExamForExmaineeComponent},

{path : 'normalExam', component : NormalExamComponent},
{path:'dashboard-student-report',component:DashboardExamnieeReportsComponent},
{path:'dash-preview-exam-examniee/:id' ,component: DashPreviewExamExamnieeComponent},

{path : 'injuredExam/:id/:id2', component : InjuredExamComponent},
{path:'instructorReports',component:DashInstructorReportsComponent},
{path:'dash-instructor-preview-exam-report/:id',component:DashPreviewInstructorExamReportComponent},
{path:'dashpreviewExamInstructor/:id',component:DashPreviewExamInstructorComponent}
]