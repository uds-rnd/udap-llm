import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { CONST } from 'constant';
import MyChat from 'components/chats/MyChat';
import SystemChat from 'components/chats/SystemChat';
import PromptInput from 'components/chats/PromptInput';

const PADDINGWIDTH: number = 100;
const PADDINGHEIGHT: number = 30;

const ContentWrapper = styled('div')(() => ({
  position: 'absolute',
  width: `calc(100vw - ${CONST.SIDEBARWIDTH}px - ${2 * PADDINGWIDTH}px)`,
  height: `calc(100vh - ${CONST.CONTENTMARGINTOP}px - ${2 * PADDINGHEIGHT}px)`,
  left: `${CONST.SIDEBARWIDTH}px`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
  // backgroundColor: '#FCC',
  padding: `${PADDINGHEIGHT}px ${PADDINGWIDTH}px ${PADDINGHEIGHT}px ${PADDINGWIDTH}px`,
}));

export default function HomeView(props: any) {
  return (
    <ContentWrapper>
      <MyChat />
      <SystemChat />
      <PromptInput />
    </ContentWrapper>
  );
}
