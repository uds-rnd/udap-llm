import { styled } from '@mui/material/styles';
import { CONST } from '../../constant';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const IMAGEPATH: string = '/default_profile.png';

const InfoWrapper = styled('div')(({ theme }) => ({
  // backgroundColor: "#FCC",
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
}));

const TextWrapper = styled('p')(() => ({
  cursor: 'pointer',
  fontSize: '0.9rem',
  color: '#666',
}));

const ImageCropper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  width: CONST.MH * 1.5,
  height: CONST.MH * 1.5,
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '50%',
  marginLeft: '15px',
  border: '2px solid #ebedee',
  boxShadow: '5px 5px 10px rgba(100, 100, 100, 0.1)',
}));

const UserWrapper = styled('div')(() => ({
  position: 'absolute',
  width: '120px',
  zIndex: 9999,
  right: '20px',
  top: CONST.MH * 4,
  padding: '5px',
  border: '2px solid #ebedee',
  boxShadow: '5px 5px 10px rgba(100, 100, 100, 0.1)',
  borderRadius: 10,
  backgroundColor: '#FFF',
  '.button': {
    cursor: 'pointer',
    paddingTop: '10px',
    paddingBottom: '10px',
    width: '100%',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#666',
  },
  '.logout': {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const StyledLink = styled(Link)(() => ({
  textDecorationLine: 'none',
  color: '#555',
  marginRight: '30px',
  fontSize: '0.8rem',
}));

const UserInfo = () => {
  const SAMPLE_MYUSERINFO = {
    userName: '김제니',
  };
  const [open, setOpen] = useState(false);

  return (
    <>
      {SAMPLE_MYUSERINFO ? (
        <InfoWrapper onClick={() => setOpen(!open)}>
          <TextWrapper>{SAMPLE_MYUSERINFO.userName}</TextWrapper>
          <ImageCropper>
            <img
              alt="profile"
              src={IMAGEPATH}
              style={{
                width: CONST.MH * 1.5,
                height: CONST.MH * 1.5,
                objectFit: 'cover',
              }}
            />
          </ImageCropper>
        </InfoWrapper>
      ) : (
        <div>
          <StyledLink key={`login`} to={'/login'}>
            Sign In
          </StyledLink>
          <StyledLink key={`register`} to={'/register'}>
            Sign Up
          </StyledLink>
        </div>
      )}
      {SAMPLE_MYUSERINFO && open ? (
        <UserWrapper>
          <Link
            key={`mypage`}
            to={'/mypage'}
            style={{ textDecorationLine: 'none' }}
            onClick={() => {
              setOpen(false);
            }}
          >
            <div className="button">My Page</div>
          </Link>
          <Link
            key={`alerts`}
            to={'/alerts'}
            style={{ textDecorationLine: 'none' }}
            onClick={() => {
              setOpen(false);
            }}
          >
            <div className="button">Alert Message</div>
          </Link>
          <div style={{ borderBottom: 'solid 1px #D9D9D9', margin: '5px' }} />
          <div
            className="button logout"
            onClick={() => {
              setOpen(false);
            }}
          >
            <LogoutIcon sx={{ marginRight: '3px' }} />
            Log Out
          </div>
        </UserWrapper>
      ) : null}
    </>
  );
};

export default UserInfo;
