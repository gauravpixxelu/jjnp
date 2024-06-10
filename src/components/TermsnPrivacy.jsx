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


export default function TermsnPrivacy() {
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
            <h1 className="text-2xl lg:text-5xl font-bold">Terms & Privacy</h1>
          </div>
        </div>

      <div className="mx-auto max-w-[1270px] py-8 px-4 lg:py-16">
        <section className="relative">
        <h4 className="text-black mb-2 text-[20px] font-bold">Terms and condition </h4>
          <p className="text-gray-600 mb-4 text-[16px]">
            "Upon delivery, you have seven days to return or exchange an item," is a reminder that your satisfaction is important. It allows you to shop with confidence, knowing that you have the freedom to make a decision that's right for you
          </p>
          <p className="text-gray-600 mb-4 text-[16px]">
          Upon receipt of the item, customers are granted a period of seven days within which they may elect to return or exchange the purchase. This policy is designed to ensure customer satisfaction and facilitate a hassle-free shopping experience. We aim to provide our customers with the peace of mind that comes from knowing they have ample time to decide whether the item they have received is suitable for their needs.
          </p>

          <h4 className="text-black mb-2 text-[20px] font-bold">Refund</h4>
          <p className="text-gray-600 mb-4 text-[16px]">
            Standard timeline Once the item has successfully returned it will take 5 to 7 days business days for refund.
          </p>
          <p className="text-gray-600 mb-4 text-[16px]">
          Upon receipt of the returned item, it is our company policy to issue a refund within 5 to 7 business days. We appreciate your patience and understanding during this process. If you have any further questions or concerns, please don't hesitate to reach out to us. Thank you for your business. Upon successful return of the item in question, our standard company policy stipulates that a refund will be issued within a period of 5 to 7 business days. We kindly request your patience and understanding as we process your request. Should you have any further inquiries or concerns, please do not hesitate to contact us. We appreciate your patronage and look forward to serving you again in the future.
          </p>
          <p className="text-gray-600 mb-4 text-[16px]">
          "Your refund will be processed within 5 to 7 business days, allowing you to embark on your next adventure with peace of mind. Thank you for your trust and patience, as we work to ensure your satisfaction.
          </p>
        </section>

      </div>
    </>
  );
}
