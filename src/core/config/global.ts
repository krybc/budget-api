import { registerAs } from '@nestjs/config';

export interface GlobalConfig {
  port: number;
}

export default registerAs('global', () => ({
  port: parseInt(process.env.HTTP_PORT, 10) || 3000,
}));
