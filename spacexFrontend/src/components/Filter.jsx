import React from "react";
import { Calendar, Rocket, Search } from "lucide-react";

const Filters = ({ filter, handleFilterChange, applyFilters }) => {
  return (
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
      <div className="col-md-12 mt-3 text-center">
        <button className="btn btn-success" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
