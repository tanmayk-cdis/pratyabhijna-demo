import { NextPage } from 'next'
import NextLink from 'next/link'
import { Box, Button, Center, Input, Stack, Text } from '@chakra-ui/react'
import { /*Auth,*/ Link } from '@saas-ui/react'
import { Features } from 'components/features'
import { BackgroundGradient } from 'components/gradients/background-gradient'
import { Section } from 'components/section'
import siteConfig from 'data/config'

import { FaGithub, FaGoogle } from 'react-icons/fa'
import { PageTransition } from 'components/motion/page-transition'

const providers = {
  google: {
    name: 'Google',
    icon: FaGoogle,
  },
  github: {
    name: 'Github',
    icon: FaGithub,
    variant: 'solid',
  },
}

const Login: NextPage = () => {
  return (
    <Section height="100vh" innerWidth="container.xl">
      <BackgroundGradient
        zIndex="-1"
        width={{ base: 'full' }}
        left="auto"
        right="0"
        borderLeftWidth="1px"
        borderColor="gray.200"
        _dark={{
          borderColor: 'gray.700',
        }}
      />
      <PageTransition height="100%" display="flex" alignItems="center">
        <Stack
          width="100%"
          alignItems={{ base: 'center', lg: 'flex-start' }}
          spacing="20"
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <Box width={'50%'}>
            <NextLink href="/">
              <Box
                // ms="4"
                mb={{ base: 0, lg: 16 }}
                fontSize={'2xl'}
                fontWeight={'bold'}
              >
                {siteConfig.seo.title}
              </Box>
            </NextLink>

            {siteConfig.seo.description}
          </Box>
          <Center height="100%" flex="1">
            <Box width="100%" pt="8" px="8" id='abc'>
              <Box textAlign={'center'} fontSize={'2xl'} fontWeight={'bold'} mb={'9'}>{siteConfig.signup.title}</Box>

              <Box fontSize={'md'} fontWeight={'bold'} mb={'2'}>Email</Box>
              <Input type='text' mb={'1'} />

              <Text color="muted" fontSize="sm" mb={'3'}>
                By signing up you agree to our{' '}
                <Link href={siteConfig.termsUrl} color="white">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href={siteConfig.privacyUrl} color="white">
                  Privacy Policy
                </Link>
              </Text>

              <Button colorScheme='purple' w={'100%'} py={'5'}> Get OTP </Button>
            </Box>
          </Center>
        </Stack>
      </PageTransition>
    </Section>
  )
}

export default Login

export const getStaticProps = () => {
  return {
    props: {
      header: {
        display: 'none',
      },
      footer: {
        borderTopWidth: '1px',
      },
    },
  }
}
