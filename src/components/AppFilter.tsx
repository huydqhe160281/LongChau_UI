import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import '../styles/components/AppFilter.scss';
import AppCheckbox from './AppCheckbox';
import { ArrowLeftIcon, CheckIcon } from '@chakra-ui/icons';

interface IAppFilterProps {
  data: Array<any>;
  filterByPrice: (filterType: string) => void;
}

const priceRanges = [
  'Dưới 100.000đ',
  '100.000đ đến 300.000đ',
  '300.000đ đến 500.000đ',
  'Trên 500.000đ',
];

const AppFilter = (props: IAppFilterProps) => {
  const { data, filterByPrice } = props;
  const [visibleCheckbox, setVisibleCheckbox] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const handleShowMore = () => {
    setVisibleCheckbox(visibleCheckbox + 4);
  };

  const handleShowLess = () => {
    setVisibleCheckbox(1);
  };

  const handleFilterClick = (price: any) => {
    filterByPrice(price);
    setSelectedPrice(price);
  };

  return (
    <Box className="app-filter-container">
      <Box className="app-filter">
        <Box className="app-filter__title">
          <Image src="" />
          Bộ lọc nâng cao
        </Box>
        <Box className="app-filter__price">
          <Box className="app-filter__price-title">Giá bán</Box>
          {priceRanges.map((price) => (
            <Box
              pos={'relative'}
              key={price}
              className={`app-filter__price-item ${
                selectedPrice === price ? 'active' : ''
              }`}
              onClick={() => handleFilterClick(price)}
            >
              {price}{' '}
              {/* {selectedPrice === price && (
                <CheckIcon
                  boxSize={4}
                  position={'absolute'}
                  right={'5px'}
                  top={1}
                />
              )} */}
            </Box>
          ))}
        </Box>
        <Box className="app-filter__brand">
          <Box className="app-filter__brand-title">Thương hiệu</Box>
          <AppCheckbox
            label={'Tất cả'}
            checked={false}
            size="lg"
            fontWeight={400}
            // onChange={() => {}}
          />
          {data.slice(0, visibleCheckbox).map((item, index) => {
            return (
              <Flex>
                <AppCheckbox
                  key={index}
                  label={item}
                  checked={false}
                  size="lg"
                  fontWeight={400}
                  // onChange={() => {}}
                />
              </Flex>
            );
          })}

          {visibleCheckbox < data.length && (
            <Box className="app-filter__button" onClick={handleShowMore}>
              <Box transform="rotate(270deg)">
                <ArrowLeftIcon />
              </Box>
              Xem thêm
            </Box>
          )}
          {visibleCheckbox > data.length && (
            <Box className="app-filter__button" onClick={handleShowLess}>
              <Box transform="rotate(90deg)">
                <ArrowLeftIcon />
              </Box>
              Ẩn
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AppFilter;