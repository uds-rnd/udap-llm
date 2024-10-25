import React, { useState } from 'react';
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
    minHeight: '40px',
    paddingTop: '7px',
    paddingBottom: '7px',
    height: 'fit-content',
    borderRadius: '35px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'end',
    '.left-button': {
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      marginLeft: '20px',
      color: '#333',
      '.each-button': {
        fontSize: '1.8rem',
        marginRight: '15px',
        display: 'flex',
        alignItems: 'center',
      },
    },
    '.right-button': {
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      marginRight: '20px',
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

const ButtonWrapper = styled('div')<{ selected: boolean }>(({ selected }) => ({
  backgroundColor: selected ? 'black' : '',
  color: selected ? 'white' : '#333',
  cursor: 'pointer',
}));

export default function PromptInput(props: any) {
  const { SendUserMessage } = props;
  const [inputMessage, setInputMessage] = useState<string>('');
  const [resType, setResType] = useState<'graph' | 'text' | null>(null);

  const onClickSend: any = () => {
    console.log('사용자:', inputMessage);
    SendUserMessage(inputMessage, resType);
    setInputMessage('');
    setResType(null);
  };

  return (
    <ContentWrapper>
      <div className="content">
        <div className="left-button">
          <ButtonWrapper
            className="each-button"
            selected={resType === 'graph'}
            onClick={() => setResType('graph')}
          >
            <InsightsIcon />
          </ButtonWrapper>
          <ButtonWrapper
            className="each-button"
            selected={resType === 'text'}
            onClick={() => setResType('text')}
          >
            <ChatBubbleOutlineIcon />
          </ButtonWrapper>
        </div>
        <TextField
          fullWidth
          multiline
          placeholder="메시지 Using LLM"
          variant="outlined"
          InputProps={{
            style: {
              border: 'none',
              maxHeight: '300px',
              minHeight: '40px',
              overflowY: 'scroll',
              overflowX: 'hidden',
              padding: 0,
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
          value={inputMessage}
          onChange={(e: any) => setInputMessage(e.target.value)}
        />
        <div className="right-button">
          <div
            className="button-cropper"
            style={{ cursor: 'pointer' }}
            onClick={onClickSend}
          >
            <ArrowUpwardIcon className="each-button" />
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
