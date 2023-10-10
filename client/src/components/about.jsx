import * as React from 'react'
import {Stack, Button, SimpleGrid, Box, Text, Heading, Tooltip, Image} from '@chakra-ui/react'

export default function Rolunk(){
    return(
        <>
            <SimpleGrid columns={2} spacing={10} minChildWidth='400px' spacingY='20px'>
            <Box maxW='32rem' fontFamily='Georgia' >
                <Image src='https://www.jotform.com/blog/wp-content/uploads/2020/05/How-to-start-a-food-delivery-business.png' alt='' />
            </Box>
            <Box maxW='32rem' fontFamily='Georgia' >
                <Heading mb={4}>Az ételmentők feladata</Heading>
                <Text fontSize='m'>
                    bla bla bla
                </Text>
            </Box>
            </SimpleGrid>
            
        </>
    )
}