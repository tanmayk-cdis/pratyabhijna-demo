import { Box, Button, Container, Flex, Heading, Image, Img, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, background, useDisclosure, useTheme } from "@chakra-ui/react";
import { transparentize } from "@chakra-ui/theme-tools";
import { HighlightsItem } from "components/highlights";
import { SEO } from "components/seo";
import { NextPage } from "next";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { AnimationScope, motion, useAnimate } from "framer-motion";
import { getTasks, saveTask } from "services/task"

import FlickerTaskDescription from "components/survey/content/flicker-task/description.mdx"
import FlickerTaskPremise1 from "components/survey/content/flicker-task/premise-1.mdx"
import FlickerTaskPremise2 from "components/survey/content/flicker-task/premise-2.mdx"

import RotationTaskDescription from "components/survey/content/rotation-task/description.mdx"
import RotationTaskPremise1 from "components/survey/content/rotation-task/premise-1.mdx"
import RotationTaskPremise2 from "components/survey/content/rotation-task/premise-2.mdx"

import DancingTaskDescription from "components/survey/content/dancing-task/description.mdx"
import DancingTaskPremise1 from "components/survey/content/dancing-task/premise-1.mdx"

import YogaTaskDescription from "components/survey/content/yoga-task/description.mdx"
import YogaTaskPremise1 from "components/survey/content/yoga-task/premise-1.mdx"

import RoadTaskDescription from "components/survey/content/follow-the-road-task/description.mdx"
import RoadTaskPremise1 from "components/survey/content/follow-the-road-task/premise-1.mdx"

import TapTaskDescription from "components/survey/content/tap-task/description.mdx"
import TapTaskPremise1 from "components/survey/content/tap-task/premise-1.mdx"

import { AuthHttpService } from "services/http-service";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { AnnouncementBanner } from "components/announcement-banner";

export type TaskDataType = {
    id?: number
    startTime?: number | string,
    endTime?: number,
    result?: number | string
    screen_width?: number,
    screen_height?: number
}

type TaskDataListType = { [id: number]: TaskDataType }

