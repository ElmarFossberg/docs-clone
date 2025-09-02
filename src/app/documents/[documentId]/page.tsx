import React from "react";

type DocumentIdPageProps = {
  params: Promise<{ documentId: string }>;
};

const page = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  return <div>Document Id: {documentId}</div>;
};

export default page;
