const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const { v4: uuid } = require("uuid");

//this line is required to parse the request body.
app.use(express.json());
//this line is required in order to access the API in the React frontend.
app.use(cors());

//util functions
/* This function will make use of the writeFileSync method to read the data in the 
JSON file.*/
const saveData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("web-projects.json", stringifyData);
};

/* This function will make use of the readFileSync method to get the data from the 
JSON file. 
• JSON.parse converts the text into a JavaScript object.
• readFileSync takes two parameters, the path & and optional parameter - 'options' */
const getData = () => {
  const jsonData = fs.readFileSync("web-projects.json");
  return JSON.parse(jsonData);
};
//util functions ends

//Homepage: http://localhost:8080/
app.get("/", (req, res) => res.send("Hello from Express!"));

/* get method 
• Navigate to http://localhost:8080/api */
app.get("/api", (req, res) => {
  const data = getData();
  res.send(data);
});

/* post method */
app.post("/api", (req, res) => {
  //get the existing web projects data
  const existProjects = getData();
  //get the new web projects data from post request
  const projectData = req.body;
  //append the project data
  existProjects.push({ ...projectData, id: uuid() });
  //save the new project data
  saveData(existProjects);
  res.send({
    success: true,
    msg: "Web project added successfully",
  });
});

/* get method - used to get/display a single web project */
app.get("/api/project/:id", (req, res) => {
  const existProjects = getData();
  //filter the project data in order to display a single web project
  const filterProject = existProjects.filter((api) => api.id === req.params.id);
  res.send(filterProject);
});

/* delete method */
app.delete("/api/:id", (req, res) => {
  const id = req.params.id;
  //get the existing project data
  const existProjects = getData();
  //filter the project data in order to remove it
  const filterProject = existProjects.filter((api) => api.id !== id);
  if (existProjects.length === filterProject.length) {
    return res.status(409).send({
      error: true,
      msg: "Web project does not exist!",
    });
  }
  //save the filtered data
  saveData(filterProject);
  res.send({
    success: true,
    msg: "Web project removed successfully.",
  });
});

/* put method */
app.put("/api/:id", (req, res) => {
  //get the id from url
  const id = req.params.id;
  //get the updated data
  const projectData = req.body;
  //get the existing project data
  const existProjects = getData();
  //check if the id exists or not
  const findExist = existProjects.find((api) => api.id === id);

  if (!findExist) {
    return res.status(409).send({
      error: true,
      msg: "id does not exist!",
    });
  }
  //filter the project data
  const updateProject = existProjects.filter((api) => api.id !== id);
  //push the updated data
  updateProject.push(projectData);
  //finally save it
  saveData(updateProject);
  res.send({
    success: true,
    msg: "Web project data updated successfully",
  });
});

//Port 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port: http://localhost:${PORT}`);
});
