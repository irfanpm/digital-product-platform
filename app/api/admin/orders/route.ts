import Order from '@/models/Order';
import Analytics from '@/models/Analytics';
import { admin, durable, failure, json } from '@/lib/serverSafety';
export async function GET(req: Request) {
  try {
    await admin(req);
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    const analytics = await Analytics.find({}).lean();
    const pageViews = analytics.reduce((sum, a) => sum + (a.pageViews || 0), 0);
    const ctaClicks = analytics.reduce((sum, a) => sum + (a.ctaClicks || 0), 0);
    const paid = orders.filter(o => o.status === 'Captured' && o.verifiedAt && o.mode === 'live');
    const totalRevenue = paid.reduce((sum, o) => sum + o.amount, 0);
    const totalOrders = paid.length;
    const bumpOrdersCount = paid.filter(o => o.hasOrderBump).length;
    const dailyChartData = Array.from({ length: 7 }, (_, i) => {
      const start = new Date(); start.setHours(0, 0, 0, 0); start.setDate(start.getDate() - (6 - i));
      const end = new Date(start); end.setDate(end.getDate() + 1);
      const dayOrders = paid.filter(o => new Date(o.verifiedAt) >= start && new Date(o.verifiedAt) < end);
      return { day: start.toLocaleDateString('en-US', { weekday: 'short' }), revenue: dayOrders.reduce((sum, o) => sum + o.amount, 0), orders: dayOrders.length, bumpOrders: dayOrders.filter(o => o.hasOrderBump).length };
    });
    return json({ success: true, source: 'Verified live payments', stats: { totalRevenue, totalOrders, bumpOrdersCount, bumpRevenue: paid.filter(o => o.hasOrderBump).reduce((sum, o) => sum + (o.bumpAmount || 0), 0), bumpTakeRate: totalOrders ? Math.round(bumpOrdersCount / totalOrders * 100) : 0, averageOrderValue: totalOrders ? totalRevenue / totalOrders : 0, pageViews, ctaClicks, conversionRate: pageViews ? totalOrders / pageViews * 100 : 0, clickThroughRate: pageViews ? ctaClicks / pageViews * 100 : 0 }, dailyChartData,
      buyers: orders.map(o => ({ id: o.orderId, paymentId: o.paymentId || '', name: o.name || '', email: o.email || '', phone: o.phone || '', date: new Date(o.createdAt).toLocaleString('en-IN'), amount: o.amount, hasOrderBump: !!o.hasOrderBump, status: o.status === 'Captured' && !o.verifiedAt ? 'Needs reconciliation' : o.status, package: o.package, emailStatus: o.emailStatus, verified: !!o.verifiedAt, mode: o.mode || 'Unknown' })) });
  } catch (e) { return failure(e); }
}
export async function DELETE(req: Request) {
  try {
    await admin(req);
    // Preserve payment records: deleting them destroys verification and retry history.
    await Order.deleteMany({ mode: 'test' }, durable);
    return json({ success: true, message: 'Test-mode orders cleared. Live orders and analytics preserved.' });
  } catch (e) { return failure(e); }
}
