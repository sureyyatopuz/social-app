import { useState, useEffect } from "react";
import { Card, Form, Menu, MenuProps, Modal, Upload } from "antd";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../../../firebaseConfig.ts";
import { TbPlus, TbSquarePlus } from "react-icons/tb";
import TextArea from "antd/es/input/TextArea";
import { UploadChangeParam } from "antd/es/upload";
import { BsEmojiSmile } from "react-icons/bs";

type Post = {
  id: string;
  avatar?: string;
  userId?: string;
  image?: string;
  content?: string;
  comments?: string[];
  likes?: number;
};

type MenuItem = Required<MenuProps>['items'][number];

const User = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const normFile = (e: UploadChangeParam) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const formData = form.getFieldsValue(); 
      console.log("Form Data:", formData);

      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== undefined)
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



  const items: MenuItem[] = [
    {
      key: '1',
      label: 'Home',
    },
    {
      key: '2',
      label: 'Search',
    },
    {
      key: '3',
      label: 'Explore',
    },
    {
      key: '4',
      label: 'Reels',
    },
    {
      key: '5',
      label: 'Create',
      icon: <TbSquarePlus />,
      onClick: showModal,
    },
    {
      key: '6',
      label: 'Profile',
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

                <img className="w-full rounded" src={"https://via.placeholder.com/300x200"} alt="Card image" />

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
                    {post.comments?.map((comment, index) => (
                      <span key={index}>{comment || 0}</span>
                    ))}
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
            label="Upload"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <TbPlus />
              <div style={{ marginTop: 8 }}>Upload</div>
            </Upload>
          </Form.Item>
          <Form.Item
            label={<BsEmojiSmile />}
            name="content"
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default User;
