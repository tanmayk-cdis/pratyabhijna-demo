import { Button, ButtonProps } from '@chakra-ui/react'
import NextLink, { LinkProps } from 'next/link'

export type ButtonLinkProps = LinkProps & ButtonProps

export const ButtonLink = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href} passHref>
      <Button {...props}>{children}</Button>
    </NextLink>
  )
}
