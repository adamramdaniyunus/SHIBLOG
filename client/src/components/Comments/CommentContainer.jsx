import React, { useEffect, useState } from 'react'
import CommentForm from './CommentForm'
import Comment from './Comment'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { createNewComment, deleteComment, updateComment } from '../../services/index/comments'

const CommentContainer = ({ className, logginedUser, comments, postSlug, postId }) => {
    const userState = useSelector(state => state.user)
    const queryClient = useQueryClient()
    const [loading, setLoad] = useState(false)
    const [affectedComment, setAffectedComment] = useState(null);
    // add comment
    const { mutate: mutateNewComment, isLoading: isLoadingNewComment } = useMutation({
        mutationFn: ({ token, desc, slug, parent, replyOnUser, check }) => {
            setLoad(true)
            return createNewComment({ token, desc, slug, parent, replyOnUser, check })
        },
        onSuccess: () => {
            setLoad(false)
            toast.success("Komentar mu akan muncul!, tunggu persetujuan admin")
        },
        onError: error => {
            toast.error(error.message)
            console.log(error);
        }
    })

    // add comment handler

    const addCommentHandler = (value, parent = null, replyOnUser = null) => {
        mutateNewComment({
            desc: value,
            parent,
            replyOnUser,
            check: userState?.userInfo.data._id === postId ? true : false,
            token: userState?.userInfo.data.token,
            slug: postSlug,
        });
        setAffectedComment(null)
    }

    // edit comment

    const { mutate: mutateUpdateComment } = useMutation({
        mutationFn: ({ token, desc, commentId }) => {
            return updateComment({ token, desc, commentId })
        },
        onSuccess: () => {
            toast.success("Komen berhasil di edit!")
            queryClient.invalidateQueries(["blog", postSlug])
        },
        onError: error => {
            toast.error(error.message)
            console.log(error);
        }
    })


    // edit comment handler
    const updateCommentHandler = (value, commentId) => {
        mutateUpdateComment({
            token: userState.userInfo.data.token,
            desc: value,
            commentId,
        })
        setAffectedComment(null)
    }


    // delete comment
    const { mutate: mutateDeleteComment } = useMutation({
        mutationFn: ({ token, commentId }) => {
            return deleteComment({ token, commentId })
        },
        onSuccess: () => {
            toast.success("Komen berhasil di hapus!")
            queryClient.invalidateQueries(["blog", postSlug])
        },
        onError: error => {
            toast.error(error.message)
            console.log(error);
        }
    })

    // delete comment handler
    const deleteCommentHandler = (commentId) => {
        mutateDeleteComment({
            token: userState.userInfo.data.token,
            commentId
        })
    }


    return (
        <div className={`${className}`}>
            <CommentForm
                btnLabel={"Send"}
                formSubmitHanlder={(value) => addCommentHandler(value)}
                loading={loading}
            />
            <div className='space-y-4 mt-8'>
                {(
                    comments.map((data, index) => (
                        <Comment
                            key={index}
                            data={data}
                            logginedUser={logginedUser}
                            affectedComment={affectedComment}
                            setAffectedComment={setAffectedComment}
                            addComment={addCommentHandler}
                            updateComment={updateCommentHandler}
                            deleteComment={deleteCommentHandler}
                            replies={data.replies}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default CommentContainer
