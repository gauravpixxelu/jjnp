import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";

export default function Modal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen}>Message Dialog</Button>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h4">
              Successfully registered!
            </Typography>
          </DialogHeader>
        </div>
        <DialogFooter className="space-x-2">
          <center>
            <Button variant="gradient" color="gray" onClick={handleOpen}>
              send message
            </Button>
          </center>
        </DialogFooter>
      </Dialog>
    </>
  );
}
MessageDialog;
