import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
      console.log('Fetching from:', apiUrl);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        const workoutsData = data.results || data;
        setWorkouts(workoutsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="text-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger" role="alert">Error: {error}</div>;

  return (
    <div>
      <h2 className="mb-4">Workouts</h2>
      {workouts.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              {Object.keys(workouts[0]).map(key => (
                <th key={key} scope="col">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={index}>
                {Object.values(workout).map((value, i) => (
                  <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No workouts found.</p>
      )}
    </div>
  );
};

export default Workouts;