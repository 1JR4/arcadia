import { createBackendPlugin } from '@backstage/backend-plugin-api';
import { httpRouterServiceRef } from '@backstage/backend-plugin-api';
import { healthCheck } from '../firebase';

export default createBackendPlugin({
  pluginId: 'firebase-health',
  register(env) {
    env.registerInit({
      deps: {
        httpRouter: httpRouterServiceRef,
      },
      async init({ httpRouter }) {
        httpRouter.get('/health', async (req, res) => {
          const health = await healthCheck();
          res.json(health);
        });
        
        httpRouter.get('/firebase/status', async (req, res) => {
          const status = await healthCheck();
          res.json({
            message: 'Firebase SDK status',
            ...status
          });
        });
      },
    });
  },
});