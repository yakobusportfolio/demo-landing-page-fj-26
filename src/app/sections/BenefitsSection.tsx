import { motion } from "motion/react";
import { Users, Share2, Heart } from "lucide-react";

export function BenefitsSection() {
  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Pengalaman Seru Buat Tamu",
      description: "Ajak tamu undanganmu buat seru-seruan bareng lewat pengalaman foto yang interaktif dan bikin suasana pesta makin hidup."
    },
    {
      icon: <Share2 className="w-8 h-8 text-white" />,
      title: "Bagi Momen Secara Instan",
      description: "Tamu bisa langsung akses dan share foto-foto favorit mereka ke media sosial lewat handphone masing-masing secara real-time."
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Kenangan Manis yang Abadi",
      description: "Dapatkan kenang-kenangan fisik maupun digital yang menangkap kebahagiaan dan estetika momen spesialmu dengan sempurna."
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-[#041e48]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Bikin Momen Pernikahanmu <br className="hidden md:block" /> Makin Berkesan
          </h2>
          
          {/* PERBAIKAN GARIS: Menggunakan gradasi emas yang tipis dan elegan */}
          <div className="relative w-88 h-[0.5px] mx-auto mt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffffff] to-transparent" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Ikon dengan border tipis emas saat hover */}
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#f5c767]/50 transition-all duration-500 shadow-2xl">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-serif text-white mb-4">{benefit.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm md:text-base px-4">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}