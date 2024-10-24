import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
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

const ChatWrapper = styled('div')(() => ({
  overflowY: 'auto',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

export default function HomeView(props: any) {
  const [chatList, setChatList] = useState<
    { sender: 'user' | 'system'; msg: string; data: any; resType: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  const SendUserMessage: any = async (msg: string, type: string) => {
    const newUserChat = { sender: 'user', msg: msg, resType: type };
    setChatList((prevList: any) => [...prevList, newUserChat]);

    const newSystemRes: any = await generateSysyemMessage(newUserChat);
    console.log('?', newSystemRes);
    setChatList((prevList: any) => [...prevList, newSystemRes]);
  };

  const generateSysyemMessage: any = async (userReq: any) => {
    setLoading(true);
    const sys_res = {
      sender: 'system',
      msg: '',
      data: [],
      resType: userReq.resType,
    };

    const llm_req = {
      message: userReq.msg,
      threadId: '', // DB 저장 필요 (새로운 채팅 생성 시)
      resType: userReq.resType,
    };

    try {
      if (!userReq.resType) {
        sys_res.msg = '응답 타입을 선택해주세요';
      } else if (userReq.resType === 'graph') {
        const resData = await axios.post(
          'http://10.100.100.200:5959/dbtest',
          llm_req,
        );
        sys_res.data = resData.data.body;
      } else {
        sys_res.msg = '텍스트 응답은 테스트 중입니다.';
      }
    } catch (error) {
      console.error('node err', error);
      sys_res.msg = '시스템 오류 발생. 다시 시도해주세요.';
    } finally {
      setLoading(false);
    }

    return sys_res;
  };

  return (
    <ContentWrapper>
      <ChatWrapper>
        {chatList.map((chat, index) =>
          chat.sender === 'user' ? (
            <MyChat message={chat.msg} key={index} />
          ) : (
            <SystemChat
              message={chat.msg}
              data={chat.data}
              resType={chat.resType}
              key={index}
              loading={loading}
            />
          ),
        )}
        <div ref={chatEndRef} />
      </ChatWrapper>
      <PromptInput SendUserMessage={SendUserMessage} />
    </ContentWrapper>
  );
}
