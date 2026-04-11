export default defineEventHandler(async (event) => {
  const ctx = await requireAuth(event);
  return {
    user: { id: ctx.userId, email: ctx.email },
    profile: ctx.profile,
  };
});
