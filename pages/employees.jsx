import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/modules/layout/Layout.module.css";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Components
import Layout from "../components/Layout";
import _Card from "../components/_Card";

// Material Ui
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// Apollo client
import { useQuery, gql } from "@apollo/client";

const QUERY_GET_EMPLOYEES = gql`
  query getEmployees {
    getEmployees {
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

const Employees = () => {
  const [employees, setEmployees] = useState();
  const { data, loading, error } = useQuery(QUERY_GET_EMPLOYEES, {
    onCompleted: (result) => {
      setEmployees(result.getEmployees);
    },
    onError: (err) => {
      console.log("Error", err);
    },
  });

  if (loading) return "Loading...";

  const handleSearch = (e) => {
    let search = e.target.value;
    let expresion = new RegExp(`${search}.*`, "i");
    let result = data.getEmployees.filter((e) => {
      return (
        expresion.test(e.name) ||
        expresion.test(e.lastName) ||
        expresion.test(e.email) ||
        expresion.test(e.nationality) ||
        expresion.test(e.phone) ||
        expresion.test(e.civilStatus) ||
        expresion.test(e.birthday)
      );
    });

    if (!search) {
      setEmployees(data.getEmployees);
    } else {
      setEmployees(result);
    }
  };

  return (
    <Layout>
      <div className={`${styles.container}`}>
        <div className={`${styles.sidebar} shadow_primary`}>
          <Link href="/dashboard">
            <div className={styles.employeesLink}>Dashboard</div>
          </Link>
        </div>
        <div className={styles.content}>
          <h1>Employees</h1>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <TextField
                label="🔎 Search"
                variant="outlined"
                fullWidth
                autoComplete="off"
                margin="normal"
                onKeyUp={handleSearch}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} marginTop={2}>
            {employees &&
              employees.map((element) => (
                <Grid key={element.id} item xs={12} md={6} lg={4} xl={3}>
                  <_Card
                    id={element.id}
                    name={element.name}
                    lastName={element.lastName}
                    email={element.email}
                    nationality={element.nationality}
                    phone={element.phone}
                    civilStatus={element.civilStatus}
                    birthday={element.birthday}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
        <Link href="/dashboard">
          <div className={styles.btn_float}>Dashboard</div>
        </Link>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Layout>
  );
};

export default Employees;
