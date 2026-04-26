import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Pinjjai by H',
  description: 'Read the complete terms and conditions for Pinjjai by H. Learn about our policies on pricing, shipping, returns, exchanges, and more.',
  openGraph: {
    title: 'Terms & Conditions | Pinjjai by H',
    description: 'Read the complete terms and conditions for Pinjjai by H. Learn about our policies on pricing, shipping, returns, exchanges, and more.',
    url: '/terms-and-conditions',
  },
}

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-4 text-(--brand-dark)">Terms & Conditions</h1>
        <p className="text-center text-(--brand-dark)/70">
          Please read these terms and conditions carefully before using our website.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              1. Website Terms of Use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-(--brand-dark)/70 leading-relaxed">
              The User certifies that he/she is at least 18 (eighteen) years of age or has the consent of a parent or legal guardian.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              This website is owned and operated by Pinjjai By H as "PINJJAI BY H" (or "we" or "us" or "our"). By entering, accessing or using our website in any way, you agree to comply with the following Website terms and conditions of use, Privacy Policy, and our Returns Policy (collectively our "Website Conditions"), as well as any other laws or regulations which apply to this website.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              By using this website (www.pinjjaibyh.com) which includes making an enquiry and/or ordering a product/service, you acknowledge that you have read and understood all of the website conditions and agree to be bound by them.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              However, if you do not or cannot accept our website conditions in totality and without modification, you must stop using our website immediately.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              We may revise and update our website conditions at any time and your continued usage of this website means you accept those changes. Please refer back to these website terms & conditions of use from time to time so that you are aware of revised and current terms and conditions.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              While Pinjjai By H aims to ensure that information in this website is correct, sometimes errors do occur for which we apologize.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              2. Pricing & Payments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-(--brand-dark)/70 leading-relaxed">
              All prices, unless indicated otherwise are in Indian Rupees.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              All references to Rupee on this website are in Indian currency. Indian prices are different to International prices due to taxes/duties, and laws of countries they have been bought from.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              All products are subject to availability. We will inform you as soon as reasonably possible in the event that goods you have ordered are unavailable. In the event that goods that you have ordered are unavailable a full refund will be offered.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              Prices are subject to change at any time, without any notifications. All rights to change prices are reserved by Pure Ghee Designs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              3. Shipping & Delivery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-(--brand-dark)/70 leading-relaxed">
              Shipment/delivery time starts from the day of receipt of payment confirmed against the order placed with Pinjjai By H. We will send you an email/message to confirm the order.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              Delivery should take 5-7 days.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              The delivery time is an approximate time. Pinjjai By H shall not be liable for any delay/non-delivery of purchased goods by flood, fire, wars, acts of God or any cause that is beyond the control of Pinjjai By H.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              In the event that a non-delivery occurs on account of a mistake by you (i.e. wrong name, address or contact number) any extra cost towards re-delivery shall be charged to the user placing the order.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              In case you feel that you may not be able to receive the package because you will be in transit, plan for another person or a neighbor to receive it.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              The user must agree to provide authentic and true information, to avoid any kind of delay or loss of merchandise. Pinjjai By H reserves the right to confirm and validate information and other details provided by the user at any point in time. If upon confirmation, such user details are found not true (wholly or partly), Pinjjai By H has the right in its sole discretion to reject registration and debar the user from using the services available at this website, and/or other affiliated websites without prior intimation whatsoever.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              Delivery of orders would be done address-specific not person-specific.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              Courier charges may be levied on few destinations displayed on the site. These charges are not refundable and shall be borne by the customer. In the event of cancellation of order, Courier charges levied shall not be refunded.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              All Duties and taxes for international shipping shall be borne by the customer. Pinjjai By H is not liable to pay any Duties or Taxes for International Shipping.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              4. Returns & Exchanges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-serif text-xl text-(--brand-primary) mb-2">Returns</h3>
              <p className="text-(--brand-dark)/70 leading-relaxed">
                All sales are final. We do not accept returns or cancellations. We encourage you to review all product details carefully before placing your order.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-xl text-(--brand-primary) mb-2">Exchanges</h3>
              <p className="text-(--brand-dark)/70 leading-relaxed">
                Exchanges are accepted only in cases of transit damage, breakage, or manufacturing defects. Requests must be raised within 48 hours of delivery.
              </p>
              <p className="text-(--brand-dark)/70 leading-relaxed">
                To initiate an exchange, please email us at pinjjaibyh@gmail.com with clear images and a brief description of the issue. All requests are subject to approval by Pinjjai By H.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl text-(--brand-primary) mb-2">Please Note:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li className="text-(--brand-dark)/70">Hair accessories, jewellery, and custom orders are not eligible for exchange.</li>
                <li className="text-(--brand-dark)/70">Products must be unused, unworn, undamaged, and returned in original packaging with invoice.</li>
                <li className="text-(--brand-dark)/70">Items must be shipped back within 7 days of purchase.</li>
                <li className="text-(--brand-dark)/70">Return shipping costs are borne by the customer. We recommend insured shipping, as we are not responsible for items lost in transit.</li>
                <li className="text-(--brand-dark)/70">An amount of Rs. 250 will be deducted from the total amount as handling charges.</li>
                <li className="text-(--brand-dark)/70">If the requested item is unavailable, a store credit will be issued.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-xl text-(--brand-primary) mb-2">International Orders</h3>
              <p className="text-(--brand-dark)/70 leading-relaxed">
                Exchanges are not available for international orders. Any applicable customs duties and taxes are the responsibility of the customer.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              5. Colour Variations, Wear & Tear
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-(--brand-dark)/70 leading-relaxed">
              These products are not meant for rough use.
            </p>
            
            <div>
              <h3 className="font-serif text-xl text-(--brand-primary) mb-2">Colours:</h3>
              <p className="text-(--brand-dark)/70 leading-relaxed">
                Reproduction of colors is as accurate as possible, although please note, colors available at stores may vary slightly from what is displayed on your monitor.
              </p>
              <p className="text-sm text-(--brand-dark)/60">
                NOTE: Color variation cannot be subject to rejection of goods or merchandise.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl text-(--brand-primary) mb-2">Fabric:</h3>
              <p className="text-(--brand-dark)/70 leading-relaxed">
                Some products on which slight variation might occur in different parts or patches. This is a general property of fabric that cannot be controlled.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl text-(--brand-primary) mb-2">Hardware:</h3>
              <p className="text-(--brand-dark)/70 leading-relaxed">
                Some of the products with metal hardware might tarnish or lose its shine over time due to weather conditions and usage. These are changes that occur due to varied use and handling of the product by the customer and cannot be held against the manufacturers.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl text-(--brand-primary) mb-2">Size variations:</h3>
              <p className="text-(--brand-dark)/70 leading-relaxed">
                All Pinjjai By H products are handcrafted, hence no two products are identical in their absolute measurements. There might be a slight change, but minimal to the eye which therefore would not change the essence of the design.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              6. Warranty
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-(--brand-dark)/70 leading-relaxed">
              This site and materials and products on this site are provided "as is" and without warranty of any kind, whether express or implied. To the fullest extent permissible pursuant to applicable law, Pinjjai By H disclaims all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose and non-infringement.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              PINJJAI BY H does not represent or warrant that functions contained in the site will be uninterrupted or error-free, that defects will be corrected, or that this site or the server that makes the site available are free of viruses or other harmful components. PINJJAI BY H does not make any warranties or representations regarding the use of materials in this site in terms of their correctness, accuracy, adequacy, usefulness, timeliness, reliability or otherwise. Some states do not permit limitations or exclusions on warranties, so the above limitations may not apply to you.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              7. Liability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-(--brand-dark)/70 leading-relaxed">
              Your use of this website or any information on this website is entirely at your own risk. PINJJAI BY H makes no representation or warranty with respect to accuracy, completeness, suitability, performance, or timeliness of information provided on this website. PINJJAI BY H excludes liability for any such inaccuracies or errors to the fullest extent permitted by law.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              This website may contain links to other internet sites provided by third parties. The provision of any of these links does not represent an endorsement by PINJJAI BY H of those internet sites, nor does PINJJAI BY H make any representations or warranties as to accuracy, completeness, performance, or timeliness of any aspect of information contained in those third-party internet sites.
            </p>
            
            <div>
              <h3 className="font-serif text-xl text-(--brand-primary) mb-2">To the maximum extent permitted by law (Under Indian Law), PINJJAI BY H is not liable to you or anyone else for:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li className="text-(--brand-dark)/70">Any decision, action or inaction taken in reliance on information in, or connected with, this site.</li>
                <li className="text-(--brand-dark)/70">Any losses, costs or damages suffered or incurred by you, including (without limitation) direct or indirect, special, incidental, compensatory, exemplary or consequential damages in connection with this website.</li>
                <li className="text-(--brand-dark)/70">Your use or misuse of this website or any information or material contained in this website.</li>
                <li className="text-(--brand-dark)/70">The loss or modification of information or material transmitted from this website.</li>
                <li className="text-(--brand-dark)/70">Any defect, technical problem or virus attached to or arising from this website or server.</li>
                <li className="text-(--brand-dark)/70">Any injury, illness or allergic reaction you or any other person may sustain due to yarn, fabric, hardware, or usage of any of the products bought through this website.</li>
                <li className="text-(--brand-dark)/70">The products displayed being unavailable at any time.</li>
                <li className="text-(--brand-dark)/70">Your inability to access or use the website or any material on the website.</li>
                <li className="text-(--brand-dark)/70">The loss of confidentiality in any information or material transmitted to or from the website.</li>
              </ul>
            </div>
            
            <p className="text-(--brand-dark)/70 leading-relaxed">
              To the maximum extent permitted by law, PINJJAI BY H does not make any guarantees or warranties that this website will be available in any place, free of faults or error, free from unauthorized interception or access, or free from blockages, delays, network failure, congestion, interferences of faults of any kind.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              8. Trademarks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-(--brand-dark)/70 leading-relaxed">
              PINJJAI BY H is the owner and authorized user of all intellectual property including but not limited to trademarks, logos, names and designs, whether registered or unregistered, and other marks that are otherwise owned or licensed to PINJJAI BY H in and associated with this website (collectively "intellectual property"), and any improvements or modifications to such intellectual property.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              The use or misuse of any of PINJJAI BY H's intellectual property is prohibited without prior written permission of PINJJAI BY H.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              Nothing contained in this website should be construed as giving you any right or license to any of the intellectual property on or associated with this website.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              9. Copyrights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-(--brand-dark)/70 leading-relaxed">
              This website and its contents are the property of PINJJAI BY H and are subject to copyright. The contents of our website and website as a whole are intended solely for your personal, non-commercial use. Any use of our website and its content for purposes other than personal and non-commercial use, or for any other use, including modification, reproduction, distribution, transmission, republication, display or performance, of content of this website, is prohibited and protected under the copyright act, and any such case or person can be prosecuted by law.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              10. External Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-(--brand-dark)/70 leading-relaxed">
              We are not responsible for third-party websites linked on our platform.
            </p>
            <p className="text-(--brand-dark)/70 font-semibold">
              By using this website, you agree to these Terms & Conditions.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-(--brand-dark)/60">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </div>
  )
}
