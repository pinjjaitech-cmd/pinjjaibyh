import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Users, Palette, Package, PenTool, Camera } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Work With Us | Pinjjai by H',
  description: 'Join Pinjjai by H and work with skilled women artisans. We offer internships in Graphic Design, Visual Merchandising, Product Design, and Content Creation.',
  openGraph: {
    title: 'Work With Us | Pinjjai by H',
    description: 'Join Pinjjai by H and work with skilled women artisans. We offer internships in Graphic Design, Visual Merchandising, Product Design, and Content Creation.',
    url: '/work-with-us',
  },
}

export default function WorkWithUsPage() {
  const internshipAreas = [
    {
      icon: <Palette className="w-8 h-8 text-[#5D4432]" />,
      title: "Graphic Design",
      description: "Create visual narratives that celebrate craftsmanship and tell our brand story"
    },
    {
      icon: <Users className="w-8 h-8 text-[#5D4432]" />,
      title: "Visual Merchandising",
      description: "Design beautiful displays that showcase our handcrafted pieces"
    },
    {
      icon: <Package className="w-8 h-8 text-[#5D4432]" />,
      title: "Product Design",
      description: "Develop new crochet designs and explore material possibilities"
    },
    {
      icon: <PenTool className="w-8 h-8 text-[#5D4432]" />,
      title: "Content Creation",
      description: "Craft compelling stories that highlight our artisans and craft"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4 text-[#5D4432]">Work With Us</h1>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Join our team and become part of a community that celebrates thoughtful gifting, slow craftsmanship, and handmade artistry.
        </p>
      </div>

      <div className="space-y-8">
        <Card className="bg-gradient-to-br from-[#5D4432]/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-[#5D4432] text-center">
              Our Story, Your Journey
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-lg leading-relaxed max-w-4xl mx-auto">
              If you have a passion for thoughtful gifting, slow craftsmanship, and handmade artistry, you'll feel at home at Pinjjai By H.
            </p>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto">
              Rooted in hand crochet and created in collaboration with skilled women artisans, our brand celebrates craftsmanship, creativity, and conscious design.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {internshipAreas.map((area, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-[#5D4432]/10 rounded-full w-fit">
                  {area.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-[#5D4432]">
                  {area.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  {area.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-[#5D4432]/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-[#5D4432] text-center">
              What You'll Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-[#5D4432]">Hands-on Craft Experience</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5D4432] mt-1">•</span>
                    <span>Learn hand crochet techniques from skilled artisans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5D4432] mt-1">•</span>
                    <span>Explore different materials and their possibilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5D4432] mt-1">•</span>
                    <span>Understand product development and finishing processes</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-[#5D4432]">Artisan Collaboration</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5D4432] mt-1">•</span>
                    <span>Work closely with our women artisans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5D4432] mt-1">•</span>
                    <span>Understand traditional making processes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5D4432] mt-1">•</span>
                    <span>Contribute to meaningful storytelling</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg italic text-[#5D4432]/80">
                "Working with our close-knit team offers hands-on experience rooted in craft, from hand crochet techniques and material exploration to product development and finishing. You'll engage closely with our women artisans, understanding the making process, while contributing to thoughtful curation and storytelling that brings each handcrafted piece to life."
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#5D4432]/10 to-transparent border-[#5D4432]/20">
          <CardHeader className="text-center">
            <Mail className="w-12 h-12 text-[#5D4432] mx-auto mb-4" />
            <CardTitle className="text-2xl font-semibold text-[#5D4432]">
              Ready to Join Us?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg">
              If this resonates with you, we'd love to hear from you.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground mb-2">Write to us at:</p>
              <a 
                href="mailto:pinjjaibyh@gmail.com" 
                className="text-xl font-semibold text-[#5D4432] hover:underline transition-colors"
              >
                pinjjaibyh@gmail.com
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                to start the conversation
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>Join us in preserving tradition while empowering artisans</p>
      </div>
    </div>
  )
}
