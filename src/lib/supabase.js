import { createClient } from '@supabase/supabase-js';

// استبدل القيم التالية بـ Supabase URL و Public Key الخاصين بمشروعك
const supabaseUrl = 'https://ooghgdhlexmlmmhdsuwf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2hnZGhsZXhtbG1taGRzdXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MTAzMTksImV4cCI6MjA1NTI4NjMxOX0.QbW5a3SsreUtueIv3L8Ca71x9_eu2SX0mwnNNG1rpKk';

export const supabase = createClient(supabaseUrl, supabaseKey);