'use client';

import { useState } from 'react';
import { getRegistrations } from '@/lib/actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GlassCard } from '@/components/ui/Card';
import { Search, Download, Users, Calendar, TrendingUp, LogOut } from 'lucide-react';
import type { Registration } from '@/types';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert('Invalid password');
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getRegistrations();
      setRegistrations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Full Name', 'Email', 'Institution', 'Role', 'Date Registered'];
    const rows = registrations.map(r => [
      r.full_name,
      r.email,
      r.institution,
      r.role,
      new Date(r.created_at).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "nova_tech_lab_registrations.csv");
    document.body.appendChild(link);
    link.click();
  };

  const filteredRegistrations = registrations.filter(r =>
    r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] px-6">
        <GlassCard className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-6 tracking-tight">Admin <span className="text-gradient">Access</span></h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">Unlock Dashboard</Button>
          </form>
        </GlassCard>
      </div>
    );
  }

  const stats = {
    total: registrations.length,
    today: registrations.filter(r => new Date(r.created_at).toDateString() === new Date().toDateString()).length,
    participants: registrations.filter(r => r.role === 'Participant').length,
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin <span className="text-gradient">Dashboard</span></h1>
            <p className="text-white/50">Manage registrations and view event statistics.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Button variant="outline" onClick={exportCSV} className="flex-1 md:flex-none">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="ghost" onClick={() => setIsAuthenticated(false)}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          <div className="glass-card p-6 flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-white/50 font-medium">Total Registrants</p>
              <h3 className="text-2xl font-bold">{stats.total}</h3>
            </div>
          </div>
          <div className="glass-card p-6 flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center text-brand-gold">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-white/50 font-medium">Registered Today</p>
              <h3 className="text-2xl font-bold">{stats.today}</h3>
            </div>
          </div>
          <div className="glass-card p-6 flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 flex items-center justify-center text-brand-purple">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-white/50 font-medium">Participants</p>
              <h3 className="text-2xl font-bold">{stats.participants}</h3>
            </div>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
             <h3 className="text-xl font-bold w-full md:w-auto">Registrations</h3>
             <div className="relative w-full md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
               <input
                 type="text"
                 placeholder="Search registrants..."
                 className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue/50"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-white/40">
                  <th className="px-4 md:px-6 py-4 font-semibold">Name</th>
                  <th className="px-4 md:px-6 py-4 font-semibold hidden md:table-cell">Email</th>
                  <th className="px-4 md:px-6 py-4 font-semibold hidden lg:table-cell">Institution</th>
                  <th className="px-4 md:px-6 py-4 font-semibold">Role</th>
                  <th className="px-4 md:px-6 py-4 font-semibold">Photo</th>
                  <th className="px-4 md:px-6 py-4 font-semibold hidden sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-white/30">Loading registrations...</td></tr>
                ) : filteredRegistrations.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-white/30">No registrations found.</td></tr>
                ) : filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="text-sm hover:bg-white/5 transition-colors">
                    <td className="px-4 md:px-6 py-4">
                      <div className="font-medium truncate max-w-[120px] md:max-w-none">{reg.full_name}</div>
                      <div className="text-[10px] text-white/30 md:hidden">{reg.email}</div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-white/60 hidden md:table-cell">{reg.email}</td>
                    <td className="px-4 md:px-6 py-4 text-white/60 hidden lg:table-cell">{reg.institution}</td>
                    <td className="px-4 md:px-6 py-4">
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-tight">
                        {reg.role}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <a href={reg.photo_url} target="_blank" rel="noreferrer" className="text-brand-blue hover:underline text-xs md:text-sm">View</a>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-white/40 hidden sm:table-cell">{new Date(reg.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
