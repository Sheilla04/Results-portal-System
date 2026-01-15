import { useEffect, useState } from 'react';
import '../components/StudentDashboard.css';
import { GPATrendChart, GradeDistributionChart } from '../components/Charts';
import studentAPI from '../api/student';

function StudentDashboard() {
  const [loading, setLoading] = useState(true);

  const [studentInfo, setStudentInfo] = useState(null);
  const [courses, setCourses] = useState([]);
  const [gpaTrendData, setGpaTrendData] = useState([]);
  const [gradeDistributionData, setGradeDistributionData] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await studentAPI.getDashboard();
        const { student, currentSemester, results, stats, gpaTrend } = res.data;

        setStudentInfo({
          name: `${student.User.firstName} ${student.User.lastName}`,
          id: student.studentId,
          academicYear: student.academicYear,
          semester: currentSemester.semester,
          program: student.program,
          department: student.department,
          cgpa: Number(student.cgpa),
          currentGPA: stats.currentGPA
        });

        setCourses(results || []);
        setStats(stats);
        setGpaTrendData(gpaTrend || []);

        // derive grade distribution
        const dist = {};
        (results || []).forEach(r => {
          if (r.grade) dist[r.grade] = (dist[r.grade] || 0) + 1;
        });

        setGradeDistributionData(
          Object.entries(dist).map(([grade, count]) => ({ grade, count }))
        );

      } catch (err) {
        console.error('Failed to load dashboard', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A-') return '#198754';
    if (grade === 'B+' || grade === 'B') return '#0dcaf0';
    if (grade === 'B-' || grade === 'C+' || grade === 'C') return '#ffc107';
    return '#dc3545';
  };

  const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0);

  const semesterGPA = (() => {
    const map = {
      A: 4.0, 'A-': 3.7, 'B+': 3.3, B: 3.0,
      'B-': 2.7, 'C+': 2.3, C: 2.0,
      D: 1.0, F: 0.0
    };

    const points = courses.reduce(
      (sum, c) => sum + (map[c.grade] || 0) * (c.credits || 0),
      0
    );

    return totalCredits ? (points / totalCredits).toFixed(2) : '0.00';
  })();

  if (loading || !studentInfo || !stats) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-wrapper student-dashboard">
      <div className="dashboard-container">

        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <div className="header-icon">
                <img src="https://img.icons8.com/fluency/48/000000/student-male.png" alt="Student" />
              </div>
              <div className="header-text">
                <h1 className="dashboard-title">Student Dashboard</h1>
                <p className="dashboard-subtitle">
                  {studentInfo.name} • {studentInfo.id} • {studentInfo.program}
                </p>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={studentAPI.downloadTranscript}>
                <img src="https://img.icons8.com/ios-filled/20/0066cc/download.png" alt="" />
                Download Transcript
              </button>
              <button className="btn btn-primary">
                <img src="https://img.icons8.com/ios-filled/20/ffffff/print.png" alt="" />
                Print Results
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">

          <div className="stat-card stat-primary">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-label">Current GPA</div>
                <div className="stat-value">{stats.currentGPA}</div>
              </div>
            </div>
          </div>

          <div className="stat-card stat-success">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-label">Cumulative GPA</div>
                <div className="stat-value">{stats.cgpa}</div>
                <div className="stat-description">Overall performance</div>
              </div>
            </div>
          </div>

          <div className="stat-card stat-info">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-label">Courses This Semester</div>
                <div className="stat-value">{stats.totalCourses}</div>
                <div className="stat-description">{totalCredits} credit hours</div>
              </div>
            </div>
          </div>

          <div className="stat-card stat-warning">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-label">Results Status</div>
                <div className="stat-value">
                  {stats.completedCourses}/{stats.totalCourses}
                </div>
                <div className="stat-badge success">All Published</div>
              </div>
            </div>
          </div>

        </div>

        {/* Charts */}
        <div className="charts-section">
          <div className="chart-container chart-large">
            <GPATrendChart data={gpaTrendData} />
          </div>
          <div className="chart-container chart-small">
            <GradeDistributionChart data={gradeDistributionData} />
          </div>
        </div>

        {/* Results Table */}
        <div className="table-container">
          <div className="table-wrapper">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>
                      No results published yet
                    </td>
                  </tr>
                ) : (
                  courses.map(course => (
                    <tr key={course.id}>
                      <td>{course.courseCode}</td>
                      <td>{course.courseName}</td>
                      <td>{course.credits}</td>
                      <td>{course.score}%</td>
                      <td>
                        <span
                          className="grade-badge"
                          style={{ backgroundColor: getGradeColor(course.grade) }}
                        >
                          {course.grade}
                        </span>
                      </td>
                      <td>{course.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span>
              Showing {courses.length} courses • Semester GPA:
              <strong> {semesterGPA}</strong>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;
