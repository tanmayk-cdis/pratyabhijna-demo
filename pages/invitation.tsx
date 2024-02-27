import { Box, Button, Center, Flex, Input, Stack } from "@chakra-ui/react";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { PageTransition } from "components/motion/page-transition";
import { Section } from "components/section";
import siteConfig from "data/config";
import { EMAIL_REGEX } from "helpers/constants";
import { NextPage } from "next";
import NextLink from 'next/link'
import { useState } from "react";
import { HttpService } from "services/http-service";

const Invitation: NextPage = () => {
    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(false)

    const getLink = () => {
        if (!email || (email.match(EMAIL_REGEX) == null)) {
            alert('Please enter a valid email.')
            return
        }

        HttpService.post('/send-link', {
            email
        })
            .then(({ data: { success } }) => {
                if (success) {
                    alert("Check your mail for the project link!")
                    setEmailSent(true)
                }
            })
    }

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
                    alignItems={{ base: 'center' }}
                    spacing="20"
                    flexDirection={{ base: 'column' }}
                >
                    <Box>
                        <NextLink href="/">
                            <Box
                                // ms="4"
                                mb={{ base: 0 }}
                                fontSize={'2xl'}
                                fontWeight={'bold'}
                            >
                                Get the link to the Imagination study in your inbox!
                            </Box>
                        </NextLink>
                    </Box>

                    <Center height="100%" flex="1" w={'100%'}>
                        <Box w={{ base: "100%", md: "400px" }} pt="0" px="0" id='abc'>
                            <Box fontSize={'md'} fontWeight={'bold'} mb={'2'}>Enter email below</Box>
                            <Input type='text' mb={'1'} value={email} onChange={(e) => setEmail(e.target.value)} />

                            {
                                !emailSent &&
                                <Flex mt={'4'}>
                                    <Button colorScheme='purple' w={'100%'} py={'5'} onClick={getLink}> Submit </Button>
                                </Flex>
                            }
                        </Box>
                    </Center>
                </Stack>
            </PageTransition>
        </Section>
    )
}

export default Invitation
