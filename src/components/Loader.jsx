import React from "react";
import { Spinner } from "@material-tailwind/react";

export default function Loader() {
  return (
    <div className="absolute flex flex-col items-center justify-center z-50 top-1/2">
      <Spinner
        color="black"
        className="h-12 lg:h-16 w-16 text-gray-900/50 z-50 "
      />
      <p className=" text-gray-900/50">Loading...</p>
    </div>
  );
}
