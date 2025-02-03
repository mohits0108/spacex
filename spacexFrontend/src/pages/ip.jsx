import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Home = () => {
  
  return (
    <div className="container p-4">
      <h2 className="text-center">IP Address Lookup</h2>
      <div className="d-flex flex-column">
        <FloatingLabel
          controlId="floatingInput"
          label="IP"
          className="mb-3"
        >
          <Form.Control type="text" value={ip} placeholder="" readOnly />
        </FloatingLabel>
        <button className="btn btn-primary" type="button" onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Home;
