import { Button, styled } from "@mui/material";

const ButtonQuaternary = styled(Button)(({ theme }) => ({
  borderRadius: "1.6rem",
  // gap: "0.5rem",
  padding: "0.5rem 1rem",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.bg,
  border: `0.1rem solid ${theme.palette.primary.bg}`,
  "&:hover": {
    backgroundColor: theme.palette.primary.bg,
    color: theme.palette.primary.main,
    border: `0.1rem solid ${theme.palette.primary.bg}`,
  },
  "&:disabled": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.disabled.font,
    border: `0.1rem solid ${theme.palette.primary.main}`,
  },
}));

export default ButtonQuaternary;
