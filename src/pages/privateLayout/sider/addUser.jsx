import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row, Layout, Image, Form, Input, Select, Radio, notification } from 'antd';
import { IoIosSend } from "react-icons/io";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import withRouter from './addUserWithRouter';


class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile_img: null,
            baseImage: null,
            imageUrl: null,
            editUser: null,
            gender: 'male',
            loading: false,
        };
        this.formRef = React.createRef();
    }

    //radio btn
    onChange = (e) => {
       (e.target.value);
    };


    // Handle file input changes
    handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        this.setState({ profile_img: file });
        const base64Image = await this.getBase64(file);
        this.setState({ baseImage: base64Image });
    };

    getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    // Upload image
    // Upload = async () => {
    //     const data = new FormData();
    //     data.append('file', file);
    //     try {
    //         const response = await axios.post('https://admin-app-bdsu.onrender.com/image/uploads',
    //             data,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                     'Authorization': `Bearer ${this.props.token}`
    //                 },
    //             }
    //         );
    //         setImageUrl(response.data.url)

    //         if (setImageUrl) {
    //             notification.success(
    //                 {
    //                     message: "Success",
    //                     description: " Image Uploaded !",
    //                 }
    //             )
    //         };
    //     }

    //     catch (e) {
    //         console.log("error", e)
    //     }
    // }

    componentDidMount() {
        this.fetchUserData();
    }


    // fetchUserData = async () => {
    //     const { id } = this.props.params;
    //     console.log(this.props.form)
    //     if (id) { 
    //         try {
    //             const response = await axios.get(`http://node.mitrahsoft.co.in/user/${id}`,{
    //                 headers: {
    //                     Authorization: `Bearer ${this.props.token}`,
    //                 },
    //             });
    //             this.setState({ editUser: response.data.recordset });
    //             console.log("edit",editUser)
    //         }
    //          catch (error) {
    //             console.error('Failed to fetch user data', error);
    //         }
    //     }
    // };

 

    // // submit
    fetchUserData = async () => {
        const { id } = this.props.params;
        console.log("fsdAFASFD",this.props.form)
        if (id) { 
            try {
                const response = await axios.get(`http://node.mitrahsoft.co.in/users`,{
                    headers: {
                        Authorization: `Bearer ${this.props.token}`,
                    },
                });

                this.setState({ editUser: response.data.recordset });
                console.log("edit",response.data.recordset);  
                this.setFormValues();
            }
             catch (error) {
                console.error('Failed to fetch user data', error);
            }
        }
    };

    // setFormValues = (editUser) => {
     
    //         this.formRef.current.setFieldsValue({
    //             first_name: localStorage.getItem(name) || '',
    //             // last_name: editUser.name || '',
    //             // gender: editUser.gender || '',
    //             // job: editUser.job || '',
    //         });
    
    // };

    setFormValues=()=>{
       this. formRef.current.setFieldsValue({
            first_name: localStorage.getItem('fname'),
            last_name: localStorage.getItem('lname'),
            gender: localStorage.getItem('gender'),
          //profile_img:localStorage.getItem('image'),
            job:localStorage.getItem('job')

    })
    } 
        // last_name: edit.last_name,
        // email: edit.email,
        // gender: edit.gender,
        // role: edit.role,
        // state: edit.state,
        // country: edit.country,
        // city: edit.city,
        // address: edit.address




    
    
    handleFormSubmit = async (values) => {
            const { id } = this.props.params;
            const imageUrl = this.state.baseImage
            // ? await this.Upload : this.state.editUser?.imageUrl;
            const requestData = {
                name: `${values.first_name} ${values.last_name}`,
                gender: values.gender,
                job: values.job,
                profile_img:imageUrl,
            };
         
            try {
                this.setState({ loading: true });
                let response;
                if (id) {
                    response = await axios.put(`http://node.mitrahsoft.co.in/user/${id}`, requestData,
                        {
                        headers: { Authorization: `Bearer ${this.props.token}` },
                    });
                  
                    notification.success({ message: 'User updated successfully!' });
                    
                } 
                
                
                else {
                    response = await axios.post('http://node.mitrahsoft.co.in/user', requestData, {
                        headers: { Authorization: `Bearer ${this.props.token}` },
                    });
                    notification.success({ message: 'User added successfully!' });
                }

                if (response.data) {
                   this.props.navigate('/dashboard');
                }

            } catch (error) {
                notification.error({ message: 'Something went wrong!' });
                console.error('Error while saving user:', error);
            } 
            finally {
                this.setState({ loading: false });
            }
        };


        render() {
            const { editUser, baseImage } = this.state;
            const { id } = this.props.params;
            console.log("ddd",id)
            const { Header, Content } = Layout;
            const { TextArea } = Input;
            const img ={id} ? false : true;
           console.log("img",img)
            return (
                <Layout className="addUser_layout">
                    <Header style={{ paddingLeft: 30, backgroundColor: '#181818', color: 'white' }}>
                        <h1>{id ? 'EDIT USER' : 'ADD USER'}</h1>
                    </Header>

                    <Content style={{ padding: 24, minHeight: 280, backgroundColor: '#2E2E2E' }}>
                        <Form  ref={this.formRef}  className="addUser_form" layout="vertical" onFinish={this.handleFormSubmit}>
                       
                        <Row  >
                            <Col span={10} >
                                <Form.Item className='input_field'
                                    label={<label style={{ color: "white" }}>First Name</label>}
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
                            </Col>

                            <Col span={10} offset={4}>
                                <Form.Item className='input_field'
                                    label={<label style={{ color: "white" }}>Last Name</label>}
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
                            </Col>

                        </Row>

                            <Row>

                            <Form.Item className='input_field'
                                    label={<label style={{ color: "white" }}>Gender</label>}
                                    name="gender"
                                    rules={[{
                                        required: true,
                                        message: 'Please select gender!',
                                    }
                                    ]}>
                                    <Radio.Group onChange={this.onChange}  >
                                        <Radio value={'male'}  ><p className='radio'>Male</p>  </Radio>
                                        <Radio value={'female'}><p className='radio'>Female </p> </Radio>
                                    </Radio.Group>
                                </Form.Item>
                               

                                <Col span={10} offset={10}>
                                    <Form.Item className='input_field'
                                      label={<label style={{ color: "white" }}>Image</label>}
                                     name="file"
                                     rules={[{
                                        //required: true,
                                        message: 'Please upload image!',
                                    }
                                    ]}
                                     >
                                        <input type="file" onChange={this.handleFileInputChange} />
                                    </Form.Item>
                                </Col>

                                <Col span={2} >
                                    {baseImage && <Image width={80} src={baseImage} />}
                                    {editUser && !baseImage && <Image width={80} src={localStorage.getItem('image')} />}
                                </Col>
                              

                            </Row>

                            <Row>
                            <Col span={10} >
                                <Form.Item className='input_field'
                                    label={<label style={{ color: "white" }}>Role</label>}
                                    name="job"
                                    rules={[{
                                        required: true,
                                        message: 'Please select your role!',
                                    }
                                    ]} >
                                    <Select className='input_field'>
                                        <Select.Option value="frontend">Front End</Select.Option>
                                        <Select.Option value="backend">Back End</Select.Option>
                                        <Select.Option value="hr">HR</Select.Option>
                                        <Select.Option value="BDE">BDE</Select.Option>
                                        <Select.Option value="fullstack">Full Stack</Select.Option>
                                    </Select>
                                </Form.Item>
                                </Col>
                                {/* <Col span={24} >
                                    <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter address!' }]}>
                                        <TextArea rows={5} value={editUser ? editUser.address : ''} />
                                    </Form.Item>
                                </Col> */}
                            </Row>


                            <Row >
                                <Col span={6} >
                                </Col>

                                <Col span={24}>
                                    <Button className='submit-addUser' type="primary" htmlType="submit" >Submit <IoIosSend /></Button>
                                </Col>

                            </Row>
                        </Form>
                    </Content>
                </Layout>
            );
        }
    }


    const mapStateToProps = (state) => ({
        token: state.token.data.token,
    });

export default connect(mapStateToProps)(withRouter(AddUser));
