import React from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

// Define the shape of the image data from Strapi
interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

interface StrapiImageData {
  id: number;
  attributes: {
    url: string;
    width: number;
    height: number;
    formats: {
      thumbnail: StrapiImageFormat;
      small: StrapiImageFormat;
      medium: StrapiImageFormat;
      large: StrapiImageFormat;
    }
  };
}

// Define the shape of a single blog post from Strapi
interface BlogPost {
  id: string | number;
  attributes: {
    title: string;
    content: string;
    cover_image?: { // Assuming the field is named cover_image
      data: StrapiImageData | null;
    };
    // Add other attributes here
  };
}

interface BlogPostPageProps {
  post: BlogPost | null;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
  if (!post) {
    return <div>Blog post not found.</div>;
  }

  const { title, content, cover_image } = post.attributes;
  const imageUrl = cover_image?.data?.attributes?.url;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {imageUrl && (
        <div className="relative w-full h-96 mb-8">
          <Image
            src={`http://localhost:1337${imageUrl}`}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
      <div className="prose lg:prose-xl max-w-none">
        {content}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<BlogPostPageProps> = async (context) => {
  const { id } = context.params || {};

  if (!id) {
    return { props: { post: null } };
  }

  try {
    const res = await fetch(`http://localhost:1337/api/blogs/${id}?populate=*`);

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status}`);
    }

    const { data }: { data: BlogPost } = await res.json();

    return {
      props: {
        post: data,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        post: null,
      },
    };
  }
};

export default BlogPostPage;