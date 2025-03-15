import React, { useState } from "react";
import ModalUI from "../../../../../../UI/Modals/ModalUI";
import ModalTitle from "../../../../../../UI/Modals/ModalTitle";
import { Box, Stack } from "@mui/material";
import ButtonLoading from "../../../../../../UI/Buttons/ButtonLoading";
import ButtonSecondary from "../../../../../../UI/Buttons/ButtonSecondary";
import {
  getTokens,
  refreshAccessToken,
  urlAPI,
} from "../../../../../../utils/utils";

const DeleteTask = ({
  setUser,
  task,
  setReload,
  openDelete,
  setOpen,
  setOpenDelete,
  setSnackMessage,
  setSnackOpen,
}) => {
  const [loading, setLoading] = useState(false);

  const deleteTaskHandler = async () => {
    setLoading(true);
    const tokens = getTokens();

    const result = await fetch(urlAPI + `tasks/task/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokens.access,
      },
      body: JSON.stringify({ id: task.id }),
    });

    if (result.status === 401) {
      const refreshed = await refreshAccessToken(
        result.statusText,
        tokens.refresh,
        setUser
      );
      if (refreshed) deleteTaskHandler();
      return;
    }

    setReload(true);
    setSnackMessage("Tarea eliminada");
    setSnackOpen(true);
    setOpenDelete(false);
    setOpen(false);
  };

  return (
    <ModalUI open={openDelete} setOpen={setOpenDelete}>
      <ModalTitle>Borrar Tarea</ModalTitle>
      <Box>¿Estás seguro de que quieres borrar la tarea?</Box>
      <Stack
        p={1}
        direction="row"
        flexWrap="wrap"
        gap={2}
        justifyContent={"space-around"}
      >
        <ButtonSecondary onClick={() => setOpenDelete(false)}>
          No
        </ButtonSecondary>
        <ButtonLoading loading={loading} onClick={() => deleteTaskHandler()}>
          Si
        </ButtonLoading>
      </Stack>
    </ModalUI>
  );
};

export default DeleteTask;
