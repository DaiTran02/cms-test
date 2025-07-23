export interface MediaType {
  alt?: string;
  uri?: string;

  type?: string;
  videoHls?: {
    uri: string;
  };
  resolutions?: {
    low: {
      uri: string;
    };
    medium: {
      uri: string;
    };
    high: {
      uri: string;
    };
    original: {
      uri: string;
    };
  };
}
