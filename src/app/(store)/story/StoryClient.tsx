'use client'

import { motion } from "framer-motion";
import SocialMediaLinks from "@/components/SocialMediaLinks";

const StoryClient = () => {
  return (
    <div className="min-h-screen bg-(--brand-white)">
      {/* Hero */}
      <section className="relative w-full h-[60vh] bg-black overflow-hidden flex items-end">
        <img src="/our-story-banner.png" alt="Our Story" className="absolute inset-0 w-full h-full opacity-45 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-(--brand-primary)/10 to-(--brand-primary)/40" />
        <div className="relative w-full z-10 px-6 lg:px-12 pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-serif text-5xl md:text-7xl text-white text-center tracking-[0.05em] mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl text-white/70 text-center "
          >
            A documentary of heritage, hands, and hope knit into every loop
          </motion.p>
        </div>
      </section>

      {/* Chapter 1 */}
      <section className="py-20 lg:py-32 max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-(--brand-primary) font-semibold mb-6">Chapter One</p>
          <h2 className="font-serif text-4xl lg:text-6xl text-(--brand-dark) mb-8 leading-tight">
            The Forgotten Art
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-(--brand-dark)/70 mb-6 leading-relaxed">
            In the heartland of Punjab, where mustard fields stretch endlessly and the air carries the scent of rain-soaked earth, an ancient art was quietly fading. Hand crochet—the delicate craft of creating fabric using a single hook and thread, loop by loop—was once the rhythm of village life, each stitch formed slowly with patience and care.

          </p>
          <p className="text-lg text-(--brand-dark)/70 leading-relaxed">
            Under the shade of neem trees, women would gather, their hands moving in effortless harmony—each thread knitted with memory and meaning. It was never just a craft; it was shared stories, silent strength, and a bond passed down through generations. A living legacy of conversation, community, and continuity.
          </p>
        </motion.div>
      </section>

      {/* Full-width visual */}
      <section className="relative h-[50vh] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="relative h-full"
        >
          <div className="absolute inset-0 bg-(--brand-primary)/20 flex items-center justify-center">
            <blockquote className="text-center px-6 max-w-4xl">
              <p className="font-serif text-2xl md:text-4xl text-(--brand-dark) leading-relaxed">
                "Thread by thread, we rebuild what time tried to unravel."
              </p>
            </blockquote>
          </div>
        </motion.div>
      </section>

      {/* Chapter 2 */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-(--brand-primary) font-semibold mb-6">Chapter Two</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-(--brand-dark) mb-8 leading-tight">
              A Thread of Hope
            </h2>
            <p className="text-(--brand-dark)/70 mb-6 leading-relaxed">
              Harman Seera returned to her roots with a question—what if these forgotten hand crochet skills could become a force for change? What if the women who once knit threads of tradition could now crochet a new future?
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              She began with two women and a simple crochet hook. Within months, word spread. Women walked from
              neighboring villages to learn, to earn, to belong to something bigger than themselves.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg"
          >
            <div className="relative aspect-3/4 bg-(--brand-primary)/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/crochet-with-care.jpg" alt="Crochet with Care" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 3 */}
      <section className="py-20 lg:py-32 bg-(--brand-primary)/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-(--brand-primary) font-semibold mb-6">Chapter Three</p>
            <h2 className="font-serif text-4xl lg:text-6xl text-(--brand-dark) mb-8">
              The Craft Continues
            </h2>
            <p className="text-lg text-(--brand-dark)/70 max-w-2xl mx-auto mb-12 leading-relaxed">
              Today, Pinjjai is more than a brand; it is a living archive of hand crochet—preserving craft, carrying stories, and honouring heritage. It is a platform for women's voices, and a reminder that beauty and purpose can exist in the same stitch.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="overflow-hidden max-w-3xl mx-auto rounded-lg"
          >
            <div className="relative aspect-video bg-(--brand-primary)/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/crochet-with-details.jpg" alt="Crochet with Details" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Artisan voices */}
      <section className="py-20 lg:py-32 max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-(--brand-primary) font-semibold mb-6">Voices</p>
          <h2 className="font-serif text-4xl text-(--brand-dark)">From the Artisans</h2>
        </motion.div>

        <div className="space-y-12">
          {[
            { quote: "I earn with dignity while doing what I love.", name: "Abhilasha", role: "Artisan" },
            { quote: "This work gives me confidence, income, and pride.", name: "Rinkal", role: "Artisan" },
            { quote: "I support my family with every thread I crochet.", name: "Tannu", role: "Artisan" },
            { quote: "Pinjjai turned my skill into a source of empowerment.", name: "Manpreet", role: "Artisan" },
            { quote: "With Pinjjai, my hands create not just products, but possibilities.", name: "Sonia", role: "Artisan" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <blockquote className="border-l-2 border-(--brand-primary)/30 pl-8">
                <p className="font-serif text-xl lg:text-2xl text-(--brand-dark)/80 leading-relaxed mb-4">
                  "{item.quote}"
                </p>
                <cite className="not-italic">
                  <span className="text-sm font-serif text-(--brand-dark)">{item.name}</span>
                  <span className="text-xs text-(--brand-dark)/60 ml-2">— {item.role}</span>
                </cite>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Join Our Journey */}
      <section className="py-20 bg-(--brand-primary)">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-(--brand-white) mb-6">
              Join Our Journey
            </h2>
            <p className="text-lg text-(--brand-white)/80 max-w-2xl mx-auto mb-12">
              Follow us to witness the continuation of this story, see new collections emerge, and connect with the artisans who make every piece special.
            </p>
            
            <SocialMediaLinks 
              size="lg"
              variant="outlined"
              className="mb-8"
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-(--brand-white)/60 text-sm"
            >
              #PinjjaiByH #HandcraftedWithPurpose #WomenEmpowerment
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default StoryClient;
