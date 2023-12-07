"use client"
import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index: NextPage = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/home')
    }, [])

    return <Box h={'100vh'}>
        Index Page
    </Box>
}

export default Index