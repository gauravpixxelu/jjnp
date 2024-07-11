import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useEffect } from "react";

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
export default function ReturnPolicy() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>

<div className="relative bg-cover bg-center flex items-center justify-center min-h-[170px] lg:min-h-[400px]" style={{ backgroundImage: `url(./contact/contact-banner.png)` }}>
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-white text-center">
            <h1 className="text-2xl lg:text-5xl font-bold">Refund Policy</h1>
          </div>
        </div>

      <div className="mx-auto max-w-[1270px] py-8 px-4 lg:py-16">
        <section className="mb-12">
          <p className="text-gray-600 text-[16px] mb-4">
            Upon delivery, you have seven days to return or exchange an item,"
            is a reminder that your satisfaction is important. It allows you to
            shop with confidence, knowing that you have the freedom to make a
            decision that's right for you Upon receipt of the item, customers
            are granted a period of seven days within which they may elect to
            return or exchange the purchase. This policy is designed to ensure
            customer satisfaction and facilitate a hassle-free shopping
            experience. We aim to provide our customers with the peace of mind
            that comes from knowing they have ample time to decide whether the
            item they have received is suitable for their needs.
          </p>
          <p className="text-gray-600 text-[16px] mb-4">
            Refund Standard timeline Once the item has successfully returned it
            will take 5 to 7 business days for refund. Upon receipt of the
            returned item, it is our company policy to issue a refund within 5
            to 7 business days. We appreciate your patience and understanding
            during this process. If you have any further questions or concerns,
            please don't hesitate to reach out to us. Thank you for your
            business. Upon successful return of the item in question, our
            standard company policy stipulates that a refund will be issued
            within a period of 5 to 7 business days. We kindly request your
            patience and understanding as we process your request. Should you
            have any further inquiries or concerns, please do not hesitate to
            contact us. We appreciate your patronage and look forward to serving
            you again in the future.
          </p>
          <p className="text-gray-600 text-[16px] mb-4">
            Your refund will be processed within 5 to 7 business days, allowing
            you to embark on your next adventure with peace of mind. Thank you
            for your trust and patience, as we work to ensure your satisfaction.
          </p>
        </section>
        
        
        <section className="mt-8 lg:mt-16">
          <h2 className="text-center text-[24px] lg:text-[30px] mb-2 font-bold lg:mb-8">Frequently Asked Questions</h2>
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)} className="text-[18px] lg:text-[20px]">What is the return window?</AccordionHeader>
          <AccordionBody className="text-[14px] lg:text-[16px]">You have 5 to 7 business days from the date of delivery to initiate a return.</AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)} className="text-[18px] lg:text-[20px]">What condition must the item be in to be eligible for a return?</AccordionHeader>
          <AccordionBody className="text-[14px] lg:text-[16px]">All returned items must be in their original, unworn condition with all tags attached. We cannot accept returns on items that have been worn, washed, or altered in any way.</AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(3)} className="text-[18px] lg:text-[20px]">How do I initiate a return?</AccordionHeader>
          <AccordionBody className="text-[14px] lg:text-[16px]">To initiate a return, simply log into your account, go to your order history, and click the "Return" button next to the item you would like to return. You will be provided with a prepaid return label to send the item back to us.</AccordionBody>
        </Accordion>
        <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(4)} className="text-[18px] lg:text-[20px]">Do you offer exchanges?</AccordionHeader>
          <AccordionBody className="text-[14px] lg:text-[16px]">Unfortunately, we do not offer exchanges at this time. If you would like a different size or color, you will need to return the original item and place a new order.</AccordionBody>
        </Accordion>
        </section>
      </div>
    </>
  );
}
