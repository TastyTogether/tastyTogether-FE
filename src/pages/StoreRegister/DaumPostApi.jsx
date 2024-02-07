import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import * as S from './style/DaumPostApi.style';
import useAxios from '../../hooks/useAxios';

export default function DaumPostApi({
    setIsRestaurantRegistered,
    setAddress,
    storeName,
    setStoreName,
}) {
    const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(scriptUrl);
    const { authRequiredAxios } = useAxios('application/json');

    const getLatLongFromAddress = async (address) => {
        window.kakao.maps.load(() => {
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, function (results, status) {
                if (status === daum.maps.services.Status.OK) {
                    const result = results[0];
                    const coords = new daum.maps.LatLng(result.y, result.x);
                    const latitude = coords.getLat();
                    const longitude = coords.getLng();
                    setAddress((prevState) => {
                        return { ...prevState, latitude: latitude, longitude: longitude };
                    });
                }
            });
        });
    };

    const convertAddressFormat = (data) => {
        const formatedAddress = {
            street: data.roadAddress,
            fullAddress: data.jibunAddress ? data.jibunAddress : data.autoJibunAddress,
            city: data.sido,
            state: data.sigungu,
            zipCode: data.zonecode,
            name: data.buildingName,
            latitude: '',
            longitude: '',
        };
        return formatedAddress;
    };

    const handleComplete = async (data) => {
        try {
            const response =
                storeName &&
                (await authRequiredAxios({
                    method: 'get',
                    url: `/stores?name=${storeName}&street=${data.roadAddress}`,
                }));

            if (response.data === '중복된 가게가 존재합니다.') {
                setIsRestaurantRegistered('이미 등록된 가게입니다. 가게를 검색해주세요.');
                setAddress({
                    street: '',
                    fullAddress: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    name: '',
                    latitude: '',
                    longitude: '',
                });
                setStoreName('');
                return;
            }

            if (response.data === '가게 확인 완료') {
                setAddress(convertAddressFormat(data));
                getLatLongFromAddress(data.address);
                setIsRestaurantRegistered('등록되지 않은 가게 입니다. 추가 정보들을 입력해주세요!');
                return;
            }
        } catch (error) {
            console.err(error);
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
