import React, { useState, useRef, useEffect } from 'react';
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

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  const SendUserMessage: any = (msg: string, type: string) => {
    const newUserChat = { sender: 'user', msg: msg, resType: type };
    setChatList((prevList: any) => [...prevList, newUserChat]);

    const newSystemRes: any = generateSysyemMessage(newUserChat);

    setChatList((prevList: any) => [...prevList, newSystemRes]);
  };

  const generateSysyemMessage: any = (userReq: any) => {
    if (userReq.resType === null) {
      return {
        sender: 'system',
        msg: '응답 타입을 선택해주세요',
        data: [],
        resType: userReq.resType,
      };
    }
    const llm_req: any = {
      message: userReq.msg,
      threadId: '', // DB 저장 필요 (새로운 채팅 생성 시)
      resType: userReq.resType,
    };
    // @@@@ 여기에 백엔드 통신 로직 설정 필요해요~ @@@@

    const tmp_response: any = {
      sender: 'system',
      msg: '테스트라구~조용히해',
      data: [],
      resType: userReq.resType,
    }; // 임시 응답
    console.log('요청:', tmp_response);

    return tmp_response;
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
            />
          ),
        )}
        <div ref={chatEndRef} />
      </ChatWrapper>
      <PromptInput SendUserMessage={SendUserMessage} />
    </ContentWrapper>
  );
}
