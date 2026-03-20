import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { Calendar, Mail, Phone, MapPin, Instagram, User, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

/**
 * CheckAvailabilityForm Component
 * 
 * This form captures prospective client inquiries including:
 * - Name, Email, Phone
 * - Event Date & Location
 * - Instagram handle (optional)
 * - Additional message (optional)
 * 
 * CURRENT IMPLEMENTATION:
 * - Stores submissions in localStorage (browser-only, for demo)
 * - View submissions at /admin route
 * - Export to CSV available
 * 
 * PRODUCTION BACKEND OPTIONS:
 * 
 * Option 1: Supabase (Full control)
 * - Create a table: availability_inquiries
 * - Add Row Level Security policies
 * - Use Supabase Edge Functions for email notifications
 * - Real-time updates, full database access
 * 
 * Option 2: Formspree (Simple)
 * - POST to https://formspree.io/f/{your-form-id}
 * - Automatic email notifications
 * - Spreadsheet export built-in
 * - No backend coding required
 * 
 * Option 3: Other services
 * - Google Sheets API
 * - Airtable
 * - Custom API endpoint
 */

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

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store submission in localStorage (for demo purposes)
    const submissions = JSON.parse(localStorage.getItem("availability_submissions") || "[]");
    const newSubmission = {
      ...data,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
    submissions.push(newSubmission);
    localStorage.setItem("availability_submissions", JSON.stringify(submissions));

    // Show success state
    setIsSubmitted(true);
    toast.success("Inquiry Submitted!", {
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
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
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-[#041e48]">
            <User size={18} />
            <span>Full Name *</span>
          </Label>
          <Input
            id="name"
            {...register("name", { 
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" }
            })}
            placeholder="John & Jane Doe"
            className="h-12 bg-white/50 border-gray-300 focus:border-[#041e48] focus:ring-[#041e48]"
          />
          {errors.name && (
            <p className="text-sm text-[#70161e] flex items-center gap-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-[#041e48]">
            <Mail size={18} />
            <span>Email Address *</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            placeholder="hello@example.com"
            className="h-12 bg-white/50 border-gray-300 focus:border-[#041e48] focus:ring-[#041e48]"
          />
          {errors.email && (
            <p className="text-sm text-[#70161e] flex items-center gap-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-[#041e48]">
            <Phone size={18} />
            <span>Phone / WhatsApp *</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone", { 
              required: "Phone number is required",
              pattern: {
                value: /^[\d\s\-\+\(\)]+$/,
                message: "Invalid phone number"
              }
            })}
            placeholder="+62 812-3456-7890"
            className="h-12 bg-white/50 border-gray-300 focus:border-[#041e48] focus:ring-[#041e48]"
          />
          {errors.phone && (
            <p className="text-sm text-[#70161e] flex items-center gap-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Event Date */}
        <div className="space-y-2">
          <Label htmlFor="eventDate" className="flex items-center gap-2 text-[#041e48]">
            <Calendar size={18} />
            <span>Event Date *</span>
          </Label>
          <Input
            id="eventDate"
            type="date"
            {...register("eventDate", { 
              required: "Event date is required",
              validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate >= today || "Event date must be in the future";
              }
            })}
            className="h-12 bg-white/50 border-gray-300 focus:border-[#041e48] focus:ring-[#041e48]"
          />
          {errors.eventDate && (
            <p className="text-sm text-[#70161e] flex items-center gap-1">
              {errors.eventDate.message}
            </p>
          )}
        </div>

        {/* Event Location */}
        <div className="space-y-2">
          <Label htmlFor="eventLocation" className="flex items-center gap-2 text-[#041e48]">
            <MapPin size={18} />
            <span>Event Location *</span>
          </Label>
          <Input
            id="eventLocation"
            {...register("eventLocation", { 
              required: "Event location is required",
              minLength: { value: 3, message: "Location must be at least 3 characters" }
            })}
            placeholder="e.g., Bali, Jakarta, Bandung"
            className="h-12 bg-white/50 border-gray-300 focus:border-[#041e48] focus:ring-[#041e48]"
          />
          {errors.eventLocation && (
            <p className="text-sm text-[#70161e] flex items-center gap-1">
              {errors.eventLocation.message}
            </p>
          )}
        </div>

        {/* Instagram Handle */}
        <div className="space-y-2">
          <Label htmlFor="instagram" className="flex items-center gap-2 text-[#041e48]">
            <Instagram size={18} />
            <span>Instagram Handle (Optional)</span>
          </Label>
          <Input
            id="instagram"
            {...register("instagram", {
              pattern: {
                value: /^@?[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/,
                message: "Invalid Instagram handle"
              }
            })}
            placeholder="@yourhandle"
            className="h-12 bg-white/50 border-gray-300 focus:border-[#041e48] focus:ring-[#041e48]"
          />
          {errors.instagram && (
            <p className="text-sm text-[#70161e] flex items-center gap-1">
              {errors.instagram.message}
            </p>
          )}
        </div>

        {/* Additional Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="flex items-center gap-2 text-[#041e48]">
            <Send size={18} />
            <span>Additional Details (Optional)</span>
          </Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="Tell us more about your wedding vision, package preferences, or any specific questions..."
            className="min-h-[120px] bg-white/50 border-gray-300 focus:border-[#041e48] focus:ring-[#041e48] resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-[#041e48] hover:bg-[#1b355e] text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              Submitting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send size={20} />
              Submit Inquiry
            </span>
          )}
        </Button>

        <p className="text-sm text-gray-500 text-center mt-4">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </motion.div>
  );
}