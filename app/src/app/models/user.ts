export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  editedGroup: string | number;
  scheduleManagement?: boolean;
  groupsManagement?: boolean;
  teachersManagement?: boolean;
  studentsManagement?: boolean;
  skippingsManagement?: boolean;
  isDepartmentHead?: boolean;
  specialtyId?: string;
  token?: string;
}
