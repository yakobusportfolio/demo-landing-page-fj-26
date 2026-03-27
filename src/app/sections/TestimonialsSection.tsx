import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export function TestimonialsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "KU",
      venue: "Jakarta",
      rating: 5,
      link: "https://maps.app.goo.gl/DmrSWcRLJM52Ceet6", // <--- SUDAH KEMBALI
      text: `Helloo! To the amazing FJ team — my ultimate photo & videographer heroes!! 📸🎥✨
      Thank youuu so, so much for being super fun from the very beginning, making everything feel natural so I didn't feel awkward at all — 
      instead I really enjoyed being in front of your camera! Your positive vibes, clear directions,
      and steady patience in guiding our poses truly made every moment feel effortless.
      And can we talk about the SAME-DAY EDIT video you previewed during the dinner?! I was screaming internally 😭✨
      It was SOOOO NICE! Bagus banget sumpahhh! Pengen banget post!! If you can share the file here, PLEASEEEEE ya! Hahaha!
      To all FJ team members who came to shoot our wedding — GUYSSSS YOU ARE ALL AMAZINGGGG!!! Super fun, super clear, super fast, and super responsible.
      No words can express HOW GRATEFUL I AM for choosing you as our photo/videographer.
      I've been admiring FJ's portfolio for a long time, and seeing it LIVE on my own wedding day — with Victor and our families —
      I can confidently say you are not only incredibly talented and professional, but also full of humor and warmth. The perfect combination. ❤️ Thank youuu so much once again.
      And I'm sorry if there were things that weren't smooth on our side.
      We love you, and truly hope our paths cross again someday!
      Sehat selalu dan sukses selalu yaaa, Farall Jibrill team!
      YOU GUYS ROCK. THE BEST OF THE BEST!!! 💛✨
      Stay in touch yaaa kalo kalian di Jakarta or aku di Solo! Sayang kalian semuaaa! Love loveee!`
    },
    {
      name: "Erna Mawar",
      venue: "Tawangmangu, Karanganyar",
      rating: 5,
      link: "https://maps.app.goo.gl/iznkxgcnjdk9jCxh6", // <--- SUDAH KEMBALI
      text: `Kami ucapkan banyak terimakasih untuk faralljibrill dan team ⭐️⭐️⭐️⭐️⭐️
      Sangat puas sekali dengan hasil foto wedding dengan faralljibrill , Semua tim sangat fast respon , ramah, Baik semua
      Untuk paket foto wedding yang kami ambil Silver Photo & Visio clip , hasil album sangat memuaskkan 😍, Sukses selalu untuk Faralljibrill  🥳😍

      _Radhika & Erna_`
    },
    {
      name: "Hasana -",
      venue: "Diamond Convention Hall",
      rating: 5,
      link: "https://maps.app.goo.gl/QG4hzMxRA8mgGEzQ6", // <--- SUDAH KEMBALI
      source: "Google Maps",
      text: `Saya menyewa jasa fotografi dari Faralljibrill untuk acara pernikahan saya. Semua hasil fotonya sangat bagus, mulai dari angle hingga coloring akhirnya. Selama proses pemotretan di acara itu, tim yang handle sangat ramah, sabar dan kooperatif. Mereka tau angle terbaik untuk orang yang difoto dan bisa mengarahkan gayanya dengan baik, jadi hasil fotonya beragam dan tidak monoton. Kalau saya bisa kasih bintang 100 di ulasan, sudah saya kasih 100 dan akan merekomendasikannya ke teman2 saya jika punya acara.`
    },
    {
        name: "Karla M Praenta",
        venue: "Surakarta",
        rating: 5,
        link: "https://maps.app.goo.gl/QKwT2rRMQy95jbxN8", // Contoh sumber berbeda
        text: "Bagus bgttt hasil foto dan videografinya! Bener2 cinematic antara pengambilan spot, videografi, dan pemilihan lagu/musik!!!! Gak nyesel sama sekali buat milih vendor faraljibril jd bagian dari acara sekali seumur hidup ini. Makasih FJ team!😍😍😍"
    },
    {
        name: "Rani Apriliani",
        venue: "Setyowati, Surakarta",
        rating: 5,
        link: "https://maps.app.goo.gl/QKwT2rRMQy95jbxN8", // Contoh sumber berbeda
        text: "Dari prewedd sampai wedding bareng dgn FJ, hasilnya selalu bagusss2 bgt dan memuaskan. Tim yang in charge di lapangan pun sigap dan mengabadikan setiap momen dgn apik. Terima kasih banyaakk tim FJ ✨🫶🏻 …"
    },
    {
        name: "Ovi Anggraini",
        venue: "Surakarta",
        rating: 5,
        link: "https://maps.app.goo.gl/9ojjbhTT8v9Sz36C9", // Contoh sumber berbeda
        text: "FG paling TOP di Solo.,. team nya ramah2, humble, dan pastinya paling tau ajarin kita buat gaya di depan kamera… sabar juga ngadepin aku yang banyak maunya… 😁 selain bekerja dengan totalitas mereka juga bekerja pake hati, jadi kita di buat nyaman 💕🥰 love banyak2 buat Faralljibrill Photography… sukses selalu.. pengen banget di foto lg… next time kalau main ke solo. Pengen foto keluarga di sini 🥹"
    },
    {
        name: "Hari Purwiyati",
        venue: "Surakarta",
        rating: 5,
        link: "https://maps.app.goo.gl/rnaRihRiLmTvwvwB7", // Contoh sumber berbeda
        text: "Hasil Jepretan Faralljibrill emang selalu OK, dari prewedd sampai wedding hasilnya membuat terpana. sukses selalu mas Gofar & team, tetap menghasilkan karya fotografi & videografi terbaik ya, Mas Ihsan & Mas Bowo juga Kerennn!"
    },
    {
        name: "Maria Muliandari",
        venue: "Surakarta",
        rating: 5,
        link: "https://maps.app.goo.gl/jRi542A1a9Xo31ju5", // Contoh sumber berbeda
        text: `TERKAGET!!!
        Bisa-bisanya ada yg kasih review jelek...
        Kalau pengalamanku pakai FJ dari prewedd sampai wedding, jujur aku dan suami sangat puasss... Posting di WA, IG, FB banyak yg nanya pakai fotografer siapa, karna emang sebagus itu dan posse senatural itu, editannya jg gk norak. Kalau file dikasih lama wajar, karna di keterangan booking sdh diberitau estiminasi semua file diberikan 1bln ++
        OH ya fyi aku pas prewedd sakit muntaber dan masuk angin hsl foto tetep bagus kana diarahin sama tim FJ, waktu nikahpun ada ribuan foto sampai aku dan suami bilang "sdh capek foto udahan aja" tp tim FJ semangatin posse cekrak cekrek yg untung jg aku dan suami dapat foto bnyk, bingung yg upload mau yg mana dulu 🤣🤭`
    },
    {
        name: "Cindy Sekar",
        venue: "Graha Setyowati, Sukoharjo",
        rating: 5,
        link: "https://maps.app.goo.gl/3rhRcmdyQdQNwwdeA", // Contoh sumber berbeda
        text: `Hasil sangat memuaskan, teamnya ramah dan detail memberi arahan✨`
    },
    {
        name: "Viona Rizky Avianiza",
        venue: "Solo",
        rating: 5,
        link: "https://maps.app.goo.gl/gowG1vke6h9LrXxQ7", // Contoh sumber berbeda
        text: `fg solo ternama yg berkualitas, sampe semua acara prewedd, akad, resepsi, ngunduh mantu pake faralljibrill.. next mau maternity pake fj jugaaa krn sebagus itu hasilnya😍♥️
        acara2 besar itu sekali seumur hidup jd buat mengabadikan moment hrs pinter2 nyari fg biar bisa dikenang trs✨🙌
        sukses trss fj dan team🙏🏻
        Positif
        Responsivitas, Kualitas, Profesionalisme, Nilai`
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#041e48] mb-6">Cerita Kebahagiaan Mereka</h2>
          <div className="w-24 h-1 bg-[#70161e] mx-auto rounded-full" />
        </motion.div>

        <div className="relative group max-w-7xl mx-auto">
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 text-[#041e48] opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-50 hidden md:flex"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 text-[#041e48] opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-50 hidden md:flex"
          >
            <ChevronRight size={24} />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-10 px-4"
            style={{ scrollbarWidth: 'none' }}
          >
            {testimonials.map((testimonial, index) => {
              const isExpanded = expandedIndex === index;
              const needsReadMore = testimonial.text.length > 100;

              return (
                <motion.div 
                  key={index}
                  className="shrink-0 w-[85vw] md:w-[calc(33.333%-1rem)] snap-center"
                >
                  <div className="bg-gray-50 p-8 rounded-3xl h-full flex flex-col border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                    
                    <div className="flex gap-1 mb-6 text-[#f5c767]">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>

                    <div className="flex-grow">
                      <p className="text-gray-600 italic leading-relaxed text-sm md:text-base">
                        "{isExpanded ? testimonial.text : `${testimonial.text.substring(0, 100)}...`}"
                      </p>
                      
                      {needsReadMore && (
                        <button 
                          onClick={() => setExpandedIndex(isExpanded ? null : index)}
                          className="mt-3 text-[#70161e] text-[10px] font-bold uppercase tracking-widest hover:text-[#041e48] transition-colors"
                        >
                          {isExpanded ? "Tutup" : "Baca Selengkapnya"}
                        </button>
                      )}
                    </div>

                    <div className="flex justify-between items-end border-t border-gray-100 pt-6 mt-8">
                      <div className="flex flex-col min-w-0">
                        <span className="font-serif text-[#041e48] text-lg font-medium truncate">
                          {testimonial.name}
                        </span>
                        <span className="text-[9px] text-[#70161e] font-bold uppercase tracking-[0.2em] mt-1">
                          {testimonial.venue}
                        </span>
                      </div>
                      
                      {/* --- LINK NAVIGASI RAPI --- */}
                    <a 
                      href={testimonial.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[8px] text-gray-400 uppercase shrink-0 ml-4 font-sans hover:text-[#70161e] transition-colors hover:underline underline-offset-2"
                    >
                      Sumber asli Google Maps
                    </a>
                  </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}