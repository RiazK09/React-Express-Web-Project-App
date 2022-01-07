import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [project, setProject] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleProject(id);
    }
  }, [id]);

  const getSingleProject = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/project/${id}`);
    if (response.status === 200) {
      setProject({ ...response.data[0] });
    }
  };

  return (
    <div style={{ MarginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Web Project</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Title:</strong>
          <span>{project && project.title}</span>
          <br />
          <br />
          <strong>Description:</strong>
          <span>{project && project.description}</span>
          <br />
          <br />
          <strong>URL:</strong>
          <span>{project && project.URL}</span>
          <br />
          <br />
          {/* Button to navigate back to the Homepage. */}
          <Link to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
