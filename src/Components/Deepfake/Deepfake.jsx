import { Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

export function Deepfakeinfo ({category,title,description,imagesrc}) {
  return (
    <>
      <div className="">
        <div className="px-16 p-5 flex items-center justify-between">
          <div className="w-2/5 ">
                <Heading color="gray">{category}</Heading>
            <Flex direction="column" gap="3">
              <Heading wrap="balance" size="9" weight="medium">
                {title}
                {/* <img className="size-15 inline" src={deeplearning} alt="" /> */}
              </Heading>
              
              <Text weight="medium" wrap="balance">
              {description}
              </Text>
            </Flex>
          </div>
          <div >
            <img className="size-[600px]" src={imagesrc} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
