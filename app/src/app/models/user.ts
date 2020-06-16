export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  editedGroup?: string | number;
  editedSpecialty?: string;
  isDispatcher: boolean;
  isHeadman: boolean;
  isAdmin: boolean;
  isDepartmentHead: boolean;
  isCurator: string;
  token?: string;
}
