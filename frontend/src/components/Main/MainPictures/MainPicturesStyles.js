export const image = {
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
  transform: "perspective(1000px) rotateY(10deg) rotateX(5deg)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05)",
  },
};
