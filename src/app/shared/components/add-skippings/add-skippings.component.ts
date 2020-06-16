import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ISchedule} from '../../../models/schedule';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IStudent} from '../../../models/student';
import {SelectDropDownComponent} from 'ngx-select-dropdown';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-add-skippings',
  templateUrl: './add-skippings.component.html',
  styleUrls: ['./add-skippings.component.scss']
})
export class AddSkippingsComponent implements OnInit {

  @ViewChildren('respectfulDropdown') respectfulDropdown: QueryList<SelectDropDownComponent>;
  @ViewChildren('disrespectfulDropdown') disrespectfulDropdown: QueryList<SelectDropDownComponent>;

  schedule: ISchedule;
  students: IStudent[];

  skippingForm = this.fb.group({
    date: [{ value: '', disabled: true }],
    skippings: this.fb.array([])
  });

  studentConfig = {
    displayKey: 'studentName',
    search: true,
    limitTo: 3,
    selectedItems: [],
    searchPlaceholder: 'Поиск',
    noResultsFound: 'Не найдено результатов',
    placeholder: 'Выберите'
  };

  constructor(
    private fb: FormBuilder,
    private toasterService: ToastrService,
    public modal: NgbActiveModal,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
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

  changeRespectful(value: Array<any>, i) {
    const controls = this.disrespectfulDropdown.toArray();
    controls[i].availableItems = this.students.filter(student => !value.includes(student) && !controls[i].selectedItems.includes(student));
  }

  changeDisrespectful(value: Array<any>, i) {
    const controls = this.respectfulDropdown.toArray();
    controls[i].availableItems = this.students.filter(student => !value.includes(student) && !controls[i].selectedItems.includes(student));
  }

  clickAdd() {
    this.getSkippings().controls.forEach((skipping, id) => {
      skipping.patchValue({ id });
    });

    if (!this.skippingForm.valid) {
      this.toasterService.error('Форма невалидна', 'Ошибка');
    } else {
      this.toasterService.success('Форма валидна', 'Успех');
      this.modal.close(this.skippingForm.value);
    }
  }

}
