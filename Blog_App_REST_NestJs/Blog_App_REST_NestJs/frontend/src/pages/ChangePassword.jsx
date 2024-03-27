import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, InputAdornment } from '@mui/material';
import { toast } from 'react-toastify';
import {changePasswordUser} from "../services/user"


const defaultTheme = createTheme();

const ChangePassword = ({handleLogout})=> {

  const [check, setCheck] = React.useState(false)
  const [passwordVisible, setPasswordVisible] = React.useState(false);


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async(event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const newPassword = data.get('newPassword')
      const confirmPassword = data.get('confirmPassword')

      if (check === false) {
        return toast.warn("Please enable remember me")
      }

      const result = await changePasswordUser(newPassword, confirmPassword)

      if (result['status'] === 'success' && check === true) {
        toast.success(result["data"])
        handleLogout()
      } else {
        toast.error(result['data'])
      }
    } catch (er) {
      return toast.error(er.message)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              autoComplete="current-password"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={passwordVisible ? "text" : "password"}
                id="confirmPassword"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {passwordVisible ? <span className="material-symbols-outlined">
                        visibility
                        </span> : <span className="material-symbols-outlined">
                        visibility_off
                        </span>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            <FormControlLabel
              control={<Checkbox required value="remember" color="primary" onChange={(e)=> setCheck(e.target.checked)} />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{textTransform: "capitalize"}}
            >
              Change Password
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default ChangePassword
