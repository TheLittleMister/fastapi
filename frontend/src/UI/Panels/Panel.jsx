import React, { useState, useEffect, useContext } from "react";
import {
  Avatar,
  Badge,
  Box,
  Container,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Tabs,
  Chip,
  Typography as Text,
} from "@mui/material";
import { useNavigate } from "react-router";
import UploadImage from "../../utils/UploadImage/UploadImage";
import { useIsWidthDown, useIsWidthUp } from "../../utils/utils";
import TableRowNoBorder from "../Tables/TableRows/TableRowNoBorder";

import ButtonPrimary from "../Buttons/ButtonPrimary";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import * as styles from "./PanelStyles";
import classes from "./Panel.module.css";
import { AuthContext } from "../../context/AuthContext";

import { useLocation } from "react-router";

const Panel = (props) => {
  const handleTabLocation = (tabs, pathname) =>
    tabs.findIndex(
      (item) => item.link === pathname.split("/").slice(0, 3).join("/")
    );

  const handleChangeTab = (e, newValue) => {
    navigate(props.tabs[newValue].link);
    setTabValue(newValue);
  };

  const imageSelected = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      setOpen(true);
    }
  };

  const location = useLocation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState(() =>
    handleTabLocation(props.tabs, location.pathname)
  );
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState("");
  const isMdUp = useIsWidthUp("md");
  const is500Down = useIsWidthDown(500);

  useEffect(() => {
    setTabValue(handleTabLocation(props.tabs, location.pathname));
  }, [location.pathname, props.tabs]);

  return (
    <Box className={classes.panel}>
      <UploadImage
        photo={photo}
        open={open}
        setOpen={setOpen}
        user={props.user}
        setUser={props.setUser}
        uploadPath={"users/photo/"}
        aspect={1 / 1}
        title="Foto Perfil"
      />
      <Container maxWidth="xl">
        <Stack direction={useIsWidthUp(900) ? "row" : "column"} paddingTop={2}>
          <Box flex={1} sx={styles.box}>
            {useIsWidthUp(900) && (
              <TableContainer sx={styles.tableContainer}>
                <Table aria-label="simple table" size="small">
                  <TableBody>
                    <TableRowNoBorder>
                      <TableCell>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={
                            user.role === "admin" ||
                            user.role === "superadmin" ||
                            props.user.id === user.id ? (
                              <ButtonPrimary
                                variant="contained"
                                sx={styles.changePhoto}
                                onClick={() =>
                                  document
                                    .querySelector(
                                      `#id_file_${String(props.user.id)}`
                                    )
                                    .click()
                                }
                              >
                                <input
                                  type="file"
                                  name="image"
                                  id={`id_file_${String(props.user.id)}`}
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  onChange={imageSelected}
                                />
                                <AddAPhotoIcon
                                  fontSize="medium"
                                  color="primary"
                                />
                              </ButtonPrimary>
                            ) : (
                              ""
                            )
                          }
                        >
                          <Avatar
                            alt={String(props.user.id)}
                            src={props.user.photo}
                            sx={styles.avatar}
                          />
                        </Badge>
                      </TableCell>
                    </TableRowNoBorder>
                    <TableRowNoBorder>
                      <TableCell>
                        <Text fontWeight={500}>
                          @{props.user.full_name.slice(0, 15)}
                        </Text>
                      </TableCell>
                    </TableRowNoBorder>

                    <TableRowNoBorder>
                      <TableCell>
                        <Chip
                          color="primary"
                          label={
                            props.user.role === "student"
                              ? "Estudiante"
                              : props.user.role === "teacher"
                              ? "Profesor"
                              : "Padre"
                          }
                        />
                      </TableCell>
                    </TableRowNoBorder>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <br />
            <Tabs
              orientation={isMdUp ? "vertical" : "horizontal"}
              value={tabValue}
              onChange={handleChangeTab}
              variant={isMdUp || is500Down ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              textColor="inherit"
              indicatorColor="primary"
            >
              {props.tabs.map((item, index) => (
                <Tab
                  key={index}
                  {...item.options}
                  sx={styles.tab.bind(null, { tabValue, index })}
                />
              ))}
            </Tabs>
          </Box>
          <Box flex={3}>{props.children}</Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Panel;
