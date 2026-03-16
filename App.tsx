import React, { useState, useEffect } from 'react';
import { BlogPost } from './types';
import BlogPage from './components/BlogPage';
import { Logo } from './components/Common';
import { BLOG_POSTS } from './constants';

const App: React.FC = () => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  
  const blogPosts = BLOG_POSTS;

  const handleNextPost = () => {
    if (currentPostIndex < blogPosts.length - 1) {
      setCurrentPostIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Loop back to start or show end message
      setCurrentPostIndex(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (blogPosts.length === 0) {
    return (
      <div className="min-h-screen bg-[#fcfbf9] dark:bg-[#0a0a0a] flex items-center justify-center transition-colors duration-700">
        <Logo className="w-12 h-12 animate-pulse opacity-20" />
      </div>
    );
  }

  return (
    <BlogPage 
      post={blogPosts[currentPostIndex]} 
      allPosts={blogPosts}
      onNavigate={setCurrentPostIndex}
      onNextPost={handleNextPost}
      hasNextPost={currentPostIndex < blogPosts.length - 1}
    />
  );
};

export default App;