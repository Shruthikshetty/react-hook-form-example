import { ApiCreateEdit, Common } from "../types/apiTypes";
import { Schema } from "../users/types/schema";

export function mapData(data: Schema): ApiCreateEdit {
  const common: Common = {
    name: data.name,
    email: data.email,
    states: data.states,
    languageSpoken: data.languageSpoken,
    gender: data.gender,
    skills: data.skills,
    registrationDateAndTime: data.registrationDateAndTime.toString(),
    salary: data.salary,
    isTeacher: data.isTeacher,
    students: data.isTeacher === true ? data.students : [],
  };

  switch (data.varient) {
    case "create": {
      return { ...common, varient: data.varient };
    }
    case "edit": {
      return { ...common, id: data.id, varient: data.varient };
    }
  }
}
