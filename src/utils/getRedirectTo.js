/* 動態計算跳轉路由 */

export default function getRedirectTo (type, name) {
  let path = type.toLowerCase();
  if (!name) {
    path = 'userinfo';
  }
  return path
}