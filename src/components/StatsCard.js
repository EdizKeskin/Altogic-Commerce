import { Box, Flex, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

function StatsCard(props) {
  return (
    <Stat
    px={{ base: 2, md: 4 }}
    py={'5'}
    shadow={'xl'}
    border={'1px solid'}
    backdropFilter={"blur(8px)"}
    borderColor={useColorModeValue('gray.800', 'gray.500')}
    rounded={'lg'}>
    <Flex justifyContent={'space-between'}>
      <Box pl={{ base: 2, md: 4 }}>
        <StatLabel fontWeight={'medium'} isTruncated>
          {props.title}
        </StatLabel>
        <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
          {props.stat}
        </StatNumber>
      </Box>
      <Box
        my={'auto'}
        color={useColorModeValue('gray.800', 'gray.200')}
        alignContent={'center'}>
        {props.icon}
      </Box>
    </Flex>
  </Stat>
  )
}

export default StatsCard