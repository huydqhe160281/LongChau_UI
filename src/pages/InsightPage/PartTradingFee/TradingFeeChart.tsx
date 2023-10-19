import { Box, Flex } from '@chakra-ui/react';
import { AppDateRangePicker } from 'src/components';
import React, { useState } from 'react';

interface IParams {
  endTime?: number | null;
  startTime?: number | null;
}

const TradingFeeChart = () => {
  const [params, setParams] = useState<IParams>({});

  return (
    <Box>
      <Flex justifyContent={'flex-end'}>
        <AppDateRangePicker params={params} setParams={setParams} />
      </Flex>
      <Box height={'300px'}></Box>
      <Flex justifyContent={'center'}>Trading Fee</Flex>
    </Box>
  );
};

export default TradingFeeChart;
