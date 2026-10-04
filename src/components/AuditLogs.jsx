import React, { useState } from 'react';
import { ShieldCheck, Search, Filter } from 'lucide-react';
import { useData } from '../context/DataContext';

export const AuditLogs = () => {
  const { auditLogs } = useData();
  const [filterAction, setFilterAction] = useState('ALL');

  const filteredLogs = auditLogs.filter((log) => {
    if (filterAction === 'ALL') return true;
    return log.action === filterAction;
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Audit Logs & Security Trail</h1>
          <p>Compliance event history tracking system actions and user logins</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Filter size={16} color="#64748b" />
          <select
            className="form-control"
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            style={{ fontSize: '0.85rem' }}
          >
            <option value="ALL">All Event Types</option>
            <option value="ENCOUNTER_CREATED">ENCOUNTER_CREATED</option>
            <option value="PATIENT_UPDATED">PATIENT_UPDATED</option>
            <option value="LOGIN_SUCCESS">LOGIN_SUCCESS</option>
            <option value="USER_ROLE_CHANGED">USER_ROLE_CHANGED</option>
            <option value="SESSION_EXPIRED">SESSION_EXPIRED</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Log ID</th>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td style={{ fontWeight: '600', color: '#64748b', fontSize: '0.78rem' }}>{log.id}</td>
                <td style={{ fontSize: '0.825rem', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                <td style={{ fontWeight: '600' }}>{log.user}</td>
                <td>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: log.action.includes('CREATED')
                        ? '#d1fae5'
                        : log.action.includes('EXPIRED')
                        ? '#fee2e2'
                        : '#e6f0ff',
                      color: log.action.includes('CREATED')
                        ? '#065f46'
                        : log.action.includes('EXPIRED')
                        ? '#991b1b'
                        : '#1e40af',
                      fontFamily: 'monospace',
                      fontSize: '0.72rem'
                    }}
                  >
                    {log.action}
                  </span>
                </td>
                <td style={{ color: '#475569' }}>{log.details}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#64748b' }}>{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
