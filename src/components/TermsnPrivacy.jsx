import React from "react";

import { useEffect } from "react";



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
            <h1 className="text-2xl lg:text-5xl font-bold">Terms & Conditions</h1>
          </div>
        </div>

      <div className="mx-auto max-w-[1270px] py-8 px-4 lg:py-16">
        <section className="relative">
        {/* <h4 className="text-black mb-2 text-[20px] font-bold">Cancellation Policy </h4>
        <p className="text-gray-600 mb-4 text-[16px]">For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean JJNP'S FASHION PRIVATE LIMITED, whose registered/operational office is  Kamte Nagar Rd, Kondhwa Budruk, Pune, Maharashtra Pune MAHARASHTRA 411048 . "you", “your”, "user", “visitor” shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.</p>
          <p className="text-black  mb-2 text-[16px] font-bold">Your use of the website and/or purchase from us are governed by following Terms and Conditions:</p>
          <p className="text-gray-600 mb-4 text-[16px]">The content of the pages of this website is subject to change without notice.</p>
          <p className="text-gray-600 mb-4 text-[16px]">Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</p>
          <p className="text-gray-600 mb-4 text-[16px]">Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.</p>
          <p className="text-gray-600 mb-4 text-[16px]">Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</p>
          <p className="text-gray-600 mb-4 text-[16px]">All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.</p>
          <p className="text-gray-600 mb-4 text-[16px]">Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.</p>
          <p className="text-gray-600 mb-4 text-[16px]">From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.</p>
          <p className="text-gray-600 mb-4 text-[16px]">You may not create a link to our website from another website or document without JJNP'S FASHION PRIVATE LIMITED’s prior written consent.</p>
          <p className="text-gray-600 mb-4 text-[16px]">Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India .</p>
          <p className="text-gray-600 mb-4 text-[16px]">We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time</p>
          <p className="text-black mt-8 mb-4 text-[16px] font-bold">JJNP'S FASHION PRIVATE LIMITED believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:</p>
          <p className="text-gray-600 mb-4 text-[16px]">Cancellations will be considered only if the request is made within 2 days of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</p>
          <p className="text-gray-600 mb-4 text-[16px]">JJNP'S FASHION PRIVATE LIMITED does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</p>
          <p className="text-gray-600 mb-4 text-[16px]">In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 2 days of receipt of the products.</p>
          <p className="text-gray-600 mb-4 text-[16px]">In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 2 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</p>
          <p className="text-gray-600 mb-4 text-[16px]">In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</p>
          <p className="text-gray-600 mb-4 text-[16px]">In case of any Refunds approved by the JJNP'S FASHION PRIVATE LIMITED, it’ll take 1-2 days for the refund to be processed to the end customer.</p>
          <p className="text-gray-600 mb-4 text-[16px]">For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only. Orders are shipped within 0-7 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment is subject to Courier Company/post office norms. JJNP'S FASHION PRIVATE LIMITED is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 0-7 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation. Delivery of all orders will be to the address provided by the buyer. We can confirm our services on your mail ID as specified during registration. For any issues in utilizing our services, you may contact our <a href="mailto:noreply@jjnps.com" className="text-black font-bold">noreply@jjnps.com</a>.</p> */}


        <h4 className="text-black mb-2 text-[20px] font-bold">Terms and condition </h4>
          <p className="text-gray-600 mb-4 text-[16px]">
            "Upon delivery, you have seven days to return or exchange an item," is a reminder that your satisfaction is important. It allows you to shop with confidence, knowing that you have the freedom to make a decision that's right for you
          </p>
          <p className="text-gray-600 mb-4 text-[16px]">
          Upon receipt of the item, customers are granted a period of seven days within which they may elect to return or exchange the purchase. This policy is designed to ensure customer satisfaction and facilitate a hassle-free shopping experience. We aim to provide our customers with the peace of mind that comes from knowing they have ample time to decide whether the item they have received is suitable for their needs.
          </p>

          <h4 className="text-black mb-2 text-[20px] font-bold">Refund</h4>
          <p className="text-gray-600 mb-4 text-[16px]">
            Standard timeline Once the item has successfully returned it will take 5 to 7 business days for refund.
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
