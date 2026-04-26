import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Gift, 
  Heart, 
  Users, 
  Briefcase, 
  Phone, 
  Mail, 
  Clock,
  Sparkles,
  Star,
  Package
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gifting Services | Pinjjai by H',
  description: 'Create timeless gifting experiences with Pinjjai by H. Handcrafted, sustainable gifts for weddings, corporate events, and special occasions with customization options.',
  openGraph: {
    title: 'Gifting Services | Pinjjai by H',
    description: 'Create timeless gifting experiences with Pinjjai by H. Handcrafted, sustainable gifts for weddings, corporate events, and special occasions with customization options.',
    url: '/gifting-services',
  },
}

export default function GiftingServicesPage() {
  const occasions = [
    {
      icon: <Heart className="w-8 h-8 text-(--brand-primary)" />,
      title: "Weddings & Mehendi",
      description: "Handcrafted gifts for wedding celebrations and mehendi ceremonies",
      color: "bg-(--brand-primary)/10"
    },
    {
      icon: <Users className="w-8 h-8 text-(--brand-primary)" />,
      title: "Parties & Events",
      description: "Unique gifts for birthday parties and special celebrations",
      color: "bg-(--brand-primary)/10"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-(--brand-primary)" />,
      title: "Corporate Gifting",
      description: "Professional gifts for corporate events and employee recognition",
      color: "bg-(--brand-primary)/10"
    },
    {
      icon: <Star className="w-8 h-8 text-(--brand-primary)" />,
      title: "Anniversaries",
      description: "Thoughtful gifts to celebrate special milestones and memories",
      color: "bg-(--brand-primary)/10"
    }
  ]

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-(--brand-primary)" />,
      title: "Handcrafted",
      description: "Each piece is carefully crafted by skilled women artisans"
    },
    {
      icon: <Heart className="w-6 h-6 text-(--brand-primary)" />,
      title: "Sustainable",
      description: "Eco-friendly materials and traditional crafting techniques"
    },
    {
      icon: <Package className="w-6 h-6 text-(--brand-primary)" />,
      title: "Customization",
      description: "Personalized options to make each gift truly special"
    },
    {
      icon: <Star className="w-6 h-6 text-(--brand-primary)" />,
      title: "Timeless Design",
      description: "Classic designs that never go out of style"
    }
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-(--brand-primary)/10 to-(--brand-primary)/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <Gift className="w-16 h-16 text-(--brand-primary) mx-auto" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-(--brand-dark) mb-6">
              GIFTING SERVICE
            </h1>
            <p className="text-2xl md:text-3xl text-(--brand-primary)/80 font-light mb-8">
              Let's create something timeless together
            </p>
            <p className="text-lg text-(--brand-dark)/70 max-w-2xl mx-auto leading-relaxed">
              At Pinjjai By H, we curate thoughtful gifting experiences for every occasion—festive, personal, or corporate. Discover unique, handcrafted, and sustainable products tailored to your style and budget, with customization options to make each gift truly special.
            </p>
          </div>
        </div>
      </section>

      {/* Occasions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-(--brand-dark) mb-4">
              Perfect for Every Occasion
            </h2>
            <p className="text-lg text-(--brand-dark)/70 max-w-2xl mx-auto">
              From intimate celebrations to grand events, we have the perfect handcrafted gift
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {occasions.map((occasion, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className={`w-20 h-20 ${occasion.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    {occasion.icon}
                  </div>
                  <h3 className="font-serif text-xl text-(--brand-primary) mb-3">
                    {occasion.title}
                  </h3>
                  <p className="text-(--brand-dark)/70">
                    {occasion.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-linear-to-br from-(--brand-primary)/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-(--brand-dark) mb-4">
              Why Choose Our Gifting Service
            </h2>
            <p className="text-lg text-(--brand-dark)/70 max-w-2xl mx-auto">
              We help you make every moment memorable with thoughtful details
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-(--brand-primary)/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-(--brand-primary)">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-serif text-lg text-(--brand-primary) mb-3">
                  {feature.title}
                </h3>
                <p className="text-(--brand-dark)/70 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-linear-to-br from-(--brand-primary) to-(--brand-primary)/80 text-white border-0">
            <CardContent className="p-12 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Get in Touch for Wholesale Enquiries
              </h2>
              <p className="text-xl mb-8 text-white/90">
                From weddings and mehendi ceremonies to parties, corporate events, and anniversaries, we help you make every moment memorable.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <Phone className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-lg">+91 9899187882</p>
                  <p className="text-sm text-white/70">Our customer care assistants are based in India</p>
                </div>
                
                <div className="text-center">
                  <Clock className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Office Hours</h3>
                  <p className="text-lg">Monday - Friday</p>
                  <p className="text-sm text-white/70">11:00 am - 5:00 pm IST</p>
                </div>
                
                <div className="text-center">
                  <Mail className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <a 
                    href="mailto:pinjjaibyh@gmail.com" 
                    className="text-lg hover:underline transition-colors"
                  >
                    pinjjaibyh@gmail.com
                  </a>
                  <p className="text-sm text-white/70">We'll respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-(--brand-primary) hover:bg-white/90">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-(--brand-primary)">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-(--brand-primary)/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-bold text-(--brand-dark) mb-4">
            Ready to Create Something Special?
          </h2>
          <p className="text-lg text-(--brand-dark)/70 mb-6 max-w-2xl mx-auto">
            Let us help you craft the perfect gifting experience that will be cherished for years to come.
          </p>
          <Button size="lg" className="bg-(--brand-primary) hover:bg-(--brand-primary)/90">
            <Gift className="w-5 h-5 mr-2" />
            Start Your Gifting Journey
          </Button>
        </div>
      </section>
    </div>
  )
}
