import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';
import React from 'react';
import { Mail, Phone, MapPin, Calendar, MessageCircle, Send, Facebook, Instagram } from 'lucide-react';

export default function ContactPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        'service_mw152kr',
        'template_iqaovxt',
        e.currentTarget,
        'le4OOsQixJIt9YN3I'
      );

      alert('Appointment request sent successfully!');
      e.currentTarget.reset();
    } catch (error: any) {
  console.error('EmailJS error:', error);
  alert(`Failed: ${error?.text || error?.message || JSON.stringify(error)}`);
}
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Whether you have a question about digestive health, need a second opinion, or would like to discuss a potential collaboration — I'm here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-bold font-serif mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl"><Mail className="w-6 h-6" /></div>
                <div>
                  <div className="text-sm font-medium text-blue-100 uppercase tracking-wider mb-1">Email</div>
                  <a href="mailto:vattanak.ek.ve@gmail.com" className="font-bold text-lg hover:underline">vattanak.ek.ve@gmail.com</a>
                  <div className="text-sm text-blue-100 mt-1">Best for non-urgent questions</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl"><Phone className="w-6 h-6" /></div>
                <div>
                  <div className="text-sm font-medium text-blue-100 uppercase tracking-wider mb-1">Phone</div>
                  <a href="tel:+85598355833" className="font-bold text-lg hover:underline">+855 98 355 833</a>
                  <div className="text-sm text-blue-100 mt-1">For scheduling or quick inquiries</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl"><MapPin className="w-6 h-6" /></div>
                <div>
                  <div className="text-sm font-medium text-blue-100 uppercase tracking-wider mb-1">Location</div>
                  <div className="font-bold text-lg">Phnom Penh, Cambodia</div>
                  <div className="text-sm text-blue-100 mt-1">Gastroenterology & Proctology Department</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} href="https://wa.me/85598355833" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-2 hover:shadow-xl transition-all text-emerald-500">
              <MessageCircle className="w-8 h-8" />
              <span className="font-bold text-slate-900 dark:text-white">WhatsApp</span>
            </motion.a>

            <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} href="https://t.me/+85598355833" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-2 hover:shadow-xl transition-all text-blue-500">
              <Send className="w-8 h-8" />
              <span className="font-bold text-slate-900 dark:text-white">Telegram</span>
            </motion.a>

            <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} href="https://www.facebook.com/Vattanak.Ek/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-2 hover:shadow-xl transition-all text-blue-600">
              <Facebook className="w-8 h-8" />
              <span className="font-bold text-slate-900 dark:text-white">Facebook</span>
            </motion.a>

            <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} href="https://www.instagram.com/megan__ek/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-2 hover:shadow-xl transition-all text-pink-500">
              <Instagram className="w-8 h-8" />
              <span className="font-bold text-slate-900 dark:text-white">Instagram</span>
            </motion.a>
          </div>
        </div>

        {/* Appointment Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl"><Calendar className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold font-serif">Request Appointment</h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 outline-none focus:border-blue-500 transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 outline-none focus:border-blue-500 transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 outline-none focus:border-blue-500 transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Message or Symptoms</label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 outline-none focus:border-blue-500 transition-colors resize-none"
                placeholder="How can I help you?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Send Request
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}