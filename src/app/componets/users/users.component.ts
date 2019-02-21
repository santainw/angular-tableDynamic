import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'  
import { User, Resp } from './users.model'
import { map } from 'rxjs/operators'
import { resolve } from 'q';
import { Validator } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  skills: string[];
  user: Resp;
  isCreate:boolean = false;

  createFormat = {};
  isEdit: boolean[] = [];
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;

  constructor(private uService: UserService) { }

  ngOnInit() {
    this.skills = ["Programming", "Test"];
    this.updateTable();

  }

  toggleCreate(){
    this.isCreate = !this.isCreate;
  }

  updateTable(){
    this.uService.getAll().subscribe(response=>{
      response.data.map((res)=>{
        this.isEdit.push(false)
      })
      this.user = response;
    });
  }

  toggleEdit(index){
    this.isEdit.map((val, curIndex)=>{
      if(index == curIndex)
      {
        this.isEdit[curIndex] = !this.isEdit[curIndex]
      }
    })
  }

  deleteUser(id){
    this.uService.delete(id).subscribe((res)=>{
      this.updateTable();
    });
  }

  editUser(id, i){
    this.createFormat = {
      firstname: this.firstName,
      lastname: this.lastName,
      phonenumber: this.phoneNumber,
      email: this.email
    }
    this.uService.update(id, this.createFormat).subscribe((res)=>{
      this.updateTable();
      this.toggleEdit(i);
    })
  }

  createUser(){
    this.createFormat = {
      firstname: this.firstName,
      lastname: this.lastName,
      phonenumber: this.phoneNumber,
      email: this.email
    }

    this.uService.create(this.createFormat).subscribe((res)=>{
      this.updateTable();
      this.toggleCreate();
    })
    
  }

  addSkill(skill) {
    this.skills.unshift(skill);
    return false;
  }

  removeSkill(skill) {
    this.skills.forEach((element, index) => {
      if(element == skill)
      {
        this.skills.splice(index, 1);
      }
    });
  }
}

  