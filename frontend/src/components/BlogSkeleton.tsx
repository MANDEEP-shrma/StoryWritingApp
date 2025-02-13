import React from 'react';

export const SkeletonLoaderBlogs: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="space-y-6 w-full max-w-3xl">
        {[1, 2, 3,4,5,6].map((_, index) => (
          <div key={index} className="flex items-start p-5">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse mr-4"></div>
            <div className="flex-1 space-y-3">
              <div className="w-1/2 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export const BlogSkeleton: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto pt-16 p-6 animate-pulse flex gap-12">
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Title Placeholder */}
            <div className="h-10 bg-gray-300 rounded-md w-full mb-4"></div>
            <div className="h-10 bg-gray-300 rounded-md w-4/5 mb-4"></div>
            <div className="h-10 bg-gray-300 rounded-md w-3/5 mb-6"></div>
    
            {/* Date Placeholder */}
            <div className="h-4 bg-gray-300 rounded-md w-1/4 mb-6"></div>
            
            {/* Content Placeholder (limited to viewport height) */}
            <div className="space-y-4 h-[70vh] overflow-hidden">
              <div className="h-4 bg-gray-300 rounded-md w-full"></div>
              <div className="h-4 bg-gray-300 rounded-md w-full"></div>
              <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded-md w-4/6"></div>
              <div className="h-4 bg-gray-300 rounded-md w-full"></div>
              <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded-md w-2/3"></div>
            </div>
          </div>
    
          {/* Author Section */}
          <div className="w-1/4 mt-4 ">
            {/* Author Label */}
            <div className="h-5 bg-gray-300 rounded-md w-16 mb-4"></div>
    
            {/* Avatar and Author Info */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded-md w-24 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded-md w-32"></div>
              </div>
            </div>
          </div>
        </div>
      );
};

