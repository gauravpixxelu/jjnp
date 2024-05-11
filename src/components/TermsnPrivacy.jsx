import React from "react";
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


export default function TermsnPrivacy() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <div className="relative bg-cover bg-center flex items-center justify-center min-h-[400px]" style={{ backgroundImage: `url(./contact/contact-banner.jpg)` }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-white text-center">
          <h1 className="text-3xl md:text-5xl font-bold">Terms & Privacy</h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1270px] py-16">
        <section className="relative">
          <p className="text-gray-600 mb-4 text-[16px]">
            Your use of the website and/or purchase from us are governed by
            following Terms and Conditions:
          </p>
          <p className="text-gray-600 mb-4 text-[16px]">
            The content of the pages of this website is subject to change
            without notice. Neither we nor any third parties provide any
            warranty or guarantee as to the accuracy, timeliness, performance,
            completeness or suitability of the information and materials found
            or offered on this website for any particular purpose. You
            acknowledge that such information and materials may contain
            inaccuracies or errors and we expressly exclude liability for any
            such inaccuracies or errors to the fullest extent permitted by law.
          </p>
          <p className="text-gray-600 mb-4 text-[16px]">
            Your use of any information or materials on our website and/or
            product pages is entirely at your own risk, for which we shall not
            be liable. It shall be your own responsibility to ensure that any
            products, services or information available through our website
            and/or product pages meet your specific requirements. Our website
            contains material which is owned by or licensed to us. This material
            includes, but are not limited to, the design, layout, look,
            appearance and graphics. Reproduction is prohibited other than in
            accordance with the copyright notice, which forms part of these
            terms and conditions.
          </p>
          <p className="text-gray-600 mb-4 text-[16px]">
            All trademarks reproduced in our website which are not the property
            of, or licensed to, the operator are acknowledged on the website.
            Unauthorized use of information provided by us shall give rise to a
            claim for damages and/or be a criminal offense. From time to time
            our website may also include links to other websites. These links
            are provided for your convenience to provide further information.
            You may not create a link to our website from another website or
            document without JJNP'S FASHION PRIVATE LIMITED’s prior written
            consent. Any dispute arising out of use of our website and/or
            purchase with us and/or any engagement with us is subject to the
            laws of India . We, shall be under no liability whatsoever in
            respect of any loss or damage arising directly or indirectly out of
            the decline of authorization for any Transaction, on Account of the
            Cardholder having exceeded the preset limit mutually agreed by us
            with our acquiring bank from time to time
          </p>
        </section>

        
        <section className="mt-16">
          <h2 className="text-center text-[30px] mb-8 font-bold">Frequently Asked Questions</h2>
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)}>What is the return window?</AccordionHeader>
          <AccordionBody className="text-[16px]">You have 30 days from the date of delivery to initiate a return.</AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)}>What condition must the item be in to be eligible for a return?</AccordionHeader>
          <AccordionBody className="text-[16px]">All returned items must be in their original, unworn condition with all tags attached. We cannot accept returns on items that have been worn, washed, or altered in any way.</AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(3)}>How do I initiate a return?</AccordionHeader>
          <AccordionBody className="text-[16px]">To initiate a return, simply log into your account, go to your order history, and click the "Return" button next to the item you would like to return. You will be provided with a prepaid return label to send the item back to us.</AccordionBody>
        </Accordion>
        <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(4)}>Do you offer exchanges?</AccordionHeader>
          <AccordionBody className="text-[16px]">Unfortunately, we do not offer exchanges at this time. If you would like a different size or color, you will need to return the original item and place a new order.</AccordionBody>
        </Accordion>
        </section>
      </div>
    </>
  );
}
