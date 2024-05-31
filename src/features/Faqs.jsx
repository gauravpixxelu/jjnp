import { useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";



function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}


function FAQ() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>

      <section className="relative">

        <div className="relative bg-cover bg-center flex items-center justify-center min-h-[170px] lg:min-h-[400px]" style={{ backgroundImage: `url(./contact/contact-banner.png)` }}>
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-white text-center">
            <h1 className="text-2xl lg:text-5xl font-bold">FAQ's</h1>
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto my-4 px-4 lg:my-8 ">
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)} className="text-[18px] lg:text-[20px]">What is your return policy?</AccordionHeader>
          <AccordionBody className="text-[14px] lg:text-[16px]">Our return policy allows you to return items within 30 days of delivery for a full refund.</AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)} className="text-[18px] lg:text-[20px]"> Do you offer free shipping?</AccordionHeader>
          <AccordionBody className="text-[14px] lg:text-[16px]">Yes, we offer free shipping on all orders over $50 within the US.</AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(3)} className="text-[18px] lg:text-[20px]">How can I track my order?</AccordionHeader>
          <AccordionBody className="text-[14px] lg:text-[16px]">Once your order has been shipped, you will receive a tracking number via email. You can use this tracking number to track your order on our website.</AccordionBody>
        </Accordion>
        <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(4)} className="text-[18px] lg:text-[20px]">How can I contact customer support?</AccordionHeader>
          <AccordionBody className="text-[14px] lg:text-[16px]">You can contact our customer support team by emailing support@example.com or calling 1-800-123-4567.</AccordionBody>
        </Accordion>
        </div>

      </section>


    </>
  );
}

export default FAQ;
