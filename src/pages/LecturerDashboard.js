import { useState } from 'react';
import { SubmissionTrendChart, CoursePerformanceChart, StatusPieChart } from '../components/Charts';
import '../components/LecturerDashboard.css';

function LecturerDashboard() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const submissionTrendData = [
    { month: 'Sep', submitted: 2, approved: 1 },
    { month: 'Oct', submitted: 3, approved: 2 },
    { month: 'Nov', submitted: 4, approved: 3 },
    { month: 'Dec', submitted: 3, approved: 3 },
    { month: 'Jan', submitted: 5, approved: 4 },
    { month: 'Feb', submitted: 3, approved: 2 }
  ];

  const coursePerformanceData = [
    { course: 'CSC 401', average: 85 },
    { course: 'CSC 403', average: 78 },
    { course: 'CSC 405', average: 82 }
  ];

  const statusDistributionData = [
    { name: 'Approved', value: 1 },
    { name: 'Pending', value: 2 },
    { name: 'Draft', value: 3 }
  ];

  const courses = [
    {
      id: 1,
      code: "CSC 401",
      name: "Artificial Intelligence",
      semester: "Spring 2024/2025",
      submissionDate: "12 Jan 2026",
      lastModified: "12 Jan 2026",
      status: "approved",
      students: 30,
      fileSize: "2.4 MB",
      uploadedBy: "Dr. Smith",
      fileFormat: "Excel (.xlsx)",
      averageScore: 85
    },
    {
      id: 2,
      code: "CSC 403",
      name: "Machine Learning",
      semester: "Spring 2024/2025",
      submissionDate: "14 Jan 2026",
      lastModified: "14 Jan 2026",
      status: "pending",
      students: 28,
      fileSize: "1.8 MB",
      uploadedBy: "Dr. Johnson",
      fileFormat: "Excel (.xlsx)",
      averageScore: 78
    },
    {
      id: 3,
      code: "CSC 405",
      name: "Computer Security",
      semester: "Spring 2024/2025",
      submissionDate: "15 Jan 2026",
      lastModified: "15 Jan 2026",
      status: "draft",
      students: 29,
      fileSize: "2.1 MB",
      uploadedBy: "Dr. Williams",
      fileFormat: "Excel (.xlsx)",
      averageScore: 82
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { label: "Approved", color: "#198754", icon: "https://img.icons8.com/ios-filled/14/ffffff/checked.png" },
      pending: { label: "Pending Review", color: "#ffc107", icon: "https://img.icons8.com/ios-filled/14/ffffff/clock.png" },
      draft: { label: "Draft", color: "#6c757d", icon: "https://img.icons8.com/ios-filled/14/ffffff/document.png" },
      rejected: { label: "Rejected", color: "#dc3545", icon: "https://img.icons8.com/ios-filled/14/ffffff/cancel.png" }
    };
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span className="status-badge" style={{ backgroundColor: config.color }}>
        <img src={config.icon} alt={config.label} />
        {config.label}
      </span>
    );
  };

  const filteredCourses = courses.filter(course => {
    if (activeTab === 'all') return true;
    return course.status === activeTab;
  }).filter(course => 
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const approvedCount = courses.filter(c => c.status === 'approved').length;
  const pendingCount = courses.filter(c => c.status === 'pending').length;

  return (
    <div className="dashboard-wrapper lecturer-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <div className="header-icon">
                <img src="https://img.icons8.com/fluency/48/000000/teacher.png" alt="Lecturer" />
              </div>
              <div className="header-text">
                <h1 className="dashboard-title">Lecturer Dashboard</h1>
                <p className="dashboard-subtitle">Upload, manage, and track student examination results</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn btn-primary">
                <img src="https://img.icons8.com/ios-filled/20/ffffff/upload.png" alt="Upload" className="btn-icon" />
                Upload Results
              </button>
              <button className="btn btn-secondary">
                <img src="https://img.icons8.com/ios-filled/20/0066cc/download.png" alt="Download" className="btn-icon" />
                Download Template
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card stat-primary">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-label">Results Uploaded</div>
                <div className="stat-value">{courses.length}</div>
                <div className="stat-description">This semester</div>
              </div>
              <div className="stat-icon-wrapper">
                <img src="https://img.icons8.com/fluency/40/0066cc/upload.png" alt="Upload" />
              </div>
            </div>
          </div>

          <div className="stat-card stat-warning">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-label">Pending Approval</div>
                <div className="stat-value">{pendingCount}</div>
                <div className="stat-trend warning">
                  <img src="https://img.icons8.com/ios-filled/16/ffc107/clock.png" alt="Clock" />
                  Awaiting review
                </div>
              </div>
              <div className="stat-icon-wrapper">
                <img src="https://img.icons8.com/fluency/40/ffc107/clock.png" alt="Pending" />
              </div>
            </div>
          </div>

          <div className="stat-card stat-success">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-label">Approved Results</div>
                <div className="stat-value">{approvedCount}</div>
                <div className="stat-trend positive">
                  <img src="https://img.icons8.com/ios-filled/16/198754/checked.png" alt="Check" />
                  Verified & published
                </div>
              </div>
              <div className="stat-icon-wrapper">
                <img src="https://img.icons8.com/fluency/40/198754/checked.png" alt="Approved" />
              </div>
            </div>
          </div>

          <div className="stat-card stat-info">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-label">Total Students</div>
                <div className="stat-value">{totalStudents}</div>
                <div className="stat-description">Across all courses</div>
              </div>
              <div className="stat-icon-wrapper">
                <img src="https://img.icons8.com/fluency/40/0dcaf0/group.png" alt="Students" />
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
                  <h3 className="chart-title">Submission Trends</h3>
                  <p className="chart-subtitle">Monthly submission and approval rates</p>
                </div>
              </div>
              <button className="btn-icon-only">
                <img src="https://img.icons8.com/ios-filled/18/6c757d/download.png" alt="Export" />
              </button>
            </div>
            <div className="chart-body">
              <SubmissionTrendChart data={submissionTrendData} />
            </div>
          </div>

          <div className="chart-container chart-small">
            <div className="chart-header">
              <div className="chart-title-group">
                <img src="https://img.icons8.com/fluency/24/0066cc/pie-chart.png" alt="Chart" className="chart-icon" />
                <div>
                  <h3 className="chart-title">Status Distribution</h3>
                  <p className="chart-subtitle">Current submissions</p>
                </div>
              </div>
            </div>
            <div className="chart-body">
              <StatusPieChart data={statusDistributionData} />
            </div>
          </div>
        </div>

        {/* Course Performance Chart */}
        <div className="chart-container chart-full">
          <div className="chart-header">
            <div className="chart-title-group">
              <img src="https://img.icons8.com/fluency/24/0066cc/bar-chart.png" alt="Chart" className="chart-icon" />
              <div>
                <h3 className="chart-title">Course Performance Overview</h3>
                <p className="chart-subtitle">Average scores across your courses</p>
              </div>
            </div>
            <button className="btn-icon-only">
              <img src="https://img.icons8.com/ios-filled/18/6c757d/download.png" alt="Export" />
            </button>
          </div>
          <div className="chart-body">
            <CoursePerformanceChart data={coursePerformanceData} />
          </div>
        </div>

        {/* Results Table */}
        <div className="table-container">
          <div className="table-header">
            <div className="table-title-group">
              <img src="https://img.icons8.com/fluency/24/0066cc/list.png" alt="List" className="table-icon" />
              <div>
                <h3 className="table-title">Course Results Management</h3>
                <p className="table-subtitle">Spring Semester 2024/2025</p>
              </div>
            </div>
            <div className="search-wrapper">
              <img src="https://img.icons8.com/ios-filled/18/6c757d/search.png" alt="Search" className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="table-tabs">
            <button 
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Courses ({courses.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending ({pendingCount})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
              onClick={() => setActiveTab('approved')}
            >
              Approved ({approvedCount})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'draft' ? 'active' : ''}`}
              onClick={() => setActiveTab('draft')}
            >
              Drafts ({courses.filter(c => c.status === 'draft').length})
            </button>
          </div>

          <div className="table-wrapper">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Students</th>
                  <th>Avg Score</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className={selectedCourse === course.id ? 'selected' : ''}>
                    <td>
                      <span className="course-code">{course.code}</span>
                      <br />
                      <span className="course-semester">{course.semester}</span>
                    </td>
                    <td>
                      <div className="course-name">{course.name}</div>
                      <span className="file-format">{course.fileFormat}</span>
                    </td>
                    <td>
                      <span className="badge badge-light">
                        <img src="https://img.icons8.com/ios-filled/14/6c757d/group.png" alt="Students" />
                        {course.students} students
                      </span>
                    </td>
                    <td>
                      <span className={`score ${course.averageScore >= 80 ? 'score-high' : course.averageScore >= 70 ? 'score-medium' : 'score-low'}`}>
                        {course.averageScore}%
                      </span>
                    </td>
                    <td>
                      <div>{course.submissionDate}</div>
                      <span className="file-size">{course.fileSize}</span>
                    </td>
                    <td>{getStatusBadge(course.status)}</td>
                    <td className="text-end">
                      <div className="action-buttons">
                        <button className="action-btn" title="View Details">
                          <img src="https://img.icons8.com/ios-filled/18/0066cc/visible.png" alt="View" />
                        </button>
                        <button 
                          className="action-btn" 
                          title="Edit"
                          disabled={course.status === 'approved'}
                        >
                          <img 
                            src={course.status === 'approved' ? "https://img.icons8.com/ios-filled/18/6c757d/edit.png" : "https://img.icons8.com/ios-filled/18/ffc107/edit.png"} 
                            alt="Edit" 
                          />
                        </button>
                        <button className="action-btn" title="Delete">
                          <img src="https://img.icons8.com/ios-filled/18/dc3545/delete.png" alt="Delete" />
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
              <span className="table-info">Showing {filteredCourses.length} of {courses.length} courses</span>
            </div>
            <button className="btn btn-outline">
              <img src="https://img.icons8.com/ios-filled/16/6c757d/download.png" alt="Download" className="btn-icon" />
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturerDashboard;
