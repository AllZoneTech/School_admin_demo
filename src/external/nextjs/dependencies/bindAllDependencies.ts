import { Container } from 'inversify';

export default async function bindAllDependencies(
  container: Container
): Promise<void> {
  const bindDependencies = (await import('./bindings')).default;

  bindDependencies(container);
}
