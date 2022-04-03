import React, { useState } from "react";

// Toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";

// Formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Apollo Client
import { gql, useMutation } from "@apollo/client";

const EDIT_EMPLOYEE = gql`
  mutation editEmployee($id: ID!, $input: EditEmployeeInput) {
    editEmployee(id: $id, input: $input) {
      id
      name
      lastName
      email
      nationality
      phone
      civilStatus
      birthday
    }
  }
`;

const _Card = ({
  id,
  name,
  lastName,
  email,
  nationality,
  phone,
  civilStatus,
  birthday,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editEmployee] = useMutation(EDIT_EMPLOYEE);

  const handleEdit = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Formik
  const formik = useFormik({
    initialValues: {
      name: name,
      lastName: lastName,
      email: email,
      phone: phone,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("The name is required"),
      lastName: Yup.string().required("The last name is required"),
      email: Yup.string()
        .email("The email is not valid")
        .required("The email is required"),
      phone: Yup.string()
        .min(10, "Cannot be less than 10 digits")
        .max(10, "Cannot be greater than 10 digits")
        .required("The phone is required"),
    }),
    onSubmit: async (values) => {
      const { name, lastName, email, phone } = values;

      try {
        const { data } = await editEmployee({
          variables: {
            id: id,
            input: {
              name,
              lastName,
              email,
              phone,
            },
          },
        });

        setModalOpen(false);
        toast.success("🚀 User updated successfully", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        setModalOpen(false);
        toast.error("😢 There was a problem trying to update the user", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
  });

  return (
    <>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {birthday}
          </Typography>
          <Typography variant="h5" component="div">
            {name} {lastName}
          </Typography>
          <Chip label={civilStatus} color="primary" size="small" />
          <Typography variant="body2" marginTop={2}>
            📧 Email: {email}{" "}
          </Typography>
          <Typography variant="body2">
            🏁 Nationality: {nationality}{" "}
          </Typography>
          <Typography variant="body2">📞 Phone: {phone}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEdit}>
            Edit Employee
          </Button>
        </CardActions>
      </Card>

      <Dialog open={modalOpen}>
        <form method="post" onSubmit={formik.handleSubmit}>
          <DialogTitle>User Edit</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit employee information</DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  autoComplete="off"
                  margin="normal"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.errors.name ? true : false}
                  helperText={formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                  autoComplete="off"
                  margin="normal"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.errors.lastName ? true : false}
                  helperText={formik.errors.lastName}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <TextField
                  id="email"
                  label="📧 Email"
                  variant="outlined"
                  fullWidth
                  required
                  autoComplete="off"
                  margin="normal"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.errors.email ? true : false}
                  helperText={formik.errors.email}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <TextField
                  id="phone"
                  label="📞 Phone"
                  variant="outlined"
                  fullWidth
                  required
                  autoComplete="off"
                  margin="normal"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.errors.phone ? true : false}
                  helperText={formik.errors.phone}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit">Edit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default _Card;
