import React, { useContext, useState, useMemo } from "react";
import ModalUI from "../../../../../UI/Modals/ModalUI";
import Form from "../../../../../UI/Forms/Form";
import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

import * as styles from "./EditTaskStyles";
import Field from "../../../../../UI/Fields/Field";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import ModalTitle from "../../../../../UI/Modals/ModalTitle";
import {
  getTokens,
  refreshAccessToken,
  urlAPI,
} from "../../../../../utils/utils";
import { AuthContext } from "../../../../../context/AuthContext";

import CancelIcon from "@mui/icons-material/Cancel";
import DeleteTask from "./DeleteTask/DeleteTask";

const EditTask = ({
  task,
  open,
  setOpen,
  setReload,
  setSnackMessage,
  setSnackOpen,
}) => {
  const { setUser } = useContext(AuthContext);
  const [openDelete, setOpenDelete] = useState(false);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(false);

  const [priority, setPriority] = useState(task.priority);

  const [due, setDue] = useState(task.due ? new Date(task.due) : null);

  const editTaskHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCollapseOpen(false);

    const tokens = getTokens();
    const dataArr = [...new FormData(e.target)];
    const dataObj = Object.fromEntries(dataArr);

    const due_ = due ? new Date(due) : null;
    due_ && due_.setHours(23, 59, 59, 999);

    dataObj["due"] = due_ ? due_ : "";
    dataObj["id"] = task.id;

    const result = await fetch(urlAPI + `tasks/task/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokens.access,
      },
      body: JSON.stringify(dataObj),
    });

    const data = await result.json();

    if (result.status === 401) {
      const refreshed = await refreshAccessToken(
        result.statusText,
        tokens.refresh,
        setUser
      );
      if (refreshed) editTaskHandler(e);
      else setLoading(false);
      return;
    }

    if (data.detail || (data.errors && data.errors.length > 0)) {
      setMessages(data.errors || [data.detail]);
      setCollapseOpen(true);
    } else {
      setReload(true);
      setOpen(false);
    }

    setLoading(false);
  };

  const randomFruit = useMemo(
    () =>
      ["🍇", "🍉", "🍊", "🍋", "🍌", "🍍", "🍎", "🍏", "🍒", "🍓"][
        Math.floor(Math.random() * 10)
      ],
    []
  );

  return (
    <ModalUI open={open} setOpen={setOpen}>
      <DeleteTask
        setUser={setUser}
        task={task}
        setReload={setReload}
        setOpen={setOpen}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        setSnackMessage={setSnackMessage}
        setSnackOpen={setSnackOpen}
      />
      <ModalTitle>
        <Chip
          variant="outlined"
          icon={<CancelIcon />}
          label={`Borrar ${randomFruit}`}
          onClick={() => setOpenDelete(true)}
          // onDelete={() => setDate(null)}
          color="primary"
        />{" "}
        {/* {randomFruit} */}
      </ModalTitle>
      <Form
        onSubmit={editTaskHandler}
        messages={messages}
        loading={loading}
        collapseOpen={collapseOpen}
        setCollapseOpen={setCollapseOpen}
        submitText="Actualizar"
      >
        <Stack
          sx={{
            width: "100%",
            "& textarea": {
              color: "primary.main",
            },
          }}
          gap={2}
        >
          <Field
            id="outlined-textarea"
            label="Título"
            placeholder="Título"
            name="title"
            defaultValue={task.title}
            required
            fullWidth
          />
          <Field
            id="outlined-textarea"
            label="Descripción"
            placeholder="Descripción"
            name="description"
            defaultValue={task.description}
            multiline
            rows={4}
          />
        </Stack>

        <Stack sx={styles.stack}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Prioridad</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              label="priority"
              name="priority"
              required
              onChange={(e) => setPriority(e.target.value)}
              sx={styles.priority}
            >
              <MenuItem value="low">Baja</MenuItem>
              <MenuItem value="medium">Media</MenuItem>
              <MenuItem value="high">Alta</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              name="due"
              format="dd/MM/yyyy"
              label="Fecha de Vencimiento"
              value={due}
              onChange={(newValue) => {
                setDue(newValue);
              }}
              slotProps={{
                textField: {
                  variant: "outlined",
                  sx: styles.datepicker,
                },
              }}
            />
          </LocalizationProvider>
        </Stack>
      </Form>
    </ModalUI>
  );
};

export default EditTask;
