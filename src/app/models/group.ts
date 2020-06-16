import {IDiscipline} from './discipline';

export interface IGroup {
  _id?: string;
  groupNumber: number;
  specialtyId: string;
  curatorId?: string;
  headmanId?: string;
  headmanName?: string;
  disciplineIds: string[];
  specialtyName?: string;
  curatorName?: string;
  disciplines?: IDiscipline[];
}
