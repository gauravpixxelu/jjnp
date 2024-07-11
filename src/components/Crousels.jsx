import {
  Carousel,
  Typography,
  Button,
  CarouselProps,
} from "@material-tailwind/react";

const carouselData = [
  {
    image:
      "https://images.unsplash.com/photo-1605022600390-071c6f969b32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGphY2tldHN8ZW58MHx8MHx8fDA%3D",
    title: "The Beauty of Nature",
    description: "Style is a way to say who you are without having to speak",
  },
  {
    image:
      "https://images.unsplash.com/photo-1482003297000-b7663a1673f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb24lMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
    title: "The Beauty of Nature",
    description: "Style is a way to say who you are without having to speak",
  },
  {
    image:
    "https://images.unsplash.com/photo-1482003297000-b7663a1673f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb24lMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
    title: "The Changed of Nature",
    description: "Fashion is what you buy, style is what you do with it.",
  },
];

export default function CarouselWithContent() {
  return (
    <div>
      <Carousel
        className="h-3/5 lg:h-3/4 ease-in"
        autoplay={true}
        loop={true}
        autoplayDelay={5000}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-40 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {carouselData.map((item, index) => (
          <div key={index} className="relative h-full lg:h-full w-full">
            <img
              src={item.image}
              alt={`image ${index + 1}`}
              className="h-full lg:h-96 w-full object-cover "
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/10">
              <div className="w-3/4 text-center md:w-2/4">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-12 opacity-80"
                >
                  {item.description}
                </Typography>
                <div className="flex justify-center gap-2">
                  <Button size="lg" color="white">
                    Explore
                  </Button>
                  <Button size="lg" color="white" variant="text">
                    Gallery
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
