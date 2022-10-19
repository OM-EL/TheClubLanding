import {
  Box,
  Center,
  Container,
  Wrap,
  WrapItem,
  Text,
  Image,
  VStack,
  SimpleGrid, Heading, Button,
} from "@chakra-ui/react";
import { FAQSection } from "./components/FAQSection";
import { Feature } from "./components/Feature";
import { Layout } from "./components/Layout";
import { PricingSection } from "./components/PricingSection";
import { Helmet } from "react-helmet";
import HeroSection from "./components/HeroSection";

const faqs: any[] = [
  {
    q: "How many clients can I bring on?",
    a: "You can bring on 3 clients with the Free plan. Upgrade to Pro for additional seats.",
  },
  {
    q: "Can I connect it to my CRM?",
    a: "Yes! We support Notion and PipeDrive currently.",
  },
  {
    q: "Do you support international payments?",
    a: "Yes - payments can be made from and to any country.",
  },
  {
    q: "Who can I connect to for support?",
    a: "Email me at sukh@saasbase.dev",
  },
];

export interface HighlightType {
  icon: string;
  title: string;
  description: string;
}

const highlights: HighlightType[] = [
  {
    icon: "✅",
    title: "Accès garanti au club",
    description:
      "Accès garanti au club pour vous et un de vos amis, 3 de vos amis pour la carte gold",
  },
  {
    icon: "📢",
    title: "Des Shout-out",
    description:
      "Vous pouvez demander au DJ de faire un Shout-out pour vous pour un de vos amis ;)",
  },
  {
    icon: "🎉",
    title: "Boissons Offert",
    description:
        "Une boisson offerte par la maison chaque mois et une boisson gratuite le jour de votre anniversaire",
  },
  {
    icon: "💶",
    title: "Vous pouvez vendre vos NFT ",
    description:
      "Vous possédez votre NFT et vous pouvez l'acheter et le vendre sur les marchés publics comme (ompensea)",
  },
  {
    icon: "📈",
    title: "Investing",
    description:
        "Parce que le nombre de NFT sera limité, plus il y aura de personnes rejoignant le club plus votre NFT prendra de la valeur",
  },
  {
    icon: "👯",
    title: "Bitch",
    description:
        "2 Bitches free for every 10 drinks you buy ",
  }
];

interface FeatureType {
  title: string;
  description: string;
  image: string;
}

const features: FeatureType[] = [
  {
    title: "Detailed Analytics",
    description:
      "No more spending hours writing formulas in Excel to figure out how much you're making. We surface important metrics to keep your business going strong.",
    image:
      "https://launchman-space.nyc3.digitaloceanspaces.com/chakra-ui-landing-page-feature-1.png",
  },
  {
    title: "Track your clients",
    description:
      "Know when and how your projects are going so you can stay on top of delivery dates.",
    image:
      "https://launchman-space.nyc3.digitaloceanspaces.com/chakra-ui-landing-page-feature-2.png",
  },
  {
    title: "Manage projects",
    description:
      "You don't have to hunt your email inbox to find that one conversation. Every task, project, and client information is just a click away.",
    image:
      "https://launchman-space.nyc3.digitaloceanspaces.com/chakra-ui-landing-page-feature-3.png",
  },
];

export const App = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Biller | Get paid faster</title>
      </Helmet>
      <Box bg="gray.50" >
        <HeroSection />

        <Container maxW="container.lg" >
          <Center p={4} >
            <VStack>
              <Container maxW="container.md" textAlign="center">
                <Heading size="2xl" mb={4} color="gray.700">
                  Rejoignez le programme de fidélité du club et devenez un client VIP
                </Heading>
              </Container>
            </VStack>
          </Center>
        </Container>



        <Container maxW="container.md" centerContent py={28}>
          <SimpleGrid spacingX={10} spacingY={10} minChildWidth="300px">
            {highlights.map(({ title, description, icon }, i: number) => (
                <Box p={4} rounded="md" key={`highlight_${i}`}>
                  <Text fontSize="4xl">{icon}</Text>

                  <Text fontWeight={500}>{title}</Text>

                  <Text color="gray.500" mt={4}>
                    {description}
                  </Text>
                </Box>
            ))}
          </SimpleGrid>
        </Container>




        <VStack
          w="full"
          id="features"
          spacing={1}
          py={[16, 0]}
        >
          {features.map(
            ({ title, description, image }: FeatureType, i: number) => {
              return (
                <Feature
                  key={`feature_${i}`}
                  title={title}
                  description={description}
                  image={image}
                  reverse={i % 2 === 1}
                />
              );
            }
          )}
        </VStack>


        <Container maxW="container.2xl" centerContent py={28}>
          <Text color="gray.600" fontSize="lg">
            Used by teams worldwide
          </Text>

          <Wrap
              spacing={[10, 20]}
              mt={8}
              align="center"
              justify="center"
              w="full"
          >
            <WrapItem>
              <Image src="microsoft-logo.svg" alt="Microsoft logo" />
            </WrapItem>

            <WrapItem>
              <Image src="adobe-logo.svg" alt="Adobe logo" />
            </WrapItem>

            <WrapItem>
              <Image src="microsoft-logo.svg" alt="Microsoft logo" />
            </WrapItem>

            <WrapItem>
              <Image src="adobe-logo.svg" alt="Adobe logo" />
            </WrapItem>
          </Wrap>
        </Container>


        <Container py={28} maxW="container.lg" w="full" id="pricing">
          <PricingSection />
        </Container>

        <Container py={28} maxW="container.md">
          <Box w="full">
            <VStack spacing={10} w="full">
              <Text fontWeight={500} fontSize="2xl" align="center">
                Frequently asked questions
              </Text>
              <FAQSection items={faqs} />
            </VStack>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};
