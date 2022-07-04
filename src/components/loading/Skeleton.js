import React from 'react'
import Skeleton from 'react-loading-skeleton'
const Skeletonn = () => {
    const countSkeleton = 6;
    return Array(countSkeleton).fill(
        <div className="col-md-4" >
            <div className="profile-card-4 ">
                <Skeleton> <img src="" alt='img' className="img img-responsive"/> </Skeleton>
                <div className="profile-content">
                    <div className="profile-name">
                        <Skeleton><p className="text-center"></p></Skeleton>
                    </div>
                    <Skeleton><div className="profile-description"></div></Skeleton>
                </div>
                <div className="read-more mb-3">
                    <Skeleton><p  className="mx-3 p-2 text-light rounded text-start" style={{ textDecoration: 'none', background: 'rgb(81, 141, 177)' }}></p></Skeleton>
                </div>
            </div>
        </div>
    )
}

export default Skeletonn