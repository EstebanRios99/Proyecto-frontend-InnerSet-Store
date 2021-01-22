import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
  } from '@ionic/react';
  
  import React from 'react';
  import { useLocation } from 'react-router-dom';
  import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
  import {useAuth} from '../providers/Auth';
  import '../styles/Menu.css';
  
  const AppPage = [
    {
      title: 'Inbox',
      url: '/page/Inbox',
      iosIcon: mailOutline,
      mdIcon: mailSharp
    },
    {
      title: 'Outbox',
      url: '/page/Outbox',
      iosIcon: paperPlaneOutline,
      mdIcon: paperPlaneSharp
    },
    {
      title: 'Favorites',
      url: '/page/Favorites',
      iosIcon: heartOutline,
      mdIcon: heartSharp
    },
    {
      title: 'Archived',
      url: '/page/Archived',
      iosIcon: archiveOutline,
      mdIcon: archiveSharp
    },
    {
      title: 'Trash',
      url: '/page/Trash',
      iosIcon: trashOutline,
      mdIcon: trashSharp
    },
    {
      title: 'Spam',
      url: '/page/Spam',
      iosIcon: warningOutline,
      mdIcon: warningSharp
    }
  ];
  
  
  const MenuClient = (props) => {
    const location = useLocation();
    const auth=useAuth().currentUser;
  
    return (
      <>
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>{auth.name} + {auth.lastname} </IonListHeader>
            <IonNote>{auth.email} </IonNote>
            {
            AppPage.map((Page, index) =>(
                <IonMenuToggle key={index} autoHide={false}>
                    <IonItem className={location.pathname === Page.url ? 'selected' : ''} routerLink={Page.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" ios={Page.iosIcon} md={Page.mdIcon} />
                    <IonLabel>{Page.title}</IonLabel>
                    </IonItem>
                </IonMenuToggle>
            ))
            }
          </IonList>
        </IonContent>
      </IonMenu>
      </>
    );
  };
  
  export default MenuClient;
  