import { Button, Form, FormProps, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../../firebaseConfig";

type FieldType = {
    email: string;
    password: string;
};

const SignUp = () => {

    // const auth = getAuth();

    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
     const user = await signUp(values)
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
                        </div>}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="flex w-full">
                            Sign Up
                        </Button>
                    </Form.Item>
                    <div className="flex justify-center">

                    </div>
                    <div className="flex justify-center mt-4">
                        <span>Have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>Log in</span></span>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default SignUp