'use client'

import { motion } from "framer-motion";
import Image from 'next/image';

const timelineEvents = [
  { year: "Roots", title: "The Art of Pinjana", desc: "Pinjjai by H is deeply rooted in the rural landscapes of Punjab, where tradition and craftsmanship are knitted into everyday life. Inspired by age-old techniques, the name Pinjjai is derived from “Pinjana”—a traditional term for the bow-shaped tool once used to clean cotton. It also refers to the process of carding, where raw cotton is gently transformed into soft, workable fibers—the very beginning of everythread. This process embodies patience, purity, and care—values that closely mirror the art of hand crochet, where each loop is shaped slowly and mindfully, one stitch at a time.At its core, Pinjjai by H is a tribute to these timeless practices and to the women who carry them forward, preserving their craft with quiet strength and skill." },
  { year: "Spark", title: "A Vision Takes Shape", desc: "Our vision has always been to create more than just products. We aim to build a platform that empowers women—providing fair wages, nurturing skills, and fostering independence. Every design reflects a belief in effortless style, meaningful craftsmanship, and the strength of women who express themselves through what they create and wear." },
  { year: "Birth", title: "Pinjjai is Born", desc: "Pinjjai by H came to life in July 2019, founded by Harman Seera, a textile graduate from Pearl Academy of Fashion. What began as a creative passion soon turned into a purpose-driven journey. Inspired by her mothers hand crochet skills, Harman grew up watching simple threads transform into something beautiful. Those memories now live on in every piece—each one telling a story of love, tradition, and deep-rooted connection." },
  { year: "Today", title: "A Growing Movement", desc: "Today, Pinjjai by H carries forward stories knitted with care and tradition. Each bag, handcrafted by women artisans of Punjab, holds their skill, dedication, and quiet strength. With every piece, we continue to uplift lives and create consciously—inviting you to be part of a journey rooted in heritage, empowerment, and purpose." },
];

const AboutClient = () => {
  return (
    <div className="min-h-screen bg-(--brand-white)">
      {/* Hero */}
      <section className="relative bg-[url('/hands-crochet.jpg')] bg-cover bg-center h-[60vh] overflow-hidden flex items-center justify-center">

        <div className="absolute inset-0 bg-gradient-to-b from-(--brand-primary)/70 to-(--brand-primary)" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-serif text-5xl md:text-7xl text-white mb-6"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
          >
            From raw thread to radiant purpose - the journey of Pinjjai
          </motion.p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-center items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg w-full flex-1 md:w-1/2"
          >
            <div className="relative w-full h-[60vh] md:h-[70vh]">
              <Image
                src="/harman-seera.jpg"
                alt="Harman Seera"
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, 70vw"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="mb-6">
              <span className="text-xs tracking-[0.3em] uppercase text-(--brand-primary) font-semibold">The Founder</span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl text-(--brand-dark) mb-6 leading-tight">
              Harman Seera
            </h2>
            <div className="w-16 h-0.5 bg-(--brand-primary) mb-6" />
            <p className="text-(--brand-dark)/70 leading-relaxed mb-4">
              Harman Seera, founder of Pinjjai By H, a brand established in 2020, is a Textile Designer trained
              at Pearl Academy of Fashion, Delhi. With over a decade of experience, she seamlessly blends
              formal design education with a deep-rooted connection to traditional craftsmanship. Her work
              spans diverse textile surfaces and traditional embroidery techniques, shaped through years of
              hands-on collaboration with artisans.
            </p><p className="text-(--brand-dark)/70 leading-relaxed mb-4">
              She has worked with organizations and NGOs dedicated to women’s empowerment, including
              PPES and Fair Trade Refuges, experiences that deepened her commitment to creating
              sustainable opportunities for women artisans while preserving traditional skills. Harman has
              also worked with renowned designers such as Ashdeen Lilowala and Aneeth Arora, further
              refining her design sensibility.
            </p><p className="text-(--brand-dark)/70 leading-relaxed mb-4">
              Inspired by nature and the quiet traditions of her ancestral village, her aesthetic reflects a
              thoughtful balance between contemporary design and heritage craft. Guided early on by her
              mother’s skilled hands, she grew up understanding that every thread carries a story—of
              patience, resilience, and artistry.
            </p><p className="text-(--brand-dark)/70 leading-relaxed mb-4">
              Pinjjai was born from this belief: to bring these stories to light. Through her brand, Harman
              transforms the often-unseen labor of women artisans into work that is visible, valued, and
              celebrated.
            </p><p className="text-(--brand-dark)/70 leading-relaxed mb-4">
              Each creation goes beyond being a product—it is a symbol of preservation, empowerment, and
              care, reflecting her enduring commitment to honoring craft and supporting artisan
              communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-(--brand-primary)/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-(--brand-primary) font-semibold">Our Journey</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-(--brand-dark) mt-4">From Thread to Tomorrow</h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-(--brand-primary)/20 lg:-translate-x-px" />

            {timelineEvents.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                viewport={{ once: true }}
                className={`relative flex items-start gap-8 mb-16 last:mb-0 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
              >
                {/* Dot */}
                <div className="absolute left-6 lg:left-1/2 w-4 h-4 rounded-full bg-(--brand-primary) -translate-x-1/2 mt-2 z-10 border-4 border-(--brand-white)" />

                <div className={`ml-16 lg:ml-0 lg:w-1/2 ${i % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                  <span className="text-xs tracking-[0.3em] uppercase text-(--brand-primary)/60 font-semibold">{event.year}</span>
                  <h3 className="font-serif text-2xl text-(--brand-dark) mt-2 mb-3">{event.title}</h3>
                  <p className="text-(--brand-dark)/70 leading-relaxed">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <span className="text-xs tracking-[0.3em] uppercase text-(--brand-primary) font-semibold">Our Community</span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl text-(--brand-dark) mb-6 leading-tight">
              The Hands Behind<br />Every Creation
            </h2>
            <div className="w-16 h-0.5 bg-(--brand-primary) mb-6" />
            <p className="text-(--brand-dark)/70 leading-relaxed mb-6">
              Over 20 women artisans, along with their families in Punjab, form the beating heart of Pinjjai. They are mothers, daughters, dreamers—each one transforming thread into independence.
            </p>
            <div className="grid grid-cols-3 gap-8">
              {[
                { num: "20+", label: "Artisans" },
                { num: "2+", label: "Villages" },
                { num: "100%", label: "Fair Wage" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl text-(--brand-primary)">{stat.num}</p>
                  <p className="text-xs tracking-[0.15em] uppercase text-(--brand-dark)/60 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg"
          >
            <div className="relative aspect-4/5 bg-(--brand-primary)/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src="/artisans-community.jpeg" alt="Community" fill className="object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutClient;
