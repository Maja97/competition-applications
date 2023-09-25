export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  club: string;
  country: string;
  discipline: string;
  programName: string;
  categoryName: string;
  teamName: string;
  status: string;
  date: string;
}

export enum ApplicationStatus {
  Applied = 'applied',
  Cancelled = 'canceled',
  Declined = 'declined',
  Pending = 'awaiting response'
}

export const CellType = {
  Status: 'status'
};
