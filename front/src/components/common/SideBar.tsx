import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { CONST } from '../../constant';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ITEMHEIGHT: number = 40;
const ITEMMARGIN: number = 5;
const PADDINGWIDTH: number = 10;

const BarWrapper = styled('div')(() => ({
  position: 'absolute',
  zIndex: 50,
  width: CONST.SIDEBARWIDTH - PADDINGWIDTH * 2,
  minHeight: '100vh',
  maxHeight: '100vh',
  padding: '0 10px 0 10px',
  background: 'linear-gradient(120deg, #ebedee 0%, #fdfbfb 100%)',
  color: '#555',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  boxShadow: '10px 10px 15px rgba(200,200,200,0.03)',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '0px',
  },
  a: {
    textDecorationLine: 'none',
    color: 'inherit',
    width: '100%',
  },
}));

const LogoWrapper = styled('div')(() => ({
  height: '100%',
  marginTop: '10px',
  //   width: '90%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const TextLogo = styled('p')(() => ({
  textShadow: '0 0 5px rgba(100,100,100,0.1)',
  fontSize: '0.9rem',
  margin: '0 0 0 20px',
}));

const MenuWrapper = styled('div')(() => ({
  borderRadius: '10px',
  width: '90%',
  padding: '10px',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
}));

const ListWrapper = styled('div')(() => ({
  width: '90%',
  marginTop: '30px',
  padding: '10px',
  fontWeight: 'bold',
  fontSize: '0.85rem',
  color: '#000',
}));

const LinkWrapper = styled(Link)(() => ({
  height: ITEMHEIGHT,
  marginTop: ITEMMARGIN,
}));

const SideBar = (props: any) => {
  const { items } = props;
  const navigate = useNavigate();
  const [mainList, setMainList] = useState<any>([]);
  const [isHovered, setIsHovered] = useState(-1);

  const handleMouseEnter = (id: number) => {
    setIsHovered(id);
  };

  const handleMouseLeave = () => {
    setIsHovered(-1);
  };

  return (
    <BarWrapper className="SideBar-wrapper">
      <LogoWrapper>
        <Link key={`udap`} to={'/'} style={{ textDecorationLine: 'none' }}>
          <img alt="Logo" src="/udap.png" height={CONST.HEADERHEIGHT * 0.8} />
        </Link>
        <Link
          key={`product-report`}
          to={'/'}
          style={{ textDecorationLine: 'none', color: '#555' }}
        >
          <TextLogo></TextLogo>
        </Link>
      </LogoWrapper>
      <div style={{ width: '100%', margin: '10px 0 10px 0' }}>
        <MenuWrapper
          style={{
            backgroundColor: isHovered === 0 ? '#E0E0E0' : undefined,
          }}
          onMouseEnter={() => {
            handleMouseEnter(0);
          }}
          onMouseLeave={handleMouseLeave}
        >
          <MapsUgcIcon style={{ marginRight: '10px', fontSize: '1.2rem' }} />새
          대화 생성
        </MenuWrapper>

        <ListWrapper>목록</ListWrapper>

        <MenuWrapper
          style={{
            backgroundColor: isHovered === 1 ? '#E0E0E0' : undefined,
          }}
          onMouseEnter={() => {
            handleMouseEnter(1);
          }}
          onMouseLeave={handleMouseLeave}
        >
          대화 1
        </MenuWrapper>

        <MenuWrapper
          style={{
            backgroundColor: isHovered === 2 ? '#E0E0E0' : undefined,
          }}
          onMouseEnter={() => {
            handleMouseEnter(2);
          }}
          onMouseLeave={handleMouseLeave}
        >
          대화 2
        </MenuWrapper>
      </div>

      {items.map((item: any, index: number) => {
        //   if (item.isAlways) {
        //     return (
        //       <LinkWrapper key={`sidebar-${index}`} to={item.path}>
        //         {/* <item.icon sx={{ fontSize: '1.5rem' }} /> */}
        //       </LinkWrapper>
        //     );
        //   }
        return null;
      })}
    </BarWrapper>
  );
};

export default SideBar;
