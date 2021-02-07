import React from 'react'

import './chat-skeleton.css'

const ChatSkeleton =()=>(
    <div className="skeleton">
        <div className="skeleton_avatar"></div>
        <div className="skeleton_author"></div>
        <div className="skeleton_details"></div>
    </div>
)

export default ChatSkeleton