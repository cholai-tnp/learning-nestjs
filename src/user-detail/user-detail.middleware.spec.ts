import { UserDetailMiddleware } from './user-detail.middleware.js';

describe('UserDetailMiddleware', () => {
  it('should be defined', () => {
    expect(new UserDetailMiddleware()).toBeDefined();
  });
});
