import { useState, useEffect } from "react";
import { Card, Form, Modal } from "antd";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../../../firebaseConfig.ts";
import { TbLogout, TbSquarePlus } from "react-icons/tb";
import TextArea from "antd/es/input/TextArea";
import { BsEmojiSmile } from "react-icons/bs";
import { GoComment, GoHeart, GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { PiVideoBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import Input from "antd/es/input/Input";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/slices/authSlice.ts";

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

const User = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const formData = form.getFieldsValue();
      console.log("Form Data:", formData);

      const filteredData = Object.fromEntries(
        Object.entries(formData).filter((entry) => entry[1] !== undefined)
      );

      await addDoc(collection(db, "posts"), filteredData);

      const postsCollection = collection(db, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Post));

      setPosts(postsList);
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  }

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

  return (
    <div className="flex">
      <div className="flex flex-col min-h-screen w-1/5">
        <Card className="min-h-screen">
          <div className="flex flex-col ml-5 mt-5 gap-y-4">
            <div className="flex items-center space-x-2 hover:cursor-pointer hover:text-blue-500">
              <GoHome className="w-6 h-6" />
              <span className="font-semibold">Home</span>
            </div>

            <div className="flex items-center space-x-2 hover:cursor-pointer hover:text-blue-500">
              <IoSearch className="w-6 h-6" />
              <span className="font-semibold">Search</span>
            </div>

            <div className="flex items-center space-x-2 hover:cursor-pointer hover:text-blue-500">
              <MdOutlineExplore className="w-6 h-6" />
              <span className="font-semibold">Explore</span>
            </div>

            <div className="flex items-center space-x-2 hover:cursor-pointer hover:text-blue-500">
              <PiVideoBold className="w-6 h-6" />
              <span className="font-semibold">Reels</span>
            </div>

            <div className="flex items-center space-x-2 hover:cursor-pointer hover:text-blue-500" onClick={showModal}>
              <TbSquarePlus className="w-6 h-6" />
              <span className="font-semibold">Create</span>
            </div>

            <div className="flex items-center space-x-2 hover:cursor-pointer hover:text-blue-500">
              <CgProfile className="w-6 h-6" />
              <span className="font-semibold">Profile</span>
            </div>

            <div className="flex items-center space-x-2 hover:cursor-pointer hover:text-blue-500" onClick={handleLogout}>
              <TbLogout className="w-6 h-6" />
              <span className="font-semibold">Logout</span>
            </div>

          </div>
        </Card>
      </div>
      <div className="flex flex-col items-center min-h-screen w-4/5">
        <div className="mt-20">
          {posts.map(post => (
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
          ))}
        </div>
      </div>
      <Modal
        title="Create New Post"
        open={isModalOpen}
        onOk={handleOk}
        okText="Paylaş"
        onCancel={handleCancel}
        cancelText="Vazgeç"
      >
        <Form form={form}>
          <Form.Item
            label="Image"
            name="image"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<BsEmojiSmile />}
            name="description"
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default User;
