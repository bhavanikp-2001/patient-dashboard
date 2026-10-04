import React from 'react';
import { Building2, Activity, Wifi, CheckCircle2, Clock } from 'lucide-react';

const OUTREACH_NODES = [
  { id: 'NODE-101', name: 'District Alpha Primary Health Center', region: 'Sector 4, Central', status: 'Online', lastSync: '1 min ago', encountersToday: 24 },
  { id: 'NODE-102', name: 'Mobile Telemedicine Bus Unit 1', region: 'Rural Route 9', status: 'Online', lastSync: '3 mins ago', encountersToday: 18 },
  { id: 'NODE-103', name: 'Sub-Center Beta Outreach Unit', region: 'East Sub-District', status: 'Syncing', lastSync: 'Just now', encountersToday: 12 },
  { id: 'NODE-104', name: 'District Gamma Remote Clinic', region: 'Hilly Frontier Zone', status: 'Online', lastSync: '10 mins ago', encountersToday: 8 }
];

export const ClinicNodes = () => {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Telemedicine Nodes & Regional Clinics</h1>
          <p>Real-time connectivity and status monitor across rural outreach centers</p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Node ID</th>
              <th>Facility Name</th>
              <th>Region</th>
              <th>Encounters Today</th>
              <th>Last Database Sync</th>
              <th>Connectivity</th>
            </tr>
          </thead>
          <tbody>
            {OUTREACH_NODES.map((node) => (
              <tr key={node.id}>
                <td style={{ fontWeight: '700', color: '#0066ff' }}>{node.id}</td>
                <td style={{ fontWeight: '600' }}>{node.name}</td>
                <td style={{ color: '#64748b' }}>{node.region}</td>
                <td style={{ fontWeight: '700' }}>{node.encountersToday}</td>
                <td style={{ fontSize: '0.825rem', color: '#64748b' }}>{node.lastSync}</td>
                <td>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: node.status === 'Online' ? '#d1fae5' : '#fef3c7',
                      color: node.status === 'Online' ? '#065f46' : '#b45309',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Wifi size={12} />
                    <span>{node.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
