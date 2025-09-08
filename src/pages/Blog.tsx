import React from 'react';
import { GetServerSideProps } from 'next';
import BlogPostCard from '../components/blog/BlogPostCard';

// This is the shape of the data coming from Strapi
interface StrapiBlogPost {
  id: string | number;
  attributes: {
    title: string;
    content: string;
    // Add other attributes from your Strapi collection type here
  };
}

// This is the shape of the data the BlogPostCard component expects
export interface BlogPost {
  id: string | number;
  title: string;
  content: string;
}

interface BlogProps {
  blogs: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ blogs }) => {
  const handleDeleteSuccess = (deletedId: string | number) => {
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <BlogPostCard key={post.id} post={post} onDeleteSuccess={handleDeleteSuccess} />
          ))}
        </div>
      ) : (
        <p>No blog posts found.</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<BlogProps> = async () => {
  try {
    const res = await fetch('http://localhost:1337/api/blogs');
    
    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.status}`);
    }
    
    const { data }: { data: StrapiBlogPost[] } = await res.json();
    
    const blogs: BlogPost[] = data.map(post => ({
      id: post.id,
      title: post.attributes.title,
      content: post.attributes.content,
    }));

    return {
      props: {
        blogs,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        blogs: [],
      },
    };
  }
};

export default Blog;