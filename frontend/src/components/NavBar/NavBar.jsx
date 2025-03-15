import { AppBar, Container, Toolbar, Stack } from "@mui/material";

import logo from "../../UI/Logo/focused.png";

import classes from "./NavBar.module.css";
import * as styles from "./NavBarStyles";
import { Link } from "react-router";
import Auth from "./Auth/Auth";

const NavBar = () => {
  return (
    <AppBar className={classes.navbar} sx={styles.navBar} position="static">
      <Toolbar>
        <Container>
          <Stack sx={styles.stack}>
            <Link to="/">
              <img
                src={logo}
                style={{ maxWidth: "20rem" }}
                alt="Focused Logo"
              />
            </Link>
            <Auth />
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
