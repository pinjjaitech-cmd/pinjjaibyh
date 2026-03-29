'use client'

import { motion } from "framer-motion";
import Image from 'next/image';

const timelineEvents = [
  { year: "Roots", title: "The Art of Pinjana", desc: "For centuries, women in Punjab practiced 'Pinjana'—the art of carding cotton. With simple tools and infinite patience, they turned raw fibers into thread, weaving the fabric of their communities." },
  { year: "Spark", title: "A Vision Takes Shape", desc: "Harman Seera, inspired by her grandmother's stories of cotton fields and crochet hooks, envisioned a brand that could honor these traditions while creating modern luxury." },
  { year: "Birth", title: "Pinjjai is Born", desc: "Named after the Punjabi word for the crochet stitch, Pinjjai was founded to bridge heritage craft with contemporary fashion—empowering the women who keep these traditions alive." },
  { year: "Today", title: "A Growing Movement", desc: "From a handful of artisans to a community of skilled women across rural Punjab, Pinjjai continues to grow—each bag a testament to resilience, beauty, and purpose." },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-(--brand-white)">
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-(--brand-primary)/20 to-(--brand-primary)/40" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-serif text-5xl md:text-7xl text-(--brand-dark) mb-6"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl text-(--brand-dark)/70 max-w-2xl mx-auto"
          >
            From raw thread to radiant purpose - the journey of Pinjjai
          </motion.p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg"
          >
            <div className="relative aspect-[4/3] bg-(--brand-primary)/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-(--brand-primary) rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-(--brand-white) text-3xl font-serif">HS</span>
                  </div>
                  <p className="text-(--brand-dark)/60">Founder's Image</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <span className="text-xs tracking-[0.3em] uppercase text-(--brand-primary) font-semibold">The Founder</span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl text-(--brand-dark) mb-6 leading-tight">
              Harman Seera
            </h2>
            <div className="w-16 h-0.5 bg-(--brand-primary) mb-6" />
            <p className="text-(--brand-dark)/70 leading-relaxed mb-4">
              Growing up between the bustling streets of modern India and the quiet rhythms of her ancestral village,
              Harman always felt the pull of two worlds. Her grandmother's hands, weathered and wise, taught her that
              every thread carries a story.
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              Pinjjai was born from the desire to give these stories a platform—to transform the invisible labor of
              women artisans into visible, celebrated art. Each bag is an act of preservation, empowerment, and love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-32 bg-(--brand-primary)/5">
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
                className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
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
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6 lg:px-12">
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
              Over 50 women artisans across 12 villages in Punjab form the beating heart of Pinjjai.
              They are mothers, daughters, dreamers—each one transforming thread into independence.
            </p>
            <div className="grid grid-cols-3 gap-8">
              {[
                { num: "50+", label: "Artisans" },
                { num: "12", label: "Villages" },
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
            <div className="relative aspect-[4/5] bg-(--brand-primary)/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-(--brand-primary) rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-(--brand-white) text-3xl">👥</span>
                  </div>
                  <p className="text-(--brand-dark)/60">Artisans Community</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
