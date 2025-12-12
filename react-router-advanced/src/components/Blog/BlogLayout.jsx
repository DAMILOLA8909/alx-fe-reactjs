import { Outlet } from 'react-router-dom';

const BlogLayout = () => {
  return (
    <div>
      <h1>Blog</h1>
      <p>Welcome to our blog! Read our latest articles.</p>
      <Outlet />
    </div>
  );
};

export default BlogLayout;