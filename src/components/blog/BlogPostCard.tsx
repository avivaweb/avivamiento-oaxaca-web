import React from 'react';
import Link from 'next/link'; // Changed from react-router-dom
import PostActions from './PostActions';
import { BlogPost } from '../../pages/Blog'; // Changed import

interface BlogPostCardProps {
  post: BlogPost;
  onDeleteSuccess: (id: string | number) => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onDeleteSuccess }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-base text-gray-700 mb-4 flex-grow">
        {post.content ? post.content.substring(0, 150) + '...' : ''}
      </p>
      <Link href={`/blog/${post.id}`} className="text-rojo-espiritual hover:underline mb-4">
        Read More
      </Link>
      <div className="mt-auto">
        <PostActions id={post.id} onDeleteSuccess={() => onDeleteSuccess(post.id)} />
      </div>
    </div>
  );
};

export default BlogPostCard;