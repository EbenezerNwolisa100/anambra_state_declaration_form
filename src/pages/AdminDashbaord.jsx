// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [view, setView] = useState(''); // To toggle between indigenes and nonindigenes
//   const [submissions, setSubmissions] = useState([]); // Stores the submission data
//   const [error, setError] = useState('');

//   // Function to fetch submissions based on view (indigenes or nonindigenes)
//   const fetchSubmissions = async (type) => {
//     try {
//       const response = await axios.get(`https://ibad.asatuyouth.org/api/${type}_submissions.php`);
//       setSubmissions(response.data);
//     } catch (err) {
//       setError('Failed to load data');
//     }
//   };

//   // Handle button click to load respective data
//   const handleViewChange = (type) => {
//     setView(type);
//     fetchSubmissions(type);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('adminLoggedIn');
//     window.location.href = '/login'; // Redirect to login page
//   };

//   return (
//     <section className='container my-5'>
//   <div className="card shadow p-4">
//     <h2 className="text-center mb-4">Admin Dashboard</h2>

//     {!view && (
//       <div className="d-flex justify-content-center mb-4">
//         <button className="btn btn-primary mx-2" onClick={() => handleViewChange('indigenes')}>
//           View Indigenes Submissions
//         </button>
//         <button className="btn btn-secondary mx-2" onClick={() => handleViewChange('nonindigenes')}>
//           View Non-Indigenes Submissions
//         </button>
//       </div>
//     )}

//     {error && <p className="text-danger text-center">{error}</p>}

//     {view && submissions.length > 0 && (
//       <div>
//         <h3 className="text-center mb-4">
//           {view === 'indigenes' ? 'Indigenes Submissions' : 'Non-Indigenes Submissions'}
//         </h3>

//         {/* Make table responsive */}
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover">
//             <thead className="thead-dark">
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">First Name</th>
//                 <th scope="col">Surname</th>
//                 <th scope="col">Middle Name</th>
//                 <th scope="col">IBAD ID</th>
//                 <th scope="col">Email</th>
//                 <th scope="col">Date of Birth</th>
//                 <th scope="col">Gender</th>
//                 <th scope="col">Marital Status</th>
//                 <th scope="col">Spouse Name</th>
//                 <th scope="col">Spouse Number</th>
//                 <th scope="col">Country of Residence</th>
//                 <th scope="col">State of Residence</th>
//                 <th scope="col">State of Origin</th>
//                 <th scope="col">LGA of Residence</th>
//                 <th scope="col">LGA of Origin</th>
//                 <th scope="col">Community of Origin</th>
//                 <th scope="col">Village</th>
//                 <th scope="col">Tribe</th>
//                 <th scope="col">Kindred</th>
//                 <th scope="col">Employment Status</th>
//                 <th scope="col">Occupation</th>
//                 <th scope="col">Phone Number</th>
//                 <th scope="col">Alternate Phone Number</th>
//                 <th scope="col">Phone on WhatsApp</th>
//                 <th scope="col">Alternate on WhatsApp</th>
//                 <th scope="col">Next of Kin</th>
//                 <th scope="col">Next of Kin Phone Number</th>
//                 <th scope="col">Valid Means of Identification</th>
//                 <th scope="col">Valid Identification Number</th>
//                 <th scope="col">Submission Timestamp</th>
//               </tr>
//             </thead>
//             <tbody>
//               {submissions.map((submission, index) => (
//                 <tr key={submission.ibad_id}>
//                   <th scope="row">{index + 1}</th>
//                   <td>{submission.first_name}</td>
//                   <td>{submission.surname}</td>
//                   <td>{submission.middle_name}</td>
//                   <td>{submission.ibad_id}</td>
//                   <td>{submission.email}</td>
//                   <td>{submission.date_of_birth}</td>
//                   <td>{submission.gender}</td>
//                   <td>{submission.marital_status}</td>
//                   <td>{submission.spouse_name}</td>
//                   <td>{submission.spouse_phone_number}</td>
//                   <td>{submission.country_of_residence}</td>
//                   <td>{submission.state_of_residence}</td>
//                   <td>{submission.state_of_origin}</td>
//                   <td>{submission.lga_of_residence}</td>
//                   <td>{submission.lga_of_origin}</td>
//                   <td>{submission.community_of_origin}</td>
//                   <td>{submission.village}</td>
//                   <td>{submission.tribe}</td>
//                   <td>{submission.kindred}</td>
//                   <td>{submission.employment_status}</td>
//                   <td>{submission.occupation}</td>
//                   <td>{submission.phone_number}</td>
//                   <td>{submission.alternate_phone_number}</td>
//                   <td>{submission.phone_on_whatsapp}</td>
//                   <td>{submission.alternate_on_whatsapp}</td>
//                   <td>{submission.next_of_kin}</td>
//                   <td>{submission.next_of_kin_phone_number}</td>
//                   <td>{submission.valid_means_of_identification}</td>
//                   <td>{submission.valid_identification_number}</td>
//                   <td>{submission.submission_timestamp}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     )}
//     <button onClick={handleLogout} className="btn btn-danger">Logout</button>
//   </div>
// </section>
//   );
// };

