import { Box, Center } from "@chakra-ui/react";
import { Children, ReactNode } from "react";

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Center minH="100vh" w="100vw">
      <Box
        w={["full", "md"]}
        p={[8, 10]}
        mt={[20, "10vh"]}
        mb={[20, "10vh"]}
        mx="auto"
        border={["none", "1px"]}
        borderColor={["", "gray.300"]}
        borderRadius={10}
      >
        {Children.map(children, (child) => (
          <>{child}</>
        ))}
      </Box>
    </Center>
  );
};
