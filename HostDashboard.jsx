import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HostDashboard = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState('students'); // 'students' | 'mock' | 'results' | 'courses'
	const [selectedStudent, setSelectedStudent] = useState(null);

	const stats = {
		totalStudents: 3,
		courses: 5,
		assessments: 3,
		attendance: '68%'
	};

	const students = [
		{ id: 'S001', name: 'Alice Johnson', email: 'alice@student.com', enrolled: '3 courses', completed: '2 completed' },
		{ id: 'S002', name: 'Bob Smith', email: 'bob@student.com', enrolled: '2 courses', completed: '1 completed' },
		{ id: 'S003', name: 'Carol Davis', email: 'carol@student.com', enrolled: '2 courses', completed: '3 completed' },
	];

	// Mock test data (per student example)
	const mockTests = {
		S001: [
			{ id: 'm1', title: 'Mock Test 1', date: '2025-10-01', score: 78 },
			{ id: 'm2', title: 'Mock Test 2', date: '2025-10-15', score: 85 },
		],
		S002: [
			{ id: 'm1', title: 'Mock Test 1', date: '2025-10-01', score: 64 },
		],
		S003: [
			{ id: 'm1', title: 'Mock Test 1', date: '2025-10-01', score: 92 },
			{ id: 'm2', title: 'Mock Test 2', date: '2025-10-15', score: 88 },
			{ id: 'm3', title: 'Mock Test 3', date: '2025-10-25', score: 95 },
		]
	};

		const [courses, setCourses] = useState([
			{ id: 'C001', title: 'Introduction to Career Planning', duration: '4 weeks' },
			{ id: 'C002', title: 'Personality Development', duration: '6 weeks' },
			{ id: 'C003', title: 'Technical Skills Assessment', duration: '8 weeks' },
		]);

		// compute simple results summary from mockTests
		const computeStudentAverages = () => {
			return students.map(s => {
				const tests = mockTests[s.id] || [];
				const avg = tests.length ? Math.round(tests.reduce((a, b) => a + b.score, 0) / tests.length) : null;
				return { id: s.id, name: s.name, avg };
			});
		};

		const studentAverages = computeStudentAverages();

		const addCourse = () => {
			const title = prompt('Course title');
			if (!title) return;
			const duration = prompt('Duration (e.g. 6 weeks)') || 'N/A';
			const id = 'C' + String(Math.floor(Math.random() * 900 + 100));
			setCourses(prev => [...prev, { id, title, duration }]);
		};

		const editCourse = (c) => {
			const title = prompt('Edit course title', c.title);
			if (title == null) return;
			const duration = prompt('Edit duration', c.duration) || c.duration;
			setCourses(prev => prev.map(p => p.id === c.id ? { ...p, title, duration } : p));
		};

		const deleteCourse = (c) => {
			if (!confirm('Delete course "' + c.title + '"?')) return;
			setCourses(prev => prev.filter(p => p.id !== c.id));
		};

	const styles = {
		page: { padding: 20, fontFamily: 'Inter, system-ui, Arial, sans-serif', maxWidth: 1100, margin: '0 auto' },
		headerRow: { display: 'flex', gap: 16, marginBottom: 24 },
		statCard: { flex: 1, background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
		statTitle: { color: '#6B7280', fontSize: 13, marginBottom: 8 },
		statValue: { fontSize: 28, fontWeight: 700, color: '#111827' },
		tabs: { display: 'flex', gap: 12, marginBottom: 18 },
		tabBtn: (active) => ({ padding: '8px 14px', borderRadius: 999, background: active ? '#F8FAFC' : 'transparent', border: active ? '1px solid #E6E7EA' : '1px solid transparent', cursor: 'pointer' }),
		section: { background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
		table: { width: '100%', borderCollapse: 'collapse' },
		th: { textAlign: 'left', padding: '12px 8px', color: '#6B7280', fontSize: 13, borderBottom: '1px solid #EEF2F7' },
		td: { padding: '12px 8px', borderBottom: '1px solid #F3F4F6' },
		actionBtn: { padding: '8px 12px', borderRadius: 8, border: '1px solid #E6E7EA', background: '#fff', cursor: 'pointer' },
		topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
	};

	const openMockStatsForStudent = (student) => {
		setSelectedStudent(student);
		setActiveTab('mock');
	};

	return (
		<div style={styles.page}>
			<div style={styles.topBar}>
				<div>
					<h2 style={{ margin: 0 }}>Host Dashboard</h2>
					<div style={{ color: '#6B7280', marginTop: 6 }}>Overview of learners, courses and tests</div>
				</div>
				<div style={{ display: 'flex', gap: 8 }}>
					<button onClick={() => navigate('/')} style={styles.actionBtn}>Logout</button>
				</div>
			</div>

			<div style={styles.headerRow}>
				<div style={styles.statCard}>
					<div style={styles.statTitle}>Total Students</div>
					<div style={styles.statValue}>{stats.totalStudents}</div>
					<div style={{ color: '#9CA3AF', marginTop: 6 }}>Active learners</div>
				</div>
				<div style={styles.statCard}>
					<div style={styles.statTitle}>Courses</div>
					<div style={styles.statValue}>{stats.courses}</div>
					<div style={{ color: '#9CA3AF', marginTop: 6 }}>Available courses</div>
				</div>
				<div style={styles.statCard}>
					<div style={styles.statTitle}>Assessments</div>
					<div style={styles.statValue}>{stats.assessments}</div>
					<div style={{ color: '#9CA3AF', marginTop: 6 }}>Total tests</div>
				</div>
				<div style={styles.statCard}>
					<div style={styles.statTitle}>Attendance</div>
					<div style={styles.statValue}>{stats.attendance}</div>
					<div style={{ color: '#9CA3AF', marginTop: 6 }}>Average rate</div>
				</div>
			</div>

					<div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
				<div style={styles.tabs} role="tablist" aria-label="Host dashboard tabs">
					<button aria-selected={activeTab === 'students'} role="tab" onClick={() => { setActiveTab('students'); setSelectedStudent(null); }} style={styles.tabBtn(activeTab === 'students')}>Student Details</button>
					<button aria-selected={activeTab === 'mock'} role="tab" onClick={() => { setActiveTab('mock'); }} style={styles.tabBtn(activeTab === 'mock')}>Mock Test Stats</button>
					<button aria-selected={activeTab === 'results'} role="tab" onClick={() => setActiveTab('results')} style={styles.tabBtn(activeTab === 'results')}>Results & Performance</button>
					<button aria-selected={activeTab === 'courses'} role="tab" onClick={() => setActiveTab('courses')} style={styles.tabBtn(activeTab === 'courses')}>Course Management</button>
						</div>
						<div style={{ marginBottom: 18, display: 'flex', gap: 8 }}>
							<button style={styles.actionBtn} onClick={() => { setActiveTab('results'); setSelectedStudent(null); }}>Open Results & Performance</button>
							<button style={styles.actionBtn} onClick={() => { setActiveTab('courses'); }}>Open Course Management</button>
						</div>
			</div>

			{activeTab === 'students' && (
				<div style={styles.section}>
					<h3 style={{ marginTop: 0 }}>Student Information</h3>
					<div style={{ color: '#6B7280', marginBottom: 12 }}>View detailed information about enrolled students</div>

					<table style={styles.table}>
						<thead>
							<tr>
								<th style={styles.th}>Student ID</th>
								<th style={styles.th}>Name</th>
								<th style={styles.th}>Email</th>
								<th style={styles.th}>Enrolled Courses</th>
								<th style={styles.th}>Assessments Completed</th>
								<th style={styles.th}>Action</th>
							</tr>
						</thead>
						<tbody>
							{students.map(s => (
								<tr key={s.id}>
									<td style={styles.td}>{s.id}</td>
									<td style={styles.td}>{s.name}</td>
									<td style={styles.td}>{s.email}</td>
									<td style={styles.td}>{s.enrolled}</td>
									<td style={styles.td}><span style={{ background: '#0F172A', color: '#fff', padding: '6px 10px', borderRadius: 16 }}>{s.completed}</span></td>
									<td style={styles.td}><button style={styles.actionBtn} onClick={() => openMockStatsForStudent(s)}>Mock Test Stats</button></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{activeTab === 'mock' && (
				<div style={styles.section}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div>
							<h3 style={{ margin: 0 }}>Mock Test Statistics</h3>
							<div style={{ color: '#6B7280', marginTop: 6 }}>{selectedStudent ? `Showing mock tests for ${selectedStudent.name}` : 'Overview of mock test performance'}</div>
						</div>
						<div>
							<button style={styles.actionBtn} onClick={() => { setSelectedStudent(null); }}>Clear</button>
						</div>
					</div>

					<div style={{ marginTop: 12 }}>
						{selectedStudent ? (
							<table style={styles.table}>
								<thead>
									<tr>
										<th style={styles.th}>Test</th>
										<th style={styles.th}>Date</th>
										<th style={styles.th}>Score</th>
										<th style={styles.th}>Action</th>
									</tr>
								</thead>
								<tbody>
									{(mockTests[selectedStudent.id] || []).map(t => (
										<tr key={t.id}>
											<td style={styles.td}>{t.title}</td>
											<td style={styles.td}>{t.date}</td>
											<td style={styles.td}>{t.score}%</td>
											<td style={styles.td}><button style={styles.actionBtn} onClick={() => alert(`${selectedStudent.name} - ${t.title} score: ${t.score}%`)}>View</button></td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div>
								<p style={{ color: '#6B7280' }}>Select a student from Student Details or pick a test below.</p>
								<table style={styles.table}>
									<thead>
										<tr>
											<th style={styles.th}>Student</th>
											<th style={styles.th}>Latest Mock Test</th>
											<th style={styles.th}>Score</th>
											<th style={styles.th}>Action</th>
										</tr>
									</thead>
									<tbody>
										{students.map(s => {
											const latest = (mockTests[s.id] || [])[ (mockTests[s.id] || []).length - 1 ];
											return (
												<tr key={s.id}>
													<td style={styles.td}>{s.name}</td>
													<td style={styles.td}>{latest ? latest.title : '—'}</td>
													<td style={styles.td}>{latest ? `${latest.score}%` : '—'}</td>
													<td style={styles.td}><button style={styles.actionBtn} onClick={() => openMockStatsForStudent(s)}>Open</button></td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			)}

					{activeTab === 'results' && (
						<div style={styles.section}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<div>
									<h3 style={{ margin: 0 }}>Results & Performance</h3>
									<div style={{ color: '#6B7280', marginTop: 6 }}>{selectedStudent ? `Results for ${selectedStudent.name}` : 'Overall student results'}</div>
								</div>
								<div>
									<button style={styles.actionBtn} onClick={() => { setSelectedStudent(null); }}>Clear</button>
								</div>
							</div>

							<div style={{ marginTop: 12 }}>
								{selectedStudent ? (
									<div>
										<p style={{ color: '#6B7280' }}>Detailed results for {selectedStudent.name} are shown in Mock Test Stats.</p>
										<button style={styles.actionBtn} onClick={() => { setActiveTab('mock'); }}>Open Mock Tests</button>
									</div>
								) : (
									<div>
										<div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
											<div style={{ padding: 12, background: '#fff', borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
												<div style={{ color: '#6B7280', fontSize: 13 }}>Average Score</div>
												<div style={{ fontSize: 22, fontWeight: 700 }}>{Math.round(studentAverages.filter(s => s.avg !== null).reduce((a,b)=>a+(b.avg||0),0) / Math.max(1, studentAverages.filter(s => s.avg !== null).length))}%</div>
											</div>
											<div style={{ padding: 12, background: '#fff', borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
												<div style={{ color: '#6B7280', fontSize: 13 }}>Students with tests</div>
												<div style={{ fontSize: 22, fontWeight: 700 }}>{studentAverages.filter(s => s.avg !== null).length}</div>
											</div>
										</div>

										<table style={styles.table}>
											<thead>
												<tr>
													<th style={styles.th}>Student</th>
													<th style={styles.th}>Average</th>
													<th style={styles.th}>Action</th>
												</tr>
											</thead>
											<tbody>
												{studentAverages.map(s => (
													<tr key={s.id}>
														<td style={styles.td}>{s.name}</td>
														<td style={styles.td}>{s.avg !== null ? `${s.avg}%` : '—'}</td>
														<td style={styles.td}><button style={styles.actionBtn} onClick={() => { setSelectedStudent(students.find(x=>x.id===s.id)); setActiveTab('results'); alert(`${s.name} average: ${s.avg !== null ? s.avg + '%' : 'No tests'}`); }}>View Results</button></td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								)}
							</div>
						</div>
					)}

					{activeTab === 'courses' && (
						<div style={styles.section}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<div>
									<h3 style={{ margin: 0 }}>Course Management</h3>
									<div style={{ color: '#6B7280', marginTop: 6 }}>Manage available courses</div>
								</div>
								<div style={{ display: 'flex', gap: 8 }}>
									<button style={styles.actionBtn} onClick={() => addCourse()}>Add Course</button>
									<button style={styles.actionBtn} onClick={() => { setActiveTab('students'); }}>Back to Students</button>
								</div>
							</div>

							<div style={{ marginTop: 12 }}>
								<table style={styles.table}>
									<thead>
										<tr>
											<th style={styles.th}>Course ID</th>
											<th style={styles.th}>Title</th>
											<th style={styles.th}>Duration</th>
											<th style={styles.th}>Action</th>
										</tr>
									</thead>
									<tbody>
										{courses.map(c => (
											<tr key={c.id}>
												<td style={styles.td}>{c.id}</td>
												<td style={styles.td}>{c.title}</td>
												<td style={styles.td}>{c.duration}</td>
												<td style={styles.td}>
													<div style={{ display: 'flex', gap: 8 }}>
														<button style={styles.actionBtn} onClick={() => editCourse(c)}>Edit</button>
														<button style={styles.actionBtn} onClick={() => deleteCourse(c)}>Delete</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}
		</div>
	);
};

export default HostDashboard;
