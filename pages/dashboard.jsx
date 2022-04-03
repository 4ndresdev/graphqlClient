import React from "react";
import Link from "next/link";
import styles from "../styles/modules/layout/Layout.module.css";

// Import Components
import Layout from "../components/Layout";

// Material Ui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Icons
import BadgeIcon from "@mui/icons-material/Badge";

// Apollo client
import { useQuery, gql } from "@apollo/client";

const QUERY_GET_EMPLOYEES = gql`
  query getEmployees {
    getEmployees {
      id
    }
  }
`;

const Dashboard = () => {
  const { data, loading, error } = useQuery(QUERY_GET_EMPLOYEES);

  if (loading) return null;

  return (
    <Layout>
      <div className={`${styles.container}`}>
        <div className={`${styles.sidebar} shadow_primary`}>
          <Link href="/employees">
            <div className={styles.employeesLink}>Employees</div>
          </Link>
        </div>
        <div className={styles.content}>
          <h1>Dashboard</h1>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <div className={`${styles.ab_card} shadow_primary`}>
                <div className={styles.circle}>
                  <BadgeIcon />
                </div>
                <div className={styles.total}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Number of employees
                  </Typography>
                  <Typography variant="h5" fontWeight={800}>
                    {data ? data?.getEmployees.length : 0}
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>

        <Link href="/employees">
          <div className={styles.btn_float}>Employees</div>
        </Link>
      </div>
    </Layout>
  );
};

export default Dashboard;
