import { NextPage } from 'next'
import NextLink from 'next/link'
import { Box, Button, Center, Flex, Input, Stack, Text } from '@chakra-ui/react'
import { /*Auth,*/ Link } from '@saas-ui/react'
import { Features } from 'components/features'
import { BackgroundGradient } from 'components/gradients/background-gradient'
import { Section } from 'components/section'
import siteConfig from 'data/config'

import { FaGithub, FaGoogle } from 'react-icons/fa'
import { PageTransition } from 'components/motion/page-transition'
import { HttpService } from 'services/http-service'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { OTP_ROUTE_EMAIL, OTP_ROUTE_KEY } from 'helpers/constants'

const OTP: NextPage = () => {
  const [otp, setOtp] = useState('')
  const [sessionKey, setSessionKey] = useState(null)
  const [sessionEmail, setSessionEmail] = useState(null)
  const router = useRouter()

  const login = () => {
    HttpService.post('/auth/otp/login', {
      otp: otp,
      email: sessionEmail,
      session_key: sessionKey
    })
      .then(response => {
        if (response.data.success) {
          sessionStorage.setItem('user', JSON.stringify(
            {
              accessToken: response.data.accessToken,
              isRegistrationPending: response.data.isRegistrationPending
            }
          ))
          router.push('/survey')
        }
      })
      .catch(error => {
        if (error.response.status == 422) {
          router.push('/')
        }

        if (error.response.status == 401) {
          router.push('/signup')
        }
      })
  }

  useEffect(() => {
    let key = localStorage[OTP_ROUTE_KEY]
    let email = localStorage[OTP_ROUTE_EMAIL]

    if (!key || !email) {
      router.push('/signup')
    }

    setSessionKey(key)
    setSessionEmail(email)
  }, [])

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

              <Box fontSize={'md'} fontWeight={'bold'} mb={'2'}>OTP</Box>
              <Input type='number' mb={'1'} value={otp} onChange={(e) => setOtp(e.target.value)} />

              <Flex mt={'4'}>
                <Button colorScheme='purple' w={'100%'} py={'5'} onClick={login}> Login </Button>
              </Flex>
            </Box>
          </Center>
        </Stack>
      </PageTransition>
    </Section>
  )
}

export default OTP

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
