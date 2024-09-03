import { Button, Form, FormProps, Input } from "antd";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

type FieldType = {
  email: string;
  password: string;
  remember?: string;
};

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const auth = getAuth();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("Login Successful");
        // ...
      })
      .catch((error) => {
        toast.error(error.message);
      });

    const user = {
      ...values,
    };
    dispatch(loginUser(user));
    toast.success("Login Successful");

  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <Form
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label={<div className="flex justify-between">
              <span>Password</span>
              <span className="text-blue-500 cursor-pointer">Forgot Password?</span>
            </div>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="flex w-full">
              Log in
            </Button>
          </Form.Item>
          <div className="flex justify-center">

          </div>
          <div className="flex justify-center mt-4">
            <span>Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/signup")}>Sign up</span></span>
          </div>
        </Form>
      </div>
    </>

  )
}

export default Login