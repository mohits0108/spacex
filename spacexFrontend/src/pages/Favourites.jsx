import { useEffect, useState } from "react";
import axios from "axios";
const FavoriteLaunches = () => {
  const [launches, setLaunches] = useState([]);
  const [favoriteLaunches, setFavoriteLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (storedFavorites.length > 0) {
      setFavoriteLaunches(storedFavorites);

      Promise.all(
        storedFavorites.map((id) =>
          axios.get(`https://api.spacexdata.com/v4/launches/${id}`).then((res) => res.data)
        )
      ).then((data) => {
        setLaunches(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="container mt-0">
      <h2 className="mt-5">Favorite Launches</h2>
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : favoriteLaunches.length === 0 ? (
        <p>No favorite launches yet!</p>
      ) : (
        <div>
          {launches
            .filter((launch) => favoriteLaunches.includes(launch.id))
            .map((launch) => (
              <div
                key={launch.id}
                className="card mb-3 shadow-sm"
                style={{ cursor: "pointer", transition: "box-shadow 0.6s ease" }}
                onClick={() => setSelectedLaunch(launch)}
                onMouseEnter={(e) => e.currentTarget.classList.add("shadow-lg")}
                onMouseLeave={(e) => e.currentTarget.classList.remove("shadow-lg")}
              >
                <div className="card-body">
                  <h5 className="card-title">{launch.name}</h5>
                  <p className="card-text">
                    <strong>Rocket:</strong> {launch.rocket}
                  </p>
                  <p className="card-text">
                    <strong>Date:</strong> {new Date(launch.date_utc).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}

      {selectedLaunch && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedLaunch.name} - Details</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedLaunch(null)}></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Launch Site:</strong><br/> {selectedLaunch.launchpad}
                </p>
                <p>
                  <strong>Payload:</strong>
                  {selectedLaunch.payloads.map((payload, index) => (
                    <li className=" d-flex flex-column nav link" key={index}>{payload}</li>
                  ))}
                </p>
                <p>
                  <strong>Success:</strong>{" "}
                  {selectedLaunch.success ? "Successful" : "Failed"}
                </p>
                <p>
                  <strong>Links:</strong>
                  <ul>
                    {selectedLaunch.links?.article && (
                      <a className="text-decoration-none text-secondary text-center" href={selectedLaunch.links.article} target="_blank" rel="noopener noreferrer">
                        Want to Learn more.... Click here
                      </a>
                    )}
                    <br />
                    {selectedLaunch.links?.presskit && (
                      <a className="text-decoration-none text-secondary text-center" href={selectedLaunch.links.presskit} target="_blank" rel="noopener noreferrer">
                        Want to See Press Kit.. Click Here
                      </a>
                    )}
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedLaunch.links.youtube_id}`}
                      width="100%"
                      height="300"
                      frameBorder="0"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      title="YouTube video"
                    />
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteLaunches;