import { createHeaders } from '../_helpers/requests.helper';

async function fetchVideoPreview(fileID: string): Promise<string> {
  const headers = createHeaders();
  const response = await fetch(`/factory/sequence/${fileID}/preview/`, {
    method: 'GET',
    headers,
  });
  if (!response.ok) return '';
  const blob = await response.blob();
  const src = URL.createObjectURL(blob);
  return src;
}

export default fetchVideoPreview;
