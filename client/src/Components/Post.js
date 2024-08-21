import { formatISO9075 } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';


function Post({ title, summary, content, cover, author ,createdAt, _id }) {
  console.log('Post data received:', { title, summary, content, cover, author ,_id});
 

  // Determine the file extension
  const fileExtension = cover ? cover.split('.').pop().toLowerCase() : null;
  const isImage = fileExtension && ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);

  return (
    <div className='cards'>
    <div className="post-card">
      <div className="post-card-header">
      <Link to={`/post/${_id}`}>
      <h2>{title}</h2>
      </Link>
        
        <p className="author">By {author?.username || 'Unknown author'}</p>
        <time>{formatISO9075(new Date(createdAt))}</time>
      </div>
      <Link to={`/post/${_id}`}>
      {cover && isImage && <img src={`http://localhost:4000/${cover}`} alt={title} className="post-image" />}
      </Link>
      {cover && !isImage && (
        <a href={`http://localhost:4000/${cover}`} download className="file-link">
          Download {fileExtension.toUpperCase()} File
        </a>
      )}

      <div className="post-card-body">
        <p>{summary}</p>
        {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
      </div>
    </div>
    </div>
  );
}

export default Post;