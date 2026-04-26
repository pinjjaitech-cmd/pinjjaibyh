import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Truck, 
  Clock, 
  Zap, 
  Globe, 
  Search, 
  Users, 
  CheckCircle, 
  Gift,
  MapPin,
  DollarSign
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Orders & Shipping | Pinjjai by H',
  description: 'Complete guide to orders and shipping at Pinjjai by H. Learn about shipping costs, delivery times, international shipping, order tracking, and more.',
  openGraph: {
    title: 'Orders & Shipping | Pinjjai by H',
    description: 'Complete guide to orders and shipping at Pinjjai by H. Learn about shipping costs, delivery times, international shipping, order tracking, and more.',
    url: '/orders-and-shipping',
  },
}

export default function OrdersAndShippingPage() {
  const shippingInfo = [
    {
      icon: <DollarSign className="w-6 h-6 text-(--brand-primary)" />,
      question: "What are my shipping costs?",
      answer: "We offer free shipping for purchases over Rs. 3000/-. Anything of lesser value will be charged."
    },
    {
      icon: <Clock className="w-6 h-6 text-(--brand-primary)" />,
      question: "How long does shipping take?",
      answer: "We will take 10-12 business days to process your order. After your order has been processed, delivery will take 5-7 days for domestic shipping. We do not hand deliver orders."
    },
    {
      icon: <Zap className="w-6 h-6 text-(--brand-primary)" />,
      question: "Can I get my order delivered faster?",
      answer: "We charge an additional INR 250 for faster delivery. In this case delivery would take place 2-3 days after your order has been processed."
    },
    {
      icon: <Globe className="w-6 h-6 text-(--brand-primary)" />,
      question: "Do you ship internationally?",
      answer: "We ship internationally. We will compute the charges based on the volumetric weight of your order and your location. Please note that we do not have a return or exchange policy for international orders."
    },
    {
      icon: <Search className="w-6 h-6 text-(--brand-primary)" />,
      question: "How do I track my order?",
      answer: "You are intimated by email once the payment for your order is confirmed. Another email is sent when your order is dispatched."
    },
    {
      icon: <Users className="w-6 h-6 text-(--brand-primary)" />,
      question: "Can another person receive my order?",
      answer: "Yes. In case you feel that you may not be able to receive the package because you will be in transit, plan for another person or a neighbor to receive it."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-(--brand-primary)" />,
      question: "How do I know if my order has been successful?",
      answer: "Once your order is successfully placed and payment is confirmed, you will receive an email confirmation with your order number and complete order details. We recommend creating an account at checkout to ensure your information is saved and to make future communication and order tracking more seamless."
    },
    {
      icon: <Gift className="w-6 h-6 text-(--brand-primary)" />,
      question: "Are you able to gift-wrap purchases?",
      answer: "Yes, we are able to gift wrap your purchase. We understand that our products are popular gift ideas. For all gifts, we will not include the bill within the package but will email you the bill for future reference."
    },
    {
      icon: <MapPin className="w-6 h-6 text-(--brand-primary)" />,
      question: "Can I change my shipping address after having placed my order?",
      answer: "Once the order has been placed it will not be possible to change the shipping address."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-4 text-(--brand-dark)">Orders & Shipping</h1>
        <p className="text-center text-(--brand-dark)/70">
          Everything you need to know about ordering and shipping with Pinjjai by H
        </p>
      </div>

      <div className="space-y-6">
        {shippingInfo.map((info, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-serif text-2xl text-(--brand-primary)">
                <div className="p-2 bg-(--brand-primary)/10 rounded-lg">
                  {info.icon}
                </div>
                {info.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-(--brand-dark)/70 leading-relaxed">
                {info.answer}
              </p>
              
              {/* Additional information for specific questions */}
              {info.question === "How long does shipping take?" && (
                <div className="mt-4 p-4 bg-(--brand-primary)/5 rounded-lg border border-(--brand-primary)/20">
                  <p className="text-sm font-medium text-(--brand-primary) mb-2">Important Note:</p>
                  <p className="text-sm text-(--brand-dark)/70">
                    Please ensure that the address given by you is correct. The contact number has to be correct and that of the customer or the person receiving the order. Delivery cannot take place if there is no response on the phone or the address is incorrect. If the address provided is incorrect, we are not responsible for non-delivery or extra cost.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Card className="bg-linear-to-br from-(--brand-primary)/10 to-transparent border-(--brand-primary)/20">
          <CardHeader className="text-center">
            <Truck className="w-12 h-12 text-(--brand-primary) mx-auto mb-4" />
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              Need More Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg text-(--brand-dark)/70">
              If you have any questions about your order or shipping that weren't answered here, we're here to help!
            </p>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-sm text-(--brand-dark)/60 mb-2">Contact us at:</p>
              <a 
                href="mailto:pinjjaibyh@gmail.com" 
                className="text-xl font-semibold text-(--brand-primary) hover:underline transition-colors"
              >
                pinjjaibyh@gmail.com
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-(--brand-dark)/60">
        <p>We're committed to getting your handcrafted treasures to you safely and efficiently</p>
      </div>
    </div>
  )
}