// export default AdminDashboard;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [view, setView] = useState(''); // To toggle between indigenes and nonindigenes
//   const [submissions, setSubmissions] = useState([]); // Stores the submission data
//   const [error, setError] = useState('');
//   const [currentPage, setCurrentPage] = useState(1); // Pagination state
//   const submissionsPerPage = 15; // Number of submissions per page

//   // Function to fetch submissions based on view (indigenes or nonindigenes)
//   const fetchSubmissions = async (type) => {
//     try {
//       const response = await axios.get(`https://ibad.asatuyouth.org/api/${type}_submissions.php`);
//       setSubmissions(response.data);
//       setCurrentPage(1); // Reset to first page when new data is fetched
//     } catch (err) {
//       setError('Failed to load data');
//     }
//   };

//   // Handle button click to load respective data
//   const handleViewChange = (type) => {
//     setView(type);
//     fetchSubmissions(type);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('adminLoggedIn');
//     window.location.href = '/'; // Redirect to login page
//   };

//   // Pagination logic
//   const indexOfLastSubmission = currentPage * submissionsPerPage;
//   const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
//   const currentSubmissions = submissions.slice(indexOfFirstSubmission, indexOfLastSubmission);

//   // Handle page change
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Calculate total pages
//   const totalPages = Math.ceil(submissions.length / submissionsPerPage);

//   return (
//     <section className='container my-5'>
//       <div className="card shadow p-4">
//         <h2 className="text-center mb-4">Admin Dashboard</h2>

//         {!view && (
//           <div className="d-flex justify-content-center mb-4">
//             <button className="btn btn-primary mx-2" onClick={() => handleViewChange('indigenes')}>
//               View Indigenes Submissions
//             </button>
//             <button className="btn btn-secondary mx-2" onClick={() => handleViewChange('nonindigenes')}>
//               View Non-Indigenes Submissions
//             </button>
//           </div>
//         )}

//         {error && <p className="text-danger text-center">{error}</p>}

//         {view && submissions.length > 0 && (
//           <div>
//             <h3 className="text-center mb-4">
//               {view === 'indigenes' ? 'Indigenes Submissions' : 'Non-Indigenes Submissions'}
//             </h3>

