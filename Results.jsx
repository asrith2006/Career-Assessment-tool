import React from 'react';
import { useParams, Link } from 'react-router-dom';

const sampleResults = {
  a1: {
    id: 'a1',
    title: 'Career Interest Inventory',
    completedOn: '15/9/2025',
    percentile: 85,
    percentileLabel: '78th percentile',
    strengths: ['Technology', 'Problem Solving', 'Analytical Thinking'],
    improve: ['Public Speaking', 'Team Collaboration']
  },
  a2: {
    id: 'a2',
    title: 'Personality Type Assessment',
    completedOn: '20/9/2025',
    percentile: 78,
    percentileLabel: '65th percentile',
    strengths: ['Logical Decision Making', 'Structured Approach'],
    improve: ['Flexibility', 'Emotional Expression']
  }
};

export default function Results() {
  const { id } = useParams();

  if (id) {
    const r = sampleResults[id];
    if (!r) return <div style={{ padding: 20 }}>Result not found.</div>;
    return (
      <div style={{ padding: 20, maxWidth: 1100, margin: '0 auto' }}>
        <Link to="/results" style={{ display: 'inline-block', marginBottom: 16 }}>← Back to results</Link>
        <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ margin: 0 }}>{r.title}</h3>
              <div style={{ color: '#6B7280', marginBottom: 16 }}>Completed on {r.completedOn}</div>

              <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ color: '#16A34A' }}>🏆</div>
                <div style={{ fontWeight: 600 }}>Strengths</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                {r.strengths.map(s => (
                  <div key={s} style={{ background: '#F3F4F6', padding: '6px 10px', borderRadius: 12 }}>{s}</div>
                ))}
              </div>

              <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ color: '#F97316' }}>📈</div>
                <div style={{ fontWeight: 600 }}>Areas to Improve</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {r.improve.map(s => (
                  <div key={s} style={{ background: '#F3F4F6', padding: '6px 10px', borderRadius: 12 }}>{s}</div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 40, color: '#6D28D9', fontWeight: 600 }}>{r.percentile}%</div>
              <div style={{ color: '#9CA3AF' }}>{r.percentileLabel}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const results = Object.values(sampleResults);

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: '0 auto' }}>
      <h2 style={{ marginTop: 0 }}>Assessment Results</h2>
      <p style={{ color: '#6B7280' }}>Review your past assessment results and strengths.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 12 }}>
        {results.map(r => (
          <div key={r.id} style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{r.title}</div>
                <div style={{ color: '#6B7280' }}>Completed on {r.completedOn}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 28, color: '#6D28D9', fontWeight: 600 }}>{r.percentile}%</div>
                <div style={{ color: '#9CA3AF' }}>{r.percentileLabel}</div>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                <div style={{ color: '#16A34A' }}>🏆</div>
                <div style={{ fontWeight: 600 }}>Strengths</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                {r.strengths.map(s => <div key={s} style={{ background: '#F3F4F6', padding: '6px 10px', borderRadius: 12 }}>{s}</div>)}
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                <div style={{ color: '#F97316' }}>📈</div>
                <div style={{ fontWeight: 600 }}>Areas to Improve</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {r.improve.map(s => <div key={s} style={{ background: '#F3F4F6', padding: '6px 10px', borderRadius: 12 }}>{s}</div>)}
              </div>

              <div style={{ marginTop: 12 }}>
                <Link to={`/results/${r.id}`} style={{ textDecoration: 'none', color: '#111827', border: '1px solid #E5E7EB', padding: '8px 12px', borderRadius: 8 }}>View details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
