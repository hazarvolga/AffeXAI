-- Add supportedContexts field to all templates
-- ThemeContext: 'public' | 'admin' | 'portal'

-- Update all templates to support 'public' context by default
-- (Landing pages, Education, Business, Portfolio, Blog, Product, Solutions, Event are all public-facing)
UPDATE page_templates
SET "designSystem" = jsonb_set(
  "designSystem",
  '{supportedContexts}',
  '["public"]'::jsonb,
  true
)
WHERE "designSystem" -> 'supportedContexts' IS NULL;

-- Verify update
SELECT 
  name, 
  category,
  "designSystem" -> 'supportedContexts' as supported_contexts
FROM page_templates
ORDER BY "createdAt";
