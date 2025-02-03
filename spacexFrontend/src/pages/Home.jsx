import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, XCircle, Heart, HeartOff, Rocket, Calendar, Info, Search } from "lucide-react";
import axios from "axios";
import useToken from '../hooks/useToken';
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Filters from "../components/Filter";

const Home = () => {
  const token = useToken();
  const [role, setRole] = useState('');
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [filter, setFilter] = useState({ year: "", rocket: "", mission: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [favoriteLaunches, setFavoriteLaunches] = useState([]);
  const launchesPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    console.log("Decoded Token:", decodedToken);
    setRole(decodedToken.role);

    axios.get("http://localhost:9000/api/launches")
      .then((response) => {
        console.log("Launches Data:", response.data);
        setLaunches(response.data);
        setFilteredLaunches(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching launches:", error);
        setLoading(false);
      });
  }, [token]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilter = { ...filter, [name]: value };
    setFilter(updatedFilter);

    let filtered = launches.filter((launch) => {
      return (
        (updatedFilter.year ? launch.date_utc.includes(updatedFilter.year) : true) &&
        (updatedFilter.rocket ? launch.rocket.toLowerCase().includes(updatedFilter.rocket.toLowerCase()) : true) &&
        (updatedFilter.mission ? launch.name.toLowerCase().includes(updatedFilter.mission.toLowerCase()) : true)
      );
    });

    setFilteredLaunches(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteLaunches(savedFavorites);
  }, []);

  const toggleFavorite = (launch) => {
    let updatedFavorites;

    if (favoriteLaunches.includes(launch.id)) {
      updatedFavorites = favoriteLaunches.filter((id) => id !== launch.id);
    } else {
      updatedFavorites = [...favoriteLaunches, launch.id];
    }

    setFavoriteLaunches(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
  const currentLaunches = filteredLaunches.slice(indexOfFirstLaunch, indexOfLastLaunch);

  if(role === "operator") {
    navigate("/accessdenied");
  }

  return (
    <div className="container mt-4">
      {role === "owner" && (
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        </div>
      )}

      <h1 className="text-center mb-4 text-primary fw-bold">
        <Rocket size={36} className="me-2 text-warning" /> SpaceX Launches
      </h1>

      
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-warning text-dark">
              <Calendar size={20} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Filter by Year"
              name="year"
              value={filter.year}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-danger text-white">
              <Rocket size={20} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Filter by Rocket ID"
              name="rocket"
              value={filter.rocket}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-primary text-white">
              <Search size={20} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Filter by Mission Name"
              name="mission"
              value={filter.mission}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {currentLaunches.map((launch) => (
            <div
              className="card mb-3 shadow-sm"
              key={launch.id}
              style={{ cursor: 'pointer', transition: 'box-shadow 0.6s ease' }}
              onClick={() => setSelectedLaunch(launch)}
              onMouseEnter={(e) => e.currentTarget.classList.add('shadow-lg')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('shadow-lg')}                
            >
              <div className="card-body">
                <h5 className="card-title fw-bold text-success">
                  <Info size={20} className="me-2" /> {launch.name}
                </h5>
                <p className="card-text">
                  <Rocket size={18} className="me-2 text-danger" /> <strong>Rocket:</strong> {launch.rocket}
                </p>
                <p className="card-text">
                  <Calendar size={18} className="me-2 text-info" /> <strong>Date:</strong> {new Date(launch.date_utc).toLocaleDateString()}
                </p>
                <button
                  className="btn btn-outline-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(launch);
                  }}
                >
                  {favoriteLaunches.includes(launch.id) ? (
                    <Heart size={24} />
                  ) : (
                    <HeartOff size={24} />
                  )}
                  {favoriteLaunches.includes(launch.id) ? " Remove from Favorites" : " Add to Favorites"}
                </button>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft /> Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={indexOfLastLaunch >= filteredLaunches.length}
            >
              Next <ChevronRight />
            </button>
          </div>
        </>
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
                <p><strong>Launch Site:</strong> {selectedLaunch.launchpad}</p>
                <p><strong>Payload:</strong>{selectedLaunch.payloads.map((payload, index) => (
                  <li key={index}>{payload}</li>
                ))}</p>
                <p><strong>Success:</strong> {selectedLaunch.success ? "Successful" : "Failed"}</p>
                <p><strong>Links:</strong>
                  {selectedLaunch.links?.article && (
                    <a href={selectedLaunch.links.article} target="_blank" rel="noopener noreferrer">
                      Learn More
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
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
