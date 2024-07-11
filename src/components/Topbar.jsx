import React, { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';

const Topbar = ({progress}) => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     // Increment progress to 40% when component mounts
//     setProgress(40);

//     // Reset progress when component unmounts
//     return () => setProgress(0);
//   }, []);

  return (
    <div>
      <LoadingBar
        color='#000'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
    </div>
  );
};

export default Topbar;
