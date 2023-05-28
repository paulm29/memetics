export class BufferUpdate {
  // https://buffer.com/developers/api/updates

  id: string;
  created_at: number; // timestamp
  due_at: number; // timestamp
  profile_id: string;
  profile_service: string; // twitter, linkedin
  sent_at: number; // timestamp
  service_update_id: string;
  status: string; // sent, buffer
  text: string;
  user_id: string;
  via: string; // safari, chrome, api, firefox

  // for new updates
  top: boolean;
  services: string[];

  build(text: string, top: boolean) {
    const bufferUpdate = new BufferUpdate();
    bufferUpdate.text = text;
    bufferUpdate.top = top;
    return bufferUpdate;
  }
}
