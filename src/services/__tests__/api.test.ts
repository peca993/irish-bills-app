import { fetchBills } from '../api';

// Simple API integration test
describe('API Integration', () => {
  it('should fetch bills from Oireachtas API', async () => {
    const result = await fetchBills({ limit: 5 });
    
    expect(result).toBeDefined();
    expect(result.results).toBeDefined();
    expect(Array.isArray(result.results)).toBe(true);
    expect(result.head?.counts?.resultCount).toBeGreaterThan(0);
  }, 10000); // 10 second timeout for API call

  it('should handle bill type filtering', async () => {
    const result = await fetchBills({ 
      limit: 5, 
      billType: 'Public Bill' 
    });
    
    expect(result).toBeDefined();
    expect(result.results).toBeDefined();
  }, 10000);
});
