interface Format {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string;
  url: string;
}

export default interface Picture extends Format {
  id: number;
  alternativeText: string;
  caption: string;
  formats: {
    thumbnail: Format;
    small: Format;
    medium: Format;
    large: Format;
  };
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  created_at: string;
  updated_at: string;
}
