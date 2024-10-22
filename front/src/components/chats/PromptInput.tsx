import React from 'react';
import { styled } from '@mui/material/styles';
import { CONST } from 'constant';
import { TextField } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ContentWrapper = styled('div')(() => ({
  width: '100%',
  height: 'fit-content',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  '.content': {
    backgroundColor: '#F3F3F3',
    boxShadow: '0 0 5px rgba(200, 200, 200, 0.05)',
    width: '100%',
    minHeight: '60px',
    height: 'fit-content',
    borderRadius: '30px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'end',
    '.left-button': {
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      marginLeft: '30px',
      color: '#333',
      '.each-button': {
        fontSize: '1.8rem',
        marginRight: '15px',
      },
    },
    '.right-button': {
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      marginRight: '30px',
      color: '#FFF',
      '.button-cropper': {
        width: '2rem',
        height: '2rem',
        overflow: 'hidden',
        borderRadius: '50%',
        backgroundColor: '#333',
        marginLeft: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '.each-button': {
          fontSize: '1.5rem',
        },
      },
    },
  },
}));

export default function PromptInput(props: any) {
  return (
    <ContentWrapper>
      <div className="content">
        <div className="left-button">
          <InsightsIcon className="each-button" />
          <ChatBubbleOutlineIcon className="each-button" />
        </div>
        <TextField
          fullWidth
          multiline
          placeholder="여기다가 입력해라"
          variant="outlined"
          InputProps={{
            style: {
              border: 'none',
              maxHeight: '300px',
              minHeight: '60px',
              overflow: 'scroll',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
          }}
        />
        <div className="right-button">
          <div className="button-cropper">
            <ArrowUpwardIcon className="each-button" />
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
