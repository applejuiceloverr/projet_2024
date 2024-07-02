import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Practice = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/courses/courses/${courseId}/`)
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            console.error(`Response status: ${response.status}, body: ${text}`);
            throw new Error(`HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Course data:', data);
        setCourse(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation: ', error);
      });
  }, [courseId]);

  if (!course) return <p className="text-center text-gray-700">Loading...</p>;

  const videoUrl = course.video && (course.video.startsWith('http') ? course.video : `http://127.0.0.1:8000/media/${course.video}`);

  console.log('Video URL:', videoUrl);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-4xl">
        {videoUrl ? (
          <video controls width="100%" onError={e => console.error('Video error:', e)}>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="text-center text-gray-700">Video not available</p>
        )}
      </div>
    </div>
  );
};

export default Practice;
