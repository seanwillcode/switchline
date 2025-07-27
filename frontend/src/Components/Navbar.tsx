import { Anchor, Box, Flex, Stack, Text, Title } from "@mantine/core";
import type React from "react";
import {
  TbFolderFilled,
  TbLockFilled,
  TbCreditCardFilled,
  TbWorld,
  TbPlugConnected,
  TbLifebuoy,
  TbPrompt,
  TbChecklist,
} from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

interface NavbarItemProps {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  url: string;
}
const NavbarItem: React.FC<NavbarItemProps> = ({ icon: Icon, title, url }) => {
  const location = useLocation();

  const isActive = location.pathname.includes(url);

  return (
    <Anchor component={Link} to={url} underline="never" c="inherit">
      <Flex align="center">
        <Box mr="sm">
          <Icon size={24} color={isActive ? "#a8f2c0" : ""} />
        </Box>
        <Title order={4} c={isActive ? "#a8f2c0" : ""}>
          {title}
        </Title>
      </Flex>
    </Anchor>
  );
};

const Navbar = () => {
  return (
    <Stack h="100%" align="stretch" justify="space-between">
      <Stack>
        <Title order={3}>🚀 Mission Control</Title>
        <NavbarItem icon={TbFolderFilled} title={"Projects"} url="/dashboard" />
        <NavbarItem
          icon={TbChecklist}
          title={"Docs Generator"}
          url="/doc-gen"
        />
        <NavbarItem icon={TbLockFilled} title={"Secrets"} url="/secrets" />
        <NavbarItem icon={TbPrompt} title={"Logs"} url="/logs" />
        <NavbarItem icon={TbWorld} title={"Domains"} url="/domains" />
        <NavbarItem
          icon={TbCreditCardFilled}
          title={"Billing"}
          url="/billing"
        />
        <NavbarItem icon={TbPlugConnected} title={"Plugins"} url="/plugins" />
        <NavbarItem icon={TbLifebuoy} title={"Support"} url="/support" />
      </Stack>

      <Text>Made with love in Vancouver BC️</Text>
    </Stack>
  );
};

export default Navbar;
