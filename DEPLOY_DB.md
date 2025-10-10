## Prisma database deploy (production)

Follow these steps to safely deploy pending Prisma migrations to production.

### 1) Ensure environment

- Set `DATABASE_URL` to your production Postgres connection string.
- Optional: add a statement timeout to avoid hanging sessions:
  - Example: append `?statement_timeout=60000` (60s) to the URL.

### 2) Pre-flight checks

```bash
npx prisma generate
npx prisma migrate status
```

### 3) Deploy migrations

```bash
# Verbose logging can help identify where it stalls
# For Windows Command Prompt:
$env:PRISMA_LOG_LEVEL="debug"; $env:DEBUG="*"; npx prisma migrate deploy
```

If deploy appears stuck, check for blocking queries on Postgres (RDS/Neon/Supabase etc.):

```sql
-- Long running/locking queries
SELECT pid, usename, state, wait_event_type, wait_event, query_start, now()-query_start AS runtime, query
FROM pg_stat_activity
WHERE state <> 'idle'
ORDER BY query_start;

-- Lock conflicts
SELECT bl.pid AS blocked_pid, a.usename AS blocked_user, kl.pid AS blocking_pid,
ka.usename AS blocking_user, a.query AS blocked_query, ka.query AS blocking_query
FROM pg_locks bl
JOIN pg_stat_activity a ON a.pid = bl.pid
JOIN pg_locks kl ON kl.locktype = bl.locktype AND kl.DATABASE IS NOT DISTINCT FROM bl.DATABASE
  AND kl.relation IS NOT DISTINCT FROM bl.relation AND kl.page IS NOT DISTINCT FROM bl.page
  AND kl.tuple IS NOT DISTINCT FROM bl.tuple AND kl.virtualxid IS NOT DISTINCT FROM bl.virtualxid
  AND kl.transactionid IS NOT DISTINCT FROM bl.transactionid AND kl.classid IS NOT DISTINCT FROM bl.classid
  AND kl.objid IS NOT DISTINCT FROM bl.objid AND kl.objsubid IS NOT DISTINCT FROM bl.objsubid
  AND kl.pid <> bl.pid
JOIN pg_stat_activity ka ON ka.pid = kl.pid
WHERE NOT bl.GRANTED;
```

Terminate confirmed blockers if safe:

```sql
SELECT pg_terminate_backend(<blocking_pid>);
```

