import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Col, Row, notification } from 'antd';
import { Link } from "react-router-dom";
import { redirect } from "react-router";
import axios from 'axios';


// const Register = () => {
//   const navigate = useNavigate();

//   //Register
//   const onFinish = (values) => {
//     (async () => {
//       const rawResponse = await fetch('https://admin-app-bdsu.onrender.com/api/v1/admin/new', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           first_name: values.first_name,
//           last_name: values.last_name,
//           email: values.email,
//           password: values.password
//         })
//       });
//       const content = await rawResponse.json();

//       //Register success notification
//       if (content.success) {
//         notification.success({
//           message: "Register Success",
//           description:
//             "Please login now",
//         })
//         navigate("/")
//       }

//       //Error message notification
//       else {
//         notification.error({
//           message: "Error",
//           description: "User already exist!",
//         })
//       }
//     })();
//   };
// };


class Register extends React.Component {
  constructor() {
    super();
  }
  //Register
  handleFinish = (values) => {
    (async () => {
      const rawResponse = await axios.post('http://node.mitrahsoft.co.in/register', {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
      }, {
        headers: { 'Content-Type': 'application/json' }
      })

      //Register success notification
      if (rawResponse.data === "Admin created successfully") {
        notification.success({
          message: "Register Success",
          description:
            "Please login now",
        })
        // navigate("/")
        window.location.href = "/";
      }

      //Error message notification
      else {
        notification.error({
          message: "Error",
          description: "User already exist!",
        })
      }
    })();
  };


  render() {
    return (
      <>
        <Row justify={"center"}>
          <Col span={22}>
            <Form className='register' layout="vertical"
              onFinish={(values) => this.handleFinish(values)}
            >
              <h1>REGISTER</h1>

              <Form.Item
                label="First Name"
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your first name!',
                  },
                  {
                    pattern: /^[A-Za-z\\s]+$/,
                    message: "first name should contain only aplhabets"
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your last name!',
                  },
                ]}

              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your first name!',
                  },
                  {
                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'Please enter valid email!',
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
                  {
                    pattern: /^[a-zA-Z0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{5,}$/,
                    message: 'Password should contain atleast 5 digits'
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirm_password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    pattern: /^[a-zA-Z0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{6,}$/,
                    message: 'Password should contain atleast 6 digits'
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Button className='submit-btn' type="primary" htmlType="submit"   >Submit</Button>

              <p className='sign-in-btn'>Already have an account?<a href='/'>Sign in</a></p>

            </Form>
          </Col>
        </Row>
      </>
    )
  }
}
export default Register;