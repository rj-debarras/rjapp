import { useState, useMemo, useEffect } from 'react';
import { 
  Users, BarChart3, Package, Search, 
  TrendingUp, AlertCircle, CheckCircle, 
  Lock, Loader2, ArrowRight, Trash2, History, List
} from 'lucide-react';

type DashboardTab = 'leads' | 'logs';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('leads');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [leads, setLeads] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Persistence: Check for session on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('admin_auth');
    const timestamp = sessionStorage.getItem('admin_auth_timestamp');
    
    if (saved && timestamp) {
      const now = Date.now();
      const age = now - parseInt(timestamp, 10);
      const dayInMs = 24 * 60 * 60 * 1000;

      if (age < dayInMs) {
        setPassword(saved);
      } else {
        // Session expired
        sessionStorage.removeItem('admin_auth');
        sessionStorage.removeItem('admin_auth_timestamp');
      }
    }
  }, []);

  // Separate effect to handle auto-login if password is set from sessionStorage
  useEffect(() => {
    if (!isAuthorized && password && sessionStorage.getItem('admin_auth') === password) {
      handleLogin(null as any);
    }
  }, [password]);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/leads', { headers: { 'Authorization': password } });
      if (res.ok) {
        setIsAuthorized(true);
        sessionStorage.setItem('admin_auth', password);
        sessionStorage.setItem('admin_auth_timestamp', Date.now().toString());
        const data = await res.json();
        setLeads(data.results || []);
        // Also fetch logs
        const logsRes = await fetch('/api/admin/logs', { headers: { 'Authorization': password } });
        if (logsRes.ok) { const ld = await logsRes.json(); setLogs(ld.results || []); }
      } else {
        setError('Mot de passe incorrect');
        sessionStorage.removeItem('admin_auth');
        sessionStorage.removeItem('admin_auth_timestamp');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    sessionStorage.removeItem('admin_auth_timestamp');
    setIsAuthorized(false);
    setPassword('');
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Authorization': password,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
        refreshData(); // Refresh logs
      }
    } catch (err) {
      console.error('Status update error', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    const auth = password;
    try {
      // Fetch Leads
      const leadsRes = await fetch('/api/admin/leads', { headers: { 'Authorization': auth } });
      if (leadsRes.ok) {
        const data = await leadsRes.json();
        setLeads(data.results || []);
      }
      // Fetch Logs
      const logsRes = await fetch('/api/admin/logs', { headers: { 'Authorization': auth } });
      if (logsRes.ok) {
        const data = await logsRes.json();
        setLogs(data.results || []);
      }
    } catch (err) {
      console.error('Data refresh error', err);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch on tab change if authorized
  useEffect(() => {
    if (isAuthorized) refreshData();
  }, [activeTab, isAuthorized]);

  const handleDeleteLead = async (id: number) => {
    const auth = password;
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': auth }
      });
      if (res.ok) {
        setLeads(prev => prev.filter(l => l.id !== id));
        setDeletingId(null);
        refreshData(); // Refresh logs to show deletion
      }
    } catch (err) {
      console.error('Delete error', err);
    }
  };

  const stats = useMemo(() => {
    const total = leads.length;
    const totalVolume = leads.reduce((acc, curr) => acc + (curr.estimated_volume_m2 || 0), 0);
    const newLeads = leads.filter(l => l.status === 'New').length;
    const completed = leads.filter(l => l.status === 'Done').length;
    
    const distribution: Record<string, number> = {};
    leads.forEach(l => {
      distribution[l.property_type] = (distribution[l.property_type] || 0) + 1;
    });

    return { total, totalVolume, newLeads, completed, distribution };
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter(l => 
      l.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.client_phone.includes(searchTerm) ||
      l.tracking_code?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [leads, searchTerm]);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.includes(searchTerm)
    );
  }, [logs, searchTerm]);

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-6">
        <div className="max-w-md w-full bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-ambient border border-surface-container-low text-center">
          <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold text-primary mb-2">Accès Administration</h1>
          <p className="text-outline mb-8 text-sm">Veuillez entrer le mot de passe maître.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Mot de passe"
              className="w-full bg-surface-container-low p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary/30 text-center"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-tertiary transition-all hover:shadow-lg flex items-center justify-center gap-2">
              Se connecter <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary flex items-center gap-3">
            <TrendingUp className="text-tertiary" />
            Tableau de Bord
          </h1>
          <p className="text-outline">JR Débarras - Gestion & Audit</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex p-1 bg-surface-container-low rounded-2xl">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'leads' ? 'bg-white text-primary shadow-sm' : 'text-outline hover:text-primary'}`}
            >
              <List className="w-4 h-4" /> Devis
            </button>
            <button 
              onClick={() => setActiveTab('logs')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'logs' ? 'bg-white text-primary shadow-sm' : 'text-outline hover:text-primary'}`}
            >
              <History className="w-4 h-4" /> Logs
            </button>
          </div>
          
          <button 
            onClick={handleLogout}
            className="p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-colors tooltip flex items-center gap-2 text-sm font-bold"
            title="Se déconnecter"
          >
            <Lock className="w-4 h-4" /> Quitter
          </button>
        </div>
      </div>

      {activeTab === 'leads' ? (
        <>
          {/* KPI Cards (Only for Leads view) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <KPIItem icon={<Users />} label="Total leads" value={stats.total} color="bg-blue-50 text-blue-600" />
            <KPIItem icon={<Package />} label="Volume total" value={`${stats.totalVolume} m³`} color="bg-orange-50 text-orange-600" />
            <KPIItem icon={<AlertCircle />} label="Nouveaux" value={stats.newLeads} color="bg-indigo-50 text-indigo-600" />
            <KPIItem icon={<CheckCircle />} label="Terminés" value={stats.completed} color="bg-emerald-50 text-emerald-600" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1 bg-white p-8 rounded-[2rem] shadow-ambient border border-surface-container-low">
              <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-tertiary" />
                Types de biens
              </h3>
              <div className="space-y-4">
                {Object.entries(stats.distribution).map(([type, count]: [string, any]) => (
                  <div key={type}>
                    <div className="flex justify-between text-sm mb-1">
                       <span className="font-medium text-primary">{type}</span>
                       <span className="font-bold text-outline">{count}</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${(count / stats.total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-ambient border border-surface-container-low overflow-hidden">
              <div className="p-6 border-b border-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <h3 className="font-bold text-primary">Dernières demandes</h3>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/50" />
                    <input 
                      type="text" 
                      placeholder="Rechercher..."
                      className="bg-surface-container-low py-2 pl-10 pr-4 rounded-xl text-sm outline-none w-full md:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-lowest text-xs font-bold text-outline uppercase tracking-widest border-b border-surface-container-low">
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Détails</th>
                      <th className="px-6 py-4">Code</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-low">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-surface-container-lowest transition-colors">
                        <td className="px-6 py-4">
                           <p className="font-bold text-primary">{lead.client_name}</p>
                           <p className="text-xs text-outline">{lead.client_phone}</p>
                        </td>
                        <td className="px-6 py-4 text-xs">
                           <p className="font-medium text-primary-900">{lead.property_type}</p>
                           <p className="text-outline">{lead.estimated_volume_m2} m³ • {lead.postal_code}</p>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm font-bold text-tertiary">
                          {lead.tracking_code?.toUpperCase()}
                        </td>
                        <td className="px-6 py-4">
                           <select 
                             value={lead.status}
                             onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                             className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider outline-none cursor-pointer border-none transition-all ${
                               lead.status === 'New' ? 'bg-indigo-100 text-indigo-700' : 
                               lead.status === 'Quoted' ? 'bg-amber-100 text-amber-700' :
                               lead.status === 'Done' ? 'bg-emerald-100 text-emerald-700' :
                               'bg-red-100 text-red-700'
                             }`}
                           >
                             <option value="New">Nouveau</option>
                             <option value="Quoted">Devis</option>
                             <option value="Done">Terminé</option>
                             <option value="Cancelled">Annulé</option>
                           </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {deletingId === lead.id ? (
                            <div className="flex items-center justify-end gap-2 animate-in slide-in-from-right-2">
                              <button onClick={() => setDeletingId(null)} className="text-xs font-bold text-outline hover:text-primary">Annuler</button>
                              <button onClick={() => handleDeleteLead(lead.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold">Confirmer</button>
                            </div>
                          ) : (
                            <button onClick={() => setDeletingId(lead.id)} className="p-2 text-outline hover:text-red-500 transition-colors">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Logs View */
        <div className="bg-white rounded-[2rem] shadow-ambient border border-surface-container-low overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 border-b border-surface-container-low flex items-center justify-between">
             <div>
               <h3 className="font-bold text-primary">Journal d'Audit Immobilier</h3>
               <p className="text-xs text-outline mt-1">Historique permanent et non-supprimable des actions du site.</p>
             </div>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/50" />
                <input 
                  type="text" 
                  placeholder="Filtrer les logs..."
                  className="bg-surface-container-low py-2 pl-10 pr-4 rounded-xl text-sm outline-none w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-lowest text-xs font-bold text-outline uppercase tracking-widest border-b border-surface-container-low">
                  <th className="px-6 py-4">Moment</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Détails</th>
                  <th className="px-6 py-4">IP / Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-6 py-4 text-xs font-medium text-primary">
                       {new Date(log.created_at).toLocaleString('fr-FR', { 
                         day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' 
                       })}
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                         log.action.includes('DELETE') ? 'bg-red-50 text-red-600' :
                         log.action.includes('SUBMIT') ? 'bg-emerald-50 text-emerald-600' :
                         'bg-surface-container-low text-outline'
                       }`}>
                         {log.action.replace('_', ' ')}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-outline font-medium">
                      {log.details}
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-tertiary">
                      {log.ip}
                      <p className="text-[8px] text-outline truncate max-w-[150px]">{log.user_agent}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {loading && (
        <div className="fixed bottom-10 right-10 bg-white p-4 rounded-2xl shadow-2xl border border-surface-container-low flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
           <Loader2 className="w-5 h-5 text-primary animate-spin" />
           <span className="text-sm font-bold text-primary">Actualisation...</span>
        </div>
      )}
    </div>
  );
}

function KPIItem({ icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-ambient border border-surface-container-low flex items-center gap-5 hover:scale-105 transition-all">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-outline uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-display font-bold text-primary tracking-tight">{value}</p>
      </div>
    </div>
  );
}
