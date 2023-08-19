
const iceConfiguration = {
    iceServers: [
      {
        urls: process.env.REACT_APP_IceConfiguration_URL,
      },
      {
        urls: process.env.REACT_APP_IceConfiguration_URL_Two ,
        username: process.env.REACT_APP_IceConfiguration_Username,
        credential: process.env.REACT_APP_IceConfiguration_credential,
      },
    
    ]
}


class PeerService {
    constructor() {
      if (!this.peer) {

        this.peer = new RTCPeerConnection(iceConfiguration);
      
      }
    }
  
    async getAnswer(offer) {
      try {
        if (this.peer) {
          await this.peer.setRemoteDescription(offer);
          const ans = await this.peer.createAnswer();
          await this.peer.setLocalDescription(new RTCSessionDescription(ans));
          return ans;
        }
      } catch (error) {
        console.log("getAnswer", error);
      }
     
    }
  
    async setLocalDescription(ans) {
      if (this.peer) {
        await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
      }
    }
  
    async getOffer() {
      if (this.peer) {
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer
      }
    }
  }
  
  export default new PeerService();