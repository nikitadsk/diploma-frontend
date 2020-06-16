export interface ISkipping {
  _id: string;
  scheduleId: string;
  skippings: {
    disrespectfulSkippings: string[],
    respectfulSkippings: string[],
    id: number
  }[];
}
