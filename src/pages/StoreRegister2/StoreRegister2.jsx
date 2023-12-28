import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style/StoreRegister.style';
import useAxios from '../../hooks/useAxios';
import { isValidPhoneNumber, isValidHour, isvalidMinute } from '../../utils/regList';
import DaumPostApi from './DaumPostApi';

export default function StoreRegister2() {
    const { authRequiredAxios } = useAxios('application/json');
    const navigate = useNavigate();
    const [isRestaurantRegistered, setIsRestaurantRegistered] = useState(true);
    const [address, setAddress] = useState({
        street: '',
        fullAddress: '',
        city: '',
        state: '',
        zipcode: '',
        name: '',
        latitude: '',
        longitude: '',
    });
    const [storeName, setStoreName] = useState('');
    const [phone, setPhone] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [closedDays, setClosedDays] = useState('');
    const [parkingInfo, setParkingInfo] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [businessHours, setBusinessHours] = useState(['', '', '', '']);
    const [menuItems, setMenuItems] = useState([
        { name: '', price: '' },
        { name: '', price: '' },
        { name: '', price: '' },
    ]);

    const dayCheckList = ['월', '화', '수', '목', '금', '토', '일', '연중무휴'];

    const handleChange = (e) => {
        const { name, value, id } = e.target;

        if (name === 'phone') {
            setPhone(value);
        }
        if (name === 'priceRange') {
            setPriceRange(value);
        }
        if (name === 'parkingInfo') {
            setParkingInfo(value);
        }
        if (name === 'businessHours') {
            if (id === 'openHour') {
                setBusinessHours((prevHours) => [value, prevHours[1], prevHours[2], prevHours[3]]);
            } else if (id === 'openMinutes') {
                setBusinessHours((prevHours) => [prevHours[0], value, prevHours[2], prevHours[3]]);
            } else if (id === 'closeHour') {
                setBusinessHours((prevHours) => [prevHours[0], prevHours[1], value, prevHours[3]]);
            } else if (id === 'closeMinutes') {
                setBusinessHours((prevHours) => [prevHours[0], prevHours[1], prevHours[2], value]);
            }
        }
        if (/^(name|price)/i.test(name)) {
            const index = /\d/.exec(name)[0] - 1;
            const property = /[a-z]+/i.exec(name)[0];
            setMenuItems((prev) => {
                const MenuItems = [...prev];
                MenuItems[index][property] = value;
                return MenuItems;
            });
        }
    };

    const checkedDayHandler = (value, isChecked) => {
        if (isChecked) {
            setClosedDays((prev) => [...prev, value]);
            return;
        }
        if (!isChecked && closedDays.includes(value)) {
            setClosedDays(closedDays.filter((day) => day !== value));
            return;
        }
        return;
    };

    const checkHandler = (e, value) => {
        setIsChecked(!isChecked);
        if (value === '연중무휴') {
            if (e.target.checked) {
                setClosedDays([]);
            }
        } else if (closedDays[0] === '연중무휴') {
            setClosedDays([]);
        }
        checkedDayHandler(value, e.target.checked);
    };

    const handleSubmit = async (e) => {
        const isFullMenuItems = menuItems.filter((el) => el.name !== '' && el.price !== '');
        e.preventDefault();
        if (
            !address ||
            !storeName ||
            !closedDays ||
            !phone ||
            !priceRange ||
            !parkingInfo ||
            businessHours.includes('') ||
            isFullMenuItems.length !== 3
        ) {
            alert('입력하지 않은 값이 존재합니다.');
            return;
        }
        if (!isValidPhoneNumber(phone)) {
            alert('전화번호 형식이 일치하지 않습니다.');
            return;
        }
        if (!isValidHour(businessHours[0], businessHours[2])) {
            alert('시간 형식에 맞게 작성해주세요.');
            return;
        }
        if (!isvalidMinute(businessHours[1], businessHours[3])) {
            alert('분 형식에 맞게 작성해주세요.');
            return;
        }

        const sortedDayList = closedDays.sort(
            (a, b) => dayCheckList.indexOf(a) - dayCheckList.indexOf(b),
        );
        setClosedDays(sortedDayList);

        const response = await authRequiredAxios({
            method: 'post',
            url: `/stores`,
            data: {
                phone: phone,
                menuItems: menuItems,
                priceRange: priceRange,
                parkingInfo: parkingInfo,
                businessHours: businessHours,
                closedDays: closedDays,
            },
        });
        if (response.status === 200) {
            alert('가게 정보 수정이 완료되었습니다.');
            navigate(`/stores/detail/${storeId}`);
        }
    };

    return (
        <S.Container>
            <S.RegisterFormTitle>나만 알고 있는 맛집을 등록해보세요!</S.RegisterFormTitle>
            <S.RegisterForm>
                <S.EditContentBox isSmallGap="true">
                    <S.EditTitle>가게 등록 확인</S.EditTitle>
                    <S.StoreLocatorRegistration>
                        <S.InputBox
                            placeholder="주소를 검색해주세요."
                            name="address"
                            value={address.name === '' ? '' : address.fullAddress}
                            onChange={handleChange}
                            readOnly
                        />

                        <DaumPostApi
                            setIsRestaurantRegistered={setIsRestaurantRegistered}
                            setAddress={setAddress}
                            setStoreName={setStoreName}
                        />
                        <S.RegistrationStatusMessage>
                            {isRestaurantRegistered
                                ? '이미 등록된 가게입니다. 가게를 검색해주세요.'
                                : '등록되지 않은 가게 입니다. 추가 정보들을 입력해주세요!'}
                        </S.RegistrationStatusMessage>
                        <S.MapImage></S.MapImage>
                    </S.StoreLocatorRegistration>
                </S.EditContentBox>
                <S.EditContentBox>
                    <S.EditTitle>업체명</S.EditTitle>
                    <S.InputBox
                        placeholder="주소 검색을 통해 업체명을 받을 수 있습니다."
                        name="storeName"
                        value={storeName ?? ''}
                        onChange={handleChange}
                        readOnly
                    />
                </S.EditContentBox>
                <S.EditContentBox>
                    <S.EditTitle>업종</S.EditTitle>
                    <div>
                        <S.InputLabel htmlFor="korean">
                            한식
                            <S.RadioInput
                                id="korean"
                                name="restaurantCategory"
                                type="radio"
                                value="한식"
                                onChange={handleChange}
                            ></S.RadioInput>
                            <S.RadioDesign></S.RadioDesign>
                        </S.InputLabel>
                        <S.InputLabel htmlFor="western">
                            양식
                            <S.RadioInput
                                id="western"
                                name="restaurantCategory"
                                type="radio"
                                value="양식"
                                onChange={handleChange}
                            />
                            <S.RadioDesign></S.RadioDesign>
                        </S.InputLabel>
                        <S.InputLabel htmlFor="chinese">
                            중식
                            <S.RadioInput
                                id="chinese"
                                name="restaurantCategory"
                                type="radio"
                                value="중식"
                                onChange={handleChange}
                            />
                            <S.RadioDesign></S.RadioDesign>
                        </S.InputLabel>
                        <S.InputLabel htmlFor="asian">
                            아시안
                            <S.RadioInput
                                id="asian"
                                name="restaurantCategory"
                                type="radio"
                                value="아시안"
                                onChange={handleChange}
                            />
                            <S.RadioDesign></S.RadioDesign>
                        </S.InputLabel>
                        <S.InputLabel htmlFor="cafe">
                            카페∙디저트
                            <S.RadioInput
                                id="cafe"
                                name="restaurantCategory"
                                type="radio"
                                value="카페.디저트"
                                onChange={handleChange}
                            />
                            <S.RadioDesign></S.RadioDesign>
                        </S.InputLabel>
                    </div>
                </S.EditContentBox>
                <S.EditContentBox>
                    <S.EditTitle>전화번호</S.EditTitle>
                    <S.InputBox
                        placeholder="가게의 전화번호를 입력하세요.(0000-0000-0000)"
                        isPhone={true}
                        name="phone"
                        value={phone ?? ''}
                        onChange={handleChange}
                    />
                </S.EditContentBox>
                <S.EditContentBox>
                    <S.EditTitle>가격대</S.EditTitle>
                    <div>
                        <S.InputLabel htmlFor="price10k">
                            1만원대
                            <S.RadioInput
                                id="price10k"
                                name="priceRange"
                                type="radio"
                                value="1만원대"
                                onChange={handleChange}
                            ></S.RadioInput>
                            <S.RadioDesign></S.RadioDesign>
                        </S.InputLabel>
                        <S.InputLabel htmlFor="price20k">
                            2만원대
                            <S.RadioInput
                                id="price20k"
                                name="priceRange"
                                type="radio"
                                value="2만원대"
                                onChange={handleChange}
                            />
                            <S.RadioDesign></S.RadioDesign>
                        </S.InputLabel>
                        <S.InputLabel htmlFor="price30k">
                            3만원대
                            <S.RadioInput
                                id="price30k"
                                name="priceRange"
                                type="radio"
                                value="3만원대"
                                onChange={handleChange}
                            />
                            <S.RadioDesign></S.RadioDesign>
                        </S.InputLabel>
                        <S.InputLabel htmlFor="price40k">
                            4만원대
                            <S.RadioInput
                                id="price40k"
                                name="priceRange"
                                type="radio"
                                value="4만원대"
                                onChange={handleChange}
                            />
                            <S.RadioDesign></S.RadioDesign>
                        </S.InputLabel>
                        <S.InputLabel htmlFor="overPrice">
                            기타
                            <S.RadioInput
                                id="overPrice"
                                name="priceRange"
                                type="radio"
                                value="기타"
                                onChange={handleChange}
                            />
                            <S.RadioDesign></S.RadioDesign>
                        </S.InputLabel>
                    </div>
                </S.EditContentBox>
                <S.EditContentBox>
                    <S.EditTitle>주차</S.EditTitle>
                    <div>
                        <S.InputLabel htmlFor="freePark">
                            무료주차 가능
                            <S.RadioInput
                                id="freePark"
                                name="parkingInfo"
                                type="radio"
                                value="무료주차 가능"
                                onChange={handleChange}
                            />
                            <S.RadioDesign></S.RadioDesign>
                        </S.InputLabel>
                        <S.InputLabel htmlFor="paidPark">
                            유료주차 가능
                            <S.RadioInput
                                id="paidPark"
                                name="parkingInfo"
                                type="radio"
                                value="유료주차 가능"
                                onChange={handleChange}
                            />
                            <S.RadioDesign></S.RadioDesign>
                        </S.InputLabel>
                        <S.InputLabel htmlFor="nonePark">
                            주차 불가
                            <S.RadioInput
                                id="nonePark"
                                name="parkingInfo"
                                type="radio"
                                value="주차 불가"
                                onChange={handleChange}
                            />
                            <S.RadioDesign></S.RadioDesign>
                        </S.InputLabel>
                    </div>
                </S.EditContentBox>
                <S.EditContentBox isSmallGap={true}>
                    <S.EditTitle>영업시간</S.EditTitle>
                    <div>
                        <S.InputLabel htmlFor="openHour">
                            <S.TimeInput
                                id="openHour"
                                name="businessHours"
                                placeholder="00"
                                type="number"
                                onChange={handleChange}
                            />
                            시
                        </S.InputLabel>
                        <S.InputLabel htmlFor="openMinutes">
                            <S.TimeInput
                                id="openMinutes"
                                name="businessHours"
                                placeholder="00"
                                type="number"
                                onChange={handleChange}
                            />
                            분 ~
                        </S.InputLabel>
                        <S.InputLabel htmlFor="closeHour">
                            <S.TimeInput
                                id="closeHour"
                                name="businessHours"
                                placeholder="00"
                                type="number"
                                onChange={handleChange}
                            />
                            시
                        </S.InputLabel>
                        <S.InputLabel htmlFor="closeMinutes">
                            <S.TimeInput
                                id="closeMinutes"
                                name="businessHours"
                                placeholder="00"
                                type="number"
                                onChange={handleChange}
                            />
                            분
                        </S.InputLabel>
                    </div>
                </S.EditContentBox>
                <S.EditContentBox>
                    <S.EditTitle>휴무일</S.EditTitle>
                    <div>
                        {dayCheckList.map((el, idx) => {
                            return (
                                <S.InputLabel htmlFor={el} key={idx}>
                                    <S.ClosedDayInput
                                        id={el}
                                        name="closedDays"
                                        checked={closedDays.includes(el)}
                                        onChange={(e) => checkHandler(e, el)}
                                        type="checkbox"
                                    />
                                    <S.ClosedDayDesign></S.ClosedDayDesign>
                                    {el}
                                </S.InputLabel>
                            );
                        })}
                    </div>
                </S.EditContentBox>
                <S.EditContentBox isSmallGap={true}>
                    <S.EditTitle>대표 메뉴</S.EditTitle>
                    <div>
                        <S.MenuNameChart>
                            <thead>
                                <tr>
                                    <S.ChartHead scope="col" isLeft={true}>
                                        대표 메뉴
                                    </S.ChartHead>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <S.ChartContent>
                                        <S.ChartInput
                                            type="text"
                                            placeholder="대표메뉴 3개를 입력해주세요"
                                            name="name1"
                                            onChange={handleChange}
                                        />
                                    </S.ChartContent>
                                </tr>
                                <tr>
                                    <S.ChartContent>
                                        <S.ChartInput
                                            type="text"
                                            placeholder="-"
                                            name="name2"
                                            onChange={handleChange}
                                        />
                                    </S.ChartContent>
                                </tr>
                                <tr>
                                    <S.ChartContent>
                                        <S.ChartInput
                                            type="text"
                                            placeholder="-"
                                            name="name3"
                                            onChange={handleChange}
                                        />
                                    </S.ChartContent>
                                </tr>
                            </tbody>
                        </S.MenuNameChart>
                        <S.MenuNameChart>
                            <thead>
                                <tr>
                                    <S.ChartHead scope="col">가격</S.ChartHead>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <S.ChartContent>
                                        <S.ChartInput
                                            type="number"
                                            placeholder="-"
                                            name="price1"
                                            onChange={handleChange}
                                        />
                                        원
                                    </S.ChartContent>
                                </tr>
                                <tr>
                                    <S.ChartContent>
                                        <S.ChartInput
                                            type="number"
                                            placeholder="-"
                                            name="price2"
                                            onChange={handleChange}
                                        />
                                        원
                                    </S.ChartContent>
                                </tr>
                                <tr>
                                    <S.ChartContent>
                                        <S.ChartInput
                                            type="number"
                                            placeholder="-"
                                            name="price3"
                                            onChange={handleChange}
                                        />
                                        원
                                    </S.ChartContent>
                                </tr>
                            </tbody>
                        </S.MenuNameChart>
                    </div>
                </S.EditContentBox>
                <S.EditContentBox>
                    <S.EditTitle>대표 이미지</S.EditTitle>
                    <div>
                        <S.BannerUploadContainer>
                            <S.BannerImageBtn>이미지 업로드</S.BannerImageBtn>
                            <S.BannerImageBtn isCancleBtn="true">취소하기</S.BannerImageBtn>
                            <S.BannerUploadText>
                                이미지는 최소 1개에서 8개까지 첨부 가능합니다.
                            </S.BannerUploadText>
                            <S.BannerUploadImageBox>
                                {new Array(8).fill('').map((el, idx) => {
                                    return <S.BannerUploadImagePreview key={idx} />;
                                })}
                            </S.BannerUploadImageBox>
                        </S.BannerUploadContainer>
                    </div>
                </S.EditContentBox>
                <S.DividerLine />
                <S.EditFormBtns>
                    <S.EditFormBtn type="button" isOrange={true} onClick={handleSubmit}>
                        등록하기
                    </S.EditFormBtn>
                    <S.EditFormBtn
                        type="button"
                        onClick={() => {
                            navigate(`/stores/detail/${storeId}`);
                        }}
                    >
                        취소하기
                    </S.EditFormBtn>
                </S.EditFormBtns>
            </S.RegisterForm>
        </S.Container>
    );
}
