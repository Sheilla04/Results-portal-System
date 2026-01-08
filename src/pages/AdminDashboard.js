import { useState } from 'react';
import { 
  Building, 
  Inbox, 
  CheckSquare, 
  ShieldLock,
  FileEarmarkBarGraph,
  ClockHistory,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Filter,
  Search,
  SortDown,
  ThreeDotsVertical,
  FileEarmarkText,
  People,
  CalendarEvent,
  Bell
} from 'react-bootstrap-icons';
import StatCard from '../components/StatCard';
import '../components/AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  
  const stats = [
    {
      title: "New Submissions",
      value: "5 Pending",
      description: "Awaiting review",
      icon: Inbox,
      iconBgColor: "rgba(13, 110, 253, 0.1)",
      iconColor: "text-primary",
      badge: "Urgent",
      badgeVariant: "danger"
    },
    {
      title: "Approved Results",
      value: "18 Courses",
      description: "Verified & published",
      icon: CheckSquare,
      iconBgColor: "rgba(25, 135, 84, 0.1)",
      iconColor: "text-success"
    },
    {
      title: "Verification Requests",
      value: "2 New",
      description: "From institutions",
      icon: ShieldLock,
      iconBgColor: "rgba(52, 73, 94, 0.1)",
      iconColor: "text-dark"
    },
    {
      title: "System Status",
      value: "All Systems Go",
      description: "Last updated: Today",
      icon: Building,
      iconBgColor: "rgba(108, 117, 125, 0.1)",
      iconColor: "text-secondary",
      badge: "Operational",
      badgeVariant: "success"
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      courseCode: "CSC 403",
      courseName: "Machine Learning",
      lecturer: "Dr. J. Mwangi",
      department: "Computer Science",
      submittedOn: "14 Jan 2026",
      students: 28,
      status: "pending",
      priority: "high"
    },
    {
      id: 2,
      courseCode: "MTH 301",
      courseName: "Advanced Calculus",
      lecturer: "Prof. A. Brown",
      department: "Mathematics",
      submittedOn: "13 Jan 2026",
      students: 35,
      status: "pending",
      priority: "medium"
    },
    {
      id: 3,
      courseCode: "ENG 201",
      courseName: "Technical Writing",
      lecturer: "Dr. S. Davis",
      department: "English",
      submittedOn: "12 Jan 2026",
      students: 42,
      status: "pending",
      priority: "low"
    },
    {
      id: 4,
      courseCode: "PHY 101",
      courseName: "General Physics",
      lecturer: "Prof. K. Wilson",
      department: "Physics",
      submittedOn: "11 Jan 2026",
      students: 55,
      status: "pending",
      priority: "high"
    }
  ];

  const verificationRequests = [
    {
      id: 1,
      institution: "Tech Corporation Ltd",
      requestType: "Employment Verification",
      studentName: "Jane Smith",
      studentId: "2020/CS/015",
      requestedOn: "15 Jan 2026",
      status: "pending",
      priority: "urgent"
    },
    {
      id: 2,
      institution: "University of Progress",
      requestType: "Admission Verification",
      studentName: "John Doe",
      studentId: "2020/CS/001",
      requestedOn: "14 Jan 2026",
      status: "pending",
      priority: "normal"
    }
  ];

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      urgent: { label: "Urgent", class: "badge-danger" },
      high: { label: "High", class: "badge-warning" },
      medium: { label: "Medium", class: "badge-info" },
      low: { label: "Low", class: "badge-secondary" },
      normal: { label: "Normal", class: "badge-light" }
    };
    const config = priorityConfig[priority] || priorityConfig.normal;
    return <span className={`badge ${config.class}`}>{config.label}</span>;
  };

  const filteredApprovals = pendingApprovals.filter(item =>
    item.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lecturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header mb-4">
        <div className="d-flex align-items-center">
          <div className="admin-icon-wrapper me-3">
            <Building size={28} color="#172b4d" />
          </div>
          <div>
            <h1 className="fw-bold mb-1" style={{ color: '#172b4d', fontSize: '2rem' }}>
              Examination Office Dashboard
            </h1>
            <p className="text-muted mb-0">
              Verify, approve, and manage official examination results and transcripts
            </p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary d-flex align-items-center" style={{ backgroundColor: '#172b4d', borderColor: '#172b4d' }}>
            <Bell className="me-2" size={18} />
            Notifications (3)
          </button>
          <button className="btn btn-outline-secondary d-flex align-items-center">
            <FileEarmarkBarGraph className="me-2" size={18} />
            Reports
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

      {/* Main Content Area */}
      <div className="row g-4">
        {/* Pending Approvals Table */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h5 className="mb-0 fw-semibold">Pending Result Approvals</h5>
                  <small className="text-muted">Require immediate attention</small>
                </div>
                <div className="d-flex gap-2 mt-2 mt-sm-0">
                  <div className="search-box">
                    <Search className="search-icon" size={18} />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search submissions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-outline-secondary d-flex align-items-center">
                    <Filter className="me-2" size={18} />
                    Filter
                    <SortDown className="ms-2" size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-bottom">
              <div className="btn-group w-100" role="group">
                <button 
                  type="button"
                  className={`btn btn-sm ${activeTab === 'pending' ? 'btn-dark' : 'btn-outline-dark'}`}
                  onClick={() => setActiveTab('pending')}
                >
                  <ClockHistory className="me-2" size={14} />
                  Pending ({pendingApprovals.length})
                </button>
                <button 
                  type="button"
                  className={`btn btn-sm ${activeTab === 'verification' ? 'btn-dark' : 'btn-outline-dark'}`}
                  onClick={() => setActiveTab('verification')}
                >
                  <ShieldLock className="me-2" size={14} />
                  Verification ({verificationRequests.length})
                </button>
                <button 
                  type="button"
                  className={`btn btn-sm ${activeTab === 'all' ? 'btn-dark' : 'btn-outline-dark'}`}
                  onClick={() => setActiveTab('all')}
                >
                  <FileEarmarkText className="me-2" size={14} />
                  All Records
                </button>
              </div>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '15%' }}>Course Code</th>
                      <th style={{ width: '25%' }}>Course Details</th>
                      <th style={{ width: '15%' }}>Lecturer</th>
                      <th style={{ width: '15%' }}>Submitted</th>
                      <th style={{ width: '15%' }}>Priority</th>
                      <th style={{ width: '15%' }} className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApprovals.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="fw-semibold">{item.courseCode}</div>
                          <small className="text-muted">{item.students} students</small>
                        </td>
                        <td>
                          <div className="fw-medium">{item.courseName}</div>
                          <small className="text-muted">{item.department}</small>
                        </td>
                        <td>
                          <div>{item.lecturer}</div>
                          <small className="text-muted">Senior Lecturer</small>
                        </td>
                        <td>
                          <div>{item.submittedOn}</div>
                          <small className="text-muted">2 days ago</small>
                        </td>
                        <td>{getPriorityBadge(item.priority)}</td>
                        <td className="text-end">
                          <div className="action-buttons">
                            <button 
                              className="btn btn-sm btn-success me-1"
                              title="Approve"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button 
                              className="btn btn-sm btn-danger me-1"
                              title="Reject"
                            >
                              <XCircle size={16} />
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-primary me-1"
                              title="View Details"
                            >
                              <Eye size={16} />
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

            <div className="card-footer bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Showing {filteredApprovals.length} of {pendingApprovals.length} pending approvals
                </small>
                <button className="btn btn-outline-secondary btn-sm">
                  <Download className="me-1" size={14} />
                  Export List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Two Column Layout */}
        <div className="col-lg-4">
          {/* Two Column Grid for Sidebar Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* First Row - Two Cards Side by Side */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {/* Verification Requests - Left Column */}
              <div style={{ flex: '1 1 48%', minWidth: '250px' }}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white border-0 py-3">
                    <h6 className="mb-0 fw-semibold d-flex align-items-center">
                      <ShieldLock className="me-2" size={18} color="#172b4d" />
                      Verification Requests
                    </h6>
                  </div>
                  <div className="card-body p-0 d-flex flex-column">
                    <div className="verification-requests flex-grow-1">
                      {verificationRequests.map((request) => (
                        <div key={request.id} className="verification-item p-3 border-bottom">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <div className="fw-medium small">{request.institution}</div>
                              <small className="text-muted">{request.requestType}</small>
                            </div>
                            {getPriorityBadge(request.priority)}
                          </div>
                          <div className="mb-2">
                            <small className="text-muted d-block">Student</small>
                            <div className="fw-medium">{request.studentName}</div>
                            <small className="text-muted">{request.studentId}</small>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">{request.requestedOn}</small>
                            <button className="btn btn-sm btn-outline-dark">
                              Process
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-top">
                      <button className="btn btn-outline-dark btn-sm w-100">
                        View All Verification Requests
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Actions - Right Column */}
              <div style={{ flex: '1 1 48%', minWidth: '250px' }}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white border-0 py-3">
                    <h6 className="mb-0 fw-semibold d-flex align-items-center">
                      <Building className="me-2" size={18} color="#172b4d" />
                      Admin Actions
                    </h6>
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                      <button 
                        style={{ 
                          minHeight: '80px',
                          width: '100%',
                          padding: '1rem 1.5rem',
                          textAlign: 'left',
                          border: '1px solid #212529',
                          borderRadius: '0.375rem',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '10px',
                            backgroundColor: '#f8f9fa',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '1rem',
                            flexShrink: 0
                          }}>
                            <FileEarmarkBarGraph size={20} />
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Generate Reports</div>
                            <small style={{ color: '#6c757d' }}>Academic performance</small>
                          </div>
                        </div>
                      </button>
                      
                      <button 
                        style={{ 
                          minHeight: '80px',
                          width: '100%',
                          padding: '1rem 1.5rem',
                          textAlign: 'left',
                          border: '1px solid #212529',
                          borderRadius: '0.375rem',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '10px',
                            backgroundColor: '#f8f9fa',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '1rem',
                            flexShrink: 0
                          }}>
                            <People size={20} />
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>User Management</div>
                            <small style={{ color: '#6c757d' }}>Lecturers & Students</small>
                          </div>
                        </div>
                      </button>
                      
                      <button 
                        style={{ 
                          minHeight: '80px',
                          width: '100%',
                          padding: '1rem 1.5rem',
                          textAlign: 'left',
                          border: '1px solid #212529',
                          borderRadius: '0.375rem',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '10px',
                            backgroundColor: '#f8f9fa',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '1rem',
                            flexShrink: 0
                          }}>
                            <CalendarEvent size={20} />
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Academic Calendar</div>
                            <small style={{ color: '#6c757d' }}>Manage deadlines</small>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status - Full Width Below */}
            <div>
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0 py-3">
                  <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <CheckCircle className="me-2" size={18} color="#198754" />
                    System Status
                  </h6>
                </div>
                <div className="card-body">
                  <div className="system-status">
                    <div className="status-item d-flex justify-content-between align-items-center mb-2">
                      <span className="small">Result Submission</span>
                      <span className="badge bg-success small">Operational</span>
                    </div>
                    <div className="status-item d-flex justify-content-between align-items-center mb-2">
                      <span className="small">Verification System</span>
                      <span className="badge bg-success small">Operational</span>
                    </div>
                    <div className="status-item d-flex justify-content-between align-items-center mb-2">
                      <span className="small">Database</span>
                      <span className="badge bg-success small">Operational</span>
                    </div>
                    <div className="status-item d-flex justify-content-between align-items-center">
                      <span className="small">Security</span>
                      <span className="badge bg-success small">Active</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-top">
                    <small className="text-muted small">
                      <ClockHistory className="me-1" size={12} />
                      Last updated: Today, 10:30 AM
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>          
      </div>

      {/* Bottom Actions */}
      <div className="row mt-4">
        <div className="col">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h6 className="mb-0">Examination Office Tools</h6>
                  <small className="text-muted">Advanced administration features</small>
                </div>
                <div className="d-flex gap-2 mt-2 mt-sm-0">
                  <button className="btn btn-dark d-flex align-items-center">
                    <FileEarmarkText className="me-2" size={18} />
                    View Audit Logs
                  </button>
                  <button className="btn btn-outline-dark d-flex align-items-center">
                    <Download className="me-2" size={18} />
                    Backup Database
                  </button>
                  <button className="btn btn-outline-secondary d-flex align-items-center">
                    <People className="me-2" size={18} />
                    Manage Users
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
