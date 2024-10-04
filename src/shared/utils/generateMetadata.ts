import { Metadata, ResolvingMetadata } from 'next';

export type GenerateMetadataProps<T = void> = {
  params: T;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadataHelper(
  title: string,
  description: string,
  parentMetadata: ResolvingMetadata
): Promise<Metadata> {
  const parentMeta = await parentMetadata;
  const openGraph = {
    ...parentMeta.openGraph,
    url: parentMeta.openGraph?.url ?? '',
  };
  const twitter = {
    ...parentMeta.twitter,
    site: parentMeta.twitter?.site ?? '',
    siteId: parentMeta.twitter?.siteId ?? '',
    creator: parentMeta.twitter?.creator ?? '',
    creatorId: parentMeta.twitter?.creatorId ?? '',
  };

  return {
    title,
    description,
    openGraph: {
      ...openGraph,
      title,
      description,
    },
    twitter: {
      ...twitter,
      title,
      description,
    },
  };
}
