import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Droplets, Search, Filter, Trash2, ChevronDown, ArrowLeft, Users, UserPlus, TrendingUp, Clock, X, Mail, Phone, Calendar, MessageSquare, Tag } from 'lucide-react'
import { getLeads, updateLeadStatus, deleteLead } from '../store/leads'

const statusConfig = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700 ring-blue-200' },
  contacted: { label: 'Contacted', color: 'bg-amber-100 text-amber-700 ring-amber-200' },
  converted: { label: 'Converted', color: 'bg-emerald-100 text-emerald-700 ring-emerald-200' },
  lost: { label: 'Lost', color: 'bg-slate-100 text-slate-500 ring-slate-200' },
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="font-display font-extrabold text-2xl text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5 font-medium">{label}</div>
    </div>
  )
}

function LeadDetail({ lead, onClose, onStatusChange, onDelete }) {
  if (!lead) return null
  const status = statusConfig[lead.status]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        <div className="h-1.5 bg-gradient-to-r from-ocean-400 via-ocean-500 to-aqua-400" />
        <div className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900">{lead.name}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset mt-1.5 ${status.color}`}>
                {status.label}
              </span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="space-y-3 mb-6">
            {[
              { icon: Mail, label: lead.email },
              { icon: Phone, label: lead.phone || 'No phone provided' },
              { icon: Tag, label: lead.service },
              { icon: Calendar, label: new Date(lead.date).toLocaleString() },
            ].map(({ icon: I, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-slate-600">
                <I className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {lead.message && (
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                <MessageSquare className="w-3.5 h-3.5" /> Message
              </div>
              <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-4 leading-relaxed">{lead.message}</p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-500">Status:</label>
            <select
              value={lead.status}
              onChange={e => onStatusChange(lead.id, e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ocean-400/40 bg-white cursor-pointer"
            >
              {Object.entries(statusConfig).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            <div className="flex-1" />
            <button onClick={() => { onDelete(lead.id); onClose() }}
              className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition cursor-pointer">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState(getLeads)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedLead, setSelectedLead] = useState(null)

  const filtered = useMemo(() => {
    return leads.filter(l => {
      const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase()) || l.service.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === 'all' || l.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [leads, search, statusFilter])

  const stats = useMemo(() => {
    const today = new Date().toDateString()
    return {
      total: leads.length,
      newToday: leads.filter(l => l.status === 'new' && new Date(l.date).toDateString() === today).length,
      converted: leads.filter(l => l.status === 'converted').length,
      rate: leads.length ? Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100) : 0,
    }
  }, [leads])

  const handleStatusChange = (id, status) => {
    const updated = updateLeadStatus(id, status)
    setLeads(updated)
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status })
  }

  const handleDelete = (id) => {
    const updated = deleteLead(id)
    setLeads(updated)
  }

  return (
    <div className="min-h-screen bg-slate-50/80 overflow-x-hidden">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 text-slate-400 hover:text-ocean-600 transition text-sm font-medium shrink-0">
              <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back to Site</span><span className="sm:hidden">Back</span>
            </Link>
            <div className="w-px h-6 bg-slate-200 shrink-0" />
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-ocean-500 to-ocean-700 flex items-center justify-center shrink-0">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-slate-900 text-sm truncate">Lead Manager</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-full bg-ocean-100 flex items-center justify-center">
              <span className="text-xs font-bold text-ocean-700">WE</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatCard icon={Users} label="Total Leads" value={stats.total} accent="bg-ocean-100 text-ocean-600" />
          <StatCard icon={UserPlus} label="New Today" value={stats.newToday} accent="bg-blue-100 text-blue-600" />
          <StatCard icon={TrendingUp} label="Converted" value={stats.converted} accent="bg-emerald-100 text-emerald-600" />
          <StatCard icon={Clock} label="Conversion Rate" value={`${stats.rate}%`} accent="bg-amber-100 text-amber-600" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              placeholder="Search by name, email, or service..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-400/40 focus:border-ocean-400 transition bg-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ocean-400/40 bg-white appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              {Object.entries(statusConfig).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Leads table */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-3 sm:px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Name</th>
                  <th className="text-left px-3 sm:px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden md:table-cell">Service</th>
                  <th className="text-left px-3 sm:px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden lg:table-cell">Email</th>
                  <th className="text-left px-3 sm:px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Status</th>
                  <th className="text-left px-3 sm:px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden sm:table-cell">Date</th>
                  <th className="px-3 sm:px-5 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-slate-400">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="font-medium">No leads found</p>
                      <p className="text-xs mt-1">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : filtered.map(lead => {
                  const status = statusConfig[lead.status]
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="border-b border-slate-50 hover:bg-ocean-50/30 cursor-pointer transition-colors"
                    >
                      <td className="px-3 sm:px-5 py-3.5">
                        <div className="font-semibold text-slate-900">{lead.name}</div>
                        <div className="text-xs text-slate-400 md:hidden mt-0.5">{lead.service}</div>
                      </td>
                      <td className="px-3 sm:px-5 py-3.5 text-slate-600 hidden md:table-cell">{lead.service}</td>
                      <td className="px-3 sm:px-5 py-3.5 text-slate-500 hidden lg:table-cell">{lead.email}</td>
                      <td className="px-3 sm:px-5 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-3 sm:px-5 py-3.5 text-slate-400 text-xs hidden sm:table-cell">
                        {new Date(lead.date).toLocaleDateString()}
                      </td>
                      <td className="px-3 sm:px-5 py-3.5">
                        <button
                          onClick={e => { e.stopPropagation(); handleDelete(lead.id) }}
                          className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="px-3 sm:px-5 py-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between flex-wrap gap-1">
            <span>Showing {filtered.length} of {leads.length} leads</span>
            <span className="text-ocean-500 font-medium hidden sm:inline">WITS Enterprise Admin</span>
          </div>
        </div>
      </main>

      {/* Lead detail modal */}
      {selectedLead && (
        <LeadDetail
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
