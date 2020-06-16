import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GroupsService} from '../services/groups.service';
import {FormBuilder, Validators} from '@angular/forms';
import {forkJoin, Observable} from 'rxjs';
import {IGroup} from '../models/group';
import {ITeacher} from '../models/teacher';
import {ISpecialty} from '../models/specialty';
import {IDiscipline} from '../models/discipline';
import {TeachersService} from '../services/teachers.service';
import {SpecialtyService} from '../services/specialty.service';
import {DisciplinesService} from '../services/disciplines.service';
import {DetailsPanelComponent} from '../shared/components/details-panel/details-panel.component';
import {AuthService} from '../services/auth.service';
import {toArray} from 'rxjs/operators';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, AfterViewInit {

  @ViewChild(DetailsPanelComponent) detailsPanel: DetailsPanelComponent;

  groups: Observable<IGroup[]>;
  selectedGroup: IGroup;

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

  allAvailableTeachers: ITeacher[];
  allSpecialty: ISpecialty[];
  allDisciplines: IDiscipline[];

  groupForm = this.fb.group({
    groupNumber: ['', Validators.required],
    specialtyId: ['', Validators.required],
    curatorId: ['', Validators.required],
    disciplineIds: ['', Validators.required]
  });

  disciplineConfig = {
    displayKey: 'disciplineName',
    search: true,
    limitTo: 3,
    selectedItems: [],
    searchPlaceholder: 'Поиск',
    noResultsFound: 'Не найдено результатов',
    placeholder: 'Выберите'
  };

  specialtyConfig = {
    displayKey: 'specialtyName',
    search: true,
    limitTo: 3,
    selectedItems: [],
    searchPlaceholder: 'Поиск',
    noResultsFound: 'Не найдено результатов',
    placeholder: 'Выберите'
  };

  teacherConfig = {
    displayKey: 'name',
    search: true,
    limitTo: 3,
    selectedItems: [],
    searchPlaceholder: 'Поиск',
    noResultsFound: 'Не найдено результатов',
    placeholder: 'Выберите'
  };

  sidebarOpened = false;

  constructor(
    private groupsService: GroupsService,
    private teachersService: TeachersService,
    private specialtyService: SpecialtyService,
    private disciplinesService: DisciplinesService,
    private fb: FormBuilder,
    public auth: AuthService
  ) { }

  ngOnInit() {
    if (this.auth.isAdmin() || this.auth.isDispatcher()) {
      this.groups = this.groupsService.getAll();
    }

    if (this.auth.isDepartmentHead()) {
      this.groups = this.groupsService.getBySpecialtyId(this.auth.getEditedSpecialty());
    }

    if (this.auth.isCurator() || this.auth.isHeadman()) {
      this.groups = this.groupsService.getById(this.auth.getEditedGroup()).pipe(
        toArray()
      );
    }
  }

  ngAfterViewInit(): void {
    if (this.detailsPanel) {
      this.detailsPanel.openedChange.subscribe(opened => {
        this.sidebarOpened = opened;
        if (!opened) {
          this.selectedGroup = null;
        }
      });
    }
  }

  openAddDialog() {
    const source = forkJoin({
      teachers: this.teachersService.getAvailableAsNewCurator(),
      specialty: this.specialtyService.getAll(),
      disciplines: this.disciplinesService.getAll()
    });

    const subscription = source.subscribe(data => {
      this.allAvailableTeachers = data.teachers;
      this.allDisciplines = data.disciplines;
      this.allSpecialty = data.specialty;
      subscription.unsubscribe();
    });
  }

  addGroup() {
    if (this.groupForm.valid) {
      const group = this.groupForm.value;
      group.curatorId = group.curatorId._id;
      group.specialtyId = group.specialtyId._id;
      group.disciplineIds = group.disciplineIds.map(discipline => discipline._id);
      const subscription = this.groupsService.create(group).subscribe(() => {
        this.groups = this.groupsService.getAll();
        this.groupForm.reset({ disciplineIds: [] });
        subscription.unsubscribe();
      });
    }
  }

  openGroupDetails(group) {
    this.selectedGroup = group;
    this.sidebarOpened = true;
  }

}
