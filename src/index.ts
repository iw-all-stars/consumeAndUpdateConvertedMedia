export async function handler(event: any): Promise<any> {
    try {
        console.info("event", event);
    } catch (e) {
    } finally {
        return;
    }
}