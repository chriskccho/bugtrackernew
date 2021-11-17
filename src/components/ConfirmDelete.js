import { useHistory } from 'react-router'
import {FaTimes} from 'react-icons/fa'

const ConfirmDelete = ({trigger, setTrigger, project}) => {
    const history = useHistory()
    const handleDelete = () => {
        fetch("http://localhost:8000/api/project/" + project, {
          method: "DELETE",
        }).then(() => {
          history.push("/projects")
        })
      }

    return (trigger) ? (
        <div className='new-issue'>
            <div className='confirm'>
                <p>Are you sure you want to delete this project?</p>
                <FaTimes onClick={()=>setTrigger(false)} style={{position: 'absolute', right: '8', top: '8', color: 'red', cursor:'pointer'}}/>
                <button className='delete-btn' onClick={handleDelete}>Delete Project</button>
            </div>    
        </div>
    ):'';
}

export default ConfirmDelete
