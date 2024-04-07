import React, { useState } from 'react';

const VideoPlayer = ({ videoUrl}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleVideoClick = () => {
      setIsPlaying(!isPlaying); // Toggle play/pause
    };

  return (
    <div >
       <video
        controls
        autoPlay={isPlaying} // Auto play if isPlaying is true
        onClick={handleVideoClick}
        style={{ display: 'block', width: '100%' }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
