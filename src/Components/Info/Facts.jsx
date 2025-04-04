import { Box, Card, Flex, Strong, Text, Heading } from "@radix-ui/themes";
import React from "react";

export function Facts() {
  return (
    <>
      <div className="mt-12 ">
        <div className="text-center ">
          <Heading size="9" weight="medium">
            The Growing Threat
          </Heading>
        </div>
        <div className=" flex  mt-10  p-5">
          <div className="shadow-md">
            <Box maxWidth="750px">
              {" "}
              {/* Increased max-width for side-by-side */}
              <Card size="">
                <Flex gap="3" align="center">
                  {" "}
                  {/* Use Flex for layout, adjust gap/align as needed */}
                  {/* Image Column */}
                  <Box width="100px" height="100px" style={{ flexShrink: 0 }}>
                    <img
                      src="https://thumb.ac-illust.com/a0/a0db36449854104778cb2adc7af53b1e_t.jpeg" // Adjust query params if needed
                      alt="Bold typography"
                      style={{
                        display: "block",
                        objectFit: "cover",
                        width: "100%", // Fill the container Box
                        height: "100%", // Fill the container Box

                        backgroundColor: "var(--gray-5)",
                      }}
                    />
                    {/* Alternatively, use Radix Avatar if appropriate size */}
                    {/* <Avatar
          size="6" // Adjust size as needed
          src="https://..."
          fallback="T"
          radius="small" // Optional rounding
        /> */}
                  </Box>
                  <Box>
                    {" "}
                    {/* This Box will grow to fill remaining space */}
                    <Text as="p" size="3">
                      Voice <Strong>deepfake</Strong> technology has seen a{" "}
                      <strong color="red">500%</strong> increase in
                      sophistication since 2020, making detection increasingly
                      difficult.
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
