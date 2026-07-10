import { useState, useEffect } from "react";

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  Box,
} from "@mui/material";

import {
  useMenu,
  useAddDish,
  useUpdateDish,
  useDeleteDish,
} from "./restaurent";

function App() {
  const {
    data: menu = [],
    isLoading,
    isError,
    error,
  } = useMenu();

  const addDish = useAddDish();
  const updateDish = useUpdateDish();
  const deleteDish = useDeleteDish();

  const [addForm, setAddForm] = useState({
    name: "",
    price: "",
  });

  const [updateForm, setUpdateForm] = useState({
    id: "",
    name: "",
    price: "",
  });

  const handleAddChange = (e) => {
    setAddForm({
      ...addForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateChange = (e) => {
    setUpdateForm({
      ...updateForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    addDish.mutate(addForm, {
      onSuccess: () => {
        setAddForm({
          name: "",
          price: "",
        });
      },
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    updateDish.mutate(
      {
        id: updateForm.id,
        dish: {
          name: updateForm.name,
          price: updateForm.price,
        },
      },
      {
        onSuccess: () => {
          setUpdateForm({
            id: "",
            name: "",
            price: "",
          });
        },
      }
    );
  };

  const handleDelete = (id) => {
    deleteDish.mutate(id);
  };

  const handleEdit = (dish) => {
    setUpdateForm({
      id: dish._id,
      name: dish.name,
      price: dish.price,
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        fontWeight="bold"
      >
        🍽 Restaurant Manager
      </Typography>

      <Grid container spacing={3}>
        {/* MENU CARD */}

        <Grid item xs={12} md={4}>
          <Card sx={{ minHeight: 550 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                My Menu
              </Typography>

              <Divider sx={{ mb: 2 }} />

              {isLoading && (
                <Typography>Loading Menu...</Typography>
              )}

              {isError && (
                <Typography color="error">
                  {error.message}
                </Typography>
              )}

              {!isLoading &&
                menu.map((dish) => (
                  <Box
                    key={dish._id}
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      p: 2,
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">
                      {dish.name}
                    </Typography>

                    <Typography sx={{ mb: 2 }}>
                      ₹ {dish.price}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={2}
                    >
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleEdit(dish)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          handleDelete(dish._id)
                        }
                        disabled={
                          deleteDish.isPending
                        }
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Box>
                ))}
            </CardContent>
          </Card>
        </Grid>

        {/* ADD CARD */}

        <Grid item xs={12} md={4}>
          <Card sx={{ minHeight: 550 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Add Dish
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <form onSubmit={handleAdd}>
                <Stack spacing={3}>
                  <TextField
                    label="Dish Name"
                    name="name"
                    value={addForm.name}
                    onChange={handleAddChange}
                    fullWidth
                  />

                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={addForm.price}
                    onChange={handleAddChange}
                    fullWidth
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    disabled={
                      addDish.isPending
                    }
                  >
                    {addDish.isPending
                      ? "Adding..."
                      : "Add Dish"}
                  </Button>

                  {addDish.isError && (
                    <Typography color="error">
                      Failed to Add Dish
                    </Typography>
                  )}

                  {addDish.isSuccess && (
                    <Typography color="green">
                      Dish Added Successfully
                    </Typography>
                  )}
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* UPDATE CARD */}

        <Grid item xs={12} md={4}>
          <Card sx={{ minHeight: 550 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Update Dish
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <form onSubmit={handleUpdate}>
                <Stack spacing={3}>
                  <TextField
                    label="Dish ID"
                    name="id"
                    value={updateForm.id}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />

                  <TextField
                    label="Dish Name"
                    name="name"
                    value={updateForm.name}
                    onChange={
                      handleUpdateChange
                    }
                    fullWidth
                  />

                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={updateForm.price}
                    onChange={
                      handleUpdateChange
                    }
                    fullWidth
                  />

                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={
                      updateDish.isPending
                    }
                  >
                    {updateDish.isPending
                      ? "Updating..."
                      : "Update Dish"}
                  </Button>

                  {updateDish.isError && (
                    <Typography color="error">
                      Update Failed
                    </Typography>
                  )}

                  {updateDish.isSuccess && (
                    <Typography color="green">
                      Dish Updated
                    </Typography>
                  )}
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
