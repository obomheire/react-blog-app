import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {

    const navigate = useNavigate();

    const { id } = useParams()
    const { data: blog, isPending, error } = useFetch(`http://localhost:8000/blogs/${id}`)

    const handleClick = () => {

        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE',
    }).then(() =>{
        navigate('/', {replace: true})
    })
  
    }
    // <Link to={`/contact/edit/`} state={{contact: contact}}></Link>
  return (
  <div className='blog-details'>
      { isPending && <div>Pending...</div> }
      { error && <div> { error }</div> }
      { blog && (
          <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          <button onClick={handleClick}>delete</button>
         <Link to={`/edit/${blog.id}`} state={{blog: blog}}> <button>edit blog</button> </Link>
          </article>
      )}
  </div>
  );
};

export default BlogDetails;
