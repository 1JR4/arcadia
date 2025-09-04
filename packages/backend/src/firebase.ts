import { getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export function getFirebaseServices() {
  // Check if Firebase is initialized
  const apps = getApps();
  if (apps.length === 0) {
    throw new Error('Firebase Admin SDK not initialized');
  }

  const app = apps[0]; // Use the default app
  
  return {
    auth: getAuth(app),
    firestore: getFirestore(app),
    app
  };
}

export async function healthCheck() {
  try {
    const { app } = getFirebaseServices();
    return {
      status: 'ok',
      firebase: {
        projectId: app.options.projectId,
        name: app.name
      }
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}