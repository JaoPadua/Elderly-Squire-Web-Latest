import './dashboard.css';
import AdminNavbar from '../../components/admin-navbar/AdminNavbar';
import AdminSidebar from '../../components/admin_sidebar/AdminSidebar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { useAuthContext } from '../../hooks/useAuthContext';

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboard() {
  const [districtData, setDistrictData] = useState({
    labels: [],
    data: [],
  });

  const [verifiedData, setVerifiedData]= useState({
    labels: [],
    data: [],
  })

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://teal-cape-buffalo-sock.cyclic.app/api/elderRoute', {
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
        const res = await fetch('https://teal-cape-buffalo-sock.cyclic.app/api/elderRoute/', {
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

  return (
    <div className="admin">
      <AdminSidebar />
      <div className="adminContainer">
        <AdminNavbar />
        <div className='charts'>
          <h2>Districts Data</h2>
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
                    label: 'District',
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
          <h2>Verified Elders</h2>
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
      </div>
    </div>
  );
}

export default AdminDashboard;
