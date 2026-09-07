"use client";
import { Example } from "@/components/examples/example";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function Preview() {
  return (
    <div className="example-stack">
      <TabsBasic />
    </div>
  );
}
function TabsBasic() {
  return (
    <Example title="Basic">
      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>
  );
}
