
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

interface PostActionsProps {
  id: string; // The ID of the blog post
  onDeleteSuccess: () => void; // Callback to refresh the list after deletion
}

const PostActions: React.FC<PostActionsProps> = ({ id, onDeleteSuccess }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog/${id}/edit`);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (!isConfirmed) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      alert('Post deleted successfully.');
      onDeleteSuccess(); // Trigger the callback to update the UI
    } catch (error) {
      console.error('Error deleting post:', error);
      alert(`Failed to delete post: ${(error as Error).message}`);
    }
  };

  return (
    <div className="flex space-x-2 mt-2">
      <button 
        onClick={handleEdit} 
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
      >
        Edit
      </button>
      <button 
        onClick={handleDelete} 
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default PostActions;
