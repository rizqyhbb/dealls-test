import React, { useEffect } from "react";

import { Grid } from "../../components/shared/Grid";
import { Flex } from "../../components/shared/Flex";
import { Box } from "../../components/shared/Box";
import { Text } from "../../components/shared/Text";
import { useFetch } from "../../hooks/useFetch";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/router";

interface FormData {
  name: string;
  email: string;
}

export default function Signin() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const { fire, data, loading, status, error } = useFetch<{
    message: string;
    status: number;
  }>("/api/auth");

  const handleSubmit = (val: FormData) => {
    fire({
      baseURL: `${router.basePath}`,
      method: "POST",
      data: val,
    });
  };

  const errorToast = (message?: string) => {
    messageApi.open({
      type: "error",
      content: message || "This is an error message",
    });
  };

  const successToast = (message?: string) => {
    messageApi.open({
      type: "success",
      content: message || "Success",
    });
  };

  useEffect(() => {
    status === "error" && errorToast(error?.message);
  }, [status]);

  useEffect(() => {
    if (data?.message === "authenticated") {
      successToast("Authenticated!");
      router.push("/dashboard");
      return;
    }
  }, [data]);

  return (
    <>
      {contextHolder}
      <Grid
        gridTemplateColumns={["1fr", "1fr 2fr"]}
        height={"100vh"}
        width={"100vw"}
      >
        <Flex justifyContent={"center"} alignItems={"center"} px={4}>
          <Box width={320}>
            <Box mb={4}>
              <Text fontSize={4} textAlign={"center"}>
                SIGN IN
              </Text>
            </Box>
            <Form onFinish={handleSubmit}>
              <Form.Item
                name={"email"}
                rules={[
                  {
                    required: true,
                    message: "Please input valid email",
                    type: "email",
                  },
                ]}
              >
                <Input placeholder="Email" type="email" />
              </Form.Item>
              <Form.Item
                name={"password"}
                rules={[
                  { required: true, message: "Password cannot be empty" },
                ]}
              >
                <Input placeholder="Password" type="password" />
              </Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                shape="round"
                loading={loading}
              >
                Sign in
              </Button>
            </Form>
            <Text fontSize={"0"} color={"red"} fontStyle={"italic"}>
              Hint: For email use <b>admin@mail.com</b> and <b>admin</b> for
              password
            </Text>
          </Box>
        </Flex>
        <Box display={["none", "block"]} bg={"grey"}></Box>
      </Grid>
    </>
  );
}
