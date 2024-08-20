import { useState, useEffect } from "react";
import { Card, Menu, MenuProps } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig.ts";

type Post = {
  id: string;
  avatar?: string;
  userId?: string;
  image?: string;
  content?: string;
  comments?: string[];
  likes?: number;
};

const User = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  type MenuItem = Required<MenuProps>['items'][number];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCollection);
        const postsList = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Post));
        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  console.log(posts)

  const items: MenuItem[] = [
    {
      key: '1',
      label: 'Home',
    },
    {
      key: '2',
      label: 'Search'
    },
    {
      key: '3',
      label: 'Explore'
    },
    {
      key: '4',
      label: 'Reels'
    },
    {
      key: '5',
      label: 'Profile'
    }
  ];

  return (
    <div className="flex">
      <div className="flex min-h-screen w-1/5">
        <Menu
          className="min-w-full"
          items={items}
        />
      </div>
      <div className="flex flex-col items-center min-h-screen w-4/5">
        <div className="mt-20">
          {posts.map(post => (
            <Card key={post.id} className="w-80 mb-4">
              <div className="max-w-sm rounded overflow-hidden p-4">
                <div className="flex items-center mb-4">
                  <img className="w-10 h-10 rounded-full" src={post.avatar || "https://via.placeholder.com/150"} alt="Avatar" />
                  <div className="ml-3">
                    <p className="text-sm font-semibold">{post.userId || "Unknown User"}</p>
                  </div>
                  <div className="ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>

                <img className="w-full rounded" src={ "https://via.placeholder.com/300x200"} alt="Card image" />

                <div className="py-4">
                  <p className="text-gray-700 text-sm">
                    {post.content || "No content available"}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8S2 14.418 2 10 5.582 2 10 2s8 3.582 8 8zM8 9v6h4V9H8zm-1 0h2V7H7v2zm6-2v2h-2V7h2zm2 2v6h-2V9h2z" clipRule="evenodd" />
                    </svg>
                    {
                      post.comments?.map((comment, index) => {
                        return <span key={index}>{comment || 0}</span>
                      })
                    }
                    
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-1">You & {post.likes || 0} others</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3.172 5.172a4 4 0 015.656 0l.172.171.172-.172a4 4 0 115.656 5.656l-5.656 5.657-5.656-5.657a4 4 0 010-5.656z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default User;
