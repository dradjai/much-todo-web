import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  
 const navigate = useNavigate();

  const onFinish = async (values) => {
  
    console.log('Success:', values);
    const resp = await fetch("https://express-deploy-dr.web.app/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values)
    });
    const _user = await resp.json();
    if(_user.message !== "Registered") {
    setTimeout( () => {
      message.warning(_user.message);
    }, 0);
    return 
  }

    setTimeout( () => {
      message.success(_user.message);
    }, 0);
    navigate("/");
  
   
    
  
    
   
    

  }


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h1>Signup</h1>


  <Form className='form'
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >


    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" >
        Submit
      </Button>
    </Form.Item>
  </Form>

    </>
  )
}