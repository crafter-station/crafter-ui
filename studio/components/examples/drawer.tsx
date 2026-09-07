"use client";
import { Example } from "@/components/examples/example";
import { Button } from "@/components/ui/button";
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
export default function Preview() {
  return (
    <div className="example-stack">
      <DrawerDemo />
    </div>
  );
}
function DrawerDemo() {
  return (
    <Example title="Demo">
      <div className="flex flex-wrap gap-2">
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Open Drawer
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4">
              <div className="h-80 w-full bg-muted" />
            </div>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Header
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <div className="h-80 w-full bg-muted" />
            </div>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Footer
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4">
              <div className="h-80 w-full bg-muted" />
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose render={<Button variant="outline" />}>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Header and Footer
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <div className="h-80 w-full bg-muted" />
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose render={<Button variant="outline" />}>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Edge to Edge
          </DrawerTrigger>
          <DrawerContent>
            <div className="h-80 w-full bg-blue-200" />
          </DrawerContent>
        </Drawer>
      </div>
    </Example>
  );
}
