import React from 'react';
import BaseHomePage from 'src/components/layouts/BaseHomePage';
import ProductList from './ProductList.part';
import FavoriteBrand from './FavoriteBrand.part';
import FeatureCategoriesPage from './FeaturedCategories.part';
import { Box } from '@chakra-ui/react';
import '../../styles/pages/HomePage.scss';

const HomePage = () => {
  return (
    <>
      <BaseHomePage>
        <Box className="homepage-container">
          <ProductList />
          <FavoriteBrand />
          <FeatureCategoriesPage />
        </Box>
      </BaseHomePage>
    </>
  );
};

export default HomePage;
