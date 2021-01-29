import React, {useState} from 'react';
import Routes from '../constants/routes.js';
import {useAuth} from '../providers/Auth';
import {Menu} from 'antd';
import {LogoutOutlined, LoadingOutlined, PlusCircleOutlined, FormOutlined, NotificationOutlined, UserOutlined, MonitorOutlined} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';
import '../styles/navigation.css';

const linkStyle = {};

const Navigation = (props) => {
    let location = useLocation();

    const [menuState, setMenuState] = useState({
        current: location.pathname, // set the current selected item in menu, by default the current page
        collapsed: true,
        openKeys: []
    });
    const {isAuthenticated, isCheckingAuth, currentUser} = useAuth();

    React.useEffect(() => {
        setMenuState({
            ...menuState,
            current: location.pathname
        });
    }, [location, isAuthenticated]);

    const handleClick = (e) => {
        console.log('click ', e);
        setMenuState({
            ...menuState,
            current: e.key
        });
    };

    return (
        <>
            
           <Menu
                mode={props.mode}
                onClick={handleClick}
                className='menu'
                theme='light'
                selectedKeys={[menuState.current]}
                style={{
                    lineHeight: '64px',
                    width: 'fit-content'
                }}
            >
                <Menu.Item key={Routes.OWNERPRODUCTS}>
                    <Link to={Routes.OWNERPRODUCTS} style={linkStyle}>Productos</Link>
                    <FormOutlined/>
                </Menu.Item>

                <Menu.Item key={Routes.REGISTERPRODUCT}>
                    <Link to={Routes.REGISTERPRODUCT} style={linkStyle}>Registrar Producto</Link>
                    <PlusCircleOutlined/>
                </Menu.Item>

                <Menu.Item key={Routes.DAILYORDER}>
                    <Link to={Routes.DAILYORDER} style={linkStyle}>Órdenes Nuevas</Link>
                    <NotificationOutlined/>
                </Menu.Item>

                <Menu.Item key={Routes.ANTD}>
                    <Link to={Routes.ANTD} style={linkStyle}>ANTD</Link>
                    <MonitorOutlined/>
                </Menu.Item>

                <Menu.Item key={Routes.PROFILE}>
                    <Link to={Routes.PROFILE} style={linkStyle}>Perfil de Usuario</Link>
                    <UserOutlined/>
                </Menu.Item>
                
                <Menu.Item key={Routes.LOGIN}>
                    <Link to={Routes.LOGOUT} className='logout-link'>
                    {
                        isCheckingAuth
                        ? <LoadingOutlined/>
                        : <><LogoutOutlined/> Salir</>
                    }
                    </Link>
                 </Menu.Item>
            </Menu>.
        </>
    );
};

export default Navigation;

