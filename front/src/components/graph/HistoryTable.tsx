import React, { useMemo, useState, useRef, memo, useEffect } from 'react';
import { styled } from '@mui/material/styles';

const StyleTable = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowX: 'scroll',
  table: {
    minWidth: '300px',
    maxWidth: '800px',
    width: '100%',
    tableLayout: 'fixed',
    borderCollapse: 'collapse',
    border: '1px solid #D7D7D7',
  },
  '.td-header': {
    textAlign: 'center',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    backgroundColor: '#EFEFEF',
    color: '#666',
    padding: '10px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    borderBottom: '1px solid #D7D7D7',
  },
  '.td-data': {
    backgroundColor: '#FFF',
    fontSize: '0.8rem',
    wordBreak: 'break-all',
    textAlign: 'center',
    paddingTop: '7px',
    paddingBottom: '7px',
    borderBottom: '1px solid #D7D7D7',
  },
  '.td-date': {
    fontSize: '0.8rem',
    wordBreak: 'keep-all',
  },
  '.td-read-more': {
    color: '#999',
    cursor: 'pointer',
  },
}));

const HistoryTable = (props: any) => {
  const { data } = props;

  return (
    <StyleTable>
      <table>
        <thead>
          <tr>
            <td className="td-header" width={'15%'}>
              날짜
            </td>
            <td className="td-header" width={'55%'}>
              내용
            </td>
            <td className="td-header" width={'10%'}>
              담당자
            </td>
            <td className="td-header" width={'10%'}>
              PCCB Rev.
            </td>
          </tr>
        </thead>
        <tbody>
          {data?.rowData?.map((d: any, i: number) => {
            return (
              <tr key={`${d.id}-${i}`}>
                <td className="td-data td-date" width={'15%'}>
                  {d.prtUpdated.slice(0, 10)}
                </td>
                <td
                  className="td-data"
                  width={'55%'}
                  style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}
                >
                  {d.prtNote}
                </td>
                <td className="td-data" width={'10%'}>
                  {d.users_userId}
                </td>
                <td className="td-data" width={'10%'}>
                  {d.majorRev}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </StyleTable>
  );
};

export default HistoryTable;
