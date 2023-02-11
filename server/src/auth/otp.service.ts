import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { client } from 'src/util/redis';

@Injectable()
export class OtpService {
  /**
   * Generate an otp and sends it to the given phone number.
   * Also saves it in the storage.
   */
  generateOtp(config: { key; data; delTimeOut }) {
    const { key, data, delTimeOut } = config;
    const code = Math.floor(1000 + Math.random() * 9000);
    client.set(`${key}_${code}`, JSON.stringify(data));
    if (delTimeOut) {
      // delete the entry after 5 mins.
      setTimeout(async () => {
        await client.del(`${key}_${code}`);
      }, delTimeOut);
    }
    return code;
  }

  getOtpData = async (config: { key; code }): Promise<any | null> => {
    const { key, code } = config;
    const data = await client.get(key + '_' + code);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };

  /**
   * Finds out the otp for the phone and checks if OTP is valid.
   */
  async isValidOtp(email, otp) {
    const sentOtp = await client.get(`otp_${email}`);
    console.log('foundOtp', sentOtp);
    return otp == sentOtp;
  }

  _generateOtp() {
    // const otp = Math.floor(Math.random() * 90000) + 10000;
    const otp = Math.floor(1000 + Math.random() * 9000);

    return otp;
  }
}
