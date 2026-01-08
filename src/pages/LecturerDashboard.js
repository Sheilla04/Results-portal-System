import { useState } from 'react';
import { 
  Upload, 
  ClockHistory, 
  CheckCircle, 
  FileEarmarkSpreadsheet,
  Eye,
  Pencil,
  Trash,
  SortDown,
  Download,
  PlusCircle,
  Search,
  ThreeDotsVertical,
  Lightning,
  Clock,
  InfoCircle,
  PersonBadge
} from 'react-bootstrap-icons';
import StatCard from '../components/StatCard';
import '../components/LecturerDashboard.css';
import { Card, Button, Badge } from 'react-bootstrap';


function LecturerDashboard() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const stats = [
    {
      title: "Results Uploaded",
      value: "3 Courses",
      description: "This semester",
      icon: Upload,
      iconBgColor: "rgba(13, 110, 253, 0.1)",
      iconColor: "text-primary"
    },
    {
      title: "Pending Approval",
      value: "2 Submissions",
      description: "Awaiting review",
      icon: ClockHistory,
      iconBgColor: "rgba(255, 193, 7, 0.1)",
      iconColor: "text-warning"
    },
    {
      title: "Approved Results",
      value: "1 Course",
      description: "Verified & published",
      icon: CheckCircle,
      iconBgColor: "rgba(25, 135, 84, 0.1)",
      iconColor: "text-success"
    },
    {
      title: "Total Students",
      value: "87 Students",
      description: "Across all courses",
      icon: FileEarmarkSpreadsheet,
      iconBgColor: "rgba(108, 117, 125, 0.1)",
      iconColor: "text-secondary"
    }
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
      fileFormat: "Excel (.xlsx)"
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
      fileFormat: "Excel (.xlsx)"
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
      fileFormat: "Excel (.xlsx)"
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { label: "Approved", class: "badge-success" },
      pending: { label: "Pending Review", class: "badge-warning" },
      draft: { label: "Draft", class: "badge-secondary" },
      rejected: { label: "Rejected", class: "badge-danger" }
    };
    const config = statusConfig[status] || statusConfig.draft;
    return <span className={`badge ${config.class}`}>{config.label}</span>;
  };

  const filteredCourses = courses.filter(course => {
    if (activeTab === 'all') return true;
    return course.status === activeTab;
  }).filter(course => 
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">
    {/* Header with Lecturer Icon */}
    <div className="dashboard-header mb-4">
      <div className="d-flex align-items-center">
        <div className="lecturer-icon-wrapper me-3">
          <PersonBadge size={28} color="#198754" />
        </div>
        <div>
          <h1 className="fw-bold mb-1" style={{ color: '#198754', fontSize: '2rem' }}>
            Lecturer Dashboard
          </h1>
          <p className="text-muted mb-0">
            Upload, manage, and track student examination results
          </p>
        </div>
      </div>
      <div className="header-actions">
        <button className="btn btn-primary d-flex align-items-center" style={{ backgroundColor: '#198754', borderColor: '#198754' }}>
          <PlusCircle className="me-2" size={18} />
          Upload Results
        </button>
        <button className="btn btn-outline-secondary d-flex align-items-center">
          <Download className="me-2" size={18} />
          Templates
        </button>
      </div>
    </div>

      {/* Stats Cards - Horizontal Grid */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {stats.map((stat, index) => (
          <div style={{ flex: '1 1 calc(25% - 0.75rem)', minWidth: '250px' }} key={index}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Results Management Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white border-0 py-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h5 className="mb-0 fw-semibold">Course Results Management</h5>
              <small className="text-muted">Spring Semester 2024/2025</small>
            </div>
            <div className="d-flex gap-2 mt-2 mt-sm-0">
              <div className="search-box">
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - Using Button Groups */}
        <div className="border-bottom">
          <div className="btn-group w-100" role="group">
            <button 
              type="button"
              className={`btn btn-outline-primary ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Courses ({courses.length})
            </button>
            <button 
              type="button"
              className={`btn btn-outline-primary ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Review ({courses.filter(c => c.status === 'pending').length})
            </button>
            <button 
              type="button"
              className={`btn btn-outline-primary ${activeTab === 'approved' ? 'active' : ''}`}
              onClick={() => setActiveTab('approved')}
            >
              Approved ({courses.filter(c => c.status === 'approved').length})
            </button>
            <button 
              type="button"
              className={`btn btn-outline-primary ${activeTab === 'draft' ? 'active' : ''}`}
              onClick={() => setActiveTab('draft')}
            >
              Drafts ({courses.filter(c => c.status === 'draft').length})
            </button>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '15%' }}>
                    <div className="d-flex align-items-center">
                      Course Code
                      <SortDown className="ms-1" size={14} />
                    </div>
                  </th>
                  <th style={{ width: '25%' }}>Course Name</th>
                  <th style={{ width: '10%' }}>Students</th>
                  <th style={{ width: '15%' }}>Submitted</th>
                  <th style={{ width: '15%' }}>Status</th>
                  <th style={{ width: '20%' }} className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className={selectedCourse === course.id ? 'table-active' : ''}>
                    <td>
                      <div className="fw-semibold">{course.code}</div>
                      <small className="text-muted">{course.semester}</small>
                    </td>
                    <td>
                      <div className="fw-medium">{course.name}</div>
                      <small className="text-muted">{course.fileFormat}</small>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-light text-dark">
                          {course.students} students
                        </span>
                      </div>
                    </td>
                    <td>
                      <div>{course.submissionDate}</div>
                      <small className="text-muted">{course.fileSize}</small>
                    </td>
                    <td>{getStatusBadge(course.status)}</td>
                    <td className="text-end">
                      <div className="action-buttons">
                        <button 
                          className="btn btn-sm btn-outline-primary me-1"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-warning me-1"
                          title="Edit"
                          disabled={course.status === 'approved'}
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger me-1"
                          title="Delete"
                        >
                          <Trash size={16} />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          title="More Options"
                        >
                          <ThreeDotsVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table Footer */}
        <div className="card-footer bg-white border-0 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Showing {filteredCourses.length} of {courses.length} courses
            </small>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary btn-sm">
                <Download className="me-1" size={14} />
                Export Report
              </button>
              <button className="btn btn-primary btn-sm">
                Bulk Actions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Guidelines - Side by Side as Cards */}
      <div className="mb-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Quick Actions Card - 65% width */}
        <div style={{ flex: '1 1 65%', minWidth: '300px' }}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 py-3">
              <h6 className="mb-0 fw-semibold d-flex align-items-center">
                <Lightning size={18} className="text-warning me-2" />
                Quick Actions
              </h6>
            </Card.Header>
            <Card.Body className="p-3">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <Button variant="outline-primary" className="w-100 text-start p-3" style={{ minHeight: '80px' }}>
                  <div className="d-flex align-items-start">
                    <Upload size={24} className="text-primary me-3" />
                    <div>
                      <div className="fw-medium mb-1">Upload New Results</div>
                      <small className="text-muted">Excel template required</small>
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline-success" className="w-100 text-start p-3" style={{ minHeight: '80px' }}>
                  <div className="d-flex align-items-start">
                    <Download size={24} className="text-success me-3" />
                    <div>
                      <div className="fw-medium mb-1">Download Template</div>
                      <small className="text-muted">Standard format</small>
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline-warning" className="w-100 text-start p-3" style={{ minHeight: '80px' }}>
                  <div className="d-flex align-items-start">
                    <Clock size={24} className="text-warning me-3" />
                    <div>
                      <div className="fw-medium mb-1">Check Deadlines</div>
                      <small className="text-muted">Submission timeline</small>
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline-info" className="w-100 text-start p-3" style={{ minHeight: '80px' }}>
                  <div className="d-flex align-items-start">
                    <Eye size={24} className="text-info me-3" />
                    <div>
                      <div className="fw-medium mb-1">View Guidelines</div>
                      <small className="text-muted">Upload procedures</small>
                    </div>
                  </div>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Submission Guidelines Card - 33% width */}
        <div style={{ flex: '1 1 32%', minWidth: '280px' }}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 py-3">
              <h6 className="mb-0 fw-semibold d-flex align-items-center">
                <InfoCircle size={18} className="text-info me-2" />
                Submission Guidelines
              </h6>
            </Card.Header>
            <Card.Body className="p-3">
              <div className="guidelines-list">
                <div className="guideline-item d-flex align-items-start mb-3">
                  <CheckCircle size={16} className="text-success me-2 mt-1 flex-shrink-0" />
                  <small>Use the official Excel template</small>
                </div>
                <div className="guideline-item d-flex align-items-start mb-3">
                  <CheckCircle size={16} className="text-success me-2 mt-1 flex-shrink-0" />
                  <small>Verify student IDs and names</small>
                </div>
                <div className="guideline-item d-flex align-items-start mb-3">
                  <CheckCircle size={16} className="text-success me-2 mt-1 flex-shrink-0" />
                  <small>Grades must follow university scale</small>
                </div>
                <div className="guideline-item d-flex align-items-start mb-3">
                  <CheckCircle size={16} className="text-success me-2 mt-1 flex-shrink-0" />
                  <small>Submit before the deadline</small>
                </div>
                <div className="guideline-item d-flex align-items-start mb-3">
                  <CheckCircle size={16} className="text-success me-2 mt-1 flex-shrink-0" />
                  <small>Include all required columns</small>
                </div>
              </div>
              
              <div className="deadline-alert mt-4 pt-3 border-top">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted fw-medium">Deadline:</small>
                  <Badge bg="danger" className="px-3 py-2">January 31, 2026</Badge>
                </div>
                <small className="text-muted d-block">Late submissions require special approval</small>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Support Section */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body py-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h6 className="mb-0">Need assistance with results upload?</h6>
              <small className="text-muted">Contact the Examination Office</small>
            </div>
            <div className="d-flex gap-2 mt-2 mt-sm-0">
              <button className="btn btn-outline-secondary btn-sm">
                <i className="bi bi-question-circle me-1"></i>
                Help Center
              </button>
              <button className="btn btn-outline-primary btn-sm">
                <i className="bi bi-telephone me-1"></i>
                Support Hotline
              </button>
              <button className="btn btn-outline-success btn-sm">
                <i className="bi bi-envelope me-1"></i>
                Email Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturerDashboard;