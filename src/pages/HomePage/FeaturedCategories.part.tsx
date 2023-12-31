import { Box, Flex, Image, calc } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

const MOCK_FeatureCategories = [
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
];
const FeatureCategories = () => {
  const navigate = useNavigate();

  //   const getAllProduct = async () => {
  //     try {
  //       setProducts(MOCK_MEDICAL_PRODUCT_LIST);
  //       //   return {
  //       //     docs: dataSearch,
  //       //   };
  //     } catch (error) {
  //       return { docs: [] };
  //     }
  //   };

  //   useEffectUnsafe(() => {
  //     getAllProduct();
  //   }, []);

  return (
    <Flex className="feature-container">
      <Flex className="feature-category">
        <Flex className="feature-category--title">
          <Image src="https://cdn.nhathuoclongchau.com.vn/unsafe/28x28/https://cms-prod.s3-sgn09.fptcloud.com/smalls/danh_muc_noi_bat_d03496597a.png" />
          Danh mục nổi bật
        </Flex>
        <Flex flexWrap={'wrap'} gap={'20px'}>
          {MOCK_FeatureCategories.map((item, index) => {
            return (
              <Flex className="feature-category--item" key={index}>
                <Image src={item.icon} />
                <Box className="feature-category--item-name">{item.name}</Box>
                <Box className="feature-category--item-quality">
                  {item.quality} sản phẩm
                </Box>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FeatureCategories;
