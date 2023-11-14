import { Box, Button, Container, Flex, Heading, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, useDisclosure, useTheme } from "@chakra-ui/react";
import { transparentize } from "@chakra-ui/theme-tools";
import { HighlightsItem } from "components/highlights";
import { SEO } from "components/seo";
import { Testimonial } from "components/testimonials";
import { Em } from "components/typography";
import { NextPage } from "next";
import { HeroSection } from "pages";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { AnimationScope, motion, useAnimate } from "framer-motion";
import { motion as motion3d } from "framer-motion-3d";

export const Survey: NextPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [taskIndex, setTaskIndex] = useState<number>(0)

    const saveTaskResponse = (response: string | number) => {
        console.log("Saving Response: ", response)
        setIsModalOpen(false)
        console.log('works')
    }


    const tasks = [
        {
            title: "First Task",
            description: <>
                Get started for free with <Em>30+ open source components</Em>.
                Including authentication screens with Clerk, Supabase and Magic.
                Fully functional forms with React Hook Form. Data tables with React
                Table.
            </>,
            content: <BlinkingBoxTask save={saveTaskResponse} />
        },
        {
            title: "Second Task",
            description: <>
                Lorem Ipsum <Em>30+ open source components</Em>.
                Including authentication screens with Clerk, Supabase and Magic.
                Fully functional forms with React Hook Form. Data tables with React
                Table.
            </>,
            content: <TaskWithMCQImages
                reference="/static/images/tasks/1.gif"
                options={["/static/images/tasks/1.gif", "/static/images/tasks/1.gif", "/static/images/tasks/1.gif", "/static/images/tasks/1.gif"]}
                save={saveTaskResponse} />
        },
        {
            title: "Third Task",
            description: <>
                Lorem Ipsum <Em>30+ open source components</Em>.
                Including authentication screens with Clerk, Supabase and Magic.
                Fully functional forms with React Hook Form. Data tables with React
                Table.
            </>,
            content: <RotatingCubeTask save={saveTaskResponse} />
        },
        {
            title: "Fourth Task",
            description: <>
                Lorem Ipsum <Em>30+ open source components</Em>.
                Including authentication screens with Clerk, Supabase and Magic.
                Fully functional forms with React Hook Form. Data tables with React
                Table.
            </>,
            content: <TaskWithMCQImages
                reference="/static/images/tasks/2.gif"
                options={["/static/images/tasks/2.gif", "/static/images/tasks/2.gif", "/static/images/tasks/2.gif", "/static/images/tasks/2.gif"]}
                save={saveTaskResponse} />
        },
        {
            title: "Fifth Task",
            description: <>
                Lorem Ipsum <Em>30+ open source components</Em>.
                Including authentication screens with Clerk, Supabase and Magic.
                Fully functional forms with React Hook Form. Data tables with React
                Table.
            </>,
            content: <TaskWithMCQImages
                reference="/static/images/tasks/3.gif"
                options={["/static/images/tasks/3.gif", "/static/images/tasks/3.gif", "/static/images/tasks/3.gif", "/static/images/tasks/3.gif"]}
                save={saveTaskResponse} />
        }
    ]

    return (
        <Box>
            <SEO
                title="Survey"
            // description="Free SaaS landingspage starter kit"
            />
            <Box>
                <SurveyHero
                    openModal={(taskIndex) => { setIsModalOpen(true); setTaskIndex(taskIndex); }}
                    tasks={tasks}
                />
            </Box>

            {
                <SurveyModal
                    open={isModalOpen}
                    onClosed={() => setIsModalOpen(false)}
                    task={tasks[taskIndex]}
                    save={saveTaskResponse}
                />
            }
        </Box>
    );
};

type Task = {
    title: string,
    description: ReactNode,
    content: ReactNode
}

type SurveyHeroProps = {
    openModal: (taskIndex: number) => void,
    tasks: Task[]
}

export const SurveyHero = ({
    openModal,
    tasks
}: SurveyHeroProps) => {

    return (
        <Container maxW="container.xl" pt={{ base: 40, lg: 32 }} pb="40" display={"flex"} flexDir={"column"} gap={"10"}>
            {
                tasks.map((task, index) =>
                    <Card
                        key={index}
                        title={task.title}
                        description={task.description}
                        openModal={() => openModal(index)}
                    />
                )
            }
        </Container>
    )
}

type CardProps = {
    description: ReactNode
    title: string
    openModal: (taskIndex) => void
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
    task: Task,
    save: (response: number) => void
}

