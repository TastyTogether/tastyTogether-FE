import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style/StoreRegister.style';
import useAxios from '../../hooks/useAxios';
import { isValidPhoneNumber, isValidHour, isValidMinute } from '../../utils/regList';
import DaumPostApi from './DaumPostApi';
import KaoKaoMap from './KaKaoMap';
import BannerUploadContainer from './BannerUploadContainer';

export default function StoreRegister() {
    const { authRequiredAxios } = useAxios('multipart/form-data');
    const navigate = useNavigate();
    const [isRestaurantRegistered, setIsRestaurantRegistered] = useState('');
    const [storeName, setStoreName] = useState('');
    const [address, setAddress] = useState({
        street: '',
        fullAddress: '',
        city: '',
        state: '',
        zipCode: '',
        name: '',
        latitude: '',
        longitude: '',
    });
    const [restaurantCategory, setRestaurantCategory] = useState('');
    const [phone, setPhone] = useState('');
    const [newPriceRange, setNewPriceRange] = useState('');
    const [parkingInfo, setParkingInfo] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [businessHours, setBusinessHours] = useState(['', '', '', '']);
    const [closedDays, setClosedDays] = useState('');
    const [menuItems, setMenuItems] = useState([
        { name: '', price: '' },
        { name: '', price: '' },
        { name: '', price: '' },
    ]);
    const [banners, setBanners] = useState([]);
    console.log(banners);
    const dayCheckList = ['월', '화', '수', '목', '금', '토', '일', '연중무휴'];

    const handleChange = (e) => {
        const { name, value, id } = e.target;

        if (name === 'storeName') {
            setStoreName(value);
        }
        if (name === 'restaurantCategory') {
            setRestaurantCategory(value);
        }
        if (name === 'phone') {
            setPhone(value);
        }
        if (name === 'newPriceRange') {
            setNewPriceRange(value);
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
                const menuItems = [...prev];
                menuItems[index][property] = value;
                return menuItems;
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
            !storeName ||
            !address ||
            !restaurantCategory ||
            !phone ||
            !newPriceRange ||
            !parkingInfo ||
            businessHours.includes('') ||
            !closedDays ||
            isFullMenuItems.length !== 3 ||
            banners.length === 0
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
        if (!isValidMinute(businessHours[1], businessHours[3])) {
            alert('분 형식에 맞게 작성해주세요.');
            return;
        }

        const sortedDayList = closedDays.sort(
            (a, b) => dayCheckList.indexOf(a) - dayCheckList.indexOf(b),
        );
        setClosedDays(sortedDayList);

        const formData = new FormData();
        formData.append('name', storeName);

        formData.append('address[street]', address.street);
        formData.append('address[city]', address.city);
        formData.append('address[state]', address.state);
        formData.append('address[fullAddress]', address.fullAddress);
        formData.append('address[zipCode]', address.zipCode);
        formData.append('address[latitude]', address.latitude);
        formData.append('address[longitude]', address.longitude);

        formData.append('type', restaurantCategory);
        formData.append('phone', phone);
        formData.append('priceRange', newPriceRange);
        formData.append('parkingInfo', parkingInfo);

        banners && banners.forEach((banner) => formData.append('banners', banner));

        businessHours &&
            businessHours.forEach((hour, index) => {
                formData.append(`businessHours[${index}]`, hour);
            });
        closedDays &&
            closedDays.forEach((day, index) => {
                formData.append(`closedDays[${index}]`, day);
            });
        menuItems &&
            menuItems.forEach((menuItem, index) => {
                formData.append(`menuItems[${index}][name]`, menuItem.name);
                formData.append(`menuItems[${index}][price]`, menuItem.price);
            });

        try {
            const response = await authRequiredAxios({
                method: 'post',
                url: '/stores',
                data: formData,
            });

            if (response.status === 201) {
                alert('가게 생성이 완료되었습니다.');
                navigate(`/stores/detail/${response.data}`, { state: { stoerId: response.data } });
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <S.Container>
            <S.RegisterFormTitle>나만 알고 있는 맛집을 등록해보세요!</S.RegisterFormTitle>
            <S.RegisterForm>
                <S.EditContentBox>
                    <S.EditTitle>업체명</S.EditTitle>
                    <S.InputBox
                        placeholder="업체명을 입력해주세요."
                        name="storeName"
                        value={storeName ?? ''}
                        onChange={handleChange}
                    />
                </S.EditContentBox>
                <S.EditContentBox isSmallGap="true">
                    <S.EditTitle>업체 주소</S.EditTitle>
                    <S.StoreLocatorRegistration>
                        <S.InputBox
                            placeholder="주소를 검색해주세요."
                            value={address.name === '' ? '' : address.fullAddress}
                            readOnly
                        />

                        <DaumPostApi
                            setIsRestaurantRegistered={setIsRestaurantRegistered}
                            setAddress={setAddress}
                            storeName={storeName}
                            setStoreName={setStoreName}
                        />
                        <S.RegistrationStatusMessage>
                            {isRestaurantRegistered}
                        </S.RegistrationStatusMessage>
                        <S.MapImage>
                            <KaoKaoMap latitude={address.latitude} longitude={address.longitude} />
                        </S.MapImage>
                    </S.StoreLocatorRegistration>
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
                                name="newPriceRange"
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
                                name="newPriceRange"
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
                                name="newPriceRange"
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
                                name="newPriceRange"
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
                                name="newPriceRange"
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
                    <S.EditTitle className="menu">대표 메뉴</S.EditTitle>
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
                        <BannerUploadContainer setBanners={setBanners} />
                    </div>
                </S.EditContentBox>
                <S.DividerLine />
                <S.EditFormBtns>
                    <S.EditFormBtn isOrange={true} onClick={handleSubmit}>
                        등록하기
                    </S.EditFormBtn>
                    <S.EditFormBtn
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
