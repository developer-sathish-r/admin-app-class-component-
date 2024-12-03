import React from 'react';
import { Button, Col, Row, Layout, notification, Popconfirm, Segmented, Divider, Table, Tag, Modal, Badge, Card, Space } from 'antd';
import { GoPeople } from "react-icons/go";
import { MdOutlineSpaceDashboard, MdOutlineMale, MdOutlineFemale } from "react-icons/md";
import { BsStack, BsFillPersonCheckFill } from "react-icons/bs";
import { LuDollarSign, LuServer, LuUser } from "react-icons/lu";
import { SlSocialLinkedin } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import axios from 'axios';
import { connect } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
import withRouter from './addUserWithRouter';
import { RxDashboard } from 'react-icons/rx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllUsersData: [],
      male: [],
      female: [],
      frontend: [],
      backend: [],
      hr: [],
      bde: [],
      fullstack: [],
      card: 'User_Card', 
      isModalOpen: false,
      modelDetails: null, 
      Token: ''
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  
  getUserData = () => {
    const { Token } = this.props;
    axios.get('http://node.mitrahsoft.co.in/users', {
      headers: { Authorization: `Bearer ${Token}` }
    })
    .then((response) => {console.log(response.data.recordset)
      const data = response.data.recordset;
      console.log("data",data)
      this.setState({
        AllUsersData: data,
        male: data.filter(user => user.gender === 'male'),
        female: data.filter(user => user.gender === 'female'),
        frontend: data.filter(user => user.job === 'frontend'),
        backend: data.filter(user => user.job === 'backend'),
        hr: data.filter(user => user.job === 'hr'),
        bde: data.filter(user => user.job === 'BDE'),
        fullstack: data.filter(user => user.job === 'fullstack')
      });
    })
    .catch((error) => console.error('Error fetching user data:', error));
  };

  // Toggle for Card and Table
  handleToggle = (value) => {
    this.setState({ card: value });
  };

  // Show modal 
  showModal = (user) => {
    this.setState({ modelDetails: user, isModalOpen: true });
    //'console.log("mari",user)

    
  };

  handleOk = () => {
    this.setState({ isModalOpen: false });
  };

  handleCancel = () => {
    this.setState({ isModalOpen: false });
  };

  // Delete a user
  deleteUser = async (id) => {
    const { Token } = this.props;
    try {
      const response = await axios.delete(`http://node.mitrahsoft.co.in/user/${id}`, {
        headers: { Authorization: `Bearer ${Token}` }
      });
      notification.success({ message: 'User deleted successfully' });
      this.getUserData();
    } catch (error) {
      console.error('Error deleting user:', error);
      notification.error({ message: 'Failed to delete user' });
    }
  };

  // Edit user
  editUser = (user) => {
    this.props.navigate(`/edit/${user.id}`);
    localStorage.setItem("fname",(user.name.split(' ')[0]))
    localStorage.setItem("lname",(user.name.split(' ')[1]))
    localStorage.setItem("gender",user.gender)
    localStorage.setItem("job",user.job)
    localStorage.setItem("image",user.profile_picture)
  };

  render() {
    const { AllUsersData, male,female,frontend, backend, hr, bde, fullstack, card, isModalOpen, modelDetails } = this.state;
    const { Header, Content } = Layout;

    // Count total users
    const total = male.length + female.length;
   // console.log("dafdad",this.props)
    return (
      <>
        <Header style={{ paddingLeft: 30, backgroundColor: '#181818', color: 'white' }}>
          <h1 style={{ margin: 0 }}>DASHBOARD</h1>
        </Header>

        <Content style={{ padding: 24, minHeight: 280, backgroundColor: 'black' }}>
          <Row className='card-row' gutter={[16, 16]}>
            <Col span={6}>
              <Card bordered={false} className='card'>
                <Row justify="space-around">
                  <span className='logo'><GoPeople /></span>
                  <span className='count'>{total}</span>
                </Row>
                <span className='value'>Total Users</span>
              </Card>
            </Col>

            {/*  Dashboard Cards  */}
            {[{ label: 'Male', count: male.length, icon: <LuUser /> },
              { label: 'Female', count: female.length, icon: <LuUser /> },
               { label: 'Front End', count: frontend.length, icon: <MdOutlineSpaceDashboard /> },
               { label: 'Back End', count: backend.length, icon: <LuServer /> },
               { label: 'HR', count: hr.length, icon: <SlSocialLinkedin /> },
               { label: 'BDE', count: bde.length, icon: <LuDollarSign /> },
               { label: 'Full Stack', count: fullstack.length, icon: <BsStack /> }]
              .map((cardData, index) => (
                <Col span={6} key={index}>
                  <Card bordered={false} className='card'>
                    <Row justify="space-around">
                      <span className='logo'>{cardData.icon}</span>
                      <span className='count'>{cardData.count}</span>
                    </Row>
                    <span className='value'>{cardData.label}</span>
                  </Card>
                </Col>
              ))}
          </Row>

          <Divider style={{ borderColor: '#2b2b2b' }} />

          <Row justify="space-between" className='toggle'>
            <h1 className='users'>USERS</h1>
            <Segmented
              className='toggle-btn'
              selected={card}
              options={[
                { value: 'User_Card', icon: <RxDashboard /> },
                { value: 'User_Table', icon: <MdOutlineSpaceDashboard /> }
              ]}
              onChange={this.handleToggle}
            />
          </Row>

        
          {card === 'User_Card' ? (
            <Space size={[16, 16]} wrap>
              {AllUsersData.map((user) => (
                <Card className='user-card-row' key={user.id}>
                  <Row justify='center'>
                    <img
                      src={user.profile_picture}
                      onClick={() => this.showModal(user)}
                      className='user-profile'
                      alt="profile"
                      width={60}
                      height={60}
                    />
                  </Row>
                  <Row justify='center'>
                    <p className='user-card-data-name'>{user.name} 
                      {/* {user.last_name} */}
                      </p>
                  </Row>
                  {/* <Row justify='center'>
                    <p className='user-card-data-email' style={{ fontSize: '13px' }}><u>{user.email}</u></p>
                  </Row> */}
                  <Row justify="space-around" className='card-btn'>
                    <Button onClick={() => this.editUser(user)} className='user-logo-edit'><FiEdit /></Button>
                    <Popconfirm
                      title="Delete the user"
                      description="Are you sure to delete this User?"
                      onConfirm={() => this.deleteUser(user.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button className='user-logo-delete'><RiDeleteBinLine /></Button>
                    </Popconfirm>
                  </Row>
                </Card>
              ))}
            </Space>
          ) : (
            <Table dataSource={AllUsersData}>
              <Col title="Name" dataIndex="name" key="name" />
              {/* <Col title="Email" dataIndex="email" key="email" /> */}
              {/* <Col title="Address" dataIndex="address" key="address" /> */}
              <Col
                title="Gender"
                dataIndex="gender"
                key="gender"
                render={(gender) => (
                  <Tag color={gender === 'male' ? 'purple' : 'pink'}>
                    {gender.toUpperCase()}
                  </Tag>
                )}
              />
              <Col title="Role" dataIndex="job" key="job" />
              <Col
                title="Action"
                render={(text, user) => (
                  <Row justify="space-around">
                    <Button onClick={() => this.editUser(user)} className='user-logo-edit'><FiEdit /></Button>
                    <Button onClick={() => this.deleteUser(user.id)} className='user-logo-delete'><RiDeleteBinLine /></Button>
                  </Row>
                )}
              />
            </Table>
          )}

           {/* Modal view */}
          <Modal
            open={isModalOpen}
            onCancel={this.handleCancel}
            footer={null}
            className='model'
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
          >
            <p className='userModel'>
              {modelDetails?.name}
               {/* {modelDetails?.last_name} */}
              <Tag className='tagName' color="#626AC8">
                <BsFillPersonCheckFill /> {modelDetails?.job?.toUpperCase()}
              </Tag>
            </p>
            <Badge.Ribbon text={modelDetails?.gender === 'male' ? <MdOutlineMale /> : <MdOutlineFemale />} color={modelDetails?.gender === 'male' ? 'purple' : 'pink'}>
              <Card className='user-card-row-model'>
                <img src={modelDetails?.profile_picture} alt="profile" width={90} height={90} />
                <p>Name: {modelDetails?.name}</p>
                <p>Gender: {modelDetails?.gender}</p>
                <p>Job: {modelDetails?.job}</p>
                <Row justify="space-between">
                  <Button onClick={() => this.editUser(modelDetails)} className='user-logo-edit-model'><FiEdit /> Edit</Button>
                  <Popconfirm
                    title="Delete the user"
                    description="Are you sure to delete this User?"
                    onConfirm={() => this.deleteUser(modelDetails?.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button className='user-logo-delete-model'><RiDeleteBinLine /> Delete</Button>
                  </Popconfirm>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Modal>

        </Content>
      </>
    );
  }
}

const mapStateToProps = state => ({
  Token: state.token.data.token
});

export default connect(mapStateToProps)(withRouter(Dashboard));
