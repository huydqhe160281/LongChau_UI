import { Box, Flex, Image, calc } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import '../styles/components/AppCategories.scss';

// interface IDataProps {
//   name: string;
//   quality?: number;
// }

interface IAppCategoriesProps {
  data: Array<any>;
  title: string;
  numInline?: number;
  showIcon?: boolean;
}

const AppCategories = (props: IAppCategoriesProps) => {
  const { data, title, numInline = 6, showIcon = false } = props;
  const navigate = useNavigate();

  return (
    <Flex className="feature-container">
      <Flex className="feature-category">
        <Flex className="feature-category--title">
          {showIcon && (
            <Image src="https://cdn.nhathuoclongchau.com.vn/unsafe/28x28/https://cms-prod.s3-sgn09.fptcloud.com/smalls/danh_muc_noi_bat_d03496597a.png" />
          )}
          {title}
        </Flex>
        <Flex flexWrap={'wrap'} gap={'20px'}>
          {data.map((item) => {
            return (
              <Flex
                className="feature-category--item"
                w={`calc(100% / ${numInline} - 20px);`}
                onClick={() => navigate(`/category-medicine/${item.name}`)}
              >
                <Image
                  src={
                    'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png'
                  }
                />
                <Box className="feature-category--item-name">{item}</Box>
                <Box className="feature-category--item-quality">
                  {item?.quality} sản phẩm
                </Box>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AppCategories;