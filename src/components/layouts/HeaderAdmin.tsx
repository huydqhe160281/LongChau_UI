import {
  Flex,
  Box,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ArrowLogout, DoorLogout } from 'src/assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUserProfile } from 'src/store/user';
import { useNavigate } from 'react-router-dom';
import Storage from 'src/utils/storage';
import { RootState } from 'src/store';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import rf from 'src/api/RequestFactory';
import { useState } from 'react';
import ModalViewEditProfile from '../Modals/ModalView-EditProfile';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  const handleViewEditProfile = () => {
    setOpenModal(true);
  };

  const accessToken = Storage.getAccessToken();
  const role = Storage.getRole();
  const { userProfile } = useSelector((state: RootState) => state.user);

  const getUserProfile = async () => {
    const dataInfo = await rf.getRequest('UserRequest').getProfile();
    dispatch(setUserProfile(dataInfo));
  };

  useEffectUnsafe(() => {
    getUserProfile();
  }, []);
  return (
    <Flex className="header" justifyContent={'space-between'}>
      <Box>Hust Pharmacy Dashboard</Box>

      {accessToken ? (
        <Box>
          <Menu>
            <MenuButton>
              <Flex
                alignItems={'center'}
                gap={1}
                fontSize={20}
                fontWeight={700}
              >
                <Avatar name={userProfile?.firstName} size="sm" />
                {userProfile?.firstName}_{role}!!
              </Flex>
            </MenuButton>
            <MenuList className="menu-header">
              <MenuItem
                onClick={handleViewEditProfile}
                color={'black'}
                _hover={{
                  bg: '#2167df',
                  color: 'white',
                }}
              >
                Tài khoản
              </MenuItem>
              <MenuItem className="user-info logout" onClick={onLogout}>
                <span className="door-logout">
                  <DoorLogout />
                </span>
                <span className="arrow-logout">
                  <ArrowLogout />
                </span>{' '}
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ) : null}
      {openModal && (
        <ModalViewEditProfile
          open={openModal}
          onClose={() => setOpenModal(false)}
          data={userProfile}
        />
      )}
    </Flex>
  );
};

export default Header;
