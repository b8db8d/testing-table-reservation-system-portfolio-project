import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const containerEngine = process.env.CONTAINER_ENGINE ?? 'docker';
const appContainer = process.env.APP_CONTAINER ?? 'reservations-app';
const mailpitUrl = process.env.MAILPIT_API_URL ?? 'http://localhost:8025';

export default async function globalSetup() {
  console.log('\n Setting up test environment...');

  try {
    console.log('\n Resetting database...');
    await execAsync(
      `${containerEngine} exec ${appContainer} php artisan migrate:fresh --seed --force`
    );
    console.log('\n Clearing cache...');
    await execAsync(`${containerEngine} exec ${appContainer} php artisan optimize:clear`);

    console.log('\n Clearing Mailpit inbox...');
    await execAsync(`curl -s -X DELETE ${mailpitUrl}/api/v1/messages`);

    console.log('\n Test environment ready!');
  } catch (error) {
    console.error('Setting up failed:', error);
    throw error;
  }
}
