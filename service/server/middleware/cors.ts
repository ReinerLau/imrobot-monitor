export default defineEventHandler((event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  };
  setHeaders(event, headers);
});
