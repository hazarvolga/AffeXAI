SELECT 
  id, 
  level, 
  context, 
  message,
  metadata,
  created_at
FROM system_logs 
WHERE context = 'AI' 
  AND level = 'ERROR'
ORDER BY created_at DESC 
LIMIT 10;
