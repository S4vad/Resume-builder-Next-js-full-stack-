import ResumePageClient from "./ResumePageClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <ResumePageClient id={id} />;
}
