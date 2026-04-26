import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Returns & Exchanges Policy | Pinjjai by H',
  description: 'Read Pinjjai by H\'s complete returns and exchanges policy. Learn about our final sales policy, exchange conditions, and international order guidelines.',
  openGraph: {
    title: 'Returns & Exchanges Policy | Pinjjai by H',
    description: 'Read Pinjjai by H\'s complete returns and exchanges policy. Learn about our final sales policy, exchange conditions, and international order guidelines.',
    url: '/returns-and-exchanges',
  },
}

export default function ReturnsAndExchangesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl text-center mb-4 text-(--brand-dark)">Returns & Exchanges Policy</h1>
        <p className="text-center text-(--brand-dark)/70">
          Please read our returns and exchanges policy carefully before making a purchase.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              Returns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-(--brand-dark)/70 leading-relaxed font-medium">
              All sales are final. We do not accept returns or cancellations. Please review product details carefully before placing your order.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              Exchanges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-(--brand-dark)/70 leading-relaxed font-medium">
              Exchanges are accepted only in cases of transit damage, breakage, or manufacturing defects. Requests must be made within 48 hours of delivery.
            </p>
            
            <p className="text-(--brand-dark)/70 leading-relaxed">
              To initiate an exchange, email us at <a href="mailto:pinjjaibyh@gmail.com" className="text-(--brand-primary) hover:underline">pinjjaibyh@gmail.com</a> with clear images and a brief description of the issue. All requests are subject to approval by Pinjjai By H.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              Please Note:
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li className="text-(--brand-dark)/70">Hair accessories, jewellery, and custom orders are not eligible for exchange.</li>
              <li className="text-(--brand-dark)/70">Products must be unused, undamaged, and returned in original packaging with the invoice.</li>
              <li className="text-(--brand-dark)/70">Items must be shipped back within 7 days of purchase.</li>
              <li className="text-(--brand-dark)/70">Return shipping costs are borne by the customer. We recommend insured shipping, as we are not responsible for items lost in transit.</li>
              <li className="text-(--brand-dark)/70">If the requested item is unavailable, a store credit will be issued.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              International Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-(--brand-dark)/70 leading-relaxed font-medium">
              Exchanges are not available on international orders. Duties and taxes, if applicable, are the customer's responsibility.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-(--brand-primary)">
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-(--brand-dark)/70 leading-relaxed">
              For any questions regarding our returns and exchanges policy, please contact us at:
            </p>
            <div className="bg-(--brand-primary)/5 p-4 rounded-lg">
              <p className="text-(--brand-dark)/70 font-medium">Email: <a href="mailto:pinjjaibyh@gmail.com" className="text-(--brand-primary) hover:underline">pinjjaibyh@gmail.com</a></p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-(--brand-dark)/60">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </div>
  )
}
