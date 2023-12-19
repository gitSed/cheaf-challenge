interface UploadFileRequest {
  file: File;
  fileName: string;
  tag: string;
  type: string;
  description: string;
}

export default UploadFileRequest;
