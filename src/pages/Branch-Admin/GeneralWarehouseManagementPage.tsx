import { useRef, useState } from 'react';
import { AppInput } from 'src/components';
import { SearchExplorer } from 'src/assets/icons';
import {
  Box,
  Flex,
  InputGroup,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react';
import { AppDataTable, AppButton } from 'src/components';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { BaseBranchAdminPage } from 'src/components/layouts';
import rf from 'src/api/RequestFactory';
import ModalDeleteDrugFromBranchWarehouse from 'src/components/Modals/Rack/ModalDeleteDrugFromBranchWarehouse';

const BranchAdminGeneralWarehouseManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<any[]>([]);
  const dataRef = useRef<any[]>([]);
  const [
    openModalDeleteDrugsFromBranchWarehouse,
    setOpenModalDeleteDrugsFromBranchWarehouse,
  ] = useState<boolean>(false);
  const [drugId, setDrugId] = useState<number>(NaN);
  const [rackId, setRackId] = useState<number>(NaN);
  const [params, setParams] = useState<any>({});

  const handleSearch = () => {
    let dataFilter = dataRef.current;

    if (valueSearch) {
      dataFilter = dataFilter.filter((item: any) =>
        item.name.toLowerCase().includes(valueSearch.toLowerCase()),
      );
      setDataSearch(dataFilter);
    }

    setDataSearch(dataFilter);
  };

  useEffectUnsafe(() => {
    handleSearch();
  }, [valueSearch]);

  const handleDeleteDrugsFromBranchWarehouse = (id: number) => {
    setDrugId(id);
    setOpenModalDeleteDrugsFromBranchWarehouse(true);
  };

  const onReload = () => setParams(params);

  const getDataTable = async () => {
    try {
      const res = await rf.getRequest('RackRequest').getMyRackBranch();
      dataRef.current = res.drugs;
      setDataSearch(res.drugs);
      setRackId(res.id);

      return {
        docs: res.drugs,
      };
    } catch (error) {
      return { docs: [] };
    }
  };

  const _renderHeaderTable = () => {
    return (
      <Flex>
        <Box className="category--header-cell-body category--id">ID</Box>
        <Box className="category--header-cell-body category--name">Tên</Box>
        <Box className="category--header-cell-body category--quality">
          số lượng(thuốc)
        </Box>
        <Box className="category--header-cell-body category--action">
          Action
        </Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: any[]) => {
    return (
      <Box>
        {dataSearch.map((data: any, id: number) => {
          return (
            <RowAddressTransactionTable data={data} key={`${id}-coin-table`} />
          );
        })}
      </Box>
    );
  };

  const RowAddressTransactionTable: React.FC<{
    data: any;
  }> = ({ data }) => {
    return (
      <Flex className="category--row-wrap" direction={'column'}>
        <Flex>
          <Flex className="category--cell-body category--id">
            <Box cursor={'pointer'}>{data.id}</Box>
          </Flex>
          <Box className="category--cell-body category--name">
            <Tooltip
              hasArrow
              className="tooltip-app"
              label={data.name ? data.name : ''}
              placement="top"
            >
              <Box
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                maxW="550px"
                cursor="pointer"
              >
                {data.name ? data.name : '--'}
              </Box>
            </Tooltip>
          </Box>
          <Flex
            flexDirection="row"
            className="category--cell-body category--quality"
          >
            {data?.quantity ? data?.quantity : '--'}
          </Flex>
          <Box
            className="category--cell-body category--action"
            cursor={'pointer'}
          >
            <AppButton
              size={'sm'}
              bg={'yellow.100'}
              ml={'3px'}
              onClick={() => handleDeleteDrugsFromBranchWarehouse(data.id)}
            >
              Bỏ Thuốc
            </AppButton>
          </Box>
        </Flex>
      </Flex>
    );
  };

  return (
    <BaseBranchAdminPage>
      <Box className="category" w="full">
        <Flex
          fontSize="24px"
          as="b"
          mr={'30px'}
          alignItems={'center'}
          gap={3}
          color={'#2167df'}
        >
          Quản lý kho chi nhánh
        </Flex>
        <Box className={'category__search'}>
          <Flex alignItems={'center'}>
            <Box className={'category__search-title'}>Tổng kho:</Box>
            <Box className="category__search-input">
              <InputGroup>
                <AppInput
                  color={'black'}
                  placeholder="Nhập để tìm kiếm..."
                  size="md"
                  value={valueSearch}
                  onChange={(e: any) => setValueSearch(e.target.value)}
                />
                <InputRightElement top={4}>
                  <SearchExplorer />
                </InputRightElement>
              </InputGroup>
            </Box>
          </Flex>
        </Box>

        <Box mt={10} className="category-container">
          <AppDataTable
            requestParams={params}
            fetchData={getDataTable}
            renderBody={_renderContentTable}
            renderHeader={_renderHeaderTable}
            size={10}
          />
        </Box>
      </Box>
      {openModalDeleteDrugsFromBranchWarehouse && (
        <ModalDeleteDrugFromBranchWarehouse
          open={openModalDeleteDrugsFromBranchWarehouse}
          onClose={() => setOpenModalDeleteDrugsFromBranchWarehouse(false)}
          drugId={drugId}
          rackId={rackId}
          onReload={onReload}
        />
      )}
    </BaseBranchAdminPage>
  );
};

export default BranchAdminGeneralWarehouseManagementPage;
