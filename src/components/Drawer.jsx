import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function DrawerDefault({ title, subcategories }) {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <React.Fragment>
      <p
        onClick={openDrawer}
        className="bg-transparent bg-white m-px flex p-2  w-full"
      >
        {title}
        <ChevronRightIcon
          strokeWidth={3}
          className={"h-6 w-5 ml-auto transition-transform"}
        />
      </p>
      <Drawer open={open} onClose={closeDrawer} className="p-4" placement="right">
        <div className="absolute top-0 right-0">
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            {subcategories.map(
              (category, index) =>
                category.category === title && (
                  <div key={index}>
                    <p className="pl-3">{category.category}</p>
                    <ul>
                      {category.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </Typography>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
