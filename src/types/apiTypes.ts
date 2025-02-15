type Create = {
  varient: "create";
};

type Edit = {
  varient: "Edit";
  id: number;
};

type Student = {
  name: string;
};

// common users feilds
export type Common = {
  email: string;
  formerEmploymentPeriod: string[];
  name: string;
  gender: string;
  languageSpoken: string[];
  registrationDateAndTime: string;
  salary: number[];
  skills: string[];
  states: string[];
  isTeacher: boolean;
  students: Student[];
};

export type ApiCreateEdit = Common & (Create | Edit);

export type ApiGet = Edit & Common;
