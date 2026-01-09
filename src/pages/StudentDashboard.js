import '../components/StudentDashboard.css';
import { GPATrendChart, GradeDistributionChart } from '../components/Charts';

function StudentDashboard() {
  const studentInfo = {
    name: "John Doe",
    id: "2020/CS/001",
    academicYear: "2024/2025",
    semester: "Spring",
    program: "Computer Science",
    department: "Department of Computing",
    cgpa: 3.75,
    currentGPA: 3.82
  };

  const courses = [
    { code: "CSC 401", name: "Artificial Intelligence", grade: "A", credits: 3, status: "Approved", lecturer: "Dr. Smith", score: 92 },
    { code: "CSC 403", name: "Machine Learning", grade: "B+", credits: 3, status: "Approved", lecturer: "Prof. Johnson", score: 87 },
    { code: "CSC 405", name: "Computer Security", grade: "A-", credits: 3, status: "Approved", lecturer: "Dr. Williams", score: 90 },
    { code: "MTH 301", name: "Advanced Calculus", grade: "B", credits: 4, status: "Approved", lecturer: "Prof. Brown", score: 83 },
    { code: "ENG 201", name: "Technical Writing", grade: "A", credits: 2, status: "Approved", lecturer: "Dr. Davis", score: 94 }
  ];

  const gpaTrendData = [
    { semester: 'Fall 2022', gpa: 3.45 },
    { semester: 'Spring 2023', gpa: 3.52 },
    { semester: 'Fall 2023', gpa: 3.68 },
    { semester: 'Spring 2024', gpa: 3.75 },
    { semester: 'Fall 2024', gpa: 3.78 },
    { semester: 'Spring 2025', gpa: 3.82 }
  ];

  const gradeDistributionData = [
    { grade: 'A', count: 2 },
    { grade: 'A-', count: 1 },
    { grade: 'B+', count: 1 },
    { grade: 'B', count: 1 },
    { grade: 'C', count: 0 }
  ];

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A-') return '#198754';
    if (grade === 'B+' || grade === 'B') return '#0dcaf0';
    if (grade === 'B-' || grade === 'C+' || grade === 'C') return '#ffc107';
    return '#dc3545';
  };

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const totalPoints = courses.reduce((sum, course) => {
    const pointMap = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'D': 1.0, 'F': 0.0 };
    return sum + (pointMap[course.grade] || 0) * course.credits;
  }, 0);
  const semesterGPA = (totalPoints / totalCredits).toFixed(2);

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
                <p className="dashboard-subtitle">{studentInfo.name} • {studentInfo.id} • {studentInfo.program}</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary">
                <img src="https://img.icons8.com/ios-filled/20/0066cc/download.png" alt="Download" className="btn-icon" />
                Download Transcript
              </button>
              <button className="btn btn-primary">
                <img src="https://img.icons8.com/ios-filled/20/ffffff/print.png" alt="Print" className="btn-icon" />
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
                <div className="stat-value">{studentInfo.currentGPA}</div>
                <div className="stat-trend positive">
                  <img src="https://img.icons8.com/ios-filled/16/198754/up-arrow.png" alt="Up" />
                  +0.07 from last semester
                </div>
              </div>
              <div className="stat-icon-wrapper">
                <img src="https://img.icons8.com/fluency/40/0066cc/statistics.png" alt="GPA" />
              </div>
            </div>
          </div>

          <div className="stat-card stat-success">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-label">Cumulative GPA</div>
                <div className="stat-value">{studentInfo.cgpa}</div>
                <div className="stat-description">Overall performance</div>
              </div>
              <div className="stat-icon-wrapper">
                <img src="https://img.icons8.com/fluency/40/198754/trophy.png" alt="CGPA" />
              </div>
            </div>
          </div>

          <div className="stat-card stat-info">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-label">Courses This Semester</div>
                <div className="stat-value">{courses.length}</div>
                <div className="stat-description">{totalCredits} credit hours</div>
              </div>
              <div className="stat-icon-wrapper">
                <img src="https://img.icons8.com/fluency/40/0dcaf0/book.png" alt="Courses" />
              </div>
            </div>
          </div>

          <div className="stat-card stat-warning">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-label">Results Status</div>
                <div className="stat-value">{courses.length}/{courses.length}</div>
                <div className="stat-badge success">
                  <img src="https://img.icons8.com/ios-filled/14/198754/checked.png" alt="Check" />
                  All Published
                </div>
              </div>
              <div className="stat-icon-wrapper">
                <img src="https://img.icons8.com/fluency/40/ffc107/checked.png" alt="Status" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-container chart-large">
            <div className="chart-header">
              <div className="chart-title-group">
                <img src="https://img.icons8.com/fluency/24/0066cc/line-chart.png" alt="Chart" className="chart-icon" />
                <div>
                  <h3 className="chart-title">GPA Trend Over Time</h3>
                  <p className="chart-subtitle">Semester-by-semester performance</p>
                </div>
              </div>
              <button className="btn-icon-only">
                <img src="https://img.icons8.com/ios-filled/18/6c757d/download.png" alt="Export" />
              </button>
            </div>
            <div className="chart-body">
              <GPATrendChart data={gpaTrendData} />
            </div>
          </div>

          <div className="chart-container chart-small">
            <div className="chart-header">
              <div className="chart-title-group">
                <img src="https://img.icons8.com/fluency/24/0066cc/bar-chart.png" alt="Chart" className="chart-icon" />
                <div>
                  <h3 className="chart-title">Grade Distribution</h3>
                  <p className="chart-subtitle">Current semester grades</p>
                </div>
              </div>
            </div>
            <div className="chart-body">
              <GradeDistributionChart data={gradeDistributionData} />
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="table-container">
          <div className="table-header">
            <div className="table-title-group">
              <img src="https://img.icons8.com/fluency/24/0066cc/list.png" alt="List" className="table-icon" />
              <div>
                <h3 className="table-title">Current Semester Results</h3>
                <p className="table-subtitle">{studentInfo.semester} Semester {studentInfo.academicYear}</p>
              </div>
            </div>
            <div className="table-actions">
              <button className="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
