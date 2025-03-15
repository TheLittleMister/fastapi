export const stack = {
  flexDirection: "row",
  gap: 2,
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  "& > *": {
    width: "25rem",
  },
};

export const gender = {
  backgroundColor: "transparent",
  borderRadius: "1.6rem",
  borderColor: "primary.main",
  color: "primary.main",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main",
  },
  "& svg": {
    color: "primary.main",
  },
};

export const datepicker = {
  borderRadius: "1.6rem",
  "& .MuiOutlinedInput-root": {
    borderRadius: "1.6rem",
    "& fieldset": {
      borderColor: "primary.main",
    },
    "&:hover fieldset": {
      borderColor: "primary.main",
    },
  },
  "& .MuiInputBase-input": {
    color: "primary.main",
  },

  "& .MuiIconButton-root": {
    color: "primary.main",
  },
};
