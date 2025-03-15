export const navBar = {
  // backgroundColor: "primary.bg",
  // boxShadow: "1rem 1rem 1rem rgba(255, 255, 255, 0.1)",
  boxShadow: "none",
  padding: "0rem",
};

export const stack = {
  padding: "1.5rem 0",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",

  "@media (min-width: 35em)": {
    flexDirection: "row",
  },

  "@media (max-width: 35em)": {
    flexDirection: "columm",
    gap: "1rem",
    padding: "1rem",
  },
};
