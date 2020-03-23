import React, { useState, useGlobal } from "reactn";
import axios from "axios";
import FBox from 'fbox'
import { Form, Input, Button, Checkbox } from 'antd'
import { setUserSession } from "../../utils/common";
import styled from "styled-components"

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* background-color: red; */
  height: 100vh;
`

const TestDiv = styled.div`
  width: 70vh;
  height: 90vh;
  margin: 2%;
  background-color:blue;
`

const Text = styled.div`
  padding-top: 5vh;
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bolder;
`

const Test = styled.div`
  margin-top: 5vh;
  background-color:rgba(100,255,255, 0.4);
  width: 40vw;
  /* display: flex;
  justify-content:center;
  .span {
    margin-right: 10%;
  } */
`

const StyleForm = styled(Form)`
  margin: 2%;
`

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [globalUser, setGlobalUser] = useGlobal('user')

  const username = useFormInput("");
  const password = useFormInput("");

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post("http://localhost:4000/v1/login", {
        username: username.value,
        password: password.value
      })
      .then(response => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        props.history.push("/dashboard");
      })
      .catch(error => {
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  const onFinish = values => {
    setLoading(true);
    axios
      .post("http://localhost:4000/v1/login", {
        username: values.username,
        password: values.password
      })
      .then(response => {
        const {token, user} = response.data;
        setLoading(false);
        setUserSession(token, user);
        setGlobalUser(user);
        props.history.push("/dashboard");
      })
      .catch(error => {
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
      <FlexDiv>
        <Test>
         <Text>Log In</Text>
        <StyleForm
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </StyleForm>
        </Test>
        
        {/* <TestDiv>

      <Test>Log In</Test>
      <Test>
        <span>Username</span>
        <input type="text" {...username} autoComplete="new-password" />
      </Test>

        </TestDiv> */}
      {/* Login
      <br />
      <br />
      <div>
        Username
        <br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password
        <br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <br />
      <input
        type="button"
        value={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
      <br /> */}
      </FlexDiv>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange
  };
};

export default Login;