//             {/* Make table responsive */}
//             <div className="table-responsive">
//               <table className="table table-bordered table-hover">
//                 <thead className="thead-dark">
//                   <tr>
//                     <th scope="col">#</th>
//                     <th scope="col">First Name</th>
//                     <th scope="col">Surname</th>
//                     <th scope="col">Middle Name</th>
//                     <th scope="col">IBAD ID</th>
//                     <th scope="col">Email</th>
//                     <th scope="col">Date of Birth</th>
//                     <th scope="col">Gender</th>
//                     <th scope="col">Marital Status</th>
//                     <th scope="col">Spouse Name</th>
//                     <th scope="col">Spouse Number</th>
//                     <th scope="col">Country of Residence</th>
//                     <th scope="col">State of Residence</th>
//                     <th scope="col">State of Origin</th>
//                     <th scope="col">LGA of Residence</th>
//                     <th scope="col">LGA of Origin</th>
//                     <th scope="col">Community of Origin</th>
//                     <th scope="col">Village</th>
//                     <th scope="col">Tribe</th>
//                     <th scope="col">Kindred</th>
//                     <th scope="col">Employment Status</th>
//                     <th scope="col">Occupation</th>
//                     <th scope="col">Phone Number</th>
//                     <th scope="col">Alternate Phone Number</th>
//                     <th scope="col">Phone on WhatsApp</th>
//                     <th scope="col">Alternate on WhatsApp</th>
//                     <th scope="col">Next of Kin</th>
//                     <th scope="col">Next of Kin Phone Number</th>
//                     <th scope="col">Valid Means of Identification</th>
//                     <th scope="col">Valid Identification Number</th>
//                     <th scope="col">Submission Timestamp</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentSubmissions.map((submission, index) => (
//                     <tr key={submission.ibad_id}>
//                       <th scope="row">{indexOfFirstSubmission + index + 1}</th>
//                       <td>{submission.first_name}</td>
//                       <td>{submission.surname}</td>
//                       <td>{submission.middle_name}</td>
//                       <td>{submission.ibad_id}</td>
//                       <td>{submission.email}</td>
//                       <td>{submission.date_of_birth}</td>
//                       <td>{submission.gender}</td>
//                       <td>{submission.marital_status}</td>
//                       <td>{submission.spouse_name}</td>
//                       <td>{submission.spouse_phone_number}</td>
//                       <td>{submission.country_of_residence}</td>
//                       <td>{submission.state_of_residence}</td>
//                       <td>{submission.state_of_origin}</td>
//                       <td>{submission.lga_of_residence}</td>
//                       <td>{submission.lga_of_origin}</td>
//                       <td>{submission.community_of_origin}</td>
//                       <td>{submission.village}</td>
//                       <td>{submission.tribe}</td>
//                       <td>{submission.kindred}</td>
//                       <td>{submission.employment_status}</td>
//                       <td>{submission.occupation}</td>
//                       <td>{submission.phone_number}</td>
//                       <td>{submission.alternate_phone_number}</td>
//                       <td>{submission.phone_on_whatsapp}</td>
//                       <td>{submission.alternate_on_whatsapp}</td>
//                       <td>{submission.next_of_kin}</td>
//                       <td>{submission.next_of_kin_phone_number}</td>
//                       <td>{submission.valid_means_of_identification}</td>
//                       <td>{submission.valid_identification_number}</td>
//                       <td>{submission.submission_timestamp}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination Controls */}
//             <div className="d-flex justify-content-center mt-4 mb-4">
//               <button
//                 className="btn btn-outline-dark mx-2"
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
//               <span className="align-self-center">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 className="btn btn-outline-dark mx-2"
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//         <button onClick={handleLogout} className="btn btn-danger">Logout</button>
//       </div>
//     </section>
//   );
// };

// export default AdminDashboard;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import the xlsx library

