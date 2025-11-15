import React from "react";
import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <aside className="hidden md:block w-48 bg-white shadow-sm p-4 border-r">
      <nav className="space-y-2 text-sm">
        <div className="font-semibold mb-2">Navigation</div>
          <Button variant={"ghost"} className="text-primary ">
            Jobs
          </Button>
          <Button variant={"ghost"}>Settings</Button>
      </nav>
    </aside>
  );
};

export default Sidebar;
