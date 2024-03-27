import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AccountCircle from '@mui/icons-material/AccountCircle';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { pages } from "../data"
import { Link } from 'react-router-dom';
// import Search from './Search';


function NavBar({isLogin,handleLogout}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              marginRight: "50px"
            }}
          >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>Blog App</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {isLogin === false ?
              pages.filter((p)=>{
                return p.enable === true
              }).map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link to={page.path} style={{ color: "inherit", textDecoration: "none" }}>
                    <Typography textAlign="center" style={{textTransform: "capitalize"}}>{page.title}</Typography>
                  </Link>
                </MenuItem>
              )) :
            pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link to={page.path} style={{ color: "inherit", textDecoration: "none" }}>
                    <Typography textAlign="center" style={{textTransform: "capitalize"}}>{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))
            }
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Blog App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {isLogin === false ? pages.filter((p)=>{
                return p.enable === true
              }).map((page, index) => (
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'inherit', display: 'block' }}
              >
                <Link to={page.path} style={{ color: "inherit", backgroundColor: "red", textDecoration: "none" }}>
                    <Typography textAlign="center" style={{textTransform: "capitalize"}}>{page.title}</Typography>
                  </Link>
              </Button>
            )):

          pages.map((page, index) => (
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'inherit', display: 'block' }}
              >
                <Link to={page.path} style={{ color: "inherit", backgroundColor: "red", textDecoration: "none" }}>
                    <Typography textAlign="center" style={{textTransform: "capitalize"}}>{page.title}</Typography>
                  </Link>
              </Button>
            ))
          }
          </Box>
          {/* <Search /> */}
          {isLogin === true && 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleOpenUserMenu} >
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to="/my-profile" style={{ color: "inherit", textDecoration: "none" }}>
                    <Typography textAlign="center">Profile</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link onClick={handleLogout} style={{ color: "inherit", textDecoration: "none" }}>
                    <Typography textAlign="center">Logout</Typography>
                  </Link>
                </MenuItem>
            </Menu>
          </Box>
          }
          {
            isLogin === false && <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'inherit', display: 'block' }}
          >
            <Link to="/login" style={{ color: "inherit", backgroundColor: "red", textDecoration: "none" }}>
                <Typography textAlign="center" style={{textTransform: "capitalize"}}>Login</Typography>
              </Link>
          </Button>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar
