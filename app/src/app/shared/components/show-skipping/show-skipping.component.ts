import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {SelectDropDownComponent} from 'ngx-select-dropdown';
import {ISchedule} from '../../../models/schedule';
import {IStudent} from '../../../models/student';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ISkipping} from '../../../models/skipping';
import {SkippingsService} from '../../../services/skippings.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-show-skipping',
  templateUrl: './show-skipping.component.html',
  styleUrls: ['./show-skipping.component.scss']
})
export class ShowSkippingComponent implements OnInit {

  @ViewChildren('respectfulDropdown') respectfulDropdown: QueryList<SelectDropDownComponent>;
  @ViewChildren('disrespectfulDropdown') disrespectfulDropdown: QueryList<SelectDropDownComponent>;

  schedule: ISchedule;
  students: IStudent[];
  readOnly = false;

  skipping: ISkipping;

  skippingForm = this.fb.group({
    date: [{ value: '', disabled: true }],
    skippings: this.fb.array([])
  });

  studentConfig = {
    displayKey: 'studentName',
    search: false,
    limitTo: 3,
    selectedItems: [],
    searchPlaceholder: 'Поиск',
    noResultsFound: 'Не найдено результатов',
    placeholder: 'Выберите'
  };

  constructor(
    private fb: FormBuilder,
    private toasterService: ToastrService,
    private skippingsService: SkippingsService,
    public authService: AuthService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    const subscription = this.skippingsService.getByScheduleId(this.schedule._id).subscribe(skipping => {
      this.skipping = skipping;
      this.getSkippings().controls.forEach((control, index) => {
        control.patchValue({
          id: this.skipping.skippings[index].id,
          respectfulStudentObjects: [ ...this.skipping.skippings[index].respectfulSkippings.map(value => {
            return {
              studentName: this.students.find(student => student._id === value).studentName,
              _id: value
            };
          }) ],
          disrespectfulStudentObjects: [ ...this.skipping.skippings[index].disrespectfulSkippings.map(value => {
            return {
              studentName: this.students.find(student => student._id === value).studentName,
              _id: value
            };
          }) ],
        });
        this.respectfulDropdown.toArray()[index].availableItems = [];
        this.disrespectfulDropdown.toArray()[index].availableItems = [];
      });
      subscription.unsubscribe();
    });
    this.showSkippings(this.schedule);
    this.skippingForm.patchValue({ date: this.schedule.regionalDate });
  }

  createSkipping() {
    return this.fb.group({
      id: ['', Validators.required],
      respectfulStudentObjects: [[]],
      disrespectfulStudentObjects: [[]],
    });
  }

  showSkippings(schedule: ISchedule) {
    this.skippingForm.patchValue(schedule);

    schedule.lessons.forEach(lesson => {
      const skippingsFormGroup = this.createSkipping();
      skippingsFormGroup.patchValue(lesson);
      this.getSkippings().push(skippingsFormGroup);
    });
  }

  getSkippings() {
    return this.skippingForm.get('skippings') as FormArray;
  }

  clickVerified() {
    this.modal.close(this.skipping._id);
  }
}
