import React from 'react';
import { userLogin } from '../../redux/actionCreate'
import '../register/register';
import { Button, Form, Input, notification, Col, Row } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

// const Login = () => {
//     const dashboardNavigate = useNavigate();
//     const dispatch = useDispatch();

//     //Login User
//     const onFinish = (values) => {
//         (async () => {
//             const rawResponse = await fetch('https://admin-app-bdsu.onrender.com/api/v1/admin/login', {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: values.email,
//                     password: values.password,
//                 })
//             });
//             const content = await rawResponse.json();

//             if (content.success) {
//                 const value = content.data;

//                 //Login success notification !
//                 notification.success(
//                     {
//                         message: "Login Success",
//                         description:
//                             "Welcome  !",
//                     }
//                 )
//                 dispatch(userLogin(value))
//                 dashboardNavigate("/dashboard")
//             }
//             //Error message notification !
//             else {
//                 notification.error({
//                     message: "Error",
//                     description:
//                         "Need to create an account",
//                 })
//             }
//         })();
//     };


// }

class Login extends React.Component {
    constructor() {
        super();
    }

    //Login User
    handleFinish = (values) => {
        (async () => {
            try {
                const rawResponse = await axios.post(' http://node.mitrahsoft.co.in/login', {
                    email: values.email,
                    password: values.password,
                },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                console.log("Login", rawResponse)

                if (rawResponse.data.token) {
                    const value = rawResponse.data;
                    //Login success notification !
                    notification.success(
                        {
                            message: "Login Success",
                            description:
                                "Welcome  !",
                        }
                    )
                    // dispatch(userLogin(value))
                    this.props.dispatch(userLogin(value));

                     dashboardNavigate("/dashboard")
                   // window.location.href = "/dashboard";
                }
            }

            catch (e) {
                console.log("error", e)
                //Error message notification !
                notification.error({
                    message: "Error",
                    description:
                        "Need to create an account",
                })
            }
        })();
    }

    render() {
        return (
            <>
                <Row justify="center" >
                    <Col span={7} >
                        <Form className='login' layout='vertical'
                            onFinish={(values) => this.handleFinish(values)}>
                            <h1>Login</h1>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
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

                                ]} hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            {/* <a href="" className='forget_password'>Forget password?</a> */}

                            <Button className='submit-btn' type="primary" htmlType="submit">Submit</Button>

                            <p className='sign-up'>Don't have an account?<a href='/register'> sign up</a></p>
                        </Form>
                    </Col>
                </Row>
            </>
        )
    }
}

//const dispatch = useDispatch();
const mapDispatchToProps = (dispatch) => {
    return {
        userLogin: () => dispatch(userLogin(value))
    }
};

export default connect(mapDispatchToProps)(Login);