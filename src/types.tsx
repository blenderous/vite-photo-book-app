export type Photo = {
  alt_description: string;
  color: string;
  description: string;
  id: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  }
  user: {
    id: string;
    username: string;
  }
}