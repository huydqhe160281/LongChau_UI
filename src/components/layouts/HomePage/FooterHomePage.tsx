import { Flex, Box, Text, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpIcon } from '@chakra-ui/icons';
import AppButton from '../../AppButton';
import subFooter from '../../../assets/icons/sub-footer.png';
import { MapIcon } from 'src/assets/icons';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { useState } from 'react';

const Mock_FOOTER1 = [
  {
    title: 'Về chúng tôi',
    content: [
      {
        title: 'Giới thiệu',
        link: 'https://pharmacy-documentation.vercel.app/docs/intro',
      },
      {
        title: 'Giấy phép kinh doanh',
        link: 'https://pharmacy-documentation.vercel.app/docs/about-me/business-license',
      },
      {
        title: 'Quy chế hoạt động website',
        link: 'https://pharmacy-documentation.vercel.app/docs/about-me/website-operations',
      },
      {
        title: 'Chính sách đặt cọc',
        link: 'https://pharmacy-documentation.vercel.app/docs/about-me/deposit-policy',
      },
      {
        title: 'Chính sách giao hàng',
        link: 'https://pharmacy-documentation.vercel.app/docs/about-me/delivery-policy',
      },
      {
        title: 'Chính sách bảo mật',
        link: 'https://pharmacy-documentation.vercel.app/docs/about-me/privacy-policy',
      },
      {
        title: 'Chính sách thanh toán',
        link: 'https://pharmacy-documentation.vercel.app/docs/about-me/payment-policy',
      },
      {
        title: 'Thu nhập và xử lý dữ liệu',
        link: 'https://pharmacy-documentation.vercel.app/docs/about-me/data-personal-policy',
      },
    ],
  },
  {
    title: 'Danh Mục',
    content: [
      {
        title: 'Thực phẩm chức năng',
        link: '#',
      },
      {
        title: 'Dược mỹ phẩm',
        link: '#',
      },
      {
        title: 'Chăm sóc cá nhân',
        link: '#',
      },
      {
        title: 'Thuốc',
        link: '#',
      },
    ],
  },
  {
    title: 'Tìm hiểu thêm',
    content: [
      {
        title: 'Góc sức khỏe',
        link: '#',
      },
      {
        title: 'Tra cứu thuốc',
        link: '#',
      },
      {
        title: 'Tra cứu dược chất',
        link: '#',
      },
      {
        title: 'Tra cứu dược liệu',
        link: '#',
      },
    ],
  },
  {
    title: 'Tổng đài',
    content: [
      {
        title: 'Tư vấn mua hàng',
        link: '#',
      },
      {
        title: 'Tư vấn vaccine',
        link: '#',
      },
      {
        title: 'Góp ý, khiếu nại',
        link: '#',
      },
    ],
  },
];
const FooterHomePage = () => {
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (window.pageYOffset > 700) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  useEffectUnsafe(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <Box
        w={'full'}
        backgroundColor={'#eaeffb'}
        pb={'30px'}
        userSelect={'none'}
      >
        <Image margin={'auto'} src={subFooter} />
      </Box>
      <Flex
        style={{
          background: 'linear-gradient(to bottom, #2976fc, #0250be)',
        }}
      >
        <Flex
          h={'90px'}
          w={'1440px'}
          margin={'auto'}
          fontSize={22}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Flex
            gap={'10px'}
            cursor={'pointer'}
            onClick={() => handleNavigate(`/pharmacy-system`)}
          >
            <MapIcon />
            Xem hệ thống {1413} nhà thuốc trên toàn quốc
          </Flex>
          <AppButton
            size="lg"
            borderRadius={'30px'}
            backgroundColor={'white'}
            color={'#2976fc'}
            _hover={{
              color: 'white',
              backgroundColor: '#2976fc',
            }}
            onClick={() => handleNavigate('/pharmacy-system')}
          >
            Xem danh sách nhà thuốc
          </AppButton>
        </Flex>
      </Flex>
      <Flex backgroundColor={'#f4f6f9'}>
        <Flex w={'1440px'} margin={'auto'} flexDirection={'column'}>
          <Flex p={'20px 0 30px 0'}>
            {Mock_FOOTER1.map((item, index) => (
              <Flex
                key={index}
                flexDirection={'column'}
                pt={'10px'}
                w={'full'}
                h={'full'}
                fontSize={14}
                gap={'10px'}
              >
                <Text fontSize={16} fontWeight={'bold'} color={'#657384'}>
                  {item.title}
                </Text>
                {item.content.map((subItem, indexItem) => (
                  <Flex key={indexItem}>
                    <Text
                      as={'a'}
                      href={subItem.link}
                      color={'#1e72ff'}
                      transition={'color 0.3s ease, padding-left 0.3s ease'} // Thêm transition cho color và padding-left
                      _hover={{
                        color: '#0250be',
                        paddingLeft: '10px',
                      }}
                    >
                      {subItem.title}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            ))}
          </Flex>
          <Flex
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            p={'15px 0 30px 0'}
            borderTop={'1px solid #dadfec'}
            color={'#4a4f63'}
          >
            <Box>
              © 2018 - 2023 Công ty Cổ Phần Dược Phẩm Hust Pharmacy Số ĐKKD
              0123456789 cấp ngày 17/09/2023 tại Đại học Bách Khoa Hà Nội.
            </Box>
            <Flex flexWrap={'nowrap'} gap={'3px'}>
              <li>Địa chỉ: Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</li>
              <li>
                Số điện thoại:{' '}
                <a href="#" style={{ color: '#1250dc' }}>
                  (012)3456789
                </a>
              </li>
              <li>
                Email:{' '}
                <a href="#" style={{ color: '#1250dc' }}>
                  minh.vc184155@sis.hust.edu.vn
                </a>
              </li>
              <li>Người quản lý nội dung: Vũ Công Minh</li>
            </Flex>
          </Flex>

          <Flex
            onClick={scrollToTop}
            className={`back-to-top-button${showBackToTop ? ' active' : ''}`}
          >
            <ArrowUpIcon style={{ width: '20px' }} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default FooterHomePage;
