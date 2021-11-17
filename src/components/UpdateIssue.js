import {GrUpdate} from 'react-icons/gr'
import {FaTimes} from 'react-icons/fa'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'

const UpdateIssue = ({trigger, setTrigger, issue, assigned_user, submitted_user, project, id}) => {

    const [status, setStatus] = useState(issue.status)
    const [title, setTitle] = useState(issue.title)
    const [description, setDescription] = useState(issue.description)
    const [priority, setPriority] = useState(issue.priority)
    const [category, setCategory] = useState(issue.category)
    const history = useHistory()

    const handleSubmit=(e) => {
        e.preventDefault()

        const updatedIssue = {title, description, priority, category, assigned_user, project, submitted_user, status}

        fetch("http://localhost:8000/api/issue/" + id, {
            method:'PUT',
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedIssue),
            })
            .then(response => {
                return response.json()
            }).then(data => {
                console.log(data)
                history.go(0)
            }) 
    }
    return (trigger) ? (
        <div className="new-issue">
            <div className="create-issue-form">
                <p>Update Issue</p>
                <GrUpdate style={{fontSize: '2.5em', color: 'white'}}/>
                <FaTimes onClick={()=>setTrigger(false)}style={{position: 'absolute', right: '8', top: '8', color: 'red', cursor:'pointer'}}/>
                <form className='create-issue' onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input required type="text" value={title} onChange={e=> {setTitle(e.target.value)}}/>
                    <label>Description</label>
                    <input required type="text" value={description} onChange={e=>{setDescription(e.target.value)}}/>
                    <label>Priority:</label>
                    <select value={priority} onChange={e=> {setPriority(e.target.value)}}>
                        <option value="Very High">Very High</option>
                        <option value="High">High</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Low">Low</option>
                        <option value="Very Low">Very Low</option>
                    </select>
                    <label>Category:</label>
                    <select value={category} onChange={e=> {setCategory(e.target.value)}}>
                        <option value="Bug">Bug</option>
                        <option value="User Story">User Story</option>
                        <option value="Design Change">Design Change</option>
                        <option value="Technical Debt">Technical Debt</option>
                        <option value="Customer Request">Customer Request</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                    <label>Status:</label>
                    <select value={status} onChange={e=> {setStatus(e.target.value)}}>
                        <option value="Opened">Opened</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <input className="submit" type="submit" value="Update Issue"/>
                </form>
            </div>
        </div>
    ):'';
}

export default UpdateIssue
