import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import 'src/styles/components/AppTabs.scss';

export interface ITabs {
  id: string;
  name: string;
  content: ReactNode;
}

interface ISubHeader {
  defaultTab?: number;
  tabs: ITabs[];
  onChange?: (value: string) => void;
  rightElement?: () => ReactNode;
  overflow?: 'hidden' | 'auto';
}

const SubHeader: FC<ISubHeader> = ({
  defaultTab = 0,
  tabs,
  onChange,
  rightElement,
  overflow,
}) => {
  return (
    <Tabs
      h={'full'}
      display="flex"
      flexDirection={'column'}
      variant={'unstyled'}
      colorScheme="transparent"
      defaultIndex={defaultTab}
      className="app-tab"
      isLazy
      overflow={overflow}
    >
      <TabList className="tab-list">
        <Flex justifyContent={'space-between'} alignItems="center" w="100%">
          <Flex>
            {tabs.map((tab: ITabs) => {
              return (
                <Tab
                  id={tab.id}
                  key={tab.id}
                  className="app-tab__name-tab"
                  onClick={() => onChange && onChange(tab.id)}
                >
                  {tab.name}
                </Tab>
              );
            })}
          </Flex>

          <Box>{rightElement ? rightElement() : ''}</Box>
        </Flex>
      </TabList>

      <TabPanels flex={1}>
        {tabs.map((tab: any) => {
          return (
            <TabPanel key={tab.id} h={'full'} className="app-tab__content-tab">
              {tab.content}
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export default SubHeader;
