import React from 'react';
import { Users, FileText, Activity, Calendar, ArrowUpRight } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useData } from '../context/DataContext';



export const Dashboard = () => {
  const { metrics, casesByDiagnosis, totalCases, illnessTrends } = useData();

  const activeTrendsData = illnessTrends && illnessTrends.length > 0 ? illnessTrends : [
    { month: 'Apr', ViralFever: 1, Diabetes: 0, Hypertension: 0, Other: 0 },
    { month: 'May', ViralFever: 2, Diabetes: 1, Hypertension: 1, Other: 0 },
    { month: 'Jun', ViralFever: 2, Diabetes: 1, Hypertension: 1, Other: 0 },
    { month: 'Jul', ViralFever: 3, Diabetes: 1, Hypertension: 1, Other: 0 },
    { month: 'Aug', ViralFever: 4, Diabetes: 1, Hypertension: 1, Other: 0 },
    { month: 'Sep', ViralFever: 5, Diabetes: 1, Hypertension: 1, Other: 0 }
  ];

  const activePieData = casesByDiagnosis && casesByDiagnosis.length > 0 ? casesByDiagnosis : [
    { name: 'Viral Fever', value: 50, color: '#0066ff' },
    { name: 'Hypertension', value: 33, color: '#a855f7' },
    { name: 'Diabetes', value: 17, color: '#10b981' }
  ];

  const displayTotalCases = totalCases || metrics.totalEncounters || metrics.totalPatients;

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Dashboard</h1>
          <p>Overview of patient data and health trends</p>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Patients</span>
            <span className="stat-value">{(metrics?.totalPatients ?? 0).toLocaleString()}</span>
            <span className="stat-trend up">
              <ArrowUpRight size={14} /> Active Database Records
            </span>
          </div>
          <div className="stat-icon blue">
            <Users size={22} />
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Encounters</span>
            <span className="stat-value">{(metrics?.totalEncounters ?? 0).toLocaleString()}</span>
            <span className="stat-trend up">
              <ArrowUpRight size={14} /> Real-time Encounters
            </span>
          </div>
          <div className="stat-icon emerald">
            <FileText size={22} />
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-info">
            <span className="stat-label">Active Cases</span>
            <span className="stat-value">{(metrics?.activeCases ?? 0).toLocaleString()}</span>
            <span className="stat-trend up">
              <ArrowUpRight size={14} /> Last 30 Days
            </span>
          </div>
          <div className="stat-icon purple">
            <Activity size={22} />
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-info">
            <span className="stat-label">Today's Encounters</span>
            <span className="stat-value">{(metrics?.todayEncounters ?? 0).toLocaleString()}</span>
            <span className="stat-trend up">
              <ArrowUpRight size={14} /> Logged Today
            </span>
          </div>
          <div className="stat-icon amber">
            <Calendar size={22} />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        {/* Line Chart */}
        <div className="card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Common Illness Trends</h3>
              <span className="chart-subtitle">Monthly progression from SQLite</span>
            </div>
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <LineChart data={activeTrendsData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Line type="monotone" dataKey="ViralFever" name="Viral Fever" stroke="#0066ff" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Diabetes" name="Diabetes" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Hypertension" name="Hypertension" stroke="#a855f7" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Other" name="Other" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Pie Chart */}
        <div className="card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Cases by Diagnosis</h3>
              <span className="chart-subtitle">Live SQL Aggregation</span>
            </div>
          </div>
          <div style={{ width: '100%', height: 260, position: 'relative' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={activePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {activePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f1c30' }}>{displayTotalCases}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Total Cases</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
            {activePieData.map((item) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
                  <span style={{ color: '#475569', fontWeight: '500' }}>{item.name}</span>
                </div>
                <span style={{ fontWeight: '700', color: '#1e293b' }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
