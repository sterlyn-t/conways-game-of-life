import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Info } from "lucide-react";
import { Rule } from "@/utils/utils";

interface InfoDrawerProps {
  rules: Rule[];
}

const InfoDrawer = ({ rules }: InfoDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Info className="h-8 w-8 text-gray-500 hover:text-gray-700" />
      </DrawerTrigger>
      <DrawerContent className="bg-purple-500 px-8 md:px-16">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">Rules</DrawerTitle>
          <DrawerDescription className="text-zinc-900 flex gap-2 flex-col mt-2">
            {rules.map((rule, index) => (
              <div key={index} className="flex flex-row gap-1">
                <p className="font-bold underline">{rule.label}</p>
                <p>{rule.description}</p>
              </div>
            ))}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default InfoDrawer;
