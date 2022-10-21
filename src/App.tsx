import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import {OpenloginAdapter} from "@web3auth/openlogin-adapter";
import RPC from "./web3RPC";
import {LandingPage} from "./components/LandingPage";
import {Layout} from "./components/Layout";
import HeroSection from "./components/HeroSection";
import {Feature} from "./components/Feature";
import {PricingSection} from "./components/PricingSection";
import {FAQSection} from "./components/FAQSection"; // for using web3.js
//import RPC from "./ethersRPC"; // for using ethers.js
import {
  Box,
  Center,
  Container,
  Wrap,
  Stack,
  WrapItem,
  Text,
  Image,
  VStack,
  SimpleGrid, Heading, Button,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";

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

const clientId = "BL-GcMYXhL_Y4Nl3wA0hww8DjTHKCfagHflLWT-x4x3w-kTb1zKV9UtWf4TyNBrGdXd4l7oT2nquOfBMNzDvmWA"; // get from https://dashboard.web3auth.io

interface FeatureType {
  title: string;
  description: string;
  image: string;
}

const features: FeatureType[] = [
  {
    title: "Mint your NFT",
    description:
        "Once minted it will appear on your personal space in the web site and 24 hours after you can start using it Yahoo !",
    image:
        "phone.png",
  },
  {
    title: "Garenteed access to the Club With 3 of your freinds",
    description:
        "Know when and how your projects are going so you can stay on top of delivery dates.",
    image:
        "security.png",
  },
  {
    title: "Drinks on the house",
    description:
        "Free drink on the house Every month + One more free drink on your birthday 🎉💐 ",
    image:
        "glass.png",
  },
  {
    title: "Shout out as surprise to your frineds ",
    description:
        "Ask the DJ to give you a shout out to one of your freinds, or choose next song ",
    image:
        "dj.png",
  },
  {
    title: "Sell your NFT's at any moment  ",
    description:
        "You can sell your NFT at any moment , with a fixed price or with bedding system",
    image:
        "market.png",
  },
  {
    title: " Limited Suplly + Increased demand ",
    description:
        "there is a fixed number of NFT, so the more the club becomes populare the higher the price will get ",
    image:
        "value.png",
  },
];

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  useEffect(() => {
    const init = async () => {
      try {

      const web3auth = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x1",
          rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
        },
        uiConfig: {
          theme: "dark",
          loginMethodsOrder: ["facebook", "google"],
          appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
        }
      });

      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: "mandatory",
        },
        adapterSettings: {
          clientId,
          network: "testnet",
          uxMode: "popup",
          whiteLabel: {
            name: "Your app Name",
            logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
            logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            defaultLanguage: "en",
            dark: true, // whether to enable dark mode. defaultValue: false
          },
        },
      });
      web3auth.configureAdapter(openloginAdapter);

      setWeb3auth(web3auth);

      await web3auth.initModal();
      if (web3auth.provider) {
        setProvider(web3auth.provider);
      }

      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };
  const loggedInView = (
    <>
      <Button
          rounded={'full'}
          px={6}
          colorScheme={'teal'}
          bg={'teal.400'}
          _hover={{ bg: 'teal.500' }}
          onClick={getUserInfo}>
        Get User Info
      </Button>
      <Button
          rounded={'full'}
          px={6}
          colorScheme={'teal'}
          bg={'teal.400'}
          _hover={{ bg: 'teal.500' }}
          onClick={getChainId}>
        Get Chain ID
      </Button>
      <Button
          rounded={'full'}
          px={6}
          colorScheme={'teal'}
          bg={'teal.400'}
          _hover={{ bg: 'teal.500' }}
          onClick={getAccounts}>
        Get Accounts
      </Button>
      <Button
          rounded={'full'}
          px={6}
          colorScheme={'teal'}
          bg={'teal.400'}
          _hover={{ bg: 'teal.500' }}
          onClick={getBalance}>
        Get Balance
      </Button>
      <Button
          rounded={'full'}
          px={6}
          colorScheme={'teal'}
          bg={'teal.400'}
          _hover={{ bg: 'teal.500' }}
          onClick={sendTransaction}>
        Send Transaction
      </Button>
      <Button
          rounded={'full'}
          px={6}
          colorScheme={'teal'}
          bg={'teal.400'}
          _hover={{ bg: 'teal.500' }}
          onClick={signMessage}>
        Sign Message
      </Button>
      <Button
          rounded={'full'}
          px={6}
          colorScheme={'teal'}
          bg={'teal.400'}
          _hover={{ bg: 'teal.500' }}
          onClick={getPrivateKey}>
        Get Private Key
      </Button>

      <Button
          rounded={'full'}
          px={6}
          colorScheme={'teal'}
          bg={'teal.400'}
          _hover={{ bg: 'teal.500' }}
          onClick={logout}>
        Log Out
      </Button>

    </>
  );

  const unloggedInView = (
  <Button
      rounded={'full'}
      px={6}
      colorScheme={'teal'}
      bg={'teal.400'}
      _hover={{ bg: 'teal.500' }}
      onClick={login}>
    Sign in
  </Button>
  );

  return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Biller | Get paid faster</title>
        </Helmet>
        <Box bg="gray.50" >





            {/* headers */}





            <Container maxW={'5xl'} minHeight="85vh" >
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}>
              <Heading
                  fontWeight={600}
                  fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                  lineHeight={'110%'}>
                Rejoignez le programme de fidélité de "The club" et devenez{' '}
                <Text as={'span'} color={'teal.400'}>
                  client VIP
                </Text>
              </Heading>
              <Text color={'gray.500'} maxW={'3xl'}>
                L'intersection entre investir, s'amuser et profiter d'une expérience VIP
              </Text>
              <Stack spacing={6} direction={'row'}>

                <div className="grid">{provider ? loggedInView : unloggedInView}</div>

                <Button rounded={'full'} px={6}>
                  Learn more
                </Button>
              </Stack>
              <Box width="100%" height={700} backgroundImage="PeopleDacing.png" />
            </Stack>
          </Container>





          /////

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
}

export default App;
