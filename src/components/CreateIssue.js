import {GoIssueOpened} from 'react-icons/go'
import {FaTimes} from 'react-icons/fa'
import { useState } from 'react'
import { useHistory } from 'react-router'

const CreateIssue = ({trigger, setTrigger, idNameMatch, project}) => {

    const user_ids = Object.keys(idNameMatch).filter(v => v !== localStorage.getItem('id'))
    const submitted_user = localStorage.getItem('id')
    const status = 'Opened'
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('Very High')
    const [category, setCategory] = useState('Bug')
    const [assigned_user, setAssignedUser] = useState(user_ids[0])
    const history = useHistory()

    const handleSubmit=(e)=> {
        e.preventDefault()

        
        const issueData = {title, description, priority, category, assigned_user, project, submitted_user, status}
        fetch("http://localhost:8000/api/issue", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(issueData),
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
                <p>Create a New Issue</p>
                <GoIssueOpened style={{fontSize: '2.5em', color: 'white'}}/>
                <FaTimes onClick={()=>setTrigger(false)}style={{position: 'absolute', right: '8', top: '8', color: 'red', cursor:'pointer'}}/>
            <form className='create-issue' onSubmit={handleSubmit}>
                <input required type="text" placeholder="Title" value={title} onChange={e=> {setTitle(e.target.value)}}/>
                <input required type="text" placeholder="Description" value={description} onChange={e=>{setDescription(e.target.value)}}/>
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
                <label>Assign Developer:</label>
                <select value={assigned_user} onChange={e=> {setAssignedUser(e.target.value)}}>
                    {user_ids.map(user=>(<option key={user} value={user}>{idNameMatch[user]}</option>))}
                </select>
                <input className="submit" type="submit" value="Create Issue"/>
            </form>
            </div>
        </div>
    ): '';
}

export default CreateIssue
