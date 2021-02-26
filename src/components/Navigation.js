import React, {useState} from 'react';
import Routes from '../constants/routes.js';
import {useAuth} from '../providers/Auth';
import {Menu} from 'antd';
import {LogoutOutlined, LoadingOutlined, PlusCircleOutlined, FormOutlined, NotificationOutlined, UserOutlined, MonitorOutlined} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';
import '../styles/navigation.css';
import {
    IonList,
    IonListHeader,
    IonNote,
  } from '@ionic/react';

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
                <IonListHeader>{currentUser.name}</IonListHeader>
                <IonNote>{currentUser.email}</IonNote>

                <Menu.Item key={Routes.OWNERPRODUCTS} icon={<FormOutlined/>} >
                    <Link to={Routes.OWNERPRODUCTS} style={linkStyle}>Productos</Link>
                </Menu.Item>

                <Menu.Item key={Routes.REGISTERPRODUCT} icon={<PlusCircleOutlined/>} >
                    <Link to={Routes.REGISTERPRODUCT} style={linkStyle}>Registrar Producto</Link>
                </Menu.Item>

                <Menu.Item key={Routes.DAILYORDER} icon={<NotificationOutlined/>} >
                    <Link to={Routes.DAILYORDER} style={linkStyle}>Órdenes Nuevas</Link>
                </Menu.Item>

                <Menu.Item key={Routes.ANTD} icon={<MonitorOutlined/>} >
                    <Link to={Routes.ANTD} style={linkStyle}>Resumen de Ventas</Link>
                </Menu.Item>

                <Menu.Item key={Routes.PROFILE} icon = {<UserOutlined/>}>
                    <Link to={Routes.PROFILE} style={linkStyle}>Perfil de Usuario</Link>
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

