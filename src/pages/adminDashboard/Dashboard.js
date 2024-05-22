import './dashboard.css';
import AdminNavbar from '../../components/admin-navbar/AdminNavbar';
import AdminSidebar from '../../components/admin_sidebar/AdminSidebar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale,LinearScale } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut, Line ,Bar} from "react-chartjs-2";
import { useAuthContext } from '../../hooks/useAuthContext';
import { ToastContainer } from 'react-toastify';

ChartJS.register(ArcElement, Tooltip, Legend,BarElement,CategoryScale,LinearScale);

function AdminDashboard() {
  const [districtData, setDistrictData] = useState({
    labels: [],
    data: [],
  });

  const [verifiedData, setVerifiedData]= useState({
    labels: [],
    data: [],
  })

  const [importedData, setImportedData]= useState({
    labels: [],
    data: [],
    totalCount: 0,
  })

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://capstone-project-api-backend.vercel.app/api/elderRoute/search', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        const labels = data.map((elder) => elder.District);
        const counts = labels.reduce((acc, label) => {
          acc[label] = (acc[label] || 0) + 1;
          return acc;
        }, {});

        setDistrictData({
          labels: Object.keys(counts),
          data: Object.values(counts),
        });
      } catch (error) {
        console.error("Error fetching or processing data: ", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchverifiedData = async () => {
      try {
        const res = await fetch('https://capstone-project-api-backend.vercel.app/api/elderRoute/search', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        const labels = data.map((elder) => elder.TypeofApplication);
        const counts = labels.reduce((acc, label) => {
          acc[label] = (acc[label] || 0) + 1;
          return acc;
        }, {});

        setVerifiedData({
          labels: Object.keys(counts),
          data: Object.values(counts),
        });
      } catch (error) {
        console.error("Error fetching or processing data: ", error);
      }
    };

    fetchverifiedData();
  }, []);

  useEffect(() => {
    const fetchImportData = async () => {
      try {
        const res = await fetch('https://capstone-project-api-backend.vercel.app/api/importRoute/getAll', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
  
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await res.json();
        //console.log('importData',data)

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Data is not in the expected format or is empty");
        }
  
        const countsByDistrict = {};
        data.forEach(elder => {
          const districtObj = elder["DISTRICT NO"];
          // Extract the district number from the inner object
          const district = districtObj[""];
          countsByDistrict[district] = (countsByDistrict[district] || 0) + 1;
        });

  
        const labels = Object.keys(countsByDistrict);
        const dataCounts = Object.values(countsByDistrict);
        const totalCount = dataCounts.reduce((acc, count) => acc + count, 0);
       
        setImportedData({
          labels: labels,
          dataCounts: dataCounts,
          totalCount: totalCount,
        });
      } catch (error) {
        console.error("Error fetching or processing data: ", error);
      }
    };
  
    fetchImportData();
  }, []);
  

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="adminContainer-dashboard">
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} />
      <br></br>
        <div className='chartRow'>
        <div className='charts'>
          <h2>Districts Data of Verified Elders</h2>
          {districtData.labels.length > 0 && (
            <Doughnut
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'District',
                  },
                },
              }}
              data={{
                labels: districtData.labels,
                datasets: [
                  {
                    label: '',
                    data: districtData.data,
                    backgroundColor: [
                      'rgba(52, 152, 219, 0.7)', // Blue with 70% opacity
                      'rgba(46, 204, 113, 0.7)', // Green with 70% opacity
                      'rgba(231, 76, 60, 0.7)',  // Red with 70% opacity
                      'rgba(230, 126, 34, 0.7)', // Orange with 70% opacity
                      'rgba(155, 89, 182, 0.7)', // Purple with 70% opacity
                      'rgba(241, 196, 15, 0.7)' // Yellow with 70% opacity
                    ],
                  },
                ],
              }}
            />
          )}
        </div>
        <div className='charts2'>
          <h2>New Verified Elders</h2>
          {verifiedData.labels.length > 0 && (
            <Doughnut
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Verified Elders',
                  },
                },
              }}
              data={{
                labels: verifiedData.labels,
                datasets: [
                  {
                    label: 'Verified Elders',
                    data: verifiedData.data,
                    backgroundColor: [
                      'rgba(52, 152, 219, 0.7)', // Blue with 70% opacity
                      'rgba(46, 204, 113, 0.7)', // Green with 70% opacity
                    ],
                  },
                ],
              }}
            />
          )}
        </div>
        <div className='charts3'>
        <h2>Imported Elders Data (Total: {importedData.totalCount})</h2>
          {importedData.labels.length > 0 && (
            <Bar
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Imported Data',
                  },
                },
              }}
              data={{
                labels: importedData.labels.map((label) => `District ${label}`),
                datasets: [
                  {
                    label: 'Senior Citizen',
                    data: importedData.dataCounts,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)'
                  ],

                  },
                ],
              }}
              />
            )}

        </div>
      </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
