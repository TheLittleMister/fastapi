import { Alert, Box, Collapse, Stack } from "@mui/material";
import React from "react";
import ButtonLoading from "../Buttons/ButtonLoading";

// import * as styles from "./FormStyles";

const Form = (props) => {
  return (
    <Box onSubmit={props.onSubmit} component="form" sx={props.sx}>
      <Collapse
        in={props.collapseOpen}
        sx={{ maxWidth: "30rem", margin: "0 auto" }}
      >
        <Alert
          onClose={() => props.setCollapseOpen(false)}
          severity={props.success ? "success" : "error"}
        >
          {props.messages.length > 0 && (
            <ul>
              {props.messages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          )}
        </Alert>
        <br />
      </Collapse>
      <Stack
        direction={props.direction || "column"}
        gap={2}
        justifyContent="center"
        alignItems="center"
      >
        {props.children}
        <ButtonLoading
          variant="contained"
          type="submit"
          loading={props.loading}
        >
          {props.submitText}
        </ButtonLoading>
      </Stack>
    </Box>
  );
};

export default Form;
