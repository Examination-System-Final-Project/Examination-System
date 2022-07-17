import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders  } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  create_group_url= `http://localhost:3000/group/createGroup?organization=1&instructor=1`;
  list_groups_url= `http://localhost:3000/group/listGroups?instructor=1`;
 examid:any
 groupid:any
 groupIdForAssign:any
  constructor(private http:HttpClient) { }
  createGroup(data:any, id : any )
  {
    return this.http.post(`http://localhost:3000/group/createGroup?organization=1&instructor=${id}`,data)
  }
  listgroups(id : any) {
    console.log(id)
    return this.http.get(`http://localhost:3000/group/listGroups?instructor=${id}`) ;

  }
  deleteGroup(id:any){
    return this.http.delete(`http://localhost:3000/group/deleteGroup?group=${id}`)

  }
  listExamineesInGroup(id:any){
    return this.http.get(`http://localhost:3000/group/listExamineesInGroup?group=${id}`) ;

  }

  assignExamToGroup(examid:any,groupid:any)
  {
    const params=new HttpParams()
    // .set('exam',this.examid)
    // .set('group',this.groupid)
    //  const options = {
    //    params : params
    //  }
     return this.http.get(`http://localhost:3000/group/assignExamToGroup?exam=${examid}&group=${groupid}`)
  }
  removeExamFromGroup(examid:any,groupid:any){
    return this.http.delete(`http://localhost:3000/group/removeExamFromGroup?exam=${examid}&group=${groupid}`)

  }
  listStudents(){

    return this.http.get(`http://localhost:3000/group/listExamineesInOrganization?organization=1`)
  }
  assignExamineeToGroup (examineeId:any){
    return this.http.get(`http://localhost:3000/group/assignExamineeToGroup?examinee=${examineeId}&group=${this.groupIdForAssign}`) 
  }
 generateUniqeExamToGroup(groupid:any,examid:any){
  return this.http.get(`http://localhost:3000/exam/generateUniqueExamForEachStudentInGroup?group=${groupid}&exam=${examid}`)

  }
  removeExamineeFromGroup (examineeId:any){
    return this.http.delete(`http://localhost:3000/group/removeExamineeFromGroup?examinee=${examineeId}&group=${this.groupIdForAssign}`) 
  }
  deleteUniqueExamForEachStudentInGroup(groupid:any,examid:any){
    return this.http.delete(`http://localhost:3000/exam/deleteUniqueExamForEachStudentInGroup?group=${groupid}&exam=${examid}`)
  }
}
