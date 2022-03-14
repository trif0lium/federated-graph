import { backendEvents } from './backend-events';

describe('backendEvents', () => {
  it('should work', () => {
    expect(backendEvents()).toEqual('backend-events');
  });
});
