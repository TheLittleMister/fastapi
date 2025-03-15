import React, { useState, useEffect } from "react";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { Reorder } from "framer-motion";
import {
  FormControl,
  IconButton,
  Input,
  InputLabel,
  List,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography as Text,
  Chip,
  Snackbar,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import CancelIcon from "@mui/icons-material/Cancel";

import Form from "../../../UI/Forms/Form";
import Task from "./Task/Task";
import { getTokens, refreshAccessToken, urlAPI } from "../../../utils/utils";

const Tasks = ({ user, setUser }) => {
  const [tasks, setTasks] = useState([]);
  const [order, setOrder] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [due, setDue] = useState("future");
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const tasksHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tokens = getTokens();
    const dataArr = [...new FormData(e.target)];
    const dataObj = Object.fromEntries(dataArr);

    const result = await fetch(urlAPI + `tasks/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokens.access,
      },
      body: JSON.stringify(dataObj),
    });

    // const data = await result.json();

    if (result.status === 401) {
      const refreshed = await refreshAccessToken(
        result.statusText,
        tokens.refresh,
        setUser
      );
      if (refreshed) tasksHandler(e);
      else setLoading(false);
      return;
    }

    // console.log(data);
    setReload(true);
    setLoading(false);
    setSnackMessage("Tarea agregada");
    setSnackOpen(true);

    document.getElementById("title").value = "";
  };

  const reorder = async (tasks_) => {
    const reorderDataBase = async (_tasks) => {
      //console.log("Updating order in DB");
      const tokens = getTokens();

      const dataObj = {
        tasks: _tasks.map((task) => task.id),
        order: order,
      };

      const result = await fetch(urlAPI + `tasks/reorder/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokens.access,
        },
        body: JSON.stringify(dataObj),
      });

      // const data = await result.json();

      if (result.status === 401) {
        const refreshed = await refreshAccessToken(
          result.statusText,
          tokens.refresh,
          setUser
        );

        if (refreshed) reorder();
        else setLoading(false);
        return;
      }

      // setReload(true);
    };

    setTasks(tasks_);
    reorderDataBase(tasks_);
    // console.log(data);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  useEffect(() => {
    const getTasks = async () => {
      const tokens = getTokens();
      setLoading(true);

      if (date) date.setHours(23, 59, 59, 999);

      const result = await fetch(
        urlAPI + `tasks/tasks/?completed=${completed}&due=${due}&date=${date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokens.access,
          },
        }
      );

      const data = await result.json();

      if (result.status === 401) {
        const refreshed = await refreshAccessToken(
          result.statusText,
          tokens.refresh,
          setUser
        );
        if (refreshed) getTasks();
        else setLoading(false);
        return;
      }

      // console.log(data.tasks);
      setTasks(data.tasks);
      setLoading(false);

      setOrder(data.tasks.map((task) => task.order));
    };

    getTasks();

    if (reload) setReload(false);
  }, [setUser, reload, completed, due, date]);

  return (
    <Stack
      direction="row"
      flexWrap="wrap-reverse"
      justifyContent="space-around"
    >
      <Stack flex={2} sx={{ minWidth: "45rem" }}>
        <Form
          onSubmit={tasksHandler}
          messages={[]}
          loading={loading}
          collapseOpen={false}
          setCollapseOpen={() => {}}
          submitText="Agregar"
          direction="row"
        >
          <Tooltip title="Borrar Búsqueda" placement="top">
            <IconButton
              onClick={() => (document.getElementById("title").value = "")}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
          <Input
            id="title"
            placeholder="Agregar tarea"
            name="title"
            //value={searchInput}
            //onChange={(e) => setSearchInput(e.target.value)}
            required
            sx={{ width: "75%" }}
          />
        </Form>
        <Reorder.Group onReorder={reorder} values={tasks}>
          <List>
            {tasks.map((task, index) => (
              <Task
                index={index}
                key={task.order}
                task={task}
                reorder={reorder}
                setReload={setReload}
                setUser={setUser}
                setSnackMessage={setSnackMessage}
                setSnackOpen={setSnackOpen}
              />
            ))}
          </List>
        </Reorder.Group>
      </Stack>
      <Stack flex={1}>
        <FormControl variant="filled" sx={{ m: 2, minWidth: 300 }}>
          <InputLabel id="completed-select-small">Tareas</InputLabel>
          <Select
            labelId="completed-select-small"
            id="completed-select-small"
            value={completed}
            label="Completadas"
            autoWidth
            onChange={(e) => setCompleted(e.target.value)}
            sx={{ backgroundColor: "transparent" }}
          >
            <MenuItem value={false}>
              <Text>No completadas</Text>
            </MenuItem>
            <MenuItem value={true}>
              <Text>Completadas</Text>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 2, minWidth: 300 }}>
          <InputLabel id="due-select-small">Fechas</InputLabel>
          <Select
            labelId="due-select-small"
            id="due-select-small"
            value={due}
            label="Futuras"
            autoWidth
            onChange={(e) => setDue(e.target.value)}
            sx={{ backgroundColor: "transparent" }}
          >
            <MenuItem value="future">
              <Text>Futuras</Text>
            </MenuItem>
            <MenuItem value="past">
              <Text>Pasadas</Text>
            </MenuItem>
            <MenuItem value="present">
              <Text>Sin Fecha</Text>
            </MenuItem>
          </Select>
          <br />
          <Chip
            variant="outlined"
            icon={<CancelIcon />}
            label="Borrar Fecha"
            onClick={() => setDate(null)}
            // onDelete={() => setDate(null)}
            color="primary"
          />
        </FormControl>
        {/*<LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar onChange={(e) => setDate(new Date(e))} value={date} />
        </LocalizationProvider>*/}
      </Stack>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3500}
        onClose={handleClose}
        message={snackMessage}
        // action={action}
      />
    </Stack>
  );
};

export default Tasks;
