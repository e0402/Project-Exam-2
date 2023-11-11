import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const useFormLogic = (schema) => {
  return useForm({
    resolver: yupResolver(schema),
  });
};
