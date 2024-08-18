import { Button, Form, FormProps, Input } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login = () => {

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Form
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
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
            <span>Don't have an account? <span className="text-blue-500 cursor-pointer">Sign up</span></span>
          </div>
        </Form>
      </div>
    </>

  )
}

export default Login