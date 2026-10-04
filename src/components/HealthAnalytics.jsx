import React, { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const VIRAL_FEVER_DATA = [
  { month: 'Apr', cases: 120 },
  { month: 'May', cases: 135 },
  { month: 'Jun', cases: 110 },
  { month: 'Jul', cases: 125 },
  { month: 'Aug', cases: 150 },
  { month: 'Sep', cases: 165 }
];

const DIABETES_DATA = [
  { month: 'Apr', cases: 45 },
  { month: 'May', cases: 50 },
  { month: 'Jun', cases: 52 },
  { month: 'Jul', cases: 58 },
  { month: 'Aug', cases: 62 },
  { month: 'Sep', cases: 68 }
];

const AGE_DISTRIBUTION = [
  { name: '0-18', value: 18, color: '#3b82f6' },
  { name: '19-30', value: 20, color: '#10b981' },
  { name: '31-45', value: 34, color: '#f59e0b' },
  { name: '46-60', value: 16, color: '#ef4444' },
  { name: '60+', value: 12, color: '#a855f7' }
];

const GENDER_DISTRIBUTION = [
  { name: 'Male', value: 48, color: '#0066ff' },
  { name: 'Female', value: 52, color: '#ec4899' }
];

export const HealthAnalytics = () => {
  const [timeframe, setTimeframe] = useState('Last 6 Months');

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Health Trends Analytics</h1>
          <p>Epidemiological insights and demographic breakdowns</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ffffff', padding: '0.4rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <Calendar size={16} color="#0066ff" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'none', fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}
            >
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Year-to-Date">Year-to-Date (2025)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bar Charts Row */}
      <div className="charts-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '1.5rem' }}>
        <div className="card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Viral Fever Cases</h3>
              <span className="chart-subtitle">Monthly incidence rate</span>
            </div>
          </div>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={VIRAL_FEVER_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} domain={[0, 200]} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="cases" name="Viral Fever" fill="#0066ff" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Diabetes Cases</h3>
              <span className="chart-subtitle">Monthly chronic monitoring</span>
            </div>
          </div>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={DIABETES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} domain={[0, 150]} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="cases" name="Diabetes" fill="#10b981" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Demographic Distributions Row */}
      <div className="charts-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Age Group Donut */}
        <div className="card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Age Group Distribution</h3>
              <span className="chart-subtitle">Demographic prevalence</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ width: 180, height: 180, position: 'relative' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={AGE_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {AGE_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `${val}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, minWidth: '140px' }}>
              {AGE_DISTRIBUTION.map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.825rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }} />
                    <span style={{ color: '#475569' }}>{item.name}</span>
                  </div>
                  <span style={{ fontWeight: '700', color: '#1e293b' }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gender Donut */}
        <div className="card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Gender Distribution</h3>
              <span className="chart-subtitle">Patient cohort ratio</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ width: 180, height: 180, position: 'relative' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={GENDER_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {GENDER_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `${val}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1, minWidth: '140px' }}>
              {GENDER_DISTRIBUTION.map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
    </div>
  );
};
