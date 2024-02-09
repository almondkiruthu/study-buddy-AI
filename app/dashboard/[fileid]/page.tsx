import React from "react";
import { notFound, redirect } from "next/navigation";

import ChatWrapper from "@/components/chat-wrapper";
import PdfRenderer from "@/components/pdf-renderer";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface PageProps {
  params: {
    fileid: string;
  };
}

export default async function page({ params }: PageProps) {
  const { fileid } = params;

  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect(`/api/auth/login?origin=dashboard/${fileid}`);

  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: user.id,
    },
  });

  if (!file) notFound();

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-1 flex-col justify-between">
      <div className="max-w-8xl mx-auto w-full grow lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* Main area */}
            <PdfRenderer />
          </div>
        </div>

        <div className="flex-[0.75] shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper />
        </div>
      </div>
    </div>
  );
}