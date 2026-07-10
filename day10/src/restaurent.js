import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import api from "./api";

const RESOURCE = "/menu";

// GET ALL
const getMenu = async () => {
  const response = await api.get(RESOURCE);
  return response.data;
};

// CREATE
const addDish = async (dish) => {
  const response = await api.post(RESOURCE, {
    name: dish.name,
    price: Number(dish.price),
  });

  return response.data;
};

// UPDATE
const updateDish = async ({ id, dish }) => {
  const response = await api.put(
    `${RESOURCE}/${id}`,
    {
      name: dish.name,
      price: Number(dish.price),
    }
  );

  return response.data;
};

// DELETE
const deleteDish = async (id) => {
  await api.delete(`${RESOURCE}/${id}`);
  return id;
};

// QUERY
export const useMenu = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
  });
};

// CREATE MUTATION
export const useAddDish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addDish,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menu"],
      });
    },
  });
};

// UPDATE MUTATION
export const useUpdateDish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDish,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menu"],
      });
    },
  });
};

// DELETE MUTATION
export const useDeleteDish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDish,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menu"],
      });
    },
  });
};