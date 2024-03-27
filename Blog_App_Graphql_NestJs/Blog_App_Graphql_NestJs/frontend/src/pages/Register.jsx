import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { IconButton, InputAdornment } from "@mui/material";
import { useMutation } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "../mutations/user";

const defaultTheme = createTheme();

const Register = () => {
  const [check, setCheck] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [registerUserMutation] = useMutation(REGISTER_USER_MUTATION);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const firstName = data.get("firstName");
      const lastName = data.get("lastName");
      const email = data.get("email");
      const phone_number = data.get("phone_number");
      const password = data.get("password");
      const confirmPassword = data.get("confirmPassword");

      if (check === false) {
        return toast.warn("Please enable remember me");
      }
      if (!firstName) {
        return toast.warn("Please fill firstName");
      } else if (!lastName) {
        return toast.warn("Please fill lastName");
      } else if (!email) {
        return toast.warn("Please fill email");
      } else if (!phone_number) {
        return toast.warn("Please fill phone number");
      } else if (!password) {
        return toast.warn("Please fill password");
      } else if (password.length < 8) {
        return toast.warn("Password must be of 8 length");
      } else if (!confirmPassword) {
        return toast.warn("Please fill confirm password");
      } else if (confirmPassword.length < 8) {
        return toast.warn("Confirm password must be of 8 length");
      } else if (password !== confirmPassword) {
        return toast.warn("Password & confirm password are not matching");
      }

      const result = await registerUserMutation({
        variables: {
          firstName,
          lastName,
          email,
          phone_number,
          password,
        },
      });

      // Handle the response as needed
      if (result.data.Register.status === "success" && check === true) {
        toast.success(result.data.Register.data);
        navigate("/login");
      } else {
        toast.error(result["data"].Register.data);
      }
    } catch (er) {
      console.log(er);
      return toast.error(er.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone_number"
                  label="Phone Number"
                  name="phone_number"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={passwordVisible ? "text" : "password"}
                  id="confirmPassword"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility}>
                          {passwordVisible ? (
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          ) : (
                            <span className="material-symbols-outlined">
                              visibility_off
                            </span>
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      required
                      value="allowExtraEmails"
                      color="primary"
                      onChange={(e) => setCheck(e.target.checked)}
                    />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
