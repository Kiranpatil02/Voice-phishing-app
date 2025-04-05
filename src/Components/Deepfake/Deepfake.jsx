import { Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

export function Deepfakeinfo ({category,title,description,imagesrc,size=10,background}) {
    const sizeClassMap = {
        100: 'size-[100px]',
        200: 'size-[200px]',
        300: 'size-[300px]',
        400: 'size-[400px]',
        600: 'size-[600px]'
      };

      const classname=sizeClassMap[size] || 'size-[500px]'
  return (
    <>
      <div className="mt-7 my-20">
        <div className=" p-5 flex items-center    justify-between">
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
          <div>
            <img className={classname} src={imagesrc} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
