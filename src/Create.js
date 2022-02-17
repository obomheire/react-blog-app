import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIspending] = useState(false) 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        
        setIspending(true)

      fetch('http://localhost:8000/blogs/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
      }).then(() => {
        console.log('new blog added');
        setIspending(false)
        navigate('/', {replace: true})
      })

    }

  return (
    <div className="create">
    <h2>Add a New Blog</h2>
    <form onSubmit={handleSubmit}>
      <label>Blog title:</label>
      <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
      <label>Blog body:</label>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
      <label>Blog author:</label>
      <select value={author} onChange={(e) => setAuthor(e.target.value)}>
        <option value="Zack Bello">Zack Bello</option>
        <option value="Owolabi Fatai">Owolabi Fatai</option>
        <option value="Maryam Mohammed">Maryam Mohammed</option>
        <option value="Gideon Bello">Gideon Bello</option>
        <option value="Mohammed Sulaimon">Mohammed Sulaimon</option>
        <option value="Omozuafor Sunday">Omozuafor Sunday</option>
        <option value="Juastina Agbadu">Juastina Agbadu</option>
        <option value="YAkubu Ibrahim">YAkubu Ibrahim</option>
        <option value="JJ Okocha">JJ Okocha</option>
        <option value="Funke Owolabi">Funke Owolabi</option>
      </select>
      { !isPending && <button>Add Blog</button> } 
      { isPending && <button disabled>Adding Blog...</button> } 
    </form>
  </div>
  );
};

export default Create;


