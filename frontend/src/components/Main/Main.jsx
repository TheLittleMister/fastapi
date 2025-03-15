import React from "react";

import MainTitle from "./MainTitle/MainTitle";
import MainPictures from "./MainPictures/MainPictures";

import { Box, Container, Link, Stack, Typography as Text } from "@mui/material";

import * as styles from "./MainStyles";

const Main = () => {
  return (
    <Box sx={styles.hero}>
      <Container>
        <Stack sx={styles.stack}>
          <MainTitle />
          <MainPictures />
        </Stack>
        <Text marginTop={4} variant="subtitle2">
          Copyright &#169; {new Date().getFullYear()} Focused. Powered by{" "}
          <Link
            href="https://github.com/TheLittleMister"
            target="_blank"
            rel="noopener noreferrer"
          >
            FY
          </Link>
          .
        </Text>
      </Container>
    </Box>
  );
};

export default Main;
