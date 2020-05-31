export interface IGroup {
  _id?: string;
  groupNumber: number;
  specialtyId: string;
  curatorId?: string;
  headmanId?: string;
  disciplineIds: string[];
  specialtyName?: string;
  curatorName?: string;
}
