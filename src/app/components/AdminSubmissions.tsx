import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, Mail, Phone, MapPin, AtSign, User, Download, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "sonner";
// 1. Import Supabase
import { supabase } from "../utils/supabaseClient";

// 2. Sesuaikan tipe data dengan kolom di database Supabase
interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_date: string;
  event_location: string;
  instagram?: string; 
  message?: string;
  status: string;
  created_at: string; 
}

export function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  // 3. Mengambil data dari Supabase
  const loadSubmissions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false }); // Urutkan dari yang terbaru

      if (error) throw error;
      
      if (data) {
        setSubmissions(data as Submission[]);
      }
    } catch (error: any) {
      toast.error("Gagal memuat data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Menghapus data di Supabase
  const deleteSubmission = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus data ini permanen?")) return;

    try {
      const { error } = await supabase
        .from('submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update tampilan setelah berhasil dihapus
      setSubmissions(submissions.filter(s => s.id !== id));
      toast.success("Data berhasil dihapus");
    } catch (error: any) {
      toast.error("Gagal menghapus: " + error.message);
    }
  };

  // 5. Mengupdate status (Pending/Confirmed) ke Supabase
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      // Update tampilan lokal
      setSubmissions(submissions.map(s => s.id === id ? { ...s, status: newStatus } : s));
      toast.success("Status diperbarui!");
    } catch (error: any) {
      toast.error("Gagal update status: " + error.message);
    }
  };

  const exportToCSV = () => {
    if (submissions.length === 0) return;

    const headers = ["ID", "Name", "Email", "Phone", "Event Date", "Location", "Instagram", "Message", "Status", "Submitted At"];
    const rows = submissions.map(s => [
      s.id, s.name, s.email, s.phone, s.event_date, s.event_location,
      s.instagram || "", s.message || "", s.status, new Date(s.created_at).toLocaleString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#041e48]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-serif text-[#041e48] mb-2">Supabase Dashboard</h1>
            <p className="text-gray-600">
              {submissions.length} Total Inquiries
            </p>
          </div>
          <div className="flex gap-3">
            {submissions.length > 0 && (
              <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2">
                <Download size={18} /> Export CSV
              </Button>
            )}
          </div>
        </div>

        {submissions.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-xl font-serif text-gray-600 mb-2">Data Masih Kosong</h3>
            <p className="text-gray-500">Belum ada klien yang mengisi form.</p>
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
                        Masuk pada: {new Date(submission.created_at).toLocaleString()}
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
                        <p className="text-xs text-gray-500">WhatsApp</p>
                        <a href={`https://wa.me/${submission.phone.replace(/\D/g,'')}`} target="_blank" className="hover:text-[#70161e]">
                          {submission.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar size={18} className="text-[#041e48]" />
                      <div>
                        <p className="text-xs text-gray-500">Tanggal Event</p>
                        <p>{new Date(submission.event_date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin size={18} className="text-[#041e48]" />
                      <div>
                        <p className="text-xs text-gray-500">Lokasi</p>
                        <p>{submission.event_location}</p>
                      </div>
                    </div>

                    {submission.instagram && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <AtSign size={18} className="text-[#041e48]" />
                        <div>
                          <p className="text-xs text-gray-500">Instagram</p>
                          <a
                            href={`https://instagram.com/${submission.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#70161e]"
                          >
                            {submission.instagram}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {submission.message && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Pesan Tambahan</p>
                      <p className="text-gray-700 leading-relaxed">{submission.message}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}