import React from 'react';
import { styled } from '@mui/material/styles';
import { CONST } from 'constant';

const ContentWrapper = styled('div')(() => ({
  width: '100%',
  height: 'fit-content',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  '.content': {
    backgroundColor: '#F3F3F3',
    // background: 'linear-gradient(120deg, #ebedee 0%, #fdfbfb 100%)',
    width: 'fit-content',
    maxWidth: '70%',
    height: 'fit-content',
    padding: '12px 30px 12px 30px',
    borderRadius: '20px 0 20px 20px',
    wordBreak: 'break-word',
    boxShadow: '7px 9px 8px rgba(200,200,200,0.05)',
  },
}));

export default function MyChat(props: any) {
  const { message } = props;
  return (
    <ContentWrapper>
      <div className="content">{message}</div>
    </ContentWrapper>
  );
}
