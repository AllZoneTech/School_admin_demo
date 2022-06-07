import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

let cachedContainer: Container | undefined;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (container?: Container) => {
  if (!cachedContainer) {
    if (!container) {
      throw new Error(
        'Attempting to get cached container before initial container provided.'
      );
    }

    console.log('Container cached!');
    cachedContainer = container;
  }

  return getDecorators(cachedContainer as Container);
};
