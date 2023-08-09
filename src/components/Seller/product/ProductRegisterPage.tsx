import React, { FocusEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import TableTitleBk from '../../common/TableTitleBk';
import TableTitleWH from '../../common/TableTitleWH';
import RegisterNew from '../../common/RegisterNew';
import ProductDropdowm from './ProductDropdowm';
import axios from 'axios';
import UseProductGroup from '../customHook/UseProductGroup';

interface Product {
  productNo: string;
  productName: string;
  productGroup: string;
  safetyStock: number;
  enoughStock: number;
  importPrice: number;
  consumerPrice: number;
}

function ProductRegisterPage(props: any) {
  const [view, setView] = useState(false);
  const [productList, setProductList] = useState([]);

  const dropDownRef = useRef(null);
  const [groupName, setGroupName] = useState('');
  const [isOpen, setIsOpen] = UseProductGroup(dropDownRef, false);

  const title = props.productTitle;

  const handleFocusEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  function onChangeText(e: React.ChangeEvent<HTMLInputElement> | undefined) {
    props.getNewProduct(e);
  }

  async function getProductList() {
    const sellerNo = 8;
    const listurl = '/detailProductGroup/list/' + sellerNo;
    await axios
      .get(listurl)
      .then(function (response) {
        setProductList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    props.getProductGroup(groupName);
  }, [groupName]);

  return (
    <RegisterList>
      {title.map((item: string, index: number) => {
        return (
          <>
            {index % 2 === 0 ? <TableTitleBk>{item[0]}</TableTitleBk> : <TableTitleWH>{item[0]}</TableTitleWH>}
            {item[0] === '상품군' ? (
              <>
                <div ref={dropDownRef}>
                  <RegisterDrop onClick={() => setIsOpen(!isOpen)} type="button" name={item[1]} value={groupName} />
                  {isOpen && (
                    <RegisterUl>
                      {productList.map((it: any, index: number) => {
                        return (
                          <ProductDropdowm
                            key={index}
                            value={it}
                            setIsOpen={setIsOpen}
                            setGroupName={setGroupName}
                            isOpen={isOpen}
                          />
                        );
                      })}
                    </RegisterUl>
                  )}
                </div>
              </>
            ) : (
              <RegisterNew
                type="text"
                name={item[1]}
                key={item[1]}
                onChange={onChangeText}
                onFocus={handleFocusEvent}
              />
            )}
          </>
        );
      })}
    </RegisterList>
  );
}
const RegisterList = styled.div`
  height: fit-content;
  border-radius: 10px;
  background-color: #f4f0df;
  display: grid;
  align-items: center;
  justify-items: start;
  margin-top: -20px;
  padding: 20px;
  height: 95%;
  grid-template-columns: 1fr 2fr;
`;

const RegisterDrop = styled.input`
  width: 150px;
  height: 40px;
  border: 1.5px solid black;
  background-color: #f4f0df;
  font-family: Jalnan;
  font-size: 15px;
`;
const RegisterUl = styled.ul`
  margin-top: -5px;
  margin-bottom: -5px;
`;
export default ProductRegisterPage;
