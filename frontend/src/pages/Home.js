import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css";
//axios is required in order to make API request.
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  //This will return all the web projects.
  const getProjects = async () => {
    const response = await axios.get("http://localhost:8080/api");
    if (response.status === 200) {
      setData(response.data);
    }
  };

  /*This will delete the selected web project.
  A confirmation message to delete the web project will pop up.*/
  const onDeleteProject = async (id) => {
    if (
      window.confirm("Are you sure that you want to delete this web project?")
    ) {
      const response = await axios.delete(`http://localhost:8080/api/${id}`);
      if (response.status === 200) {
        toast.success("Web Project deleted successfully!");
        //this callback will fecth the updated web projects data.
        getProjects();
      }
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>title</th>
            <th style={{ textAlign: "center" }}>Description</th>
            <th style={{ textAlign: "center" }}>URL</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.URL}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDeleteProject(item.id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${item.id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
