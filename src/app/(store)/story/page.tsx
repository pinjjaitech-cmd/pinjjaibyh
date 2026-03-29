'use client'

import { motion } from "framer-motion";

const StoryPage = () => {
  return (
    <div className="min-h-screen bg-(--brand-white)">
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-gradient-to-b from-(--brand-primary)/10 to-(--brand-primary)/40" />
        <div className="relative z-10 max-w-4xl px-6 lg:px-12 pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-serif text-5xl md:text-7xl text-(--brand-dark) tracking-[0.05em] mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl text-(--brand-dark)/70 max-w-lg"
          >
            A documentary of heritage, hands, and hope woven into every stitch
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
            In the heartland of Punjab, where mustard fields stretch to the horizon and the air smells of earth
            after rain, an ancient art was slowly fading. <em className="font-serif italic text-(--brand-dark)">Pinjana</em>—the 
            art of carding cotton—had been the rhythm of village life for centuries.
          </p>
          <p className="text-lg text-(--brand-dark)/70 leading-relaxed">
            Women would sit together under the shade of neem trees, their hands moving in practiced choreography,
            turning raw cotton into thread. It was more than craft—it was conversation, community, continuity.
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
              Harman Seera returned to her grandmother's village with a question: What if these forgotten skills
              could become a force for change? What if the women who once carded cotton could crochet a new future?
            </p>
            <p className="text-(--brand-dark)/70 leading-relaxed">
              She began with five women and a simple crochet hook. Within months, word spread. Women walked from
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
            <div className="relative aspect-[3/4] bg-(--brand-primary)/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-(--brand-primary) rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-(--brand-white) text-3xl">🧵</span>
                  </div>
                  <p className="text-(--brand-dark)/60">Crocheting with care</p>
                </div>
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
              Today, Pinjjai is more than a brand. It's a living archive of Punjabi craft, a platform for women's
              voices, and proof that beauty and purpose can exist in the same stitch.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="overflow-hidden max-w-3xl mx-auto rounded-lg"
          >
            <div className="relative aspect-[16/9] bg-(--brand-primary)/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-(--brand-primary) rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-(--brand-white) text-3xl">🎨</span>
                  </div>
                  <p className="text-(--brand-dark)/60">Crochet texture detail</p>
                </div>
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
            { quote: "Before Pinjjai, my hands knew how to work but not how to dream. Now they do both.", name: "Simran Kaur", role: "Artisan, Moga District" },
            { quote: "My mother carded cotton. I crochet bags that travel the world. We are the same thread.", name: "Amrit Kaur", role: "Senior Artisan" },
            { quote: "Every bag I finish is a promise kept—to my children, to my village, to myself.", name: "Jaspreet Kaur", role: "Artisan, Ludhiana" },
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
    </div>
  );
};

export default StoryPage;
