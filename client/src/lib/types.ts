export interface StatusMessage {
  type: 'success' | 'error' | 'loading' | 'none';
  message: string;
}

export interface ProxyResponse {
  url: string;
  success: boolean;
  content?: string;
  message?: string;
}
