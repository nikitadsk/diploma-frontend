export interface ISchedule {
  regionalDate?: string;
  _id: string;
  date: Date;
  groupID: string;
  lessons: {
    teacherId: string;
    disciplineId: string;
    teacherName?: string;
    disciplineName?: string;
  }[];
  isVerified: boolean;
  isMarked: boolean;
}
