import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, Mail, Phone, MapPin, Instagram, User, Download, Trash2, AtSign, MessageSquare, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_date: string;
  event_location: string;
  social_media?: string;
  message?: string;
  status: string;
  submittedAt: string;
  source?: string;
}

export function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const stored = localStorage.getItem("availabilitySubmissions");
    if (stored) {
      const data = JSON.parse(stored);
      setSubmissions([...data].reverse()); // Show newest first
    }
  };

  const exportToCSV = () => {
    if (submissions.length === 0) return;

    const headers = ["ID", "Name", "Email", "Phone", "Event Date", "Event Location", "Social Media", "Message", "Status", "Submitted At", "Source"];
    const rows = submissions.map(s => [
      s.id,
      s.name,
      s.email,
      s.phone,
      s.event_date,
      s.event_location,
      s.social_media || "",
      s.message || "",
      s.status,
      new Date(s.submittedAt).toLocaleString(),
      s.source || ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `availability-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearSubmissions = () => {
    if (window.confirm("Are you sure you want to delete all submissions?")) {
      localStorage.removeItem("availabilitySubmissions");
      setSubmissions([]);
    }
  };

  const deleteSubmission = (id: string) => {
    const updated = submissions.filter(s => s.id !== id);
    localStorage.setItem("availabilitySubmissions", JSON.stringify(updated));
    setSubmissions(updated);
  };

  const updateStatus = (id: string, newStatus: string) => {
    const updated = submissions.map(s => s.id === id ? { ...s, status: newStatus } : s);
    localStorage.setItem("availabilitySubmissions", JSON.stringify([...updated].reverse()));
    setSubmissions(updated);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} /> Confirmed
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Clock size={12} /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-serif text-[#041e48] mb-2">Availability Inquiries</h1>
            <p className="text-gray-600">
              {submissions.length} submission{submissions.length !== 1 ? "s" : ""} stored locally
            </p>
          </div>
          <div className="flex gap-3">
            {submissions.length > 0 && (
              <>
                <Button
                  onClick={exportToCSV}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download size={18} />
                  Export CSV
                </Button>
                <Button
                  onClick={clearSubmissions}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Clear All
                </Button>
              </>
            )}
          </div>
        </div>

        {submissions.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-xl font-serif text-gray-600 mb-2">No Submissions Yet</h3>
            <p className="text-gray-500">
              Inquiry submissions will appear here once clients submit the availability form.
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {submissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-serif text-[#041e48] mb-1 flex items-center gap-2">
                        <User size={20} className="text-[#70161e]" />
                        {submission.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Submitted {new Date(submission.submittedAt).toLocaleString()}
                        {submission.source && (
                          <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                            via {submission.source}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(submission.status)}
                      <select
                        value={submission.status}
                        onChange={(e) => updateStatus(submission.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#70161e]"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSubmission(submission.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Mail size={18} className="text-[#041e48]" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <a href={`mailto:${submission.email}`} className="hover:text-[#70161e]">
                          {submission.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <Phone size={18} className="text-[#041e48]" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <a href={`tel:${submission.phone}`} className="hover:text-[#70161e]">
                          {submission.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar size={18} className="text-[#041e48]" />
                      <div>
                        <p className="text-xs text-gray-500">Event Date</p>
                        <p>{new Date(submission.event_date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin size={18} className="text-[#041e48]" />
                      <div>
                        <p className="text-xs text-gray-500">Event Location</p>
                        <p>{submission.event_location}</p>
                      </div>
                    </div>

                    {submission.social_media && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <AtSign size={18} className="text-[#041e48]" />
                        <div>
                          <p className="text-xs text-gray-500">Social Media</p>
                          <a
                            href={`https://instagram.com/${submission.social_media.replace('@', '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#70161e]"
                          >
                            {submission.social_media}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {submission.message && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Message</p>
                      <p className="text-gray-700 leading-relaxed">{submission.message}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="text-lg font-serif text-[#041e48] mb-2">📋 Development Note</h3>
          <p className="text-gray-700 leading-relaxed">
            This is a demo view showing submissions stored in your browser's localStorage. 
            In production, you would integrate with a backend service (like Supabase, Formspree, or your own API) 
            to store submissions permanently, send email notifications, and access data across devices.
          </p>
        </div>
      </div>
    </div>
  );
}