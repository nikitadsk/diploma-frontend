import {ITeacher} from './teacher';
import {IDiscipline} from './discipline';

export interface ISchedule {
  regionalDate?: string;
  _id: string;
  date: Date;
  groupId: string;
  lessons: {
    teacherId: string;
    disciplineId: string;
    teacherName?: string;
    disciplineName?: string;
    teacher: ITeacher;
    discipline: IDiscipline;
  }[];
  isVerified: boolean;
  isMarked: boolean;
}
