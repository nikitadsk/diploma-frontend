export interface ITeacher {
  _id?: string;
  firstName: string;
  lastName: string;
  patronym: string;
  name?: string;
  disciplineIds: string[];
  isCurator?: boolean;
}
