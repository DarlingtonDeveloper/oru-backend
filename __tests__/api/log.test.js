import handler from '@/pages/api/log.js';
import { createMocks } from 'node-mocks-http';
import { supabase } from '@/lib/supabase.js';

jest.mock('@/lib/supabase.js', () => ({
    supabase: {
        from: jest.fn().mockReturnThis(),
        insert: jest.fn(),
    },
}));

describe('/api/log', () => {
    const validUuid = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

    it('should reject non-POST methods', async () => {
        const { req, res } = createMocks({ method: 'GET' });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(405);
    });

    it('should return 400 if fields are missing or invalid', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: { app_name: 'Instagram' },
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(400);
    });

    it('should return 200 for valid input', async () => {
        supabase.insert.mockResolvedValueOnce({ error: null });

        const { req, res } = createMocks({
            method: 'POST',
            body: { uuid: validUuid, app_name: 'Instagram' },
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);

        const data = JSON.parse(res._getData());
        expect(data).toEqual(expect.objectContaining({ success: true }));
    });


    it('should return 500 on Supabase insert error', async () => {
        supabase.insert.mockResolvedValueOnce({ error: { message: 'DB error' } });

        const { req, res } = createMocks({
            method: 'POST',
            body: { uuid: validUuid, app_name: 'Instagram' },
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(500);

        const data = JSON.parse(res._getData());
        expect(data).toEqual(expect.objectContaining({ error: 'DB error' }));
    });
});
