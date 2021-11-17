import { useParams } from "react-router-dom";
import useFetch from "../customhooks/useFetch";
import IssuePreview from "./IssuePreview";
import CreateIssue from "./CreateIssue";
import ConfirmDelete from './ConfirmDelete'
import {useState} from 'react'

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: userlist } = useFetch("http://localhost:8000/api/userlist");
  const { data: project } = useFetch("http://localhost:8000/api/project/" + id);
  const { data: issue } = useFetch("http://localhost:8000/api/issue");
  const [popupCreate, setPopupCreate] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);

  let idNameMatch = null;
  let this_issue = null;
  let isMine = null
  if (userlist && project && issue) {
    idNameMatch = {};
    for (let i = 0; i < userlist.length; i++) {
      for (let j = 0; j < project.assigned_user.length; j++) {
        if (userlist[i].id === project.assigned_user[j]) {
          idNameMatch[project.assigned_user[j]] = userlist[i].username;
        }
      }
      if (userlist[i].id === project.submitted_user) {
        idNameMatch[project.submitted_user] = userlist[i].username;
      }
    }
    this_issue = issue.filter((v) => v.project === parseInt(id));
    isMine = localStorage.getItem('username') === idNameMatch[project.submitted_user]
  }
  
  return (
    <div className="project-wrapper">
      {idNameMatch && (
        <div className="project-all">
          <h2>{project.title}</h2>
          <div className="project-details">
            <div className="project-related">
              <h4>Description:</h4>
              <p>{project.description}</p>
              <h4>Date Created:</h4>
              <p>{project.date_posted}</p>
              <h4>Project Owner:</h4>
              <p>{idNameMatch[project.submitted_user]}</p>
              <h4>Assigned Developers:</h4>
              <div className="assigned-users">
                {project.assigned_user.map((user_id) => (
                  <p key={user_id}>{idNameMatch[user_id]}</p>
                ))}
              </div>
              <button className='create-btn' onClick={()=>setPopupCreate(true)}>Create a New Issue</button>
              <br/>
              {isMine && <button className="delete-btn" onClick={()=>setPopupDelete(true)}>Delete Project</button>}
            </div>
            <IssuePreview this_issue={this_issue} idNameMatch={idNameMatch} />
          </div>
          <ConfirmDelete trigger={popupDelete} setTrigger={setPopupDelete} project={id}/>
          <CreateIssue trigger={popupCreate} setTrigger={setPopupCreate} project={id} idNameMatch={idNameMatch} />
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
