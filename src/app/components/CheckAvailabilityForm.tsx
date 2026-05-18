
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { Calendar, Mail, Phone, Instagram, User, Send, CheckCircle2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

// --- PERUBAHAN DISINI: Import Supabase Client ---
import { supabase } from "../utils/supabaseClient";

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventLocation: string;
  instagram: string;
  message?: string;
}

export function CheckAvailabilityForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  // --- PERUBAHAN DISINI: Logika onSubmit Baru ---
  const onSubmit = async (data: FormData) => {
    const loadingToast = toast.loading("Sending your inquiry...");

    try {
      // Mengirim data ke tabel 'submissions' di Supabase
      const { error } = await supabase
        .from('submissions')
        .insert([
          { 
            name: data.name, 
            email: data.email, 
            phone: data.phone,
            event_date: data.eventDate,      // Pemetaan ke kolom DB
            event_location: data.eventLocation,
            instagram: data.instagram,
            message: data.message,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      // Jika Berhasil
      setIsSubmitted(true);
      toast.success("Inquiry Submitted!", {
        description: "We'll get back to you within 24 hours.",
        id: loadingToast,
      });

      // Reset form setelah 3 detik
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
      }, 3000);

    } catch (error: any) {
      console.error("Supabase Error:", error.message);
      toast.error("Failed to send: " + error.message, { id: loadingToast });
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl p-12 text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-3xl font-serif text-[#041e48] mb-4">Thank You!</h3>
        <p className="text-gray-600 text-lg max-w-md mx-auto">
          Your inquiry has been received. Our team will review your details and reach out to you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl p-8 md:p-12"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-[#041e48] mb-3">
          Check Availability
        </h2>
        <p className="text-gray-600 text-lg">
          Tell us about your special day and we'll get back to you with our availability and packages.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-[#041e48]">
            <User size={18} />
            <span>Full Name *</span>
          </Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="John & Jane Doe"
            className="h-12 bg-white/50 border-gray-300"
          />
          {errors.name && <p className="text-sm text-[#70161e]">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-[#041e48]">
            <Mail size={18} />
            <span>Email Address *</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="hello@example.com"
            className="h-12 bg-white/50 border-gray-300"
          />
          {errors.email && <p className="text-sm text-[#70161e]">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-[#041e48]">
            <Phone size={18} />
            <span>Phone / WhatsApp *</span>
          </Label>
          <Input
            id="phone"
            {...register("phone", { required: "Phone number is required" })}
            placeholder="+62 812-3456-7890"
            className="h-12 bg-white/50 border-gray-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="eventDate" className="flex items-center gap-2 text-[#041e48]">
              <Calendar size={18} />
              <span>Event Date *</span>
            </Label>
            <Input
              id="eventDate"
              type="date"
              {...register("eventDate", { required: "Date is required" })}
              className="h-12 bg-white/50 border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventLocation" className="flex items-center gap-2 text-[#041e48]">
              <MapPin size={18} />
              <span>Event Location *</span>
            </Label>
            <Input
              id="eventLocation"
              {...register("eventLocation", { required: "Location is required" })}
              placeholder="e.g., Bali"
              className="h-12 bg-white/50 border-gray-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="instagram" className="flex items-center gap-2 text-[#041e48]">
            <Instagram size={18} />
            <span>Instagram Handle (Optional)</span>
          </Label>
          <Input
            id="instagram"
            {...register("instagram")}
            placeholder="@yourhandle"
            className="h-12 bg-white/50 border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="flex items-center gap-2 text-[#041e48]">
            <Send size={18} />
            <span>Additional Details (Optional)</span>
          </Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="Tell us more..."
            className="min-h-[100px] bg-white/50 border-gray-300 resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-[#041e48] hover:bg-[#1b355e] text-white text-lg font-medium rounded-xl"
        >
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </Button>
      </form>
    </motion.div>
  );
}