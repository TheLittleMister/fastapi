import React from "react";
import { Box, ImageList } from "@mui/material";
import MainPicture from "./MainPicture/MainPicture";
import { itemData } from "./MainPicturesInfo";
import { useIsWidthDown } from "../../../utils/utils";

const MainPictures = () => {
  const is500Down = useIsWidthDown(500);

  return (
    <Box flex={1}>
      <ImageList
        sx={{
          width: is500Down ? 300 : 500,
          height: is500Down ? 720 : 550,
          padding: 3,
        }}
        variant="woven"
        cols={3}
        gap={8}
      >
        {itemData.map((item, index) => (
          <MainPicture key={index} item={item} />
        ))}
      </ImageList>
    </Box>
  );
};

export default MainPictures;