export const Survey: NextPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [taskIndex, setTaskIndex] = useState<number>(0)
    const [taskDataList, setTaskDataList] = useState<TaskDataListType>({})
    const [savedTaskList, setSavedTaskList] = useState<TaskDataType[]>([])
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false)
    // const [user, setUser] = useState<{ isRegistrationPending: boolean }>()
    const { user, updateUser } = useAuth()
    const router = useRouter()

    const surveyCompleted = useMemo(
        () => savedTaskList
            .reduce(
                (prev, taskData) => prev && taskData?.result != undefined,
                true
            ),
        [savedTaskList]
    )


    const saveTaskResponse = (response: string | number) => {
        setResponse(response)

        setIsModalOpen(false)
    }

    const setStartTime = () => {
        appendTaskData({
            startTime: (new Date).getTime()
        })
    }

    const setResponse = response => {
        let taskData = appendTaskData({
            result: response,
            endTime: (new Date()).getTime(),
            screen_width: screen.width,
            screen_height: screen.height
        })

        saveTask(taskData)
            .then(() => console.log("Task saved successfully."))
            .catch(() => console.log("Unable to save Task."))
            .finally(getTaskList)
    }

    const getTaskList = async () => {
        let taskList: TaskDataType[] = []
        await getTasks().then(response => taskList = response.data)

        // taskList = taskList.map(task => {
        //     task.startTime = (new Date(task.startTime)).getTime()
        //     task.endTime = (new Date(task.endTime)).getTime()

        //     return task
        // })

        setSavedTaskList(taskList)
    }

    const appendTaskData = (taskData: TaskDataType) => {
        let taskDataIndex = savedTaskList.findIndex(task => task.id == (taskIndex + 1))

        let freshTaskData = {
            ...savedTaskList[taskDataIndex],
            ...taskData
        }

        savedTaskList[taskDataIndex] = freshTaskData

        setSavedTaskList([...savedTaskList])

        return freshTaskData
    }

    const closeRegisterModal = () => {
        updateUser({
            ...user,
            isRegistrationPending: false
        })

        setIsRegisterModalOpen(false)
    }

    useEffect(() => {
        // console.log(taskDataList)
    }, [taskDataList])

    useEffect(() => {
        // getTaskList()
    }, [])

    useEffect(() => {
        if (!user?.loading) {
            if (!user?.accessToken)
                router.push('/')
            else
                getTaskList()

            if (user && user.isRegistrationPending) {
                setIsRegisterModalOpen(true)
            }
        }
    }, [user, router])


    const tasks = [
        {
            title: "The Flicker Task",
            description: <FlickerTaskDescription />,
            premises: [
                <FlickerTaskPremise1 key={1} />,
                <FlickerTaskPremise2 key={2} />
            ],
            content: <BlinkingBoxTask save={saveTaskResponse} />,
            iconUrl: "/static/images/tasks/icons/4.png"
        },
        {
            title: "The Rotation Task",
            description: <RotationTaskDescription />,
            premises: [
                <RotationTaskPremise1 key={1} />,
                <RotationTaskPremise2 key={2} />
            ],
            content: <RotatingCubeTask save={saveTaskResponse} />,
            iconUrl: "/static/images/tasks/icons/6.png"
        },
        {
            title: "Dancing Task",
            description: <DancingTaskDescription />,
            premises: [
                <DancingTaskPremise1 key={1} />
            ],
            content: <TaskWithMCQImages
                reference="/static/images/tasks/Dance_Task/Standard_Dance.gif"
                options={[
                    "/static/images/tasks/Dance_Task/Dance_jitter_0.gif",
                    "/static/images/tasks/Dance_Task/Dance_jitter_2.gif",
                    "/static/images/tasks/Dance_Task/Dance_jitter_4.gif",
                    "/static/images/tasks/Dance_Task/Dance_jitter_10.gif",
                    "/static/images/tasks/Dance_Task/Dance_jitter_20.gif"
                ]}
                save={saveTaskResponse}
                minMark="Smooth"
                maxMark="Choppy"
            />,
            iconUrl: "/static/images/tasks/icons/2.png"
        },
        {
            title: "Yoga Task",
            description: <YogaTaskDescription />,
            premises: [
                <YogaTaskPremise1 key={1} />
            ],
            content: <TaskWithMCQImages
                reference="/static/images/tasks/Yoga_Task/yoga_standard.gif"
                options={[
                    "/static/images/tasks/Yoga_Task/yoga_jitter_0.gif",
                    "/static/images/tasks/Yoga_Task/yoga_jitter_2.gif",
                    "/static/images/tasks/Yoga_Task/yoga_jitter_4.gif",
                    "/static/images/tasks/Yoga_Task/yoga_jitter_10.gif",
                    "/static/images/tasks/Yoga_Task/yoga_jitter_20.gif"
                ]}
                save={saveTaskResponse}
                minMark="Smooth"
                maxMark="Choppy"
            />,
            iconUrl: "/static/images/tasks/icons/3.png"
        },
        {
            title: "Follow the road Task",
            description: <RoadTaskDescription />,
            premises: [
                <RoadTaskPremise1 key={1} />
            ],
            content: <TaskWithMCQImages
                reference="/static/images/tasks/Road_Task/road_standard.gif"
                options={[
                    "/static/images/tasks/Road_Task/road_no_break.gif",
                    "/static/images/tasks/Road_Task/BREAK_1.gif",
                    "/static/images/tasks/Road_Task/BREAK_2.gif",
                    "/static/images/tasks/Road_Task/BREAK_3.gif",
                    "/static/images/tasks/Road_Task/BREAK_4.gif",
                    "/static/images/tasks/Road_Task/BREAK_5.gif"
                ]}
                save={saveTaskResponse}
                minMark="Dosen't Break"
                maxMark="Broken"
            />,
            iconUrl: "/static/images/tasks/icons/5.png"
        },
        {
            title: "Running Tap Task ",
            description: <TapTaskDescription />,
            premises: [
                <TapTaskPremise1 key={1} />
            ],
            content: <TaskWithMCQImages
                reference="/static/images/tasks/Tap_Task/Standard_Tap.gif"
                options={[
                    "/static/images/tasks/Tap_Task/No_breaks.gif",
                    "/static/images/tasks/Tap_Task/Tap_break_1.gif",
                    "/static/images/tasks/Tap_Task/Tap_break_2.gif",
                    "/static/images/tasks/Tap_Task/Tap_break_3.gif",
                    "/static/images/tasks/Tap_Task/Tap_break_4.gif",
                    "/static/images/tasks/Tap_Task/Tap_break_5.gif"
                ]}
                save={saveTaskResponse}
                minMark="Dosen't Break"
                maxMark="Broken"
            />,
            iconUrl: "/static/images/tasks/icons/1.png"
        }
    ]

    return (
        <Box>
            <SEO
                title="Survey"
            // description="Free SaaS landingspage starter kit"
            />

            {
                surveyCompleted &&
                <Box pb={10}>
                    <AnnouncementBanner title="Study Completed!" description="" href="#" />
                </Box>
            }

            <Box>
                <SurveyHero
                    openModal={(taskIndex) => { setIsModalOpen(true); setTaskIndex(taskIndex); }}
                    tasks={tasks}
                    savedTasks={savedTaskList}
                />
            </Box>

            {
                surveyCompleted &&
                <Box pb={10} position={'relative'} top={"-13rem"}>
                    <AnnouncementBanner title="Study Completed!" description="" href="#" />
                </Box>
            }

            <SurveyModal
                open={isModalOpen}
                onClosed={() => setIsModalOpen(false)}
                task={tasks[taskIndex]}
                start={setStartTime}
            />

            <RegistrationModal
                open={isRegisterModalOpen}
                onClosed={closeRegisterModal}
            />

            <ScreenLimitingModal />
        </Box>
    );
};

