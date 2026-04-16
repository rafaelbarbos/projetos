import type { Post } from '@/types/feed';

export function getPostScore(post: Post): number {
  const greenLights = post.greenLights ?? 0;
  const redLights = post.redLights ?? 0;
  const totalVotes = greenLights + redLights;
  const qualityRatio = totalVotes > 0 ? greenLights / totalVotes : 0;
  const commentsScore = Math.min(post.comments.length / 8, 1);
  const ordersScore = post.shippingAgent?.totalOrders ? Math.min(post.shippingAgent.totalOrders / 40000, 1) : 0;

  return qualityRatio * 0.55 + commentsScore * 0.2 + ordersScore * 0.25;
}

export function getDeliveryDays(warehouseTime?: string): number {
  if (!warehouseTime) {
    return 99;
  }

  const match = warehouseTime.match(/\d+/);
  return match ? Number(match[0]) : 99;
}

export function normalizeText(value: string): string {
  return value.toLowerCase().trim();
}
