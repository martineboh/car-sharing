import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { withRouter } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';

const { SubMenu } = Menu;
const { Header, Content} = Layout;

const menuItems = [
	{
		title: 'Home',
		key: '/'
	},
	{
		title: 'Cars',
		key: '/cars'
	},
	{
		title: 'My Bookings',
		key: '/userid/bookings'
	},
	{
		title: 'My Cars',
		key: '/userid/cars'
	}
];

class AppLayout extends Component {
	handleClick = ({ key }) => {
		const { history } = this.props;
		if (key) {
			history.push(key);
		}
	};

	getCurrentTab = () => {
		const {
			history: {
				location: { pathname }
			}
		} = this.props;
		return [pathname];
	};
	render() {
    const {user, children } = this.props;
		const currentTab = this.getCurrentTab();
		return (
			<Layout>
				<Header className="header">
					<div className="logo" />
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={currentTab}
						style={{ lineHeight: '64px' }}
						onClick={this.handleClick}
					>
						<Menu.Item key="/">Home</Menu.Item> 
            <Menu.Item key="/cars">Cars</Menu.Item>

            {user? <Menu.Item key="/userid/bookings">My Bookings</Menu.Item> : null}
            {user? <Menu.Item key="/userid/cars">My Cars</Menu.Item> : null }
           
            {user? 
            <SubMenu style={{float: 'right'}} title={user ? user.emails[0].address : ""}>
              <Menu.Item key="/logout">Logout</Menu.Item>
            </SubMenu> :
            <Menu.Item style={{float: 'right'}} key="/login">Login</Menu.Item>
          }
					</Menu>
				</Header>
				<Layout>
					<Layout style={{ padding: '0 24px 24px' }}>
						<Content
							style={{
								background: '#fff',
								padding: 24,
								margin: 0,
								minHeight: 280
							}}
						>
							{children}
						</Content>
					</Layout>
				</Layout>
			</Layout>
		);
	}
}

export default withRouter(withTracker(() => {
  return {
    user: Meteor.user()
  }
})(AppLayout));
