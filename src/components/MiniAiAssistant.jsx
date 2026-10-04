import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, HelpCircle } from 'lucide-react';

const AI_KNOWLEDGE = [
  {
    keywords: ['permission', 'doctor', 'nurse', 'admin', 'role', 'access', 'rbac'],
    answer: '👨‍⚕️ Doctor: Can enter encounters, view records, edit patients, and see analytics.\n👩‍⚕️ Nurse: Focused on rapid encounter data entry and patient viewing.\n🛡️ Admin: User management, status toggles, and security audit trail logs.'
  },
  {
    keywords: ['privacy', 'anonymize', 'anonymized', 'pii', 'security', 'protect', 'encrypt'],
    answer: '🔒 Patient privacy is protected by stripping all PII (names, SSNs, phone numbers). Patients are assigned synthetic IDs (e.g. P-2587) paired with demographic ranges (Age Group: 25-45, Gender: Female).'
  },
  {
    keywords: ['encounter', 'entry', 'add', 'log', 'symptoms', 'diagnosis'],
    answer: '🩺 To log a new encounter:\n1. Click "New Encounter" in the sidebar.\n2. Enter the Patient ID, select Age Group and Gender.\n3. Fill in Symptoms, Diagnosis, and Treatment details.\n4. Click "Save Encounter". SQLite will update in real time!'
  },
  {
    keywords: ['analytics', 'trend', 'chart', 'disease', 'graph'],
    answer: '📊 Dashboard charts run live SQL queries (`COUNT()` & `GROUP BY diagnosis`) on SQLite `encounters` to display real-time illness trends, age distributions, and gender ratios.'
  },
  {
    keywords: ['theme', 'dark', 'light', 'setting'],
    answer: '🎨 You can toggle Dark/Light Theme and clinic node preferences under "Settings" in the sidebar menu!'
  }
];

export const MiniAiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am HealthTech Mini AI 🤖. Ask me anything about app features, patient anonymization, or role permissions!'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // Append user message
    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');

    // Generate AI response based on keyword matching
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matchedAnswer = null;

      for (const item of AI_KNOWLEDGE) {
        if (item.keywords.some(k => lower.includes(k))) {
          matchedAnswer = item.answer;
          break;
        }
      }

      const aiMsg = {
        sender: 'ai',
        text: matchedAnswer || `I am trained on HealthTech features! You can ask about:
- Doctor vs Nurse role permissions
- How patient data anonymization works
- How to log new encounters
- Dark theme & clinic settings`
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 400);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0066ff',
          color: '#ffffff',
          border: 'none',
          borderRadius: '9999px',
          padding: '0.85rem 1.35rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontWeight: '700',
          fontSize: '0.9rem',
          boxShadow: '0 10px 25px rgba(0, 102, 255, 0.4)',
          cursor: 'pointer',
          zIndex: 90,
          transition: 'transform 0.2s ease'
        }}
        className="ai-widget-btn"
      >
        <Sparkles size={20} />
        <span>Mini AI Assistant</span>
      </button>

      {/* Slide-Out Chat Drawer */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '24px',
            width: '380px',
            maxHeight: '520px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: '16px',
            boxShadow: '0 20px 30px rgba(0,0,0,0.2)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 95,
            overflow: 'hidden',
            animation: 'modalFadeIn 0.25s ease-out'
          }}
        >
          {/* Header */}
          <div style={{ backgroundColor: '#0f1c30', color: '#ffffff', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} color="#fff" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>HealthTech Mini AI</h4>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Feature & System Guide</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          {/* Chat History */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem', backgroundColor: 'var(--bg-main)' }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                {m.sender === 'ai' && (
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#0066ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Bot size={14} />
                  </div>
                )}
                <div
                  style={{
                    backgroundColor: m.sender === 'user' ? '#0066ff' : 'var(--bg-card)',
                    color: m.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '12px',
                    fontSize: '0.825rem',
                    whiteSpace: 'pre-line',
                    boxShadow: 'var(--shadow-sm)',
                    border: m.sender === 'ai' ? '1px solid var(--border-color)' : 'none'
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompt Chips */}
          <div style={{ padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.35rem', overflowX: 'auto' }}>
            <button
              onClick={() => handleSend('What are Doctor vs Nurse permissions?')}
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem', borderRadius: '9999px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer', whiteSpace: 'nowrap', color: 'var(--primary)' }}
            >
              🔑 Roles
            </button>
            <button
              onClick={() => handleSend('How is patient data anonymized?')}
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem', borderRadius: '9999px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer', whiteSpace: 'nowrap', color: 'var(--primary)' }}
            >
              🔒 Privacy
            </button>
            <button
              onClick={() => handleSend('How do I log a new encounter?')}
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem', borderRadius: '9999px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer', whiteSpace: 'nowrap', color: 'var(--primary)' }}
            >
              🩺 Encounter
            </button>
          </div>

          {/* Input Box */}
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-card)', display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Ask Mini AI about features..."
              style={{ fontSize: '0.825rem', padding: '0.5rem 0.75rem' }}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              className="btn btn-primary"
              onClick={() => handleSend()}
              style={{ padding: '0.5rem 0.85rem' }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
