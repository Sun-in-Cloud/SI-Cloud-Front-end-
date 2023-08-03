import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import dashedLine from '../../img/dashedLine.svg';
import LoginBtn from '../common/Loginbtn';
import { Location, useLocation } from 'react-router-dom';
import { Order } from '../../global/OrderInterface';

interface StyledGridProps {
  readonly columns: '2' | '3' | '4' | '5' | '6' | '7';
}

const gridLayout = {
  2: '1fr 1fr',
  3: '1fr 1fr 1fr',
  4: '1fr 1fr 1fr 1fr',
  5: '1fr 1fr 1fr 1fr 1fr',
  6: '1fr 1fr 1fr 1fr 1fr 1fr',
  7: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
};

function Threepl_TableRow(props: any) {
  function getColumns(columns: number): string {
    let new_columns = columns;
    if (props.onDetail) {
      new_columns = columns + 1;
    }
    return String(new_columns);
  }

  const location: Location = useLocation();

  return (
    <>
      <Tablerows>
        {props.rows.map((item: any, index: number) => {
          console.log(item);
          return (
            <>
              <Row key={index} columns={props.columns}>
                {/* {props.onDetail && <input type="checkbox" />} */}
                {Object.values(item).map((value: any, idx: number) => {
                  return (
                    <Item
                      key={idx}
                      onClick={() => {
                        props.getItem(item);
                      }}
                    >
                      {value}
                    </Item>
                  );
                })}
                {props.onDetail && location.pathname === '/3pl/import/pre/list' && (
                  <LoginBtn variant="primary" type="landscape">
                    입고
                  </LoginBtn>
                )}
              </Row>

              <img src={dashedLine} />
            </>
          );
        })}
      </Tablerows>
    </>
  );
}

const Tablerows = styled.div`
  height: 500px;
  width: 100%;
  overflow: hidden;
  margin-top: 5px;
`;

const Row = styled.div<StyledGridProps>`
  display: grid;
  grid-template-columns: ${(props) => gridLayout[props.columns]};
  grid-auto-rows: 1fr;
  margin: 10px 0 5px 0;
`;

const Item = styled.div`
  font-size: 15px;
  font-family: 'Jalnan';
  letter-spacing: 2px;
`;

export default Threepl_TableRow;
