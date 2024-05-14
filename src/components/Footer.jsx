import { Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
const LINKS = [
  {
    title: "MAY WE HELP YOU?",
    items: ["Product Care", "FAQ's", "Contact"],
  },
  {
    title: "THE COMPANY",
    items: ["About Us", "Legal", "Return Policy"],
  },
  {
    title: "JJNP’S SERVICES",
    items: ["Discover Our Services", "Packaging", "Collect In Store"],
  }
];

const currentYear = new Date().getFullYear();

export function Footer() {
  const navigate = useNavigate();
  const navigateLink = (link) => {
    switch (link) {
      case "Contact":
        navigate("/contactUs");
        break;
      case "Return Policy":
        navigate("/return-policy");
        break;
      case "About Us":
        navigate("/about-us");
        break;
      case "FAQ's":
        navigate("/Faqs");
        break;
      case "Product Care":
        navigate("/product-care");
        break;
      case "Legal":
        navigate("/terms");
        break;

      default:
    }
  };

  return (
    <footer className="relative bottom-0 w-full ">
      <div className="mx-auto w-full px-4 py-8 lg:px-8 bg-blue-gray-500 lg:py-12"
        style={{
          backgroundImage: `url('/footer-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="flex justify-between gap-8 flex-wrap lg:flex-nowrap lg:gap-4">
          <Link to="/">
            <img src="/white-logo.png" className="aspect-square h-auto" />
          </Link>


          {LINKS.map(({ title, items }) => (
            <ul key={title}>
              <Typography
                variant="small"
                color="black"
                className="mb-2 text-white uppercase text-[16px] lg:mb-6"
              >
                {title}
              </Typography>
              {items.map((link) => (
                <li key={link}>
                  <Typography
                    color="white"
                    className="py-2.5 cursor-pointer font-light transition-colors hover:text-blue-gray-500 text-[14px]"
                    onClick={() => navigateLink(link)}
                  >
                    {link}
                  </Typography>
                </li>
              ))}
            </ul>
          ))}

          <Typography
            variant="small"
            color="black"
            className="text-white text-[16px]"
          >
            <h5 className="mb-2 lg:mb-6">SIGN UP FOR JJNP’S UPDATES</h5>
            <Typography
              color="white"
              className="py-1.5 max-w-[480px] text-[14px]"
            >
              By entering your email address below, you consent to receiving our newsletter with access to our latest collections, events and initiatives. More details on this are provided in our Privacy Policy
           
            </Typography>
          </Typography>

        </div>
      </div>


      <div className="flex w-full flex-col items-center justify-center bg-black py-4 md:flex-row md:justify-center">
        <Typography
          variant="small"
          className="mb-4 text-center font-light text-white md:mb-0 text-[12px]"
        >
          &copy; {currentYear}{" "}JJnP's. All Rights Reserved.
        </Typography>

      </div>
    </footer>
  );
}
