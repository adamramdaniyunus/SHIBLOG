import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { stables, images } from "../../../../../constants";
import { checkComment, getAllComments } from "../../../../../services/index/comments";
import { FiRefreshCcw } from "react-icons/fi";
import { useState } from "react";

let isFirstRun = true;

const Comments = () => {
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state.user);
    const [isFetching, setIsFetching] = useState(false);


    const handleRefreshClick = () => {
        setIsFetching(true);
        queryClient.invalidateQueries(["comments"]);

        setTimeout(() => {
            setIsFetching(false)
        }, 200)
    };


    const {
        data: commentData,
        isLoading,
        refetch
    } = useQuery({
        queryFn: () => getAllComments(),
        queryKey: ["comments"]
    });

    const { mutate: mutateCheckComment, isLoading: isLoadingCheckComment } =
        useMutation({
            mutationFn: ({ id, token }) => {
                return checkComment({
                    id,
                    token,
                });
            },
            onSuccess: (data) => {
                refetch()
                toast.success("Konfirmasi Sukses!");
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
        });

    const checkHandler = ({ id, token }) => {
        mutateCheckComment({ id, token });
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold">Cek Komentar</h1>

            <div className="w-full px-4 mx-auto">
                <div className="py-8">
                    <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                        <h2 className="text-2xl leading-tight">Users</h2>
                        <div className="text-end">
                            <form
                                className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
                            >
                                <button
                                    onClick={handleRefreshClick}
                                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                                    type="button"
                                >
                                    <FiRefreshCcw />
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">

                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Avatar
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Nama
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Created at
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Comment
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading || isFetching ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-10 w-full">
                                                Loading...
                                            </td>
                                        </tr>
                                    ) : commentData?.data?.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-10 w-full">
                                                Belum ada permintaan
                                            </td>
                                        </tr>
                                    ) : (
                                        commentData?.data.map((comment) => (
                                            <tr key={comment._id}>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            <a href="/" className="relative block">
                                                                <img
                                                                    src={
                                                                        comment?.user.avatar
                                                                            ? stables.UPLOAD_FOLDER_BASE_URL +
                                                                            comment?.user.avatar
                                                                            : images.ProfileImage
                                                                    }
                                                                    alt={comment.title}
                                                                    className="mx-auto object-cover rounded-lg w-10 aspect-square"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {comment?.user.name}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {new Date(comment.createdAt).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <div className="flex gap-x-2">
                                                        {comment?.desc}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                                                    <button
                                                        disabled={isLoadingCheckComment}
                                                        type="button"
                                                        className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 disabled:cursor-none"
                                                        onClick={() => {
                                                            checkHandler({
                                                                id: comment?._id,
                                                                token: userState.userInfo?.data.token,
                                                            });
                                                        }}
                                                    >
                                                        Konfirmasi
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;
