import { Component, OnInit } from '@angular/core';
import {GroupsService} from '../services/groups.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {IGroup} from '../models/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: Observable<IGroup[]>;

  headerNames: string[] = [
    'Номер группы',
    'Специальность',
    'Куратор'
  ];

  contentFields: string[] = [
    'groupNumber',
    'specialtyName',
    'curatorName'
  ];

  groupForm = this.fb.group({
    groupNumber: ['', Validators.required],
    specialtyId: ['', Validators.required],
    curatorId: ['', Validators.required],
    headmanId: [''],
    disciplineIds: ['', Validators.required]
  });

  constructor(
    private groupsService: GroupsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.groups = this.groupsService.getAll();
  }

}
