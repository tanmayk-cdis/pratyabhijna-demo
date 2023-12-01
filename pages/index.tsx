import * as React from "react";
import { useEffect } from "react"
import type { NextPage } from "next";
import Image from "next/image";
import {
  Container,
  Box,
  Stack,
  HStack,
  ButtonGroup,
  Button,
  Icon,
  Heading,
  Text,
  Wrap,
  Tag,
  useClipboard,
  IconButton,
  VStack,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Checkbox,
} from "@chakra-ui/react";
import { SEO } from "components/seo/seo";

import { FallInPlace } from "components/motion/fall-in-place";
import { Hero } from "components/hero";
import { Link, Br } from "@saas-ui/react";
import { Em } from "components/typography";
import { NextjsLogo, ChakraLogo } from "components/logos";
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiCode,
  FiCopy,
  FiFlag,
  FiGrid,
  FiLock,
  FiSearch,
  FiSliders,
  FiSmile,
  FiTerminal,
  FiThumbsUp,
  FiToggleLeft,
  FiTrendingUp,
  FiUserPlus,
} from "react-icons/fi";
import { Features } from "components/features";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { Faq } from "components/faq";
import { Pricing } from "components/pricing/pricing";

import { ButtonLink } from "components/button-link/button-link";
import { Testimonial, Testimonials } from "components/testimonials";

import faq from "data/faq";
import testimonials from "data/testimonials";
import pricing from "data/pricing";

import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from "components/highlights";

import ConsentForm from "./consent-form.mdx"
import Disclaimer from "./discalimer.mdx"
import { useRouter } from "next/router";
import { useAuth } from "context/AuthContext";

const Home: NextPage = () => {
  return (
    <Box>
      <SEO
        title="Pratyabhijna"
        description="World’s largest study on mental imagery."
      />
      <Box>
        <HeroSection />

        {/* <HighlightsSection /> */}

        {/* <FeaturesSection />

        <TestimonialsSection />

        <PricingSection />

        <FaqSection /> */}
      </Box>
    </Box>
  );
};

