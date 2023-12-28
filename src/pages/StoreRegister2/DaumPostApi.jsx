import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import * as S from './style/DaumPostApi.style';
import useAxios from '../../hooks/useAxios';

export default function DaumPostApi({ setIsRestaurantRegistered, setAddress, setStoreName }) {
    const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(scriptUrl);
    const { authRequiredAxios } = useAxios('application/json');

    const convertAddressFormat = (data) => {
        const formatedAddress = {
            street: data.roadAddress,
            fullAddress: data.jibunAddress ? data.jibunAddress : data.autoJibunAddress,
            city: data.sido,
            state: data.sigungu,
            zipCode: data.zonecode,
            name: data.buildingName,
            latitude: data.latitude,
            longitude: data.longitude,
        };
        return formatedAddress;
    };

    const handleComplete = async (data) => {
        try {
            const response = await authRequiredAxios({
                method: 'get',
                url: `/stores?name=${data.buildingName}&street=${data.roadAddress}`,
            });

            if (response.data === '중복된 가게가 존재합니다.') {
                setIsRestaurantRegistered(true);
                setAddress({
                    street: '',
                    fullAddress: '',
                    city: '',
                    state: '',
                    zipcode: '',
                    name: '',
                    latitude: '',
                    longitude: '',
                });
                setStoreName('');
                return;
            }

            if (response.data === '가게 확인 완료') {
                setAddress(convertAddressFormat(data));
                setIsRestaurantRegistered(false);
                setStoreName(data.buildingName);
                console.log(data);
                return
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <S.SearchBtn type="button" onClick={handleClick}>
            검색
        </S.SearchBtn>
    );
}
