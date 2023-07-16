import React, { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useRouter } from "next/router";
import { Flex } from "../../components/shared/Flex";
import { Card } from "../../components/shared/Card";
import { Text } from "../../components/shared/Text";
import { message } from "antd";

const Signout = () => {
  const { fire, status, data } = useFetch<{ message: string; status: number }>(
    "/api/signout"
  );
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const errorToast = (message?: string) => {
    messageApi.open({
      type: "error",
      content: message || "This is an error message",
    });
  };
  useEffect(() => {
    fire({
      baseURL: `${router.basePath}`,
      method: "POST",
    });
  }, []);

  useEffect(() => {
    status === "success" && router.replace("/signin");
    if (status === "error") {
      errorToast(data?.message);
      router.replace("/dashboard");
    }
  }, [status]);

  return (
    <>
      {contextHolder}
      <Flex
        width={"100vw"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Card>
          <Text fontSize={3} fontWeight={"bold"}>
            Signing out
          </Text>
        </Card>
      </Flex>
    </>
  );
};

export default Signout;
