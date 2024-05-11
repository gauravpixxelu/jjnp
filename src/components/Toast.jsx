import React from "react";
import { Alert } from "@material-tailwind/react";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

function Toast({ icon, message }) {
  return (
    <div className="z-50 ">
      <Alert
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        className={`text-black bg-white capitalize rounded-md flex items-center w-fit ${
          message.startsWith("Sorry")
            ? "bg-white text-black"
            : "border border-black/70 bg-white text-black"
        }`}
        icon={
          message.startsWith("Sorry") ? (
            <ExclamationCircleIcon className="w-5 h-5 mr-2" />
          ) : (
            <CheckBadgeIcon className="w-5 h-5 mr-2" />
          )
        }
      >
        {message}
      </Alert>
    </div>
  );
}

export default Toast;
