import { useParams } from "react-router-dom";
import useFetch from "../customhooks/useFetch";
import UpdateIssue from "./UpdateIssue";
import { useState } from "react";

const IssueDetails = () => {
  const { id } = useParams();
  const { data: issue } = useFetch("http://localhost:8000/api/issue/" + id);
  const { data: userlist } = useFetch("http://localhost:8000/api/userlist");
  const { data: project } = useFetch("http://localhost:8000/api/project");

  let this_project = null;
  let assigned_user = null;
  let submitted_user = null;
  let isMine = null;

  if (project) {
    this_project = project.filter((v) => v.id === issue.project)[0];
    assigned_user = userlist.filter((v) => v.id === issue.assigned_user)[0];
    submitted_user = userlist.filter((v) => v.id === issue.submitted_user)[0];
    isMine = localStorage.getItem('username') === assigned_user.username || localStorage.getItem('username') === submitted_user.username;

  }

  const [popupUpdate, setPopupUpdate] = useState(false);

  return this_project ? (
    <div className="issue-details">
      <h2>Issue #{id}</h2>
      <div className="issue-description">
        <div className="col-1">
          <h4>Issue Title:</h4>
          <p>{issue.title}</p>
          <h4>Priority:</h4>
          <p>{issue.priority}</p>
          <h4>Project:</h4>
          <p>{this_project.title}</p>
          <h4>Date Created:</h4>
          <p>{issue.date_posted}</p>
          <h4>Submitted User:</h4>
          <p>{submitted_user.username}</p>
          {isMine && <button className="create-btn" onClick={() => setPopupUpdate(true)}>Update this Issue</button>}
        </div>
        <div className="col-2">
          <h4>Issue Description:</h4>
          <p>{issue.description}</p>
          <h4>Status:</h4>
          <p>{issue.status}</p>
          <h4>Category:</h4>
          <p>{issue.category}</p>
          <h4>Date Updated:</h4>
          {issue.date_updated ? <p>{issue.date_updated}</p> : <p>No Update</p>}
          <h4>Assigned Developer</h4>
          <p>{assigned_user.username}</p>
        </div>
      </div>
      <div className="issue-tables">
        Table section
      </div>
      <UpdateIssue trigger={popupUpdate} setTrigger={setPopupUpdate} issue={issue} project={this_project.id} assigned_user={assigned_user.id} submitted_user={submitted_user.id} id={id}/>
    </div>
  ) : (
    ""
  );
};

export default IssueDetails;
