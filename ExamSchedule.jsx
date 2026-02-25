import React from 'react';
import { Link } from 'react-router-dom';

export default function ExamSchedule() {
  const styles = {
    container: { padding: '20px', maxWidth: '1100px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    logo: { display: 'flex', alignItems: 'center', gap: '12px' },
    logoIcon: { backgroundColor: '#6366F1', width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' },
    nav: { backgroundColor: '#F3F4F6', padding: '10px 16px', borderRadius: 50, display: 'flex', gap: 16, marginBottom: 24 },
    navItem: { padding: '8px 14px', borderRadius: 20, color: '#4B5563', textDecoration: 'none' },
    navItemActive: { backgroundColor: '#fff', color: '#111827' },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', marginBottom: 16 },
    left: { display: 'flex', alignItems: 'center', gap: 16 },
    icon: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    meta: { color: '#6B7280' },
    tag: { marginTop: 8, display: 'inline-block', backgroundColor: '#0F172A', color: '#fff', padding: '6px 10px', borderRadius: 8, fontSize: 12 },
    right: { textAlign: 'right', color: '#6B7280' },
  };

  const exams = [
    { id: 'e1', title: 'Career Interest Inventory', date: 'Wednesday, October 15, 2025', time: '10:00 AM', duration: '30 minutes', status: 'Upcoming' },
    { id: 'e2', title: 'Personality Type Assessment', date: 'Monday, October 20, 2025', time: '2:00 PM', duration: '25 minutes', status: 'Upcoming' },
    { id: 'e3', title: 'Skills Evaluation Test', date: 'Wednesday, October 8, 2025', time: '11:00 AM', duration: '40 minutes', status: 'Completed' },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>📚</div>
          <div>
            <h2 style={{ margin: 0 }}>Student Portal</h2>
            <div style={{ color: '#6B7280' }}>Welcome, Alice Johnson</div>
          </div>
        </div>
        <div>
          <Link to="/" style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E5E7EB', textDecoration: 'none', color: '#111827' }}>Back</Link>
        </div>
      </header>

      <nav style={styles.nav}>
        <Link to="/" style={{...styles.navItem, ...styles.navItemActive}}>My Courses</Link>
        <span style={{...styles.navItem, ...styles.navItemActive}}>Exam Schedule</span>
        <Link to="/" style={styles.navItem}>Results</Link>
        <Link to="/" style={styles.navItem}>Career Paths</Link>
      </nav>

      <div>
        {exams.map(ex => (
          <div key={ex.id} style={styles.card}>
            <div style={styles.left}>
              <div style={styles.icon}>📅</div>
              <div>
                <div style={{ fontWeight: 600 }}>{ex.title}</div>
                <div style={styles.meta}>
                  <span>📅 {ex.date}</span>
                  <span style={{ marginLeft: 12 }}>⏰ {ex.time}</span>
                </div>
                <div style={styles.tag}>{ex.status}</div>
              </div>
            </div>
            <div style={styles.right}>
              <div style={{ color: '#9CA3AF' }}>Duration</div>
              <div style={{ fontWeight: 600 }}>{ex.duration}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