const SurveyModal = ({
    onClosed,
    open,
    task
}: ModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isStarterOpen, setIsStarterOpen] = useState(true)

    useEffect(() => {
        if (open)
            onOpen()
        else
            onClose()
    }, [open])

    useEffect(() => {
        if (!isOpen) {
            onClosed()
            setIsStarterOpen(true)
        }
    }, [isOpen])

    return (
        <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                {/* <ModalHeader>Modal Title</ModalHeader> */}

                {/* <ModalCloseButton /> */}

                {
                    task &&
                    <ModalBody
                        textAlign={"center"}
                        display={"flex"}
                        flexDir={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        padding={{
                            lg: "20",
                            base: "10"
                        }}
                    >
                        <Heading as={"h2"} size={"3xl"}>
                            {task.title}
                        </Heading>
                        {/* <Lorem count={2} /> */}

                        <Text
                            mt={"10"}
                        >
                            {task.description}
                        </Text>

                        {
                            isStarterOpen
                                ? <Button
                                    size={"lg"}
                                    colorScheme="blue"
                                    mt={"5"}
                                    onClick={() => setIsStarterOpen(false)}
                                >
                                    Next
                                </Button>
                                : task.content
                        }
                    </ModalBody>
                }

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

const BlinkingBoxTask = ({
    save
}: {
    save: (response: string | number) => void
}) => {
    const DEFAULT_DURATION = 0.55
    const [duration, setDuration] = useState(DEFAULT_DURATION)

    return (
        <TaskWithSlider
            reference={<BlinkingBox duration={duration} />}
            response={duration}
            setResponse={setDuration}
            save={save}
            defaultValue={DEFAULT_DURATION}
        />
    )
}

const RotatingCubeTask = ({
    save
}: {
    save: (response: number) => void
}) => {
    const DEFAULT_DURATION = 2
    const [duration, setDuration] = useState(DEFAULT_DURATION)

    return (
        <>
            <TaskWithSlider
                reference={<RotatingCube duration={duration + 1.5} />}
                response={duration}
                setResponse={setDuration}
                save={save}
                defaultValue={DEFAULT_DURATION}
                min={1}
                max={4}
                step={0.1}
            />
        </>
    )
}

// const RotatingCube

const TaskWithMCQImages = ({
    reference,
    options,
    save
}: {
    save: (response: string) => void
    reference: string
    options: string[]
}) => {
    return (
        <TaskForm
            reference={
                <Img
                    src={reference}
                    border={"solid 2px"}
                    rounded={"md"}
                    height={"250px"}
                    boxShadow={"0 20px 25px -5px rgba(256, 256, 256, 0.1),0 10px 10px -5px rgba(256, 256, 256, 0.04)"}
                    mb={"2rem"}
                />
            }
            inputs={
                <Flex
                    gap={"1rem"}
                >
                    {
                        options.map((option, index) =>
                            <ImageOption src={option} key={index} onSelect={() => save(option)} />
                        )
                    }
                </Flex>
            }
        />
    )
}

const ImageOption = ({
    src,
    onSelect
}: {
    src: string
    onSelect: () => void
}) => {
    const [scope, blink] = useBlink()

    const select = async () => {
        await blink()

        onSelect()
    }

    return (
        <Img
            src={src}
            border={"solid 2px"}
            rounded={"md"}
            height={"250px"}
            boxShadow={"0 20px 25px -5px rgba(256, 256, 256, 0.1),0 10px 10px -5px rgba(256, 256, 256, 0.04)"}
            cursor={"pointer"}
            _hover={{
                borderColor: "primary.500"
            }}
            ref={scope}
            onClick={select}
        />
    )
}

const TaskWithSlider = ({
    reference,
    save,
    response,
    setResponse,
    defaultValue,
    min = 0.1,
    max = 1,
    step = 0.05
}: {
    reference: ReactNode
    save: (response: number) => void
    response: number
    setResponse: (response: number) => void
    defaultValue: number
    min?: number,
    max?: number,
    step?: number
}) => {
    // const DEFAULT_DURATION = 0.55
    // const [duration, setDuration] = useState(DEFAULT_DURATION)

    return (
        <TaskForm
            reference={reference}
            inputs={
                <Box
                    mt={10}
                    width={"400px"}
                >
                    <Slider
                        defaultValue={defaultValue}
                        min={min}
                        max={max}
                        step={step}
                        onChange={value => setResponse(max - value)}
                    >
                        <SliderTrack bg='purple.100'>
                            <Box position='relative' right={10} />
                            <SliderFilledTrack bg='purple.400' />
                        </SliderTrack>
                        <SliderThumb boxSize={6} />
                    </Slider>
                </Box>
            }
            save={() => save(response)}
        />
    )
}

const TaskForm = ({
    reference,
    inputs,
    save
}: {
    reference: ReactNode,
    inputs: ReactNode,
    save?: (() => void)
}) => {
    const [scope, blink] = useBlink()

    const buttonClick = async () => {
        await blink()

        if (save) save()
    }

    return (
        <Flex
            direction={"column"}
            alignItems={"center"}
            mt={"10"}
        >
            {
                reference
            }

            {
                inputs
            }

            {
                save &&
                <Button
                    size={"lg"}
                    mt={"20"}
                    colorScheme={"blue"}
                    ref={scope}
                    onClick={buttonClick}
                >
                    Submit
                </Button>
            }
        </Flex >
    )
}

const useBlink = (): [AnimationScope, () => void] => {
    const [scope, animate] = useAnimate()

    const blink = () => animate(scope.current, { opacity: [1, 0, 1, 0, 0, 1] }, { duration: 1 })

    return [scope, blink]
}

const RotatingCube = ({
    duration
}: {
    duration: number
}) => {
    return (
        <div className="wrapper">
            <div className="cube" style={{ animation: `spin ${duration}s infinite linear` }}>
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="four"></div>
                <div className="five"></div>
                <div className="six"></div>
            </div>
        </div>
    )
}

export default Survey