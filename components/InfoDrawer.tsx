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
import { InfoElement } from "@/utils/utils";

interface InfoDrawerProps {
  description: InfoElement[];
}

const InfoDrawer = ({ description }: InfoDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Info className="h-8 w-8 text-gray-500 hover:text-gray-700" />
      </DrawerTrigger>
      {/* <DrawerContent className="bg-purple-300 px-8 md:px-16"> */}
      <DrawerContent className="bg-green-400 px-8 md:px-16">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">
            What&apos;s Conway&apos;s Game of Life?
          </DrawerTitle>
          <DrawerDescription className="text-gray-900 flex gap-2 flex-col mt-2">
            <p>
              Conway&apos;s Game of Life is a cellular automaton that is played
              on a 2D square grid. Each cell on the grid can be either alive or
              dead, and they evolve according to the following rules:
            </p>
            {description.map((rule, index) => (
              <div key={index} className="gap-1 inline-flex">
                <p className="font-bold underline">{rule.label}</p>
                <p>{rule.description}</p>
              </div>
            ))}
            <p className="mt-2 font-bold italic">
              Seed or draw desired grid to play.
            </p>
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
