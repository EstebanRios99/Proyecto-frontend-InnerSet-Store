import React, {useState} from 'react';
import Routes from '../constants/routes.js';
import {useAuth} from '../providers/Auth';
import {Menu} from 'antd';
import {LogoutOutlined, LoginOutlined, LoadingOutlined, UserOutlined} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';
import '../styles/navigation.css';
import {IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle} from "@ionic/react";
import {mailOutline, mailSharp} from "ionicons/icons";



const data = [
    {
        title: 'Register',
        url: Routes.REGISTER,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'About',
        url: Routes.ABOUT,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
];
const linkStyle = {};

const Navigation = (props) => {
    let location = useLocation();

    const [menuState, setMenuState] = useState({
        current: location.pathname, // set the current selected item in menu, by default the current page
        collapsed: false,
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
            <IonMenu contentId="main" type="overlay">
                <IonContent>
                    <IonList>
                        <IonListHeader>Register</IonListHeader>
                        {data.map((dat, index)=>{
                            return (
                              <IonMenuToggle key={index}>
                                  <IonItem className={location.pathname === dat.url ? 'selected' : ''} routerLink={dat.url}>
                                      <IonIcon slot="start" ios={dat.iosIcon} md={dat.mdIcon} />
                                      <IonLabel>{dat.title}</IonLabel>
                                  </IonItem>
                              </IonMenuToggle>
                            );
                        })}
                    </IonList>
                </IonContent>
            </IonMenu>
        </>
    );
};

export default Navigation;

