import { styled } from "@mui/material";
import { TextField } from "@mui/material";

const Field = styled(TextField)(({ theme }) => ({
  input: { color: theme.palette.primary.main },

  "& label.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "1.6rem",
    "&.Mui-focused fieldset": {
      border: `0.1rem solid ${theme.palette.primary.main}`,
    },
    "& fieldset": {
      border: `0.1rem solid ${theme.palette.primary.main}`,
    },
    "&:hover fieldset": {
      border: `0.1rem solid ${theme.palette.primary.main}`,
    },
  },
}));

export default Field;
