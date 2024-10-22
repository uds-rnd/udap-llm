import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import { CONST } from 'constant';
import UserInfo from './UserInfo';

const AppHeader = () => {
  return (
    <AppBar
      position="absolute"
      elevation={3}
      style={{
        background: 'linear-gradient(120deg, #ebedee 0%, #fdfbfb 100%)',
        boxShadow: '0 0 15px rgba(100,100,100,0.1)',
        height: CONST.HEADERHEIGHT,
        position: 'absolute',
        left: CONST.SIDEBARWIDTH,
        width: `calc(100vw - ${CONST.SIDEBARWIDTH}px)`,
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      <ToolBar
        style={{
          justifyContent: 'end',
          height: '100%',
          paddingLeft: '1%',
          paddingRight: '1%',
        }}
      >
        <UserInfo />
      </ToolBar>
    </AppBar>
  );
};

export default AppHeader;
