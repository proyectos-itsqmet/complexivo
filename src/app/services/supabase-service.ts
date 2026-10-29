import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../configs/supabase-config';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient | null = null;

  get client(): SupabaseClient {
    if (!this.supabase) {
      const { url, key } = supabaseConfig;
      if (url === supabaseConfig.url || key === supabaseConfig.key) {
        throw new Error('Supabase no está configurado. Edita src/app/configs/config.ts');
      }
      this.supabase = createClient(url, key);
    }
    return this.supabase;
  }
}