<path fill="#4CAF50" d="M41,10H25v28h16c0.553,0,1-0.447,1-1V11C42,10.447,41.553,10,41,10z"></path><path fill="#FFF" d="M32 15H39V18H32zM32 25H39V28H32zM32 30H39V33H32zM32 20H39V23H32zM25 15H30V18H25zM25 25H30V28H25zM25 30H30V33H25zM25 20H30V23H25z"></path><path fill="#2E7D32" d="M27 42L6 38 6 10 27 6z"></path><path fill="#FFF" d="M19.129,31l-2.411-4.561c-0.092-0.171-0.186-0.483-0.284-0.938h-0.037c-0.046,0.215-0.154,0.541-0.324,0.979L13.652,31H9.895l4.462-7.001L10.274,17h3.837l2.001,4.196c0.156,0.331,0.296,0.725,0.42,1.179h0.04c0.078-0.271,0.224-0.68,0.439-1.22L19.237,17h3.515l-4.199,6.939l4.316,7.059h-3.74V31z"></path>
</svg>
                Export Excel
              </button>
              <button className="btn btn-outline">
                <img src="https://img.icons8.com/ios-filled/16/6c757d/pdf.png" alt="PDF" className="btn-icon" />
                Export PDF
              </button>
            </div>
          </div>
          <div className="table-wrapper">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Lecturer</th>
                  <th className="text-center">Score</th>
                  <th className="text-center">Grade</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>
                      <span className="course-code">{course.code}</span>
                    </td>
                    <td>{course.name}</td>
                    <td>
                      <span className="badge badge-secondary">{course.credits} CH</span>
                    </td>
                    <td>
                      <span className="lecturer-name">{course.lecturer}</span>
                    </td>
                    <td className="text-center">
                      <span className={`score ${course.score >= 90 ? 'score-high' : course.score >= 80 ? 'score-medium' : 'score-low'}`}>
                        {course.score}%
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="grade-badge" style={{ backgroundColor: getGradeColor(course.grade) }}>
                        {course.grade}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="status-badge status-approved">
                        <img src="https://img.icons8.com/ios-filled/12/ffffff/checked.png" alt="Check" />
                        {course.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="action-buttons">
                        <button className="action-btn" title="View Details">
                          <img src="https://img.icons8.com/ios-filled/18/0066cc/visible.png" alt="View" />
                        </button>
                        <button className="action-btn" title="Download">
                          <img src="https://img.icons8.com/ios-filled/18/6c757d/download.png" alt="Download" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <div className="table-footer-left">
              <span className="table-info">Showing {courses.length} courses • Semester GPA: <strong>{semesterGPA}</strong></span>
            </div>
            <button className="btn btn-outline">
              View Previous Semesters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
