import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
//axios is required in order to make API request.
import axios from "axios";
import "./AddEdit.css";

const initialState = {
  title: "",
  description: "",
  URL: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { title, description, URL } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleProject(id);
    }
  }, [id]);

  /* This will fetch the specific web projects details - Once the edit button is clicked, this will
  populate the existing data within the input fields in order to make the editing easier. */
  const getSingleProject = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/project/${id}`);
    if (response.status === 200) {
      setState({ ...response.data[0] });
    }
  };

  //This will allow me to add a web project.
  const addProject = async (data) => {
    const response = await axios.post("http://localhost:8080/api", data);
    if (response.status === 200) {
      toast.success("Web project added successfully");
    }
  };

  //This will allow me to update a web project.
  const updateProject = async (data, id) => {
    const response = await axios.put(`http://localhost:8080/api/${id}`, data);
    if (response.status === 200) {
      toast.success("Web project added successfully");
    }
  };

  /*Basic validation which will NOT allow a user to submit an empty form. I have also used setTimeout
   which will navigate to the homepage after a successful addition of a web project.*/
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !URL) {
      toast.error("Please provide value into each input field");
    } else {
      if (!id) {
        addProject(state);
      } else {
        updateProject(state, id);
      }

      setTimeout(() => history.push("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter Title ..."
          onChange={handleInputChange}
          value={title}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Enter description ..."
          onChange={handleInputChange}
          value={description}
        />
        <label htmlFor="URL">URL</label>
        <input
          type="text"
          id="URL"
          name="URL"
          placeholder="Enter URL ..."
          onChange={handleInputChange}
          value={URL}
        />
        {/* If there is an id, the button will read as "Update" */}
        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
