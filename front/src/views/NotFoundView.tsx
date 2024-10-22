import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { CONST } from 'constant';

const ContentWrapper = styled('div')(() => ({
  width: '100%',
  height: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '.text-404': {
    fontSize: '10rem',
    fontWeight: 'bold',
    color: '#75D1E5',
  },
  '.text-page-not-found': {
    fontSize: '5rem',
    color: '#75D1E5',
    letterSpacing: '-0.1rem',
  },
  '.text-page-description': {
    marginTop: '10px',
    fontSize: '1.5rem',
    color: '#999999',
    letterSpacing: '-0.05rem',
  },
}));

export default function NotFoundView(props: any) {
  const navigate = useNavigate();

  return (
    <ContentWrapper>
      <div>
        <div className="text-404">404</div>
        <div className="text-page-not-found">PAGE NOT FOUND</div>
        <div className="text-page-description">
          Are you sure the website URL is correct?
        </div>
        <div className="text-page-description">
          If you are, please get in touch with the site administrator.
        </div>
      </div>
    </ContentWrapper>
  );
}
