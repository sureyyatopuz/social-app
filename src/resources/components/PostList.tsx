import { Card } from 'antd'
import { GoComment, GoHeart } from 'react-icons/go'

type Post = {
    id: string;
    avatar?: string;
    userId?: string;
    image?: string;
    content?: string;
    comments?: string[];
    like?: number;
    time: string;
    description: string;
    commentIds: string[]
};

type PostListProps = {
    posts: Post[];
};

const PostList = ({ posts }: PostListProps) => {

    return (
        <>
            {
                posts.map(post => (
                    <Card key={post.id} className="w-[465px] mb-4 border-none shadow-none">
                        <div className="">
                            {/* Header */}
                            <div className="flex items-center mb-4">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={post.avatar || "https://via.placeholder.com/150"}
                                    alt="Avatar"
                                />
                                <div className="ml-3">
                                    <p className="text-sm font-semibold">{post.userId || "Unknown User"}</p>
                                    <p className="text-xs text-gray-500">{post.time || "1d"}</p>
                                </div>
                                <div className="ml-auto">
                                    <span className="font-extrabold">...</span>
                                </div>
                            </div>

                            {/* Image */}
                            <img
                                className="w-full rounded"
                                src={post.image || "https://via.placeholder.com/300x200"}
                                alt="Card image"
                            />

                            {/* Footer */}
                            <div className="py-4">
                                <div className="flex justify-between items-center text-gray-600">
                                    <div className="flex items-center">
                                        <GoHeart className="h-5 w-5 mr-2" />
                                        <span>{post.like || 0} likes</span>
                                    </div>
                                    <div className="flex items-center">
                                        <GoComment className="h-5 w-5 text-gray-500 mr-2" />
                                        <span>{post.commentIds?.length || 0} comments</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <span>{post.description}</span>
                                </div>
                                <div className="mt-4">
                                    <span className="text-gray-500 text-xs">
                                        View all {post.comments?.length || 0} comments
                                    </span>
                                </div>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        className="w-full border-none outline-none text-sm text-gray-700"
                                        placeholder="Add a comment..."
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                ))
            }
        </>

    )
}

export default PostList