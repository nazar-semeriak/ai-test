"use client";

import { api } from "~/trpc/react";

export default function GetQeustion() {
  const { data, isLoading } = api.ai.getQuestion.useQuery();

  console.log(data?.question);
  return <div></div>;
}
