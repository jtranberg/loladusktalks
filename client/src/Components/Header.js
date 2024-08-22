import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";

export default function Header({ showUserPosts, fetchUserPosts, fetchPosts }) {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch('http://localhost:4000/profile', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            setUserInfo(null);
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        return response.json();
      }).then(data => {
        setUserInfo(data);
      }).catch(error => {
        console.error("Fetch error:", error);
      });
    } else {
      setUserInfo(null);
    }
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUserInfo(null);
      localStorage.removeItem('token');
    });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username ? (
          <>
            <Link to="/create" id='create' className="create">Create new post</Link>
            <button
              style={{
                background: 'none',
                color: 'inherit',
                cursor: 'pointer',
                textDecoration: 'none',
                marginLeft: '10px',
              }}
              onClick={showUserPosts ? fetchPosts : fetchUserPosts}
            >
              {showUserPosts ? 'Show All Posts' : 'Show My Posts'}
            </button>
            <button
              style={{
                background: 'none',
                color: 'inherit',
                cursor: 'pointer',
                textDecoration: 'none',
                marginLeft: '10px',
              }}
              onClick={logout}
            >
              Logout ({username})
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
