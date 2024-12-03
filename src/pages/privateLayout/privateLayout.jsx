import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Suspense } from 'react';
import { Button, Col, Row, Layout, Menu, notification, Spin } from 'antd';
import { MenuOutlined, AppstoreOutlined, UserAddOutlined } from '@ant-design/icons';
import { FiLogOut } from 'react-icons/fi';
import profile from '../../assert/Image/profile.jpg';
import { connect } from 'react-redux';
import { userLogout } from '../../redux/actionCreate';
import { PrivateRoutes } from "./privateRouter"; 

class Private_Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false, 
        };
    }

    // Toggle collapse
    toggleCollapse = () => {
        this.setState(prevState => ({ collapsed: !prevState.collapsed }));
    };

    // Handle logout
    handleLogout = () => {
        this.props.userLogout(); 
        notification.success({
            message: "Logout",
            description: "Logout successfully!",
        });
        window.location.href = "/"; 
    };

    // Menu
    handleMenuClick = (e) => {
        window.location.href = e.key; 
    };

    render() {
        const { Profile } = this.props; 
        const { collapsed } = this.state;
        const { Header, Sider } = Layout;

        return (
            <Layout className="layout">
                {/* Sidebar */}
                <Sider className="sider" width={270} trigger={null} collapsible collapsed={collapsed}>
                    <Row>
                        {!collapsed && (
                            <>
                                <Col span={6}>
                                    <img src={profile} className="profile" alt="profile" width={60} />
                                </Col>
                                <Col span={12} className="user">
                                    <h5 className="profile-name">
                                        {Profile.first_name} {Profile.last_name}
                                    </h5>
                                    <p className="profile-email">{Profile.email}</p>
                                </Col>
                            </>
                        )}
                        <Col span={4}>
                            <Button
                                className="burger-btn"
                                type="text"
                                icon={<MenuOutlined />}
                                onClick={this.toggleCollapse}
                            />
                        </Col>
                    </Row>

                    {/* Menu */}
                    <Menu
                        theme="dark"
                        className="menu"
                        onClick={this.handleMenuClick}
                        mode="inline"
                        defaultSelectedKeys={['/dashboard']}
                        items={[
                            {
                                key: '/dashboard',
                                icon: <AppstoreOutlined />,
                                label: 'Dashboard',
                            },
                            {
                                key: '/addUser',
                                icon: <UserAddOutlined />,
                                label: 'Add User',
                            },
                        ]}
                    />

                    {/* Logout Button */}
                    <Button
                        block
                        icon={<FiLogOut />}
                        className="logout-btn"
                        onClick={this.handleLogout}
                    >
                        Logout
                    </Button>
                </Sider>

                {/* Main Content */}
                <Layout className="layout">
                    <Routes>
                        {PrivateRoutes.map((route, index) => {
                            const Component = route.component;
                            return (
                                <Route
                                    key={`route-${index}`}
                                    path={route.path}
                                    element={
                                        <Suspense
                                            fallback={
                                                <Row justify="center" style={{ lineHeight: "697px" }}>
                                                    <Col>
                                                        <Spin size="large" />
                                                    </Col>
                                                </Row>
                                            }
                                        >
                                            <Component />
                                        </Suspense>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Layout>
            </Layout>
        );
    }
}

// useSelector alter in class component
const mapStateToProps = (state) => ({
    Profile: state.token.data,
});

// dispatch alter in class component
const mapDispatchToProps = (dispatch) => ({
    userLogout: () => dispatch(userLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Private_Layout);
