import React from 'react';
import { styled } from '@mui/material/styles';
import { CONST } from 'constant';
import { routers } from './router';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotFoundView from 'views/NotFoundView';
import AppHeader from 'components/common/AppHeader';
import SideBar from 'components/common/SideBar';

const ContentWrapper = styled('div')(() => ({
  position: 'absolute',
  top: CONST.CONTENTMARGINTOP,
  color: '#666666',
  width: '100vw',
  height: `calc(100vh - ${CONST.CONTENTMARGINTOP}px)`,
  overflow: 'auto',
}));

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <SideBar items={routers} />
      <ContentWrapper id="app-wrapper">
        <Routes>
          {routers.map((router: any, index: number) => (
            <Route
              key={`app-router-${index}`}
              path={router.path + '/*'}
              element={<router.component title={router.title} />}
            />
          ))}
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route
            path="*"
            element={<NotFoundView title={'[404] Not Found'} />}
          />
        </Routes>
      </ContentWrapper>
    </BrowserRouter>
  );
}

export default App;