export const HeroSection: React.FC = () => {
  const [isConsentOpen, setIsConsentOpen] = React.useState(false)
  const [isDisclaimerOpen, setIsDisclaimerOpen] = React.useState(false)
  const router = useRouter()
  const { user } = useAuth()

  const saveConsent = () => {
    setIsConsentOpen(false)
    setIsDisclaimerOpen(true)
  }

  useEffect(() => {
    if (user?.accessToken)
      router.push('/survey')
  }, [user])

  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: "column", lg: "row" }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                Pratyabhijna
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                World`s largest study on mental imagery.
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8} mt={4}>
              <ButtonGroup spacing={4} alignItems="center">
                {/* <ButtonLink colorScheme="primary" size="lg" href="/survey"> */}
                {/* Start */}
                {/* </ButtonLink> */}
                <Button colorScheme="primary" size="lg" onClick={() => setIsConsentOpen(true)}>
                  Start
                </Button>
              </ButtonGroup>
            </FallInPlace>
          </Hero>

          <ConsentModal onClosed={() => setIsConsentOpen(false)} open={isConsentOpen} save={saveConsent} />

          <DisclaimerModal onClosed={() => setIsDisclaimerOpen(false)} open={isDisclaimerOpen} save={() => router.push('/signup')} />

          <Box
            height="600px"
            position="absolute"
            display={{ base: "none", lg: "block" }}
            left={{ lg: "40%", xl: "45%" }}
            top={"5%"}
            width="80vw"
            maxW="1100px"
            margin="0 auto"
          >
            <FallInPlace delay={1}>
              <Box overflow="hidden" height="100%">
                <Image
                  src="/static/images/midjourney-3.png"
                  layout="fixed"
                  width={900}
                  height={900}
                  style={{ borderRadius: "100%" }}
                  alt="Screenshot of a ListPage in Saas UI Pro"
                  quality="20"
                  priority
                />
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>

      <Features
        visibility={"hidden"}
        id="benefits"
        columns={[1, 2, 4]}
        iconSize={4}
        innerWidth="container.xl"
        pt="20"
        features={[
          {
            title: "Accessible",
            icon: FiSmile,
            description: "All components strictly follow WAI-ARIA standards.",
            iconPosition: "left",
            delay: 0.6,
          },
          {
            title: "Themable",
            icon: FiSliders,
            description:
              "Fully customize all components to your brand with theme support and style props.",
            iconPosition: "left",
            delay: 0.8,
          },
          {
            title: "Composable",
            icon: FiGrid,
            description:
              "Compose components to fit your needs and mix them together to create new ones.",
            iconPosition: "left",
            delay: 1,
          },
          {
            title: "Productive",
            icon: FiThumbsUp,
            description:
              "Designed to reduce boilerplate and fully typed, build your product at speed.",
            iconPosition: "left",
            delay: 1.1,
          },
        ]}
        reveal={FallInPlace}
      />
    </Box>
  );
};

const HighlightsSection = () => {
  const { value, onCopy, hasCopied } = useClipboard("yarn add @saas-ui/react");

  return (
    <Highlights>
      <HighlightsItem colSpan={[1, null, 2]} title="Core components">
        <VStack alignItems="flex-start" spacing="8">
          <Text color="muted" fontSize="xl">
            Get started for free with <Em>30+ open source components</Em>.
            Including authentication screens with Clerk, Supabase and Magic.
            Fully functional forms with React Hook Form. Data tables with React
            Table.
          </Text>

          <Flex
            rounded="full"
            borderWidth="1px"
            flexDirection="row"
            alignItems="center"
            py="1"
            ps="8"
            pe="2"
            bg="primary.900"
            _dark={{ bg: "gray.900" }}
          >
            <Box>
              <Text color="yellow.400" display="inline">
                yarn add
              </Text>{" "}
              <Text color="cyan.300" display="inline">
                @saas-ui/react
              </Text>
            </Box>
            <IconButton
              icon={hasCopied ? <FiCheck /> : <FiCopy />}
              aria-label="Copy install command"
              onClick={onCopy}
              variant="ghost"
              ms="4"
              isRound
              color="white"
            />
          </Flex>
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Solid foundations">
        <Text color="muted" fontSize="lg">
          We don&apos;t like to re-invent the wheel, neither should you. We
          selected the most productive and established tools in the scene and
          build Saas UI on top of it.
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Renata Alink"
        description="Founder"
        avatar="/static/images/avatar.jpg"
        gradient={["pink.200", "purple.500"]}
      >
        “Saas UI helped us set up a beautiful modern UI in no time. It saved us
        hundreds of hours in development time and allowed us to focus on
        business logic for our specific use-case from the start.”
      </HighlightsTestimonialItem>
      <HighlightsItem
        colSpan={[1, null, 2]}
        title="Start your next idea two steps ahead"
      >
        <Text color="muted" fontSize="lg">
          We took care of all your basic frontend needs, so you can start
          building functionality that makes your product unique.
        </Text>
        <Wrap mt="8">
          {[
            "authentication",
            "navigation",
            "crud",
            "settings",
            "multi-tenancy",
            "layouts",
            "billing",
            "a11y testing",
            "server-side rendering",
            "documentation",
            "onboarding",
            "storybooks",
            "theming",
            "upselling",
            "unit testing",
            "feature flags",
            "responsiveness",
          ].map((value) => (
            <Tag
              key={value}
              variant="subtle"
              colorScheme="purple"
              rounded="full"
              px="3"
            >
              {value}
            </Tag>
          ))}
        </Wrap>
      </HighlightsItem>
    </Highlights>
  );
};

const FeaturesSection = () => {
  return (
    <Features
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={["2xl", null, "4xl"]}
          textAlign="left"
          as="p"
        >
          Not your standard
          <Br /> dashboard template.
        </Heading>
      }
      description={
        <>
          Saas UI Pro includes everything you need to build modern frontends.
          <Br />
          Use it as a template for your next product or foundation for your
          design system.
        </>
      }
      align="left"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: "Components.",
          icon: FiBox,
          description:
            "All premium components are available on a private NPM registery, no more copy pasting and always up-to-date.",
          variant: "inline",
        },
        {
          title: "Starterkits.",
          icon: FiLock,
          description:
            "Example apps in Next.JS, Electron. Including authentication, billing, example pages, everything you need to get started FAST.",
          variant: "inline",
        },
        {
          title: "Documentation.",
          icon: FiSearch,
          description:
            "Extensively documented, including storybooks, best practices, use-cases and examples.",
          variant: "inline",
        },
        {
          title: "Onboarding.",
          icon: FiUserPlus,
          description:
            "Add user onboarding flows, like tours, hints and inline documentation without breaking a sweat.",
          variant: "inline",
        },
        {
          title: "Feature flags.",
          icon: FiFlag,
          description:
            "Implement feature toggles for your billing plans with easy to use hooks. Connect Flagsmith, or other remote config services once you're ready.",
          variant: "inline",
        },
        {
          title: "Upselling.",
          icon: FiTrendingUp,
          description:
            "Components and hooks for upgrade flows designed to make upgrading inside your app frictionless.",
          variant: "inline",
        },
        {
          title: "Themes.",
          icon: FiToggleLeft,
          description:
            "Includes multiple themes with darkmode support, always have the perfect starting point for your next project.",
          variant: "inline",
        },
        {
          title: "Generators.",
          icon: FiTerminal,
          description:
            "Extend your design system while maintaininig code quality and consistency with built-in generators.",
          variant: "inline",
        },
        {
          title: "Monorepo.",
          icon: FiCode,
          description: (
            <>
              All code is available as packages in a high-performance{" "}
              <Link href="https://turborepo.com">Turborepo</Link>, you have full
              control to modify and adjust it to your workflow.
            </>
          ),
          variant: "inline",
        },
      ]}
    />
  );
};

const TestimonialsSection = () => {
  const columns = React.useMemo(() => {
    return testimonials.items.reduce<Array<typeof testimonials.items>>(
      (columns, t, i) => {
        columns[i % 3].push(t);

        return columns;
      },
      [[], [], []]
    );
  }, []);

  return (
    <Testimonials
      title={testimonials.title}
      columns={[1, 2, 3]}
      innerWidth="container.xl"
    >
      <>
        {columns.map((column, i) => (
          <Stack key={i} spacing="8">
            {column.map((t, i) => (
              <Testimonial key={i} {...t} />
            ))}
          </Stack>
        ))}
      </>
    </Testimonials>
  );
};

const PricingSection = () => {
  return (
    <Pricing {...pricing}>
      <Text p="8" textAlign="center" color="muted">
        VAT may be applicable depending on your location.
      </Text>
    </Pricing>
  );
};

const FaqSection = () => {
  return <Faq {...faq} />;
};

export default Home;

export async function getStaticProps() {
  return {
    props: {
      // announcement: {
      //   title: "Support us by becoming a stargazer! 🚀 ",
      //   description:
      //     '<img src="https://img.shields.io/github/stars/saas-js/saas-ui.svg?style=social&label=Star" />',
      //   href: "https://github.com/saas-js/saas-ui",
      //   action: false,
      // },
    },
  };
}

type ConsentModalProps = {
  onClosed: () => void
  open: boolean,
  save: () => void
}

const ConsentModal = ({
  onClosed,
  open,
  save
}: ConsentModalProps) => {
  const [checked, setChecked] = React.useState(false)

  return (
    <InfoModal
      onClosed={onClosed}
      open={open}
      title="Informed Consent Form"
      contents={
        <Container maxW={"container.md"} className="markdown">
          <ConsentForm />

          <Box>
            <Checkbox borderColor={"purple.500"} defaultChecked={checked} onChange={(e) => setChecked(e.target.checked)}>
              I have read the information listed above. I am above 18 years old, and I can provide consent for my data being used confedentially for research purposes in this Imagination Project.
            </Checkbox>
          </Box>

          <Flex justify={"center"}>
            <Button colorScheme="primary" mt={"10"} isDisabled={!checked} onClick={save}>
              Save and Continue
            </Button>
          </Flex>
        </Container>
      }
    />
  )
}

const DisclaimerModal = ({
  onClosed,
  open,
  save
}: ConsentModalProps) => {

  return (
    <InfoModal
      onClosed={onClosed}
      open={open}
      title="How to do this study?"
      contents={
        <Container maxW={"container.md"} className="markdown">
          <Disclaimer />

          <Flex justify={"center"}>
            <Button colorScheme="primary" mt={"10"} onClick={save}>
              START
            </Button>
          </Flex>
        </Container>
      }
    />
  )
}

type ModalProps = {
  onClosed: () => void
  open: boolean,
  title: string,
  contents: React.ReactNode
}

const InfoModal = ({
  onClosed,
  open,
  title,
  contents
}: ModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  React.useEffect(() => {
    if (open)
      onOpen()
    else
      onClose()
  }, [open])

  React.useEffect(() => {
    if (!isOpen) {
      onClosed()
    }
  }, [isOpen])

  return (
    <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        {/* <ModalHeader>Modal Title</ModalHeader> */}

        {/* <ModalCloseButton /> */}

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
          <Heading as={"h2"} size={"3xl"} textAlign={"center"}>
            {title}
          </Heading>
          {/* <Lorem count={2} /> */}

          <Text
            mt={"10"}
          >
            {contents}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}