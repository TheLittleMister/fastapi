export const changePhoto = {
  backgroundColor: "primary.bg",
  minWidth: "max-content",
  "&:hover": {
    backgroundColor: "primary.main",
    "& > svg": {
      color: "primary.bg",
    },
  },
};

export const box = {
  borderRight: "0.1rem solid",
  borderColor: "color.Primary",
};

export const tableContainer = {
  "& td": { textAlign: "center" },
  boxShadow: 0,
  backgroundColor: "transparent",
};

export const avatar = {
  width: "18rem",
  height: "18rem",
  margin: "0 auto",
  border: "0.2rem solid",
  borderColor: "primary.main",
};

export const tab = ({ tabValue, index }) => {
  return {
    backgroundColor: tabValue === index ? "primary.main" : "transparent",
    color: tabValue === index ? "primary.bg" : "primary.main",
    transition: "background-color 0.4s ease, color 0.4s ease",
  };
};
