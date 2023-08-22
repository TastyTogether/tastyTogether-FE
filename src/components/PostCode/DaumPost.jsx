import React, { useState } from 'react';
import useDaumPostcodePopup from './useDaumPostcodePopup'; // useDaumPostcodePopup 함수 임포트



function DaumPost(){

  const [ addressObj, setAddressObj ] = useState({})
    //클릭 시 수행될 팝업 생성 함수
    const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(postcodeScriptUrl);
  
    const handleComplete = (data) => {
      let fullAddress = data.address;
      let extraAddress = ''; //추가될 주소
      let localAddress = data.sido + ' ' + data.sigungu; //지역주소(시, 도 + 시, 군, 구)
      if (data.addressType === 'R') { //주소타입이 도로명주소일 경우
        if (data.bname !== '') {
          extraAddress += data.bname; //법정동, 법정리
        }
        if (data.buildingName !== '') { //건물명
          extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        //지역주소 제외 전체주소 치환
        fullAddress = fullAddress.replace(localAddress, '');
        //조건 판단 완료 후 지역 주소 및 상세주소 state 수정
        setAddressObj({
          areaAddress: localAddress,
          townAddress: fullAddress += (extraAddress !== '' ? `(${extraAddress})` : '')
        });
        //주소 검색이 완료된 후 결과를 매개변수로 전달
      }
      document.querySelector('#address1').value = addressObj.areaAddress;
      document.querySelector('#address2').value = addressObj.townAddress;
    }
    //클릭 시 발생할 이벤트
    const handleClick = () => {
      //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
        open({onComplete: handleComplete});
    }
    return (
      <>
        <input id="address1" className="input" type="text" readOnly />
        <input id="address2" className="input" type="text" readOnly />
        <button type="button" onClick={handleClick}>주소찾기</button>
      </>
    )}
  
  export default DaumPost;