import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function RoundedCard({ category, url }) {
  // You can pass the category data as a prop or use the dummy data directly

  return (
    <div className="p-7">
      <Card
        className="p-2 lg:w-46 lg:h-46 rounded-full lg:rounded-full flex items-center justify-center w-32 h-32 border-snow-900 border m-2"
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <CardBody className="items-center w-30">
          <Typography variant="h5" color="white" className="mb-2 text-center">
            {category.title}
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}
