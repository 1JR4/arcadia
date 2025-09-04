import { createBackendPlugin } from '@backstage/backend-plugin-api';
import { createRouter } from '@backstage/backend-defaults/rootHttpRouter';
import { healthCheck } from '../firebase';

export const firebaseHealthPlugin = createBackendPlugin({
  pluginId: 'firebase-health',
  register(env) {
    env.registerInit({
      deps: {
        httpRouter: createRouter,
      },
      async init({ httpRouter }) {
        const router = httpRouter;
        
        router.get('/health', async (req, res) => {
          const health = await healthCheck();
          res.json(health);
        });
        
        router.get('/firebase/status', async (req, res) => {
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