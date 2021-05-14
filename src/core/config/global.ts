import { registerAs } from '@nestjs/config';

export interface GlobalConfig {
  port: number;
}

export default registerAs('global', () => ({
  port: parseInt(process.env.SERVER_PORT, 10) || 3000,
}));
