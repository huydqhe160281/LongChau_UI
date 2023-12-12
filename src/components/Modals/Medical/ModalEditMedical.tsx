import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC, useState } from 'react';
import AppInput from '../../AppInput';
import rf from 'src/api/RequestFactory';
import { toastError, toastSuccess } from 'src/utils/notify';
import AppSelect from 'src/components/AppSelect';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { IBranch } from 'src/pages/Admin/BranchManagementPage';
import { parseInt } from 'lodash';

interface IModalEditMedicalProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
  data: any;
}

interface IDataBody {
  name: string;
  typeId: number;
  supplierId: number;
  soldAsDose: boolean;
  sensitiveIngredients?: Array<string>;
  description: string;
  unit: string;
  barcode: number;
  price: number;
  size: number;
}

const ModalEditMedical: FC<IModalEditMedicalProps> = (props) => {
  const initDataUser = {
    name: '',
    typeId: NaN,
    supplierId: NaN,
    soldAsDose: false,
    description: '',
    unit: 'bottle',
    barcode: NaN,
    price: NaN,
    size: NaN,
  };
  const { open, onClose, onReload, data } = props;
  data;

  const [dataUser, setDataUser] = useState<IDataBody>(data);
  const [listDrugsType, setListDrugsTypes] = useState<any>([]);
  const [listCate, setListCate] = useState<any>([]);
  const [listSupplier, setListSupplier] = useState<any>([]);
  const [categoriesId, setCategoriesId] = useState<number>(1);

  const createNewBranch = async () => {
    dataUser;

    // try {
    //   await rf.getRequest('ProductRequest').createProduct(dataUser);
    //   onClose();
    //   onReload();
    //   toastSuccess('Tạo mới thuốc thành công');
    // } catch (e: any) {
    //   toastError(e.message);
    // }
  };

  const getDataSupplier = async () => {
    try {
      const res = await rf.getRequest('SupplierRequest').getSupplier();
      const formatData = res.map((r: any) => ({
        value: r.id,
        label: r.name,
      }));
      setListSupplier(formatData);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const listUnit: { value: string; label: string }[] = [
    {
      value: 'bottle',
      label: 'BOTTLE',
    },
    {
      value: 'box',
      label: 'BOX',
    },
    {
      value: 'tube',
      label: 'TUBE',
    },
    {
      value: 'pellet',
      label: 'PELLET',
    },
    {
      value: 'blister',
      label: 'BLISTER',
    },
  ];

  const asDoseList: { value: string; label: string }[] = [
    {
      value: 'true',
      label: 'Có',
    },
    {
      value: 'false',
      label: 'Không',
    },
  ];

  const getDataCate = async () => {
    try {
      const res = await rf.getRequest('CategoryRequest').getAllCate();
      const formatData = res.map((r: any) => ({
        value: r.id,
        label: r.name,
      }));
      setListCate(formatData);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getDataDrugsType = async () => {
    try {
      const res = await rf
        .getRequest('CategoryRequest')
        .getAllDrugsTypeByCateID(categoriesId);
      const formatData = res.map((r: IBranch) => ({
        value: r.id,
        label: r.name,
      }));
      setListDrugsTypes(formatData);
    } catch (e: any) {
      toastError(e.message);
    }
  };

  useEffectUnsafe(() => {
    getDataCate();
    getDataSupplier();
  }, []);

  useEffectUnsafe(() => {
    getDataDrugsType();
  }, [categoriesId]);

  return (
    <BaseModal
      size="xl"
      title="Tạo mới thuốc"
      isOpen={open}
      onClose={onClose}
      className="modal-languages"
    >
      <Flex alignItems="center">
        <Flex
          className="delist-confirm"
          flexDirection={'column'}
          gap={'15px'}
          w={'full'}
        >
          <AppInput
            label="Tên thuốc"
            value={dataUser.name}
            onChange={(e: any) =>
              setDataUser({ ...dataUser, name: e.target.value.trim() })
            }
          />

          <Box zIndex={2002}>
            <AppSelect
              label="Chi nhánh"
              width={'full'}
              options={listSupplier}
              value={dataUser.supplierId}
              onChange={(value: string) =>
                setDataUser({
                  ...dataUser,
                  supplierId: +value,
                })
              }
              size="medium"
              showFullName
            />
          </Box>

          <Box zIndex={2001}>
            <AppSelect
              label="Bán theo đơn"
              width={'full'}
              options={asDoseList}
              value={dataUser.soldAsDose + ''}
              onChange={(value: string) => {
                if (value === 'true') {
                  setDataUser({
                    ...dataUser,
                    soldAsDose: true,
                  });
                } else {
                  setDataUser({
                    ...dataUser,
                    soldAsDose: false,
                  });
                }
              }}
              size="medium"
              showFullName
            />
          </Box>
          <Box zIndex={2000}>
            <AppSelect
              label="Chi Nhánh"
              width={'full'}
              options={listUnit}
              value={dataUser.unit}
              onChange={(value: string) =>
                setDataUser({
                  ...dataUser,
                  unit: value,
                })
              }
              size="medium"
              showFullName
            />
          </Box>
          {/* <Box zIndex={1999}>
            <AppSelect
              label="Loại"
              width={'full'}
              options={listCate}
              value={dataUser.supplierId}
              onChange={(value: string) => setCategoriesId(+value)}
              size="medium"
              showFullName
            />
          </Box> */}
          <Box zIndex={1998}>
            <AppSelect
              label="Phân Loại"
              width={'full'}
              options={listDrugsType}
              value={dataUser.typeId}
              onChange={(value: string) =>
                setDataUser({
                  ...dataUser,
                  typeId: +value,
                })
              }
              size="medium"
              showFullName
            />
          </Box>
          <AppInput
            label="Bar-code"
            value={dataUser.barcode}
            onChange={(e: any) =>
              setDataUser({
                ...dataUser,
                barcode: +e.target.value.trim(),
              })
            }
          />
          <Flex gap={1}>
            <AppInput
              label="Giá (vnd)"
              value={dataUser.price}
              onChange={(e: any) =>
                setDataUser({ ...dataUser, price: +e.target.value.trim() })
              }
            />
            <AppInput
              label="Kích cỡ"
              value={dataUser.size}
              onChange={(e: any) =>
                setDataUser({ ...dataUser, size: +e.target.value.trim() })
              }
            />
          </Flex>
          <AppInput
            label="Chi tiết"
            value={dataUser.description}
            onChange={(e: any) =>
              setDataUser({ ...dataUser, description: e.target.value.trim() })
            }
          />
          <Flex justifyContent={'space-around'} gap={'10px'} pb={6} mt={3}>
            <AppButton
              className="btn-outline-hover"
              flex={1}
              variant="primary"
              onClick={onClose}
              w={'100%'}
            >
              Hủy
            </AppButton>
            <AppButton flex={1} onClick={createNewBranch}>
              Tạo mới
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalEditMedical;
