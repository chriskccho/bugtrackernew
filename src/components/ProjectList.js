import { Link } from "react-router-dom";
import useFetch from "../customhooks/useFetch";

const ProjectList = () => {
  const {
    data: projects,
    error,
    load
  } = useFetch("http://localhost:8000/api/project");
  //console.log(projects)

  const this_user_id = parseInt(localStorage.getItem("id"));

  let mySubmitted = [];
  let myAssigned = [];
  
  if (projects) {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].submitted_user === this_user_id) {
        mySubmitted.push(projects[i]);
      }
      for (let j = 0; j < projects[i].assigned_user.length; j++) {
        if (projects[i].assigned_user[j] === this_user_id) {
          myAssigned.push(projects[i]);
        }
      }
    }
  }

  return (projects) ? (
    <div className="project-list">
      <div className="project-wrapper">
        <h2>My Projects</h2>
        {(mySubmitted.length >0) ? (
          mySubmitted.map((project) => (
            <div className="project" key={project.id}>
              <Link to={`/projects/${project.id}`}>
                <h3>{project.title}</h3>
                <h4>{project.description}</h4>
              </Link>
            </div>
          ))
        ) : (
          <div className="no-project"><h3>No Projects</h3></div>
        )}
      </div>
      <div className="project-wrapper">
       <h2>Assigned Projects</h2>
        {myAssigned.length > 0 ? (
          myAssigned.map((project) => (
            <div className="project" key={project.id}>
              <Link to={`/projects/${project.id}`}>
                <h3>{project.title}</h3>
                <h4>{project.description}</h4>
              </Link>
            </div>
          ))
        ) : (
          <div className="no-project"><h3>No Projects</h3></div>
        )}
      </div>
    </div>
  ): <div>Loading...</div>
};

export default ProjectList;