const AdminDashboard = () => {
  const [view, setView] = useState(''); // To toggle between indigenes and nonindigenes
  const [submissions, setSubmissions] = useState([]); // Stores the submission data
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const submissionsPerPage = 15; // Number of submissions per page

  // Function to fetch submissions based on view (indigenes or nonindigenes)
  const fetchSubmissions = async (type) => {
    try {
      const response = await axios.get(`https://ibad.asatuyouth.org/api/${type}_submissions.php`);
      setSubmissions(response.data);
      setCurrentPage(1); // Reset to first page when new data is fetched
    } catch (err) {
      setError('Failed to load data');
    }
  };

  // Handle button click to load respective data
  const handleViewChange = (type) => {
    setView(type);
    fetchSubmissions(type);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = '/'; // Redirect to login page
  };

  // Pagination logic
  const indexOfLastSubmission = currentPage * submissionsPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
  const currentSubmissions = submissions.slice(indexOfFirstSubmission, indexOfLastSubmission);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(submissions.length / submissionsPerPage);

  // Export to Excel function
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(submissions); // Convert JSON data to sheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Submissions"); // Append the sheet to the workbook
    XLSX.writeFile(wb, `${view}_submissions.xlsx`); // Export the Excel file
  };

  return (
    <section className='container my-5'>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Admin Dashboard</h2>

        {!view && (
          <div className="d-flex justify-content-center mb-4">
            <button className="btn btn-primary mx-2" onClick={() => handleViewChange('indigenes')}>
              View Indigenes Submissions
            </button>
            <button className="btn btn-secondary mx-2" onClick={() => handleViewChange('nonindigenes')}>
              View Non-Indigenes Submissions
            </button>
          </div>
        )}

        {error && <p className="text-danger text-center">{error}</p>}

        {view && submissions.length > 0 && (
          <div>
            <h3 className="text-center mb-4">
              {view === 'indigenes' ? 'Indigenes Submissions' : 'Non-Indigenes Submissions'}
            </h3>

            {/* Make table responsive */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Middle Name</th>
                    <th scope="col">IBAD ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Marital Status</th>
                    <th scope="col">Spouse Name</th>
                    <th scope="col">Spouse Number</th>
                    <th scope="col">Country of Residence</th>
                    <th scope="col">State of Residence</th>
                    <th scope="col">State of Origin</th>
                    <th scope="col">LGA of Residence</th>
                    <th scope="col">LGA of Origin</th>
                    <th scope="col">Community of Origin</th>
                    <th scope="col">Village</th>
                    <th scope="col">Tribe</th>
                    <th scope="col">Kindred</th>
                    <th scope="col">Employment Status</th>
                    <th scope="col">Occupation</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Alternate Phone Number</th>
                    <th scope="col">Phone on WhatsApp</th>
                    <th scope="col">Alternate on WhatsApp</th>
                    <th scope="col">Next of Kin</th>
                    <th scope="col">Next of Kin Phone Number</th>
                    <th scope="col">Valid Means of Identification</th>
                    <th scope="col">Valid Identification Number</th>
                    <th scope="col">Submission Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSubmissions.map((submission, index) => (
                    <tr key={submission.ibad_id}>
                      <th scope="row">{indexOfFirstSubmission + index + 1}</th>
                      <td>{submission.first_name}</td>
                      <td>{submission.surname}</td>
                      <td>{submission.middle_name}</td>
                      <td>{submission.ibad_id}</td>
                      <td>{submission.email}</td>
                      <td>{submission.date_of_birth}</td>
                      <td>{submission.gender}</td>
                      <td>{submission.marital_status}</td>
                      <td>{submission.spouse_name}</td>
                      <td>{submission.spouse_phone_number}</td>
                      <td>{submission.country_of_residence}</td>
                      <td>{submission.state_of_residence}</td>
                      <td>{submission.state_of_origin}</td>
                      <td>{submission.lga_of_residence}</td>
                      <td>{submission.lga_of_origin}</td>
                      <td>{submission.community_of_origin}</td>
                      <td>{submission.village}</td>
                      <td>{submission.tribe}</td>
                      <td>{submission.kindred}</td>
                      <td>{submission.employment_status}</td>
                      <td>{submission.occupation}</td>
                      <td>{submission.phone_number}</td>
                      <td>{submission.alternate_phone_number}</td>
                      <td>{submission.phone_on_whatsapp}</td>
                      <td>{submission.alternate_on_whatsapp}</td>
                      <td>{submission.next_of_kin}</td>
                      <td>{submission.next_of_kin_phone_number}</td>
                      <td>{submission.valid_means_of_identification}</td>
                      <td>{submission.valid_identification_number}</td>
                      <td>{submission.submission_timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Export to Excel Button */}
            <div className="d-flex justify-content-center mt-4">
              <button className="btn btn-success mx-2" onClick={exportToExcel}>
                Export to Excel
              </button>
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-4 mb-4">
              <button
                className="btn btn-outline-dark text-dark mx-2"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="align-self-center">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-outline-dark text-dark mx-2"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
    </section>
  );
};

export default AdminDashboard;