type Task = {
    title: string,
    description: ReactNode,
    premises: ReactNode[],
    content: ReactNode,
    iconUrl?: string
}

type SurveyHeroProps = {
    openModal: (taskIndex: number) => void,
    tasks: Task[],
    savedTasks: TaskDataType[]
}

export const SurveyHero = ({
    openModal,
    tasks,
    savedTasks
}: SurveyHeroProps) => {

    return (
        <Container maxW="container.xl" pt={{ base: 40, lg: 32 }} pb="40" display={"flex"} flexDir={"column"} gap={"10"}>
            {
                tasks.map((task, index) =>
                    <Card
                        key={index}
                        title={task.title}
                        description={task.description}
                        iconUrl={task.iconUrl}
                        completed={Boolean(savedTasks && savedTasks.find(s_task => s_task.id == (index + 1))?.result)}
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
    completed: boolean,
    iconUrl?: string
}

const Card = ({
    title,
    description,
    openModal,
    completed,
    iconUrl
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

            <Box
                zIndex={10}
                display={'flex'}
            >
                {
                    iconUrl &&
                    <Box
                        height={0}
                        position={'relative'}
                        top={"-2rem"}
                        left={"-1rem"}
                        pb={'10'}
                    >
                        <Image
                            src={iconUrl}
                            maxH={'200px'}
                            maxW={'200px'}
                        />
                    </Box>
                }

                <Box>
                    {description}
                </Box>
            </Box>

            {
                completed
                    ? <Image
                        src="/static/images/check.svg"
                        height={"16"}
                        alignSelf={"end"}
                        alt="check mark"
                    />
                    : <Button
                        alignSelf={"end"}
                        size={"lg"}
                        colorScheme={"blue"}
                        onClick={openModal}
                    >
                        Start
                    </Button>
            }
        </HighlightsItem>
    )
}

type ModalProps = {
    onClosed: () => void
    open: boolean
    task: Task,
    start: () => void
}

const SurveyModal = ({
    onClosed,
    open,
    task,
    start
}: ModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isStarterOpen, setIsStarterOpen] = useState(true)
    const [activePremise, setActivePremise] = useState<number | null>(0)

    const nextPremise = () => {
        if (activePremise == (task.premises.length - 1)) {
            setActivePremise(null)
            start()
        }
        else if (activePremise != null)
            setActivePremise(activePremise + 1)
    }

    useEffect(() => {
        if (open)
            onOpen()
        else
            onClose()
    }, [open, onOpen, onClose])

    useEffect(() => {
        if (!isOpen) {
            onClosed()
            // setIsStarterOpen(true)
            setActivePremise(0)
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
                        display={"flex"}
                        flexDir={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        padding={{
                            lg: "20",
                            base: "10"
                        }}
                    >

                        <Container maxW={"container.lg"} className="markdown">
                            <Heading as={"h2"} size={"3xl"} textAlign={"center"}>
                                {task.title}
                            </Heading>
                            {/* <Lorem count={2} /> */}

                            {
                                activePremise != null
                                    ? <>
                                        <Box
                                            mt={"10"}
                                        >
                                            {task.premises[activePremise]}
                                        </Box>

                                        <Flex justify={"center"}>
                                            <Button
                                                size={"lg"}
                                                colorScheme="blue"
                                                mt={"5"}
                                                onClick={nextPremise}
                                            >
                                                Next
                                            </Button>
                                        </Flex>
                                    </>
                                    : ''

                            }

                            <Box display={activePremise == null ? 'block' : 'none'}>
                                {
                                    task.content
                                }
                            </Box>
                        </Container>
                    </ModalBody>
                }

                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const RegistrationModal = ({
    onClosed,
    open
}: {
    onClosed: () => void
    open: boolean
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState('')
    const [age, setAge] = useState<string>()
    const [gender, setGender] = useState<string>()

    const register = () => {
        if (!(name && age && gender)) {
            alert('Please complete the form.')
            return
        }

        AuthHttpService().post('/user/register', {
            name: name,
            age: age,
            gender: gender
        })
            .then(response => {
                if (response.data.success) {
                    onClosed()
                }
            })
    }

    useEffect(() => {
        if (open)
            onOpen()
        else
            onClose()
    }, [open, onOpen, onClose])

    useEffect(() => {
        if (!isOpen) {
            onClosed()
        }
    }, [isOpen])

    return (
        <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
            <ModalOverlay />

            <ModalContent>
                <ModalBody
                    display={"flex"}
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    padding={{
                        lg: "20",
                        base: "10"
                    }}
                >
                    <Container maxW={"container.lg"} className="markdown">
                        <Heading as={"h2"} size={"3xl"} textAlign={"center"}>
                            Registration
                        </Heading>
                        <Box fontSize={'small'} textAlign={'center'}>Please fill up the following form to continue...</Box>

                        <Container maxW={"container.md"} mt={'10'} display={'flex'} flexDir={'column'} gap={'4'}>
                            <Box>
                                <Box fontSize={'md'} fontWeight={'bold'} mb={'2'}>Name</Box>

                                <Input type='text' mb={'1'} value={name} onChange={(e) => setName(e.target.value)} autoFocus />
                            </Box>

                            <Box>
                                <Box fontSize={'md'} fontWeight={'bold'} mb={'2'}>Age</Box>

                                <Input type='number' mb={'1'} value={age} onChange={(e) => setAge(e.target.value)} />
                            </Box>

                            <Box>
                                <Box fontSize={'md'} fontWeight={'bold'} mb={'2'}>Gender</Box>

                                {/* <Input type='number' mb={'1'} value={age} onChange={(e) => setAge(e.target.value)} /> */}
                                <Select placeholder='Select gender' value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value='m'>Male</option>
                                    <option value='f'>Female</option>
                                    <option value='o'>Others</option>
                                </Select>
                            </Box>

                            <Box textAlign={'center'}>
                                <Button
                                    size={"lg"}
                                    colorScheme="blue"
                                    mt={"5"}
                                    onClick={register}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Container>
                    </Container>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

const BlinkingBox = ({
    duration
}: {
    duration: number | null
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
    const DEFAULT_DURATION = null
    const [duration, setDuration] = useState<number | null>(DEFAULT_DURATION)

    return (
        <TaskWithSlider
            reference={<BlinkingBox duration={duration} />}
            response={duration}
            setResponse={response => response != null && setDuration(response)}
            save={save}
            minMark="SLOW"
            maxMark="FAST"
            maxBuffer={0.05}
        />
    )
}

const RotatingCubeTask = ({
    save
}: {
    save: (response: number) => void
}) => {
    const DEFAULT_DURATION = null
    const [duration, setDuration] = useState<number | null>(DEFAULT_DURATION)

    return (
        <>
            <TaskWithSlider
                reference={<RotatingCube duration={duration != null ? (duration + 1.5) : duration} />}
                response={duration}
                setResponse={response => response != null && setDuration(response)}
                save={save}
                min={1}
                max={4}
                step={0.1}
                minMark="SLOW"
                maxMark="FAST"
            />
        </>
    )
}

const TaskImageAttributes = {
    border: "solid 2px",
    rounded: "md",
    height: "26rem",
    boxShadow: "0 20px 25px -5px rgba(256, 256, 256, 0.1),0 10px 10px -5px rgba(256, 256, 256, 0.04)"
}

const TaskWithMCQImages = ({
    reference,
    options,
    save,
    minMark,
    maxMark
}: {
    save: (response: string) => void
    reference: string
    options: string[],
    minMark?: string,
    maxMark?: string
}) => {
    const [showSlider, setShowSlider] = useState(false)
    const [showInputButtons, setShowInputButtons] = useState(false)
    const [selectedOption, setSelectedOption] = useState(Math.ceil(options.length / 2) - 1)
    const [submitScope, submitBlink] = useBlink()
    const [othersScope, othersBlink] = useBlink()

    const showInputs = () => {
        setShowSlider(true)

        setTimeout(() => setShowInputButtons(true), 1000)
    }

    const saveResponse = async (response: string, blink: () => void = () => '') => {
        await blink()

        save(response.replace('/static/images/tasks/', ''))
    }

    return (
        <TaskForm
            reference={
                <Box w={'100%'}>
                    <Box textAlign={'center'} fontSize={'3xl'}>
                        {
                            showSlider
                                ? "Please choose how you imagined the clip in your mind's eye"
                                : "Close your eyes, and please imagine this in your mind's eye"
                        }
                    </Box>

                    <Box display={'flex'} w={'100%'} mb={'10'}>
                        <Box display={'flex'} justifyContent={'center'} w={'100%'} mt={'10'}>
                            <Img
                                src={reference}
                                {...TaskImageAttributes}
                            />
                        </Box>

                        {
                            showSlider &&
                            <ImageSlider
                                options={options}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                                minMark={minMark}
                                maxMark={maxMark}
                            />
                        }
                    </Box>
                </Box>
            }
            inputs={
                <Flex
                    mt={"5"}
                    gap={'5'}
                >
                    {
                        !showSlider &&
                        <Button
                            size={"lg"}
                            colorScheme="blue"
                            onClick={showInputs}
                        >
                            Ready to report
                        </Button>
                    }

                    {
                        showInputButtons &&
                        <>
                            <Button
                                size={'lg'}
                                ref={othersScope}
                                onClick={() => saveResponse('Cannot visualize at all', othersBlink)}
                            >
                                Cannot visualize at all
                            </Button>

                            <Button
                                size={"lg"}
                                colorScheme="blue"
                                ref={submitScope}
                                onClick={() => saveResponse(options[selectedOption], submitBlink)}
                            >
                                Submit
                            </Button>
                        </>
                    }
                </Flex>
            }
        />
    )
}

const ImageSlider = ({
    options,
    selectedOption,
    setSelectedOption,
    minMark = '',
    maxMark = ''
}: {
    options: string[]
    selectedOption: number
    setSelectedOption: (number) => void,
    minMark?: string,
    maxMark?: string
}) => {
    return (
        <Box display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'} w={'100%'} mt={'10'}>
            {
                options.map((option, index) =>
                    <Img
                        src={option}
                        {...TaskImageAttributes}
                        display={index == selectedOption ? 'block' : 'none'}
                        key={index}
                    />
                )
            }

            <Slider
                defaultValue={selectedOption}
                min={0}
                max={options.length - 1}
                step={1}
                onChange={setSelectedOption}
                mt={'10'}
            >
                <SliderTrack bg='purple.400'>
                    <Box position='relative' right={10} />
                </SliderTrack>

                <SliderThumb boxSize={6} />

                <SliderMark value={0} {...SLIDER_MARK_ATTRIBUTES}>
                    {minMark}
                </SliderMark>

                <SliderMark value={options.length - 1} {...SLIDER_MARK_ATTRIBUTES}>
                    {maxMark}
                </SliderMark>
            </Slider>
        </Box>
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

    const optionAttributes = {
        border: "solid 2px",
        rounded: "md",
        height: "250px",
        boxShadow: "0 20px 25px -5px rgba(256, 256, 256, 0.1),0 10px 10px -5px rgba(256, 256, 256, 0.04)",
        cursor: "pointer",
        _hover: {
            borderColor: "primary.500"
        },
        ref: scope,
        onClick: select
    }

    return (
        <>
            {
                src.endsWith('.gif')
                    ? <Img
                        {...optionAttributes}
                        src={src}
                    />
                    : <Flex
                        {...optionAttributes}
                        padding={'3'}
                        justify={'center'}
                        align={'center'}
                        maxWidth={'250px'}
                        textAlign={'center'}
                        bg={'white'}
                        textColor={'black'}
                        fontSize={'1.4rem'}
                    >
                        {src}
                    </Flex>
            }
        </>
    )
}

const SLIDER_MARK_ATTRIBUTES = {
    mt: "3",
    ml: "-5",
    fontWeight: "bold"
}

const TaskWithSlider = ({
    reference,
    save,
    response,
    setResponse,
    min = 0.05,
    max = 1,
    step = 0.05,
    minMark,
    maxMark,
    maxBuffer = 0
}: {
    reference: ReactNode
    save: (response: number) => void
    response: number | null
    setResponse: (response: number) => void
    min?: number,
    max?: number,
    step?: number,
    minMark?: string,
    maxMark?: string,
    maxBuffer?: number
}) => {
    // const DEFAULT_DURATION = 0.55
    // const [duration, setDuration] = useState(DEFAULT_DURATION)

    const getNormalizedResponse = () =>
        (Math.round((max - min + maxBuffer - (response == null ? 0 : response)) * 100) / 100)

    return (
        <TaskForm
            reference={reference}
            inputs={
                <Box
                    mt={10}
                    width={"400px"}
                >
                    <Slider
                        min={min}
                        max={max}
                        step={step}
                        onChange={value => setResponse(max - value + maxBuffer)}
                    >
                        <SliderTrack bg='purple.400'>
                            <Box position='relative' right={10} />
                        </SliderTrack>

                        <SliderThumb boxSize={6} display={`${response == null && 'none'}`} />

                        <SliderMark value={min} {...SLIDER_MARK_ATTRIBUTES}>
                            {minMark}
                        </SliderMark>

                        <SliderMark value={max} {...SLIDER_MARK_ATTRIBUTES}>
                            {maxMark}
                        </SliderMark>
                    </Slider>
                </Box>
            }
            save={() => response != null && save(getNormalizedResponse())}
            disableSave={response == null}
        />
    )
}

const TaskForm = ({
    reference,
    inputs,
    save,
    disableSave
}: {
    reference: ReactNode,
    inputs: ReactNode,
    save?: (() => void)
    disableSave?: boolean
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
                    isDisabled={disableSave}
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
    duration: number | null
}) => {
    return (
        <div className="wrapper">
            <div className="cube" style={{ animation: `spin ${duration ? duration : 0}s infinite linear` }}>
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

export const ScreenLimitingModal = ({
    isActive = true
}: {
    isActive?: boolean
}) => {
    const WidthThrehsold = 725 // pixels
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (window && isActive)
            setShowModal(Math.min(window.screen.width, window.screen.height) <= WidthThrehsold)
    }, [isActive])

    return (
        <Modal isOpen={showModal} size={'full'} onClose={() => ''} >
            <ModalOverlay />

            <ModalContent>
                <ModalBody display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Text fontSize={"xl"} align={'center'}>
                        Please use a device with a bigger screen.
                        <br />
                        Phones are not allowed to do this study.
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Survey