import React, { FC, ReactNode } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import { Layout as AntLayout, Breadcrumb, Button, Menu, theme } from "antd";
// import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Flex } from "./shared/Flex";
import { NAVIGATIONS } from "../const/navigations";
import { Box } from "./shared/Box";

const { Header, Content, Footer, Sider } = AntLayout;

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
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
            selectedKeys={[pathname]}
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
                <PoweroffOutlined />
                <Box ml={2}>Logout</Box>
              </Flex>
            </Button>
          </Box>
        </Flex>
      </Sider>
      <AntLayout>
        <Header style={{ padding: 0, background: colorBgContainer }}></Header>
        <Content style={{ margin: "24px 16px 0", overflow: "auto" }}>
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Dealls! Frontend test</Footer>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
