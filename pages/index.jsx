import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// Styles
import style from "../styles/modules/login/Login.module.css";

// Images
import login_img from "../public/images/login__img.jpg";

// Material Ui
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

// Formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Apollo Client
import { gql, useMutation } from "@apollo/client";

const AUTH = gql`
  mutation authUser($input: AuthInput) {
    authUser(input: $input) {
      token
    }
  }
`;

function Login() {
  // Routing
  const router = useRouter();

  const [alert, setAlert] = useState({
    mode: false,
    type: "",
    msg: "",
  });

  const [btn, setBtn] = useState({
    mode: false,
    msg: "Log In",
  });

  const [authUser] = useMutation(AUTH);

  // Validation form
  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    validationSchema: Yup.object({
      user: Yup.string().required("The user is required"),
      password: Yup.string().required("The password is required"),
    }),
    onSubmit: async (values) => {
      const { user, password } = values;

      try {
        const { data } = await authUser({
          variables: {
            input: {
              user,
              password,
            },
          },
        });

        setAlert({
          mode: true,
          type: "success",
          msg: "Authenticated user...",
        });

        const { token } = data.authUser;

        localStorage.setItem("token", token);

        setBtn({
          mode: true,
          msg: "Verifying...",
        });

        setTimeout(() => {
          router.push("dashboard");
        }, 500);

        // Save token in local storage
      } catch (error) {
        setAlert({
          mode: true,
          type: "error",
          msg: error.message,
        });

        setBtn({
          mode: true,
          msg: "Verifying...",
        });

        setTimeout(() => {
          setAlert({});
          setBtn({
            mode: false,
            msg: "Log In",
          });
        }, 3000);
      }
    },
  });

  return (
    <div className={`${style.login}`}>
      <div className={style.login__left}>
        <form
          onSubmit={formik.handleSubmit}
          method="post"
          className={`${style.login__form} rounded shadow_secondary`}
        >
          <h1 className="text_center f_500 mb_1">
            technical <span className={style.login__ctrl}>Test</span>
          </h1>
          {alert.mode ? (
            <Stack
              sx={{ width: "100%" }}
              spacing={2}
              marginTop={3}
              marginBottom={2}
            >
              <Alert severity={alert.type}>{alert.msg}</Alert>
            </Stack>
          ) : (
            ""
          )}
          <TextField
            id="user"
            label="😊 Username"
            variant="outlined"
            fullWidth
            required
            autoComplete="off"
            margin="normal"
            value={formik.values.user}
            onChange={formik.handleChange}
            error={formik.errors.user ? true : false}
            helperText={formik.errors.user}
          />
          <TextField
            id="password"
            type="password"
            label="🔒 Password"
            variant="outlined"
            fullWidth
            required
            autoComplete="off"
            margin="dense"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password ? true : false}
            helperText={formik.errors.password}
          />
          <button
            disabled={btn.mode}
            type="submit"
            className={`${style.btn__acceder} b_primary text_white pointer f_600 f_17 mt_1`}
          >
            {btn.msg}
          </button>
        </form>
        <small className={style.love}>With love, 4ndresdev 💓 </small>
      </div>
      <div className={style.login__right}>
        <Image
          src={login_img}
          alt="Image of a landscape "
          className={style.login__img}
        />
      </div>
    </div>
  );
}

export default Login;
