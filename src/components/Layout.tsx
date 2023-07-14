import React, { FC, ReactNode } from "react";
import { Layout as AntLayout, Breadcrumb, Button, Menu, theme } from "antd";
import { AiOutlinePoweroff } from "react-icons/ai";
// import { signOut } from "next-auth/react";
import { Flex } from "./shared/Flex";
import { NAVIGATIONS } from "../const/navigations";
import { Box } from "./shared/Box";
import { useRouter } from "next/router";
import { Text } from "./shared/Text";
import { BsChevronCompactLeft } from "react-icons/bs";

const { Header, Content, Footer, Sider } = AntLayout;

interface ILayout {
  children: ReactNode;
  title?: string;
  journey?: IJourney[];
}

interface IJourney {
  href?: string;
  title: string;
}

const Layout: FC<ILayout> = ({ children, title, journey }) => {
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    router.push("/signout");
  };
  const currentPath = router.pathname.split("/")[1].split("?")[0];

  return (
    <AntLayout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={
          <Flex justifyContent={"center"} alignItems={"center"}>
            <BsChevronCompactLeft />
          </Flex>
        }
        zeroWidthTriggerStyle={{
          top: "12px",
        }}
      >
        <Flex
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={"100%"}
          px={2}
        >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[`/${currentPath}`]}
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
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {/* <Flex alignItems={"center"} height={"100%"} ml={3}>
            <Breadcrumb items={journey} />
          </Flex> */}
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "auto",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Text color="black" fontSize={3} fontWeight={"bold"}>
            {title}
          </Text>
          <Box p={24} minHeight={"100%"} overflowX={"auto"}>
            {children}
          </Box>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
