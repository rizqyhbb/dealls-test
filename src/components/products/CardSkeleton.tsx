import { Skeleton } from "antd";
import React from "react";
import { Card } from "../shared/Card";

export const CardSkeleton = () => {
  return (
    <Card>
      <Skeleton active />
    </Card>
  );
};
