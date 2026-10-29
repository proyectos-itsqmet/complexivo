import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { defer, from, map, Observable } from 'rxjs';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private supabaseService = inject(SupabaseService);
  private TABLE = 'users';

  findByCredentials(email: string, password: string): Observable<User | null> {
    return defer(() =>
      from(
        this.supabaseService.client
          .from(this.TABLE)
          .select('id, name, email, rol')
          .eq('email', email)
          .eq('password', password)
          .maybeSingle(),
      ),
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return (data as User | null) ?? null;
      }),
    );
  }
}
