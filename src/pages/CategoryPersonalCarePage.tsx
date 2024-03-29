import { Box, Divider, Flex, Image, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CopyIcon } from 'src/assets/icons';
import { BaseAdminPage } from 'src/components/layouts';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { formatNumber, formatTimestamp } from 'src/utils/format';
import { copyToClipboard } from 'src/utils/helpers';
// import '../styles/pages/CategoryPersonalCarePage.scss';
import BaseHomePage from 'src/components/layouts/HomePage/BaseHomePage';
import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
} from '@chakra-ui/icons';
import { AppButton } from 'src/components';

const MOCK_INFO_Medical = {
  img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/636x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09985_6ae3f52230.jpg',
  medicineID: '1223',
  name: 'Viên uống Calcium Premium JpanWell bổ sung canxi, vitamin và khoáng chất (120 viên)',
  brand: 'Jpanwell',
  quality: 20,
  price: 120000,
  detail: {
    unit: 'Hộp',
    category: 'Cơ xương khớp',
    dosageForms: 'Viên nang cứng',
    specifications: 'Hộp 120 Viên',
    manufacturingCountry: 'Nhật Bản',
    Producer: 'Have fun Factory Co., Ltd',
    ingredient:
      'Canxi từ vỏ sò, Chất xơ hòa tan, Vi khuẩn acid lactic, Magie, Sắt, Vitamin B2, Vitamin B1, Vitamin D3, Vitamin K2',
    shortDescription:
      'Calcium Premium bổ sung canxi, một số các vitamin (vitamin B1, vitamin B2, vitamin D3, vitamin K2) và khoáng chất (magie, sắt) cho cơ thể; giúp tăng khả năng hấp thụ canxi; hỗ trợ giảm nguy cơ loãng xương.',
  },
};

interface IMedicalDetail {
  img: string;
  medicineID: string;
  name: string;
  brand: string;
  quality: number;
  price: number;
  detail: {
    unit: string;
    category: string;
    dosageForms: string;
    specifications: string;
    Producer: string;
    manufacturingCountry: string;
    ingredient: string;
    shortDescription: string;
  };
}

interface CustomLabelBoxProps {
  label: string;
  value: any;
  borderShow?: boolean;
  styles?: object;
}

const MOCK_MEDICAL_SERVICE = [
  {
    icon: 'https://nhathuoclongchau.com.vn/estore-images/hethongnhathuoc/trahang.svg',
    title: 'Đổi trả trong 30 ngày',
    subTitle: 'Kể từ ngày mua hàng',
  },
  {
    icon: 'https://nhathuoclongchau.com.vn/estore-images/hethongnhathuoc/giaohang.svg',
    title: 'Miễn phí 100%',
    subTitle: 'Đổi thuốc',
  },
  {
    icon: 'https://nhathuoclongchau.com.vn/estore-images/hethongnhathuoc/giaohang.svg',
    title: 'Miễn phí vận chuyển',
    subTitle: 'Theo chính sách giao hàng',
  },
];

const CustomLabelBox = ({
  label,
  value,
  borderShow,
  styles,
}: CustomLabelBoxProps) => {
  return (
    <Flex className="infor-name" flexDirection="column">
      <Box className="infor-name__label">{label}</Box>
      <Box className="infor-name__value" style={styles}>
        {value}
      </Box>
      {borderShow && <Divider />}
    </Flex>
  );
};

const CategoryPersonalCarePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const [role, setRole] = useState<string>('user');

  const [medicalDetail, setMedicalDetail] = useState<IMedicalDetail>(null!);

  const handleNavigateToUserManagement = () => {
    navigate(-1);
  };

  const getMedicalDetail = async () => {
    try {
      setMedicalDetail(MOCK_INFO_Medical);
      setIsLoading(false);
    } catch (error) {
      return { docs: [] };
    }
  };

  useEffectUnsafe(() => {
    getMedicalDetail().then();
  }, [id]);

  const [totalAmount, setTotalAmount] = useState<number>(
    MOCK_INFO_Medical.price,
  );
  useEffectUnsafe(() => {
    setTotalAmount(quantity * MOCK_INFO_Medical.price);
  }, [quantity]);

  const _renderContent = () => {
    if (isLoading) {
      return <Flex className={'box-loading'}>Loading...</Flex>;
    }

    if (!medicalDetail) {
      return <Flex className={'box-loading'}>No data</Flex>;
    }

    return (
      <Flex px={'40px'} mt={10} className="explorer-table">
        <Flex w={'full'} justifyContent={'space-between'}>
          <Box pr={5}>
            <Image src={medicalDetail.img} borderRadius={'10px'} />
          </Box>
          <Flex w={'54%'} flexDirection={'column'}>
            <Flex className="info-list" gap={'10px'} flexDirection={'column'}>
              <Box padding={5}>
                <Box fontSize="24px" color="#1250dc" fontWeight="700">
                  Thông tin sản phẩm
                </Box>
                <CustomLabelBox
                  label="Thương hiệu"
                  value={medicalDetail.brand}
                  borderShow
                />
                <CustomLabelBox
                  label="Tên sản phẩm"
                  value={medicalDetail.name}
                  borderShow
                />
                <CustomLabelBox
                  label="Giá bán"
                  value={`${formatNumber(medicalDetail.price)}đ / ${
                    medicalDetail.detail.unit
                  }`}
                  borderShow
                  styles={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: '#1250dc',
                    marginTop: '4px',
                  }}
                />
                <CustomLabelBox
                  label="Danh mục"
                  value={medicalDetail.detail.category}
                  borderShow
                />
                <CustomLabelBox
                  label="Dạng bào chế"
                  value={medicalDetail.detail.dosageForms}
                  borderShow
                />
                <CustomLabelBox
                  label="Quy cách"
                  value={medicalDetail.detail.specifications}
                  borderShow
                />
                <CustomLabelBox
                  label="Xuất xứ thương hiệu"
                  value={medicalDetail.detail.manufacturingCountry}
                  borderShow
                />
                <CustomLabelBox
                  label="Nhà sản xuất"
                  value={medicalDetail.detail.Producer}
                />
              </Box>
            </Flex>
            <Flex
              flexDirection={'column'}
              color={'black'}
              py={'10px'}
              gap={'10px'}
              fontWeight={700}
            >
              <Box>Chọn số lượng</Box>
              <Flex flexDirection={'row'}>
                <Flex flexDir={'row'} cursor={'pointer'}>
                  <Flex
                    px={'10px'}
                    border={'1px solid #e5e7eb'}
                    borderRadius={'20px 0px 0px 20px'}
                    alignItems={'center'}
                    onClick={() => setQuantity(quantity - 1)}
                    _hover={
                      quantity !== 1
                        ? {
                            backgroundColor: '#a4a7b7',
                            transition: 'background-color 0.3s',
                          }
                        : {}
                    }
                    as={'button'}
                    disabled={quantity === 1}
                  >
                    <MinusIcon
                      boxSize={5}
                      color={`${quantity === 1 && '#a4a7b7'} `}
                    />
                  </Flex>
                  <Input
                    w={'50px'}
                    borderRadius={'none'}
                    border={'1px solid #e5e7eb'}
                    textAlign={'center'}
                    type="number"
                    fontSize={18}
                    onChange={(e) => setQuantity(Number(e.target.value || 1))}
                    value={quantity || 1}
                  />
                  <Flex
                    px={'10px'}
                    border={'1px solid #e5e7eb'}
                    borderRadius={'0 20px 20px 0px'}
                    alignItems={'center'}
                    onClick={() => setQuantity(quantity + 1)}
                    _hover={{
                      backgroundColor: '#a4a7b7',
                      transition: 'background-color 0.3s',
                    }}
                  >
                    <AddIcon boxSize={5} />
                  </Flex>
                  <Flex
                    alignItems={'center'}
                    gap={'10px'}
                    pl={'30px'}
                    fontSize={20}
                  >
                    Ước Chừng: <Text>{totalAmount}</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex gap={'10px'} py={'10px'} justifyContent={'center'}>
                <AppButton w={'80%'} h={'60px'} borderRadius={'50px'}>
                  Chọn Mua
                </AppButton>
                {/* <AppButton
                  variant="formTrade"
                  w={'50%'}
                  h={'60px'}
                  borderRadius={'50px'}
                  onClick={() => navigate('/pharmacy-system')}
                >
                  Tìm Nhà Thuốc
                </AppButton> */}
              </Flex>
              <Flex
                gap={'15px'}
                py={'20px'}
                borderTop={'1px solid #dadfec'}
                justifyContent={'space-between'}
              >
                {MOCK_MEDICAL_SERVICE.map((item, index) => (
                  <Flex
                    flexDirection={'row'}
                    alignItems={'center'}
                    key={index}
                    gap={'20px'}
                  >
                    <Image src={item.icon} w={'50px'} h={'50px'} />
                    <Flex flexDir={'column'}>
                      <Box fontSize={14} fontWeight={700}>
                        {item.title}
                      </Box>
                      <Box fontSize={14} fontWeight={400}>
                        {item.subTitle}
                      </Box>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  };
  return (
    <>
      {role === 'user' ? (
        <BaseHomePage>
          <Box backgroundColor={'#f4f6f9'}>
            <Box className="container-explorer" w={'1440px'} margin={'auto'}>
              <Flex fontSize="24px" flexDirection="row" alignItems="center">
                {/* <Flex
                  pb={'20px'}
                  fontSize="24px"
                  as="b"
                  mr={'30px'}
                  alignItems={'center'}
                  gap={3}
                  color={'#2167df'}
                >
                  <Text
                    cursor={'pointer'}
                    _hover={{ color: '#4490ec' }}
                    onClick={handleNavigateToUserManagement}
                  >
                    Quản lý thuốc
                  </Text>
                  <Box transform="rotate(180deg)">
                    <ArrowLeftIcon />
                  </Box>
                  <Text fontSize="20px">Chi Tiết Thuốc</Text>
                </Flex> */}
              </Flex>
              {_renderContent()}
            </Box>
          </Box>
        </BaseHomePage>
      ) : (
        <BaseAdminPage>
          <Box>
            <Box className="container-explorer">
              <Flex fontSize="24px" flexDirection="row" alignItems="center">
                <Flex
                  pb={'20px'}
                  fontSize="24px"
                  as="b"
                  mr={'30px'}
                  alignItems={'center'}
                  gap={3}
                  color={'#2167df'}
                >
                  <Text
                    cursor={'pointer'}
                    _hover={{ color: '#4490ec' }}
                    onClick={handleNavigateToUserManagement}
                  >
                    Quản lý thuốc
                  </Text>
                  <Box transform="rotate(180deg)">
                    <ArrowLeftIcon />
                  </Box>
                  <Text fontSize="20px">Chi Tiết Thuốc</Text>
                </Flex>
              </Flex>
              {_renderContent()}
            </Box>
          </Box>
        </BaseAdminPage>
      )}
    </>
  );
};

export default CategoryPersonalCarePage;
