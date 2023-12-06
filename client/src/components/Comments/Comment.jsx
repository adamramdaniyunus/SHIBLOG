import React from 'react'
import { images, stables } from '../../constants'
import { FiMessageSquare, FiEdit2, FiTrash } from 'react-icons/fi'
import CommentForm from './CommentForm'
import CommentReplies from './CommentReplies'

const Comment = ({
    data,
    logginedUser,
    affectedComment,
    setAffectedComment,
    addComment,
    parentId = null,
    updateComment,
    deleteComment,
    replies
}) => {
    const isUserLoggedIn = Boolean(logginedUser)
    const commentBelongsToUser = logginedUser === data?.user._id

    const isReplying =
        affectedComment
        && affectedComment.type === "replying"
        && affectedComment._id === data?._id
    const isEditing =
        affectedComment
        && affectedComment.type === "editing"
        && affectedComment._id === data?._id

    const repliedCommentId = parentId ? parentId : data?._id
    const replyOnUserId = data.user._id

    return (
        <div className='flex flex-nowrap items-start gap-x-3 bg-[#f2f4f5] p-3 rounded-lg'>
            <img
                src={data.user.avatar ? stables.UPLOAD_FOLDER_BASE_URL + data.user.avatar : images.ProfileImage}
                alt="user profile"
                className='w-9 h-9 object-cover rounded-full'
            />
            <div className='flex-1 flex flex-col'>
                <h5 className='font-bold text-dark'>
                    {data.user.name}
                </h5>
                <span className='text-xs text-[#959ead]'>
                    {new Date(data.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit"
                    })}
                </span>

                {!isEditing && (
                    <p className="font-opensans text-[#959ead] mt-[10px]">
                        {data.desc}
                    </p>
                )}

                {isEditing && (
                    <CommentForm
                        btnLabel={"Update"}
                        formSubmitHanlder={(value => updateComment(value, data._id))}
                        formCancelHanlder={() => setAffectedComment(null)}
                        initialText={data.desc}
                    />
                )}
                <div className='flex items-center gap-x-3 text-[#959ead] font-roboto text-sm my-3'>
                    {isUserLoggedIn && (
                        <button className='flex items-center space-x-2'
                            onClick={() => setAffectedComment({ type: "replying", _id: data._id })}
                        >
                            <FiMessageSquare className='w-4 h-auto' />
                            <span>Reply</span>
                        </button>
                    )}
                    {
                        commentBelongsToUser && <>
                            <button className='flex items-center space-x-2'
                                onClick={() => setAffectedComment({ type: "editing", _id: data._id })}
                            >
                                <FiEdit2 className='w-4 h-auto' />
                                <span>Edit</span>
                            </button>
                            <button className='flex items-center space-x-2' onClick={() => deleteComment(data._id)}>
                                <FiTrash className='w-4 h-auto' />
                                <span>Delete</span>
                            </button></>
                    }
                </div>
                {isReplying && <CommentForm
                    btnLabel={"reply"}
                    formSubmitHanlder={value => addComment(value, repliedCommentId, replyOnUserId)}
                    formCancelHanlder={() => setAffectedComment(null)}
                />}

                {replies.length > 0 && (
                    <div>
                        {replies.map((reply, index) => (
                            <CommentReplies
                                key={index}
                                addComment={addComment}
                                affectedComment={affectedComment}
                                setAffectedComment={setAffectedComment}
                                data={reply}
                                deleteComment={deleteComment}
                                logginedUser={logginedUser}
                                replies={replies}
                                updateComment={updateComment}
                                parentId={data._id}
                            />
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default Comment
