import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Privacy Policy | Pinjjai by H',
  description: 'Read Pinjjai by H\'s comprehensive privacy policy. Learn how we collect, use, and protect your personal information when you use our website.',
  openGraph: {
    title: 'Privacy Policy | Pinjjai by H',
    description: 'Read Pinjjai by H\'s comprehensive privacy policy. Learn how we collect, use, and protect your personal information when you use our website.',
    url: '/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4 text-[#5D4432]">Privacy Policy</h1>
        <p className="text-center text-muted-foreground mb-2">
          Effective Date: 01/04/2026
        </p>
        <p className="text-center text-muted-foreground">
          This Privacy Policy outlines how Pinjjai By H ("we", "our", "us") collects, uses, and protects your information when you use our website www.pinjjaibyh.com.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#5D4432]">
              1. Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We may collect the following personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Name and date of birth</li>
              <li>Contact information including email address</li>
              <li>Demographic information such as postcode, preferences and interests</li>
              <li>Other information relevant to customer surveys and/or offers</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#5D4432]">
              2. What we do with the information we gather
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Internal record keeping.</li>
              <li>We may use the information to improve our products and services.</li>
              <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#5D4432]">
              3. Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#5D4432]">
              4. Sharing of Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#5D4432]">
              5. Controlling your personal information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              You may choose to restrict the collection or use of your personal information in the following ways:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes</li>
              <li>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at pinjjaibyh@gmail.com</li>
              <li>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.</li>
            </ul>
            <p>
              If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorrect.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#5D4432]">
              6. Policy Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We may update this policy from time to time. Please review this page periodically to stay informed.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#5D4432]">
              Consent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-semibold">
              By using our website, you consent to this Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>Last updated: April 1, 2026</p>
      </div>
    </div>
  )
}
