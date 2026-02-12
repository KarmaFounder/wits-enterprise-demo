const STORAGE_KEY = 'wits_leads'

const demoLeads = [
  { id: 1, name: 'Thabo Mokoena', email: 'thabo@gmail.com', phone: '+27 71 234 5678', service: 'Borehole Pumps Installation', message: 'We need a borehole drilled and pump installed for our farm in Limpopo. About 120m depth expected.', status: 'new', date: '2026-02-12T08:30:00' },
  { id: 2, name: 'Sarah van der Merwe', email: 'sarah.vdm@outlook.com', phone: '+27 82 345 6789', service: 'Irrigation Installation', message: 'Looking for drip irrigation system for 5 hectare vegetable farm. Currently using flood irrigation.', status: 'contacted', date: '2026-02-11T14:20:00' },
  { id: 3, name: 'Sipho Ndlovu', email: 'sipho.n@yahoo.com', phone: '+27 63 456 7890', service: 'Rainwater Harvesting', message: 'Want to install rainwater tanks at our school. 3 buildings, need collection and storage system.', status: 'converted', date: '2026-02-10T09:15:00' },
  { id: 4, name: 'Fatima Abrahams', email: 'fatima.a@business.co.za', phone: '+27 74 567 8901', service: 'Filtration Systems', message: 'Our borehole water has high iron content. Need a filtration solution for household use, 6 people.', status: 'new', date: '2026-02-12T11:45:00' },
  { id: 5, name: 'Johan Pretorius', email: 'johan.p@farmmail.co.za', phone: '+27 83 678 9012', service: 'Dual Powered Borehole Pumps', message: 'Interested in solar/electric hybrid pump. We have frequent load shedding and need reliable water.', status: 'contacted', date: '2026-02-09T16:30:00' },
  { id: 6, name: 'Nomsa Dlamini', email: 'nomsa.d@gmail.com', phone: '+27 61 789 0123', service: 'Drainage Pumps', message: 'Basement flooding during heavy rains. Need drainage pump installed urgently in Johannesburg South.', status: 'new', date: '2026-02-12T07:00:00' },
  { id: 7, name: 'David Botha', email: 'dbotha@construction.co.za', phone: '+27 72 890 1234', service: 'Borehole Survey & Drilling', message: 'New housing development in Midrand. Need borehole survey for 12 stands. What are your rates?', status: 'lost', date: '2026-02-05T10:00:00' },
  { id: 8, name: 'Lerato Molefe', email: 'lerato.m@gmail.com', phone: '+27 84 901 2345', service: 'Irrigation Installation', message: 'Garden irrigation for large residential property. Lawn + flower beds + vegetable garden.', status: 'converted', date: '2026-02-08T13:00:00' },
  { id: 9, name: 'Ahmed Patel', email: 'ahmed.patel@factory.co.za', phone: '+27 65 012 3456', service: 'Filtration Systems', message: 'Industrial water filtration for food processing plant. Need to meet SANS standards.', status: 'contacted', date: '2026-02-11T08:45:00' },
  { id: 10, name: 'Zanele Khumalo', email: 'zanele.k@edu.za', phone: '+27 73 123 4567', service: 'Rainwater Harvesting', message: 'Community project in rural KZN. Want to harvest rainwater for 20 households. Looking for cost estimate.', status: 'new', date: '2026-02-12T10:20:00' },
]

export function getLeads() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return JSON.parse(stored)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(demoLeads))
  return demoLeads
}

export function saveLead(lead) {
  const leads = getLeads()
  const newLead = {
    id: Date.now(),
    ...lead,
    status: 'new',
    date: new Date().toISOString(),
  }
  leads.unshift(newLead)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
  return newLead
}

export function updateLeadStatus(id, status) {
  const leads = getLeads()
  const idx = leads.findIndex(l => l.id === id)
  if (idx !== -1) {
    leads[idx].status = status
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
  }
  return leads
}

export function deleteLead(id) {
  const leads = getLeads().filter(l => l.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
  return leads
}
