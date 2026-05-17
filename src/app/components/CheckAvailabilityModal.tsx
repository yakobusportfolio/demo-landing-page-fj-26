/**
 * Check Availability Modal Component
 * * A high-converting modal overlay for wedding booking inquiries.
 * Features:
 * - Mobile-first design (bottom sheet on mobile, centered on desktop)
 * - Elegant wedding aesthetic with soft neutral tones
 * - Form validation with react-hook-form
 * - Success/error states with toast notifications
 * - Smooth animations and transitions
 * - Safe Background scroll lock (Tailwind based)
 * - React Portal to Root (Z-index fix without breaking sticky elements)
 */

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { supabase } from "../utils/supabaseClient";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, ChevronDown, Heart, Users, MapPin, MessageSquare, AtSign, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { IMAGES } from "../constants/images";

interface CheckAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  event_date: string;
  event_location: string;
  social_media: string;
  message: string;
}

export function CheckAvailabilityModal({ isOpen, onClose }: CheckAvailabilityModalProps) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  // PERBAIKAN 1: Scroll Lock Super Aman menggunakan class Tailwind
  useEffect(() => {
    if (isOpen || showSuccessModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    
    // Pastikan class dihapus jika komponen dibongkar (unmount)
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, showSuccessModal]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('submissions')
        .insert([
          { 
            name: data.name, 
            email: data.email, 
            phone: data.phone,
            event_date: data.event_date,
            event_location: data.event_location,
            instagram: data.social_media, 
            message: data.message,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      setShowSuccessModal(true);
      reset();
      
    } catch (error: any) {
      console.error("Supabase Error:", error.message);
      toast.error("Gagal mengirim data", {
        description: error.message || "Silakan coba lagi atau hubungi kami langsung.",
      });
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose(); 
  };

  if (typeof document === "undefined") return null;

  // PERBAIKAN 2: Target portal dipindah ke #root agar tidak memecah layout utama body
  const portalTarget = document.getElementById("root") || document.body;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay - Full screen with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center md:p-4 pointer-events-none">
            <motion.div
              drag="y" 
              dragConstraints={{ top: 0, bottom: 0 }} 
              dragElastic={{ top: 0, bottom: 0.5 }} 
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) {
                  onClose();
                }
              }}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300 
              }}
              className="w-full max-w-[480px] bg-white pointer-events-auto
                         rounded-t-[24px] md:rounded-[20px] 
                         shadow-2xl
                         max-h-[85vh] md:max-h-[88vh]
                         overflow-hidden flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-7 right-7 z-20
                           w-10 h-10 md:w-11 md:h-11 
                           flex items-center justify-center
                           rounded-full 
                           bg-gray-100 hover:bg-[#70161e] 
                           border-2 border-gray-200 hover:border-[#70161e]
                           shadow-md hover:shadow-lg
                           transition-all duration-200 
                           group cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-[#70161e] focus:ring-offset-2"
                aria-label="Close modal"
                type="button"
              >
                <X className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
              </button>

              {/* Drag Handle (Mobile Only) */}
              <div className="md:hidden flex justify-center pt-4 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1 px-6 pb-8 md:px-10 md:pb-10
                             scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
                             hover:scrollbar-thumb-gray-400
                             [&::-webkit-scrollbar]:w-1.5
                             [&::-webkit-scrollbar-track]:bg-transparent
                             [&::-webkit-scrollbar-thumb]:bg-gray-300
                             [&::-webkit-scrollbar-thumb]:rounded-full
                             [&::-webkit-scrollbar-thumb:hover]:bg-gray-400">
                {/* Header */}
                <div className="pt-5 pb-6 md:pt-6 md:pb-7 -mx-6 md:-mx-10 px-6 md:px-10 bg-gradient-to-b from-[#041e48]/5 to-transparent">
                  <h2 
                    id="modal-title"
                    className="text-2xl md:text-3xl font-serif text-[#041e48] mb-2"
                  >
                    Check Availability
                  </h2>
                  <p className="text-sm md:text-base text-gray-600">
                    Secure your special date before it's fully booked
                  </p>
                </div>

                {/* Emotional Image */}
                <div className="my-6 md:my-7 rounded-[16px] overflow-hidden shadow-md">
                  <img
                    src={IMAGES.modal.checkAvailability}
                    alt="Beautiful wedding couple moment"
                    className="w-full h-[200px] md:h-[220px] object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="modal-name" className="text-gray-800 font-semibold text-sm">
                      Name *
                    </Label>
                    <Input
                      id="modal-name"
                      {...register("name", {
                        required: "Please enter your name",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters",
                        },
                      })}
                      placeholder="e.g. Sarah & John"
                      className={`h-13 text-base border-2 ${
                        errors.name 
                          ? "border-red-400 focus-visible:ring-red-400" 
                          : "border-gray-200 focus-visible:ring-[#70161e] focus-visible:border-[#70161e]"
                      }`}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="modal-email" className="text-gray-800 font-semibold text-sm">
                      Email *
                    </Label>
                    <Input
                      id="modal-email"
                      type="email"
                      {...register("email", {
                        required: "Please enter your email address",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      placeholder="yourname@email.com"
                      className={`h-13 text-base border-2 ${
                        errors.email 
                          ? "border-red-400 focus-visible:ring-red-400" 
                          : "border-gray-200 focus-visible:ring-[#70161e] focus-visible:border-[#70161e]"
                      }`}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="modal-phone" className="text-gray-800 font-semibold text-sm">
                      Phone *
                    </Label>
                    <Input
                      id="modal-phone"
                      type="tel"
                      {...register("phone", {
                        required: "Please enter your phone number",
                        pattern: {
                          value: /^[\d\s+()-]+$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                      placeholder="+62 812 3456 7890"
                      className={`h-13 text-base border-2 ${
                        errors.phone 
                          ? "border-red-400 focus-visible:ring-red-400" 
                          : "border-gray-200 focus-visible:ring-[#70161e] focus-visible:border-[#70161e]"
                      }`}
                      aria-invalid={errors.phone ? "true" : "false"}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Event Date */}
                  <div className="space-y-2">
                    <Label htmlFor="modal-eventDate" className="text-gray-800 font-semibold text-sm">
                      Event Date *
                    </Label>
                    <div className="relative">
                      <Input
                        id="modal-eventDate"
                        type="date"
                        {...register("event_date", {
                          required: "Please select your event date",
                          validate: (value) => {
                            const selectedDate = new Date(value);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return selectedDate >= today || "Event date must be in the future";
                          },
                        })}
                        min={new Date().toISOString().split("T")[0]}
                        className={`h-13 text-base border-2 ${ 
                          errors.event_date 
                            ? "border-red-400 focus-visible:ring-red-400" 
                            : "border-gray-200 focus-visible:ring-[#70161e] focus-visible:border-[#70161e]"
                        } [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                        aria-invalid={errors.event_date ? "true" : "false"}
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#70161e] pointer-events-none" />
                    </div>
                    {errors.event_date && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.event_date.message}
                      </p>
                    )}
                  </div>

                  {/* Event Location */}
                  <div className="space-y-2">
                    <Label htmlFor="modal-eventLocation" className="text-gray-800 font-semibold text-sm">
                      Event Location *
                    </Label>
                    <div className="relative">
                      <Input
                        id="modal-eventLocation"
                        {...register("event_location", {
                          required: "Please enter the event location",
                        })}
                        placeholder="e.g. Bali, Jakarta, Bandung"
                        className={`h-13 text-base pr-11 border-2 ${
                          errors.event_location 
                            ? "border-red-400 focus-visible:ring-red-400" 
                            : "border-gray-200 focus-visible:ring-[#70161e] focus-visible:border-[#70161e]"
                        }`}
                        aria-invalid={errors.event_location ? "true" : "false"}
                      />
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#70161e] pointer-events-none" />
                    </div>
                    {errors.event_location && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.event_location.message}
                      </p>
                    )}
                  </div>

                  {/* Social Media */}
                  <div className="space-y-2">
                    <Label htmlFor="modal-socialMedia" className="text-gray-800 font-semibold text-sm">
                      Social Media
                    </Label>
                    <div className="relative">
                      <Input
                        id="modal-socialMedia"
                        {...register("social_media")}
                        placeholder="@yourusername (Instagram/TikTok)"
                        className="h-13 text-base pr-11 border-2 border-gray-200 focus-visible:ring-[#70161e] focus-visible:border-[#70161e]"
                      />
                      <AtSign className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#70161e] pointer-events-none" />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="modal-message" className="text-gray-800 font-semibold text-sm">
                      Message
                    </Label>
                    <textarea
                      id="modal-message"
                      {...register("message")}
                      placeholder="Tell us about your event, preferred style, or any special requests..."
                      rows={3}
                      className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-md
                                 bg-white text-gray-900 resize-none
                                 focus:outline-none focus:ring-2 focus:ring-[#70161e] focus:border-[#70161e]
                                 placeholder:text-gray-400 transition-colors"
                    />
                  </div>

                  {/* Trust Signals */}
                  <div className="pt-2 pb-4 bg-[#041e48]/5 -mx-6 md:-mx-10 px-6 md:px-10 rounded-xl">
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-[#70161e] fill-[#70161e]" />
                        <span className="font-medium">Limited slots</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#70161e]" />
                        <span className="font-medium">100+ couples</span>
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-base font-semibold
                               bg-[#70161e] hover:bg-[#70161e]/90
                               text-white rounded-xl
                               transition-all duration-300
                               shadow-lg hover:shadow-xl hover:scale-[1.02]
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                               mt-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Checking availability...
                      </span>
                    ) : (
                      "Check Availability Now →"
                    )}
                  </Button>

                  <p className="text-sm text-center text-gray-500 pt-2">
                    ⚡ We'll respond within 24 hours
                  </p>
                </form>
              </div>

              <div className="pb-safe" />
            </motion.div>
          </div>
        </>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110]"
            onClick={handleCloseSuccessModal}
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-full max-w-[400px] pointer-events-auto rounded-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="success-modal-title"
            >
              <div className="absolute inset-0 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl" />
              
              <div className="relative p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.1 }}
                  className="flex justify-center mb-5"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#70161e]/20 blur-2xl rounded-full scale-150" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#70161e] to-[#70161e]/80 flex items-center justify-center shadow-lg shadow-[#70161e]/30">
                      <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                </motion.div>

                <h3 id="success-modal-title" className="text-2xl font-serif text-[#041e48] mb-3">
                  Message Sent!
                </h3>

                <p className="text-base text-gray-600 leading-relaxed mb-2">
                  Your inquiry has been successfully submitted.
                </p>
                <p className="text-base text-gray-700 font-medium leading-relaxed">
                  Our admin will immediately follow up with you via WhatsApp.
                </p>

                <Button
                  onClick={handleCloseSuccessModal}
                  className="w-full h-12 text-base font-semibold bg-[#70161e] hover:bg-[#70161e]/90 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] mt-6"
                >
                  Got it!
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    portalTarget
  );
}