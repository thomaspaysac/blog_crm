import { useState, useEffect } from "react";

const ArticleOverview = ({ blogPost }) => {
  const [visibility, setVisibility] = useState(blogPost.visibility);
  const [loading, setLoading] = useState('');

  const textPreview = blogPost.text.substring(0, 200).trim() + '...';

  const changeVisibility = async () => {
    setLoading(' ...');
    await fetch(`https://blogapi-production-5dee.up.railway.app/posts/${blogPost._id}/visibility`, { method: 'PUT' });
    visibility === 'public' ? setVisibility('hidden') : setVisibility('public');
    setLoading('');
  }

  const deleteArticle = async () => {
    if (window.confirm("Do you really want to delete this article?")) {
      await fetch(`https://blogapi-production-5dee.up.railway.app/posts/${blogPost._id}/delete`, { method: 'DELETE' });
      location.reload();
    } else {
     return; 
    }
  }

  return (
    <div className='blogpost_overview'>
      <h2>{blogPost.title}</h2>
      <div className="post-visibility_container">
        <p>Visibility : 
          {
            visibility === 'public' ? <span style={{color: 'green',}}> public</span> : <span style={{color: 'red'}}> hidden</span>
          }
          <span>{loading}</span>
        </p>
        <button onClick={changeVisibility}>↻</button>
      </div>
      
      <div className="blogpost_metadata">published by <strong>{blogPost.author.username}</strong> on {blogPost.createdAt_formatted}
      {
        blogPost.updatedAt !== blogPost.createdAt ? <p className="blogpost_edit-info">Edited {blogPost.updatedAt_formatted}</p> : null
      }
      </div>
      <div>{textPreview}</div>
      <a href={`/post/${blogPost._id}`}>Edit article</a>
      <button onClick={deleteArticle}>Delete article</button>
    </div>
  )
}

export default ArticleOverview;