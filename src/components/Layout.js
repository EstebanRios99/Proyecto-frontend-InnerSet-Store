import React from 'react';
import Navigation from './Navigation';
import {Col, Popover, Button} from 'antd';
import {useAuth} from "../providers/Auth";



/**
 * Este componente renderiza los elementos comunes para toda la aplicación
 *
 * Header (menu), Content y Footer
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MainLayout = props => {
    console.log('props', props);
    const {isAuthenticated} = useAuth();
    return (
      <Col xs={ 2 } align='right' className='responsive-menu-button'>
        <Popover content={ <Navigation mode='vertical' /> }
          trigger='click'
          placement='bottom'
          overlayClassName='responsive-menu-wrapper'>
          <Button type='primary'>
            <svg viewBox='64 64 896 896'
              focusable='false'
              className=''
              data-icon='menu'
              width='1em'
              height='1em'
              fill='currentColor'
              aria-hidden='true'>
              <path d='M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z'></path>
            </svg>
          </Button>
        </Popover>
      </Col>
    );
};

export default MainLayout;
