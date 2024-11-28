import React from 'react';
import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { CONST } from 'constant';
import { TrendChart } from 'components/graph/TrendChart';
import HistoryTable from 'components/graph/HistoryTable';

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
    '.content-text-additional': {
      marginBottom: '10px',
    },
  },
}));

export default function SystemChat(props: any) {
  const { message, data, resType, loading } = props;

  return (
    <ContentWrapper>
      {loading ? (
        <CircularProgress />
      ) : resType === 'graph' ? (
        <div className="content">
          <TrendChart data={data} />
        </div>
      ) : (
        <div className="content">
          <div className="content-text-additional">
            질의에 대한 답은 아래와 같습니다.
          </div>
          {data.flag?.includes('history') && <HistoryTable data={data} />}
          {data.flag?.includes('comparison') && <div style={{whiteSpace: "pre-wrap"}}>
            {data.rowData}
            </div>}
        </div>
      )}
    </ContentWrapper>
  );
}
