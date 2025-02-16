import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Schema } from "../types/schema";
import axios from "axios";
import { mapData } from "../../util/mapData";
import { omit } from "lodash";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["postUser"],
    mutationFn: async (data: Schema) => {
      await axios.post(
        "http://localhost:3000/api/user",
        omit(mapData(data), "varient")
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      alert("user created");
    },
  });
}

export function useEditUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["patchUser"],
    mutationFn: async (data: Schema) => {
      if (data.varient === "edit") {
        await axios.patch(
          `http://localhost:3000/api/users/${data.id}`,
          omit(mapData(data), "varient")
        );
        alert("user has been updated");
      }
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });

      if (variables.varient === "edit") {
        await queryClient.invalidateQueries({
          queryKey: ["users", { id: variables.id }],
        });
      }
    },
  });
}
