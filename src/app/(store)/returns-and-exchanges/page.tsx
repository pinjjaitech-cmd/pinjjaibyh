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
        <h1 className="text-4xl font-bold text-center mb-4 text-[#5D4432]">Returns & Exchanges Policy</h1>
        <p className="text-center text-muted-foreground">
          Please read our returns and exchanges policy carefully before making a purchase.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#5D4432]">
              Returns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">
              All sales are final. We do not accept returns or cancellations. Please review product details carefully before placing your order.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#5D4432]">
              Exchanges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">
              Exchanges are accepted only in cases of transit damage, breakage, or manufacturing defects. Requests must be made within 48 hours of delivery.
            </p>
            
            <p>
              To initiate an exchange, email us at <a href="mailto:pinjjaibyh@gmail.com" className="text-[#5D4432] hover:underline">pinjjaibyh@gmail.com</a> with clear images and a brief description of the issue. All requests are subject to approval by Pinjjai By H.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#5D4432]">
              Please Note:
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Hair accessories, jewellery, and custom orders are not eligible for exchange.</li>
              <li>Products must be unused, undamaged, and returned in original packaging with the invoice.</li>
              <li>Items must be shipped back within 7 days of purchase.</li>
              <li>Return shipping costs are borne by the customer. We recommend insured shipping, as we are not responsible for items lost in transit.</li>
              <li>If the requested item is unavailable, a store credit will be issued.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#5D4432]">
              International Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">
              Exchanges are not available on international orders. Duties and taxes, if applicable, are the customer's responsibility.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#5D4432]">
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              For any questions regarding our returns and exchanges policy, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium">Email: <a href="mailto:pinjjaibyh@gmail.com" className="text-[#5D4432] hover:underline">pinjjaibyh@gmail.com</a></p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </div>
  )
}
