import React from 'react';
import * as S from './style/OrderFilters.style';

export default function OrderFilters({ filters, filter, onFilterChange }) {
    return (
        <S.Order>
            <S.OrderLogo>
                <S.LogoImg src="/imgs/related.png" alt="정렬 이미지" />
            </S.OrderLogo>
            <S.Filters>
                {filters.map((value, index) => {
                    return (
                        <S.Filter
                            selected={value === filter ? 'selected' : ''}
                            onClick={() => onFilterChange(value)}
                            key={index}
                        >
                            {value}
                        </S.Filter>
                    );
                })}
            </S.Filters>
        </S.Order>
    );
}
