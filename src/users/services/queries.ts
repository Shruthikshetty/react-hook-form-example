import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Options } from "../../types/options";

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
