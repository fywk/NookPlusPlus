import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import CustomDesignsFooter from "@/components/CustomDesignsFooter";
import PageLayout from "@/components/PageLayout";
import patterns from "@/data/patterns.json";

type Params = {
  params: { id: string };
};

export async function generateStaticParams() {
  return patterns.map((pattern) => {
    id: pattern.id;
  });
}

async function getPattern(id: string) {
  return patterns.find((pattern) => pattern.id === id);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const pattern = await getPattern(params.id);

  const metadata: Metadata = {
    title: pattern?.name,
    themeColor: "#fecad1",
  };

  return metadata;
}

export default async function PatternPage({ params }: Params) {
  const pattern = await getPattern(params.id);

  if (!pattern) notFound();

  return (
    <PageLayout
      title="Custom Designs"
      navbarBgClass="bg-[#fecad1]"
      parentPage="/designs"
    >
      <div className="flex h-full flex-col justify-between gap-y-10">
        <div className="mx-auto flex max-w-xl flex-col gap-y-5 px-5 pt-8">
          <div className="flex items-center justify-between gap-x-2.5">
            <div className="flex flex-col gap-y-2">
              <h2 className="text-[22px]/none font-[750] text-dark-bronze-coin">
                {pattern.name}
              </h2>
              <p className="font-[750] leading-none text-[#f36f7d]">
                {pattern.id}
              </p>
            </div>
            <div className="aspect-square h-[3.25rem] w-[3.25rem]">
              <Image
                src={`/images/patterns/${pattern.id}/thumbnail.jpg`}
                width={154}
                height={154}
                alt=""
                quality={100}
                loading="eager"
                className="bg-[#fecad1]"
              />
            </div>
          </div>
          <Image
            src={`/images/patterns/${pattern.id}/banner.jpg`}
            width={1280}
            height={720}
            alt=""
            quality={90}
            priority
            className="rounded-xl bg-[#fecad1]"
          />
          {Array.isArray(pattern.pictures) && pattern.pictures.length
            ? pattern.pictures.map((picture, index) => (
                <Image
                  src={picture}
                  width={1280}
                  height={720}
                  alt=""
                  quality={90}
                  className="rounded-xl"
                  key={index}
                />
              ))
            : null}
        </div>
        <CustomDesignsFooter />
      </div>
    </PageLayout>
  );
}
