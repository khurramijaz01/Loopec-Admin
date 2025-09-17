import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LeaveSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="request-card">
            <div className="request-header">
              <Skeleton width={120} height={20} />
              <Skeleton width={80} height={20} />
            </div>
            <div className="request-details">
              <Skeleton width="60%" height={16} />
              <Skeleton width="50%" height={16} />
              <Skeleton width="70%" height={16} />
              <Skeleton width="40%" height={16} />
            </div>
          </div>
        ))}
    </>
  );
};

export default LeaveSkeleton;
