import React, { useState } from "react";

import { Reorder, useDragControls } from "framer-motion";
import {
  Checkbox,
  Chip,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography as Text,
} from "@mui/material";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditTask from "./EditTask/EditTask";
import {
  getTokens,
  prettyCountdownDate,
  refreshAccessToken,
  urlAPI,
} from "../../../../utils/utils";

import FlagIcon from "@mui/icons-material/Flag";

const Task = ({
  index,
  task,
  setReload,
  setUser,
  setSnackMessage,
  setSnackOpen,
}) => {
  // const y = useMotionValue(0);
  const controls = useDragControls();
  const [checked, setChecked] = useState(task.completed);
  const [open, setOpen] = useState(false);

  const taskCheckedHandler = async (e) => {
    setChecked(e.target.checked);

    const tokens = getTokens();
    const dataObj = { ...task, completed: e.target.checked };

    const result = await fetch(urlAPI + `tasks/completed/`, {
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
      if (refreshed) taskCheckedHandler(e);
      return;
    }

    setReload(true);

    if (e.target.checked) {
      setSnackMessage("Tarea completada");
      setSnackOpen(true);
    } else {
      setSnackMessage("Tarea desmarcada");
      setSnackOpen(true);
    }
  };

  return (
    <>
      <EditTask
        task={task}
        open={open}
        setOpen={setOpen}
        setReload={setReload}
        setSnackMessage={setSnackMessage}
        setSnackOpen={setSnackOpen}
      />
      <Reorder.Item
        id={task}
        value={task}
        dragListener={false}
        // style={{ y }}
        dragControls={controls}
      >
        <ListItem
          sx={index % 2 === 0 ? { backgroundColor: "#c15c5c0f" } : {}}
          onClick={(e) => {
            if (["SPAN", "DIV", "path", "P"].includes(e.target.tagName))
              setOpen(true);
          }}
          // sx={{ backgroundColor: "primary.bg" }}
          component="div"
          disablePadding
          secondaryAction={
            <IconButton
              edge="start"
              aria-label="comments"
              sx={{ cursor: "move", touchAction: "none" }}
              onPointerDown={(e) => controls.start(e)}
              // onPointerUp={(e) => reorder()}
            >
              <DragIndicatorIcon />
            </IconButton>
          }
        >
          <ListItemButton
            role={undefined}
            // onClick={handleToggle(value)}
            dense
          >
            <ListItemIcon>
              <Checkbox
                edge="end"
                checked={checked}
                tabIndex={-1}
                disableRipple
                onChange={(e) => taskCheckedHandler(e)}
              />
            </ListItemIcon>
            <Stack sx={{ width: "100%" }} direction={"row"} flexWrap={"wrap"}>
              <ListItemText
                // id={labelId}
                primary={
                  task.title.length > 0
                    ? task.title.length > 30
                      ? task.title.slice(0, 30) + "..."
                      : task.title
                    : null
                }
                secondary={
                  task.description.length > 0
                    ? task.description.length > 40
                      ? task.description.slice(0, 40) + "..."
                      : task.description
                    : null
                }
              />
              <ListItemText
                sx={{ textAlign: "right", mr: 2 }}
                primary={
                  <Chip
                    // color="primary"

                    size="small"
                    label={
                      <Text color="secondary">
                        {task.due ? prettyCountdownDate(task.due) : ""}
                      </Text>
                    }
                    icon={
                      <FlagIcon
                        color={
                          task.priority === "medium"
                            ? "info"
                            : task.priority === "high"
                            ? "warning"
                            : ""
                        }
                      />
                    }
                  />
                }
                // secondary={task.priority}
              />
            </Stack>
          </ListItemButton>
        </ListItem>
      </Reorder.Item>
    </>
  );
};

export default Task;
