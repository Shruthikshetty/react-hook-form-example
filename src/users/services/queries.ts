import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Options, Useroptions } from "../../types/options";
import { ApiGet } from "../../types/apiTypes";
import { Schema } from "../types/schema";

export function useStates() {
  return useQuery({
    queryKey: ["states"],
    queryFn: () =>
      axios
        .get<Options[]>("http://localhost:3000/api/states")
        .then((res) => res.data),
  });
}

export function useLanguages() {
  return useQuery({
    queryKey: ["languages"],
    queryFn: () =>
      axios
        .get<Options[]>("http://localhost:3000/api/languages")
        .then((res) => res.data),
  });
}

export function useGenders() {
  return useQuery({
    queryKey: ["genders"],
    queryFn: () =>
      axios
        .get<Options[]>("http://localhost:3000/api/genders")
        .then((res) => res.data),
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () =>
      axios
        .get<Options[]>("http://localhost:3000/api/skills")
        .then((res) => res.data),
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: (): Promise<Useroptions[]> =>
      axios.get<ApiGet[]>("http://localhost:3000/api/users").then((res) =>
        res.data.map((user) => ({
          id: user.id,
          label: user.name,
        }))
      ),
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ["users", { id }],
    queryFn: (): Promise<Schema> =>
      axios
        .get<ApiGet>(`http://localhost:3000/api/users/${id}`)
        .then(
          ({ data }: { data: ApiGet }) =>
            ({
              varient: "edit",
              id: data.id,
              name: data.name,
              email: data.email,
              states: data.states,
              languageSpoken: data.languageSpoken,
              gender: data.gender,
              skills: data.skills,
              registartionDateAndTime: new Date(data.registrationDateAndTime),
              salary: data.salary,
              isTeacher: data.isTeacher,
              students: data.students,
            } satisfies Schema)
        )
        .catch((err) => {
          console.error(err.message ?? "error");
          throw err; // Rethrow the error to maintain the promise chain
        }),
    enabled: !!id, // only call the api if any id found
  });
}
