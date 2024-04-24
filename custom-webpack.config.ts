import { EnvironmentPlugin } from 'webpack';
import { config } from 'dotenv';

config();

module.exports = {
    plugins: [
        new EnvironmentPlugin([
            'CLICKUP_API_KEY',
            'CLICKBOT_SVG_URL',
        ])
    ]
}
