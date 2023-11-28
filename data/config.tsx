import { Button } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { NextSeoProps } from 'next-seo'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'Pratyabhijna',
    description: 'World`s largest study on mental imagery.',
  } as NextSeoProps,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      // {
      //   id: 'features',
      //   label: 'Features',
      // },
      // {
      //   id: 'pricing',
      //   label: 'Pricing',
      // },
      // {
      //   id: 'faq',
      //   label: 'FAQ',
      // },
      // {
      //   label: 'Login',
      //   href: '/login',
      // },
      {
        id: "signup",
        label: 'Log In / Sign Up',
        href: '/signup',
        variant: 'primary',
      },
    ],
  },
  footer: {
    copyright: (
      <>
        Built by{' '}
        <Link href="https://iitk.ac.in/cdis">CDIS, IIT Kanpur</Link>
      </>
    ),
    links: [
      {
        href: 'mailto:ishan20@iitk.ac.in',
        label: 'Contact',
      },
      {
        href: 'https://twitter.com/',
        label: <FaTwitter size="14" />,
      },
      {
        href: 'https://linkedin.com/',
        label: <FaLinkedin size="14" />,
      },
    ],
  },
  signup: {
    title: 'LOG IN / SIGN UP',
    features: [
      {
        icon: FiCheck,
        title: 'Accessible',
        description: 'All components strictly follow WAI-ARIA standards.',
      },
      {
        icon: FiCheck,
        title: 'Themable',
        description:
          'Fully customize all components to your brand with theme support and style props.',
      },
      {
        icon: FiCheck,
        title: 'Composable',
        description:
          'Compose components to fit your needs and mix them together to create new ones.',
      },
      {
        icon: FiCheck,
        title: 'Productive',
        description:
          'Designed to reduce boilerplate and fully typed, build your product at speed.',
      },
    ],
  },
}

export default siteConfig
