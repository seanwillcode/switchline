import { AppShell, Burger, Flex, Image, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "./assets/switchyard-logo.png";
import Navbar from "./Components/Navbar";
import { routes } from "./routes";
import { useRoutes } from "react-router-dom";

function App() {
  const element = useRoutes(routes);
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Flex>
          <Image w={40} height={40} radius="sm" src={logo} mt="sm" ml="md" />
          <Title mt="8" ml="md">
            Switchline
          </Title>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>{element}</AppShell.Main>
    </AppShell>
  );
}

export default App;
