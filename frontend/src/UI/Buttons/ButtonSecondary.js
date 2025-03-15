import { Button, styled } from "@mui/material";

const ButtonSecondary = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.bg,
  borderRadius: "1.6rem",
  border: `0.1rem solid ${theme.palette.primary.main}`,
  // gap: "0.5rem",
  padding: "0.5rem 1rem",
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: `0.1rem solid ${theme.palette.primary.main}`,
  },
  "&:disabled": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.disabled.font,
    border: `0.1rem solid ${theme.palette.primary.main}`,
  },
}));

export default ButtonSecondary;
