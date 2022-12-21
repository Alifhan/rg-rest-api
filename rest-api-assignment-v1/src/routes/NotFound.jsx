import { Box, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <>
      <Box className="not-found">
        <Text style={{ fontSize: "40px" }}>404 | Page not found!</Text>
      </Box>
    </>
  );
};

export default NotFound;
