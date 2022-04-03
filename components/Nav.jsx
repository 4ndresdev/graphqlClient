import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/modules/layout/Layout.module.css";

// Material Ui
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Apollo client
import { useQuery, gql } from "@apollo/client";

const GET_USER = gql`
  query getUser {
    getUser {
      name
      lastName
    }
  }
`;

const Nav = () => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const { data, loading, error } = useQuery(GET_USER);

  if (loading) return null;

  const { name, lastName } = data.getUser;

  return (
    <div className={`${styles.nav} shadow_primary`}>
      <Link href="/dashboard">
        <Avatar
          alt="Company"
          src="https://media.glassdoor.com/sqll/1149869/beliveo-squarelogo-1634292945542.png"
          className={`${styles.avatar} pointer`}
        />
      </Link>
      <div className={styles.nav__user}>
        <Avatar
          alt="Profile"
          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          className={styles.avatar}
        />
        <Button
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {name} {lastName}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Nav;
