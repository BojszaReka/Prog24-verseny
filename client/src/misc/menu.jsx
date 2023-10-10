import * as React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import FoodSavers from '../components/foodSavers'
import AboutUs from '../components/about'
import JoinUs from '../components/join'

export default function Menu(){

    return(
        <Tabs isFitted>
        <TabList>
            <Tab>Ételmentők</Tab>
            <Tab>Rólunk</Tab>
            <Tab>Csatlakozz</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <FoodSavers/>
            </TabPanel>
            <TabPanel>
                <AboutUs/>
            </TabPanel>
            <TabPanel>
                <JoinUs/>
            </TabPanel>
        </TabPanels>
        </Tabs>
    )

  }

