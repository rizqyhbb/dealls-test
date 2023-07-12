import React, { FC, ReactNode } from "react";
import { Layout as AntLayout, Breadcrumb, Button, Menu, theme } from "antd";
import { AiOutlinePoweroff } from "react-icons/ai";
// import { signOut } from "next-auth/react";
import { Flex } from "./shared/Flex";
import { NAVIGATIONS } from "../const/navigations";
import { Box } from "./shared/Box";
import { useRouter } from "next/router";
import { Text } from "./shared/Text";

const { Header, Content, Footer, Sider } = AntLayout;

const Layout: FC<{ children: ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    // signOut();
  };

  return (
    <AntLayout style={{ height: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Flex
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={"100%"}
          px={2}
        >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[router.pathname]}
            items={NAVIGATIONS.map((value) => ({
              key: value.link,
              icon: React.createElement(value.icon),
              label: value.label,
              onClick: () => router.push(value.link),
            }))}
          />
          <Box px={1} mb={3}>
            <Button danger type="primary" block onClick={handleLogout}>
              <Flex alignItems={"center"} justifyContent={"center"}>
                <AiOutlinePoweroff />
                <Box ml={2}>Logout</Box>
              </Flex>
            </Button>
          </Box>
        </Flex>
      </Sider>
      <AntLayout>
        <Header style={{ padding: 0, background: colorBgContainer }}></Header>
        <Content style={{ margin: "24px 16px 0", overflow: "auto" }}>
          <Text color="black" fontSize={3} fontWeight={"bold"}>
            {title}
          </Text>
          <Box
            p={24}
            minHeight={"100%"}
            bg={colorBgContainer}
            overflowX={"auto"}
          >
            {children}
          </Box>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
