import React from 'react';
import { styled } from '@mui/material/styles';
import { CONST } from 'constant';

const ContentWrapper = styled('div')(() => ({
  width: '100%',
  height: 'fit-content',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  '.content': {
    backgroundColor: '#fafafa',
    width: 'fit-content',
    maxWidth: '100%',
    height: 'fit-content',
    padding: '12px 30px 12px 30px',
    borderRadius: '0 20px 20px 20px',
    wordBreak: 'break-word',
    boxShadow: '7px 9px 8px rgba(200,200,200,0.1)',
  },
}));

export default function SystemChat(props: any) {
  return (
    <ContentWrapper>
      <div className="content">가세요</div>
    </ContentWrapper>
  );
}
