import '../components/StudentDashboard.css';
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { BarChart, Clipboard,FileEarmark,Journal, JournalCheck, Eye, Download, CheckCircle,
   FileEarmarkSpreadsheet , Lightning, ShieldCheck, Printer, ChevronRight, QuestionCircle, Envelope, 
  Flag,  
  Mortarboard, 
  PersonBadge, 
  Building, 
  CalendarEvent} from "react-bootstrap-icons";
import StatCard from '../components/StatCard';


function StudentDashboard() {

  const containerStyle = {

    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '20px',
    margin: '0 auto',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    maxWidth: '100%'
  };
  // Mock data - in real app, this would come from props or API
  const studentInfo = {
    name: "John Doe",
    id: "2020/CS/001",
    academicYear: "2024/2025",
    semester: "Spring",
    program: "Computer Science",
    department: "Department of Computing"
  };

  const courses = [
    { code: "CSC 401", name: "Artificial Intelligence", grade: "A", status: "Approved", lecturer: "Dr. Smith" },
    { code: "CSC 403", name: "Machine Learning", grade: "B+", status: "Approved", lecturer: "Prof. Johnson" },
    { code: "CSC 405", name: "Computer Security", grade: "A-", status: "Approved", lecturer: "Dr. Williams" },
    { code: "MTH 301", name: "Advanced Calculus", grade: "B", status: "Approved", lecturer: "Prof. Brown" },
    { code: "ENG 201", name: "Technical Writing", grade: "A", status: "Approved", lecturer: "Dr. Davis" }
  ];

  const getGradeColor = (grade) => {
    const gradeMap = {
      'A': 'success',
      'A-': 'success',
      'B+': 'primary',
      'B': 'info',
      'B-': 'info',
      'C+': 'warning',
      'C': 'warning',
      'D': 'danger',
      'F': 'danger'
    };
    return gradeMap[grade] || 'secondary';
  };

  return (
    <div className="container-fluid py-4">
    {/* Compact Header with Student Icon */}
      <div className="mb-4">
      {/* Heading with Student Icon */}
      <div className="d-flex align-items-center mb-3">
        <div className="student-icon-wrapper me-3">
          <Mortarboard size={32} color="#0066cc" />
        </div>
        <div>
          <h1 className="fw-bold mb-1" style={{ color: '#0066cc', fontSize: '2rem' }}>
            Student Dashboard
          </h1>
          <p className="text-muted mb-0 small">John Doe • 2020/CS/001 • Spring Semester 2025</p>
        </div>
      </div>
      
      {/* Mini Info Cards */}
      <div className="row g-2 mb-3">
        <div className="col-6 col-md-3">
          <div className="card border p-2">
            <div className="d-flex align-items-center">
              <Mortarboard className="text-primary me-2" size={16} />
              <div>
                <small className="text-muted d-block">Program</small>
                <small className="fw-medium">Computer Science</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border p-2">
            <div className="d-flex align-items-center">
              <CalendarEvent className="text-primary me-2" size={16} />
              <div>
                <small className="text-muted d-block">Semester</small>
                <small className="fw-medium">Spring 2025</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border p-2">
            <div className="d-flex align-items-center">
              <CheckCircle className="text-success me-2" size={16} />
              <div>
                <small className="text-muted d-block">Status</small>
                <small className="fw-medium">Active</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border p-2">
            <div className="d-flex align-items-center">
              <JournalCheck className="text-success me-2" size={16} />
              <div>
                <small className="text-muted d-block">Results</small>
                <small className="fw-medium">All Published</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-2 mb-3">
        <button className="btn btn-outline-primary btn-sm d-flex align-items-center">
          <Download className="me-2" size={14} />
          Transcript
        </button>
        <button className="btn btn-primary btn-sm d-flex align-items-center" style={{ backgroundColor: '#0066cc', borderColor: '#0066cc' }}>
          <Printer className="me-2" size={14} />
          Print
        </button>
      </div>
    </div>


      {/* Quick Stats Cards */}
      <div style = {containerStyle}>
      <div className="mb-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%' }}>
        <div style={{ flex: '1 1 calc(25% - 0.75rem)', minWidth: '200px', maxWidth: '25%' }}>
          <StatCard
            title="Results Status"
            value={`${courses.length}/6`}
            badge="All Published"
            badgeVariant="success"
            description={`${courses.length} courses`}
            icon={Journal}
            iconBgColor="#e8f5f0"
            iconColor="text-primary"
          />
        </div>

        <div style={{ flex: '1 1 calc(25% - 0.75rem)', minWidth: '200px', maxWidth: '25%' }}>
          <StatCard
            title="Courses Taken"
            value={courses.length}
            description="This Semester"
            icon={Clipboard}
            iconBgColor="#d1f4e0"
            iconColor="text-success"
          />
        </div>

        <div style={{ flex: '1 1 calc(25% - 0.75rem)', minWidth: '200px', maxWidth: '25%' }}>
          <StatCard
            title="Average Grade"
            value="B+"
            description={`Based on ${courses.length} courses`}
            icon={BarChart}
            iconBgColor="#d1ecf1"
            iconColor="text-info"
          />
        </div>

        <div style={{ flex: '1 1 calc(25% - 0.75rem)', minWidth: '200px', maxWidth: '25%' }}>
          <StatCard
            title="Transcript"
            value={<Badge bg="primary" className="fw-normal mb-1">Available</Badge>}
            description="Last updated: Today"
            icon={FileEarmark}
            iconBgColor="#fff3cd"
            iconColor="text-warning"
          />
        </div>
      </div>
      </div>

      {/* Main Content Area */}
      <Row>
       {/* Results Table */}
        <Col lg={8}>
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0 fw-semibold">
                    <i className="bi bi-clipboard-data me-2 text-primary"></i>
                    Current Semester Results
                  </h5>
                  <small className="text-muted">{studentInfo.semester} Semester {studentInfo.academicYear}</small>
                </div>
                
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Type</th>
                      <th>Lecturer</th>
                      <th className="text-center">Grade</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => (
                      <tr key={index}>
                        <td>
                          <div className="fw-semibold">{course.code}</div>
                        </td>
                        <td>
                          <div>{course.name}</div>
                        </td>
                        <td>
                          <Badge bg="secondary" className="fw-normal">Core</Badge>
                        </td>
                        <td>
                          <div>{course.lecturer}</div>
                        </td>
                        <td className="text-center">
                          <Badge bg={getGradeColor(course.grade)} className="grade-badge">
                            {course.grade}
                          </Badge>
                        </td>
                        <td className="text-center">
                          <Badge bg="success" className="fw-normal">
                            <CheckCircle size={14} className="me-1" />
                            {course.status}
                          </Badge>
                        </td>
                        <td className="text-center">
                          <Button variant="link" size="sm" className="p-0 me-2" title="View Details">
                            <Eye size={18} className="text-primary" />
                          </Button>
                          <Button variant="link" size="sm" className="p-0" title="Download">
                            <Download size={18} className="text-secondary" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="d-flex gap-2">
              <Button variant="primary" size="sm">
                <Download size={16} className="me-1" />
                Export PDF
              </Button>
              <Button variant="outline-primary" size="sm">
                <FileEarmarkSpreadsheet size={16} className="me-1" />
                Export Excel
              </Button>
            </div>
            
            <div className="card-footer bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Showing {courses.length} courses • All results are final
                </small>
                <Button variant="outline-secondary" size="sm">
                  View Previous Semesters
                </Button>
              </div>
            </div>
          </div>
        </Col>

        {/* Sidebar - Quick Actions */}
        <Col lg={4} className="mt-4 mt-lg-0">
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-header bg-white border-0 py-3">
              <h6 className="mb-0 fw-semibold text-center">
                <Lightning size={18} className="me-2 text-warning" />
                Quick Actions
              </h6>
            </div>
            <div className="card-body" style={{ padding: '2rem' }}>
              <div className="d-flex flex-column" style={{ gap: '1.5rem' }}>
                <Button 
                  variant="primary" 
                  className="py-3 px-4 d-flex align-items-center justify-content-between quick-action-btn"
                  style={{
                    borderRadius: '12px',
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    minHeight: '85px'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem'
                    }}>
                      <Download size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="fw-semibold">Download Official Transcript</div>
                      <small className="d-block opacity-75 fw-normal mt-1">
                        PDF format with official seal
                      </small>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-white" />
                </Button>

                <Button 
                  variant="outline-success" 
                  className="py-3 px-4 d-flex align-items-center justify-content-between quick-action-btn"
                  style={{
                    borderRadius: '12px',
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    minHeight: '85px'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '10px',
                      backgroundColor: '#d1f4e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem'
                    }}>
                      <ShieldCheck size={20} className="text-success" />
                    </div>
                    <div>
                      <div className="fw-semibold text-success">Request Verification</div>
                      <small className="d-block text-muted fw-normal mt-1">
                        For employers or institutions
                      </small>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-success" />
                </Button>

                <Button 
                  variant="outline-secondary" 
                  className="py-3 px-4 d-flex align-items-center justify-content-between quick-action-btn"
                  style={{
                    borderRadius: '12px',
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    minHeight: '85px'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '10px',
                      backgroundColor: '#f8f9fa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem'
                    }}>
                      <Printer size={20} className="text-secondary" />
                    </div>
                    <div>
                      <div className="fw-semibold text-dark">Print Results Slip</div>
                      <small className="d-block text-muted fw-normal mt-1">
                        Semester results summary
                      </small>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-secondary" />
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Bottom Actions */}
      <Row className="mt-4">
        <Col>
          <div className="card border-0 shadow-sm">
            <div className="card-body" style={{ padding: '2rem' }}>
              <div className="mb-4 text-center">
                <h6 className="mb-1">Need assistance?</h6>
                <small className="text-muted">Contact the Examination Office for result inquiries</small>
              </div>
              <div className="d-flex flex-column flex-md-row" style={{ gap: '1.5rem' }}>
                <Button 
                  variant="outline-secondary" 
                  className="py-3 px-4 d-flex align-items-center justify-content-between bottom-action-btn"
                  style={{
                    borderRadius: '12px',
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    minHeight: '85px',
                    flex: '1'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div 
                      className="icon-container"
                      style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '10px',
                        backgroundColor: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem'
                      }}
                    >
                      <QuestionCircle size={20} className="text-secondary" />
                    </div>
                    <div>
                      <div className="fw-semibold text-dark">Help Center</div>
                      <small className="d-block text-muted fw-normal mt-1">
                        Get support and guidance
                      </small>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-secondary chevron-icon" />
                </Button>

                <Button 
                  variant="outline-secondary" 
                  className="py-3 px-4 d-flex align-items-center justify-content-between bottom-action-btn"
                  style={{
                    borderRadius: '12px',
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    minHeight: '85px',
                    flex: '1'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div 
                      className="icon-container"
                      style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '10px',
                        backgroundColor: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem'
                      }}
                    >
                      <Envelope size={20} className="text-secondary" />
                    </div>
                    <div>
                      <div className="fw-semibold text-dark">Contact Exam Office</div>
                      <small className="d-block text-muted fw-normal mt-1">
                        Send inquiry or message
                      </small>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-secondary chevron-icon" />
                </Button>

                <Button 
                  variant="outline-secondary" 
                  className="py-3 px-4 d-flex align-items-center justify-content-between bottom-action-btn"
                  style={{
                    borderRadius: '12px',
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    minHeight: '85px',
                    flex: '1'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div 
                      className="icon-container"
                      style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '10px',
                        backgroundColor: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem'
                      }}
                    >
                      <Flag size={20} className="text-secondary" />
                    </div>
                    <div>
                      <div className="fw-semibold text-dark">Appeal Results</div>
                      <small className="d-block text-muted fw-normal mt-1">
                        Submit result appeal
                      </small>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-secondary chevron-icon" />
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default StudentDashboard;