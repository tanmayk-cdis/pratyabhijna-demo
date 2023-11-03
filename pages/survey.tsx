import { Box, Button, Container, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, useDisclosure, useTheme } from "@chakra-ui/react";
import { transparentize } from "@chakra-ui/theme-tools";
import { HighlightsItem } from "components/highlights";
import { SEO } from "components/seo";
import { Testimonial } from "components/testimonials";
import { Em } from "components/typography";
import { NextPage } from "next";
import { HeroSection } from "pages";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export const Survey: NextPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
        <Box>
            <SEO
                title="Saas UI Landingspage"
                description="Free SaaS landingspage starter kit"
            />
            <Box>
                <SurveyHero openModal={() => setIsModalOpen(true)} />
            </Box>

            <SurveyModal open={isModalOpen} onClosed={() => setIsModalOpen(false)} />
        </Box>
    );
};

type SurveyHeroProps = {
    openModal: () => void
}

export const SurveyHero = ({
    openModal
}: SurveyHeroProps) => {

    return (
        <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
            <Card
                title="First Task"
                description={
                    <>
                        Get started for free with <Em>30+ open source components</Em>.
                        Including authentication screens with Clerk, Supabase and Magic.
                        Fully functional forms with React Hook Form. Data tables with React
                        Table.
                    </>
                }
                openModal={openModal}
            />
        </Container>
    )
}

type CardProps = {
    description: ReactNode
    title: string
    openModal: () => void
}

const Card = ({
    title,
    description,
    openModal
}: CardProps) => {
    const gradient = ["primary.500", "secondary.500"]
    const theme = useTheme();

    return (
        <HighlightsItem
            justifyContent="center"
            _dark={{ borderColor: "whiteAlpha.300" }}
            // p="4"
            gap={5}
            title={title}
        // {...rest}
        >
            <Box
                bgGradient={`linear(to-br, ${transparentize(
                    gradient[0],
                    0.8
                )(theme)}, ${transparentize(gradient[1], 0.8)(theme)})`}
                opacity="1"
                position="absolute"
                inset="0px"
                pointerEvents="none"
                zIndex="0"
                _dark={{ opacity: 0.5, filter: "blur(50px)" }}
            />

            <Text color="muted" fontSize="xl">
                {description}
            </Text>

            <Button
                alignSelf={"end"}
                size={"lg"}
                colorScheme={"blue"}
                onClick={openModal}
            >
                Start
            </Button>
        </HighlightsItem>
    )
}

type ModalProps = {
    onClosed: () => void
    open: boolean
}

const SurveyModal = ({
    onClosed,
    open
}: ModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const DEFAULT_DURATION = 0.55
    const [duration, setDuration] = useState(DEFAULT_DURATION)

    useEffect(() => {
        if (open) {
            onOpen()
        }
    }, [open])

    useEffect(() => {
        if (!isOpen)
            onClosed()
    }, [isOpen])

    return (
        <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                {/* <ModalHeader>Modal Title</ModalHeader> */}

                {/* <ModalCloseButton /> */}

                <ModalBody textAlign={"center"} justifyContent={"center"} padding={{ lg: "28", base: "10" }}>
                    <Heading as={"h2"} size={"3xl"}>
                        Task #1
                    </Heading>
                    {/* <Lorem count={2} /> */}

                    <Text
                        mt={"10"}
                    >

                        asdfasdfasdf asd fasdf asdf asf
                    </Text>

                    <Button
                        size={"lg"}
                        colorScheme="blue"
                        mt={"5"}>
                        Start
                    </Button>

                    <Flex
                        direction={"column"}
                        alignItems={"center"}
                        mt={"10"}
                    >
                        <BlinkingBox duration={duration} />

                        <Box
                            mt={10}
                            width={"50%"}
                        >
                            <Slider
                                defaultValue={DEFAULT_DURATION}
                                min={0.1}
                                max={1}
                                step={0.05}
                                onChange={setDuration}
                            >
                                <SliderTrack bg='purple.100'>
                                    <Box position='relative' right={10} />
                                    <SliderFilledTrack bg='purple.400' />
                                </SliderTrack>
                                <SliderThumb boxSize={6} />
                            </Slider>
                        </Box>
                        {
                            duration
                        }
                        <Button size={"lg"} mt={"20"}>
                            Submit
                        </Button>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const BlinkingBox = ({
    duration
}: {
    duration: number
}) => {
    const [show, setShow] = useState(true)
    const SIDE = "180px"

    useEffect(() => {
        setShow(false)
        setTimeout(() => setShow(true), 1)
    }, [duration])

    return (
        <Box
            height={SIDE}
            width={SIDE}
        >
            {
                show &&
                <motion.div
                    // initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1] }}
                    transition={{
                        duration: duration,
                        repeat: Infinity,
                        repeatType: "mirror"
                    }}
                >
                    <Box
                        height={SIDE}
                        width={SIDE}
                        bg={"#fff"}
                    >
                    </Box>
                </motion.div>
            }
        </Box>
    )
}

export default Survey