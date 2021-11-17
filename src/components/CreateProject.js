import {AiOutlineFundProjectionScreen} from 'react-icons/ai'
import useFetch from "../customhooks/useFetch";
import {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';

const CreateProject = () => {
  const {data, load, error} = useFetch('http://localhost:8000/api/userlist')
  const this_user = localStorage.getItem('username')
  const submitted_user = localStorage.getItem('id')
  const [checkbox, setCheckbox] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const history = useHistory()
  

  useEffect(()=> {
    if (!load) {
        setCheckbox(data.filter(user=>user.username !== this_user).map((user)=> ({...user, checked: false})))
    }
  },[load, data, this_user])

  const handleClick = (user) => {
      setCheckbox(checkbox.map((v)=>v.username === user.username ? {...v, checked: !v.checked}: v))
  }

  const handleSubmit = (e) => {
      e.preventDefault()

      let assigned_user = []
      for (let i = 0; i < checkbox.length; i++) {
          if (checkbox[i].checked) {
              assigned_user.push(checkbox[i].id)
          }
      }

      const projectData = {title, description, assigned_user, submitted_user}
      console.log(projectData)

      fetch("http://localhost:8000/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })
      .then(response => {
          return response.json()
      }).then(data => {
          console.log('successfully created')
          history.push("/projects")
      }) 


  } 
  
  return (
    <div className="centerize">
    {checkbox ? (      
    <div className="create">
        <h2>Create a New Project <AiOutlineFundProjectionScreen style={{fontSize:'1em', marginLeft:'5px' }}/></h2>
        <form className="create-project" onSubmit={handleSubmit}>
            <input required type="text" placeholder="Project Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            {checkbox && checkbox.map((user)=> (<div className="checkbox" key={user.username}><input type="checkbox" onChange={()=> handleClick(user)} checked={user.checked}/><label>{user.username}</label></div>))}
            <input type="submit" placeholder="Create Project"/>
        </form>
      </div>
      ): 
      <div>Loading...</div>
      }
    </div>
  );
};

export default CreateProject;
