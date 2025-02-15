import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Schema } from "../types/schema";
import axios from "axios";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["postUser"],
    mutationFn: async (data: Schema) => {
      await axios.post("http://localhost:3000/api/user", data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      alert("user created")
    },
  });
}
