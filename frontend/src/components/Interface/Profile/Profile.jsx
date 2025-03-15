import React, { useState } from "react";

import {
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography as Text,
} from "@mui/material";

import ShortTextIcon from "@mui/icons-material/ShortText";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import WcIcon from "@mui/icons-material/Wc";
import CakeIcon from "@mui/icons-material/Cake";

import TableRowNoBorder from "../../../UI/Tables/TableRows/TableRowNoBorder";
import ButtonSecondary from "../../../UI/Buttons/ButtonSecondary";
import EditProfile from "./EditProfile/EditProfile";
import EditPassword from "./EditPassword/EditPassword";

import { useIsWidthUp, prettyDate } from "../../../utils/utils";

const Profile = ({ user, setUser }) => {
  const isMdUp = useIsWidthUp("sm");

  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openEditPassword, setOpenEditPassword] = useState(false);

  return (
    <>
      <EditProfile
        user={user}
        setUser={setUser}
        open={openEditProfile}
        setOpen={setOpenEditProfile}
      />
      <EditPassword
        user={user}
        setUser={setUser}
        open={openEditPassword}
        setOpen={setOpenEditPassword}
      />
      <Stack
        direction="row"
        justifyContent="space-around"
        p={isMdUp ? 3 : 0}
        sx={{ mt: isMdUp ? 0 : 2, mb: 2 }}
        // inerted="true"
      >
        <ButtonSecondary
          startIcon={<EditIcon />}
          onClick={() => setOpenEditProfile(true)}
        >
          Datos
        </ButtonSecondary>
        <ButtonSecondary
          startIcon={<EditIcon />}
          onClick={() => setOpenEditPassword(true)}
        >
          Contraseña
        </ButtonSecondary>
      </Stack>
      <TableContainer>
        <Table aria-label="simple table" size="small">
          <TableBody>
            <TableRowNoBorder hover={true}>
              {isMdUp && (
                <TableCell align="center" component="th" scope="row">
                  <PersonIcon sx={{ color: "primary.main" }} />
                </TableCell>
              )}
              <TableCell>
                <Text fontWeight={500}>Rol</Text>
              </TableCell>
              <TableCell>
                <Text>
                  {user.role === "student" ? "Estudiante" : "Profesor"}
                </Text>
              </TableCell>
            </TableRowNoBorder>
            <TableRowNoBorder hover={true}>
              {isMdUp && (
                <TableCell align="center" component="th" scope="row">
                  <ShortTextIcon sx={{ color: "primary.main" }} />
                </TableCell>
              )}
              <TableCell>
                <Text fontWeight={500}>Nombres</Text>
              </TableCell>
              <TableCell>
                <Text>{user.first_name}</Text>
              </TableCell>
            </TableRowNoBorder>
            <TableRowNoBorder hover={true}>
              {isMdUp && (
                <TableCell align="center" component="th" scope="row">
                  <ShortTextIcon sx={{ color: "primary.main" }} />
                </TableCell>
              )}
              <TableCell>
                <Text fontWeight={500}>Apellidos</Text>
              </TableCell>
              <TableCell>
                <Text>{user.last_name}</Text>
              </TableCell>
            </TableRowNoBorder>
            <TableRowNoBorder hover={true}>
              {isMdUp && (
                <TableCell align="center" component="th" scope="row">
                  <AssignmentIndIcon sx={{ color: "primary.main" }} />
                </TableCell>
              )}
              <TableCell>
                <Text fontWeight={500}>Documento</Text>
              </TableCell>
              <TableCell>
                <Text>{user.document}</Text>
              </TableCell>
            </TableRowNoBorder>
            <TableRowNoBorder hover={true}>
              {isMdUp && (
                <TableCell align="center" component="th" scope="row">
                  <WcIcon sx={{ color: "primary.main" }} />
                </TableCell>
              )}
              <TableCell>
                <Text fontWeight={500}>Género</Text>
              </TableCell>
              <TableCell>
                <Text>
                  {user.gender === "male"
                    ? "Masculino"
                    : user.gender === "female"
                    ? "Femenino"
                    : ""}
                </Text>
              </TableCell>
            </TableRowNoBorder>
            <TableRowNoBorder hover={true}>
              {isMdUp && (
                <TableCell align="center" component="th" scope="row">
                  <CakeIcon sx={{ color: "primary.main" }} />
                </TableCell>
              )}
              <TableCell>
                <Text fontWeight={500}>Nacimiento</Text>
              </TableCell>
              <TableCell>
                <Text>
                  {prettyDate(user.birth)} ({user.age} años)
                </Text>
              </TableCell>
            </TableRowNoBorder>
            <TableRowNoBorder hover={true}>
              {isMdUp && (
                <TableCell align="center" component="th" scope="row">
                  <EmailIcon sx={{ color: "primary.main" }} />
                </TableCell>
              )}
              <TableCell>
                <Text fontWeight={500}>Correo</Text>
              </TableCell>
              <TableCell>
                <Link href={`mailto:${user.email}`}>
                  <Text>{user.email}</Text>
                </Link>
              </TableCell>
            </TableRowNoBorder>
            <TableRowNoBorder hover={true}>
              {isMdUp && (
                <TableCell align="center" component="th" scope="row">
                  <PhoneIcon sx={{ color: "primary.main" }} />
                </TableCell>
              )}
              <TableCell>
                <Text fontWeight={500}>Celular</Text>
              </TableCell>
              <TableCell>
                <Link
                  href={`https://api.whatsapp.com/send?phone=${user.phone?.slice(
                    1
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text>{user.phone}</Text>
                </Link>
              </TableCell>
            </TableRowNoBorder>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Profile;
